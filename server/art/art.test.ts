import Stripe from 'stripe';
import { describe, expect, it } from 'vitest';
import { isStripeHostedCheckoutUrl } from '../../src/lib/stripeCheckoutUrl';
import { artCatalog, artCommerce, EXPECTED_STRIPE_ACCOUNT_ID, type ArtCommerceConfig, type ArtWork } from './catalog';
import { handleArtCheckout } from './checkout';
import { readArtConfig } from './config';
import { createArtDeps, type ArtDeps, type ArtStripe } from './deps';
import { handleArtRequest } from './http';
import { artApiHandler } from './nodeHandler';
import { memoryIdempotencyStore, type FulfillmentClaim } from './idempotency';
import { resolveSiteOrigin } from './origin';
import { globalSalesBlockers, toPublicCatalog } from './readiness';
import { handleArtWebhook } from './webhook';

const TEST_SECRET = ['rk', 'test', 'placeholder'].join('_');
const LIVE_SECRET = ['rk', 'live', 'placeholder'].join('_');
const WEBHOOK_SECRET = ['whsec', 'testsecret'].join('_');

const fixtureWork: ArtWork = {
  id: 'test-work',
  title: 'Test print',
  artist: 'Test Artist',
  description: 'Fixture only. Not a Summerlyn Art listing.',
  medium: 'watercolor-illustration',
  format: 'physical-print',
  image: { src: 'https://evil.example/print.jpg', alt: 'Remote stand-in' },
  approvedForSale: true,
  reproductionTerms: null,
  sizes: [{
    id: 'test-size',
    label: 'Test size',
    widthInches: 8,
    heightInches: 10,
    stripePriceId: 'price_testprintsize',
    unitAmountCents: 4500,
    currency: 'usd',
  }],
};

const fixtureCommerce: ArtCommerceConfig = {
  fulfillmentTerms: 'Fixture fulfillment text. Not a customer policy.',
  shippingCountries: ['US'],
  stripeShippingRateIds: ['shr_testRate'],
};

function readyConfig(overrides: Partial<ReturnType<typeof readArtConfig>> = {}) {
  return {
    ...readArtConfig({}),
    secretKey: TEST_SECRET,
    webhookSecret: WEBHOOK_SECRET,
    checkoutEnabled: true,
    ...overrides,
    allowLiveCharges: false,
  };
}

function fakeStripe(accountId: string) {
  const created: Stripe.Checkout.SessionCreateParams[] = [];
  const keys: Array<string | undefined> = [];
  const client: ArtStripe = {
    accounts: { retrieve: () => Promise.resolve({ id: accountId }) },
    checkout: {
      sessions: {
        create: async (params, options) => {
          created.push(params);
          keys.push(options?.idempotencyKey);
          return { id: 'cs_test_session', url: 'https://checkout.stripe.com/c/pay/cs_test_session' };
        },
      },
    },
  };
  return { client, created, keys };
}

function readyDeps(overrides: Partial<ArtDeps> = {}) {
  const stripe = fakeStripe(EXPECTED_STRIPE_ACCOUNT_ID);
  const store = memoryIdempotencyStore();
  const deps: ArtDeps = {
    catalog: [fixtureWork],
    commerce: fixtureCommerce,
    config: readyConfig(),
    idempotency: store,
    stripeFactory: () => stripe.client,
    verifyWebhook: (payload, header, secret) => Stripe.webhooks.constructEvent(payload, header, secret),
    ...overrides,
  };
  return { deps, stripe, store };
}

function checkoutRequest(body: unknown, url = 'http://localhost:5173/api/art/checkout') {
  return new Request(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function artEvent(type: string, session: Record<string, unknown>, id: string) {
  return {
    id,
    object: 'event',
    type,
    data: { object: { id: `cs_${id}`, object: 'checkout.session', mode: 'payment', currency: 'usd', ...session } },
  };
}

function signedWebhook(event: unknown, secret = WEBHOOK_SECRET) {
  const payload = JSON.stringify(event);
  const header = Stripe.webhooks.generateTestHeaderString({ payload, secret });
  return new Request('http://localhost:5173/api/art/webhook', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'stripe-signature': header },
    body: payload,
  });
}

