import { handleArtCheckout } from './checkout';
import { createArtDeps, type ArtDeps } from './deps';
import { resolveSiteOrigin } from './origin';
import { toPublicCatalog } from './readiness';
import { json } from './respond';
import { handleArtWebhook } from './webhook';

export function handleArtCatalog(request: Request, deps: ArtDeps): Response {
  if (request.method !== 'GET') return json({ error: 'method_not_allowed' }, 405, { allow: 'GET' });
  const origin = resolveSiteOrigin(request.url, deps.config.siteOrigin);
  return json(toPublicCatalog({
    catalog: deps.catalog,
    commerce: deps.commerce,
    config: deps.config,
    idempotencyConfigured: deps.idempotency !== null,
    origin,
  }));
}

function requestUrl(request: Request): URL {
  try {
    return new URL(request.url);
  } catch {
    const hostHeader = request.headers?.get?.('x-forwarded-host') ?? request.headers?.get?.('host') ?? 'localhost';
    const proto = request.headers?.get?.('x-forwarded-proto') ?? 'https';
    return new URL(request.url || '/', `${proto}://${hostHeader}`);
  }
}

export function handleArtRequest(request: Request, deps: ArtDeps = createArtDeps()): Promise<Response> | Response {
  const path = requestUrl(request).pathname.replace(/\/+$/, '') || '/';
  if (path === '/api/art/catalog') return handleArtCatalog(request, deps);
  if (path === '/api/art/checkout') return handleArtCheckout(request, deps);
  if (path === '/api/art/webhook') return handleArtWebhook(request, deps);
  return json({ error: 'not_found' }, 404);
}
