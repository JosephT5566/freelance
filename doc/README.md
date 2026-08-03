# Repository Memory

This directory records context that should survive beyond a single coding session. `AGENTS.md` is the concise operating guide; these documents explain the repository in more depth.

## Index

- [`architecture.md`](architecture.md): system shape, route ownership, rendering boundaries, and request flow.
- [`development.md`](development.md): setup, commands, verification, CI, and deployment.
- [`decisions.md`](decisions.md): durable architectural and product decisions, including the reason each constraint exists.

## Maintenance rule

Update these documents when a change makes an existing statement false or introduces a new constraint that a future maintainer would not discover quickly from the code. Keep current facts here; use Git history for chronology.
