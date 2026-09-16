import type { TechCategory } from '../types';

const eyebrow = 'Technológie';

const techStack: TechCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'layout',
    items: [
      'Astro',
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Motion',
    ],
  },
  {
    id: 'backend',
    title: 'Backend / API',
    icon: 'server',
    items: [
      'Node.js',
      'Rust (kde záleží na výkone)',
      'REST API',
      'GraphQL',
      'SOAP (integrácie starších systémov)',
      'PostgreSQL',
      'Redis',
      'Webhooky',
    ],
  },
  {
    id: 'ai',
    title: 'Systémy pripravené na AI',
    icon: 'sparkles',
    items: [
      'RAG rozhrania',
      'Rozhrania AI asistentov',
      'Automatizácia pracovných postupov',
      'Bezpečné spracovanie dokumentov',
      'Kontrola človekom',
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: 'cloud',
    items: [
      'Docker',
      'CI/CD',
      'GitHub Actions',
      'Cloudflare',
      'Regióny GCP v EÚ',
      'Monitoring',
      'Logovanie',
      'Zálohy',
    ],
  },
  {
    id: 'compliance',
    title: 'Súlad s predpismi / bezpečnosť',
    icon: 'shield',
    items: [
      'Architektúra zohľadňujúca GDPR',
      'Možnosti umiestnenia dát v EÚ',
      'Bezpečné formuláre',
      'Prístup podľa používateľských rolí',
      'Logovanie vhodné na audit',
    ],
  },
];

export const techStackBundle = { eyebrow, techStack };
