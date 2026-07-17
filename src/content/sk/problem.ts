import type { ProblemItem } from '../types';

const eyebrow = 'Skutočný problém';

const problems: ProblemItem[] = [
  {
    title: 'Pomalé, zastarané weby',
    body: 'Zastarané weby, ktoré strácajú návštevníkov skôr, než si prečítajú čo i len slovo.',
  },
  {
    title: 'Slabá konverzná štruktúra',
    body: 'Žiadna jasná cesta od návštevníka ku kvalifikovanému leadu.',
  },
  {
    title: 'Žiadna CRM/ERP integrácia',
    body: 'Leady uväznené v emailových vláknach, stratené medzi systémami.',
  },
  {
    title: 'Žiadna analytická disciplína',
    body: 'Rozhodnutia založené na dohadoch, nie na meraných dátach.',
  },
  {
    title: 'Žiadna automatizácia',
    body: 'Manuálna práca opakovaná, kým niekto nedá výpoveď.',
  },
  {
    title: 'Slabé mobilné UX',
    body: 'Nefunkčné na zariadení, ktoré reálne používa väčšina vašich návštevníkov.',
  },
  {
    title: 'Slabé SEO základy',
    body: 'Neviditeľné pre ľudí, ktorí vás už hľadajú.',
  },
  {
    title: 'Žiadne technické vlastníctvo',
    body: 'Nikto nevie, ako web reálne funguje.',
  },
  {
    title: 'Žiadna cesta k AI',
    body: 'Uviaznutí na manuálnej práci, kým konkurencia napreduje rýchlejšie.',
  },
  {
    title: 'Krehký WordPress',
    body: 'Náhodné pluginy, jeden update od zrútenia.',
  },
];

export const problemBundle = { eyebrow, problems };
