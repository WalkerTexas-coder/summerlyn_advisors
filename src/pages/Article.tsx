import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import CTASection from '../components/common/CTASection';
import { articles } from '../data/articles';
import { ArticleContent } from '../types';

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/resources" replace />;
  }

  const renderContent = (content: ArticleContent, index: number) => {
    switch (content.type) {
      case 'heading':
        const HeadingTag = `h${content.level || 2}` as keyof JSX.IntrinsicElements;
        const headingClasses =
          content.level === 2
            ? 'text-3xl font-heading font-bold text-gray-900 mt-12 mb-6'
            : 'text-2xl font-heading font-bold text-gray-900 mt-8 mb-4';
        return (
          <HeadingTag key={index} className={headingClasses}>
            {content.content as string}
          </HeadingTag>
        );

      case 'paragraph':
        return (
          <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
            {content.content as string}
          </p>
        );

      case 'list':
        return (
          <ul key={index} className="space-y-3 mb-6 ml-6">
            {(content.content as string[]).map((item, i) => (
              <li key={i} className="text-lg text-gray-700 leading-relaxed">
                {item.startsWith('**') ? (
                  <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        );

      case 'highlight':
        return (
          <div key={index} className="bg-primary-50 border-l-4 border-primary-500 p-6 mb-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              {typeof content.content === 'string' &&
              content.content.includes('**') ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: (content.content as string).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                  }}
                />
              ) : (
                String(content.content)
              )}
            </p>
          </div>
        );

      case 'stats':
        const stats = content.content as Record<string, string>;
        return (
          <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-4xl font-bold text-primary-500 mb-2">{key}</div>
                <div className="text-sm text-gray-600">{value}</div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        keywords={article.tags.join(', ')}
        url={`/resources/${article.slug}`}
      />

      {/* Article Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <Link
                to="/resources"
                className="text-primary-500 hover:text-primary-600 font-semibold"
              >
                ← Back to Resources
              </Link>
            </div>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                {article.category === 'case-study'
                  ? 'Case Study'
                  : article.category === 'guide'
                  ? 'Guide'
                  : 'Article'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            {article.content.map((content, index) => renderContent(content, index))}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">
              More Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles
                .filter((a) => a.id !== article.id)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/resources/${relatedArticle.slug}`}
                    className="card hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{relatedArticle.excerpt}</p>
                    <span className="text-primary-500 font-semibold">Read More →</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need Help Building Your Telehealth Platform?"
        description="Let's discuss how my experience can help you navigate compliance, integrations, and product strategy."
        primaryCTA={{
          text: 'Schedule a Call',
          link: '/contact',
        }}
      />
    </>
  );
}
