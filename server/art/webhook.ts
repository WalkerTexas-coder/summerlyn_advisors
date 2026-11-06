import type Stripe from 'stripe';
import { MAX_PRINT_QUANTITY } from './catalog.js';
import type { ArtDeps } from './deps.js';
import type { FulfillmentClaim, ShipmentRecord } from './idempotency.js';
import { json } from './respond.js';

const FULFILL_TYPES = new Set(['checkout.session.completed', 'checkout.session.async_payment_succeeded']);

function readMetadata(session: Record<string, unknown>): Record<string, string> {
  if (!session.metadata || typeof session.metadata !== 'object') return {};
  const metadata: Record<string, string> = {};
  for (const [key, value] of Object.entries(session.metadata as Record<string, unknown>)) {
    if (typeof value === 'string') metadata[key] = value;
  }
  return metadata;
}

function addressFrom(value: unknown): { line1?: string; country?: string } | null {
  if (!value || typeof value !== 'object') return null;
  const address = value as Record<string, unknown>;
  return {
    line1: typeof address.line1 === 'string' ? address.line1 : undefined,
    country: typeof address.country === 'string' ? address.country : undefined,
  };
}

/** Shipping details stay in Stripe. We only learn whether an address exists. */
export function hasShippingAddress(session: Record<string, unknown>): boolean {
  const collected = session.collected_information;
  const fromCollected = collected && typeof collected === 'object'
    ? addressFrom((collected as { shipping_details?: { address?: unknown } }).shipping_details?.address)
    : null;
  const legacy = session.shipping_details && typeof session.shipping_details === 'object'
    ? addressFrom((session.shipping_details as { address?: unknown }).address)
    : null;
  const address = fromCollected?.line1 ? fromCollected : legacy;
  return Boolean(address?.line1 && address.country);
}

export function assessArtEvent(event: Stripe.Event, deps: ArtDeps): FulfillmentClaim {
  const ignored: FulfillmentClaim = { eventId: event.id, outcome: 'ignored' };
  if (event.type === 'checkout.session.async_payment_failed') return ignored;
  if (!FULFILL_TYPES.has(event.type)) return ignored;
  const session = event.data.object as unknown;
  if (!session || typeof session !== 'object') return ignored;
  const record = session as Record<string, unknown>;
  if (record.object !== 'checkout.session' || typeof record.id !== 'string') return ignored;
  const metadata = readMetadata(record);
  if (metadata.art_format !== 'physical-print' || !metadata.art_work_id || !metadata.art_size_id) return ignored;
  const notShipped: FulfillmentClaim = { eventId: event.id, outcome: 'not_shipped' };
  if (record.payment_status !== 'paid' || record.mode !== 'payment') return notShipped;
  const work = deps.catalog.find((item) => item.id === metadata.art_work_id);
  const size = work?.sizes.find((item) => item.id === metadata.art_size_id);
  if (!work || !size || !work.approvedForSale || work.format !== 'physical-print') return notShipped;
  if (record.currency !== size.currency || typeof record.amount_subtotal !== 'number') return notShipped;
  if (size.unitAmountCents <= 0 || record.amount_subtotal % size.unitAmountCents !== 0) return notShipped;
  const quantity = record.amount_subtotal / size.unitAmountCents;
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_PRINT_QUANTITY) return notShipped;
  if (!hasShippingAddress(record)) return notShipped;
  const shipment: ShipmentRecord = {
    eventId: event.id,
    sessionId: record.id,
    workId: work.id,
    sizeId: size.id,
    quantity,
    currency: 'usd',
    amountSubtotal: record.amount_subtotal,
  };
  return { eventId: event.id, outcome: 'shipped_record', shipment };
}

export async function handleArtWebhook(request: Request, deps: ArtDeps): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, { allow: 'POST' });
  const payload = await request.text();
  if (payload.length > 1_000_000) return json({ error: 'payload_too_large' }, 413);
  const signature = request.headers.get('stripe-signature');
  if (!deps.config.webhookSecret?.startsWith('whsec_') || !signature) return json({ error: 'invalid_signature' }, 400);
  let event: Stripe.Event;
  try {
    event = deps.verifyWebhook(payload, signature, deps.config.webhookSecret);
  } catch {
    return json({ error: 'invalid_signature' }, 400);
  }
  if (typeof event.id !== 'string' || event.id.length === 0) return json({ error: 'invalid_payload' }, 400);
  if (!deps.idempotency) return json({ error: 'fulfillment_unconfigured' }, 503);
  const claim = assessArtEvent(event, deps);
  const saved = await deps.idempotency.record(claim);
  if (saved.duplicate) return json({ received: true, duplicate: true });
  return json({ received: true, duplicate: false, outcome: claim.outcome });
}
