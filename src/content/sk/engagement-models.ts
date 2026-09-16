import type { EngagementModel } from '../types';

const engagementModels: EngagementModel[] = [
  {
    id: 'audit',
    shape: 'Technický audit webu',
    howItWorks:
      'Fixná cena, jednotýždňová diagnostika vášho súčasného webu, výkonu, štruktúry, integrácií a technických rizík. Dostanete jasný zoznam, čo opraviť, čo prebudovať a čo sa neoplatí riešiť.',
    priceOrientation: '€500–€1,500 (jednorazovo)',
    typicalScope: '1 týždeň · správa z auditu + zoznam krokov podľa priority',
  },
  {
    id: 'project',
    shape: 'Projekt s pevným rozsahom',
    howItWorks:
      'Vývoj s jasným rozsahom a dohodnutými výstupmi, časovým harmonogramom a cenou. Vstupná stránka, firemný web, webová aplikácia alebo AI rozhranie. Rozsah je pevne stanovený pred začiatkom vývoja.',
    priceOrientation: '€3,000–€25,000+ (projekt)',
    typicalScope: '2–10 týždňov · dizajn, vývoj, spustenie',
  },
  {
    id: 'retainer',
    shape: 'Mesačná spolupráca',
    howItWorks:
      'Dlhodobá starostlivosť: údržba, DevOps, monitoring, bezpečnostné aktualizácie, iterácie a nové funkcie podľa toho, ako sa vaše podnikanie vyvíja.',
    priceOrientation: '€500–€3,000 / mesiac',
    typicalScope: 'Priebežné · hosting, monitoring, iterácie, podpora',
  },
];

const pricingOrientationCopy =
  'Ceny odvodzujeme od rozsahu, integrácií, časového harmonogramu a dlhodobej údržby. Väčšina serióznych projektov začína technickým auditom alebo úvodnou analýzou.';

export const engagementModelsBundle = {
  engagementModels,
  pricingOrientationCopy,
};
