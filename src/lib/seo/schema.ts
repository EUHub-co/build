import type { Locale } from '../../content/types';
import { pageUrl, productionSiteUrl } from './metadata';
import type { JsonLdNode, SeoPage } from './types';

const siteUrl = productionSiteUrl.href;
const organizationId = `${siteUrl}#organization`;

export function buildWebSiteSchema(seo: SeoPage): JsonLdNode {
  return {
    '@id': `${siteUrl}#website`,
    '@type': 'WebSite',
    name: 'Build with EUHub',
    alternateName: 'EUHub Build',
    url: siteUrl,
    inLanguage: seo.locale === 'sk' ? 'sk-SK' : 'en-GB',
  };
}

export function buildOrganizationSchema(locale: Locale): JsonLdNode {
  return {
    '@id': organizationId,
    '@type': 'Organization',
    name: 'Build with EUHub',
    url: siteUrl,
    logo: `${siteUrl}favicon.svg`,
    inLanguage: locale === 'sk' ? 'sk-SK' : 'en-GB',
  };
}

export function buildItemListSchema(
  name: string,
  items: Array<{ name: string; description: string }>,
): JsonLdNode {
  return {
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      description: item.description,
    })),
  };
}

export function buildServiceSchema(input: {
  name: string;
  description: string;
  url: string;
  locale: Locale;
}): JsonLdNode {
  return {
    '@id': `${input.url}#service`,
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.locale === 'sk' ? 'sk-SK' : 'en-GB',
    areaServed: 'European Union',
    provider: { '@id': organizationId },
  };
}

export function buildWebPageSchema(seo: SeoPage): JsonLdNode {
  return {
    '@id': `${pageUrl(seo)}#webpage`,
    '@type': 'WebPage',
    url: pageUrl(seo),
    name: seo.title,
    description: seo.description,
    inLanguage: seo.locale === 'sk' ? 'sk-SK' : 'en-GB',
    isPartOf: { '@id': `${siteUrl}#website` },
    about: { '@id': organizationId },
    dateModified: seo.updatedAt,
  };
}

export function buildFaqSchema(
  items: Array<{ question: string; answer: string }>,
): JsonLdNode {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
