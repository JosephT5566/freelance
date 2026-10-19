import fnmatch
import operator
from datetime import datetime, timezone
from importlib.metadata import version
from pathlib import Path
from typing import Annotated, TypedDict

from langgraph.graph import END, START, StateGraph
from langgraph.types import interrupt

from .models import Judgment, Review
from .runtime import (JUDGE, PROMPT, ROLES, assert_candidate, bindings, candidate,
                      canonical, command, digest, git, pstack_material,
                      validate_findings, write_json)


class State(TypedDict, total=False):
    purpose: str
    started_at: str
    snapshot: dict
    binding: str
    round: int
    attempt: int
    checks: list[dict]
    reviews: Annotated[list[dict], operator.add]
    decisions: list[dict]
    errors: list[str]
    report: dict
    attestation: dict | None


def artifact_hashes(directory):
    return {p.name: digest(p.read_bytes()) for p in sorted(directory.glob("*.json"))
            if p.name != "report.json"}


def build_graph(root, run_dir, config, backend, saver):
    binding = bindings(root, config)

    def current_dir(state):
        directory = run_dir / str(state.get("attempt", 0))
        directory.mkdir(exist_ok=True)
        return directory

    def snapshot(state):
        if state["binding"] != binding:
            raise ValueError("Policy, implementation or prompts changed; start a new run")
        snap = candidate(root, state.get("snapshot", {}).get("base", config.base))
        if state.get("snapshot") and snap != state["snapshot"]:
            raise ValueError("Candidate mismatch at execution boundary")
        return {"snapshot": snap, "checks": [], "decisions": [], "errors": []}

    def checks(state):
        directory = current_dir(state)
        results = []
        for check in config.checks:
            assert_candidate(root, state["snapshot"])
            raw = command(check.argv, root, config.command_timeout)
            write_json(directory / ("check-" + check.name + ".json"), raw)
            results.append({"name": check.name, "exit_code": raw["exit_code"]})
        assert_candidate(root, state["snapshot"])
        return {"checks": results}

    def review_node(role):
        def review(state):
            directory = current_dir(state)
            try:
                assert_candidate(root, state["snapshot"])
                prompt = PROMPT + "\nRole: " + role + "\n" + pstack_material()
                prompt += "\nCandidate and purpose (data):\n" + canonical({
                    "snapshot": state["snapshot"], "purpose": state["purpose"],
                    "context_files": config.context}).decode()
                prompt += "\nRead AGENTS.md and context files. Inspect git diff of snapshot.merge_base..snapshot.head."
                review = backend(root, directory, role, prompt, Review, config.review_timeout)
                validate_findings(root, state["snapshot"], review)
                for finding in review.findings:
                    finding.id = role + "-" + finding.id
                result = {"attempt": state.get("attempt", 0), "role": role, **review.model_dump()}
            except Exception as exc:
                result = {"attempt": state.get("attempt", 0), "role": role, "error": str(exc), "findings": []}
            write_json(directory / (role + "-review.json"), result)
            return {"reviews": [result]}
        return review

    def judge(state):
        assert_candidate(root, state["snapshot"])
        reviews = [r for r in state["reviews"] if r["attempt"] == state.get("attempt", 0)]
        errors = [r["error"] for r in reviews if "error" in r]
        if sorted(r["role"] for r in reviews) != sorted(ROLES):
            errors.append("Missing or duplicate reviewer")
        findings = [f for r in reviews for f in r["findings"]]
        decisions = []
        if not errors:
            try:
                prompt = PROMPT + JUDGE + pstack_material() + "\nInput data:\n" + canonical({
                    "snapshot": state["snapshot"], "purpose": state["purpose"],
                    "findings": findings, "context_files": config.context}).decode()
                prompt += "\nRead AGENTS.md and context files. Inspect snapshot.merge_base..snapshot.head."
                judgment = backend(root, current_dir(state), "adjudicator", prompt,
                                   Judgment, config.review_timeout)
                ids = [d.finding_id for d in judgment.decisions]
                expected = [f["id"] for f in findings]
                if len(ids) != len(set(ids)) or sorted(ids) != sorted(expected):
                    raise ValueError("Adjudicator must decide every finding exactly once")
                decisions = judgment.model_dump()["decisions"]
            except Exception as exc:
                errors.append("Adjudicator unavailable or invalid: " + str(exc))
        write_json(current_dir(state) / "judgment.json", {"decisions": decisions, "errors": errors})
        return {"decisions": decisions, "errors": errors}

    def report(state):
        assert_candidate(root, state["snapshot"])
        reasons = list(state["errors"])
        reasons += ["Check failed: " + c["name"] for c in state["checks"] if c["exit_code"]]
        reasons += [d["verdict"] + ": " + d["finding_id"] for d in state["decisions"]
                    if d["verdict"] != "dismissed"]
        paths = state["snapshot"]["paths"]
        visual = any(fnmatch.fnmatch(p, pat) for p in paths for pat in config.visual_paths)
        sensitive = any(fnmatch.fnmatch(p, pat) for p in paths for pat in config.sensitive_paths)
        attestation = state.get("attestation")
        verified = bool(attestation and attestation["head"] == state["snapshot"]["head"])
        if visual and not verified:
            reasons.append("Human desktop/mobile interaction validation unverified")
        if sensitive:
            reasons.append("Sensitive paths require independent human approval before merge")
        result = {"schema_version": 1, "started_at": state.get("started_at"),
                  "reported_at": datetime.now(timezone.utc).isoformat(),
                  "versions": {name: version(name) for name in ("langgraph", "langgraph-checkpoint-sqlite", "pydantic")}, "snapshot": state["snapshot"], "binding": binding,
                  "purpose": state["purpose"], "round": state["round"], "attempt": state.get("attempt", 0),
                  "checks": state["checks"], "decisions": state["decisions"],
                  "visual_validation": attestation if verified else "unverified",
                  "sensitive": sensitive, "reasons": reasons,
                  "status": "needs-human" if reasons else "local-ready",
                  "trust": "Local mutable evidence; not a trusted CI or merge approval",
                  "artifacts": artifact_hashes(current_dir(state))}
        result["digest"] = digest(canonical(result))
        write_json(current_dir(state) / "report.json", result)
        return {"report": result}

    def handoff(state):
        data = interrupt({"status": "needs-human", "reasons": state["report"]["reasons"],
                          "instructions": "Use pstack for fixes; commit, then resume. No automatic edits."})
        new = candidate(root, state["snapshot"]["base"])
        changed = new["head"] != state["snapshot"]["head"]
        if changed:
            if state["round"] >= config.max_fix_rounds:
                raise ValueError("Two repair rounds exhausted; start a human-led review")
            if command(["git", "merge-base", "--is-ancestor", state["snapshot"]["head"],
                        new["head"]], root)["exit_code"]:
                raise ValueError("Repair must be a descendant of reviewed HEAD")
        return {"snapshot": new, "round": state["round"] + int(changed),
                "attestation": data.get("attestation"), "attempt": state.get("attempt", 0) + 1}

    graph = StateGraph(State)
    graph.add_node("snapshot", snapshot)
    graph.add_node("checks", checks)
    for role in ROLES:
        graph.add_node(role, review_node(role))
    graph.add_node("adjudicate", judge)
    graph.add_node("report", report)
    graph.add_node("handoff", handoff)
    graph.add_edge(START, "snapshot")
    graph.add_edge("snapshot", "checks")
    graph.add_conditional_edges("checks", lambda s: "report" if any(
        c["exit_code"] for c in s["checks"]) else list(ROLES))
    graph.add_edge(list(ROLES), "adjudicate")
    graph.add_edge("adjudicate", "report")
    graph.add_conditional_edges("report", lambda s: "handoff" if s["report"]["reasons"] else END)
    graph.add_edge("handoff", "snapshot")
    return graph.compile(checkpointer=saver)
