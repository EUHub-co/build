import { expect, test } from 'vitest';
import { getContent } from '../../src/lib/i18n';

test('provides Slovak primary headings instead of English fallback copy', () => {
  expect(getContent('sk')).toMatchObject({
    ui: {
      hero: {
        heading:
          'Prémiové weby, webové aplikácie a AI rozhrania pre európske firmy.',
      },
      faq: {
        heading: 'Často kladené otázky',
      },
    },
  });
});

test('keeps every required homepage heading in the Slovak locale record', () => {
  const { ui } = getContent('sk');
  const headings = [
    ui.hero.heading,
    ui.problem.heading,
    ui.services.heading,
    ui.differentiation.heading,
    ui.process.heading,
    ui.techStack.heading,
    ui.examples.heading,
    ui.engagement.heading,
    ui.proof.heading,
    ui.contact.heading,
    ui.ecosystem.heading,
    ui.faq.heading,
  ];

  expect(headings).toEqual([
    'Prémiové weby, webové aplikácie a AI rozhrania pre európske firmy.',
    'Váš web pravdepodobne nie je skutočný problém. Problém je systém za ním.',
    'Každá služba rieši konkrétnu biznis potrebu — nie je to šablóna doplnená vaším logom.',
    'Dizajn je len viditeľná vrstva.',
    'Od auditu po spustenie bez chaosu',
    'Postavené podľa moderných technických štandardov',
    'Príklady projektových scenárov',
    'Ako s nami môžete spolupracovať',
    'Tento web je dôkaz.',
    'Začnite technickým auditom webu.',
    'Súčasť inžinierskeho ekosystému EUHUB',
    'Často kladené otázky',
  ]);
});

test('supplies non-empty locale-specific UI values', () => {
  const english = JSON.stringify(getContent('en').ui);
  const slovak = JSON.stringify(getContent('sk').ui);

  expect(english).not.toEqual(slovak);
  expect(slovak).not.toMatch(/Frequently asked questions|Request an audit/);
});
