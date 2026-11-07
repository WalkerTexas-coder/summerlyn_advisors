import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Stripe from 'stripe';
import { describe, expect, it } from 'vitest';
import { handleBundleAccess, handleBundleFile } from './access.js';
import { checkoutGateBlockers, checkoutSessionParams, handleBundleCheckout } from './checkout.js';
import { handleBundleIntake } from './intake.js';
import { memoryIntakeStore } from './intakeStore.js';
import { readBundleConfig } from './config.js';
import { createBundleDeps, type BundleDeps, type BundleStripe } from './deps.js';
import { memoryFulfillmentStore } from './fulfillment.js';
import { handleBundleRequest } from './http.js';
import { bundleApiHandler } from './nodeHandler.js';
import { BUNDLE_SHA256, BUNDLE_SKU, CHECKOUT_RELEASED, CONSULTING_AMOUNT_CENTS, CONSULTING_PRICE_ID, CONSULTING_PRODUCT_ID, CONSULTING_TAX_CODE, DOCUMENTS_AMOUNT_CENTS, DOCUMENTS_PRICE_ID, DOCUMENTS_PRODUCT_ID, DOCUMENTS_TAX_CODE, FILES_ONLY_PRICE_ID, OFFER_SCOPE_MATCHES_PRICE, bundleProduct } from './product.js';
import { TAILORED_PLAN_TEMPLATE } from './tailoredPlanTemplate.js';
import { issueDownloadToken } from './token.js';
import { sha256Hex, type CheckoutPrice, type CheckoutProduct, type PaidSession } from './verify.js';
import { handleBundleWebhook } from './webhook.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const LIVE_SECRET = ['rk', 'live', 'placeholder'].join('_');
const TEST_SECRET = ['rk', 'test', 'placeholder'].join('_');
const WEBHOOK_SECRET = ['whsec', 'bundletest'].join('_');
const DOWNLOAD_SECRET = 'bundle-download-secret-placeholder-32';
const FILE_BYTES = new TextEncoder().encode('fixture delivery bytes, not the paid zip');

const readyConfig = {
  ...readBundleConfig({}),
  secretKey: LIVE_SECRET,
  webhookSecret: WEBHOOK_SECRET,
  downloadSecret: DOWNLOAD_SECRET,
  siteOrigin: null,
  blobPathname: 'private/products/bundle.zip',
  blobToken: 'blob-token-placeholder',
  blobStoreId: null,
};

function line(priceId: string, amount: number, productId: string) {
  return { quantity: 1, price: { id: priceId, unit_amount: amount, currency: 'usd', product: productId } };
}

function paidSession(overrides: Partial<PaidSession> = {}): PaidSession {
  return {
    id: 'cs_live_paidbundle123',
    object: 'checkout.session',
    payment_status: 'paid',
    mode: 'payment',
    currency: 'usd',
    amount_subtotal: 75_000,
    livemode: true,
    metadata: { bundle_sku: BUNDLE_SKU },
    line_items: {
      data: [
        line(DOCUMENTS_PRICE_ID, DOCUMENTS_AMOUNT_CENTS, DOCUMENTS_PRODUCT_ID),
        line(CONSULTING_PRICE_ID, CONSULTING_AMOUNT_CENTS, CONSULTING_PRODUCT_ID),
      ],
    },
    ...overrides,
  };
}

function componentPrice(id: string, amount: number, productId: string, overrides: Partial<CheckoutPrice> = {}): CheckoutPrice {
  return {
    id,
    unit_amount: amount,
    currency: 'usd',
    type: 'one_time',
    active: true,
    tax_behavior: 'exclusive',
    livemode: true,
    product: productId,
    ...overrides,
  };
}

