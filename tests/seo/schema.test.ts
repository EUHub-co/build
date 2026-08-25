import { expect, test } from 'vitest';
import { getContent } from '../../src/lib/i18n';
import { seoPaths } from '../../src/lib/seo/paths';
import {
  buildOrganizationSchema,
  buildServiceSchema,
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

test('publishes the legal identity already disclosed in the terms', () => {
  const organization = buildOrganizationSchema('sk');

  expect(organization['@id']).toBe('https://build.euhub.co/#organization');
  expect(organization.name).toBe('Build with EUHub');
  expect(organization.legalName).toBe('Engineers Incubator s. r. o.');
  expect(organization.email).toBe('hello@euhub-ai.com');
  expect(organization.address).toMatchObject({
    '@type': 'PostalAddress',
    streetAddress: 'Horná 67',
    addressLocality: 'Banská Bystrica',
    postalCode: '974 01',
    addressCountry: 'SK',
  });
  expect(organization.vatID).toBe('SK2121479470');
});

test('models a visible service without inventing ratings or outcomes', () => {
  const schema = buildServiceSchema({
    name: 'Modern business websites',
    description: 'Fast, responsive websites for European businesses.',
    url: 'https://build.euhub.co/services/business-websites/',
    locale: 'en',
  });

  expect(schema).toMatchObject({
    '@type': 'Service',
    name: 'Modern business websites',
    areaServed: 'European Union',
    provider: { '@id': 'https://build.euhub.co/#organization' },
  });
  expect(schema).not.toHaveProperty('aggregateRating');
  expect(schema).not.toHaveProperty('review');
});
