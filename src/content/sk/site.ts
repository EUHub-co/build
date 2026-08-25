import type { SiteContent, NavItem, HeroStat } from '../types';

const site: SiteContent = {
  wordmark: 'Build',
  tagline: 'with EUHub',
  nav: [
    { label: 'Služby', href: '#services' },
    { label: 'Príklady', href: '#examples' },
    { label: 'Proces', href: '#process' },
    { label: 'Technológie', href: '#tech' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Kontakt', href: '#contact' },
  ],
  ecosystemLinks: [
    { label: 'Grow with EUHub', href: 'https://grow.euhub.co' },
    { label: 'EUHub AI', href: 'https://ai.euhub.co' },
    { label: 'EUHub', href: 'https://euhub.co' },
    { label: 'EUHub Community', href: 'https://community.euhub.co' },
    { label: 'Deploy with EUHub', href: 'https://deploy.euhub.co' },
  ],
  contactEmail: 'hello@euhub-ai.com',
  location: 'Slovensko · Európska únia',
  footerRights: 'Build with EUHub · Sídlo v EÚ · GDPR-aware',
  seo: {
    title: 'Vývoj webov a AI rozhraní pre firmy v EÚ | EUHub',
    description:
      'Rýchle, bezpečné weby, webové aplikácie a AI rozhrania pre európske firmy—technicky precízne, s ohľadom na GDPR a dlhodobou údržbou.',
    ogImage: '/sk/og.png',
    updatedAt: '2026-08-25',
  },
};

const primaryCta: NavItem = {
  label: 'Vyžiadať audit',
  href: '#contact',
};

const secondaryCta: NavItem = {
  label: 'Zobraziť služby',
  href: '#services',
};

const tertiaryCta: NavItem = {
  label: 'Preskúmať EUHUB AI',
  href: 'https://ai.euhub.co',
};

const trustLine =
  'Sídlo na Slovensku · Postavené pre firmy v EÚ · GDPR-aware v základe';

/** Merania zverejňujeme až z overeného záznamu dôkazov. */
const heroStats: HeroStat[] = [];

export const siteBundle = {
  site,
  primaryCta,
  secondaryCta,
  tertiaryCta,
  trustLine,
  heroStats,
};
