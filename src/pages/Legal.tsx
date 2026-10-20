import { ReactNode } from 'react';
import SEO from '../components/SEO';
import { CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from '../data/callListOffer';

export function LegalPage({ title, url, description, children }: { title: string; url: string; description: string; children: ReactNode }) {
  return (
    <>
      <SEO title={title} description={description} url={url} />
      <article className="container-x pt-20 pb-20 md:pt-28 max-w-3xl legal">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-semibold">{title}</h1>
        <p className="mt-4 text-sm text-zinc-400">Effective date: {LEGAL_EFFECTIVE_DATE} · Last updated: {LEGAL_EFFECTIVE_DATE}</p>
        <div className="mt-10 space-y-4 text-zinc-300 leading-relaxed [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-white [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:underline [&_strong]:text-white">
          {children}
          <h2>Contact us</h2>
          <p>Summerlyn Advisors LLC, a Texas limited liability company, Leander, Texas. Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </div>
      </article>
    </>
  );
}
