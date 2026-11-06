import type { ArtCatalogResponse, PublicArtWork, PublicPrintSize } from '../../src/data/artCatalog';
import type { ArtCommerceConfig, ArtPrintSize, ArtWork } from './catalog';
import type { ArtRuntimeConfig } from './config';
import { isLiveStripeKey } from './config';

export const ART_BLOCKERS = [
  'checkout_not_enabled',
  'live_charges_disabled',
  'missing_stripe_secret',
  'invalid_stripe_secret',
  'missing_webhook_secret',
  'idempotency_unconfigured',
  'fulfillment_terms_missing',
  'shipping_countries_missing',
  'shipping_rates_missing',
  'origin_not_allowed',
  'work_not_found',
  'work_not_approved',
  'unsupported_format',
  'size_not_found',
  'invalid_size',
  'missing_price_id',
  'invalid_price_amount',
  'currency_not_usd',
] as const;

export type ArtBlocker = (typeof ART_BLOCKERS)[number];

export interface ReadinessInput {
  catalog: readonly ArtWork[];
  commerce: ArtCommerceConfig;
  config: ArtRuntimeConfig;
  idempotencyConfigured: boolean;
  origin: string | null;
}

export function isSafeArtImageSrc(src: string): boolean {
  return src.startsWith('/') && !src.startsWith('//') && !src.includes('..') && !src.includes('\\') && !src.includes('://');
}

export function globalSalesBlockers(input: ReadinessInput): ArtBlocker[] {
  const blockers: ArtBlocker[] = [];
  const { config, commerce } = input;
  if (!config.checkoutEnabled) blockers.push('checkout_not_enabled');
  if (!config.secretKey) blockers.push('missing_stripe_secret');
  else if (!/^(sk|rk)_(test|live)_/.test(config.secretKey)) blockers.push('invalid_stripe_secret');
  else if (isLiveStripeKey(config.secretKey) && !config.allowLiveCharges) blockers.push('live_charges_disabled');
  if (!config.webhookSecret?.startsWith('whsec_')) blockers.push('missing_webhook_secret');
  if (!input.idempotencyConfigured) blockers.push('idempotency_unconfigured');
  if (!commerce.fulfillmentTerms?.trim()) blockers.push('fulfillment_terms_missing');
  if (commerce.shippingCountries.length === 0 || commerce.shippingCountries.some((country) => !/^[A-Z]{2}$/.test(country))) {
    blockers.push('shipping_countries_missing');
  }
  if (commerce.stripeShippingRateIds.length === 0 || commerce.stripeShippingRateIds.some((id) => !/^shr_[A-Za-z0-9]+$/.test(id))) {
    blockers.push('shipping_rates_missing');
  }
  if (!input.origin) blockers.push('origin_not_allowed');
  return blockers;
}

function sizeBlockers(size: ArtPrintSize): ArtBlocker[] {
  const blockers: ArtBlocker[] = [];
  if (!size.label.trim() || !Number.isFinite(size.widthInches) || size.widthInches <= 0 || !Number.isFinite(size.heightInches) || size.heightInches <= 0) {
    blockers.push('invalid_size');
  }
  if (!/^price_[A-Za-z0-9]+$/.test(size.stripePriceId)) blockers.push('missing_price_id');
  if (!Number.isInteger(size.unitAmountCents) || size.unitAmountCents <= 0 || size.unitAmountCents > 100_000_000) {
    blockers.push('invalid_price_amount');
  }
  if (size.currency !== 'usd') blockers.push('currency_not_usd');
  return blockers;
}

export function checkoutBlockers(input: ReadinessInput & { workId: string; sizeId: string }): ArtBlocker[] {
  const blockers = globalSalesBlockers(input);
  const work = input.catalog.find((item) => item.id === input.workId);
  if (!work) return [...blockers, 'work_not_found'];
  if (work.format !== 'physical-print') blockers.push('unsupported_format');
  if (!work.approvedForSale || !work.title.trim() || !work.description.trim() || !work.artist.trim()) {
    blockers.push('work_not_approved');
  }
  const size = work.sizes.find((item) => item.id === input.sizeId);
  if (!size) return [...blockers, 'size_not_found'];
  return [...blockers, ...sizeBlockers(size)];
}

function publicSize(work: ArtWork, size: ArtPrintSize, input: ReadinessInput): PublicPrintSize {
  const purchasable = checkoutBlockers({ ...input, workId: work.id, sizeId: size.id }).length === 0;
  const pub: PublicPrintSize = {
    id: size.id,
    label: size.label,
    widthInches: size.widthInches,
    heightInches: size.heightInches,
    purchasable,
  };
  if (purchasable) {
    pub.unitAmountCents = size.unitAmountCents;
    pub.currency = size.currency;
  }
  return pub;
}

export function toPublicCatalog(input: ReadinessInput): ArtCatalogResponse {
  const works: PublicArtWork[] = [];
  for (const work of input.catalog) {
    if (!work.approvedForSale || !work.title.trim() || work.format !== 'physical-print') continue;
    const image = work.image && isSafeArtImageSrc(work.image.src) && work.image.alt.trim()
      ? { src: work.image.src, alt: work.image.alt }
      : null;
    works.push({
      id: work.id,
      title: work.title,
      artist: work.artist,
      description: work.description,
      medium: work.medium,
      format: work.format,
      image,
      reproductionTerms: work.reproductionTerms?.trim() ? work.reproductionTerms.trim() : null,
      sizes: work.sizes.map((size) => publicSize(work, size, input)),
    });
  }
  return {
    salesOpen: works.some((work) => work.sizes.some((size) => size.purchasable)),
    works,
  };
}
