export type FormValues = Record<string, string>;

/** POSTs JSON to a Formspree-style endpoint. Throws on missing endpoint or non-2xx. */
export async function submitForm(endpoint: string | undefined, subject: string, values: FormValues): Promise<void> {
  if (!endpoint) throw new Error('Form endpoint not configured');
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ _subject: subject, ...values }),
  });
  if (!res.ok) throw new Error(`Submit failed (${res.status})`);
}
