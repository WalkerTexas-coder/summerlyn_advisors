import SEO from '../components/common/SEO';
import CTASection from '../components/common/CTASection';
import ServiceCard from '../components/services/ServiceCard';
import { services } from '../data/services';

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Flexible product leadership tailored to your healthcare company's needs. Strategic planning, execution, go-to-market strategy, and healthcare specialization."
        keywords="product management services, healthcare product strategy, fractional PM, telehealth consulting"
        url="/services"
      />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible product leadership tailored to your healthcare company's needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-12 text-center">
              Engagement Models
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card">
                <h3 className="text-xl font-heading font-bold mb-3">Fractional</h3>
                <p className="text-gray-600 mb-4">10-20 hours/week, ongoing engagement</p>
                <p className="text-sm text-gray-600">
                  Perfect for ongoing product leadership without the full-time commitment
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-heading font-bold mb-3">Project-Based</h3>
                <p className="text-gray-600 mb-4">Defined scope and timeline</p>
                <p className="text-sm text-gray-600">
                  Ideal for specific initiatives like product launches or major features
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-heading font-bold mb-3">Retainer</h3>
                <p className="text-gray-600 mb-4">Monthly retainer for on-demand support</p>
                <p className="text-sm text-gray-600">
                  Best for companies needing strategic guidance and advisory support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Let's Start the Conversation"
        description="Schedule a free 30-minute discovery call to discuss your product challenges and how I can help."
        primaryCTA={{
          text: 'Schedule Discovery Call',
          link: '/contact',
        }}
      />
    </>
  );
}