function fakeStripe(options?: {
  accountId?: string;
  session?: PaidSession;
  prices?: Record<string, CheckoutPrice>;
  products?: Record<string, CheckoutProduct>;
  checkoutUrl?: string | null;
  failRetrieve?: boolean;
}) {
  const created: Stripe.Checkout.SessionCreateParams[] = [];
  const defaultPrices: Record<string, CheckoutPrice> = {
    [DOCUMENTS_PRICE_ID]: componentPrice(DOCUMENTS_PRICE_ID, DOCUMENTS_AMOUNT_CENTS, DOCUMENTS_PRODUCT_ID),
    [CONSULTING_PRICE_ID]: componentPrice(CONSULTING_PRICE_ID, CONSULTING_AMOUNT_CENTS, CONSULTING_PRODUCT_ID),
    [FILES_ONLY_PRICE_ID]: componentPrice(FILES_ONLY_PRICE_ID, 75_000, DOCUMENTS_PRODUCT_ID),
  };
  const defaultProducts: Record<string, CheckoutProduct> = {
    [DOCUMENTS_PRODUCT_ID]: { id: DOCUMENTS_PRODUCT_ID, tax_code: DOCUMENTS_TAX_CODE, shippable: false },
    [CONSULTING_PRODUCT_ID]: { id: CONSULTING_PRODUCT_ID, tax_code: CONSULTING_TAX_CODE, shippable: false },
  };
  const client: BundleStripe = {
    accounts: { retrieve: async () => ({ id: options?.accountId ?? bundleProduct.accountId }) },
    prices: {
      retrieve: async (id: string) => options?.prices?.[id] ?? defaultPrices[id] ?? componentPrice(id, 1, 'prod_other'),
    },
    products: {
      retrieve: async (id: string) => options?.products?.[id] ?? defaultProducts[id] ?? { id, tax_code: 'txcd_00000000', shippable: true },
    },
    checkout: {
      sessions: {
        create: async (params) => {
          created.push(params);
          return { id: 'cs_live_new', url: options && 'checkoutUrl' in options ? options.checkoutUrl ?? null : 'https://checkout.stripe.com/c/pay/cs_live_new' };
        },
        retrieve: async () => {
          if (options?.failRetrieve) throw new Error('missing');
          return options?.session ?? paidSession();
        },
      },
    },
  };
  return { client, created };
}

function openDeps(overrides: Partial<BundleDeps> = {}, stripe = fakeStripe()) {
  const store = memoryFulfillmentStore();
  const deps: BundleDeps = {
    product: { ...bundleProduct, sha256: sha256Hex(FILE_BYTES) },
    checkoutReleased: true,
    offerScopeMatchesPrice: true,
    config: readyConfig,
    fulfillment: store,
    fileStore: { read: async () => FILE_BYTES },
    intake: null,
    stripeFactory: () => stripe.client,
    verifyWebhook: (payload, header, secret) => Stripe.webhooks.constructEvent(payload, header, secret),
    now: () => 1_700_000_000_000,
    ...overrides,
  };
  return { deps, stripe, store };
}

