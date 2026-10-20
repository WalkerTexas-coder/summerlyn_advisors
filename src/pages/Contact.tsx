import SEO from '../components/SEO';
import { ContactForm } from '../components/forms';
import { PageHeader } from '../components/ui';
import { CONTACT_EMAIL } from '../data/callListOffer';

export default function Contact() {
  return (
    <>
      <SEO title="Contact" description="Questions about Summerlyn Call Lists or advisory work? Get in touch." url="/contact" />
      <PageHeader eyebrow="Contact" title={<>Let’s talk about <span className="serif-accent">your daily calls.</span></>}>
        Questions about Call Lists, a custom order, or advisory work. We reply within one business day.
      </PageHeader>
      <section className="container-x grid gap-10 lg:grid-cols-[2fr_1fr] pb-20">
        <ContactForm />
        <aside className="card h-fit text-sm space-y-3">
          <p className="eyebrow">Email</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="block text-white break-all hover:text-brand-300">{CONTACT_EMAIL}</a>
          <p className="text-zinc-500">Summerlyn Advisors LLC · Texas</p>
        </aside>
      </section>
    </>
  );
}
