import type { Locale } from '../../content/types';
import type { LocalizedPaths } from './types';

const path = (en: `/${string}`, sk: `/sk/${string}`): LocalizedPaths => ({
  en,
  sk,
});

/** The public information architecture. Nested routes must declare a pair here. */
export const seoPaths = {
  home: path('/', '/sk/'),
  services: path('/services/', '/sk/sluzby/'),
  businessWebsites: path(
    '/services/business-websites/',
    '/sk/sluzby/firemne-weby/',
  ),
  landingPages: path('/services/landing-pages/', '/sk/sluzby/landing-pages/'),
  webApplications: path(
    '/services/web-applications/',
    '/sk/sluzby/webove-aplikacie/',
  ),
  aiInterfaces: path('/services/ai-interfaces/', '/sk/sluzby/ai-rozhrania/'),
  redesignMigration: path(
    '/services/website-redesign-migration/',
    '/sk/sluzby/redizajn-migracia-webu/',
  ),
  apiIntegrations: path(
    '/services/api-integrations/',
    '/sk/sluzby/api-integracie/',
  ),
  maintenanceDevops: path(
    '/services/maintenance-devops/',
    '/sk/sluzby/udrzba-devops/',
  ),
  about: path('/about/', '/sk/o-nas/'),
  work: path('/work/', '/sk/realizacie/'),
  evidence: path('/evidence/', '/sk/dokazy/'),
  guides: path('/guides/', '/sk/sprievodcovia/'),
  technicalWebAudit: path(
    '/guides/technical-web-audit/',
    '/sk/sprievodcovia/technicky-webovy-audit/',
  ),
  webDevelopmentCostEu: path(
    '/guides/web-development-cost-eu/',
    '/sk/sprievodcovia/cena-vyvoja-webu-eu/',
  ),
  legacySoapIntegration: path(
    '/guides/legacy-soap-integration/',
    '/sk/sprievodcovia/integracia-legacy-soap/',
  ),
  privacy: path('/privacy/', '/sk/privacy/'),
  cookies: path('/cookies/', '/sk/cookies/'),
  terms: path('/terms/', '/sk/terms/'),
  notFound: path('/404/', '/sk/404/'),
} as const satisfies Record<string, LocalizedPaths>;

export function pathFor(paths: LocalizedPaths, locale: Locale): `/${string}` {
  return paths[locale];
}

export function getAlternateUrls(
  paths: LocalizedPaths,
  siteUrl: URL,
): {
  en: string;
  sk: string;
  default: string;
} {
  return {
    en: new URL(paths.en, siteUrl).href,
    sk: new URL(paths.sk, siteUrl).href,
    default: new URL(paths.en, siteUrl).href,
  };
}

export function legalPathsFor(locale: Locale) {
  return {
    privacy: pathFor(seoPaths.privacy, locale),
    cookies: pathFor(seoPaths.cookies, locale),
    terms: pathFor(seoPaths.terms, locale),
  } as const;
}