const paidSession = {
  payment_status: 'paid',
  amount_subtotal: 4500,
  metadata: { art_work_id: 'test-work', art_size_id: 'test-size', art_format: 'physical-print' },
  collected_information: {
    shipping_details: { name: 'Test Buyer', address: { line1: '1 Main St', country: 'US' } },
  },
};

describe('Summerlyn Art catalog', () => {
  it('ships with an empty catalog and no fulfillment terms', () => {
    expect(artCatalog).toEqual([]);
    expect(artCommerce).toEqual({ fulfillmentTerms: null, shippingCountries: [], stripeShippingRateIds: [] });
    expect(readArtConfig({ ART_ALLOW_LIVE_CHARGES: 'true', ART_CHECKOUT_ENABLED: 'true' }).allowLiveCharges).toBe(false);
  });

  it('keeps the public catalog closed and free of price ids', () => {
    const catalog = toPublicCatalog({
      catalog: artCatalog,
      commerce: artCommerce,
      config: readArtConfig({}),
      idempotencyConfigured: false,
      origin: 'http://localhost:5173',
    });
    expect(catalog).toEqual({ salesOpen: false, works: [] });
    const hidden = toPublicCatalog({
      catalog: [fixtureWork],
      commerce: fixtureCommerce,
      config: readyConfig({ checkoutEnabled: false }),
      idempotencyConfigured: true,
      origin: 'http://localhost:5173',
    });
    expect(hidden.salesOpen).toBe(false);
    expect(hidden.works[0].image).toBeNull();
    expect(hidden.works[0].sizes[0].purchasable).toBe(false);
    expect(hidden.works[0].sizes[0].unitAmountCents).toBeUndefined();
    expect(JSON.stringify(hidden)).not.toContain('price_');
    expect(JSON.stringify(hidden)).not.toContain('shr_');
  });

  it('lists why sales are closed', () => {
    expect(globalSalesBlockers({
      catalog: artCatalog,
      commerce: artCommerce,
      config: readArtConfig({}),
      idempotencyConfigured: false,
      origin: 'http://localhost:5173',
    })).toEqual([
      'checkout_not_enabled',
      'missing_stripe_secret',
      'missing_webhook_secret',
      'idempotency_unconfigured',
      'fulfillment_terms_missing',
      'shipping_countries_missing',
      'shipping_rates_missing',
    ]);
  });

  it('accepts only the production site and local dev as return origins', () => {
    expect(resolveSiteOrigin('http://localhost:5173/api/art/checkout', null)).toBe('http://localhost:5173');
    expect(resolveSiteOrigin('https://www.summerlynadvisors.com/art', null)).toBe('https://www.summerlynadvisors.com');
    expect(resolveSiteOrigin('https://evil.example/api/art/checkout', null)).toBeNull();
    expect(resolveSiteOrigin('http://localhost:5173/api/art/checkout', 'https://preview.example')).toBe('https://preview.example');
  });
});

