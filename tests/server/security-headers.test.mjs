import assert from 'node:assert/strict';
import test from 'node:test';
import { securityHeaders } from '../../security-headers.mjs';
import { cacheControlForPath } from '../../server-policy.mjs';

test('defines the required headers once for static and dynamic responses', () => {
  assert.match(
    securityHeaders['Content-Security-Policy'],
    /default-src 'self'/,
  );
  assert.equal(
    securityHeaders['Strict-Transport-Security'],
    'max-age=63072000; includeSubDomains; preload',
  );
  assert.equal(securityHeaders['X-Frame-Options'], 'DENY');
  assert.equal(securityHeaders['X-Content-Type-Options'], 'nosniff');
  assert.equal(
    securityHeaders['Referrer-Policy'],
    'strict-origin-when-cross-origin',
  );
  assert.equal(
    securityHeaders['Permissions-Policy'],
    'camera=(), microphone=(), geolocation=()',
  );
  assert.equal(securityHeaders['Cross-Origin-Opener-Policy'], 'same-origin');
  assert.ok(Object.isFrozen(securityHeaders));
});

test('assigns immutable caching only to fingerprinted build assets', () => {
  assert.equal(
    cacheControlForPath('/_astro/client.DW6xmEpB.js'),
    'public, max-age=31536000, immutable',
  );
  assert.equal(cacheControlForPath('/'), 'public, max-age=0, must-revalidate');
  assert.equal(
    cacheControlForPath('/services/business-websites/'),
    'public, max-age=0, must-revalidate',
  );
  assert.equal(cacheControlForPath('/api/audit-request'), 'no-store');
});
