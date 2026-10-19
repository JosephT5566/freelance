# Use repository Codex subagents

This checkout defines three native Codex agents in `.codex/agents/`, adapted from
the installed oat-agents embedded team's planner, worker, and reviewer instructions.
The configuration lives in this repository and does not change `~/.codex/` or `.oat/`.

| Agent | Job |
| --- | --- |
| `planner` | Read code and return steps, dependencies, verification, and risks without edits or builds. |
| `worker` | Implement the assigned scope and report actual verification results. |
| `reviewer` | Inspect the actual diff independently and return PASS or FAIL with evidence. |

Models and reasoning effort are omitted so agents inherit parent settings unless
the spawn request or applicable configuration supplies defaults. The repo config
enables agents and caps concurrently open subagent threads at three, excluding the
parent. This is a shared cap, not oat-agents' per-role concurrency limit.

Start a new Codex chat in this trusted repository after changing the configuration.
Ask for the roles explicitly, for example:

```text
Use planner to investigate this task, then worker to implement its plan.
After implementation finishes, use reviewer to check the diff and verification.
Wait for each dependent step and summarize the results. Do not commit or deploy.
```

For concurrent writers, assign separate worktrees. Give the reviewer the current
worktree and comparison base. These definitions do not create oat-agents worktrees
or tmux sessions.

Planner and reviewer instructions prohibit source edits. They inherit the parent's
sandbox and approvals, so these instructions do not enforce a read-only sandbox.
Worker commits require an explicit assignment from the parent. Oat-specific
dispatch commands, backend selection, execution profiles, and the committing skill
are not part of these native definitions.

Use the [PR preparation harness](harness.md) for PR-ready requests. A native reviewer
verdict does not replace that workflow. See the
[official custom-agent documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents#custom-agents)
for the configuration format and inheritance rules.
