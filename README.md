# Build with EUHub

Engineering-led website and service catalogue for `build.euhub.co`, part of
the EUHub ecosystem. It is bilingual, static-first, GDPR-aware, and designed
for conventional search, answer engines, and AI discovery.

## Stack

- **Astro 7** — static-first, `output: "static"`, one dynamic API route
- **Azure Container Apps** — primary deployment via `@astrojs/node`
- **GCP Cloud Run** — manual fallback deployment
- **React 19** — islands only (form, hero interactive elements)
- **TypeScript** — strict mode
- **Tailwind CSS v4** — via `@tailwindcss/vite`
- **Plus Jakarta Sans / DM Sans / JetBrains Mono** — self-hosted via Fontsource
  (no Google Fonts CDN); the shared EUHUB type system (grow + deploy + build)
- **Zod 4** — shared validation schema (client + server)
- **Bun** — package manager (`bun install`)
- **Node 22+** — Astro runtime (Bun's runtime doesn't support `module.registerHooks`)

## Quick start

```bash
bun install          # install dependencies
bun run dev          # start dev server
bun run build        # build to ./dist/
bun run preview      # preview the built site locally
bun run check        # type checking (astro check)
bun run verify       # format, types, tests, build, and output/server audits
bun run audit:lighthouse # 3-run Lighthouse gate across representative routes
bun run format       # format with Prettier
```

## Environment variables

Copy `.env.example` to `.env` for local development. Runtime secrets are
provided by the deployment platform; public values needed by static output
must be present at build time.

| Variable                    | Context       | Purpose                           |
| --------------------------- | ------------- | --------------------------------- |
| `WEBHOOK_URL`               | server secret | Destination for form submissions  |
| `WEBHOOK_TOKEN`             | server secret | Optional bearer token for webhook |
| `TURNSTILE_SECRET_KEY`      | server secret | Cloudflare Turnstile verification |
| `PUBLIC_TURNSTILE_SITE_KEY` | client        | Turnstile widget rendering        |
| `PUBLIC_UMAMI_SCRIPT_URL`   | client        | Umami analytics script URL        |
| `PUBLIC_UMAMI_WEBSITE_ID`   | client        | Umami website ID                  |

**Cloudflare Turnstile test keys** (for local dev / CI — always pass):

- Site key: `1x00000000000000000000AA`
- Secret key: `1x0000000000000000000000000000000AA`

## Architecture

### Static-first

Indexable pages are prerendered to static assets. Two routes run on the Node
server: `src/pages/api/audit-request.ts` handles form submissions and
`src/pages/sk/[...path].astro` returns a localized HTTP 404 for unmatched
Slovak URLs. This keeps:

- HTML served as static assets (performance)
- Sitemap complete (all routes included)

### Secrets

Server-side secrets are read via `astro:env/server` (type-safe). Never use
`import.meta.env` for runtime secrets — they're inlined at build time and
won't exist in the Cloud Run environment.

### Contact form

- 4 required fields (name, email, project type, message) + 7 optional
- Honeypot + Cloudflare Turnstile (client widget + server-side verification)
- Webhook POST with 8s timeout (AbortController), non-2xx handling
- `mailto:` fallback in the error state
- Rate limiting: in-memory counter (per-instance)
- Dev mode: returns success with console warning if `WEBHOOK_URL` is unset

### Analytics

- Umami Cloud (EU/Frankfurt region) — cookieless, no consent banner required
- Custom events: CTA clicks, form start/submit, service card clicks, FAQ opens,
  ecosystem link clicks, email clicks, scroll depth (50% and 90%)
- Scroll depth and form-start tracking require custom listeners (in BaseLayout)

### Security headers

- Defined once in `security-headers.mjs` and applied by both the Node wrapper
  and Astro middleware
- CSP includes Turnstile and Umami domains — update if using a custom Umami domain
- HSTS includes subdomains and preload now that the canonical domain is HTTPS
- `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`)
- Fingerprinted assets use immutable one-year caching; HTML revalidates
- The production wrapper compresses eligible responses

## Deployment

### Azure Container Apps (primary)

The Azure workflow (`.github/workflows/azure-deploy.yml`) runs on every push to
`main`:

1. Quality gates (format, typecheck, tests, build, audits, content guard)
2. i18n translation completeness check (when SK content changes)
3. Blocking Lighthouse and browser smoke tests
4. Build and push the Docker image to Azure Container Registry
5. Roll out the image to Azure Container Apps and health-check it

The `prod` GitHub environment requires the Azure OIDC variables documented at
the top of the workflow. The audit form and production analytics remain
deployment configuration concerns; the workflow comments record their current
status.

