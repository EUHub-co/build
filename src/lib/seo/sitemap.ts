import type { Locale } from '../../content/types';
import { getServicePages } from '../../content/service-pages';
import { getAlternateUrls, seoPaths } from './paths';
import { productionSiteUrl } from './metadata';
import type { LocalizedPaths } from './types';

interface SitemapEntry {
  locale: Locale;
  loc: string;
  lastmod: string;
  alternates: ReturnType<typeof getAlternateUrls>;
}

const fixedPairs: Array<{ paths: LocalizedPaths; updatedAt: string }> = [
  { paths: seoPaths.home, updatedAt: '2026-08-26' },
  { paths: seoPaths.services, updatedAt: '2026-08-26' },
  ...getServicePages('en').map((page) => ({
    paths: page.paths,
    updatedAt: page.updatedAt,
  })),
  { paths: seoPaths.privacy, updatedAt: '2026-07-13' },
  { paths: seoPaths.cookies, updatedAt: '2026-07-13' },
  { paths: seoPaths.terms, updatedAt: '2026-07-13' },
];

export function getSitemapEntries(): SitemapEntry[] {
  return fixedPairs.flatMap(({ paths, updatedAt }) => {
    const alternates = getAlternateUrls(paths, productionSiteUrl);
    return (['en', 'sk'] as const).map((locale) => ({
      locale,
      loc: new URL(paths[locale], productionSiteUrl).href,
      lastmod: updatedAt,
      alternates,
    }));
  });
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function buildSitemapXml(): string {
  const urls = getSitemapEntries()
    .map(
      (entry) =>
        `<url><loc>${escapeXml(entry.loc)}</loc>` +
        `<lastmod>${entry.lastmod}</lastmod>` +
        `<xhtml:link rel="alternate" hreflang="en-GB" href="${escapeXml(entry.alternates.en)}"/>` +
        `<xhtml:link rel="alternate" hreflang="sk-SK" href="${escapeXml(entry.alternates.sk)}"/>` +
        `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(entry.alternates.default)}"/>` +
        '</url>',
    )
    .join('');

  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
    'xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
    urls +
    '</urlset>'
  );
}

export function buildSitemapIndexXml(): string {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    `<sitemap><loc>${new URL('/sitemap.xml', productionSiteUrl).href}</loc></sitemap>` +
    '</sitemapindex>'
  );
}
