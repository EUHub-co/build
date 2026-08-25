import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

const port = 46173;
const origin = `http://127.0.0.1:${port}`;
const child = spawn(process.execPath, ['server.mjs'], {
  env: { ...process.env, HOST: '127.0.0.1', PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let stderr = '';
child.stderr.on('data', (chunk) => {
  stderr += chunk;
});

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${origin}/`);
      if (response.ok) return;
    } catch {
      // The process has not bound the port yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Production server did not start. ${stderr}`);
}

try {
  await waitForServer();

  const html = await fetch(`${origin}/`, {
    headers: { 'accept-encoding': 'gzip' },
  });
  assert.equal(html.status, 200);
  assert.equal(html.headers.get('content-encoding'), 'gzip');
  assert.equal(
    html.headers.get('cache-control'),
    'public, max-age=0, must-revalidate',
  );

  const markup = await html.text();
  const assetPath = markup.match(/\/_astro\/[^"']+\.js/)?.[0];
  assert.ok(assetPath, 'homepage must expose a fingerprinted JavaScript asset');
  const asset = await fetch(`${origin}${assetPath}`);
  assert.equal(asset.status, 200);
  assert.equal(
    asset.headers.get('cache-control'),
    'public, max-age=31536000, immutable',
  );

  const api = await fetch(`${origin}/api/audit-request`);
  assert.equal(api.headers.get('cache-control'), 'no-store');

  for (const pathname of ['/sk/404/', '/sk/definitely-missing/']) {
    const notFound = await fetch(`${origin}${pathname}`);
    assert.equal(notFound.status, 404, `${pathname} must return HTTP 404`);
    const notFoundMarkup = await notFound.text();
    assert.match(
      notFoundMarkup,
      /<html lang="sk"/,
      `${pathname} must use the Slovak document language`,
    );
    assert.match(
      notFoundMarkup,
      /Táto stránka neexistuje/,
      `${pathname} must render the Slovak not-found message`,
    );
  }

  console.log('Production server audit passed.');
} finally {
  child.kill('SIGTERM');
  await Promise.race([
    once(child, 'exit'),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ]);
}