### GCP Cloud Run (manual fallback)

`.github/workflows/deploy.yml` is available through `workflow_dispatch` during
the Azure soak window. Its `prod` environment uses these secrets:

| Secret                            | Purpose                                                 |
| --------------------------------- | ------------------------------------------------------- |
| `GCP_WIF_PROVIDER`                | Workload Identity Federation provider URL               |
| `GCP_SA_EMAIL`                    | GCP service account email for auth                      |
| `GCP_PROJECT_ID`                  | GCP project ID                                          |
| `GAR_LOCATION`                    | Artifact Registry location (e.g. `europe-west1`)        |
| `GAR_REPOSITORY`                  | Artifact Registry repository name                       |
| `CR_SERVICE_NAME`                 | Cloud Run service name                                  |
| `CR_LOCATION`                     | Cloud Run region (e.g. `europe-west1`)                  |
| `PUBLIC_TURNSTILE_SITE_KEY`       | Turnstile site key (client)                             |
| `PUBLIC_UMAMI_SCRIPT_URL`         | Umami script URL (client)                               |
| `PUBLIC_UMAMI_WEBSITE_ID`         | Umami website ID (client)                               |
| `GCP_WEBHOOK_URL_SECRET`          | GCP Secret Manager secret name for WEBHOOK_URL          |
| `GCP_WEBHOOK_TOKEN_SECRET`        | GCP Secret Manager secret name for WEBHOOK_TOKEN        |
| `GCP_TURNSTILE_SECRET_KEY_SECRET` | GCP Secret Manager secret name for TURNSTILE_SECRET_KEY |

**GCP Secret Manager secrets** (must be created before first deploy):

```bash
gcloud secrets create WEBHOOK_URL --replication-policy=automatic
echo -n "your-webhook-url" | gcloud secrets versions add WEBHOOK_URL

gcloud secrets create WEBHOOK_TOKEN --replication-policy=automatic
echo -n "your-token" | gcloud secrets versions add WEBHOOK_TOKEN

gcloud secrets create TURNSTILE_SECRET_KEY --replication-policy=automatic
echo -n "your-secret" | gcloud secrets versions add TURNSTILE_SECRET_KEY
```

### Local container smoke test

```bash
bun run build
docker build -t euhub-web-dev-studio .
docker run -p 8080:8080 \
  -e WEBHOOK_URL=... \
  -e TURNSTILE_SECRET_KEY=... \
  -e PUBLIC_TURNSTILE_SITE_KEY=... \
  euhub-web-dev-studio
```

## Performance targets

- Lighthouse Performance: 95+
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 100
- Lighthouse SEO: 100

`lighthouserc.cjs` enforces these thresholds across three runs of four
representative English and Slovak routes. Performance claims should only be
published from retained, reproducible production evidence.

## Accessibility

- Semantic HTML with proper heading hierarchy
- Keyboard navigation with visible focus states
- Skip-to-content link
- `prefers-reduced-motion` respected (animations disabled)
- No hover-only essential information
- Mobile menu accessible by keyboard (Escape to close)
- Form labels and ARIA where necessary
- Sufficient color contrast

## Legal

- `/privacy/` — Privacy Policy
- `/cookies/` — Cookie Policy
- `/terms/` — Terms of Service
- `/services/` — English service index and seven service detail pages
- `/sk/sluzby/` — Slovak service index and seven service detail pages
- `/llms.txt` — generated AI-discovery summary
- `/sitemap.xml` — explicit bilingual sitemap with alternates and last-modified dates

Legal content is interim and must be reviewed by legal counsel against the
actual deployment (Umami Cloud EU, Cloudflare, webhook host) before launch.

## Project structure

```
src/
  components/
    layout/      # Header, Footer
    sections/    # Landing-page sections
    services/    # Service index and detail renderers
    ui/          # Button, Card, Container, Section, Badge, Icon
    forms/       # AuditRequestForm (React island)
  content/       # Typed bilingual site and service content
  layouts/       # BaseLayout, LegalLayout
  pages/         # home, services, legal, discovery, sitemap, 404, API
  styles/        # global.css (Tailwind v4 + tokens + scroll-reveal)
  lib/           # validation, analytics, and SEO builders
public/          # robots.txt, icons, manifest, and static metadata assets
docs/            # Source prompt, reviews, conversion architecture
```

## Definition of Done

See `docs/conversion-architecture.md` and the plan reviews in `docs/` for the
full DoD checklist. CI gates (Playwright smoke test + Lighthouse CI) are
required before merge to `main`.
