import assert from 'node:assert/strict';
import test from 'node:test';
import { securityHeaders } from '../../security-headers.mjs';

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
