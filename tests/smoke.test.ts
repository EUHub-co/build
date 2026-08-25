import { expect, test } from 'vitest';
import { locales } from '../src/content/types';

test('exposes the English and Slovak locales used by public pages', () => {
  expect(locales).toEqual(['en', 'sk']);
});
