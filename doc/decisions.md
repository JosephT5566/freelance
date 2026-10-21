# Durable Decisions

This file records decisions that constrain future work. It is intentionally not a changelog.

## Static export is the deployment model

The site uses Next.js App Router for routing and metadata, but the production artifact is static. This keeps hosting simple and lets Cloudflare serve the output directly. Features requiring request-time Next.js execution are outside the current architecture.

Implication: new pages and data dependencies must work during static generation or in the browser. Adding server actions, API routes, request-time cookies, or dynamic SSR requires an explicit hosting redesign.

## The Worker is deliberately thin

The Cloudflare Worker delegates to the static-assets binding and adds response security headers. It is not the backend for the products described by the portfolio.

Implication: avoid accumulating unrelated application logic in `worker/index.ts`. If Worker behavior grows, document bindings, failure modes, and local verification here.

## Server route files own discoverability data

Global metadata and Person JSON-LD live in `app/layout.tsx`; individual route metadata and page-specific structured data live beside their routes. Interactive page implementations stay under `src/app/`.

Implication: content changes that alter page identity, claims, or canonical URLs should update both visible content and the corresponding metadata where necessary.

## Styling evolves locally, not through incidental rewrites

The portfolio predates the newer legal and OAuth pages, so MUI/`tss-react`, Tailwind, and a CSS module coexist. This is accepted architecture rather than an unfinished global migration.

Implication: follow the local styling model. A repository-wide consolidation should be a dedicated change with visual regression review.

## Legal and OAuth copy must reflect real product behavior

The privacy, terms, project, and Joseph Apps pages make public claims about authentication, stored data, external services, and supported applications.

Implication: do not infer or embellish these claims. Coordinate copy changes with the behavior of the separately deployed applications and update related pages consistently.

## Joseph Apps is the public OAuth application brand

The Google-facing application name and public sign-in service brand is "Joseph Apps." Its canonical public route is `/joseph-apps/` and its page component follows the same name.

Implication: use "Joseph Apps" in visible copy, metadata, structured data, policy references, and internal links. The former `/projects/joseph-oauth/` route is intentionally not redirected.

## Production validation is type-check plus static build

The repository currently has no automated test or lint suite. CI considers `npm run check`—both TypeScript projects followed by the static production build—the required gate.

Implication: visual and interaction checks remain manual, and handoff notes should distinguish them from automated verification.

## Local agent work uses native Codex roles

Repository-scoped Codex roles provide planning, implementation, and independent review. Their configuration lives in `.codex/agents/`. See [their roles and usage](codex-subagents.md).

Implication: run `npm run check` for handoff and report manual checks separately. Native agent reviews supplement the existing verification workflow.
