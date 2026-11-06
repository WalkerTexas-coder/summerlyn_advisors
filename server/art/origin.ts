const PRODUCTION_ORIGINS = new Set([
  'https://summerlynadvisors.com',
  'https://www.summerlynadvisors.com',
]);

function isLocalOrigin(origin: string): boolean {
  return /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function parseOrigin(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    if (url.username || url.password || url.search || url.hash) return null;
    if (url.pathname !== '/' && url.pathname !== '') return null;
    return url.origin;
  } catch {
    return null;
  }
}

/**
 * Success and cancel URLs are chosen here. The browser cannot supply them.
 * A configured `ART_SITE_ORIGIN` is trusted because it is server-side.
 * Otherwise only the production hosts and local dev are accepted.
 */
export function resolveSiteOrigin(requestUrl: string, configured: string | null): string | null {
  if (configured) {
    const origin = parseOrigin(configured);
    if (!origin) return null;
    if (origin.startsWith('http://') && !isLocalOrigin(origin)) return null;
    return origin;
  }
  try {
    const origin = new URL(requestUrl).origin;
    if (PRODUCTION_ORIGINS.has(origin) || isLocalOrigin(origin)) return origin;
    return null;
  } catch {
    return null;
  }
}
