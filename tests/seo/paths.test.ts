import { expect, test } from 'vitest';
import {
  getAlternateUrls,
  legalPathsFor,
  navigationHrefFor,
  seoPaths,
} from '../../src/lib/seo/paths';

test('defines the approved, trailing-slash path pair for every fixed route', () => {
  expect(seoPaths).toMatchObject({
    home: { en: '/', sk: '/sk/' },
    services: { en: '/services/', sk: '/sk/sluzby/' },
    businessWebsites: {
      en: '/services/business-websites/',
      sk: '/sk/sluzby/firemne-weby/',
    },
    landingPages: {
      en: '/services/landing-pages/',
      sk: '/sk/sluzby/landing-pages/',
    },
    webApplications: {
      en: '/services/web-applications/',
      sk: '/sk/sluzby/webove-aplikacie/',
    },
    aiInterfaces: {
      en: '/services/ai-interfaces/',
      sk: '/sk/sluzby/ai-rozhrania/',
    },
    redesignMigration: {
      en: '/services/website-redesign-migration/',
      sk: '/sk/sluzby/redizajn-migracia-webu/',
    },
    apiIntegrations: {
      en: '/services/api-integrations/',
      sk: '/sk/sluzby/api-integracie/',
    },
    maintenanceDevops: {
      en: '/services/maintenance-devops/',
      sk: '/sk/sluzby/udrzba-devops/',
    },
    about: { en: '/about/', sk: '/sk/o-nas/' },
    work: { en: '/work/', sk: '/sk/realizacie/' },
    evidence: { en: '/evidence/', sk: '/sk/dokazy/' },
    guides: { en: '/guides/', sk: '/sk/sprievodcovia/' },
    technicalWebAudit: {
      en: '/guides/technical-web-audit/',
      sk: '/sk/sprievodcovia/technicky-webovy-audit/',
    },
    webDevelopmentCostEu: {
      en: '/guides/web-development-cost-eu/',
      sk: '/sk/sprievodcovia/cena-vyvoja-webu-eu/',
    },
    legacySoapIntegration: {
      en: '/guides/legacy-soap-integration/',
      sk: '/sk/sprievodcovia/integracia-legacy-soap/',
    },
  });

  for (const paths of Object.values(seoPaths)) {
    expect(paths.en).toMatch(/^\/$|^\/.*\/$/);
    expect(paths.sk).toMatch(/^\/sk\/$|^\/sk\/.*\/$/);
    expect(paths.en).not.toBe(paths.sk);
  }
});

test('generates reciprocal alternate URLs without a duplicated Slovak prefix', () => {
  expect(
    getAlternateUrls(seoPaths.home, new URL('https://build.euhub.co')),
  ).toEqual({
    en: 'https://build.euhub.co/',
    sk: 'https://build.euhub.co/sk/',
    default: 'https://build.euhub.co/',
  });
  expect(
    getAlternateUrls(seoPaths.home, new URL('https://build.euhub.co')).sk,
  ).not.toContain('/sk/sk/');
});

test('keeps footer and form legal links in the active locale', () => {
  expect(legalPathsFor('en')).toEqual({
    privacy: '/privacy/',
    cookies: '/cookies/',
    terms: '/terms/',
  });
  expect(legalPathsFor('sk')).toEqual({
    privacy: '/sk/privacy/',
    cookies: '/sk/cookies/',
    terms: '/sk/terms/',
  });
});

test('resolves fragment navigation through the localized homepage', () => {
  expect(navigationHrefFor('en', '#services')).toBe('/#services');
  expect(navigationHrefFor('sk', '#services')).toBe('/sk/#services');
  expect(navigationHrefFor('sk', 'https://euhub.co')).toBe('https://euhub.co');
});
