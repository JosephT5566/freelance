# Architecture

## System overview

The application is a Next.js App Router site that produces a fully static `out/` directory. A Cloudflare Worker serves that directory through the `ASSETS` binding and adds a small set of security headers to every response.

```text
Browser
  -> Cloudflare route (josephtseng-tw.com)
    -> worker/index.ts
      -> ASSETS binding
        -> Next.js static export (out/)
```

There is no application backend in this repository. References to OAuth, Google Sheets, Cloud Functions, Apps Script, and other products describe separately operated applications.

## Route map

| Route | Route entry | Page UI | Purpose |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | `src/app/Home.tsx` | Main portfolio sections |
| `/experience/` | `app/experience/page.tsx` | `src/app/Experience.tsx` | Full engineering history and skills |
| `/projects/` | `app/projects/page.tsx` | `src/app/Projects.tsx` | Project catalog |
| `/projects/english-learning/` | `app/projects/english-learning/page.tsx` | `src/app/ProjectCaseStudy.tsx` | English Learning engineering case study |
| `/projects/jopie/` | `app/projects/jopie/page.tsx` | `src/app/ProjectCaseStudy.tsx` | JoPie engineering case study |
| `/joseph-apps/` | `app/joseph-apps/page.tsx` | `src/app/JosephApps.tsx` | Joseph Apps sign-in service explanation and verification information |
| `/legal/` | `app/legal/page.tsx` | `LegalContent` in `src/app/InfoPages.tsx` | Legal hub |
| `/privacy/` | `app/privacy/page.tsx` | `PrivacyContent` in `src/app/InfoPages.tsx` | Privacy policy |
| `/terms/` | `app/terms/page.tsx` | `TermsContent` in `src/app/InfoPages.tsx` | Terms of service |

Every route is wrapped in `src/app/AppShell.tsx`, which supplies the shared header and navigation. The root layout in `app/layout.tsx` supplies global metadata, fonts, providers, and Person JSON-LD.

## Rendering boundaries

Route files are server components by default. They own static metadata and compose page UI. Interactive page and layout modules carry `'use client'` when they use browser APIs, React state/effects, MUI client behavior, or animation libraries.

`app/providers.tsx` establishes:

1. React Strict Mode.
2. Emotion's client-side cache.
3. The MUI theme from `styles/theme.ts`.

The static-export requirement is the primary boundary: all routes must be renderable at build time, and deployed features cannot depend on a persistent Next.js server.

## UI and styling

The repository contains two compatible styling approaches:

- The original portfolio uses Material UI, the shared theme, and `tss-react` styles colocated with components.
- Newer legal/project detail surfaces use Tailwind utilities or the `src/app/infoPages.module.css` CSS module.

Tailwind is loaded through `styles/globals.css` and `postcss.config.mjs`. Theme colors and type defaults are defined in `styles/palette.js` and `styles/typography.ts`. Google Fonts are linked in the root layout.

Responsive and motion-heavy behavior is concentrated in client components, including navigation, the project section rail, the album pager, horizontal scrolling, and spring animations. Changes to these components should be checked with keyboard input, reduced-motion preferences, and both mobile and desktop widths.

## Content ownership

- Global site name, canonical origin, and description: `src/utils/static.ts`.
- Global SEO, social metadata, and Person structured data: `app/layout.tsx`.
- Route-specific SEO: each route's `page.tsx`.
- Portfolio homepage copy: `src/views/payload/`.
- Experience facts and skills: `src/content/experience.ts`; homepage summaries and `/experience/` use the same records.
- Project catalog, featured summaries, and case studies: `src/content/projects.ts`; `src/app/Projects.tsx` renders the catalog.
- Content provenance and unresolved sources: `doc/content-audit.md`.
- Legal/privacy/terms copy: `src/app/InfoPages.tsx`.
- Joseph Apps detail copy: `src/app/JosephApps.tsx`.

The homepage links directly to Flickr. The retained album module can fetch images through `src/api/flickrHook.tsx`; `src/views/payload/album.tsx` also contains static fallback image URLs. Project imagery may use remote URLs. These are browser-to-third-party requests, not Worker-proxied assets.

## Hosting layer

`next.config.ts` enables static export, unoptimized images, and trailing slashes. `wrangler.toml` binds `./out` as static assets, enables SPA-style not-found handling, and runs the Worker first. The Worker delegates the request to static assets, copies the response, and adds:

- `Permissions-Policy`
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`

Changing this flow can affect every route, cache behavior, and custom-domain traffic.
