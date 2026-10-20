import { Helmet } from 'react-helmet-async';

interface SEOProps { title: string; description: string; url?: string; type?: 'website' | 'article' }

export default function SEO({ title, description, url = '', type = 'website' }: SEOProps) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.summerlynadvisors.com';
  const full = `${siteUrl}${url}`;
  const t = `${title} | Summerlyn Call Lists`;
  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={full} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Summerlyn Advisors" />
      <meta property="og:image" content={`${siteUrl}/images/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Sales professional on a call in a modern office" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={`${siteUrl}/images/og-image.jpg`} />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={full} />
    </Helmet>
  );
}