function checkoutRequest(body: unknown = {}, url = 'http://localhost:5173/api/bundle/checkout') {
  return new Request(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

function accessRequest(body: unknown) {
  return new Request('http://localhost:5173/api/bundle/access', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function bundleEvent(type: string, sessionId: string, id: string) {
  return {
    id,
    object: 'event',
    type,
    data: { object: { id: sessionId, object: 'checkout.session' } },
  };
}

function signedWebhook(event: unknown, secret = WEBHOOK_SECRET) {
  const payload = JSON.stringify(event);
  const header = Stripe.webhooks.generateTestHeaderString({ payload, secret });
  return new Request('http://localhost:5173/api/bundle/webhook', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'stripe-signature': header },
    body: payload,
  });
}

describe('bundle checkout stays closed', () => {
  it('does not release checkout in this revision', () => {
    expect(CHECKOUT_RELEASED).toBe(false);
    expect(OFFER_SCOPE_MATCHES_PRICE).toBe(false);
    expect(bundleProduct.sha256).toBe(BUNDLE_SHA256);
    expect(bundleProduct.totalCents).toBe(75_000);
    expect(bundleProduct.documents.priceId).toBe(DOCUMENTS_PRICE_ID);
    expect(bundleProduct.documents.unitAmountCents).toBe(25_000);
    expect(bundleProduct.consulting.priceId).toBe(CONSULTING_PRICE_ID);
    expect(bundleProduct.consulting.unitAmountCents).toBe(50_000);
    expect(bundleProduct.filesOnlyPriceId).not.toBe(DOCUMENTS_PRICE_ID);
    expect(bundleProduct.filesOnlyPriceId).not.toBe(CONSULTING_PRICE_ID);
  });

  it('refuses to charge when storage, secrets, and the release flag are absent', async () => {
    let called = false;
    const deps = createBundleDeps({});
    deps.stripeFactory = () => {
      called = true;
      throw new Error('stripe should not be called');
    };
    const response = await handleBundleCheckout(checkoutRequest({}), deps);
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: 'checkout_unavailable' });
    expect(called).toBe(false);
    const blockers = checkoutGateBlockers({
      checkoutReleased: deps.checkoutReleased,
      offerScopeMatchesPrice: deps.offerScopeMatchesPrice,
      config: deps.config,
      fulfillment: deps.fulfillment,
      origin: 'http://localhost:5173',
    });
    expect(blockers).toContain('checkout_not_released');
    expect(blockers).toContain('offer_scope_unconfirmed');
  });

  it('does not charge the files-only price while the sold scope is unconfirmed', async () => {
    const stripe = fakeStripe();
    const { deps } = openDeps({ offerScopeMatchesPrice: false }, stripe);
    const response = await handleBundleCheckout(checkoutRequest({}), deps);
    expect(response.status).toBe(503);
    expect(stripe.created).toHaveLength(0);
  });

  it('does not call Stripe or read the file while the release flag is off', async () => {
    let reads = 0;
    const stripe = fakeStripe();
    const { deps } = openDeps({
      checkoutReleased: false,
      fileStore: { read: async () => { reads += 1; return FILE_BYTES; } },
    }, stripe);
    const response = await handleBundleCheckout(checkoutRequest({}), deps);
    expect(response.status).toBe(503);
    expect(reads).toBe(0);
    expect(stripe.created).toHaveLength(0);
  });

  it('does not create a session when the private file is missing', async () => {
    const stripe = fakeStripe();
    const { deps } = openDeps({ fileStore: { read: async () => null } }, stripe);
    const response = await handleBundleCheckout(checkoutRequest({}), deps);
    expect(response.status).toBe(503);
    expect(stripe.created).toHaveLength(0);
  });

  it('does not create a session when the file hash does not match', async () => {
    const stripe = fakeStripe();
    const { deps } = openDeps({ fileStore: { read: async () => new TextEncoder().encode('wrong') } }, stripe);
    expect((await handleBundleCheckout(checkoutRequest({}), deps)).status).toBe(503);
    expect(stripe.created).toHaveLength(0);
  });

  it('rejects a test key for the live price', async () => {
    const stripe = fakeStripe();
    const { deps } = openDeps({ config: { ...readyConfig, secretKey: TEST_SECRET } }, stripe);
    expect((await handleBundleCheckout(checkoutRequest({}), deps)).status).toBe(503);
    expect(stripe.created).toHaveLength(0);
  });

  it('rejects a client-supplied price or redirect before creating a session', async () => {
    const stripe = fakeStripe();
    const { deps } = openDeps({}, stripe);
    const response = await handleBundleCheckout(checkoutRequest({ price: 100, successUrl: 'https://evil.example/phish' }), deps);
    expect(response.status).toBe(400);
    expect(stripe.created).toHaveLength(0);
  });

  it('creates a hosted session only for the exact live price when every gate passes', async () => {
    const stripe = fakeStripe();
    const { deps } = openDeps({}, stripe);
    const response = await handleBundleCheckout(checkoutRequest({}), deps);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ url: 'https://checkout.stripe.com/c/pay/cs_live_new' });
    const params = stripe.created[0];
    expect(params.mode).toBe('payment');
    expect(params.line_items).toEqual([
      { price: DOCUMENTS_PRICE_ID, quantity: 1 },
      { price: CONSULTING_PRICE_ID, quantity: 1 },
    ]);
    expect(JSON.stringify(params.line_items)).not.toContain(FILES_ONLY_PRICE_ID);
    expect(params.automatic_tax).toEqual({ enabled: true });
    expect(params.billing_address_collection).toBe('required');
    expect(params.success_url).toBe('http://localhost:5173/bundle/thank-you?session_id={CHECKOUT_SESSION_ID}');
    expect(params.cancel_url).toBe('http://localhost:5173/bundle');
    expect(params.metadata).toMatchObject({ bundle_sku: BUNDLE_SKU });
    expect(params.integration_identifier).toMatch(/^summerlynbundle_[a-z]{8}$/);
    expect(params).not.toHaveProperty('payment_method_types');
    expect(params).not.toHaveProperty('price_data');
  });

  it('does not follow a non-Stripe checkout URL', async () => {
    const stripe = fakeStripe({ checkoutUrl: 'https://evil.example/steal' });
    const { deps } = openDeps({}, stripe);
    const response = await handleBundleCheckout(checkoutRequest({}), deps);
    expect(response.status).toBe(503);
    expect(JSON.stringify(await response.json())).not.toContain('evil.example');
  });

  it('refuses a mismatched amount, tax code, old price, or account', async () => {
    const wrongAmount = fakeStripe({
      prices: { [CONSULTING_PRICE_ID]: componentPrice(CONSULTING_PRICE_ID, 1, CONSULTING_PRODUCT_ID) },
    });
    expect((await handleBundleCheckout(checkoutRequest({}), openDeps({}, wrongAmount).deps)).status).toBe(503);
    expect(wrongAmount.created).toHaveLength(0);
    const wrongTax = fakeStripe({
      products: { [CONSULTING_PRODUCT_ID]: { id: CONSULTING_PRODUCT_ID, tax_code: DOCUMENTS_TAX_CODE, shippable: false } },
    });
    expect((await handleBundleCheckout(checkoutRequest({}), openDeps({}, wrongTax).deps)).status).toBe(503);
    const wrongAccount = fakeStripe({ accountId: 'acct_other' });
    expect((await handleBundleCheckout(checkoutRequest({}), openDeps({}, wrongAccount).deps)).status).toBe(503);
    expect(wrongAccount.created).toHaveLength(0);
  });

  it('builds session params without a client-controlled return URL', () => {
    const params = checkoutSessionParams({ origin: 'https://summerlynadvisors.com', product: bundleProduct });
    expect(params.success_url).toBe('https://summerlynadvisors.com/bundle/thank-you?session_id={CHECKOUT_SESSION_ID}');
    expect(params.line_items).toEqual([
      { price: DOCUMENTS_PRICE_ID, quantity: 1 },
      { price: CONSULTING_PRICE_ID, quantity: 1 },
    ]);
  });
});

