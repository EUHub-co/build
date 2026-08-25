import { defineMiddleware } from 'astro:middleware';
import { securityHeaders } from '../security-headers.mjs';

/**
 * Security headers middleware — sets headers on all responses.
 * Replaces the Cloudflare _headers file for GCP Cloud Run deployment.
 * Applies to both static pages and the API endpoint.
 */
export const onRequest = defineMiddleware(async (_context, next) => {
  // `next()` can throw if a route handler or page render fails unexpectedly.
  // Without this catch, an error response would skip the header-setting
  // loop below entirely — the one case (an error page) most likely to be
  // probed by an attacker would ship with no CSP/frame protection at all.
  let response: Response;
  try {
    response = await next();
  } catch (err) {
    console.error('[middleware] Unhandled error:', err);
    response = new Response('Internal Server Error', { status: 500 });
  }
  // Set security headers on the resolved response (works for both
  // prerendered and on-demand routes, and now for error responses too).
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }
  return response;
});
