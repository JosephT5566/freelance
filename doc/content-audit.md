# Portfolio content audit

This reference records the content decisions for issue [#21](https://github.com/JosephT5566/freelance/issues/21). The homepage introduces Joseph to recruiters and engineering colleagues. Detail pages retain the evidence needed for a deeper read.

## Content decisions

| Content | Decision | Destination |
| --- | --- | --- |
| Name, role, cover image, sphere | Keep the visual identity; combine the name and role into one H1 | Homepage |
| About Me | Shorten to two paragraphs; distinguish professional frontend/product work from personal backend/cloud/AI practice | Homepage |
| Experience introduction, both skills groups, three career entries, all nine original highlights | Keep complete; use two Houzz summary points and the three-entry timeline on the homepage | `/experience/` and homepage summary |
| English Learning, JoPie, Travel Split | Add concise featured personal-project summaries | Homepage |
| English Learning and JoPie engineering detail | Add problem, constraints, solution, decisions, validation evidence, and limits | Two static case studies |
| Existing project catalog | Keep existing project IDs and Travel Split policy links; share content with homepage and case studies | `/projects/` |
| English Word Cards | Describe its evolution into English Learning; retain the `english-word-cards` catalog anchor | Catalog and case study |
| Megaport selector | Keep working demo and React/responsive description; remove unsupported GitHub Pages hosting claim | Catalog |
| Interests | Keep photography, travel, snowboarding, scuba diving, and Advanced Open Water certification; shorten | Beyond the Code |
| Flickr album carousel | Remove from homepage rendering; retain implementation and direct Flickr link | Existing module; external profile |
| Contact | Use latest resume email plus existing GitHub and LinkedIn details | Footer |
| Resume | Export user-supplied resume after removing confidential employer metrics and internal tailoring notes; link a local PDF | Hero and footer |

## Evidence sources

- The previous `src/views/payload/experiences.tsx` at base `fef713572244c4bee208528f2de13ef90bb50bad` supplies the full employment history, skills, dates, and nine highlights. `src/content/experience.ts` now owns those facts.
- Existing `src/views/payload/aboutMe.tsx` and `interests.tsx` supply professional positioning and interests. No metrics, testimonials, new employment claims, or new certifications were added.
- The user-directed `my-codex-skills/references/resume-2026.md` supplies the portfolio contact `chunlinjoseph@gmail.com`. `candidate-profile.md` and `github-project-signals.md` reinforce the professional/frontend versus personal/backend evidence distinction. Internal tailoring notes and employer metrics are excluded from public copy. Joseph Apps retains its separate support email. Existing footer and root Person JSON-LD supply profile URLs.
- English Learning sibling repository `doc/project-memory.md`, `doc/training/project-memory.md`, `apps/api/app/auth.py`, and `apps/api/README.md` describe the current owner-scoped FastAPI/PostgreSQL app, review transactions and replay, controlled legacy import, and the limits of deployment evidence. The current review flow has no automatic Apps Script fallback or dual write. Personal project evidence does not establish professional backend-service experience.
- JoPie sibling repository `README.md` and `services/semantic-entry/` describe SvelteKit, Supabase, IndexedDB, the FastAPI/LangGraph service, automatic validated text writes, and separately confirmed receipt writes. Repository fixtures do not establish paid-model quality. Hosted acceptance and service/schema alignment remain open in those records.
- Travel Split sibling repository `README.md` confirms the existing catalog description of a Google Sheets-backed travel expense and itinerary application.

Source paths above refer to the sibling `english-learning`, `expense-app`, and `TravelSplit` repositories in the local Git workspace. Product implementation and current evidence records take precedence over older descriptions. This portfolio does not independently certify the current health of those services.

## Link evidence and remaining gaps

The parent agent verified with the GitHub connector that `JosephT5566/english-learning`, `JosephT5566/expense-app`, and `JosephT5566/TravelSplit` are public. It verified HTTP 200 responses for GitHub, Flickr, Instagram, and the Megaport demo, and inspected the Megaport scheduling UI in Chrome. LinkedIn returns HTTP 999 to automated requests; the existing profile URL remains, with its rendered destination unverified.

The user supplied `my-codex-skills/references/resume-2026.md`. The parent exported a two-page PDF after removing the two confidential employer-metric clauses and the internal tailoring paragraph. It rendered and inspected both pages, then the worker copied the artifact to `public/resume/joseph-tseng-resume.pdf`. The original reference remains unchanged. Do not publish that raw reference without the same sanitization. No live English Learning/JoPie demo is claimed; case studies link their public source repositories.

## Verification ownership

The implementing worker checks static generation, headings, complete experience text, metadata, internal links, and `npm run check`. The parent owns desktop/mobile browser inspection and the independent reviewer checks ticket coverage and SEO. Actual browser results belong in the task handoff, rather than being inferred from a successful build.
