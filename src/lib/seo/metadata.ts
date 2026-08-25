import { getAlternateUrls, pathFor } from './paths';
import type { SeoPage } from './types';

export const productionSiteUrl = new URL('https://build.euhub.co');

export function pageUrl(seo: SeoPage, siteUrl = productionSiteUrl): string {
  return new URL(pathFor(seo.paths, seo.locale), siteUrl).href;
}

export function pageAlternates(seo: SeoPage, siteUrl = productionSiteUrl) {
  return getAlternateUrls(seo.paths, siteUrl);
}
