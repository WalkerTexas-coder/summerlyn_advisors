import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { articles } from '../data/articles';

export default function Resources() {
  const featuredArticles = articles.filter((a) => a.featured);
  const caseStudies = articles.filter((a) => a.category === 'case-study');
  const guides = articles.filter((a) => a.category === 'guide');
  const thoughtLeadership = articles.filter((a) => a.category === 'thought-leadership');

  return (
    <>
      <SEO
        title="Resources"
        description="Case studies, guides, and insights on building telehealth platforms, healthcare integrations, and product leadership in healthcare technology."
        keywords="telehealth case studies, healthcare product management, product leadership, healthcare technology guides"
        url="/resources"
      />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Case studies, guides, and insights from building telehealth platforms across multiple companies
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-12">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/resources/${article.slug}`}
                  className="card hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                      {article.category === 'case-study' ? 'Case Study' : article.category === 'guide' ? 'Guide' : 'Article'}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.readTime}</span>
                    <span className="text-primary-500 font-semibold">Read More →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-12">Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((article) => (
                <Link
                  key={article.id}
                  to={`/resources/${article.slug}`}
                  className="card hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.readTime}</span>
                    <span className="text-primary-500 font-semibold">Read Case Study →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guides & Thought Leadership */}
      {(guides.length > 0 || thoughtLeadership.length > 0) && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-12">
              Guides & Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...guides, ...thoughtLeadership].map((article) => (
                <Link
                  key={article.id}
                  to={`/resources/${article.slug}`}
                  className="card hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.readTime}</span>
                    <span className="text-primary-500 font-semibold">Read More →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
