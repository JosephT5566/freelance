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

Every route is wrapped in `src/app/AppShell.tsx`, which supplies the shared sticky header, responsive navigation drawer, and quiet icon footer. The root layout in `app/layout.tsx` supplies global metadata, fonts, providers, and Person JSON-LD.

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

The homepage uses an in-flow landscape image and editorial project features. `Home.tsx` owns hero/image refs and an isolated foreground layer. `heroTerrain.ts` creates a deterministic seeded height field and stitches its sampled isolines into open boundary paths and closed contours. `heroContours.tsx` lazy-loads `heroTerrainScene.ts` after mount. The scene batches major and minor contours into two Three.js line geometries, uses contour levels as real elevation, and projects them with an oblique orthographic view. `heroTerrainShaders.ts` shades lines using normals sampled from the same height field, with cool shadows and warm highlights. A translucent surface sampled from that height field adds subtle relief shading behind the lines; its edges fade outside the main terrain extent. Its transparent canvas stays fixed behind every homepage section without scroll fading or experience visibility gates. A central crop preserves terrain proportions on narrow screens. Fine mouse pointers tilt the terrain, dissolve contours within a 150px screen-space radius into particles sampled along those same lines, and offset the clipped landscape by up to 8px. Particle scatter settles while the pointer rests and restores to lines on pointer exit; the screen-space radius stays aligned through terrain tilt. Rendering settles at idle and suspends in hidden tabs. Small screens, coarse pointers, and reduced motion retain a static 3D view and neutral image. The image frame retains its height and adds 12px overscan only when motion is enabled. Before the optional renderer loads, the existing page color remains visible. WebGL creation failure or context loss uses static SVG contours with explicit color and fill attributes; an unavailable renderer chunk leaves the plain page background. Unmount disposes geometries, materials, renderer, listeners, observers, and animation frames. The catalog uses normal document scrolling and an in-flow anchor index. Navigation uses a MUI drawer for mobile keyboard focus and dismissal. Retained album, horizontal-scroll, and spring-animation helpers are not mounted by these portfolio pages. Changes to interactive components should be checked with keyboard input, reduced-motion preferences, and both mobile and desktop widths.

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

The homepage links directly to Flickr. The hero uses the user-supplied `https://cdn.josephtseng-tw.com/profile-website/hero-2026.jpg` landscape image. The portrait and verified JoPie app icon are local assets. The original `/cover.jpg` remains the social-preview image. Homepage featured projects use 1280 × 720 screenshots captured from the live English Learning review and JoPie expense-entry interfaces. They load `english-learning-app.jpg` and `jopie-app.jpg` from `https://cdn.josephtseng-tw.com/profile-website/`. Their image containers preserve a 16:9 aspect ratio at every breakpoint, and the images use `contain` to avoid cropping controls. The retained album module can fetch images through `src/api/flickrHook.tsx`; `src/views/payload/album.tsx` also contains static fallback image URLs. Project imagery may use remote URLs. These are browser-to-third-party requests, not Worker-proxied assets.

## Hosting layer

`next.config.ts` enables static export, unoptimized images, and trailing slashes. `wrangler.toml` binds `./out` as static assets, enables SPA-style not-found handling, and runs the Worker first. The Worker delegates the request to static assets, copies the response, and adds:

- `Permissions-Policy`
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`

Changing this flow can affect every route, cache behavior, and custom-domain traffic.
