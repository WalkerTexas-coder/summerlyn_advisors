export interface BundleRuntimeConfig {
  secretKey: string | null;
  webhookSecret: string | null;
  downloadSecret: string | null;
  siteOrigin: string | null;
  blobPathname: string | null;
  blobToken: string | null;
  blobStoreId: string | null;
}

function blankToNull(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function isLiveStripeKey(key: string): boolean {
  return key.startsWith('sk_live_') || key.startsWith('rk_live_');
}

export function isStripeSecretShape(key: string): boolean {
  return /^(sk|rk)_(test|live)_/.test(key);
}

/** A private blob pathname. Rejects URLs and path traversal. */
export function privateBlobPath(value: string | null): string | null {
  if (!value) return null;
  if (value.startsWith('/') || value.includes('..') || value.includes('\\') || value.includes('://') || value.includes('\0')) {
    return null;
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9._/-]{0,240}$/.test(value)) return null;
  return value;
}

export function readBundleConfig(env: NodeJS.ProcessEnv = process.env): BundleRuntimeConfig {
  const downloadSecret = blankToNull(env.BUNDLE_DOWNLOAD_SECRET);
  return {
    secretKey: blankToNull(env.STRIPE_SECRET_KEY),
    webhookSecret: blankToNull(env.STRIPE_BUNDLE_WEBHOOK_SECRET),
    downloadSecret: downloadSecret && downloadSecret.length >= 32 ? downloadSecret : null,
    siteOrigin: blankToNull(env.BUNDLE_SITE_ORIGIN),
    blobPathname: privateBlobPath(blankToNull(env.BUNDLE_BLOB_PATHNAME)),
    blobToken: blankToNull(env.BLOB_READ_WRITE_TOKEN),
    blobStoreId: blankToNull(env.BLOB_STORE_ID),
  };
}

export function blobAuth(config: BundleRuntimeConfig): { token?: string; storeId?: string } | null {
  if (!config.blobToken && !config.blobStoreId) return null;
  return {
    ...(config.blobToken ? { token: config.blobToken } : {}),
    ...(config.blobStoreId ? { storeId: config.blobStoreId } : {}),
  };
}