describe('bundle download authorization', () => {
  it('returns 401 when the session id is missing or not a credential', async () => {
    const { deps, store } = openDeps();
    await store.record({ eventId: 'evt_grant1', sessionId: 'cs_live_paidbundle123', grant: true });
    expect((await handleBundleAccess(accessRequest({}), deps)).status).toBe(401);
    expect((await handleBundleAccess(accessRequest({ sessionId: '' }), deps)).status).toBe(401);
    expect((await handleBundleAccess(accessRequest({ sessionId: 'not-a-session' }), deps)).status).toBe(401);
    const file = await handleBundleFile(new Request('http://localhost:5173/api/bundle/file'), deps);
    expect(file.status).toBe(401);
    const queryToken = issueDownloadToken(DOWNLOAD_SECRET, 'cs_live_paidbundle123', deps.now());
    const leaked = await handleBundleFile(new Request(`http://localhost:5173/api/bundle/file?token=${queryToken.token}`), deps);
    expect(leaked.status).toBe(401);
    expect(leaked.headers.get('location')).toBeNull();
  });

  it('returns 403 for fabricated, unpaid, and unrelated paid sessions', async () => {
    const denied = [
      fakeStripe({ failRetrieve: true }),
      fakeStripe({ session: paidSession({ payment_status: 'unpaid' }) }),
      fakeStripe({ session: paidSession({ payment_status: 'no_payment_required' }) }),
      fakeStripe({ session: paidSession({ livemode: false, id: 'cs_test_notlive123456' }) }),
      fakeStripe({ session: paidSession({ amount_subtotal: 2500, currency: 'usd' }) }),
      fakeStripe({ session: paidSession({ currency: 'eur' }) }),
      fakeStripe({ session: paidSession({ metadata: { bundle_sku: 'art-print' } }) }),
      fakeStripe({
        session: paidSession({
          amount_subtotal: 75_000,
          line_items: { data: [line(FILES_ONLY_PRICE_ID, 75_000, DOCUMENTS_PRODUCT_ID)] },
        }),
      }),
      fakeStripe({
        session: paidSession({
          amount_subtotal: 25_000,
          line_items: { data: [line(DOCUMENTS_PRICE_ID, DOCUMENTS_AMOUNT_CENTS, DOCUMENTS_PRODUCT_ID)] },
        }),
      }),
      fakeStripe({ accountId: 'acct_other' }),
    ];
    for (const stripe of denied) {
      const { deps, store } = openDeps({}, stripe);
      await store.record({ eventId: 'evt_should_not_matter', sessionId: 'cs_live_paidbundle123', grant: true });
      const response = await handleBundleAccess(accessRequest({ sessionId: 'cs_live_paidbundle123' }), deps);
      expect(response.status).toBe(403);
    }
  });

  it('returns 403 until the signed webhook has granted the session', async () => {
    const { deps } = openDeps();
    const response = await handleBundleAccess(accessRequest({ sessionId: 'cs_live_paidbundle123' }), deps);
    expect(response.status).toBe(403);
  });

  it('does not issue a token when the private file is missing', async () => {
    const { deps, store } = openDeps({ fileStore: { read: async () => null } });
    await store.record({ eventId: 'evt_grant2', sessionId: 'cs_live_paidbundle123', grant: true });
    const response = await handleBundleAccess(accessRequest({ sessionId: 'cs_live_paidbundle123' }), deps);
    expect(response.status).toBe(503);
    const payload = await response.json() as Record<string, unknown>;
    expect(payload.token).toBeUndefined();
  });

  it('issues a short-lived token and serves only the verified bytes', async () => {
    const { deps, store } = openDeps();
    await store.record({ eventId: 'evt_grant3', sessionId: 'cs_live_paidbundle123', grant: true });
    const access = await handleBundleAccess(accessRequest({ sessionId: 'cs_live_paidbundle123' }), deps);
    expect(access.status).toBe(200);
    const body = await access.json() as { token: string; expiresAt: number; url?: string };
    expect(body.url).toBeUndefined();
    expect(body.expiresAt).toBe(deps.now() + 10 * 60 * 1000);
    const file = await handleBundleFile(new Request('http://localhost:5173/api/bundle/file', {
      headers: { authorization: `Bearer ${body.token}` },
    }), deps);
    expect(file.status).toBe(200);
    expect(file.headers.get('location')).toBeNull();
    expect(file.headers.get('content-type')).toBe('application/zip');
    expect(file.headers.get('cache-control')).toContain('no-store');
    const bytes = new Uint8Array(await file.arrayBuffer());
    expect(sha256Hex(bytes)).toBe(sha256Hex(FILE_BYTES));
    const expired = issueDownloadToken(DOWNLOAD_SECRET, 'cs_live_paidbundle123', deps.now() - 11 * 60 * 1000);
    const stale = await handleBundleFile(new Request('http://localhost:5173/api/bundle/file', {
      headers: { authorization: `Bearer ${expired.token}` },
    }), { ...deps, now: () => deps.now() });
    expect(stale.status).toBe(403);
    const tampered = `${body.token.slice(0, -4)}aaaa`;
    const forged = await handleBundleFile(new Request('http://localhost:5173/api/bundle/file', {
      headers: { authorization: `Bearer ${tampered}` },
    }), deps);
    expect(forged.status).toBe(403);
  });
});

