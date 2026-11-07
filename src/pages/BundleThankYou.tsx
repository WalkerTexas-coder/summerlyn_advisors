import { FormEvent, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageHeader } from '../components/ui';

const SESSION_ID = /^cs_(test|live)_[A-Za-z0-9]+$/;
const FILE_NAME = 'Summerlyn-Advisors-Implementation-Bundle.zip';

type DownloadState = 'idle' | 'working' | 'ready' | 'denied' | 'unavailable';
type IntakeState = 'idle' | 'working' | 'saved' | 'duplicate' | 'denied' | 'unavailable' | 'invalid';

const fields = [
  ['goal', 'Business goal', 'What outcome should the plan aim at?'],
  ['workflow', 'Current workflow', 'Describe the work in plain language. Leave out names of patients and account numbers.'],
  ['tools', 'Tools you already use', 'Name the systems you want the plan to consider.'],
  ['constraints', 'Non-sensitive constraints', 'Limits on time, staff, or tools. Do not include secrets or medical records.'],
  ['preferredWindows', 'Preferred evening or weekend times', 'A request only. This does not hold a time.'],
  ['timeZone', 'Time zone', 'For example, Central Time.'],
] as const;

export default function BundleThankYou() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id') ?? '';
  const sessionIsReference = SESSION_ID.test(sessionId);
  const [downloadState, setDownloadState] = useState<DownloadState>('idle');
  const [intakeState, setIntakeState] = useState<IntakeState>('idle');
  const [noSensitiveData, setNoSensitiveData] = useState(false);

  async function paymentToken(): Promise<string | null> {
    const access = await fetch('/api/bundle/access', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ sessionId }),
    });
    if (access.status === 401 || access.status === 403) {
      setDownloadState('denied');
      setIntakeState('denied');
      return null;
    }
    if (!access.ok) {
      setDownloadState('unavailable');
      setIntakeState('unavailable');
      return null;
    }
    const payload = await access.json() as { token?: unknown };
    if (typeof payload.token !== 'string' || payload.token.length < 20) {
      setDownloadState('unavailable');
      setIntakeState('unavailable');
      return null;
    }
    return payload.token;
  }

  async function requestDownload() {
    if (!sessionIsReference) {
      setDownloadState('denied');
      return;
    }
    setDownloadState('working');
    try {
      const token = await paymentToken();
      if (!token) return;
      const file = await fetch('/api/bundle/file', {
        headers: { authorization: `Bearer ${token}`, accept: 'application/zip' },
      });
      if (file.status === 401 || file.status === 403) {
        setDownloadState('denied');
        return;
      }
      if (!file.ok) {
        setDownloadState('unavailable');
        return;
      }
      const blob = await file.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = FILE_NAME;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
      setDownloadState('ready');
    } catch {
      setDownloadState('unavailable');
    }
  }

  async function submitIntake(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!sessionIsReference) {
      setIntakeState('denied');
      return;
    }
    const form = new FormData(event.currentTarget);
    const body: Record<string, string | boolean> = { noSensitiveData };
    for (const [name] of fields) body[name] = String(form.get(name) ?? '');
    setIntakeState('working');
    try {
      const token = await paymentToken();
      if (!token) return;
      const response = await fetch('/api/bundle/intake', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json', authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (response.status === 401 || response.status === 403) {
        setIntakeState('denied');
        return;
      }
      if (response.status === 409) {
        setIntakeState('duplicate');
        return;
      }
      if (response.status === 400) {
        setIntakeState('invalid');
        return;
      }
      if (!response.ok) {
        setIntakeState('unavailable');
        return;
      }
      const payload = await response.json() as { appointmentConfirmed?: unknown };
      if (payload.appointmentConfirmed === true) {
        setIntakeState('unavailable');
        return;
      }
      setIntakeState('saved');
    } catch {
      setIntakeState('unavailable');
    }
  }

  return (
    <>
      <SEO
        title="Bundle order"
        description="After payment is verified, request the educational files and send a non-sensitive intake and time request. A time request is not a confirmed appointment."
        url="/bundle/thank-you"
        brand="Summerlyn Advisors"
      />
      <PageHeader eyebrow="Implementation bundle and consultation" title={<>Thank you. <span className="serif-accent">Your order reference is here.</span></>}>
        The files and the intake are available only after the server checks a paid checkout for both the documents and the consultation. A tailored plan is delivered only after Austin reviews it. The five business days start when the discovery call has been held.
      </PageHeader>
      <section className="container-x pb-20 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <div className="card space-y-5">
            <p>For this assisted package, all sales are final except where the law requires otherwise.</p>
            {sessionIsReference ? (
              <button type="button" className="btn-primary" onClick={() => { void requestDownload(); }} disabled={downloadState === 'working'}>
                {downloadState === 'working' ? 'Checking payment…' : 'Request the download'}
              </button>
            ) : (
              <p className="text-sm text-zinc-400">This page has no payment reference, so there is nothing to verify.</p>
            )}
            {downloadState === 'denied' && <p className="text-sm text-zinc-300">This payment could not be verified for the bundle.</p>}
            {downloadState === 'unavailable' && <p className="text-sm text-zinc-300">The download is not available.</p>}
            {downloadState === 'ready' && <p className="text-sm text-zinc-300">The download was issued to your browser.</p>}
          </div>

          <form className="card space-y-4" onSubmit={(event) => { void submitIntake(event); }}>
            <p className="eyebrow">Intake and time request</p>
            <p className="text-sm text-zinc-400">Describe goals, workflow, tools, and non-sensitive constraints. Do not include protected medical information, patient details, passwords, keys, or other secrets. Submitting preferred times does not confirm a call and does not send a message or a calendar invitation.</p>
            {fields.map(([name, label, hint]) => (
              <label key={name} className="block">
                <span className="label">{label}</span>
                <textarea name={name} required maxLength={2000} className="input min-h-24" placeholder={hint} />
              </label>
            ))}
            <label className="flex gap-3 text-sm text-zinc-300">
              <input type="checkbox" checked={noSensitiveData} onChange={(event) => setNoSensitiveData(event.target.checked)} />
              <span>This submission has no protected health information, medical records, credentials, or secrets.</span>
            </label>
            <button type="submit" className="btn-primary" disabled={!sessionIsReference || !noSensitiveData || intakeState === 'working'}>
              {intakeState === 'working' ? 'Checking payment…' : 'Submit intake and time request'}
            </button>
            {intakeState === 'saved' && <p className="text-sm text-zinc-300">Request saved. This is not a confirmed appointment. No invitation was sent.</p>}
            {intakeState === 'duplicate' && <p className="text-sm text-zinc-300">A request is already saved. It is still not a confirmed appointment.</p>}
            {intakeState === 'denied' && <p className="text-sm text-zinc-300">This payment could not be verified for the assisted package.</p>}
            {intakeState === 'unavailable' && <p className="text-sm text-zinc-300">The request cannot be saved yet.</p>}
            {intakeState === 'invalid' && <p className="text-sm text-zinc-300">Remove secrets or medical details and confirm the attestation.</p>}
          </form>
          <p className="text-sm text-zinc-500">
            <Link to="/bundle" className="underline hover:text-white">Back to the bundle</Link>
          </p>
        </div>
        <aside className="card text-sm text-zinc-400 space-y-3 h-fit">
          <p className="eyebrow">Order reference</p>
          {sessionIsReference ? <p className="break-all text-xs text-zinc-500">{sessionId}</p> : <p>None supplied.</p>}
          <p>The reference does not publish the files or hold a time on a calendar.</p>
          <p>Austin reviews the tailored plan before it is delivered. The app does not send that plan on its own.</p>
        </aside>
      </section>
    </>
  );
}
