import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { IntakeForm } from '../components/forms';
import { PageHeader } from '../components/ui';
import { dailyTiers } from '../data/callListOffer';

export default function CallListSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id') || '';
  const plan = params.get('plan') || '';
  const tier = dailyTiers.find((t) => t.id === plan);
  return (
    <>
      <SEO title="Welcome: set up your daily calls" description="Thanks for subscribing. Complete your onboarding brief so we can start researching your daily calls." url="/call-list/success" />
      <PageHeader eyebrow={tier ? `Subscribed · ${tier.name}` : 'Payment received'} title={<>Welcome aboard. <span className="serif-accent">Let’s set up your calls.</span></>}>
        Your subscription is active and your Stripe receipt is on its way. Tell us everything about who you sell to and where to send your invites. Your first daily email arrives within 2 business days of a complete brief, then every weekday after (US federal holidays excluded).
      </PageHeader>
      <section className="container-x pb-20 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <IntakeForm sessionId={sessionId} plan={plan || 'unknown'} />
        <aside className="space-y-5 text-sm">
          <div className="card">
            <p className="eyebrow mb-3">What happens next</p>
            <ol className="space-y-3 text-zinc-400 list-decimal pl-4">
              <li>We confirm your brief within one business day.</li>
              <li>We research, verify, and write a playbook for every contact.</li>
              <li>Each weekday you get one email with that day’s calendar invites: name, phone, why selected, why now, and a call playbook.</li>
              <li>Reply “REPLACE” to any invite with a bad number and we send a new contact.</li>
            </ol>
          </div>
          {sessionId && <p className="text-xs text-zinc-600 break-all">Order reference: {sessionId}</p>}
          <p className="text-xs text-zinc-500">Reminder: you are responsible for TCPA, Do-Not-Call, and CAN-SPAM compliance. Calls must be dialed manually by a person.</p>
        </aside>
      </section>
    </>
  );
}
