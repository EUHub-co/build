# SEO / GEO / AEO 10/10 design contract

## Objective

Make `build.euhub.co` technically correct, fully bilingual (English and Slovak), evidence-backed, and independently auditable for conventional, generative, and answer search. “10/10” applies only to the on-site acceptance matrix; rankings, citations, links, and indexing are external outcomes.

## Non-negotiable rules

- English URLs are unprefixed and Slovak URLs are under `/sk/`.
- Each indexable document has an approved EN/SK pair, self-canonical, reciprocal `en-GB` and `sk-SK` alternates, and `x-default`.
- Routing comes from explicit typed path pairs—never inferred by string replacement in a layout.
- The site has no browser-language redirect. Visitors use language links.
- Shared UI contains no visitor-visible hard-coded prose. Typed locale records supply every language-dependent string.
- Schema is derived from the visible content records. It never invents facts or asserts unsupported rich-result eligibility.
- `FAQPage` is only used for visible Q&A; delivery steps use an `ItemList`, not `HowTo`; no `SpeakableSpecification` is emitted.
- `llms.txt` is a generated discovery supplement, not an AI-ranking mechanism.
- Sitemap `lastmod` derives only from approved content `updatedAt` data.

## Evidence publication boundary

The repository currently has no approved biographies, professional profile URLs, case-study evidence packs, publicly named client approval, or production performance measurements. The implementation must represent these as unavailable/pending and reject publication until an accountable approver supplies the required facts. It must not create placeholder experts, client names, testimonials, credentials, metrics, quotations, results, or claims.

## Delivery surfaces

The implementation covers the fixed home/service/about/work/evidence/guides path map, localized metadata and schema, secure server responses, semantic answer formats, generated discovery files, built-site checks, and CI gates. About/profile, case-study, and expert-guide routes are enabled only once their validated source facts exist.

## Completion evidence

Local verification is `bun install --frozen-lockfile && bun run verify`. Deployment, production Lighthouse capture, Search Console submission, and indexing/visibility measurement require deployment and account authority outside this worktree.
