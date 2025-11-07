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
              Hi, I'm Austin Walker
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                I've spent my career building healthcare and telehealth products from the ground up. Starting as a software engineer working in Ruby on Rails for men's health companies like Rugiet and FightingWeight, I developed a deep understanding of how healthcare technology actually gets built.
              </p>
              <p>
                As I moved into solutions engineering at CompoundLive, a telehealth SaaS platform, I learned how to bridge the gap between technical implementation and client needs—working both pre-sales and post-sales to ensure successful platform deployments.
              </p>
              <p>
                At Teligant, I took on my first technical product leadership role, taking a telehealth SaaS platform from concept to launch (0→1). This experience taught me how to build healthcare products that are both technically sound and commercially viable.
              </p>
              <p>
                Most recently as Product Manager at Hedfirst, an AI-first telehealth company for complex diagnoses, I've handled the full spectrum of product challenges: achieving LegitScript and SureScripts certification, integrating with Dosespot, ShipStation, and pharmacy systems, training medical and sales teams, and presenting roadmaps to the C-suite.
              </p>
              <p>
                Now through Summerlyn Advisors, I bring this unique combination of engineering depth, solutions expertise, and senior product leadership to healthcare companies that need experienced guidance without the full-time commitment.
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
                  <li>• Direct-to-consumer telehealth</li>
                  <li>• Men's health (ED, weight management)</li>
                  <li>• Complex/hard-to-diagnose conditions</li>
                  <li>• Compound medication platforms</li>
                  <li>• LegitScript & SureScripts certification</li>
                  <li>• Pharmacy integrations & workflows</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold mb-4 text-primary-500">Product Management</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 0→1 product development</li>
                  <li>• Roadmapping & C-suite presentations</li>
                  <li>• Medical & sales team training</li>
                  <li>• Cross-functional team leadership</li>
                  <li>• Compliance & regulatory navigation</li>
                  <li>• Pre & post-sales solutions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold mb-4 text-primary-500">Technical Expertise</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Ruby on Rails development</li>
                  <li>• Dosespot & pharmacy integrations</li>
                  <li>• ShipStation & fulfillment systems</li>
                  <li>• SureScripts e-prescribing</li>
                  <li>• Telehealth SaaS platforms</li>
                  <li>• AI-assisted diagnostics</li>
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
