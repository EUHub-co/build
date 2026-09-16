import type { EcosystemBrand } from '../types';

const eyebrow = 'Ekosystém';

const ecosystem: EcosystemBrand[] = [
  {
    id: 'grow-with-euhub',
    name: 'Grow with EUHub',
    role: 'Marketing a rast',
    description:
      'Marketingové systémy pre celú cestu zákazníka — platená reklama, SEO, obsah a automatizácia — postavené inžinierskym štúdiom, s meraním zohľadňujúcim GDPR a reálnou atribúciou.',
    url: 'https://grow.euhub.co',
  },
  {
    id: 'euhub-ai',
    name: 'EUHub AI',
    role: 'AI implementácia',
    description:
      'Implementácia AI agentov, automatizácia, audity pracovných postupov, AI systémy a webové aplikácie na mieru.',
    url: 'https://ai.euhub.co',
  },
  {
    id: 'euhub-co',
    name: 'EUHub',
    role: 'Materská spoločnosť',
    description:
      'Európske poradenstvo v oblasti AI a softvéru. Dôraz na GDPR, infraštruktúra umiestnená v EÚ a vývoj na mieru.',
    url: 'https://euhub.co',
  },
  {
    id: 'euhub-sk',
    name: 'EUHub Community',
    role: 'Slovenská komunita',
    description:
      'Slovenská IT komunita, inkubátor, coworking, podpora podnikania, relokácia a právne/účtovné služby.',
    url: 'https://community.euhub.co',
  },
  {
    id: 'deploy-with-euhub',
    name: 'Deploy with EUHub',
    role: 'DevOps, FinOps a DevSecOps agentúra',
    description:
      'Automatizované procesy dodávania softvéru, kontrola cloudových nákladov a bezpečnosť v každom vydaní, s dátami umiestnenými v EÚ.',
    url: 'https://deploy.euhub.co',
  },
];

export const ecosystemBundle = { eyebrow, ecosystem };
