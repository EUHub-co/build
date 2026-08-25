import type { Locale } from '../../content/types';

export type LocalizedPaths = Readonly<Record<Locale, `/${string}`>>;

export interface SeoPage {
  locale: Locale;
  paths: LocalizedPaths;
  title: string;
  description: string;
  ogImage: `/${string}`;
  pageType: 'website' | 'service' | 'profile' | 'case-study' | 'guide';
  publishedAt?: string;
  updatedAt: string;
  noindex?: boolean;
}

export interface JsonLdNode {
  '@id'?: string;
  '@type': string | string[];
  [property: string]: unknown;
}