describe('bundle webhook fulfillment', () => {
  it('rejects a missing or bad signature', async () => {
    const { deps } = openDeps();
    const response = await handleBundleWebhook(new Request('http://localhost:5173/api/bundle/webhook', { method: 'POST', body: '{}' }), deps);
    expect(response.status).toBe(400);
  });

  it('stays closed when no fulfillment store is configured', async () => {
    const { deps } = openDeps({ fulfillment: null });
    const response = await handleBundleWebhook(signedWebhook(bundleEvent('checkout.session.completed', 'cs_live_paidbundle123', 'evt_nostore')), deps);
    expect(response.status).toBe(503);
  });

  it('grants once for a paid session and ignores unpaid, failed, and duplicate events', async () => {
    const { deps, store } = openDeps();
    const first = await handleBundleWebhook(signedWebhook(bundleEvent('checkout.session.completed', 'cs_live_paidbundle123', 'evt_paid1')), deps);
    expect(first.status).toBe(200);
    expect(await first.json()).toMatchObject({ received: true, duplicate: false, granted: true });
    const duplicate = await handleBundleWebhook(signedWebhook(bundleEvent('checkout.session.completed', 'cs_live_paidbundle123', 'evt_paid1')), deps);
    expect(await duplicate.json()).toMatchObject({ duplicate: true, granted: false });
    expect(store.events.size).toBe(1);
    expect(await store.hasSession('cs_live_paidbundle123')).toBe(true);

    const unpaid = openDeps({}, fakeStripe({ session: paidSession({ payment_status: 'unpaid' }) }));
    const held = await handleBundleWebhook(signedWebhook(bundleEvent('checkout.session.completed', 'cs_live_paidbundle123', 'evt_unpaid')), unpaid.deps);
    expect(await held.json()).toMatchObject({ granted: false });
    expect(await unpaid.store.hasSession('cs_live_paidbundle123')).toBe(false);

    const failed = await handleBundleWebhook(signedWebhook(bundleEvent('checkout.session.async_payment_failed', 'cs_live_paidbundle123', 'evt_failed')), deps);
    expect(await failed.json()).toMatchObject({ granted: false });
    const later = await handleBundleWebhook(signedWebhook(bundleEvent('checkout.session.async_payment_succeeded', 'cs_live_paidbundle123', 'evt_async')), deps);
    expect(await later.json()).toMatchObject({ granted: true, duplicate: false });
    expect(store.sessions.size).toBe(1);
  });
});

