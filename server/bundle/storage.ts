import { BlobNotFoundError, get, head, put } from '@vercel/blob';
import { blobAuth, type BundleRuntimeConfig } from './config.js';
import type { FulfillmentStore } from './fulfillment.js';
import { EVENT_ID, SESSION_ID, sha256Hex } from './verify.js';

export interface BundleFileStore {
  read(): Promise<Uint8Array | null>;
}

function authOptions(config: BundleRuntimeConfig): { token?: string; storeId?: string } | null {
  return blobAuth(config);
}

export function createPrivateFileStore(config: BundleRuntimeConfig, expectedSha256: string): BundleFileStore {
  return {
    async read() {
      const auth = authOptions(config);
      if (!auth || !config.blobPathname) return null;
      try {
        const result = await get(config.blobPathname, { access: 'private', useCache: false, ...auth });
        if (!result || result.statusCode !== 200 || !result.stream) return null;
        const bytes = new Uint8Array(await new Response(result.stream).arrayBuffer());
        if (sha256Hex(bytes) !== expectedSha256) return null;
        return bytes;
      } catch {
        return null;
      }
    },
  };
}

async function exists(pathname: string, auth: { token?: string; storeId?: string }): Promise<boolean> {
  try {
    await head(pathname, auth);
    return true;
  } catch (error) {
    if (error instanceof BlobNotFoundError) return false;
    throw error;
  }
}

/**
 * Durable grant log in the private blob store. Absent credentials fail closed
 * (the store is null and checkout cannot open). Event ids are written once.
 */
export function createBlobFulfillmentStore(config: BundleRuntimeConfig): FulfillmentStore | null {
  const auth = authOptions(config);
  if (!auth) return null;
  return {
    async record(claim) {
      if (!EVENT_ID.test(claim.eventId)) throw new Error('invalid_event');
      if (claim.sessionId && !SESSION_ID.test(claim.sessionId)) throw new Error('invalid_session');
      const eventPath = `private/bundle-fulfillment/events/${claim.eventId}.json`;
      if (await exists(eventPath, auth)) return { duplicate: true };
      const body = JSON.stringify({ eventId: claim.eventId, sessionId: claim.sessionId, grant: claim.grant });
      try {
        await put(eventPath, body, {
          access: 'private',
          addRandomSuffix: false,
          allowOverwrite: false,
          contentType: 'application/json',
          ...auth,
        });
      } catch {
        if (await exists(eventPath, auth)) return { duplicate: true };
        throw new Error('fulfillment_write_failed');
      }
      if (claim.grant && claim.sessionId) {
        const sessionPath = `private/bundle-fulfillment/sessions/${claim.sessionId}.json`;
        if (!(await exists(sessionPath, auth))) {
          await put(sessionPath, body, {
            access: 'private',
            addRandomSuffix: false,
            allowOverwrite: false,
            contentType: 'application/json',
            ...auth,
          });
        }
      }
      return { duplicate: false };
    },
    async hasSession(sessionId) {
      if (!SESSION_ID.test(sessionId)) return false;
      return exists(`private/bundle-fulfillment/sessions/${sessionId}.json`, auth);
    },
  };
}

export async function verifiedBytes(store: BundleFileStore, expectedSha256: string): Promise<Uint8Array | null> {
  const bytes = await store.read();
  if (!bytes || sha256Hex(bytes) !== expectedSha256) return null;
  return bytes;
}
