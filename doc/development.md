# Development and Operations

## Prerequisites

- Node.js 22 is the CI and `.nvmrc` version.
- npm is the package manager; `package-lock.json` is authoritative.
- Python 3 is used only by the local static-file preview command.
- Wrangler is installed as a development dependency for Cloudflare builds and deployment.

## Local workflow

```sh
nvm use
npm ci
npm run dev
```

The development server uses Next.js with webpack. The default local URL is `http://localhost:3000`.

## Commands

| Command             | Effect                                             |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the Next.js development server with webpack  |
| `npm run typecheck` | Type-check the site and Worker TypeScript projects |
| `npm run build`     | Build the static site into `out/`                  |
| `npm run start`     | Serve `out/` on port 3000 with Python              |
| `npm run preview`   | Alias for `npm run start`                          |
| `npm run check`     | Run type-checking, then the production build       |
| `npm run deploy`    | Run the full check, then deploy with Wrangler      |

There are currently no repository scripts for linting, formatting, or automated tests. Do not claim test coverage from `npm run check`; its guarantees are type correctness and a successful static production build.

## Verification by change type

- Content-only change: run `npm run check` and inspect the affected page.
- Styling/responsive change: run `npm run check`, then inspect mobile and desktop layouts.
- Navigation/interaction change: also test keyboard behavior, focus visibility, direct URLs, and reduced motion where relevant.
- Metadata/structured-data change: inspect the generated page head or `out/` output after a build.
- Worker/configuration change: run `npm run check` and review the generated asset paths and Worker binding assumptions.

The primary route smoke-test set is:

```text
/
/experience/
/projects/
/projects/english-learning/
/projects/jopie/
/joseph-apps/
/legal/
/privacy/
/terms/
```

## CI and release path

Pull requests trigger the build-check workflow, which uses Node 22, runs `npm ci`, and executes `npm run check`.

A push to `main` triggers the deployment workflow. It performs the same clean install and check, then uses `cloudflare/wrangler-action` with the `CF_API_TOKEN` repository secret. Wrangler builds and deploys `worker/index.ts`, with the static `out/` directory configured as the `ASSETS` binding.

Production routes are configured for both the apex and `www` hostnames in `wrangler.toml`. Cloudflare account identifiers, routes, compatibility dates, and security headers are operational configuration; change them deliberately and with explicit deployment context.

## Generated and local-only files

Do not edit or commit:

- `.next/`
- `out/`
- `node_modules/`
- `.wrangler/`
- `*.tsbuildinfo`
- local `.env.*` files

## Codex subagents

For the optional local Codex team workflow, see [Use repository Codex subagents](codex-subagents.md).
