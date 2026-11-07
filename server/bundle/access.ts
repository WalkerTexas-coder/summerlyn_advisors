import type { BundleDeps } from './deps.js';
import { json } from './respond.js';
import { verifiedBytes } from './storage.js';
import { bearerToken, issueDownloadToken, readDownloadToken } from './token.js';
import { SESSION_ID, sessionMatchesBundle } from './verify.js';

const FORBIDDEN_KEYS = new Set([
  'price',
  'amount',
  'url',
  'redirect',
  'next',
  'downloadurl',
  'fileurl',
  'successurl',
]);

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/[_-]/g, '');
}

function hasForbidden(value: unknown, depth = 0): boolean {
  if (depth > 5 || !value || typeof value !== 'object') return false;
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (FORBIDDEN_KEYS.has(normalizeKey(key))) return true;
    if (hasForbidden(child, depth + 1)) return true;
  }
  return false;
}

export function parseAccessBody(raw: string): { ok: true; sessionId: string } | { ok: false; status: 401 | 400 | 413 } {
  if (raw.length > 20_000) return { ok: false, status: 413 };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, status: 400 };
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return { ok: false, status: 400 };
  if (hasForbidden(parsed)) return { ok: false, status: 400 };
  const sessionId = (parsed as Record<string, unknown>).sessionId;
  if (sessionId === undefined || sessionId === null || sessionId === '') return { ok: false, status: 401 };
  if (typeof sessionId !== 'string' || !SESSION_ID.test(sessionId)) return { ok: false, status: 401 };
  return { ok: true, sessionId };
}

export async function loadPaidSession(deps: BundleDeps, sessionId: string): Promise<'unauthorized' | 'unavailable' | 'paid'> {
  if (!deps.config.secretKey || !deps.fulfillment) return 'unauthorized';
  try {
    const stripe = deps.stripeFactory(deps.config.secretKey);
    const account = await stripe.accounts.retrieve(null);
    if (account.id !== deps.product.accountId) return 'unauthorized';
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items.data.price.product'] });
    if (!sessionMatchesBundle(session, deps.product)) return 'unauthorized';
    if (!(await deps.fulfillment.hasSession(sessionId))) return 'unauthorized';
    return 'paid';
  } catch {
    return 'unauthorized';
  }
}

export async function handleBundleAccess(request: Request, deps: BundleDeps): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, { allow: 'POST' });
  const parsed = parseAccessBody(await request.text());
  if (!parsed.ok) return json({ error: parsed.status === 401 ? 'unauthorized' : 'invalid_body' }, parsed.status);
  const paid = await loadPaidSession(deps, parsed.sessionId);
  if (paid !== 'paid') return json({ error: 'forbidden' }, 403);
  if (!deps.config.downloadSecret) return json({ error: 'delivery_unavailable' }, 503);
  const file = await verifiedBytes(deps.fileStore, deps.product.sha256);
  if (!file) return json({ error: 'delivery_unavailable' }, 503);
  const issued = issueDownloadToken(deps.config.downloadSecret, parsed.sessionId, deps.now());
  return json({ token: issued.token, expiresAt: issued.expiresAt });
}

export async function handleBundleFile(request: Request, deps: BundleDeps): Promise<Response> {
  if (request.method !== 'GET') return json({ error: 'method_not_allowed' }, 405, { allow: 'GET' });
  const token = bearerToken(request);
  if (!token || !deps.config.downloadSecret) return json({ error: 'unauthorized' }, 401);
  const ticket = readDownloadToken(deps.config.downloadSecret, token, deps.now());
  if (!ticket) return json({ error: 'forbidden' }, 403);
  const paid = await loadPaidSession(deps, ticket.sessionId);
  if (paid !== 'paid') return json({ error: 'forbidden' }, 403);
  const file = await verifiedBytes(deps.fileStore, deps.product.sha256);
  if (!file) return json({ error: 'delivery_unavailable' }, 503);
  return new Response(file, {
    status: 200,
    headers: {
      'content-type': 'application/zip',
      'content-disposition': `attachment; filename="${deps.product.filename}"`,
      'content-length': String(file.byteLength),
      'cache-control': 'private, no-store',
      'x-content-type-options': 'nosniff',
    },
  });
}
