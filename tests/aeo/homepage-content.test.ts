import { expect, test } from 'vitest';
import { getContent } from '../../src/lib/i18n';

test('publishes the approved direct definition of a technical web audit', () => {
  expect(getContent('en').ui.contact.definition).toBe(
    'A technical web audit is a one-week review of a website’s performance, search foundations, accessibility, conversion path, integrations, and technical risk. The result is an evidence-backed action plan separating urgent fixes from rebuild opportunities and work that is not worth doing.',
  );
  expect(getContent('sk').ui.contact.definition).not.toMatch(
    /^A technical web audit/,
  );
});
