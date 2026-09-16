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
    'Každá služba rieši konkrétnu podnikateľskú potrebu — nie je to šablóna doplnená vaším logom.',
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

test('localizes global accessibility and comparison labels', () => {
  expect(getContent('en').ui.accessibility).toEqual({
    skipToContent: 'Skip to content',
    primaryNavigation: 'Primary navigation',
    mobileNavigation: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    appearance: 'Appearance',
    deviceAppearance: 'Use device appearance',
    lightAppearance: 'Use light appearance',
    darkAppearance: 'Use dark appearance',
  });
  expect(getContent('sk').ui.accessibility).toEqual({
    skipToContent: 'Preskočiť na obsah',
    primaryNavigation: 'Hlavná navigácia',
    mobileNavigation: 'Mobilná navigácia',
    openMenu: 'Otvoriť menu',
    closeMenu: 'Zavrieť menu',
    appearance: 'Vzhľad',
    deviceAppearance: 'Použiť vzhľad zariadenia',
    lightAppearance: 'Použiť svetlý vzhľad',
    darkAppearance: 'Použiť tmavý vzhľad',
  });
  expect(getContent('sk').ui.engagement.comparisonCaption).toBe(
    'Porovnanie modelov spolupráce',
  );
  expect(getContent('en').ui.servicePages.breadcrumbLabel).toBe('Breadcrumb');
  expect(getContent('sk').ui.servicePages.breadcrumbLabel).toBe(
    'Navigačná cesta',
  );
  expect(getContent('en').ui.servicePages.indexSeo.updatedAt).toMatch(
    /^2026-\d{2}-\d{2}$/,
  );
});
