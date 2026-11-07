import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { DOWNLOAD_TOKEN_TTL_MS } from './product.js';

const SESSION_ID = /^cs_(test|live)_[A-Za-z0-9]+$/;

export function issueDownloadToken(secret: string, sessionId: string, now: number): { token: string; expiresAt: number } {
  if (!SESSION_ID.test(sessionId)) throw new Error('invalid_session');
  const expiresAt = now + DOWNLOAD_TOKEN_TTL_MS;
  const nonce = randomBytes(16).toString('base64url');
  const payload = `v1.${sessionId}.${expiresAt}.${nonce}`;
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  return { token: `${payload}.${signature}`, expiresAt };
}

export function readDownloadToken(secret: string, token: string, now: number): { sessionId: string } | null {
  const parts = token.split('.');
  if (parts.length !== 5) return null;
  const [version, sessionId, expiresText, nonce, signature] = parts;
  if (version !== 'v1' || !SESSION_ID.test(sessionId)) return null;
  if (!/^[A-Za-z0-9_-]{16,}$/.test(nonce)) return null;
  if (!/^\d+$/.test(expiresText) || !/^[A-Za-z0-9_-]+$/.test(signature)) return null;
  const expiresAt = Number(expiresText);
  if (!Number.isSafeInteger(expiresAt) || expiresAt < now || expiresAt > now + DOWNLOAD_TOKEN_TTL_MS + 30_000) return null;
  const payload = `${version}.${sessionId}.${expiresText}.${nonce}`;
  const expected = createHmac('sha256', secret).update(payload).digest('base64url');
  const actualBytes = Buffer.from(signature);
  const expectedBytes = Buffer.from(expected);
  if (actualBytes.length !== expectedBytes.length || !timingSafeEqual(actualBytes, expectedBytes)) return null;
  return { sessionId };
}

export function bearerToken(request: Request): string | null {
  const header = request.headers.get('authorization');
  if (!header) return null;
  const match = /^Bearer\s+([A-Za-z0-9._-]+)$/.exec(header.trim());
  return match?.[1] ?? null;
}
