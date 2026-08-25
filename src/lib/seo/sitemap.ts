import type { Locale } from '../../content/types';
import {
  areAllServicePairsPublished,
  getPublishedServicePagePairs,
} from '../../content/service-pages';
import { getContent } from '../i18n';
import { getAlternateUrls, seoPaths } from './paths';
import { productionSiteUrl } from './metadata';
import type { LocalizedPaths } from './types';

interface SitemapEntry {
  locale: Locale;
  loc: string;
  lastmod: string;
  alternates: ReturnType<typeof getAlternateUrls>;
}

interface SitemapPair {
  paths: LocalizedPaths;
  updatedAt: Record<Locale, string>;
}

function getPublishedPairs(): SitemapPair[] {
  const enContent = getContent('en');
  const skContent = getContent('sk');
  const servicePairs = getPublishedServicePagePairs().map(({ en, sk }) => ({
    paths: en.paths,
    updatedAt: { en: en.updatedAt, sk: sk.updatedAt },
  }));
  const serviceIndexPair = areAllServicePairsPublished()
    ? [
        {
          paths: seoPaths.services,
          updatedAt: {
            en: enContent.ui.servicePages.indexSeo.updatedAt,
            sk: skContent.ui.servicePages.indexSeo.updatedAt,
          },
        },
      ]
    : [];

  return [
    {
      paths: seoPaths.home,
      updatedAt: {
        en: enContent.site.site.seo.updatedAt,
        sk: skContent.site.site.seo.updatedAt,
      },
    },
    ...serviceIndexPair,
    ...servicePairs,
    {
      paths: seoPaths.privacy,
      updatedAt: {
        en: enContent.legal.privacyPolicy.lastUpdated,
        sk: skContent.legal.privacyPolicy.lastUpdated,
      },
    },
    {
      paths: seoPaths.cookies,
      updatedAt: {
        en: enContent.legal.cookiePolicy.lastUpdated,
        sk: skContent.legal.cookiePolicy.lastUpdated,
      },
    },
    {
      paths: seoPaths.terms,
      updatedAt: {
        en: enContent.legal.terms.lastUpdated,
        sk: skContent.legal.terms.lastUpdated,
      },
    },
  ];
}

export function getSitemapEntries(): SitemapEntry[] {
  return getPublishedPairs().flatMap(({ paths, updatedAt }) => {
    const alternates = getAlternateUrls(paths, productionSiteUrl);
    return (['en', 'sk'] as const).map((locale) => ({
      locale,
      loc: new URL(paths[locale], productionSiteUrl).href,
      lastmod: updatedAt[locale],
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
