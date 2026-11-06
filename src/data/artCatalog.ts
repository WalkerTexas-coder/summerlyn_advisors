/**
 * Public shape of the Summerlyn Art catalog.
 * Stripe Price ids and fulfillment settings stay in `server/art/catalog.ts`.
 */

export interface PublicArtImage {
  src: string;
  alt: string;
}

export interface PublicPrintSize {
  id: string;
  label?: string;
  widthInches?: number;
  heightInches?: number;
  purchasable: boolean;
  unitAmountCents?: number;
  currency?: 'usd';
}

export interface PublicArtWork {
  id: string;
  title: string;
  artist: string;
  description: string;
  medium: 'watercolor-illustration';
  format: 'physical-print';
  image: PublicArtImage | null;
  reproductionTerms: string | null;
  sizes: PublicPrintSize[];
}

export interface ArtCatalogResponse {
  salesOpen: boolean;
  works: PublicArtWork[];
}

export const SHOP_PRINT = {
  title: 'Summerlyn Art Print',
  unitAmountCents: 2500,
  currency: 'usd' as const,
};
