import { EXPECTED_STRIPE_ACCOUNT_ID } from './catalog.js';

/**
 * Live charges stay off until a reviewed launch changes this constant.
 * An environment variable cannot turn it on.
 */
export const ALLOW_LIVE_CHARGES = false;

export interface ArtRuntimeConfig {
  expectedStripeAccountId: string;
  secretKey: string | null;
  webhookSecret: string | null;
  checkoutEnabled: boolean;
  allowLiveCharges: boolean;
  siteOrigin: string | null;
}

function blankToNull(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function isLiveStripeKey(key: string): boolean {
  return key.startsWith('sk_live_') || key.startsWith('rk_live_');
}

export function readArtConfig(env: NodeJS.ProcessEnv = process.env): ArtRuntimeConfig {
  return {
    expectedStripeAccountId: EXPECTED_STRIPE_ACCOUNT_ID,
    secretKey: blankToNull(env.STRIPE_SECRET_KEY),
    webhookSecret: blankToNull(env.STRIPE_WEBHOOK_SECRET),
    checkoutEnabled: env.ART_CHECKOUT_ENABLED === 'true',
    allowLiveCharges: ALLOW_LIVE_CHARGES,
    siteOrigin: blankToNull(env.ART_SITE_ORIGIN),
  };
}
