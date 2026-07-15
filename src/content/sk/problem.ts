import type { ProblemItem } from '../types';

const eyebrow = 'Skutočný problém';

const problems: ProblemItem[] = [
  {
    title: 'Pomalé, zastarané weby',
    body: 'Zastarané weby, ktoré strácajú návštevníkov skôr, než si prečítajú čo i len slovo.',
  },
  {
    title: 'Slabá konverzná štruktúra',
    body: 'Žiadna jasná cesta, ktorá by viedla návštevníka od kliknutia k leadu.',
  },
  {
    title: 'Žiadna CRM či ERP integrácia',
    body: 'Leady uväznené v roztrúsených emailových vláknach namiesto pipeline.',
  },
  {
    title: 'Žiadna analytická disciplína',
    body: 'Rozhodnutia založené na dohadoch namiesto reálnych dát o používateľoch.',
  },
  {
    title: 'Žiadna automatizácia',
    body: 'Manuálna práca opakovaná ručne, kým niekto nedá výpoveď.',
  },
  {
    title: 'Slabé mobilné UX',
    body: 'Nefunkčný zážitok na zariadení, ktoré väčšina návštevníkov reálne používa.',
  },
  {
    title: 'Slabé SEO základy',
    body: 'Neviditeľné pre ľudí, ktorí vás už hľadajú.',
  },
  {
    title: 'Žiadne technické vlastníctvo',
    body: 'Nikto, kto by reálne vedel, ako web funguje.',
  },
  {
    title: 'Žiadna cesta k AI integrácii',
    body: 'Uviaznutí na zastaraných základoch, kým konkurencia napreduje.',
  },
  {
    title: 'Krehké WordPress riešenia',
    body: 'Náhodné pluginy, jeden update od zrútenia celého webu.',
  },
];

export const problemBundle = { eyebrow, problems };
