import { resolveSiteOrigin } from '../art/origin.js';
import { handleBundleAccess, handleBundleFile } from './access.js';
import { checkoutGateBlockers, handleBundleCheckout } from './checkout.js';
import { createBundleDeps, type BundleDeps } from './deps.js';
import { json } from './respond.js';
import { verifiedBytes } from './storage.js';
import { handleBundleIntake } from './intake.js';
import { handleBundleWebhook } from './webhook.js';

export async function handleBundleStatus(request: Request, deps: BundleDeps): Promise<Response> {
  if (request.method !== 'GET') return json({ error: 'method_not_allowed' }, 405, { allow: 'GET' });
  const origin = resolveSiteOrigin(request.url, deps.config.siteOrigin);
  const blockers = checkoutGateBlockers({
    checkoutReleased: deps.checkoutReleased,
    offerScopeMatchesPrice: deps.offerScopeMatchesPrice,
    config: deps.config,
    fulfillment: deps.fulfillment,
    origin,
  });
  if (blockers.length > 0) return json({ purchasable: false });
  const file = await verifiedBytes(deps.fileStore, deps.product.sha256);
  return json({ purchasable: file !== null });
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

export function handleBundleRequest(request: Request, deps: BundleDeps = createBundleDeps()): Promise<Response> | Response {
  const path = requestUrl(request).pathname.replace(/\/+$/, '') || '/';
  if (path === '/api/bundle/status') return handleBundleStatus(request, deps);
  if (path === '/api/bundle/checkout') return handleBundleCheckout(request, deps);
  if (path === '/api/bundle/access') return handleBundleAccess(request, deps);
  if (path === '/api/bundle/file') return handleBundleFile(request, deps);
  if (path === '/api/bundle/intake') return handleBundleIntake(request, deps);
  if (path === '/api/bundle/webhook') return handleBundleWebhook(request, deps);
  return json({ error: 'not_found' }, 404);
}
