import Button from './Button';

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCTA: {
    text: string;
    link: string;
  };
  secondaryCTA?: {
    text: string;
    link: string;
  };
}

export default function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA
}: CTASectionProps) {
  return (
    <section className="bg-gradient-to-r from-primary-500 to-primary-600 py-16">
      <div className="container-custom text-center text-white">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button to={primaryCTA.link} variant="accent">
            {primaryCTA.text}
          </Button>
          {secondaryCTA && (
            <Button to={secondaryCTA.link} variant="secondary" className="bg-white text-primary-500 hover:bg-gray-100">
              {secondaryCTA.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
