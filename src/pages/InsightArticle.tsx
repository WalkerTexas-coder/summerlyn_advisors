import { Link, Navigate, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { CTA } from '../components/ui';
import { getInsight, insights } from '../data/insights';

export default function InsightArticle() {
  const { slug = '' } = useParams();
  const a = getInsight(slug);
  if (!a) return <Navigate to="/insights" replace />;
  const next = insights[(insights.indexOf(a) + 1) % insights.length];
  return (
    <>
      <SEO title={a.title} description={a.dek} url={`/insights/${a.slug}`} type="article" />
      <article className="container-x max-w-3xl pt-20 md:pt-28 animate-fadeUp">
        <Link to="/insights" className="text-sm text-zinc-500 hover:text-white">← All insights</Link>
        <p className="eyebrow mt-8 mb-4">{a.tag} · {a.readMinutes} min read</p>
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">{a.title}</h1>
        <p className="lead mt-5">{a.dek}</p>
        <div className="card mt-8 !p-5 text-sm">Ideas from <strong className="text-white"><em>{a.book}</em></strong> by <strong className="text-white">{a.author}</strong>. Paraphrased and applied in our own words; we recommend reading the original.</div>
        <div className="prose-x mt-10">
          {a.quote && <blockquote>“{a.quote}” <span className="block mt-2 font-sans not-italic text-sm text-zinc-500">— {a.author}, {a.book}</span></blockquote>}
          {a.sections.map((s, i) => (
            <div key={i}>
              {s.heading && <h2>{s.heading}</h2>}
              {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
            </div>
          ))}
        </div>
        <Link to={`/insights/${next.slug}`} className="card mt-14 block group hover:border-brand-400/40">
          <p className="text-xs text-zinc-500">Next</p><p className="mt-1 text-lg text-white group-hover:text-brand-300">{next.title} →</p>
        </Link>
      </article>
      <CTA />
    </>
  );
}