describe('assisted intake', () => {
  const validIntake = {
    goal: 'Shorten proposal drafting',
    workflow: 'A person reviews every outgoing note',
    tools: 'Existing mailbox and spreadsheet',
    constraints: 'No new vendors this quarter',
    preferredWindows: 'A weekend afternoon or a weekday evening',
    timeZone: 'Central Time',
    noSensitiveData: true,
  };

  function intakeRequest(token: string | null, body: unknown) {
    const headers: Record<string, string> = { 'content-type': 'application/json' };
    if (token) headers.authorization = `Bearer ${token}`;
    return new Request('http://localhost:5173/api/bundle/intake', { method: 'POST', headers, body: JSON.stringify(body) });
  }

  it('rejects anonymous, old-price, partial, and secret submissions', async () => {
    const { deps, store } = openDeps({ intake: memoryIntakeStore() });
    await store.record({ eventId: 'evt_intake', sessionId: 'cs_live_paidbundle123', grant: true });
    const token = issueDownloadToken(DOWNLOAD_SECRET, 'cs_live_paidbundle123', deps.now()).token;
    expect((await handleBundleIntake(intakeRequest(null, validIntake), deps)).status).toBe(401);
    expect((await handleBundleIntake(intakeRequest(token, { ...validIntake, noSensitiveData: false }), deps)).status).toBe(400);
    expect((await handleBundleIntake(intakeRequest(token, { ...validIntake, goal: 'sk_live_secretvalue' }), deps)).status).toBe(400);

    const oldPrice = fakeStripe({
      session: paidSession({
        line_items: { data: [line(FILES_ONLY_PRICE_ID, 75_000, DOCUMENTS_PRODUCT_ID)] },
      }),
    });
    const oldDeps = openDeps({ intake: memoryIntakeStore() }, oldPrice);
    await oldDeps.store.record({ eventId: 'evt_old', sessionId: 'cs_live_paidbundle123', grant: true });
    expect((await handleBundleIntake(intakeRequest(token, validIntake), oldDeps.deps)).status).toBe(403);
    const unstored = openDeps({ intake: null });
    await unstored.store.record({ eventId: 'evt_unstored', sessionId: 'cs_live_paidbundle123', grant: true });
    expect((await handleBundleIntake(intakeRequest(token, validIntake), unstored.deps)).status).toBe(503);
  });

  it('saves a request without confirming an appointment or sending a message', async () => {
    const intake = memoryIntakeStore();
    const { deps, store } = openDeps({ intake });
    await store.record({ eventId: 'evt_intake_ok', sessionId: 'cs_live_paidbundle123', grant: true });
    const token = issueDownloadToken(DOWNLOAD_SECRET, 'cs_live_paidbundle123', deps.now()).token;
    const response = await handleBundleIntake(intakeRequest(token, validIntake), deps);
    expect(response.status).toBe(200);
    const body = await response.json() as { bookingStatus: string; appointmentConfirmed: boolean; url?: string };
    expect(body.bookingStatus).toBe('requested');
    expect(body.appointmentConfirmed).toBe(false);
    expect(body.url).toBeUndefined();
    expect(intake.records.get('cs_live_paidbundle123')?.appointmentConfirmed).toBe(false);
    const duplicate = await handleBundleIntake(intakeRequest(token, validIntake), deps);
    expect(duplicate.status).toBe(409);
    expect(intake.records.size).toBe(1);
  });
});

