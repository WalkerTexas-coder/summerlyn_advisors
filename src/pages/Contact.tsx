import SEO from '../components/common/SEO';
import ContactForm from '../components/common/ContactForm';

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch to discuss how fractional product leadership can help your healthcare company. Schedule a free discovery call."
        keywords="contact healthcare consultant, fractional PM consultation, telehealth product strategy"
        url="/contact"
      />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Let's Talk
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to discuss how fractional product leadership can accelerate your healthcare product?
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">Send a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Info & FAQ Teaser */}
            <div>
              <div className="mb-12">
                <h2 className="text-2xl font-heading font-bold mb-6">Other Ways to Connect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <a
                      href="mailto:sales@summerlynadvisors.com"
                      className="text-primary-500 hover:text-primary-600"
                    >
                      sales@summerlynadvisors.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">LinkedIn</h3>
                    <a
                      href="#"
                      className="text-primary-500 hover:text-primary-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              <div className="card bg-gray-50">
                <h3 className="text-xl font-heading font-bold mb-4">What Happens Next?</h3>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="font-semibold text-primary-500 mr-3">1.</span>
                    <span className="text-gray-700">You'll receive a confirmation email</span>
                  </li>
                  <li className="flex">
                    <span className="font-semibold text-primary-500 mr-3">2.</span>
                    <span className="text-gray-700">I'll review your information</span>
                  </li>
                  <li className="flex">
                    <span className="font-semibold text-primary-500 mr-3">3.</span>
                    <span className="text-gray-700">We'll schedule a free 30-minute discovery call</span>
                  </li>
                  <li className="flex">
                    <span className="font-semibold text-primary-500 mr-3">4.</span>
                    <span className="text-gray-700">I'll prepare a tailored approach for your needs</span>
                  </li>
                </ol>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-heading font-bold mb-4">Quick Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What is fractional product management?</h4>
                    <p className="text-gray-600 text-sm">
                      Fractional product management provides part-time, senior-level product leadership (typically 10-20 hours/week) without the commitment and cost of a full-time hire.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What size companies do you work with?</h4>
                    <p className="text-gray-600 text-sm">
                      I work with early-stage startups through growth-stage companies, primarily in the healthcare and telehealth space.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
