import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageHeader } from '../components/ui';

const SESSION_ID = /^cs_(test|live)_[A-Za-z0-9]+$/;
const FILE_NAME = 'Summerlyn-Advisors-Implementation-Bundle.zip';

type DownloadState = 'idle' | 'working' | 'ready' | 'denied' | 'unavailable';

export default function BundleThankYou() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id') ?? '';
  const sessionIsReference = SESSION_ID.test(sessionId);
  const [state, setState] = useState<DownloadState>('idle');

  async function requestDownload() {
    if (!sessionIsReference) {
      setState('denied');
      return;
    }
    setState('working');
    try {
      const access = await fetch('/api/bundle/access', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      if (access.status === 401 || access.status === 403) {
        setState('denied');
        return;
      }
      if (!access.ok) {
        setState('unavailable');
        return;
      }
      const payload = await access.json() as { token?: unknown };
      if (typeof payload.token !== 'string' || payload.token.length < 20) {
        setState('unavailable');
        return;
      }
      const file = await fetch('/api/bundle/file', {
        headers: { authorization: `Bearer ${payload.token}`, accept: 'application/zip' },
      });
      if (file.status === 401 || file.status === 403) {
        setState('denied');
        return;
      }
      if (!file.ok) {
        setState('unavailable');
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
      setState('ready');
    } catch {
      setState('unavailable');
    }
  }

  return (
    <>
      <SEO
        title="Bundle order"
        description="Order page for the Summerlyn Advisors Practical AI Implementation Bundle. The file is sent only after the server verifies a paid checkout for this product."
        url="/bundle/thank-you"
        brand="Summerlyn Advisors"
      />
      <PageHeader eyebrow="Practical AI Implementation Bundle" title={<>Thank you. <span className="serif-accent">Your order reference is here.</span></>}>
        The file is not on this page. A download is issued only after the server checks that Stripe marked this checkout paid for this bundle.
      </PageHeader>
      <section className="container-x pb-20 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="card space-y-5">
          <p>All sales are final. This is a digital download, and no refund is promised. That does not limit a right or remedy that applicable law does not allow to be excluded.</p>
          {sessionIsReference ? (
            <button type="button" className="btn-primary" onClick={() => { void requestDownload(); }} disabled={state === 'working'}>
              {state === 'working' ? 'Checking payment…' : 'Request the download'}
            </button>
          ) : (
            <p className="text-sm text-zinc-400">This page has no payment reference, so there is nothing to verify.</p>
          )}
          {state === 'denied' && <p className="text-sm text-zinc-300">This payment could not be verified for the bundle.</p>}
          {state === 'unavailable' && <p className="text-sm text-zinc-300">The download is not available.</p>}
          {state === 'ready' && <p className="text-sm text-zinc-300">The download was issued to your browser.</p>}
          <p className="text-sm text-zinc-500">
            <Link to="/bundle" className="underline hover:text-white">Back to the bundle</Link>
          </p>
        </div>
        <aside className="card text-sm text-zinc-400 space-y-3">
          <p className="eyebrow">Order reference</p>
          {sessionIsReference ? <p className="break-all text-xs text-zinc-500">{sessionId}</p> : <p>None supplied.</p>}
          <p>Keep this reference if you need to ask about the order. It does not by itself publish the file.</p>
        </aside>
      </section>
    </>
  );
}
