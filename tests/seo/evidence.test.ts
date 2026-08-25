import { expect, test } from 'vitest';
import {
  performanceEvidence,
  shouldIndexEvidence,
} from '../../src/content/evidence';

test('keeps production performance evidence pending until capture is approved', () => {
  expect(performanceEvidence).toMatchObject({
    status: 'pending',
    target: 'https://build.euhub.co/',
    method: {
      tool: 'Lighthouse',
      runs: 3,
      strategy: 'mobile',
    },
  });
  expect(shouldIndexEvidence(performanceEvidence)).toBe(false);
  expect(performanceEvidence).not.toHaveProperty('scores');
});
