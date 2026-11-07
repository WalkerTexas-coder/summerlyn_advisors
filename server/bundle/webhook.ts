import type Stripe from 'stripe';
import type { BundleDeps } from './deps.js';
import { json } from './respond.js';
import { EVENT_ID, sessionMatchesBundle, type PaidSession } from './verify.js';

const GRANT_TYPES = new Set(['checkout.session.completed', 'checkout.session.async_payment_succeeded']);

export async function handleBundleWebhook(request: Request, deps: BundleDeps): Promise<Response> {
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
  if (!EVENT_ID.test(event.id)) return json({ error: 'invalid_payload' }, 400);
  if (!deps.fulfillment || !deps.config.secretKey) return json({ error: 'fulfillment_unconfigured' }, 503);
  if (event.type === 'checkout.session.async_payment_failed') {
    const failedId = sessionIdFromEvent(event);
    const saved = await deps.fulfillment.record({ eventId: event.id, sessionId: failedId, grant: false });
    return json({ received: true, duplicate: saved.duplicate, granted: false });
  }
  if (!GRANT_TYPES.has(event.type)) return json({ received: true, duplicate: false, granted: false });
  const sessionId = sessionIdFromEvent(event);
  if (!sessionId) return json({ received: true, duplicate: false, granted: false });
  try {
    const stripe = deps.stripeFactory(deps.config.secretKey);
    const account = await stripe.accounts.retrieve(null);
    if (account.id !== deps.product.accountId) {
      const saved = await deps.fulfillment.record({ eventId: event.id, sessionId, grant: false });
      return json({ received: true, duplicate: saved.duplicate, granted: false });
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items.data.price.product'] });
    const grant = sessionMatchesBundle(session, deps.product);
    const saved = await deps.fulfillment.record({ eventId: event.id, sessionId, grant });
    return json({ received: true, duplicate: saved.duplicate, granted: grant && !saved.duplicate });
  } catch {
    return json({ error: 'fulfillment_unavailable' }, 500);
  }
}

function sessionIdFromEvent(event: Stripe.Event): string | null {
  const object = event.data?.object as PaidSession | undefined;
  if (!object || object.object !== 'checkout.session' || typeof object.id !== 'string') return null;
  return object.id;
}
