import { Link } from 'react-router-dom';
import { LegalPage } from './Legal';

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" url="/terms" description="Terms of Service for Summerlyn Call Lists daily call subscriptions, provided by Summerlyn Advisors LLC.">
      <p>These Terms of Service (“Terms”) govern your use of the Summerlyn Call Lists service and summerlynadvisors.com (together, the “Service”), provided by <strong>Summerlyn Advisors LLC</strong>, a Texas limited liability company based in Leander, Texas (“Summerlyn,” “we,” “us”). By checking out, subscribing, or using the Service, you agree to these Terms on behalf of yourself and the business you represent (“you,” “Customer”). If you do not agree, do not use the Service.</p>

      <h2>1. The Service</h2>
      <p>Summerlyn provides a business-to-business research service. Each weekday (Monday through Friday, excluding US federal holidays) we email you a set number of researched business prospects according to your plan, delivered as calendar invitations that may include a name, business phone number, why the contact was selected, a reason to call now, and a suggested call playbook. The Service is for B2B use only. We do not make calls on your behalf.</p>

      <h2>2. Subscriptions and billing</h2>
      <ul>
        <li><strong>Monthly billing.</strong> Plans are billed in advance on a recurring monthly basis through our payment processor, Stripe, starting on the day you subscribe, and renew automatically each month until cancelled.</li>
        <li><strong>Price and taxes.</strong> Prices are shown on our website at checkout and exclude applicable taxes, which we may collect where required (including Texas sales tax). We may change prices with at least 30 days’ notice by email; changes take effect at your next renewal.</li>
        <li><strong>Cancel anytime.</strong> You may cancel at any time by emailing us or through any billing portal we provide. Cancellation takes effect at the end of your current paid monthly period, and deliveries continue through that period.</li>
        <li><strong>No refunds for partial months.</strong> Fees are non-refundable. <strong>We do not provide refunds or credits for partial months, unused deliveries, or days on which you do not make calls</strong>, except where required by law.</li>
        <li><strong>Failed payments.</strong> If a payment fails, we may pause deliveries until payment is made.</li>
        <li><strong>Holidays and volume.</strong> No deliveries are made on weekends or US federal holidays, and there are no make-up deliveries for those days.</li>
      </ul>

      <h2>3. Onboarding and your information</h2>
      <p>You agree to provide accurate onboarding information (such as your ideal customer profile, exclusions, and calendar email). If you upload, paste, or link customer or lead data, you represent that you lawfully obtained it and have the right to share it with us and our service providers, including third-party AI service providers, for the purpose of delivering the Service. Our handling of information is described in our <Link to="/privacy">Privacy Policy</Link>.</p>

      <h2>4. Your compliance responsibilities (TCPA, Do-Not-Call)</h2>
      <p><strong>You are solely responsible for how you contact anyone in our deliveries</strong>, including compliance with the Telephone Consumer Protection Act (TCPA), the Telemarketing Sales Rule, the National Do-Not-Call Registry, state telemarketing and do-not-call laws (including Texas law), CAN-SPAM, and any other applicable laws. You are responsible for scrubbing against any do-not-call lists you are required to honor, maintaining your own internal do-not-call list, honoring opt-out requests, and obtaining any registrations or consents required for your calling. Any phone-type or do-not-call labels we provide are informational and may be incomplete. Nothing we provide is legal advice.</p>

      <h2>5. Acceptable use</h2>
      <ul>
        <li>The Service is intended for <strong>human, manually dialed, one-to-one business calls only</strong>.</li>
        <li>You must not use any information from the Service with <strong>robocalls, prerecorded or artificial voice messages, automatic telephone dialing systems, predictive dialers, or autodialers</strong>, or for unsolicited text message campaigns.</li>
        <li>You must not use the Service to contact consumers for personal, family, or household purposes, to harass anyone, for any unlawful, deceptive, or discriminatory purpose, or to make decisions about credit, employment, insurance, or housing.</li>
        <li>You must not resell, publish, or share deliveries with third parties outside your organization, or use them to build a competing database.</li>
      </ul>
      <p>We may suspend or terminate the Service without refund if we reasonably believe you have violated this section.</p>

      <h2>6. Accuracy disclaimer</h2>
      <p>Deliveries are compiled from public and licensed business sources and with the help of automated tools, including AI. Information about people and companies changes frequently. <strong>We do not guarantee that any information is accurate, complete, or current, or that any call will result in a meeting, sale, or other outcome.</strong> Suggested playbooks are suggestions only. You should independently verify information before relying on it. If you report a wrong number or departed contact, we will try to replace it as described on our website, which is your sole remedy for inaccurate data.</p>

      <h2>7. Intellectual property</h2>
      <p>We grant you a non-exclusive, non-transferable license to use deliveries internally for your own business during and after your subscription, subject to these Terms. The website, our methods, templates, and branding remain our property.</p>

      <h2>8. Disclaimer of warranties</h2>
      <p>THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE FULLEST EXTENT PERMITTED BY LAW, SUMMERLYN DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, AND NON-INFRINGEMENT.</p>

      <h2>9. Limitation of liability</h2>
      <p>TO THE FULLEST EXTENT PERMITTED BY LAW, SUMMERLYN AND ITS MEMBERS, MANAGERS, AND CONTRACTORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE, DATA, OR GOODWILL, ARISING FROM OR RELATED TO THE SERVICE. OUR TOTAL LIABILITY FOR ALL CLAIMS RELATED TO THE SERVICE WILL NOT EXCEED THE AMOUNT YOU PAID US IN THE THREE (3) MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM.</p>

      <h2>10. Indemnification</h2>
      <p>You will defend, indemnify, and hold harmless Summerlyn from any claims, fines, penalties, damages, and costs (including reasonable attorneys’ fees) arising from your calls, messages, or other contact with any person, your violation of the TCPA, do-not-call, or other laws, data you provide to us, or your breach of these Terms.</p>

      <h2>11. Governing law and venue</h2>
      <p>These Terms are governed by the laws of the State of Texas, without regard to its conflict-of-laws rules. Any dispute arising from or relating to these Terms or the Service will be brought exclusively in the state or federal courts located in <strong>Williamson County, Texas</strong>, and you consent to the personal jurisdiction of those courts.</p>

      <h2>12. Changes and general terms</h2>
      <p>We may update these Terms by posting a revised version with a new effective date; material changes will be emailed to subscribers and apply from your next billing period. If any provision is unenforceable, the rest remains in effect. These Terms, together with our Privacy Policy, are the entire agreement between you and Summerlyn about the Service.</p>
    </LegalPage>
  );
}
