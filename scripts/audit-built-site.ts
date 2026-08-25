import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const siteRoot = join(projectRoot, 'dist', 'client');
const issues: string[] = [];

async function htmlFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) return htmlFiles(file);
      return entry.isFile() && entry.name.endsWith('.html') ? [file] : [];
    }),
  );
  return nested.flat();
}

for (const file of await htmlFiles(siteRoot)) {
  const label = relative(siteRoot, file);
  const $ = load(await readFile(file, 'utf8'));
  const noindex = $('meta[name="robots"][content*="noindex"]').length > 0;
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
  if (!canonical.startsWith('https://build.euhub.co/')) {
    issues.push(`${label}: canonical is not absolute production URL`);
  }
  if (canonical.includes('/sk/sk/'))
    issues.push(`${label}: duplicated Slovak path`);

  for (const language of ['en-GB', 'sk-SK', 'x-default']) {
    const href = $(`link[rel="alternate"][hreflang="${language}"]`).attr(
      'href',
    );
    if (!href) issues.push(`${label}: missing ${language} alternate`);
    if (href?.includes('/sk/sk/'))
      issues.push(`${label}: ${language} alternate duplicates /sk/`);
  }

  const ids = new Set<string>();
  $('script[type="application/ld+json"]').each((_, element) => {
    try {
      const value = JSON.parse($(element).html() ?? '{}');
      const nodes = value['@graph'] ?? [value];
      for (const node of nodes) {
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
}

if (issues.length) {
  throw new Error(
    `Built-site audit failed:\n${issues.map((issue) => `- ${issue}`).join('\n')}`,
  );
}

console.log('Built-site audit passed.');
