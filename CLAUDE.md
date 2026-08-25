## Development

**Runtime:** Node 22+ (Node 24 LTS recommended) for running Astro commands.
**Package manager:** Bun (`bun install`, `bun add`). Lockfile: `bun.lock`.

Bun is the package manager; Node is the Astro runtime (Bun's runtime doesn't
yet support `module.registerHooks` which Astro 7 requires).

### Commands

```bash
# Install dependencies
bun install

# Dev server
bun run dev

# Build (static output to ./dist)
bun run build

# Preview the built site
bun run preview

# Type checking
bun run check    # astro check

# Full deterministic quality gate
bun run verify

# 3-run Lighthouse gate on representative routes
bun run audit:lighthouse

# Format
bun run format         # write
bun run format:check   # check only
```

### Architecture decisions

- `output: "static"` — indexable pages are prerendered. The audit API and the Slovak not-found catch-all are server-rendered.
- Azure Container Apps is the automatic production target; GCP Cloud Run is a manual fallback.
- Secrets via `astro:env` (`access: "secret"`) — never `import.meta.env` for runtime secrets.
- `PUBLIC_` prefix required for client-exposed env vars (Turnstile site key, Umami).
- Plus Jakarta Sans / DM Sans / JetBrains Mono self-hosted via Fontsource (no
  Google Fonts CDN — GDPR exposure). Shared with grow + deploy.
- No MDX, no GSAP-global, no 3D. React islands only where interactivity is necessary.
- Security headers are defined in `security-headers.mjs` and applied by both the Node wrapper and Astro middleware.

### CI/CD

- **CI** (`ci.yml`): runs on PRs — format, typecheck, tests, build/output audits, Lighthouse, Playwright smoke, and i18n checks.
- **Primary deploy** (`azure-deploy.yml`): runs on push to `main` and deploys to Azure Container Apps after the same gates.
- **Fallback deploy** (`deploy.yml`): manually deploys to GCP Cloud Run.
- Both platforms use keyless workload identity; deployment configuration lives in the GitHub `prod` environment and the target cloud.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
