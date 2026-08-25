import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import {
  performanceEvidence,
  shouldIndexEvidence,
} from '../src/content/evidence';
import { areAllServicePairsPublished } from '../src/content/service-pages';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const siteRoot = join(projectRoot, 'dist', 'client');
const issues: string[] = [];
const indexableCanonicals = new Set<string>();
const servicePairsApproved = areAllServicePairsPublished();
const evidenceApproved = shouldIndexEvidence(performanceEvidence);

async function filesWithExtension(
  directory: string,
  extension: string,
): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) return filesWithExtension(file, extension);
      return entry.isFile() && entry.name.endsWith(extension) ? [file] : [];
    }),
  );
  return nested.flat();
}

for (const file of await filesWithExtension(siteRoot, '.html')) {
  const label = relative(siteRoot, file);
  const $ = load(await readFile(file, 'utf8'));
  const noindex = $('meta[name="robots"][content*="noindex"]').length > 0;
  const isServiceDocument =
    label === 'services/index.html' ||
    label === 'sk/sluzby/index.html' ||
    label.startsWith('services/') ||
    label.startsWith('sk/sluzby/');
  if (isServiceDocument && noindex !== !servicePairsApproved) {
    issues.push(`${label}: publication state does not match pair approval`);
  }
  const isEvidenceDocument =
    label === 'evidence/index.html' || label === 'sk/dokazy/index.html';
  if (isEvidenceDocument && noindex !== !evidenceApproved) {
    issues.push(`${label}: publication state does not match evidence approval`);
  }
  if (noindex) continue;

  for (const selector of [
    'title',
    'meta[name="description"]',
    'link[rel="canonical"]',
  ]) {
    if ($(selector).length !== 1)
      issues.push(`${label}: expected one ${selector}`);
  }
  if ($('h1').length !== 1) issues.push(`${label}: expected exactly one h1`);

  const canonical = $('link[rel="canonical"]').attr('href') ?? '';
  indexableCanonicals.add(canonical);
  if (!canonical.startsWith('https://build.euhub.co/')) {
    issues.push(`${label}: canonical is not absolute production URL`);
  }
  if (canonical.includes('/sk/sk/'))
    issues.push(`${label}: duplicated Slovak path`);

  const description = $('meta[name="description"]').attr('content') ?? '';
  if (description.length > 160) {
    issues.push(`${label}: meta description exceeds 160 characters`);
  }

  for (const language of ['en-GB', 'sk-SK', 'x-default']) {
    const href = $(`link[rel="alternate"][hreflang="${language}"]`).attr(
      'href',
    );
    if (!href) issues.push(`${label}: missing ${language} alternate`);
    if (href?.includes('/sk/sk/'))
      issues.push(`${label}: ${language} alternate duplicates /sk/`);
  }

  const ids = new Set<string>();
  const schemaTypes = new Set<string>();
  $('script[type="application/ld+json"]').each((_, element) => {
    try {
      const value = JSON.parse($(element).html() ?? '{}');
      const nodes = value['@graph'] ?? [value];
      for (const node of nodes) {
        const nodeTypes = Array.isArray(node?.['@type'])
          ? node['@type']
          : [node?.['@type']];
        for (const type of nodeTypes) if (type) schemaTypes.add(type);
        if (node?.['@id'] && ids.has(node['@id']))
          issues.push(`${label}: duplicate schema @id ${node['@id']}`);
        if (node?.['@id']) ids.add(node['@id']);
        if (
          node?.['@type'] === 'HowTo' ||
          node?.['@type'] === 'SpeakableSpecification'
        ) {
          issues.push(`${label}: unsupported schema type ${node['@type']}`);
        }
      }
    } catch {
      issues.push(`${label}: malformed JSON-LD`);
    }
  });

  for (const requiredType of ['WebSite', 'Organization', 'WebPage']) {
    if (!schemaTypes.has(requiredType)) {
      issues.push(`${label}: missing ${requiredType} schema`);
    }
  }

  const isServiceDetail =
    /\/services\/[^/]+\/$/.test(canonical) ||
    /\/sk\/sluzby\/[^/]+\/$/.test(canonical);
  if (isServiceDetail) {
    for (const requiredType of ['Service', 'FAQPage', 'BreadcrumbList']) {
      if (!schemaTypes.has(requiredType)) {
        issues.push(`${label}: missing ${requiredType} schema`);
      }
    }
    const visibleText = $('body')
      .clone()
      .find('script, style, svg, noscript')
      .remove()
      .end()
      .text();
    const words = visibleText.match(/[\p{L}\p{N}][\p{L}\p{N}’'-]*/gu) ?? [];
    if (words.length < 400) {
      issues.push(
        `${label}: service page has only ${words.length} visible words`,
      );
    }
  }

  if (
    canonical === 'https://build.euhub.co/' ||
    canonical === 'https://build.euhub.co/sk/'
  ) {
    if ($('table caption').length === 0) {
      issues.push(`${label}: engagement comparison table is missing`);
    }

    const expectedLegalPrefix = canonical.endsWith('/sk/') ? '/sk/' : '/';
    for (const route of ['privacy', 'cookies', 'terms']) {
      const href = `${expectedLegalPrefix}${route}/`;
      if ($(`footer a[href="${href}"]`).length === 0) {
        issues.push(`${label}: footer is missing localized ${href} link`);
      }
    }
  }
}

for (const file of await filesWithExtension(siteRoot, '.css')) {
  const css = await readFile(file, 'utf8');
  if (/url\(data:font\//.test(css)) {
    issues.push(`${relative(siteRoot, file)}: embeds a font blocked by CSP`);
  }
}

const sitemap = await readFile(join(siteRoot, 'sitemap.xml'), 'utf8');
const sitemapUrlCount = (sitemap.match(/<url>/g) ?? []).length;
const sitemapLocs = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
);
if (sitemapUrlCount !== indexableCanonicals.size) {
  issues.push(
    `sitemap.xml: expected ${indexableCanonicals.size} indexable URL entries, found ${sitemapUrlCount}`,
  );
}
if ((sitemap.match(/<lastmod>/g) ?? []).length !== sitemapUrlCount) {
  issues.push('sitemap.xml: every URL must have approved lastmod data');
}
for (const canonical of indexableCanonicals) {
  if (!sitemapLocs.has(canonical)) {
    issues.push(`sitemap.xml: missing indexable canonical ${canonical}`);
  }
}
for (const loc of sitemapLocs) {
  if (!indexableCanonicals.has(loc)) {
    issues.push(`sitemap.xml: includes non-indexable URL ${loc}`);
  }
}

const llms = await readFile(join(siteRoot, 'llms.txt'), 'utf8');
if (
  !indexableCanonicals.has('https://build.euhub.co/services/') &&
  llms.includes('https://build.euhub.co/services/')
) {
  issues.push('llms.txt: exposes service links before publication approval');
}

if (issues.length) {
  throw new Error(
    `Built-site audit failed:\n${issues.map((issue) => `- ${issue}`).join('\n')}`,
  );
}

console.log('Built-site audit passed.');
