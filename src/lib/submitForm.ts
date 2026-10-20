import { CONTACT_EMAIL } from '../data/callListOffer';

export type FormValues = Record<string, string>;
export type SubmitResult = { mode: 'endpoint' } | { mode: 'mailto'; href: string };

export function buildMailto(subject: string, values: FormValues, labels: Record<string, string>) {
  const body = Object.entries(values)
    .filter(([, v]) => v)
    .map(([k, v]) => `${labels[k] || k}:\n${v}`)
    .join('\n\n');
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** POSTs JSON to a Formspree-style endpoint, or falls back to a prefilled mailto: link. */
export async function submitForm(
  endpoint: string | undefined,
  subject: string,
  values: FormValues,
  labels: Record<string, string>,
): Promise<SubmitResult> {
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, ...values }),
    });
    if (!res.ok) throw new Error(`Submit failed (${res.status})`);
    return { mode: 'endpoint' };
  }
  const href = buildMailto(subject, values, labels);
  window.location.href = href;
  return { mode: 'mailto', href };
}
