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

## The homepage summarizes evidence held on detail pages

The homepage introduces professional frontend/product work and personal backend/cloud/AI projects separately. Complete employment highlights and skills live on `/experience/`. Project case studies describe implementation evidence and its limits without claiming unverified production reliability.

Implication: maintain the shared records in `src/content/experience.ts` and `src/content/projects.ts` when updating summaries or detail pages. Keep the English Learning catalog anchor `english-word-cards` so existing deep links remain useful. Do not publish empty resume or project placeholders.

## Portfolio navigation and personal presentation

The portfolio uses an editorial layout with an in-flow landscape image, section navigation, and a quiet shared footer of accessible profile/contact icons and legal links. The homepage has no quick-action button row or résumé download. The public résumé PDF has been removed at the user's request.

Implication: keep project and full-experience links next to their relevant content. Do not restore a résumé asset, download link, contact pitch, animated sphere, or scroll-controlled project panels as incidental styling work. All pages share the footer through AppShell.

## Homepage contours span the viewport and motion stays finite

One smooth seeded height field supplies the homepage SVG contours behind the central text on desktop and mobile. Marching squares with a bilinear saddle decider yields coherent isolines, and shared edge identities stitch paths without closing open boundaries. The fixed seed keeps geometry stable across renders. Uniform scaling and a central crop preserve terrain proportions on narrow screens. Pointer deformation decays, and inverse landscape movement is limited to 8px inside its existing clipped frame. Text and document scrolling stay stable. No continuous idle animation, entrance gate, scroll hijack, or WebGL dependency is needed.

Implication: retain visible static contours and a neutral image for reduced motion, coarse pointers, and phones. Suspend motion when the tab is hidden or the hero has passed, fade out contours before experience, and clean up every listener, observer, frame, and inline image transform on unmount.
