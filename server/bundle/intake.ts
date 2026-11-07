import type { BundleDeps } from './deps.js';
import type { IntakeRecord } from './intakeStore.js';
import { json } from './respond.js';
import { loadPaidSession } from './access.js';
import { bearerToken, readDownloadToken } from './token.js';

const TEXT_FIELDS = ['goal', 'workflow', 'tools', 'constraints', 'preferredWindows', 'timeZone'] as const;

const FORBIDDEN_KEYS = new Set([
  'price',
  'amount',
  'url',
  'redirect',
  'next',
  'phi',
  'diagnosis',
  'ssn',
  'password',
  'apikey',
  'secret',
  'patient',
  'recording',
  'appointmentconfirmed',
  'confirmed',
]);

const SECRET_TEXT = /sk_(live|test)_|rk_(live|test)_|BEGIN PRIVATE KEY|password\s*[:=]|\b\d{3}-\d{2}-\d{4}\b/i;

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/[_-]/g, '');
}

function hasForbidden(value: unknown, depth = 0): boolean {
  if (depth > 5 || !value || typeof value !== 'object') return false;
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (FORBIDDEN_KEYS.has(normalizeKey(key))) return true;
    if (hasForbidden(child, depth + 1)) return true;
  }
  return false;
}

export function parseIntakeBody(raw: string): { ok: true; record: Omit<IntakeRecord, 'sessionId'> } | { ok: false; status: 400 | 413 } {
  if (raw.length > 20_000) return { ok: false, status: 413 };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, status: 400 };
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return { ok: false, status: 400 };
  if (hasForbidden(parsed)) return { ok: false, status: 400 };
  const body = parsed as Record<string, unknown>;
  if (body.noSensitiveData !== true) return { ok: false, status: 400 };
  const text: Record<(typeof TEXT_FIELDS)[number], string> = {
    goal: '',
    workflow: '',
    tools: '',
    constraints: '',
    preferredWindows: '',
    timeZone: '',
  };
  for (const field of TEXT_FIELDS) {
    const value = body[field];
    if (typeof value !== 'string') return { ok: false, status: 400 };
    const trimmed = value.trim();
    if (trimmed.length < 1 || trimmed.length > 2_000) return { ok: false, status: 400 };
    if (SECRET_TEXT.test(trimmed)) return { ok: false, status: 400 };
    text[field] = trimmed;
  }
  return {
    ok: true,
    record: {
      ...text,
      noSensitiveData: true,
      bookingStatus: 'requested',
      appointmentConfirmed: false,
      planStatus: 'awaiting_austin_review',
    },
  };
}

export async function handleBundleIntake(request: Request, deps: BundleDeps): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, { allow: 'POST' });
  const token = bearerToken(request);
  if (!token || !deps.config.downloadSecret) return json({ error: 'unauthorized' }, 401);
  const ticket = readDownloadToken(deps.config.downloadSecret, token, deps.now());
  if (!ticket) return json({ error: 'forbidden' }, 403);
  const parsed = parseIntakeBody(await request.text());
  if (!parsed.ok) return json({ error: 'invalid_body' }, parsed.status);
  const paid = await loadPaidSession(deps, ticket.sessionId);
  if (paid !== 'paid') return json({ error: 'forbidden' }, 403);
  if (!deps.intake) return json({ error: 'intake_unavailable' }, 503);
  let saved: { duplicate: boolean };
  try {
    saved = await deps.intake.save({ ...parsed.record, sessionId: ticket.sessionId });
  } catch {
    return json({ error: 'intake_unavailable' }, 503);
  }
  return json({
    saved: !saved.duplicate,
    duplicate: saved.duplicate,
    bookingStatus: 'requested',
    appointmentConfirmed: false,
    planStatus: 'awaiting_austin_review',
  }, saved.duplicate ? 409 : 200);
}
