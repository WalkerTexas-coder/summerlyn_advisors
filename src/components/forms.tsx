import { FormEvent, useState } from 'react';
import { submitForm } from '../lib/submitForm';

type FieldDef = { name: string; label: string; type?: 'text' | 'email' | 'url' | 'textarea' | 'select' | 'file' | 'checkbox'; required?: boolean; placeholder?: string; options?: string[]; full?: boolean; rows?: number };

function GenericForm({ fields, endpoint, subject, hidden = {}, submitLabel, successTitle }: {
  fields: FieldDef[]; endpoint?: string; subject: string; hidden?: Record<string, string>; submitLabel: string; successTitle: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [done, setDone] = useState(false);
  const [fileError, setFileError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      await submitForm(endpoint, subject, { ...values, ...hidden });
      setDone(true);
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  }

  if (done) {
    return (
      <div className="card text-center py-14" role="status">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-cyan-400/15 text-cyan-300 text-2xl">✓</div>
        <h3 className="text-2xl font-semibold">{successTitle}</h3>
        <p className="mt-3 text-zinc-400">We received your details and will confirm by email within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-5 md:grid-cols-2">
      {Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      {fields.map((f) => {
        const common = { id: f.name, name: f.name, required: f.required, placeholder: f.placeholder, value: values[f.name] || '', className: 'input' };
        const onChange = (e: { target: { value: string } }) => setValues((s) => ({ ...s, [f.name]: e.target.value }));
        if (f.type === 'checkbox') {
          return (
            <label key={f.name} className="md:col-span-2 flex items-start gap-3 text-sm text-zinc-300">
              <input type="checkbox" id={f.name} name={f.name} required={f.required} checked={values[f.name] === 'yes'} onChange={(e) => setValues((s) => ({ ...s, [f.name]: e.target.checked ? 'yes' : '' }))} className="mt-1 h-4 w-4 accent-cyan-400" />
              <span>{f.label}{f.required && <span className="text-brand-300"> *</span>}</span>
            </label>
          );
        }
        if (f.type === 'file') {
          return (
            <div key={f.name} className="md:col-span-2">
              <label htmlFor={f.name} className="label">{f.label}</label>
              <input id={f.name} type="file" accept=".csv,.txt,.tsv" className="block w-full text-sm text-zinc-400 file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-white hover:file:bg-white/20"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  setFileError('');
                  if (!file) { setValues((s) => ({ ...s, lead_file_csv: '', lead_file_name: '' })); return; }
                  if (file.size > 500 * 1024) {
                    setFileError(`That file is ${Math.ceil(file.size / 1024)} KB. Please keep uploads under 500 KB, or share a link instead.`);
                    e.target.value = '';
                    setValues((s) => ({ ...s, lead_file_csv: '', lead_file_name: '' }));
                    return;
                  }
                  const text = await file.text();
                  setValues((s) => ({ ...s, lead_file_csv: text, lead_file_name: file.name }));
                }} />
              {fileError && <p className="mt-2 text-sm text-red-400" role="alert">{fileError}</p>}
              {f.placeholder && <p className="mt-2 text-xs text-zinc-500">{f.placeholder}</p>}
            </div>
          );
        }
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
        <p className="text-xs text-zinc-500 max-w-md">Submitted securely.</p>
        <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">{status === 'sending' ? 'Sending…' : submitLabel}</button>
      </div>
      {status === 'error' && <p className="md:col-span-2 text-sm text-red-400">Sorry, we couldn’t send that just now. Please check your connection and try again in a moment.</p>}
    </form>
  );
}

const TZ = ['Eastern (ET)', 'Central (CT)', 'Mountain (MT)', 'Arizona (MST, no DST)', 'Pacific (PT)', 'Alaska (AKT)', 'Hawaii (HST)', 'Other (add in notes)'];

const onboardingFields: FieldDef[] = [
  { name: 'name', label: 'Your name', required: true },
  { name: 'email', label: 'Email (billing / contact)', type: 'email', required: true },
  { name: 'company', label: 'Company', required: true },
  { name: 'website', label: 'Website', type: 'url', placeholder: 'https://' },
  { name: 'calendar_email', label: 'Calendar email for daily invites', type: 'email', required: true, placeholder: 'Where the daily email and invites should land' },
  { name: 'timezone', label: 'Timezone', type: 'select', required: true, options: TZ },
  { name: 'delivery_time', label: 'Preferred delivery time', type: 'select', required: true, options: ['7:00 a.m.', '7:30 a.m.', '8:00 a.m.', '8:30 a.m.', '9:00 a.m.', 'Evening before (5:00 p.m.)'] },
  { name: 'call_window', label: 'Preferred call block start', placeholder: 'e.g. 9:00 a.m.' },
  { name: 'what_you_sell', label: 'What you sell', type: 'textarea', required: true, rows: 3, placeholder: 'Your product or service, the problem it solves, typical deal size' },
  { name: 'ideal_customer', label: 'Ideal customer (ICP)', type: 'textarea', required: true, rows: 3, placeholder: 'Describe your best customers and what makes them a fit; triggers that signal they need you now' },
  { name: 'industries', label: 'Target industries', required: true, placeholder: 'e.g. multi-site clinics, B2B SaaS, construction' },
  { name: 'titles', label: 'Target titles / roles', required: true, placeholder: 'e.g. Director of Operations, VP Sales, Owner' },
  { name: 'company_size', label: 'Company size', type: 'select', required: true, options: ['1–10', '11–50', '51–200', '201–500', '501–1,000', '1,000+', 'Mixed / any'] },
  { name: 'geography', label: 'Geography', required: true, placeholder: 'e.g. Texas, US Central time zone, nationwide' },
  { name: 'leads_link', label: 'Link to existing customer / lead list (optional)', type: 'url', full: true, placeholder: 'Google Sheet, Dropbox, or CRM export link (shared view access)' },
  { name: 'leads_upload', label: 'Upload a customer / lead list (optional, CSV or TXT, under 500 KB)', type: 'file' },
  { name: 'leads', label: 'Or paste leads / customers (optional)', type: 'textarea', rows: 5, placeholder: 'Company, name, title, phone/email, one per line' },
  { name: 'exclusions', label: 'Exclusions: current customers, do-not-call, accounts to skip', type: 'textarea', rows: 3, placeholder: 'Companies, domains, or people we must never send' },
  { name: 'competitors', label: 'Competitors', type: 'textarea', rows: 2, placeholder: 'Competitors to exclude, and how you win against them' },
  { name: 'proof_points', label: 'Proof points we can use in playbooks', type: 'textarea', rows: 2, placeholder: 'Results, customer names you can reference, differentiators' },
  { name: 'notes', label: 'Anything else', type: 'textarea', rows: 2 },
  { name: 'data_confirm', label: 'I confirm I lawfully hold any lead or customer data I share and may share it with Summerlyn (and its service providers, including AI providers) to deliver the service, as described in the Privacy Policy.', type: 'checkbox', required: true },
];

export function IntakeForm({ sessionId: sid, plan: pl }: { sessionId: string; plan: string }) {
  const q = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const plan = q?.get('plan') || pl || '';
  const sessionId = q?.get('session_id') || sid || '';
  return <GenericForm fields={onboardingFields} endpoint={import.meta.env.VITE_INTAKE_FORM_ENDPOINT} subject={`Daily calls onboarding (${plan})${sessionId ? ` · ${sessionId}` : ''}`} hidden={{ session_id: sessionId, plan }} submitLabel="Start my daily calls →" successTitle="You’re set. Your first invites are on the way." />;
}

const contactFields: FieldDef[] = [
  { name: 'name', label: 'Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'company', label: 'Company' },
  { name: 'interest', label: 'I’m interested in', type: 'select', options: ['Daily call plans', 'Advisory', 'Something else'] },
  { name: 'message', label: 'Message', type: 'textarea', required: true, rows: 5 },
];

export function ContactForm() {
  return <GenericForm fields={contactFields} endpoint={import.meta.env.VITE_CONTACT_FORM_ENDPOINT || import.meta.env.VITE_INTAKE_FORM_ENDPOINT} subject="Website inquiry · Summerlyn" submitLabel="Send message →" successTitle="Thanks, message on its way." />;
}
