import type { FaqItem } from '../types';

const faq: FaqItem[] = [
  {
    question: 'Do you only build websites?',
    answer:
      'No. We build websites, landing pages, custom web applications, dashboards, portals, and AI-integrated interfaces — plus the integrations and infrastructure behind them.',
  },
  {
    question: 'Can you build custom web apps or dashboards?',
    answer:
      'Yes. Internal tools, booking systems, operational dashboards, and client portals are a core part of what we build. These are engineered for your business workflows, not bolted onto a template.',
  },
  {
    question: 'Can you integrate with our CRM/ERP?',
    answer:
      'Yes. We integrate with CRM, ERP, payment, email, analytics, and logistics systems over REST, GraphQL, and legacy SOAP where required — with webhooks, event flows, and proper error handling.',
  },
  {
    question: 'Can you work with legacy SOAP APIs?',
    answer:
      'Yes. If you have legacy systems that only expose SOAP endpoints, we build integration layers that translate between SOAP and modern REST/GraphQL interfaces. We do not force you to rip out working infrastructure.',
  },
  {
    question: 'Do you build AI features?',
    answer:
      'Yes — frontends for AI assistants and RAG systems, automation workflows, and internal copilots, with streaming responses, secure document handling, and human-in-the-loop review.',
  },
  {
    question: 'Can you host and maintain the website?',
    answer:
      'Yes. We offer monthly retainers covering hosting, CI/CD, monitoring, security updates, backups, and iterations. Long-term technical ownership is part of the offer, not an afterthought.',
  },
  {
    question: 'Are you GDPR-aware?',
    answer:
      'Yes. GDPR-aware architecture is the default: EU data residency options, cookieless analytics where possible, secure forms, role-based access, and audit-friendly logging.',
  },
  {
    question: 'Do you work with companies outside Slovakia?',
    answer:
      'Yes. We are based in Slovakia and work with companies across the EU. The location gives you EU data residency and GDPR alignment without extra effort.',
  },
  {
    question: 'How long does a website project take?',
    answer:
      'A focused landing page can ship in a couple of weeks; a full website with integrations typically runs 6–12 weeks. The diagnostic gives you a concrete timeline before any build starts.',
  },
  {
    question: 'What do you need from us to start?',
    answer:
      'A technical web audit is the usual starting point. We need access to your current website, analytics (if any), and a short call about your business goals. We handle the rest.',
  },
  {
    question: 'How do you price projects?',
    answer:
      'We price based on scope, integrations, timeline, and long-term maintenance. Most projects start with a fixed-price technical audit (€500–€1,500), then move to a fixed-scope project or a monthly retainer.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Yes. Maintenance and DevOps retainers cover monitoring, security patching, backups, performance tracking, and new features as your business evolves. A website that nobody maintains becomes a liability.',
  },
];

export const faqBundle = { faq };
