---
name: pr-ready
description: Prepare a committed change for a local evidence-based PR handoff using pstack and LangGraph. Use for PR to dev, PR ready, prepare PR, or resume a harness run.
---

# Prepare a PR handoff

Read `AGENTS.md` and `doc/harness.md`. Use installed pstack principles for implementation and fixes. Do not assume installing pstack provides an enforceable delivery gate.

1. Run `uv run --project tools/harness harness doctor` from the repo root. Resolve missing tools without bypassing sandbox, hooks, or approvals. Do not install tools automatically.
2. Gather the purpose, linked issue when available, and acceptance criteria from the task. The configured base is `main`; do not invent a `dev` branch.
3. Check `git status`. The candidate must be committed and clean, including untracked files. Do not automatically commit unrelated user work.
4. Run `uv run --project tools/harness harness start --purpose '<purpose and acceptance criteria>'`. Pass purpose as one argv argument using the execution API or correct shell quoting; never interpolate untrusted purpose text into shell code. The CLI launches fresh ephemeral, read-only Codex reviewers with no author chat, then an independent adjudicator. It owns fan-in, evidence, checkpointing and the two-repair-round limit.
5. If paused, inspect `status` and raw outputs in `.harness/runs/<run-id>/`. Use pstack to investigate and fix accepted findings. Do not edit tool outputs or invent passing results. Commit the repair and call `resume <run-id>`. Policy changes require a new run. A failed/unavailable reviewer is never an empty successful review.
6. For site or interaction changes, inspect desktop and mobile layouts, keyboard and affected routes. Only the operator may provide a candidate-specific `--visual-attestation` containing their identity and observations. Do not claim this inspection from a build or fabricated attestation.
7. Run `verify-report <run-id>`. Explain check failures, unresolved findings, human approval needs and missing evidence. Local-ready only means this local workflow passed. It is not trusted CI evidence or permission to merge.

No push, PR creation, merge, deployment or GitHub settings changes are included. Ask for or use separate explicit authorization for those actions. Never route reviewer child sessions back through full poteto-mode or recursively spawn reviewers.
