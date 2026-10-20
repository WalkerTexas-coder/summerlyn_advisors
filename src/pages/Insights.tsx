import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { CTA, PageHeader } from '../components/ui';
import { insights } from '../data/insights';

export default function Insights() {
  return (
    <>
      <SEO title="Insights: who to call, what to say, and when" description="The best ideas from classic sales, marketing, and negotiation books, repackaged for outbound calling." url="/insights" />
      <PageHeader eyebrow="Insights" title={<>The best sales books, <span className="serif-accent">distilled for the dial.</span></>}>
        Short, original takes on ideas from the most respected books in sales, marketing, and negotiation, applied to who to call, what to say, and when. Each article credits its source; go read the originals.
      </PageHeader>
      <section className="container-x grid gap-6 md:grid-cols-2 pb-10">
        {insights.map((a) => (
          <Link key={a.slug} to={`/insights/${a.slug}`} className="card group hover:border-brand-400/40 transition">
            <div className="flex justify-between text-xs"><span className="text-cyan-300">{a.tag}</span><span className="text-zinc-500">{a.readMinutes} min read</span></div>
            <h2 className="mt-4 text-2xl font-semibold group-hover:text-brand-300 transition">{a.title}</h2>
            <p className="mt-3 text-zinc-400">{a.dek}</p>
            <p className="mt-6 text-xs text-zinc-500">Inspired by <em>{a.book}</em> by {a.author}</p>
          </Link>
        ))}
      </section>
      <CTA />
    </>
  );
}
