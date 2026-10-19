# Run an oat-agents team

This Mac uses [oat-agents](https://github.com/Noopher-AI/oat-agents) with the embedded example team and Codex. Open a new terminal after installation so `~/.local/bin` is on `PATH`. The companion `oat-agents-cli` skill is available to agents on the next turn.

The CLI and tmux are installed in `~/.local/bin`. This Intel Mac uses a source build of tmux with macOS ncurses and a private static libevent under `~/.local/lib/oat-agents-deps`. Homebrew does not manage that tmux installation.

## Check the local setup

From the repository root, run:

```sh
oat-agents --version
tmux -V
codex login status
oat-agents plugin list --repo .
```

The plugin list must show `initialised: true` and `trusted: true` for `example`.

The plugin pin is local to this checkout at `.git/oat/plugins.toml`. Backend settings are in `.oat/roles.toml`, excluded through `.git/info/exclude`. These files are machine-local and are not distributed through Git.

## Start a task

Commit the changes that the team needs before starting. Runs create worktrees from a Git commit and do not include uncommitted or untracked work. Use `--base-branch HEAD` to start from the current committed revision.

Agents run with permission prompts disabled. Review the goal before launching a team with access to this machine and its credentials.

Replace the example goal with the outcome you want:

```sh
oat-agents meta fire --repo . --base-branch HEAD --agent codex --no-exec \
  --prompt "Describe the change to this portfolio. Follow AGENTS.md, preserve static export, and run npm run check. Do not publish, deploy, or merge into shared branches."
```

The embedded team supplies planner, worker, and reviewer roles. No Kubernetes execution profile is configured, so checks run on the host. Install dependencies in each new worktree with Node 22 and `npm ci` before running `npm run check`.

The optional [PR preparation harness](harness.md) remains the workflow for PR-ready requests. An oat-agents reviewer result does not replace its evidence or authorize deployment.

## Watch and review the work

```sh
oat-agents tui
```

Use the arrow keys to select an agent and view its live terminal, diff, timeline, or log. Press Enter to interact with its session. Press Ctrl+] to return to the team view.

The meta-agent combines accepted changes on the run's own branch. Review the resulting `oat/<run>/...` branches before integrating them into your working branch. The setup does not launch a coding run automatically.

## Set up another checkout

After installing the CLI and logging in to Codex, run these commands from the new checkout:

```sh
oat-agents init --local
oat-agents plugin trust embedded --name example
```

To make Codex the default backend, create `.oat/roles.toml`:

```toml
[oat-meta]
backend = "codex"

[oat-console]
backend = "codex"
```

Keep that file local by adding `/.oat/` to `.git/info/exclude`. Member roles inherit the run's backend. Models and role concurrency use upstream defaults.
