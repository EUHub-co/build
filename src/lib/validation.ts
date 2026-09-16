import { z } from 'zod';
import type { Locale } from '../content/types';

/**
 * Shared validation schema for the audit-request form.
 * Enum values are stable IDs; display labels are localized.
 * The webhook receives IDs only (no backwards-compat hedge — no consumer exists).
 */

export const projectTypes = [
  { id: 'new-website', label: { en: 'New website', sk: 'Nový web' } },
  {
    id: 'website-redesign',
    label: {
      en: 'Website redesign/migration',
      sk: 'Redesign/migrácia webu',
    },
  },
  { id: 'landing-page', label: { en: 'Landing page', sk: 'Landing page' } },
  {
    id: 'custom-web-app',
    label: { en: 'Custom web application', sk: 'Custom webová aplikácia' },
  },
  {
    id: 'ai-interface',
    label: {
      en: 'AI-integrated interface',
      sk: 'AI-integrované rozhranie',
    },
  },
  {
    id: 'api-integration',
    label: { en: 'API/business integration', sk: 'API/biznis integrácia' },
  },
  {
    id: 'maintenance-devops',
    label: { en: 'Maintenance/DevOps', sk: 'Údržba/DevOps' },
  },
] as const;

export const budgetRanges = [
  { id: 'under-3000', label: { en: 'Under €3,000', sk: 'Do €3,000' } },
  {
    id: '3000-10000',
    label: { en: '€3,000–€10,000', sk: '€3,000–€10,000' },
  },
  {
    id: '10000-30000',
    label: { en: '€10,000–€30,000', sk: '€10,000–€30,000' },
  },
  { id: 'over-30000', label: { en: '€30,000+', sk: '€30,000+' } },
] as const;

export const timelines = [
  { id: 'asap', label: { en: 'ASAP', sk: 'ASAP' } },
  { id: 'within-a-month', label: { en: 'Within a month', sk: 'Do mesiaca' } },
  { id: 'this-quarter', label: { en: 'This quarter', sk: 'Tento štvrťrok' } },
  {
    id: 'just-exploring',
    label: { en: 'Just exploring', sk: 'Iba prieskum' },
  },
] as const;

export const decisionRoles = [
  {
    id: 'founder-owner',
    label: { en: 'Founder-owner', sk: 'Founder-owner' },
  },
  {
    id: 'marketing-lead',
    label: { en: 'Marketing lead', sk: 'Marketing lead' },
  },
  {
    id: 'product-operations',
    label: { en: 'Product-operations', sk: 'Product-operations' },
  },
  { id: 'engineering', label: { en: 'Engineering', sk: 'Engineering' } },
  { id: 'other', label: { en: 'Other', sk: 'Iné' } },
] as const;

export const projectTypeIds = [
  'new-website',
  'website-redesign',
  'landing-page',
  'custom-web-app',
  'ai-interface',
  'api-integration',
  'maintenance-devops',
] as const;

export const budgetRangeIds = [
  'under-3000',
  '3000-10000',
  '10000-30000',
  'over-30000',
] as const;

export const timelineIds = [
  'asap',
  'within-a-month',
  'this-quarter',
  'just-exploring',
] as const;

export const decisionRoleIds = [
  'founder-owner',
  'marketing-lead',
  'product-operations',
  'engineering',
  'other',
] as const;

export const auditRequestSchema = z.object({
  // Required (4)
  name: z.string().min(2, 'name_min').max(100, 'name_max'),
  email: z.email('email_invalid').min(1, 'email_required').max(200),
  projectType: z.enum(projectTypeIds, { message: 'project_type_required' }),
  message: z.string().min(10, 'message_min').max(2000, 'message_max'),

  // Optional (7)
  company: z.string().max(100).optional().or(z.literal('')),
  website: z.url('website_invalid').optional().or(z.literal('')),
  companySize: z.string().max(50).optional().or(z.literal('')),
  mainProblem: z.string().max(500).optional().or(z.literal('')),
  budget: z.enum(budgetRangeIds).optional().or(z.literal('')),
  timeline: z.enum(timelineIds).optional().or(z.literal('')),
  decisionRole: z.enum(decisionRoleIds).optional().or(z.literal('')),

  // Honeypot
  companyUrl: z.string().max(0).optional().or(z.literal('')),

  // Turnstile token
  turnstileToken: z.string().optional(),

  // Locale (for server-side error message selection)
  locale: z.enum(['en', 'sk']).optional(),
});

export type AuditRequestInput = z.infer<typeof auditRequestSchema>;

export const requiredFields = [
  'name',
  'email',
  'projectType',
  'message',
] as const;

export function isRequired(field: string): boolean {
  return requiredFields.includes(field as (typeof requiredFields)[number]);
}

/** Get localized label for an enum by ID */
export function getProjectTypeLabel(id: string, locale: Locale): string {
  return projectTypes.find((p) => p.id === id)?.label[locale] ?? id;
}

export function getBudgetLabel(id: string, locale: Locale): string {
  return budgetRanges.find((b) => b.id === id)?.label[locale] ?? id;
}

export function getTimelineLabel(id: string, locale: Locale): string {
  return timelines.find((t) => t.id === id)?.label[locale] ?? id;
}

export function getDecisionRoleLabel(id: string, locale: Locale): string {
  return decisionRoles.find((r) => r.id === id)?.label[locale] ?? id;
}

/** Localized validation error messages */
export const validationMessages = {
  en: {
    name_min: 'Name is required (at least 2 characters).',
    name_max: 'Name is too long (max 100 characters).',
    email_required: 'Work email is required.',
    email_invalid: 'Please enter a valid email address.',
    project_type_required: 'Please select a project type.',
    message_min: 'Please tell us a bit more (at least 10 characters).',
    message_max: 'Message is too long (max 2000 characters).',
    website_invalid: 'Please enter a valid URL.',
  },
  sk: {
    name_min: 'Meno je povinné (aspoň 2 znaky).',
    name_max: 'Meno je príliš dlhé (max 100 znakov).',
    email_required: 'Pracovný email je povinný.',
    email_invalid: 'Zadajte platný email.',
    project_type_required: 'Vyberte typ projektu.',
    message_min: 'Povedzte nám viac (aspoň 10 znakov).',
    message_max: 'Správa je príliš dlhá (max 2000 znakov).',
    website_invalid: 'Zadajte platnú URL.',
  },
} as const;

export function getValidationMessage(code: string, locale: Locale): string {
  return (
    validationMessages[locale][
      code as keyof (typeof validationMessages)['en']
    ] ?? code
  );
}