describe('bundle public surface', () => {
  it('reports that the offer is not purchasable and hides the price id', async () => {
    const response = await handleBundleRequest(new Request('https://summerlynadvisors.com/api/bundle/status'));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ purchasable: false });
    const sent: { statusCode?: number; body?: string; headers: Record<string, string> } = { headers: {} };
    await bundleApiHandler({
      method: 'GET',
      url: '/api/bundle/status',
      headers: { host: 'www.summerlynadvisors.com', 'x-forwarded-proto': 'https' },
    }, {
      set statusCode(value: number) { sent.statusCode = value; },
      get statusCode() { return sent.statusCode ?? 0; },
      setHeader(name: string, value: string) { sent.headers[name] = value; },
      end(body?: string | Uint8Array) { sent.body = Buffer.from(body ?? '').toString('utf8'); },
    });
    expect(sent.statusCode).toBe(200);
    expect(sent.body).not.toContain(DOCUMENTS_PRICE_ID);
    expect(sent.body).not.toContain(CONSULTING_PRICE_ID);
    expect(sent.body).not.toContain(FILES_ONLY_PRICE_ID);
    expect(sent.body).not.toContain(BUNDLE_SHA256);
  });

  it('keeps the buyer page from starting checkout or naming past clients', () => {
    const files = [
      'src/pages/Bundle.tsx',
      'src/pages/BundleThankYou.tsx',
      'src/data/bundleOffer.ts',
      'src/pages/Terms.tsx',
    ].map((file) => readFileSync(path.join(repoRoot, file), 'utf8'));
    const combined = files.join('\n').toLowerCase();
    for (const name of ['vallige', 'hedfirst', 'teligant', 'choose health', 'choosehealth']) {
      expect(combined).not.toContain(name);
    }
    expect(files[0]).toContain('disabled');
    expect(files[0]).toContain('Checkout is not open');
    expect(files[0]).toContain('45-minute');
    expect(files[0]).not.toContain('60-minute');
    expect(files[0]).not.toContain('book a call');
    expect(files[0]).toContain('does not mean the consultation is tax-free');
    expect(files[0]).not.toContain('/api/bundle/checkout');
    expect(files[0]).not.toContain('For checkout publication');
    expect(combined).not.toContain('buy.stripe.com');
    expect(combined).not.toContain('instant download');
    expect(combined).not.toContain('two per month');
    expect(combined).not.toContain('one workflow');
    expect(files[1]).not.toContain('/api/bundle/file?');
    expect(files[1]).toContain('not a confirmed appointment');
    expect(files[2]).toContain('all sales are final except where the law requires otherwise');
    expect(files[0]).toContain('November 6, 2026');
    expect(files[3]).toContain('all sales are final except where the law requires otherwise');
    expect(TAILORED_PLAN_TEMPLATE).toContain('Approved by Austin');
    expect(TAILORED_PLAN_TEMPLATE).toContain('call was held');
  });

  it('does not keep the paid zip anywhere in the repository', () => {
    const hashes: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
          continue;
        }
        expect(entry.name.toLowerCase().endsWith('.zip')).toBe(false);
        expect(entry.name).not.toContain('Implementation-Bundle');
        const info = statSync(full);
        if (info.size > 0 && info.size < 5_000_000) {
          hashes.push(createHash('sha256').update(readFileSync(full)).digest('hex'));
        }
      }
    };
    walk(repoRoot);
    expect(hashes).not.toContain(BUNDLE_SHA256);
  });
});
