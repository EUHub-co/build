import { expect, test } from 'vitest';
import { buildLlmsTxt } from '../../src/lib/seo/discovery';

test('generates AI discovery links from the active bilingual service records', () => {
  const text = buildLlmsTxt();

  expect(text).toContain('# Build with EUHub');
  expect(text).toContain('https://build.euhub.co/services/');
  expect(text).toContain('https://build.euhub.co/services/business-websites/');
  expect(text).toContain('https://build.euhub.co/sk/sluzby/firemne-weby/');
  expect(text.match(/^### /gm)).toHaveLength(7);
  expect(text).not.toMatch(/award-winning|certified expert|trusted by \d+/i);
});
