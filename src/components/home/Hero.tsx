import Button from '../common/Button';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-20 md:py-32">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6">
            Fractional Product Leadership for Healthcare & Telehealth Companies
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Expert product strategy and execution without the full-time commitment.
            I help healthcare startups and scale-ups build products that improve patient
            outcomes and drive business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact" variant="primary">
              Schedule a Discovery Call
            </Button>
            <Button to="/services" variant="secondary">
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
