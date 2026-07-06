import type { SiteContent } from './types';

export const site: SiteContent = {
  wordmark: 'Web Dev Studio',
  tagline: 'by EUHUB',
  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Examples', href: '#examples' },
    { label: 'Process', href: '#process' },
    { label: 'Tech Stack', href: '#tech-stack' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
  ecosystemLinks: [
    { label: 'EUHUB.CO', href: 'https://euhub.co' },
    { label: 'EUHUB AI', href: 'https://euhub-ai.com' },
  ],
  contactEmail: 'studio@euhub.co',
  location: 'Slovakia · European Union',
  seo: {
    title: 'Web Dev Studio by EUHUB',
    description:
      'We build fast, secure, conversion-focused web platforms, web apps, and AI-ready interfaces for European businesses. Engineering-led, GDPR-aware, maintained long-term.',
    ogImage: '/og.png',
  },
};

/** Primary CTA — used across header, hero, and CTA section */
export const primaryCta = {
  label: 'Request Web Audit',
  href: '#contact',
};

/** Secondary CTA — hero only */
export const secondaryCta = {
  label: 'View Services',
  href: '#services',
};

/** Tertiary CTA — ecosystem section */
export const tertiaryCta = {
  label: 'Explore EUHUB AI',
  href: 'https://euhub-ai.com',
};

/** Trust line — hero */
export const trustLine =
  'Based in Slovakia. Built for EU businesses. GDPR-aware by default.';
