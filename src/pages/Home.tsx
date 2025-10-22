import SEO from '../components/common/SEO';
import CTASection from '../components/common/CTASection';
import Hero from '../components/home/Hero';
import ValueProposition from '../components/home/ValueProposition';
import ServicesOverview from '../components/home/ServicesOverview';
import WhyHealthcare from '../components/home/WhyHealthcare';

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Fractional Product Management & Technical Product Consulting for Healthcare & Telehealth Companies. Expert product strategy and execution without the full-time commitment."
        keywords="fractional product manager, healthcare product management, telehealth consultant, healthcare product strategy"
        url="/"
      />
      <Hero />
      <ValueProposition />
      <ServicesOverview />
      <WhyHealthcare />
      <CTASection
        title="Ready to Move Your Healthcare Product Forward?"
        description="Let's discuss how fractional product leadership can accelerate your product development and help you build healthcare solutions that truly make a difference."
        primaryCTA={{
          text: 'Schedule a Free Discovery Call',
          link: '/contact',
        }}
      />
    </>
  );
}
