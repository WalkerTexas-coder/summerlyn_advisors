import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { IntakeForm } from '../components/forms';
import { PageHeader } from '../components/ui';

export default function CallListSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id') || '';
  const plan = params.get('plan') || '';
  const sub = Boolean(plan);
  return (
    <>
      <SEO title="Thank you: tell us about your ideal customer" description="Thanks for your order. Complete your 5-minute brief so we can start researching your call list." url="/call-list/success" />
      <PageHeader eyebrow="Payment received" title={<>Thank you. <span className="serif-accent">Let’s find your calls.</span></>}>
        {sub ? 'Your subscription is active. Tell us where to send your calendar invites and who you want to reach. Your first daily calls arrive within 2 business days of a complete brief, every weekday after that (US federal holidays excluded).' : 'Your Stripe receipt is on its way. Fill out this 5-minute brief and the clock starts: your list arrives within 3 business days of a complete brief (next business day with Rush).'}
      </PageHeader>
      <section className="container-x pb-20 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <IntakeForm sessionId={sessionId} plan={plan || undefined} />
        <aside className="space-y-5 text-sm">
          <div className="card">
            <p className="eyebrow mb-3">What happens next</p>
            <ol className="space-y-3 text-zinc-400 list-decimal pl-4">
              <li>We confirm your brief within one business day.</li>
              <li>We research, verify, and script every contact.</li>
              <li>A human reviews the list before it ships.</li>
              <li>{sub ? 'Each weekday you get one email with that day’s calendar invites: name, phone, why selected, why now, and a call playbook.' : 'You get a Google Sheet, CSV, and script sheet.'}</li>
            </ol>
          </div>
          {sessionId && <p className="text-xs text-zinc-600 break-all">Order reference: {sessionId}</p>}
          <p className="text-xs text-zinc-500">Reminder: you are responsible for TCPA, Do-Not-Call, and CAN-SPAM compliance when contacting people on your list.</p>
        </aside>
      </section>
    </>
  );
}
