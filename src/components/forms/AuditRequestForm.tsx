import { useState, useRef, useEffect } from 'react';
import {
  auditRequestSchema,
  projectTypes,
  budgetRanges,
  timelines,
  decisionRoles,
  requiredFields,
  type AuditRequestInput,
} from '../../lib/validation';

interface Props {
  turnstileSiteKey?: string;
  contactEmail: string;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FieldError {
  [key: string]: string | undefined;
}

/**
 * AuditRequestForm — React island for the "Request Web Audit" form.
 *
 * Per plan v3:
 *  - 4 required + 7 optional fields
 *  - Honeypot (companyUrl)
 *  - Cloudflare Turnstile (client widget)
 *  - Shared Zod validation (client + server)
 *  - Submit to /api/audit-request
 *  - Success / error / submitting states
 *  - mailto: fallback in error state
 *  - Umami tracking (form_start, submit_success, submit_error)
 */
export default function AuditRequestForm({
  turnstileSiteKey,
  contactEmail,
}: Props) {
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<FieldError>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [formStarted, setFormStarted] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Load Turnstile script if site key is provided
  useEffect(() => {
    if (!turnstileSiteKey) return;
    const existing = document.querySelector(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]',
    );
    if (existing) return;
    const script = document.createElement('script');
    script.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, [turnstileSiteKey]);

  // Render Turnstile widget when script + container are ready
  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) return;
    const tryRender = () => {
      const ts = (
        window as unknown as {
          turnstile?: {
            render: (el: HTMLElement, opts: Record<string, unknown>) => string;
          };
        }
      ).turnstile;
      if (ts && turnstileRef.current) {
        ts.render(turnstileRef.current, {
          sitekey: turnstileSiteKey,
          callback: (token: string) => setTurnstileToken(token),
          'error-callback': () => setTurnstileToken(''),
          theme: 'light',
        });
      } else {
        setTimeout(tryRender, 200);
      }
    };
    tryRender();
  }, [turnstileSiteKey]);

  const trackFormStart = () => {
    if (!formStarted) {
      setFormStarted(true);
      const umami = (
        window as unknown as { umami?: { track: (n: string) => void } }
      ).umami;
      umami?.track('audit_form_start');
    }
  };

  const handleSubmit = async (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement;
  }) => {
    e.preventDefault();
    setErrors({});
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as AuditRequestInput & {
      companyUrl?: string;
    };

    // Honeypot check (client-side; server also checks)
    if (data.companyUrl) {
      // Silently succeed without submitting (bot caught)
      setState('success');
      return;
    }

    data.turnstileToken = turnstileToken;

    // Validate with shared Zod schema
    const result = auditRequestSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: FieldError = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setState('submitting');

    try {
      const response = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (response.ok) {
        setState('success');
        const umami = (
          window as unknown as { umami?: { track: (n: string) => void } }
        ).umami;
        umami?.track('audit_form_submit_success');
        formRef.current?.reset();
        setTurnstileToken('');
      } else {
        const body = await response.json().catch(() => ({}));
        setState('error');
        setErrorMessage(
          body.message ??
            'Something went wrong. Please try again or email us directly.',
        );
        const umami = (
          window as unknown as { umami?: { track: (n: string) => void } }
        ).umami;
        umami?.track('audit_form_submit_error');
      }
    } catch {
      setState('error');
      setErrorMessage('Network error. Please try again or email us directly.');
      const umami = (
        window as unknown as { umami?: { track: (n: string) => void } }
      ).umami;
      umami?.track('audit_form_submit_error');
    }
  };

  // Success state
  if (state === 'success') {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ok/10 text-ok">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink">Request received</h3>
        <p className="mt-2 text-sm text-ink-3">
          We'll review your submission and get back to you within 1 business
          day.
        </p>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full rounded-md border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-4 transition-colors focus:outline-2 focus:outline-brand ${
      errors[field] ? 'border-danger' : 'border-line'
    }`;

  const labelClass = 'block text-sm font-medium text-ink-2';
  const errorClass = 'mt-1 text-xs text-danger';

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4"
    >
      {/* Honeypot — hidden from users, visible to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="companyUrl">Website URL (leave empty)</label>
        <input
          id="companyUrl"
          name="companyUrl"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Required fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-danger">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={inputClass('name')}
            onFocus={trackFormStart}
            required={requiredFields.includes('name' as never)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Work email <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={inputClass('email')}
            onFocus={trackFormStart}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Project type (required, select) */}
      <div>
        <label htmlFor="projectType" className={labelClass}>
          Project type <span className="text-danger">*</span>
        </label>
        <select
          id="projectType"
          name="projectType"
          className={inputClass('projectType')}
          onFocus={trackFormStart}
          required
          aria-invalid={!!errors.projectType}
          defaultValue=""
        >
          <option value="" disabled>
            Select a project type
          </option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className={errorClass}>{errors.projectType}</p>
        )}
      </div>

      {/* Message (required) */}
      <div>
        <label htmlFor="message" className={labelClass}>
          What do you need? <span className="text-danger">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputClass('message')}
          onFocus={trackFormStart}
          required
          placeholder="Tell us about your project, current situation, and what you're trying to achieve."
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      {/* Optional fields */}
      <div className="border-t border-line pt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-4">
          Optional — helps us prepare for your audit
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className={inputClass('company')}
          />
        </div>

        <div>
          <label htmlFor="website" className={labelClass}>
            Current website
          </label>
          <input
            id="website"
            name="website"
            type="url"
            placeholder="https://"
            className={inputClass('website')}
          />
          {errors.website && <p className={errorClass}>{errors.website}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget range
          </label>
          <select
            id="budget"
            name="budget"
            className={inputClass('budget')}
            defaultValue=""
          >
            <option value="">Select…</option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className={labelClass}>
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            className={inputClass('timeline')}
            defaultValue=""
          >
            <option value="">Select…</option>
            {timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="decisionRole" className={labelClass}>
            Your role
          </label>
          <select
            id="decisionRole"
            name="decisionRole"
            className={inputClass('decisionRole')}
            defaultValue=""
          >
            <option value="">Select…</option>
            {decisionRoles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="companySize" className={labelClass}>
          Company size
        </label>
        <input
          id="companySize"
          name="companySize"
          type="text"
          placeholder="e.g. 10–50 employees"
          className={inputClass('companySize')}
        />
      </div>

      <div>
        <label htmlFor="mainProblem" className={labelClass}>
          Main problem you're trying to solve
        </label>
        <textarea
          id="mainProblem"
          name="mainProblem"
          rows={2}
          className={inputClass('mainProblem')}
        />
      </div>

      {/* Turnstile widget */}
      {turnstileSiteKey && <div ref={turnstileRef} className="cf-turnstile" />}

      {/* Error state with mailto fallback */}
      {state === 'error' && (
        <div className="rounded-lg border border-danger/20 bg-danger/5 p-4">
          <p className="text-sm text-danger">{errorMessage}</p>
          <p className="mt-2 text-sm text-ink-2">
            You can also email us directly:{' '}
            <a
              href={`mailto:${contactEmail}?subject=Web%20Audit%20Request`}
              className="font-medium text-brand hover:underline"
              data-umami-event="email_click"
            >
              {contactEmail}
            </a>
          </p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-base font-medium text-white transition-all hover:bg-brand-2 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
      >
        {state === 'submitting' ? 'Sending…' : 'Request Web Audit'}
        {state !== 'submitting' && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </button>
    </form>
  );
}
