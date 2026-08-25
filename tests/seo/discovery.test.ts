import { expect, test } from 'vitest';
import { buildLlmsTxt } from '../../src/lib/seo/discovery';

test('generates discovery links only from approved bilingual records', () => {
  const text = buildLlmsTxt();

  expect(text).toContain('# Build with EUHub');
  expect(text).not.toContain('https://build.euhub.co/services/');
  expect(text).not.toContain('/services/business-websites/');
  expect(text).not.toContain('/sk/sluzby/firemne-weby/');
  expect(text.match(/^### /gm)).toBeNull();
  expect(text).toContain('pending native-language approval');
  expect(text).not.toContain('Engineers Incubator');
  expect(text).not.toContain('Horná 67');
  expect(text).not.toMatch(/award-winning|certified expert|trusted by \d+/i);
});
