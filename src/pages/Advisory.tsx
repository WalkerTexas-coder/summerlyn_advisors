import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageHeader, Photo } from '../components/ui';
import { photoCredits } from '../data/photoCredits';
import { services } from '../data/services';

export default function Advisory() {
  return (
    <>
      <SEO title="Advisory: fractional product leadership" description="Fractional product leadership for healthcare and telehealth companies: strategy, execution, go-to-market, and telehealth platform development." url="/advisory" />
      <PageHeader eyebrow="Summerlyn Advisory" title={<>Fractional product leadership for <span className="serif-accent">healthcare & telehealth.</span></>}>
        Senior product and go-to-market leadership without the full-time hire, from LegitScript and SureScripts certification to 0→1 launches.
      </PageHeader>
      <div className="container-x pb-12"><Photo photo={photoCredits.dealHandshake} overlay="left" className="aspect-[16/7] md:aspect-[3/1]" /></div>
      <section className="container-x grid gap-6 md:grid-cols-2 pb-20">
        {services.map((s) => (
          <div key={s.id} className="card">
            <span className="text-3xl">{s.icon}</span>
            <h2 className="mt-4 text-2xl font-semibold">{s.title}</h2>
            <p className="mt-2 text-zinc-400">{s.shortDescription}</p>
            <ul className="mt-5 space-y-2 text-sm">{s.included?.map((i) => <li key={i} className="flex gap-2"><span className="text-cyan-300">→</span>{i}</li>)}</ul>
            <div className="mt-6 grid gap-3 text-sm border-t border-white/10 pt-5">
              <p><span className="text-zinc-500">For: </span>{s.forWho}</p>
              <p><span className="text-zinc-500">Outcomes: </span>{s.outcomes}</p>
            </div>
            <Link to="/contact" className="btn-ghost mt-6">{s.ctaText} →</Link>
          </div>
        ))}
      </section>
    </>
  );
}
