import SEO from '../components/common/SEO';
import CTASection from '../components/common/CTASection';

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Learn about Summerlyn Advisors and our expertise in healthcare and telehealth product management."
        keywords="healthcare product manager, telehealth consultant, fractional product leadership"
        url="/about"
      />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            About
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Healthcare product leadership that combines deep domain expertise with proven execution
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              Why I Do This Work
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                Healthcare technology has the power to transform lives, but building successful healthcare products requires more than technical skill. It demands a deep understanding of clinical workflows, regulatory requirements, and the complex ecosystem of patients, providers, and payors.
              </p>
              <p>
                With years of experience in telehealth and healthcare technology, I've seen firsthand how the right product leadership can make the difference between a product that merely functions and one that truly improves patient outcomes and drives business success.
              </p>
              <p>
                My fractional approach allows me to bring senior product expertise to companies that need it most—startups and growing companies that aren't ready for a full-time product leader but need more than occasional consulting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Expertise */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-12 text-center">
              Experience & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-heading font-bold mb-4 text-primary-500">Healthcare Domain</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Telehealth platforms</li>
                  <li>• Remote patient monitoring</li>
                  <li>• EHR/EMR integration</li>
                  <li>• Patient engagement tools</li>
                  <li>• Clinical decision support</li>
                  <li>• HIPAA compliance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold mb-4 text-primary-500">Product Management</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Product strategy & roadmapping</li>
                  <li>• Agile/Scrum leadership</li>
                  <li>• Cross-functional team management</li>
                  <li>• Data-driven decision making</li>
                  <li>• User research & validation</li>
                  <li>• Go-to-market strategy</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold mb-4 text-primary-500">Technical Acumen</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Healthcare tech stacks</li>
                  <li>• FHIR & HL7 standards</li>
                  <li>• API integrations</li>
                  <li>• Security & compliance</li>
                  <li>• Cloud infrastructure</li>
                  <li>• Mobile health apps</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach/Philosophy */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-12 text-center">
              How I Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-heading font-bold mb-3">User-Centered</h3>
                <p className="text-gray-600">
                  Every decision starts with understanding the needs of patients and providers. I prioritize real-world usability over feature lists.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-heading font-bold mb-3">Data-Informed</h3>
                <p className="text-gray-600">
                  Combine quantitative metrics with qualitative insights to make informed decisions about what to build and how to build it.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-heading font-bold mb-3">Iterative & Agile</h3>
                <p className="text-gray-600">
                  Ship fast, learn quickly, and iterate. Healthcare moves quickly—your product development should too.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-heading font-bold mb-3">Collaborative & Transparent</h3>
                <p className="text-gray-600">
                  Strong product leadership means empowering teams, not dictating solutions. I work with your team, not around them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Let's Work Together"
        description="Ready to bring experienced product leadership to your healthcare company?"
        primaryCTA={{
          text: 'Get In Touch',
          link: '/contact',
        }}
      />
    </>
  );
}
