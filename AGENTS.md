# Repository Guide

This file is the operational memory for coding agents working in this repository. Read it before making changes, then use the documents in [`doc/`](doc/) for deeper context.

## Project purpose

This repository contains Joseph Tseng's public portfolio and project/legal pages for `josephtseng-tw.com`. It is a Next.js App Router site built as a static export and served by a Cloudflare Worker.

## Start here

- Use Node.js 22 (`.nvmrc`; the package requires Node `>=20.19.0`).
- Install exactly from the lockfile with `npm ci`.
- Run locally with `npm run dev`.
- Before handing off a change, run `npm run check`.
- There is no automated test suite or lint script. `npm run check` runs both TypeScript projects and a production static build.

## Architecture and constraints

- `app/` owns routes, route metadata, and the root provider/layout boundary.
- `src/app/` contains page-level UI composed by the route files.
- `src/views/` contains the portfolio sections and shared layout views.
- `src/components/shared/` contains reusable interactive components.
- `styles/` contains the MUI theme and global Tailwind imports.
- `worker/index.ts` wraps Cloudflare's static-assets binding and adds security headers.
- `public/` contains local static assets. The portfolio also loads remote images and Google Fonts at runtime.
- The deployed site must remain compatible with `output: 'export'`. Do not introduce server actions, runtime SSR, Next.js API routes, or other features that need a Node server unless the deployment architecture is intentionally changed too.
- Browser-only hooks, animations, MUI interactions, and navigation belong below a `'use client'` boundary. Keep route metadata and JSON-LD in server route/layout files where possible.
- `trailingSlash: true` is intentional and matches static hosting.

See [`doc/architecture.md`](doc/architecture.md) for the route map and request flow.

## Change conventions

- Match the style of the file being changed. Older portfolio UI uses MUI plus `tss-react`; newer product/legal UI may use Tailwind utilities or CSS modules. Do not migrate styling systems as a side effect.
- Keep site-wide identity and canonical URL values in `src/utils/static.ts`.
- Add or update route-specific SEO metadata in the matching `app/**/page.tsx` file.
- Project catalog content lives in `src/app/Projects.tsx`; the reusable project presentation lives in `src/views/payload/project.tsx`.
- Privacy, terms, and legal overview content lives in `src/app/InfoPages.tsx`. Treat legal and data-use statements as factual claims: do not expand them without verified product behavior.
- The public OAuth application brand is "Joseph Apps" and its canonical route is `/joseph-apps/`. There is intentionally no compatibility redirect from its former project route.
- Preserve accessibility behavior: semantic landmarks/headings, keyboard support, reduced-motion handling, focus states, and meaningful labels.
- Prefer local assets in `public/` for stable site-critical media. If adding remote media, account for availability and privacy implications.
- Do not edit generated output or dependency folders (`.next/`, `out/`, `node_modules/`, `.wrangler/`).
- Keep edits focused. There are legacy helpers that are not broadly used; do not remove or modernize them unless the task requires it.

## Verification

Use the smallest relevant checks while iterating, then the full gate before handoff:

```sh
npm run typecheck
npm run build
npm run check
```

For visual or interaction changes, also inspect the affected routes at desktop and mobile widths. Important routes are `/`, `/projects/`, `/joseph-apps/`, `/legal/`, `/privacy/`, and `/terms/`.

## Deployment

- Pull requests run `.github/workflows/build-check.yml`.
- Pushes to `main` run the check and deploy with Wrangler.
- Cloudflare configuration is in `wrangler.toml`; the generated `out/` directory is bound as `ASSETS`.
- Do not deploy or change Cloudflare account/domain settings unless the user explicitly requests it.

## Maintaining repository memory

When a change alters architecture, commands, deployment, route ownership, or a durable product constraint, update the relevant file in `doc/` in the same change. Record durable decisions in `doc/decisions.md`; do not use it as a chronological work log.

## PR preparation harness

Repo-scoped native Codex subagents are defined in `.codex/agents/`. See
[their roles and usage](doc/codex-subagents.md). Request them explicitly when useful.

Use [the project pr-ready skill](.agents/skills/pr-ready/SKILL.md) for "PR to dev", "PR ready", and local PR preparation. Read [doc/harness.md](doc/harness.md) before running it. The configured base is `main`. pstack supplies working and review principles; the repo-owned LangGraph CLI controls checks, isolated reviewers, independent adjudication, durable pauses and at most two repair rounds. Never invent passing evidence or operator visual validation. This local workflow does not authorize publishing, deployment or merge, and its reports are not trusted CI attestations.
