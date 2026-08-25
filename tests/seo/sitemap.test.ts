import { expect, test } from 'vitest';
import {
  buildSitemapIndexXml,
  buildSitemapXml,
  getSitemapEntries,
} from '../../src/lib/seo/sitemap';

test('publishes every active EN/SK pair with approved lastmod data', () => {
  const entries = getSitemapEntries();

  expect(entries).toHaveLength(24);
  expect(entries.filter((entry) => entry.locale === 'en')).toHaveLength(12);
  expect(entries.filter((entry) => entry.locale === 'sk')).toHaveLength(12);

  for (const entry of entries) {
    expect(entry.loc).toMatch(/^https:\/\/build\.euhub\.co\//);
    expect(entry.lastmod).toMatch(/^2026-\d{2}-\d{2}$/);
    expect(entry.alternates.en).toMatch(/^https:\/\/build\.euhub\.co\//);
    expect(entry.alternates.sk).toMatch(/^https:\/\/build\.euhub\.co\/sk\//);
    expect(entry.alternates.default).toBe(entry.alternates.en);
  }
});

test('renders explicit alternate and lastmod elements for localized slugs', () => {
  const xml = buildSitemapXml();

  expect(xml.match(/<url>/g)).toHaveLength(24);
  expect(xml).toContain(
    '<loc>https://build.euhub.co/services/business-websites/</loc>',
  );
  expect(xml).toContain(
    'hreflang="sk-SK" href="https://build.euhub.co/sk/sluzby/firemne-weby/"',
  );
  expect(xml).toContain('<lastmod>2026-08-26</lastmod>');
  expect(buildSitemapIndexXml()).toContain(
    '<loc>https://build.euhub.co/sitemap.xml</loc>',
  );
});
