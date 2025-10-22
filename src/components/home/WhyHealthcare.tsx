export default function WhyHealthcare() {
  const challenges = [
    { title: 'Regulatory Compliance', description: 'HIPAA, HITECH, FDA regulations for medical devices' },
    { title: 'Clinical Workflows', description: 'How providers actually work, not how we think they work' },
    { title: 'Patient Safety', description: 'Building features that improve care without introducing risk' },
    { title: 'Reimbursement', description: 'How products fit into complex payment models' },
    { title: 'Stakeholder Complexity', description: 'Patients, providers, payors, administrators—each with different needs' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6 text-center">
            Healthcare Product Management Is Different
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Healthcare product management requires more than general product skills. It demands understanding of:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {challenges.map((challenge, index) => (
              <div key={index} className="flex">
                <div className="text-primary-500 mr-3 text-2xl">✓</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{challenge.title}</h3>
                  <p className="text-gray-600">{challenge.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-700 text-center">
            I've been building healthcare products for years. I understand these challenges because I've navigated them successfully, from early-stage startups to established healthcare organizations.
          </p>
        </div>
      </div>
    </section>
  );
}
