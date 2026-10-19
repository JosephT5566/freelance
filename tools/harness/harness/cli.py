import argparse
import fcntl
import json
import re
import sqlite3
import sys
import uuid
from datetime import datetime, timezone
from contextlib import contextmanager, nullcontext
from pathlib import Path

from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.types import Command

from .engine import artifact_hashes, build_graph
from .runtime import (CodexBackend, assert_candidate, bindings, candidate, canonical,
                      command, digest, git, policy, pstack_root, tools_available, write_json)


@contextmanager
def run_lock(directory):
    with (directory / "lock").open("a") as handle:
        try:
            fcntl.flock(handle, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError as exc:
            raise ValueError("Run is already active") from exc
        yield


def run_path(root, run_id):
    if not re.fullmatch(r"[a-f0-9]{32}", run_id):
        raise ValueError("Invalid run ID")
    path = root / ".harness/runs" / run_id
    if not path.is_dir() or path.is_symlink():
        raise ValueError("Unknown run ID")
    return path


def verify_report(root, directory, config):
    metadata = json.loads((directory / "metadata.json").read_text())
    reports = sorted((p for p in directory.glob("*/report.json") if p.parent.name.isdigit()),
                     key=lambda p: int(p.parent.name))
    if not reports:
        raise ValueError("No completed report")
    path = reports[-1]
    report = json.loads(path.read_text())
    declared = report.pop("digest")
    if digest(canonical(report)) != declared:
        raise ValueError("Report digest mismatch")
    if report["binding"] != bindings(root, config) or report["binding"] != metadata["binding"]:
        raise ValueError("Policy, implementation or prompts changed")
    if report["purpose"] != metadata["purpose"]:
        raise ValueError("Purpose mismatch")
    assert_candidate(root, report["snapshot"])
    if report["artifacts"] != artifact_hashes(path.parent):
        raise ValueError("Raw evidence digest mismatch")
    return {**report, "digest": declared}


def main(argv=None):
    parser = argparse.ArgumentParser(description="Local pstack/LangGraph PR preparation; never publishes or merges")
    parser.add_argument("--repo", type=Path, default=Path.cwd())
    commands = parser.add_subparsers(dest="command", required=True)
    commands.add_parser("doctor", help="Inspect tools and installed pstack without installing anything")
    start = commands.add_parser("start", help="Review committed clean candidate against configured main")
    start.add_argument("--purpose", required=True, help="PR purpose, issue URL and acceptance criteria")
    start.add_argument("--visual-attestation", help="Operator identity and desktop/mobile/keyboard observations for current HEAD")
    for name in ("status", "resume", "verify-report"):
        sub = commands.add_parser(name)
        sub.add_argument("run_id")
        if name == "resume":
            sub.add_argument("--visual-attestation")
    args = parser.parse_args(argv)
    try:
        root = Path(git(args.repo.resolve(), "rev-parse", "--show-toplevel"))
        config = policy(root)
        if args.command == "doctor":
            available = tools_available(config)
            node = command(["node", "--version"], root)
            node_ok = node["exit_code"] == 0 and node["stdout"].strip().startswith("v22.")
            try:
                pstack = str(pstack_root())
                binding = bindings(root, config)
            except (ValueError, OSError) as exc:
                pstack, binding = str(exc), None
            result = {"tools": available, "node22": node_ok, "pstack": pstack,
                      "binding": binding, "notes": ["Run nvm use for Node 22",
                      "Authenticate codex separately; doctor does not spend LLM tokens",
                      "Missing gitleaks blocks readiness; install it and add it to PATH",
                      "npm audit requires registry network access",
                      "pstack files found does not prove plugin enabled or hooks trusted"]}
            print(json.dumps(result, indent=2))
            return 0 if all(available.values()) and node_ok and binding else 1
        if args.command == "start":
            if not args.purpose.strip():
                raise ValueError("Purpose must not be empty")
            snap = candidate(root, config.base)
            run_id = uuid.uuid4().hex
            directory = root / ".harness/runs" / run_id
            directory.mkdir(parents=True)
            initial = {"purpose": args.purpose, "snapshot": snap, "binding": bindings(root, config),
                       "started_at": datetime.now(timezone.utc).isoformat(), "round": 0, "attempt": 0, "reviews": [], "attestation": None}
            if args.visual_attestation:
                initial["attestation"] = {"head": snap["head"], "operator_statement": args.visual_attestation}
            write_json(directory / "metadata.json", {"purpose": args.purpose, "binding": initial["binding"]})
            print("Run " + run_id, flush=True)
        else:
            run_id = args.run_id
            directory = run_path(root, run_id)
        with run_lock(directory), run_lock(directory.parent) if args.command in ("start", "resume") else nullcontext():
            if args.command == "verify-report":
                print(json.dumps(verify_report(root, directory, config), indent=2))
                return 0
            with sqlite3.connect(directory / "checkpoints.sqlite", check_same_thread=False) as connection:
                graph = build_graph(root, directory, config, CodexBackend(), SqliteSaver(connection))
                thread = {"configurable": {"thread_id": run_id}}
                state = graph.get_state(thread)
                if args.command == "status":
                    print(json.dumps({"run_id": run_id, "next": state.next,
                                      "round": state.values.get("round"),
                                      "report": state.values.get("report")}, indent=2))
                    return 0
                if args.command == "resume":
                    if not state.values:
                        raise ValueError("Run has no checkpoint")
                    if state.values["binding"] != bindings(root, config):
                        raise ValueError("Policy, implementation or prompts changed; start a new run")
                    snap = candidate(root, state.values["snapshot"]["base"])
                    attestation = None
                    if args.visual_attestation:
                        attestation = {"head": snap["head"], "operator_statement": args.visual_attestation}
                    if state.next == ("handoff",):
                        initial = Command(resume={"attestation": attestation})
                    elif state.next:
                        assert_candidate(root, state.values["snapshot"])
                        initial = None
                    else:
                        raise ValueError("Run completed; start a new run for another candidate")
                try:
                    output = graph.invoke(initial, thread, durability="sync")
                except Exception as exc:
                    write_json(directory / "execution-error.json", {"error": str(exc)})
                    raise
                print(json.dumps({"run_id": run_id, "report": output.get("report"),
                                  "paused": bool(output.get("__interrupt__"))}, indent=2))
                return 0 if output.get("report", {}).get("status") == "local-ready" else 2
    except (ValueError, OSError, KeyError, json.JSONDecodeError) as exc:
        print("Harness blocked: " + str(exc), file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
