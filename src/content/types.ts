/**
 * Shared content types for Build with EUHub.
 * Content is structured as per-locale bundle objects (src/content/en/, src/content/sk/).
 * EN is canonical; SK is a full translation.
 */

export type Locale = 'en' | 'sk';

export const locales = ['en', 'sk'] as const;
export const defaultLocale = 'en';

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface SiteContent {
  /** Wordmark shown in header/footer */
  wordmark: string;
  /** Short tagline for header */
  tagline: string;
  /** Primary nav items */
  nav: NavItem[];
  /** Ecosystem links (header, opens new tab) */
  ecosystemLinks: NavItem[];
  /** Contact email */
  contactEmail: string;
  /** Location line */
  location: string;
  /** Footer bottom-bar copyright line, after "© {year} " */
  footerRights: string;
  /** SEO defaults */
  seo: {
    title: string;
    description: string;
    ogImage: string;
    updatedAt: string;
  };
}

/**
 * Copy owned by shared presentation components. Keeping it here prevents a
 * translated route from silently inheriting English literals from a layout.
 */
export interface UiContent {
  accessibility: {
    skipToContent: string;
    primaryNavigation: string;
    mobileNavigation: string;
    openMenu: string;
    closeMenu: string;
    appearance: string;
    deviceAppearance: string;
    lightAppearance: string;
    darkAppearance: string;
  };
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    lead: string;
  };
  problem: { heading: string; lead: string };
  services: { heading: string; cardCta: string };
  servicePages: {
    indexSeo: {
      title: string;
      description: string;
      updatedAt: string;
    };
    indexEyebrow: string;
    indexHeading: string;
    indexLead: string;
    definitionEyebrow: string;
    detailEyebrow: string;
    problemHeading: string;
    bestForHeading: string;
    outcomesHeading: string;
    includesHeading: string;
    processHeading: string;
    processLead: string;
    faqHeading: string;
    allServices: string;
    contactHeading: string;
    contactLead: string;
    contactCta: string;
    homeBreadcrumb: string;
    servicesBreadcrumb: string;
    breadcrumbLabel: string;
  };
  differentiation: {
    eyebrow: string;
    heading: string;
    lead: string;
    conclusion: string;
    layers: Array<{ title: string; description: string }>;
  };
  process: { heading: string; lead: string };
  techStack: { heading: string; lead: string };
  examples: {
    heading: string;
    lead: string;
    illustrativeLabel: string;
    problemLabel: string;
    solutionLabel: string;
    resultLabel: string;
  };
  engagement: {
    heading: string;
    mostCommon: string;
    entryPoint: string;
    project: string;
    ongoing: string;
    priceOrientation: string;
    requestAudit: string;
    startConversation: string;
    comparisonCaption: string;
    modelHeading: string;
    approachHeading: string;
    priceHeading: string;
    scopeHeading: string;
    actionHeading: string;
  };
  proof: {
    eyebrow: string;
    heading: string;
    lead: string;
    pending: string;
    detailsCta: string;
  };
  evidencePage: {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    heading: string;
    lead: string;
    statusLabel: string;
    pendingTitle: string;
    pendingBody: string;
    methodHeading: string;
    methodItems: string[];
    backHome: string;
    updatedAt: string;
  };
  ecosystem: { heading: string; lead: string; visit: string };
  contact: {
    eyebrow: string;
    heading: string;
    lead: string;
    definition: string;
    auditItems: string[];
    emailLead: string;
    privacyNotice: string;
    privacyLabel: string;
  };
  footer: {
    description: string;
    navigation: string;
    ecosystem: string;
    contact: string;
    legal: string;
    privacy: string;
    cookies: string;
    terms: string;
  };
}

export interface ProblemItem {
  /** Short title (2-4 words) */
  title: string;
  /** One-sentence muted body copy */
  body: string;
}

export type ServiceId =
  | 'business-websites'
  | 'landing-pages'
  | 'web-apps'
  | 'ai-interfaces'
  | 'redesign'
  | 'integrations'
  | 'maintenance';

export interface Service {
  id: ServiceId;
  title: string;
  /** Short mono index tag rendered as "NN // Tag" (e.g. "Websites") */
  tag: string;
  /** One-sentence explanation */
  summary: string;
  /** What it includes (bullet points) */
  includes: string[];
  /** Technical icon identifier */
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  summary: string;
  deliverables: string[];
}

export interface TechCategory {
  id: string;
  title: string;
  items: string[];
  icon: string;
}

export interface ExampleScenario {
  id: string;
  sector: string;
  problem: string;
  solution: string;
  result: string;
  /** Explicitly labelled as an example, not a real client */
  isExample: boolean;
}

export interface EngagementModel {
  id: string;
  shape: string;
  howItWorks: string;
  priceOrientation: string;
  typicalScope: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EcosystemBrand {
  id: string;
  name: string;
  role: string;
  description: string;
  /**
   * Outbound URL. Omitted for the self-referential "This site" card — per
   * the design brief it must not link out (it already is this page).
   */
  url?: string;
}

export interface LegalContent {
  title: string;
  /** Interim copy — must be reviewed by legal counsel before launch */
  body: string[];
  lastUpdated: string;
}
