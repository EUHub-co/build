import { expect, test } from 'vitest';
import { getAlternatePath } from '../../src/lib/i18n';

test('keeps the Slovak homepage alternate at /sk/', () => {
  expect(
    getAlternatePath(new URL('https://build.euhub.co/sk/'), 'sk'),
  ).toBe('/sk/');
});