describe('checkout', () => {
  it('refuses client prices and stays unavailable on the real catalog', async () => {
    const priced = await handleArtCheckout(checkoutRequest({
      workId: 'test-work',
      sizeId: 'test-size',
      line_items: [{ price_data: { unit_amount: 100 } }],
    }), createArtDeps({}));
    expect(priced.status).toBe(400);
    expect(await priced.json()).toEqual({ error: 'client_price_rejected' });

    const closed = await handleArtCheckout(checkoutRequest({ workId: 'test-work', sizeId: 'test-size', quantity: 1 }), createArtDeps({}));
    expect(closed.status).toBe(503);
    expect(await closed.json()).toEqual({ error: 'checkout_unavailable' });
  });

  it('creates a hosted session from the server price only when every gate is open', async () => {
    const { deps, stripe } = readyDeps();
    const response = await handleArtCheckout(checkoutRequest({ workId: 'test-work', sizeId: 'test-size', quantity: 2 }), deps);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ url: 'https://checkout.stripe.com/c/pay/cs_test_session' });
    const params = stripe.created[0];
    expect(params.mode).toBe('payment');
    expect(params.ui_mode).toBe('hosted_page');
    expect(params.line_items).toEqual([{ price: 'price_testprintsize', quantity: 2 }]);
    expect('payment_method_types' in params).toBe(false);
    expect(params.automatic_tax).toBeUndefined();
    expect(params.success_url).toBe('http://localhost:5173/art/checkout/success?session_id={CHECKOUT_SESSION_ID}');
    expect(params.cancel_url).toBe('http://localhost:5173/art/checkout/canceled');
    expect(params.metadata).toMatchObject({ art_work_id: 'test-work', art_size_id: 'test-size', art_format: 'physical-print' });
    expect(params.shipping_options).toEqual([{ shipping_rate: 'shr_testRate' }]);
    expect(params.integration_identifier).toMatch(/^summerlynart_[a-z]{8}$/);
    expect(JSON.stringify(params)).not.toContain('unit_amount');
    expect(JSON.stringify(params)).not.toContain('price_data');
    expect(JSON.stringify(params)).not.toContain('download');
    expect(stripe.keys[0]).toMatch(/^art-checkout-summerlynart_[a-z]{8}$/);
  });

  it('refuses a live key, the wrong account, a foreign return url, and a non-Stripe redirect', async () => {
    const live = readyDeps({ config: readyConfig({ secretKey: LIVE_SECRET }) });
    const liveResponse = await handleArtCheckout(checkoutRequest({ workId: 'test-work', sizeId: 'test-size' }), live.deps);
    expect(liveResponse.status).toBe(503);
    expect(live.stripe.created).toHaveLength(0);

    const other = fakeStripe('acct_other');
    const mismatch = readyDeps({ stripeFactory: () => other.client });
    expect((await handleArtCheckout(checkoutRequest({ workId: 'test-work', sizeId: 'test-size' }), mismatch.deps)).status).toBe(503);
    expect(other.created).toHaveLength(0);

    let calls = 0;
    const foreign = readyDeps({
      stripeFactory: () => {
        calls += 1;
        return fakeStripe(EXPECTED_STRIPE_ACCOUNT_ID).client;
      },
    });
    const foreignResponse = await handleArtCheckout(checkoutRequest({ workId: 'test-work', sizeId: 'test-size' }, 'https://evil.example/api/art/checkout'), foreign.deps);
    expect(foreignResponse.status).toBe(503);
    expect(calls).toBe(0);

    const phish = fakeStripe(EXPECTED_STRIPE_ACCOUNT_ID);
    phish.client.checkout.sessions.create = async () => ({ id: 'cs_phish', url: 'https://evil.example/pay' });
    const phishResponse = await handleArtCheckout(checkoutRequest({ workId: 'test-work', sizeId: 'test-size' }), readyDeps({ stripeFactory: () => phish.client }).deps);
    expect(phishResponse.status).toBe(503);
    expect(isStripeHostedCheckoutUrl('https://evil.example/pay')).toBe(false);
    expect(isStripeHostedCheckoutUrl('https://checkout.stripe.com/c/pay/cs_test')).toBe(true);
  });
});

