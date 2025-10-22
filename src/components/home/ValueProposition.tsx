export default function ValueProposition() {
  const benefits = [
    {
      icon: '🏥',
      title: 'Healthcare Expertise You Can\'t Find Elsewhere',
      description: 'Deep understanding of HIPAA compliance, clinical workflows, provider dynamics, and patient experience. I speak the language of healthcare and technology.',
    },
    {
      icon: '⚡',
      title: 'Flexibility That Scales With You',
      description: 'Start with 10-20 hours per week. Scale up during critical launches. Scale down after major milestones. No overhead of a full-time hire, all the expertise of a senior product leader.',
    },
    {
      icon: '✅',
      title: 'Proven Results in Healthcare',
      description: 'Track record of successful telehealth launches, improved patient engagement, streamlined clinical workflows, and products that achieve regulatory compliance without sacrificing user experience.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Why Healthcare Companies Choose Fractional Product Leadership
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-heading font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
