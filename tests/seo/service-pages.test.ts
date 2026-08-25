import { expect, test } from 'vitest';
import {
  getServicePageBySlug,
  getServicePages,
} from '../../src/content/service-pages';

test.each(['en', 'sk'] as const)(
  'publishes seven substantial %s service records with unique metadata',
  (locale) => {
    const pages = getServicePages(locale);

    expect(pages).toHaveLength(7);
    expect(new Set(pages.map((page) => page.seoTitle)).size).toBe(7);
    expect(new Set(pages.map((page) => page.paths[locale])).size).toBe(7);

    for (const page of pages) {
      expect(page.seoTitle.length).toBeGreaterThanOrEqual(30);
      expect(page.seoTitle.length).toBeLessThanOrEqual(60);
      expect(page.seoDescription.length).toBeGreaterThanOrEqual(120);
      expect(page.seoDescription.length).toBeLessThanOrEqual(160);
      expect(page.definition.split(/\s+/).length).toBeGreaterThanOrEqual(35);
      expect(page.body).toHaveLength(3);
      expect(page.bestFor.length).toBeGreaterThanOrEqual(3);
      expect(page.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(page.faq).toHaveLength(3);
      expect(page.updatedAt).toBe('2026-08-26');
    }
  },
);

test('resolves locale-specific service slugs without string inference', () => {
  expect(getServicePageBySlug('en', 'business-websites')?.id).toBe(
    'business-websites',
  );
  expect(getServicePageBySlug('sk', 'firemne-weby')?.id).toBe(
    'business-websites',
  );
  expect(getServicePageBySlug('sk', 'business-websites')).toBeUndefined();
});

test('keeps the bilingual service pair out of search until native review', () => {
  expect(
    getServicePages('en').every((page) => page.pairApproved === false),
  ).toBe(true);
  expect(
    getServicePages('sk').every((page) => page.pairApproved === false),
  ).toBe(true);
});
