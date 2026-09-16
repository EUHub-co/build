import type { ProcessStep } from '../types';

const eyebrow = 'Proces';

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Diagnostika',
    summary:
      'Preveríme váš web, ponuku, používateľov, technologický základ, analytiku a úzke miesta.',
    deliverables: [
      'Správa z technického auditu',
      'Posúdenie konverznej štruktúry',
      'Východiskové meranie výkonu a SEO',
      'Zoznam rizík a príležitostí',
    ],
  },
  {
    step: 2,
    title: 'Architektúra',
    summary:
      'Definujeme mapu webu, štruktúru obsahu, integrácie, dátové toky a technologické voľby.',
    deliverables: [
      'Informačná architektúra',
      'Mapa integrácií',
      'Technologické rozhodnutia',
      'Model obsahu',
    ],
  },
  {
    step: 3,
    title: 'Dizajnový systém',
    summary:
      'Vytvoríme vizuálny jazyk, komponenty, vzory používateľského rozhrania a responzívnu štruktúru.',
    deliverables: [
      'Knižnica komponentov',
      'Responzívne rozloženia',
      'Prístupnosť v základe',
      'Vizuály v súlade so značkou',
    ],
  },
  {
    step: 4,
    title: 'Vývoj',
    summary:
      'Staviame frontend, backend/API integrácie, CMS/obsahový model, analytiku a proces nasadzovania.',
    deliverables: [
      'Zdrojový kód pre produkciu',
      'API integrácie',
      'Analytika a sledovanie',
      'Proces CI/CD',
    ],
  },
  {
    step: 5,
    title: 'Spustenie a zlepšovanie',
    summary:
      'Nasadzujeme, monitorujeme, meriame, priebežne zlepšujeme a udržiavame.',
    deliverables: [
      'Produkčné nasadenie',
      'Monitoring a upozornenia',
      'Sledovanie výkonu',
      'Zoznam plánovaných zlepšení',
    ],
  },
];

export const processBundle = { eyebrow, processSteps };
