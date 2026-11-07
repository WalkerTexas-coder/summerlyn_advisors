import type Stripe from 'stripe';
import { isStripeHostedCheckoutUrl } from '../../src/lib/stripeCheckoutUrl.js';
import { resolveSiteOrigin } from '../art/origin.js';
import { isLiveStripeKey, isStripeSecretShape, type BundleRuntimeConfig } from './config.js';
import type { BundleDeps } from './deps.js';
import type { FulfillmentStore } from './fulfillment.js';
import { CHECKOUT_RELEASED, OFFER_SCOPE_MATCHES_PRICE, type BundleProduct } from './product.js';
import { json } from './respond.js';
import { verifiedBytes } from './storage.js';
import { priceMatchesBundle, productMatchesBundle } from './verify.js';

const FORBIDDEN_KEYS = new Set([
  'price',
  'unitamount',
  'unitamountcents',
  'amount',
  'amountcents',
  'stripepriceid',
  'priceid',
  'productid',
  'pricedata',
  'currency',
  'successurl',
  'cancelurl',
  'downloadurl',
  'fileurl',
  'asseturl',
  'url',
  'redirect',
  'next',
  'returnurl',
]);

export type CheckoutParseError = 'payload_too_large' | 'invalid_json' | 'invalid_body' | 'client_price_rejected' | 'invalid_idempotency_key';

export interface CheckoutCommand {
  idempotencyKey: string | null;
}

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
  if (raw.trim() === '') return { ok: true, command: { idempotencyKey: null } };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'invalid_json' };
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return { ok: false, error: 'invalid_body' };
  if (hasForbidden(parsed)) return { ok: false, error: 'client_price_rejected' };
  const body = parsed as Record<string, unknown>;
  let idempotencyKey: string | null = null;
  if (body.idempotencyKey !== undefined) {
    if (typeof body.idempotencyKey !== 'string' || !/^[A-Za-z0-9_-]{16,80}$/.test(body.idempotencyKey)) {
      return { ok: false, error: 'invalid_idempotency_key' };
    }
    idempotencyKey = body.idempotencyKey;
  }
  return { ok: true, command: { idempotencyKey } };
}

export function integrationIdentifier(): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let suffix = '';
  for (const byte of bytes) suffix += alphabet[byte % 26];
  return `summerlynbundle_${suffix}`;
}

export function checkoutSessionParams(input: {
  origin: string;
  product: BundleProduct;
}): Stripe.Checkout.SessionCreateParams {
  return {
    mode: 'payment',
    ui_mode: 'hosted_page',
    line_items: [{ price: input.product.priceId, quantity: 1 }],
    automatic_tax: { enabled: true },
    billing_address_collection: 'required',
    success_url: `${input.origin}/bundle/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.origin}/bundle`,
    client_reference_id: input.product.sku,
    metadata: {
      bundle_sku: input.product.sku,
      bundle_edition: input.product.edition,
    },
    integration_identifier: integrationIdentifier(),
  };
}

export interface CheckoutGateInput {
  checkoutReleased: boolean;
  offerScopeMatchesPrice: boolean;
  config: BundleRuntimeConfig;
  fulfillment: FulfillmentStore | null;
  origin: string | null;
}

export function checkoutGateBlockers(input: CheckoutGateInput): string[] {
  const blockers: string[] = [];
  if (!input.checkoutReleased) blockers.push('checkout_not_released');
  if (!input.offerScopeMatchesPrice) blockers.push('offer_scope_unconfirmed');
  if (!input.config.secretKey) blockers.push('missing_stripe_secret');
  else if (!isStripeSecretShape(input.config.secretKey)) blockers.push('invalid_stripe_secret');
  else if (!isLiveStripeKey(input.config.secretKey)) blockers.push('live_price_requires_live_key');
  if (!input.config.webhookSecret?.startsWith('whsec_')) blockers.push('missing_webhook_secret');
  if (!input.config.downloadSecret) blockers.push('missing_download_secret');
  if (!input.fulfillment) blockers.push('fulfillment_unconfigured');
  if (!input.config.blobPathname || (!input.config.blobToken && !input.config.blobStoreId)) blockers.push('private_storage_unconfigured');
  if (!input.origin) blockers.push('origin_not_allowed');
  return blockers;
}

export async function handleBundleCheckout(request: Request, deps: BundleDeps): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, { allow: 'POST' });
  const parsed = parseCheckoutBody(await request.text());
  if (!parsed.ok) return json({ error: parsed.error }, parsed.error === 'payload_too_large' ? 413 : 400);
  const origin = resolveSiteOrigin(request.url, deps.config.siteOrigin);
  const blockers = checkoutGateBlockers({
    checkoutReleased: deps.checkoutReleased,
    offerScopeMatchesPrice: deps.offerScopeMatchesPrice,
    config: deps.config,
    fulfillment: deps.fulfillment,
    origin,
  });
  if (blockers.length > 0 || !origin) return json({ error: 'checkout_unavailable' }, 503);
  const file = await verifiedBytes(deps.fileStore, deps.product.sha256);
  if (!file) return json({ error: 'checkout_unavailable' }, 503);
  try {
    const stripe = deps.stripeFactory(deps.config.secretKey as string);
    const account = await stripe.accounts.retrieve(null);
    if (account.id !== deps.product.accountId) return json({ error: 'checkout_unavailable' }, 503);
    const price = await stripe.prices.retrieve(deps.product.priceId);
    if (!priceMatchesBundle(price, deps.product)) return json({ error: 'checkout_unavailable' }, 503);
    const remoteProduct = await stripe.products.retrieve(deps.product.productId);
    if (!productMatchesBundle(remoteProduct, deps.product)) return json({ error: 'checkout_unavailable' }, 503);
    const params = checkoutSessionParams({ origin, product: deps.product });
    const idempotencyKey = parsed.command.idempotencyKey
      ? `bundle-checkout-${parsed.command.idempotencyKey}`
      : `bundle-checkout-${params.integration_identifier}`;
    const session = await stripe.checkout.sessions.create(params, { idempotencyKey });
    if (!session.url || !isStripeHostedCheckoutUrl(session.url)) return json({ error: 'checkout_unavailable' }, 503);
    return json({ url: session.url });
  } catch {
    return json({ error: 'checkout_unavailable' }, 503);
  }
}

export function bundleCheckoutReleased(): boolean {
  return CHECKOUT_RELEASED && OFFER_SCOPE_MATCHES_PRICE;
}
