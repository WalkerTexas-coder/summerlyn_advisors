import Stripe from 'stripe';
import { isStripeHostedCheckoutUrl } from '../../src/lib/stripeCheckoutUrl';
import { CATALOG_ID, MAX_PRINT_QUANTITY, type ArtCommerceConfig, type ArtWork } from './catalog';
import type { ArtDeps, ArtStripe } from './deps';
import { resolveSiteOrigin } from './origin';
import { checkoutBlockers } from './readiness';
import { json } from './respond';

const FORBIDDEN_KEYS = new Set([
  'price',
  'unitamount',
  'unitamountcents',
  'amount',
  'amountcents',
  'stripepriceid',
  'priceid',
  'pricedata',
  'currency',
  'shippingrate',
  'shippingrateid',
  'shippingrates',
  'successurl',
  'cancelurl',
  'downloadurl',
  'fileurl',
  'asseturl',
]);

export interface CheckoutCommand {
  workId: string;
  sizeId: string;
  quantity: number;
  idempotencyKey: string | null;
}

export type CheckoutParseError = 'payload_too_large' | 'invalid_json' | 'invalid_body' | 'client_price_rejected' | 'invalid_idempotency_key';

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

export function parseCheckoutBody(raw: string): { ok: true; command: CheckoutCommand } | { ok: false; error: CheckoutParseError } {
  if (raw.length > 20_000) return { ok: false, error: 'payload_too_large' };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'invalid_json' };
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return { ok: false, error: 'invalid_body' };
  if (hasForbidden(parsed)) return { ok: false, error: 'client_price_rejected' };
  const body = parsed as Record<string, unknown>;
  if (typeof body.workId !== 'string' || !CATALOG_ID.test(body.workId)) return { ok: false, error: 'invalid_body' };
  if (typeof body.sizeId !== 'string' || !CATALOG_ID.test(body.sizeId)) return { ok: false, error: 'invalid_body' };
  const quantity = body.quantity === undefined ? 1 : body.quantity;
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_PRINT_QUANTITY) {
    return { ok: false, error: 'invalid_body' };
  }
  let idempotencyKey: string | null = null;
  if (body.idempotencyKey !== undefined) {
    if (typeof body.idempotencyKey !== 'string' || !/^[A-Za-z0-9_-]{16,80}$/.test(body.idempotencyKey)) {
      return { ok: false, error: 'invalid_idempotency_key' };
    }
    idempotencyKey = body.idempotencyKey;
  }
  return { ok: true, command: { workId: body.workId, sizeId: body.sizeId, quantity, idempotencyKey } };
}

function integrationIdentifier(): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let suffix = '';
  for (const byte of bytes) suffix += alphabet[byte % 26];
  return `summerlynart_${suffix}`;
}

export function checkoutSessionParams(input: {
  work: ArtWork;
  sizeId: string;
  quantity: number;
  origin: string;
  commerce: ArtCommerceConfig;
}): Stripe.Checkout.SessionCreateParams {
  const size = input.work.sizes.find((item) => item.id === input.sizeId);
  if (!size) throw new Error('size_missing');
  return {
    mode: 'payment',
    ui_mode: 'hosted_page',
    line_items: [{ price: size.stripePriceId, quantity: input.quantity }],
    success_url: `${input.origin}/art/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.origin}/art/checkout/canceled`,
    client_reference_id: `${input.work.id}:${size.id}`.slice(0, 200),
    metadata: {
      art_work_id: input.work.id,
      art_size_id: size.id,
      art_format: 'physical-print',
    },
    shipping_address_collection: {
      allowed_countries: input.commerce.shippingCountries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection['allowed_countries'],
    },
    shipping_options: input.commerce.stripeShippingRateIds.map((shippingRate) => ({ shipping_rate: shippingRate })),
    integration_identifier: integrationIdentifier(),
  };
}

async function createHostedSession(stripe: ArtStripe, deps: ArtDeps, command: CheckoutCommand, origin: string): Promise<Response> {
  const account = await stripe.accounts.retrieve(null);
  if (account.id !== deps.config.expectedStripeAccountId) return json({ error: 'checkout_unavailable' }, 503);
  const work = deps.catalog.find((item) => item.id === command.workId);
  if (!work) return json({ error: 'checkout_unavailable' }, 503);
  const params = checkoutSessionParams({
    work,
    sizeId: command.sizeId,
    quantity: command.quantity,
    origin,
    commerce: deps.commerce,
  });
  const idempotencyKey = command.idempotencyKey
    ? `art-checkout-${command.idempotencyKey}`
    : `art-checkout-${params.integration_identifier}`;
  const session = await stripe.checkout.sessions.create(params, { idempotencyKey });
  if (!session.url || !isStripeHostedCheckoutUrl(session.url)) return json({ error: 'checkout_unavailable' }, 503);
  return json({ url: session.url });
}

export async function handleArtCheckout(request: Request, deps: ArtDeps): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, { allow: 'POST' });
  const parsed = parseCheckoutBody(await request.text());
  if (!parsed.ok) return json({ error: parsed.error }, parsed.error === 'payload_too_large' ? 413 : 400);
  const origin = resolveSiteOrigin(request.url, deps.config.siteOrigin);
  const blockers = checkoutBlockers({
    catalog: deps.catalog,
    commerce: deps.commerce,
    config: deps.config,
    idempotencyConfigured: deps.idempotency !== null,
    origin,
    workId: parsed.command.workId,
    sizeId: parsed.command.sizeId,
  });
  if (blockers.length > 0 || !origin || !deps.config.secretKey) return json({ error: 'checkout_unavailable' }, 503);
  try {
    return await createHostedSession(deps.stripeFactory(deps.config.secretKey), deps, parsed.command, origin);
  } catch {
    return json({ error: 'checkout_unavailable' }, 503);
  }
}
