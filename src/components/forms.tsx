import { FormEvent, useState } from 'react';
import { CONTACT_EMAIL } from '../data/callListOffer';
import { submitForm, SubmitResult } from '../lib/submitForm';

type FieldDef = { name: string; label: string; type?: 'text' | 'email' | 'url' | 'textarea' | 'select'; required?: boolean; placeholder?: string; options?: string[]; full?: boolean; rows?: number };

function GenericForm({ fields, endpoint, subject, hidden = {}, submitLabel, successTitle }: {
  fields: FieldDef[]; endpoint?: string; subject: string; hidden?: Record<string, string>; submitLabel: string; successTitle: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [result, setResult] = useState<SubmitResult | null>(null);
  const labels = Object.fromEntries([...fields.map((f) => [f.name, f.label]), ['session_id', 'Stripe session ID']]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      setResult(await submitForm(endpoint, subject, { ...values, ...hidden }, labels));
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  }

  if (result) {
    return (
      <div className="card text-center py-14" role="status">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-cyan-400/15 text-cyan-300 text-2xl">✓</div>
        <h3 className="text-2xl font-semibold">{successTitle}</h3>
        {result.mode === 'endpoint' ? (
          <p className="mt-3 text-zinc-400">We received your details and will confirm by email within one business day.</p>
        ) : (
          <p className="mt-3 text-zinc-400 max-w-md mx-auto">
            Your email app should have opened with everything filled in. Just hit send. If nothing opened,{' '}
            <a href={result.href} className="text-brand-300 underline">click here</a> or email <span className="text-white">{CONTACT_EMAIL}</span>.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-5 md:grid-cols-2">
      {Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      {fields.map((f) => {
        const common = { id: f.name, name: f.name, required: f.required, placeholder: f.placeholder, value: values[f.name] || '', className: 'input' };
        const onChange = (e: { target: { value: string } }) => setValues((s) => ({ ...s, [f.name]: e.target.value }));
        return (
          <div key={f.name} className={f.full || f.type === 'textarea' ? 'md:col-span-2' : ''}>
            <label htmlFor={f.name} className="label">{f.label}{f.required && <span className="text-brand-300"> *</span>}</label>
            {f.type === 'textarea' ? <textarea {...common} rows={f.rows || 4} onChange={onChange} />
              : f.type === 'select' ? (
                <select {...common} onChange={onChange}>
                  <option value="">Select…</option>
                  {f.options!.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : <input {...common} type={f.type || 'text'} onChange={onChange} />}
          </div>
        );
      })}
      <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="text-xs text-zinc-500 max-w-md">{endpoint ? 'Submitted securely.' : `Submitting opens your email app with this form prefilled to ${CONTACT_EMAIL}.`}</p>
        <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">{status === 'sending' ? 'Sending…' : submitLabel}</button>
      </div>
      {status === 'error' && <p className="md:col-span-2 text-sm text-red-400">Something went wrong. Please try again or email {CONTACT_EMAIL}.</p>}
    </form>
  );
}

const intakeFields: FieldDef[] = [
  { name: 'name', label: 'Your name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'company', label: 'Company', required: true },
  { name: 'website', label: 'Website', type: 'url', placeholder: 'https://' },
  { name: 'what_you_sell', label: 'What you sell', type: 'textarea', required: true, rows: 3, placeholder: 'Your product or service, and the problem it solves' },
  { name: 'ideal_customer', label: 'Ideal customer (ICP)', type: 'textarea', required: true, rows: 3, placeholder: 'Industry, company size, titles you sell to, triggers that signal they need you, who to exclude' },
  { name: 'territory', label: 'Territory', placeholder: 'e.g. Texas, US Central time zone, nationwide' },
  { name: 'contacts_wanted', label: 'Contacts wanted', type: 'select', options: ['15 (Pilot)', '50 (Call Sprint)', 'Top 50 of my list (Prioritize)', 'Other / not sure'] },
  { name: 'leads', label: 'Your leads (optional, paste rows)', type: 'textarea', rows: 6, placeholder: 'Paste company, name, title, phone/email per line. By submitting you confirm you lawfully hold this data and may share it with us to fulfil your order.' },
  { name: 'crm', label: 'CRM you use', placeholder: 'HubSpot, Salesforce, spreadsheet, none…' },
  { name: 'notes', label: 'Notes', type: 'textarea', rows: 3, placeholder: 'Customers or competitors to exclude, proof points we can use, anything else' },
];

const subscriberFields: FieldDef[] = [
  { name: 'name', label: 'Your name', required: true },
  { name: 'email', label: 'Email (billing / contact)', type: 'email', required: true },
  { name: 'calendar_email', label: 'Calendar email for invites', type: 'email', required: true, placeholder: 'Where the daily call invites should land' },
  { name: 'timezone', label: 'Timezone', type: 'select', required: true, options: ['Eastern (ET)', 'Central (CT)', 'Mountain (MT)', 'Arizona (MST, no DST)', 'Pacific (PT)', 'Alaska (AKT)', 'Hawaii (HST)', 'Other (add in notes)'] },
  { name: 'delivery_time', label: 'Preferred delivery time', type: 'select', required: true, options: ['7:00 a.m.', '7:30 a.m.', '8:00 a.m.', '8:30 a.m.', '9:00 a.m.', 'Evening before (5:00 p.m.)'] },
  { name: 'call_window', label: 'Preferred call block start', placeholder: 'e.g. 9:00 a.m., 15-min slots' },
  { name: 'company', label: 'Company', required: true },
  { name: 'website', label: 'Website', type: 'url', placeholder: 'https://' },
  { name: 'what_you_sell', label: 'What you sell', type: 'textarea', required: true, rows: 3, placeholder: 'Your product or service, and the problem it solves' },
  { name: 'ideal_customer', label: 'Ideal customer (ICP)', type: 'textarea', required: true, rows: 3, placeholder: 'Industry, company size, titles you sell to, triggers that signal they need you, who to exclude' },
  { name: 'territory', label: 'Territory', placeholder: 'e.g. Texas, US Central time zone, nationwide' },
  { name: 'notes', label: 'Exclusions & notes', type: 'textarea', rows: 3, placeholder: 'Current customers, competitors, or accounts never to send' },
];

export function IntakeForm({ sessionId, plan }: { sessionId: string; plan?: string }) {
  if (plan) {
    return <GenericForm fields={subscriberFields} endpoint={import.meta.env.VITE_INTAKE_FORM_ENDPOINT} subject={`Daily calls subscriber intake (${plan})${sessionId ? ` · ${sessionId}` : ''}`} hidden={{ session_id: sessionId, plan }} submitLabel="Start my daily calls →" successTitle="You're set. Your first invites are on the way." />;
  }
  return <GenericForm fields={intakeFields} endpoint={import.meta.env.VITE_INTAKE_FORM_ENDPOINT} subject={`Call List intake${sessionId ? ` · ${sessionId}` : ''}`} hidden={{ session_id: sessionId }} submitLabel="Send my brief →" successTitle="Brief received. Your list is underway." />;
}

const contactFields: FieldDef[] = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'company', label: 'Company' },
  { name: 'interest', label: 'I’m interested in', type: 'select', options: ['Call Lists', 'Advisory', 'Something else'] },
  { name: 'message', label: 'Message', type: 'textarea', required: true, rows: 5 },
];

export function ContactForm() {
  return <GenericForm fields={contactFields} endpoint={import.meta.env.VITE_CONTACT_FORM_ENDPOINT || import.meta.env.VITE_INTAKE_FORM_ENDPOINT} subject="Website inquiry · Summerlyn" submitLabel="Send message →" successTitle="Thanks, message on its way." />;
}
