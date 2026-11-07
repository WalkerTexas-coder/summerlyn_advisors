import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  allowlistedPath,
  postHogInitOptions,
  posthogSettings,
  sanitizeCapture,
  scrubPostHogEvent,
} from './posthogPrivacy';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

describe('PostHog stays off without config or consent', () => {
  it('rejects a missing token, a personal key, and an unknown host', () => {
    expect(posthogSettings({})).toBeNull();
    expect(posthogSettings({ token: 'phc_projecttoken', host: 'https://evil.example' })).toBeNull();
    expect(posthogSettings({ token: 'phx_personalkey123', host: 'https://us.i.posthog.com' })).toBeNull();
    expect(posthogSettings({ token: 'phc_projecttoken', host: 'https://us.i.posthog.com' })).toEqual({
      token: 'phc_projecttoken',
      host: 'https://us.i.posthog.com',
    });
    expect(posthogSettings({ token: 'phc_projecttoken', host: 'https://eu.i.posthog.com/' })?.host).toBe('https://eu.i.posthog.com');
  });

  it('turns off autocapture, replay, heatmaps, exceptions, console logs, and person profiles', () => {
    const options = postHogInitOptions('https://eu.i.posthog.com');
    expect(options.person_profiles).toBe('never');
    expect(options.autocapture).toBe(false);
    expect(options.capture_pageview).toBe(false);
    expect(options.capture_exceptions).toBe(false);
    expect(options.capture_heatmaps).toBe(false);
    expect(options.capture_performance).toBe(false);
    expect(options.disable_session_recording).toBe(true);
    expect(options.enable_recording_console_log).toBe(false);
    expect(options.logs.captureConsoleLogs).toBe(false);
    expect(options.opt_out_capturing_by_default).toBe(true);
    expect(options.advanced_disable_flags).toBe(true);
    expect(options).not.toHaveProperty('tracing_headers');
  });
});

describe('PostHog route and payload redaction', () => {
  it('keeps public paths and drops checkout, intake, download, and query strings', () => {
    expect(allowlistedPath('/bundle')).toBe('/bundle');
    expect(allowlistedPath('/insights/practical-ai')).toBe('/insights/practical-ai');
    expect(allowlistedPath('/art')).toBe('/art');
    expect(allowlistedPath('/bundle/thank-you')).toBeNull();
    expect(allowlistedPath('/bundle/thank-you?session_id=cs_live_secret')).toBeNull();
    expect(allowlistedPath('/call-list/success')).toBeNull();
    expect(allowlistedPath('/art/checkout/success')).toBeNull();
    expect(allowlistedPath('/signup?tier=daily5')).toBeNull();
    expect(allowlistedPath('/api/bundle/file')).toBeNull();
    expect(allowlistedPath('/bundle#download')).toBeNull();
  });

  it('sends only an allowlisted path or button name', () => {
    expect(sanitizeCapture('public_page_view', { path: '/about', email: 'a@b.com', session_id: 'cs_live_x' })).toEqual({
      event: 'public_page_view',
      properties: { path: '/about' },
    });
    expect(sanitizeCapture('public_page_view', { path: '/bundle/thank-you' })).toBeNull();
    expect(sanitizeCapture('cta_click', { name: 'signup', text: 'Austin Walker' })).toEqual({
      event: 'cta_click',
      properties: { name: 'signup' },
    });
    expect(sanitizeCapture('cta_click', { name: 'download' })).toBeNull();
    expect(sanitizeCapture('$exception', { message: 'secret' })).toBeNull();
    expect(sanitizeCapture('$identify', { email: 'buyer@example.com' })).toBeNull();
    expect(scrubPostHogEvent({
      event: 'public_page_view',
      properties: { path: '/contact', $current_url: 'https://summerlynadvisors.com/contact?session_id=cs_live_secret', $referrer: 'https://evil.example/a?token=phc_abc' },
    })).toEqual({ event: 'public_page_view', properties: { path: '/contact' } });
  });

  it('does not identify people or read the paid bundle from the client', () => {
    const client = readFileSync(path.join(root, 'src/lib/posthogClient.ts'), 'utf8');
    const gate = readFileSync(path.join(root, 'src/lib/posthog.ts'), 'utf8');
    expect(client).not.toContain('.identify(');
    expect(gate).not.toContain('VITE_POSTHOG_PERSONAL');
    expect(client).not.toContain('session_recording: true');
    const product = readFileSync(path.join(root, 'server/bundle/product.ts'), 'utf8');
    expect(product).toContain('export const CHECKOUT_RELEASED = false');
    expect(product).toContain('export const OFFER_SCOPE_MATCHES_PRICE = false');
  });
});
