import { z } from 'zod';

/**
 * Shared validation schema for the audit-request form.
 * Used both client-side (React island) and server-side (Astro endpoint)
 * to guarantee identical validation rules.
 *
 * Per plan v3: 4 required fields + 7 optional fields.
 * Zod 4 API (z.email, z.url are top-level; no errorMap).
 */

export const projectTypes = [
  'Technical Web Audit',
  'Landing Page',
  'Business Website',
  'Website Redesign',
  'Custom Web Application',
  'Client Portal',
  'Internal Dashboard',
  'AI-integrated Web Interface',
  'API/CRM/ERP Integration',
  'Maintenance/DevOps',
  'Not sure yet',
] as const;

export const budgetRanges = [
  '< €2,500',
  '€2,500–€5,000',
  '€5,000–€10,000',
  '€10,000–€25,000',
  '€25,000+',
  'Not sure yet',
] as const;

export const timelines = [
  'ASAP',
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  'Just researching',
] as const;

export const decisionRoles = [
  'Owner/Founder',
  'Technical decision-maker',
  'Marketing/Growth',
  'Operations',
  'Project manager',
  'Other',
] as const;

export const auditRequestSchema = z.object({
  // Required (4)
  name: z
    .string()
    .min(2, 'Name is required (at least 2 characters).')
    .max(100, 'Name is too long (max 100 characters).'),
  email: z
    .email('Please enter a valid email address.')
    .min(1, 'Work email is required.')
    .max(200),
  projectType: z.enum(projectTypes, {
    message: 'Please select a project type.',
  }),
  message: z
    .string()
    .min(10, 'Please tell us a bit more (at least 10 characters).')
    .max(2000, 'Message is too long (max 2000 characters).'),

  // Optional (7)
  company: z.string().max(100).optional().or(z.literal('')),
  website: z.url('Please enter a valid URL.').optional().or(z.literal('')),
  companySize: z.string().max(50).optional().or(z.literal('')),
  mainProblem: z.string().max(500).optional().or(z.literal('')),
  budget: z.enum(budgetRanges).optional().or(z.literal('')),
  timeline: z.enum(timelines).optional().or(z.literal('')),
  decisionRole: z.enum(decisionRoles).optional().or(z.literal('')),

  // Honeypot — must be empty. Not in the visible form.
  companyUrl: z.string().max(0).optional().or(z.literal('')),

  // Turnstile token — required when Turnstile is enabled
  turnstileToken: z.string().optional(),
});

export type AuditRequestInput = z.infer<typeof auditRequestSchema>;

/** Fields that are required (for client-side UI emphasis) */
export const requiredFields = [
  'name',
  'email',
  'projectType',
  'message',
] as const;

/** Check if a field is required */
export function isRequired(field: string): boolean {
  return requiredFields.includes(field as (typeof requiredFields)[number]);
}
