const fingerprintedAssetPattern =
  /^\/_astro\/.+\.[A-Za-z0-9_-]{8,}\.(?:css|js|mjs|woff2?|png|jpe?g|webp|avif|svg)$/;

export function cacheControlForPath(pathname) {
  if (pathname.startsWith('/api/')) return 'no-store';
  if (fingerprintedAssetPattern.test(pathname)) {
    return 'public, max-age=31536000, immutable';
  }
  return 'public, max-age=0, must-revalidate';
}
