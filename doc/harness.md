# Local delivery harness

The harness prepares a reviewable local handoff for this repository. It uses pstack review principles and LangGraph orchestration. It never pushes, creates a PR, merges, deploys, or changes GitHub settings.

## Setup

Use Node 22, Python 3.12 or later, uv, Git, the Codex CLI and the installed pstack plugin. Authenticate Codex with your existing account. Reviewers inherit your configured default model. No API key or model choice is stored in this repository. Confirm pstack is enabled and its hooks are trusted in your runtime separately; doctor only checks its installed files.

```sh
nvm use
npm ci
uv sync --locked --project tools/harness
uv run --project tools/harness harness doctor
```

Install Gitleaks separately and put it on PATH or at `~/.local/bin/gitleaks`. The harness does not install binaries. `npm audit` needs access to the npm registry. Missing tools, unavailable registry access and failed scans block readiness.

pstack is discovered from `~/.codex/plugins/cache/pstack-claude/pstack/*/skills`. For another installation, set `PSTACK_SKILLS_DIR` to its `skills` directory. The directory must contain the review references and principles. The content is hashed, so an upgrade invalidates existing runs.

## Prepare a candidate

Commit the intended changes first. The working tree must be clean, including untracked files. Ignored build output and `.harness/runs/` do not count as source changes. The default base is the local `main` ref. Update it deliberately before starting when you need a newer remote baseline. The report binds its resolved SHA and merge-base. Reviews use merge-base to HEAD, matching PR change scope when the target branch advances.

```sh
uv run --project tools/harness harness start --purpose 'Issue URL; change purpose; acceptance criteria'
uv run --project tools/harness harness status RUN_ID
uv run --project tools/harness harness verify-report RUN_ID
```

The CLI prints a run ID before executing checks. Checkpoint and raw artifacts live in ignored `.harness/runs/<run-id>/`. Keep this directory private. Tool and model output can contain repository content. Do not commit it without reviewing for sensitive information.

The graph runs a snapshot, required checks, three parallel reviewers, a join, an independent adjudicator and a report. Reviewers cover architecture, risk and test gaps. Each is a fresh `codex exec --sandbox read-only --ephemeral` process with strict JSON output. They receive the purpose, candidate SHAs and pstack resources, not the author's discussion. The installed CLI still loads applicable repo instructions and user runtime configuration. Read-only execution limits writes; it is not a network or secrets isolation guarantee.

Findings require a changed file, exact line range and verbatim source excerpt, a triggering scenario and impact. Each finding declares `source_side` as `head` for surviving candidate code or `base` for deleted code at the pinned merge-base. The adjudicator must decide every finding. An empty review is valid. Missing reviewers, invalid evidence or incomplete adjudication block readiness. Model agreement is not proof. The workflow never weakens a configured sandbox, hook or approval rule.

## Repair and resume

A blocked report pauses durably. Read the report and raw tool output. Use pstack and a human to address failures and accepted findings, then commit the repair.

```sh
uv run --project tools/harness harness resume RUN_ID
```

A repaired candidate must descend from the reviewed HEAD. Every repair reruns all checks and reviewers. At most two changed-candidate repair rounds are allowed. Further unresolved work requires a human-led review and a deliberate new run. The harness does not automatically rewrite arbitrary source code. This is a human-assisted repair loop.

Resuming without a new HEAD can retry infrastructure failures. It does not count as a repair round. A changed policy, implementation or pstack prompt requires a new run. A crashed run can resume its pending graph nodes only if its candidate is unchanged. One local process may operate a run at a time. A repository-wide lock also prevents concurrent builds from sharing generated output. Each retry gets a separate evidence directory.

For visual or interaction changes, inspect the affected routes at desktop and mobile widths and exercise keyboard behavior. An operator may record their identity and actual observations for the current candidate.

```sh
uv run --project tools/harness harness resume RUN_ID --visual-attestation 'Joseph; inspected /projects at desktop/mobile; keyboard navigation and reduced motion checked'
```

The statement applies only to that HEAD. Without it, visual validation remains unverified. The agent must never fabricate an operator statement. Sensitive path changes always require independent human approval before merge; the local tool records that requirement instead of supplying that approval.

## Configuration and guarantees

`.harness/config.json` owns the base, bounded timeouts, check argv, sensitive paths, visual paths and context files. Checks use argv without a shell. The initial checks are `npm run check`, `npm audit --audit-level=high --json` and redacted Gitleaks history scanning. Audit high/critical findings block readiness. No vulnerability exemptions are configured. The application has no automated test suite, lint script or measured coverage. The harness selftests do not change that fact.

Raw outputs and exit codes are saved separately from the report. Evidence is bound to base/head, tree, purpose, policy, implementation, schemas and pstack prompt content. Candidate mutations during execution invalidate the result. `verify-report` detects accidental report or artifact changes and rejects stale candidates.

These are mutable local files. An author able to modify evidence can recompute hashes. This is not signed attestation, independent CI evidence, an immutable audit store or a GitHub merge gate. CI runs deterministic harness selftests without invoking LLMs. Existing build checks and deployment remain unchanged. A production company rollout still needs protected shared policy, trusted CI evidence, retention rules, branch rulesets and independent merge approval.

## Exit codes and maintenance

Exit 0 means the requested command succeeded. `start` or `resume` returns 2 for a completed blocked handoff. Exit 1 means execution or validation failed. Inspect `execution-error.json` and the checkpoint after a crash.

```sh
uv run --project tools/harness python -m unittest discover -s tools/harness/tests -v
```

These fixture tests use a fake review backend to exercise orchestration and validation. They do not claim real AI review quality. Pin and review dependency and pstack upgrades. Run `doctor` after upgrading either runtime.
