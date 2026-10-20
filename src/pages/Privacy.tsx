import { openCookieSettings } from '../lib/consent';
import { LegalPage } from './Legal';

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" url="/privacy" description="How Summerlyn Advisors LLC collects, uses, and shares information, including with third-party AI service providers.">
      <p>This Privacy Policy explains how <strong>Summerlyn Advisors LLC</strong> (“Summerlyn,” “we,” “us”), a Texas limited liability company based in Leander, Texas, collects, uses, shares, and protects information through summerlynadvisors.com and the Summerlyn Call Lists service.</p>

      <h2>1. Information we collect</h2>
      <ul>
        <li><strong>Customer information:</strong> name, business email, calendar email, company, website, timezone, delivery preferences, and messages you send us.</li>
        <li><strong>Onboarding and lead data:</strong> what you sell, your ideal customer profile, target industries, titles, company size, geography, competitors, exclusions, and any customer or lead lists you paste, upload, or link (“Lead Data”).</li>
        <li><strong>Payment information:</strong> processed by Stripe. We receive billing name, address, email, and transaction details, but not your full card number.</li>
        <li><strong>Business contact information about prospects:</strong> names, titles, employers, business phone numbers, and related public business information we research from public and licensed sources to deliver the Service.</li>
        <li><strong>Technical information:</strong> basic logs (such as IP address, browser, pages visited) collected by our hosting provider, and analytics only if you consent (see Cookies).</li>
      </ul>

      <h2>2. How we use information</h2>
      <p>We use information to provide, research, and deliver the Service; send daily emails and calendar invitations; process payments and taxes; communicate with you; prevent fraud and abuse; comply with law; and improve the Service.</p>

      <h2>3. How we share information, including with AI service providers</h2>
      <p><strong>We share customer information and Lead Data with third-party artificial intelligence (AI) service providers to process it and to research prospects on your behalf.</strong> For example, we send your ideal customer profile, onboarding answers, Lead Data, and prospect research to AI model and agent providers to analyze fit, find and summarize public business information, de-duplicate and rank contacts, and draft call playbooks. These providers process the data on our behalf to deliver the Service.</p>
      <p>We also share information with these categories of service providers:</p>
      <ul>
        <li><strong>Stripe</strong>, for payment processing, subscriptions, and tax calculation.</li>
        <li><strong>Vercel</strong>, for website hosting and delivery.</li>
        <li><strong>Email and calendar providers</strong>, to send daily emails and calendar invitations and to receive your messages.</li>
        <li><strong>Data, research, and form providers</strong>, such as public and licensed business data sources and form-submission services.</li>
        <li><strong>Professional advisors and authorities</strong>, when required by law, to enforce our Terms, or to protect rights and safety.</li>
        <li><strong>A successor</strong>, in connection with a merger, acquisition, or sale of assets, subject to this Policy.</li>
      </ul>
      <p><strong>We do not sell personal data</strong>, and we do not share personal data for cross-context behavioral advertising. We do not use your Lead Data to serve other customers.</p>

      <h2>4. Data protection measures</h2>
      <p>We use reasonable administrative, technical, and physical safeguards, including encryption in transit (HTTPS/TLS), access limited to people and providers who need it, reputable providers with their own security programs, account access controls, and data minimization (we only send providers what is needed for the task). No method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>

      <h2>5. Retention</h2>
      <p>We keep customer information and Lead Data for as long as your subscription is active and for up to 12 months afterward to handle support, replacements, and de-duplication, unless you ask us to delete it sooner. We keep billing and tax records as long as required by law (generally up to 7 years). Suppression lists (people who asked not to be contacted) are kept as long as needed to honor those requests. Our providers may retain data according to their own policies and our agreements with them.</p>

      <h2>6. Your rights and choices</h2>
      <p>Depending on where you live, you may have the right to access, correct, delete, or obtain a copy of your personal data; to opt out of the sale of personal data, targeted advertising, or profiling with legal or similarly significant effects; and to appeal our decision on a request.</p>
      <ul>
        <li><strong>California (CCPA/CPRA):</strong> California residents may request to know, delete, and correct personal information, and to limit use of sensitive personal information. We do not sell or share personal information as those terms are defined, and we will not discriminate against you for exercising your rights.</li>
        <li><strong>Texas (Texas Data Privacy and Security Act, TDPSA):</strong> Texas residents may confirm whether we process their personal data and access, correct, delete, or obtain a portable copy of it, and opt out of sale, targeted advertising, and certain profiling, where the TDPSA applies. If we decline a request, you may appeal by replying to our decision; if the appeal is denied, you may contact the Texas Attorney General.</li>
        <li><strong>Prospects:</strong> if you are a business professional and want us to stop including you in deliveries, email us and we will add you to our suppression list.</li>
      </ul>
      <p>To make a request, email us at the address below. We will verify your request and respond within the time required by law (generally 45 days). Authorized agents may submit requests with proof of authorization.</p>

      <h2 id="cookies">7. Cookies and similar technologies</h2>
      <p>We use <strong>strictly necessary</strong> browser storage to run the site, such as remembering your cookie choice and whether you have seen a pop-up. With your consent, we may use <strong>analytics</strong> cookies to understand site usage. <strong>Non-essential cookies and analytics do not load until you click “Accept”</strong>, and you can change your choice anytime via “Cookie settings” in the footer. Stripe may set its own cookies on its checkout pages under its privacy policy.</p>
      <p><button type="button" onClick={openCookieSettings} className="btn-ghost !py-2">Open cookie settings</button></p>

      <h2>8. Children</h2>
      <p>The Service is for businesses and is not directed to children under 16. We do not knowingly collect their personal data.</p>

      <h2>9. Changes</h2>
      <p>We may update this Policy and will post the new version with a new effective date. Material changes will be emailed to subscribers.</p>
    </LegalPage>
  );
}