describe('webhook fulfillment', () => {
  it('rejects a bad signature before touching the store', async () => {
    const { deps, store } = readyDeps();
    let records = 0;
    deps.idempotency = {
      async record(claim: FulfillmentClaim) {
        records += 1;
        return store.record(claim);
      },
    };
    const request = signedWebhook(artEvent('checkout.session.completed', paidSession, 'evt_paid'));
    const payload = await request.text();
    const tampered = new Request(request.url, {
      method: 'POST',
      headers: request.headers,
      body: payload.replace('paid', 'unpaid'),
    });
    const response = await handleArtWebhook(tampered, deps);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'invalid_signature' });
    expect(records).toBe(0);
    expect(store.shipments).toHaveLength(0);
  });

  it('records one shipment for a verified paid print and ignores a duplicate delivery', async () => {
    const { deps, store } = readyDeps();
    const event = artEvent('checkout.session.completed', paidSession, 'evt_paid');
    const first = await handleArtWebhook(signedWebhook(event), deps);
    const second = await handleArtWebhook(signedWebhook(event), deps);
    expect(first.status).toBe(200);
    expect(await first.json()).toEqual({ received: true, duplicate: false, outcome: 'shipped_record' });
    expect(await second.json()).toEqual({ received: true, duplicate: true });
    expect(store.shipments).toEqual([{
      eventId: 'evt_paid',
      sessionId: 'cs_evt_paid',
      workId: 'test-work',
      sizeId: 'test-size',
      quantity: 1,
      currency: 'usd',
      amountSubtotal: 4500,
    }]);
    expect(JSON.stringify(store.shipments)).not.toContain('1 Main St');
    expect(JSON.stringify(store.shipments)).not.toContain('download');
  });

  it('does not ship unpaid, underpaid, address-less, or unrelated events', async () => {
    const { deps, store } = readyDeps();
    const unpaid = await handleArtWebhook(signedWebhook(artEvent('checkout.session.completed', { ...paidSession, payment_status: 'unpaid' }, 'evt_unpaid')), deps);
    expect(await unpaid.json()).toMatchObject({ outcome: 'not_shipped' });
    const underpaid = await handleArtWebhook(signedWebhook(artEvent('checkout.session.completed', { ...paidSession, amount_subtotal: 1 }, 'evt_under')), deps);
    expect(await underpaid.json()).toMatchObject({ outcome: 'not_shipped' });
    const noAddress = await handleArtWebhook(signedWebhook(artEvent('checkout.session.completed', { ...paidSession, collected_information: null }, 'evt_address')), deps);
    expect(await noAddress.json()).toMatchObject({ outcome: 'not_shipped' });
    const other = await handleArtWebhook(signedWebhook(artEvent('checkout.session.completed', { payment_status: 'paid', amount_subtotal: 19900, metadata: { service: 'call-list' } }, 'evt_calls')), deps);
    expect(await other.json()).toMatchObject({ outcome: 'ignored' });
    const failed = await handleArtWebhook(signedWebhook(artEvent('checkout.session.async_payment_failed', paidSession, 'evt_failed')), deps);
    expect(await failed.json()).toMatchObject({ outcome: 'ignored' });
    expect(store.shipments).toHaveLength(0);
  });

  it('ships only after a later paid event when the first completion is unpaid', async () => {
    const { deps, store } = readyDeps();
    await handleArtWebhook(signedWebhook(artEvent('checkout.session.completed', { ...paidSession, payment_status: 'unpaid' }, 'evt_open')), deps);
    const paid = await handleArtWebhook(signedWebhook(artEvent('checkout.session.async_payment_succeeded', paidSession, 'evt_later')), deps);
    expect(await paid.json()).toMatchObject({ outcome: 'shipped_record' });
    expect(store.shipments).toHaveLength(1);
    expect(store.shipments[0].eventId).toBe('evt_later');
  });

  it('does not fulfill when the idempotency store is not configured', async () => {
    const { deps } = readyDeps({ idempotency: null });
    const response = await handleArtWebhook(signedWebhook(artEvent('checkout.session.completed', paidSession, 'evt_nostore')), deps);
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: 'fulfillment_unconfigured' });
  });
});

describe('http catalog', () => {
  it('serves an empty public catalog and no checkout link', async () => {
    const response = await handleArtRequest(new Request('http://localhost:5173/api/art/catalog'));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ salesOpen: false, works: [] });
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('answers a Node-style Vercel request with the empty catalog', async () => {
    const sent: { statusCode?: number; body?: string; headers: Record<string, string> } = { headers: {} };
    await artApiHandler({
      method: 'GET',
      url: '/api/art/catalog',
      headers: { host: 'www.summerlynadvisors.com', 'x-forwarded-proto': 'https' },
    }, {
      set statusCode(value: number) { sent.statusCode = value; },
      get statusCode() { return sent.statusCode ?? 0; },
      setHeader(name: string, value: string) { sent.headers[name] = value; },
      end(body?: string | Uint8Array) { sent.body = Buffer.from(body ?? '').toString('utf8'); },
    });
    expect(sent.statusCode).toBe(200);
    expect(JSON.parse(sent.body ?? '')).toEqual({ salesOpen: false, works: [] });
  });
});
