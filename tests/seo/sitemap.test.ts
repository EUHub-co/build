import { expect, test } from 'vitest';
import {
  buildSitemapIndexXml,
  buildSitemapXml,
  getSitemapEntries,
} from '../../src/lib/seo/sitemap';

test('publishes only approved EN/SK pairs with source-owned lastmod data', () => {
  const entries = getSitemapEntries();

  expect(entries).toHaveLength(8);
  expect(entries.filter((entry) => entry.locale === 'en')).toHaveLength(4);
  expect(entries.filter((entry) => entry.locale === 'sk')).toHaveLength(4);

  for (const entry of entries) {
    expect(entry.loc).toMatch(/^https:\/\/build\.euhub\.co\//);
    expect(entry.lastmod).toMatch(/^2026-\d{2}-\d{2}$/);
    expect(entry.alternates.en).toMatch(/^https:\/\/build\.euhub\.co\//);
    expect(entry.alternates.sk).toMatch(/^https:\/\/build\.euhub\.co\/sk\//);
    expect(entry.alternates.default).toBe(entry.alternates.en);
  }

  expect(entries.find((entry) => entry.loc.endsWith('/'))?.lastmod).toBe(
    '2026-08-25',
  );
  expect(entries.find((entry) => entry.loc.endsWith('/terms/'))?.lastmod).toBe(
    '2026-07-06',
  );
  expect(entries.some((entry) => entry.loc.includes('/services/'))).toBe(false);
});

test('renders explicit alternate and lastmod elements for localized slugs', () => {
  const xml = buildSitemapXml();

  expect(xml.match(/<url>/g)).toHaveLength(8);
  expect(xml).not.toContain('/services/business-websites/');
  expect(xml).toContain('<lastmod>2026-08-25</lastmod>');
  expect(xml).toContain('<lastmod>2026-07-06</lastmod>');
  expect(buildSitemapIndexXml()).toContain(
    '<loc>https://build.euhub.co/sitemap.xml</loc>',
  );
});
