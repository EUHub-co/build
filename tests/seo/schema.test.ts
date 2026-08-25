import { expect, test } from 'vitest';
import { getContent } from '../../src/lib/i18n';
import { seoPaths } from '../../src/lib/seo/paths';
import {
  buildOrganizationSchema,
  buildWebPageSchema,
  buildWebSiteSchema,
} from '../../src/lib/seo/schema';
import type { SeoPage } from '../../src/lib/seo/types';

const englishHomepage: SeoPage = {
  locale: 'en',
  paths: seoPaths.home,
  title: getContent('en').site.site.seo.title,
  description: getContent('en').site.site.seo.description,
  ogImage: '/og.png',
  pageType: 'website',
  updatedAt: '2026-08-25',
};

test('uses stable site IDs and locale-specific visible metadata', () => {
  const website = buildWebSiteSchema(englishHomepage);
  const webpage = buildWebPageSchema(englishHomepage);

  expect(website['@id']).toBe('https://build.euhub.co/#website');
  expect(webpage['@id']).toBe('https://build.euhub.co/#webpage');
  expect(webpage.name).toBe(englishHomepage.title);
  expect(webpage.description).toBe(englishHomepage.description);
});

test('does not manufacture legal identity or social profiles without approval', () => {
  const organization = buildOrganizationSchema('sk');

  expect(organization['@id']).toBe('https://build.euhub.co/#organization');
  expect(organization.name).toBe('Build with EUHub');
  expect(organization).not.toHaveProperty('legalName');
  expect(organization).not.toHaveProperty('sameAs');
});
