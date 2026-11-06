import type { ArtCatalogResponse, PublicArtImage, PublicArtWork, PublicPrintSize } from '../data/artCatalog';
import { isStripeHostedCheckoutUrl } from './stripeCheckoutUrl';

function isImage(value: unknown): value is PublicArtImage {
  if (!value || typeof value !== 'object') return false;
  const image = value as Record<string, unknown>;
  return typeof image.src === 'string' && image.src.startsWith('/') && !image.src.startsWith('//') && !image.src.includes('..')
    && typeof image.alt === 'string';
}

function isSize(value: unknown): value is PublicPrintSize {
  if (!value || typeof value !== 'object') return false;
  const size = value as Record<string, unknown>;
  const priceOk = size.unitAmountCents === undefined || (typeof size.unitAmountCents === 'number' && Number.isInteger(size.unitAmountCents));
  const currencyOk = size.currency === undefined || size.currency === 'usd';
  return typeof size.id === 'string'
    && (size.label === undefined || typeof size.label === 'string')
    && (size.widthInches === undefined || typeof size.widthInches === 'number')
    && (size.heightInches === undefined || typeof size.heightInches === 'number')
    && typeof size.purchasable === 'boolean'
    && priceOk
    && currencyOk;
}

function isWork(value: unknown): value is PublicArtWork {
  if (!value || typeof value !== 'object') return false;
  const work = value as Record<string, unknown>;
  return typeof work.id === 'string'
    && typeof work.title === 'string'
    && typeof work.artist === 'string'
    && typeof work.description === 'string'
    && work.medium === 'watercolor-illustration'
    && work.format === 'physical-print'
    && (work.image === null || isImage(work.image))
    && (work.reproductionTerms === null || typeof work.reproductionTerms === 'string')
    && Array.isArray(work.sizes)
    && work.sizes.every(isSize);
}

export function isArtCatalogResponse(value: unknown): value is ArtCatalogResponse {
  if (!value || typeof value !== 'object') return false;
  const body = value as Record<string, unknown>;
  return typeof body.salesOpen === 'boolean' && Array.isArray(body.works) && body.works.every(isWork);
}

export async function fetchArtCatalog(signal: AbortSignal): Promise<ArtCatalogResponse> {
  const response = await fetch('/api/art/catalog', { signal, headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error('catalog_unavailable');
  const body: unknown = await response.json();
  if (!isArtCatalogResponse(body)) throw new Error('catalog_invalid');
  return body;
}

export async function startArtCheckout(input: { workId: string; sizeId: string; quantity: number }): Promise<{ ok: true } | { ok: false }> {
  const response = await fetch('/api/art/checkout', {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({ workId: input.workId, sizeId: input.sizeId, quantity: input.quantity }),
  });
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok || !body || typeof body !== 'object' || !('url' in body)) return { ok: false };
  const url = (body as { url: unknown }).url;
  if (typeof url !== 'string' || !isStripeHostedCheckoutUrl(url)) return { ok: false };
  window.location.assign(url);
  return { ok: true };
}
