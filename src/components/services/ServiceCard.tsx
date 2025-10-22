import Button from '../common/Button';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="card h-full flex flex-col">
      <div className="text-5xl mb-4">{service.icon}</div>
      <h3 className="text-2xl font-heading font-bold mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.shortDescription}</p>

      {service.included && service.included.length > 0 && (
        <>
          <h4 className="font-semibold mb-2">What's Included:</h4>
          <ul className="space-y-2 mb-4 text-sm text-gray-600 flex-grow">
            {service.included.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary-500 mr-2 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {service.forWho && (
        <div className="mb-4 text-sm">
          <span className="font-semibold text-gray-700">For: </span>
          <span className="text-gray-600">{service.forWho}</span>
        </div>
      )}

      {service.outcomes && (
        <div className="mb-6 text-sm">
          <span className="font-semibold text-gray-700">Outcomes: </span>
          <span className="text-gray-600">{service.outcomes}</span>
        </div>
      )}

      <Button to={service.ctaLink} variant="secondary" className="w-full mt-auto">
        {service.ctaText}
      </Button>
    </div>
  );
}
