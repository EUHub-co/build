import type { Service } from '../types';

const eyebrow = 'Čo staviame';

const services: Service[] = [
  {
    id: 'business-websites',
    title: 'Moderné firemné weby',
    tag: 'Weby',
    summary:
      'Rýchle, responzívne weby pripravené na SEO pre firmy, ktoré potrebujú dôveryhodnosť a získavanie dopytov.',
    includes: [
      'Architektúra s dôrazom na statické stránky',
      'Optimalizácia Core Web Vitals',
      'Štruktúrované dáta a mapa webu',
      'Analytika a konverzné sledovanie',
    ],
    icon: 'globe',
  },
  {
    id: 'landing-pages',
    title: 'Vstupné stránky',
    tag: 'Vstupné stránky',
    summary:
      'Konverzné kampaňové stránky pre služby, produkty, podujatia a audity.',
    includes: [
      'Rozloženie s jedným cieľom',
      'Štruktúra pripravená na A/B testovanie',
      'Rýchle načítanie na mobile',
      'Integrácia formulára alebo CTA',
    ],
    icon: 'target',
  },
  {
    id: 'web-apps',
    title: 'Webové aplikácie na mieru',
    tag: 'Aplikácie',
    summary:
      'Interné nástroje, prehľadové panely, rezervačné systémy, portály a prevádzkové rozhrania.',
    includes: [
      'Prístup podľa používateľských rolí',
      'Dátové toky v reálnom čase',
      'Rozhrania napojené na API',
      'Logovanie vhodné na audit',
    ],
    icon: 'app',
  },
  {
    id: 'ai-interfaces',
    title: 'Webové rozhrania s integrovanou AI',
    tag: 'AI rozhrania',
    summary:
      'Používateľské rozhrania pre AI asistentov, RAG systémy, automatizované pracovné postupy a interných AI pomocníkov.',
    includes: [
      'Streamované odpovede',
      'Kontrola človekom',
      'Bezpečné spracovanie dokumentov',
      'Smerovanie požiadaviek na modely a záložné riešenia',
    ],
    icon: 'sparkles',
  },
  {
    id: 'redesign',
    title: 'Redizajn a migrácia webu',
    tag: 'Redizajn',
    summary:
      'Prebudovanie zastaraných webov na moderné, udržiavateľné, výkonné systémy.',
    includes: [
      'Audit a migrácia obsahu',
      'Mapovanie presmerovaní URL',
      'Zachovanie SEO',
      'Prebudovanie na modernom technologickom základe',
    ],
    icon: 'refresh',
  },
  {
    id: 'integrations',
    title: 'API a firemné integrácie',
    tag: 'Integrácie',
    summary:
      'CRM, ERP, platby, e-mail, analytika, logistika a interné databázové integrácie.',
    includes: [
      'REST a GraphQL',
      'SOAP pre staršie systémy podľa potreby',
      'Webhooky a toky udalostí',
      'Spracovanie chýb a opakovanie požiadaviek',
    ],
    icon: 'plug',
  },
  {
    id: 'maintenance',
    title: 'Údržba a DevOps',
    tag: 'Starostlivosť',
    summary:
      'Hosting, CI/CD, monitoring, bezpečnostné aktualizácie, zálohy a dlhodobá starostlivosť.',
    includes: [
      'Procesy CI/CD',
      'Monitoring dostupnosti',
      'Bezpečnostné opravy',
      'Zálohovanie a obnova',
    ],
    icon: 'wrench',
  },
];

export const servicesBundle = { eyebrow, services };
