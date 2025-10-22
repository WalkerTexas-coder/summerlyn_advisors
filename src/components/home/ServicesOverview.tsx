import { services } from '../../data/services';
import Button from '../common/Button';
import Card from '../common/Card';

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            How I Can Help Your Healthcare Product Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive product management services tailored to the unique challenges of healthcare and telehealth
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-heading font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{service.shortDescription}</p>
              <Button to="/services" variant="secondary" className="w-full text-sm">
                Learn More
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
