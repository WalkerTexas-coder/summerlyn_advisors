# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Summerlyn Advisors Website Development Guide

## Project Overview

Build a professional consulting website for Summerlyn Advisors, a fractional product management and technical product consulting firm specializing in telehealth and healthcare technology.

**IMPORTANT: This project uses TypeScript.** All component files should use `.tsx` extension (not `.jsx`), and type safety should be maintained throughout the codebase.

## Business Context

**Company:** Summerlyn Advisors
**Owner:** Job-seeking product manager with extensive telehealth/healthcare experience
**Primary Goal:** Attract contract positions and consulting clients
**Target Audience:** Healthcare startups, telehealth companies, and established healthcare organizations needing fractional product leadership

**Value Proposition:** Fractional Product Management & Technical Product Consulting for Healthcare & Telehealth Companies

## Technical Requirements

### Tech Stack
**Framework:** React 18+ with Vite + TypeScript
**Language:** TypeScript
**Deployment:** Vercel
**Styling:** CSS Modules or Tailwind CSS (recommend Tailwind for rapid development)
**Routing:** React Router v6
**Forms:** React Hook Form + Formspree/Web3Forms
**Animations:** Framer Motion (optional, for scroll animations)
**Icons:** React Icons or Lucide React

### Development Commands
```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production (TypeScript compilation + Vite build)
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

### TypeScript Configuration
This project uses TypeScript for type safety and better developer experience:
- All React components use `.tsx` extension
- Utility files and hooks use `.ts` extension
- Type definitions are centralized in `src/types/`
- Build process: `tsc -b` (TypeScript compile) → `vite build` (bundle)
- Type errors will prevent production builds from succeeding
- Three TypeScript config files:
  - `tsconfig.json` - Base configuration
  - `tsconfig.app.json` - Application source code settings
  - `tsconfig.node.json` - Vite config and tooling settings

### Project Setup
```bash
# Project is already initialized with TypeScript
# To install additional dependencies:
npm install react-router-dom
npm install react-hook-form
npm install react-helmet-async

# Optional dependencies:
npm install framer-motion
npm install react-icons
npm install -D tailwindcss postcss autoprefixer

# If adding Tailwind CSS:
npx tailwindcss init -p
```

### Core Requirements
- Responsive design (mobile-first)
- Fast loading (<3 seconds, optimized by Vite)
- Accessible (WCAG 2.1 AA compliant)
- SEO optimized (React Helmet Async for meta tags)
- Server-side rendering consideration (Vercel handles SSR/SSG well)
- Contact form with email integration (Formspree or Web3Forms)
- Environment variables for API keys (via Vercel)

### Browser Support
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile Safari and Chrome
- ES6+ with Vite's automatic transpilation

## Site Structure

### Priority 1: Must-Have Pages

#### 1. Homepage (`index.html`)
**Purpose:** Immediately communicate relevancy, establish credibility, create interest

**Sections:**
1. **Hero Section**
   - Headline: "Fractional Product Leadership for Healthcare & Telehealth Companies"
   - Subheadline: "Expert product strategy and execution without the full-time commitment. Helping healthcare startups and scale-ups build products that improve patient outcomes."
   - Primary CTA: "Schedule a Discovery Call"
   - Secondary CTA: "View Services"
   - Background: Clean, modern, healthcare-themed (NOT generic stock photos)

2. **Value Proposition Section**
   - Three key benefits with icons:
     * "Healthcare Expertise" - Understanding of HIPAA, clinical workflows, and patient experience
     * "Fractional Flexibility" - 10-20 hours/week, scale up or down as needed
     * "Proven Results" - Track record of successful product launches and improvements
   
3. **Services Overview**
   - Brief intro: "What I Can Do For You"
   - 4 service cards (each links to Services page):
     * Strategic Product Planning
     * Product Execution & Leadership
     * Go-to-Market Strategy
     * Healthcare/Telehealth Specialization
   - Each card: icon, title, 2-3 sentence description, "Learn More" link

4. **Client Logos / Social Proof**
   - Section title: "Trusted By" or "Experience Includes Work With"
   - Logo grid (placeholder for now - can be added later)
   - Alternative if no logos yet: "Experience across telehealth platforms, EHR integrations, and patient engagement tools"

5. **Testimonial Highlight**
   - 1-2 powerful testimonials
   - Include: Quote, Name, Title, Company (or anonymous with just title/industry)
   - Focus on results/outcomes

6. **Why Healthcare Matters**
   - Brief section explaining healthcare product management specialization
   - "Unlike generalist consultants, I understand the unique challenges of healthcare product development: regulatory compliance, clinical workflows, patient safety, and reimbursement complexities."

7. **Call to Action**
   - Final section before footer
   - "Ready to move your healthcare product forward?"
   - Primary CTA button: "Schedule a Discovery Call"
   - Secondary text: "Or email me at [email]"

#### 2. Services Page (`services.html`)
**Purpose:** Clearly explain service offerings and engagement models

**Sections:**
1. **Page Header**
   - Title: "Services"
   - Subtitle: "Flexible product leadership tailored to your healthcare company's needs"

2. **Service 1: Strategic Product Planning**
   - What's included:
     * Product vision and roadmap development
     * Market and competitive analysis
     * User research and validation
     * Feature prioritization frameworks
     * Stakeholder alignment
   - Who it's for: Early-stage startups, companies launching new products
   - Expected outcomes: Clear product direction, validated strategy, aligned team
   - CTA: "Discuss Your Strategy Needs"

3. **Service 2: Product Execution & Team Leadership**
   - What's included:
     * Sprint planning and agile coaching
     * Cross-functional team coordination
     * Product backlog management
     * KPI definition and tracking
     * Process optimization
   - Who it's for: Growing companies, teams without product leadership
   - Expected outcomes: Increased velocity, better team alignment, on-time delivery
   - CTA: "Get Execution Support"

4. **Service 3: Go-to-Market Strategy**
   - What's included:
     * Product positioning and messaging
     * Launch planning and execution
     * Pricing strategy
     * Sales enablement
     * Early customer acquisition
   - Who it's for: Companies approaching launch, products needing repositioning
   - Expected outcomes: Successful launches, clear market fit, early traction
   - CTA: "Plan Your Launch"

5. **Service 4: Healthcare/Telehealth Specialization**
   - What makes healthcare different:
     * HIPAA compliance and security requirements
     * Clinical workflow integration
     * Patient experience optimization
     * Provider and payor dynamics
     * Regulatory navigation
   - Specific expertise areas:
     * Virtual care platforms
     * Remote patient monitoring
     * EHR/EMR integration
     * Patient engagement tools
     * Clinical decision support
   - CTA: "Leverage Healthcare Expertise"

6. **Engagement Models**
   - **Fractional:** 10-20 hours/week, ongoing engagement
   - **Project-Based:** Defined scope and timeline
   - **Retainer:** Monthly retainer for on-demand support
   - Brief description of each with typical use cases

7. **Process Overview**
   - How we work together:
     1. Discovery Call (free, 30 minutes)
     2. Needs Assessment & Proposal
     3. Engagement Kickoff
     4. Regular Cadence & Deliverables
     5. Ongoing Optimization
   - CTA: "Start the Conversation"

#### 3. About Page (`about.html`)
**Purpose:** Build trust through expertise, experience, and personal connection

**Sections:**
1. **Page Header**
   - Professional photo (placeholder for now)
   - Name and title
   - One-line bio

2. **Story Section**
   - "Why I Do This Work"
   - 2-3 paragraphs about passion for healthcare technology, journey to fractional consulting
   - Focus on client outcomes, not just career history

3. **Experience & Expertise**
   - **Healthcare Domain Knowledge:**
     * Years in telehealth/healthcare
     * Specific areas (virtual care, RPM, patient engagement, etc.)
     * Understanding of regulatory landscape
   - **Product Management Expertise:**
     * Product strategy and roadmapping
     * Agile/Scrum leadership
     * Cross-functional team management
     * Data-driven decision making
   - **Technical Acumen:**
     * Understanding of healthcare tech stacks
     * Integration challenges (EHR, FHIR, HL7)
     * Security and compliance requirements

4. **Approach/Philosophy**
   - "How I Work"
   - 3-4 principles:
     * User-centered (patients and providers)
     * Data-informed decisions
     * Iterative and agile
     * Collaborative and transparent

5. **Credentials**
   - Relevant certifications (if any)
   - Notable companies worked with
   - Education
   - Professional associations

6. **Personal Touch**
   - 2-3 sentences about life outside work
   - Makes you relatable and human

7. **CTA**
   - "Let's work together"
   - Link to contact page

#### 4. Contact Page (`contact.html`)
**Purpose:** Make it easy to get in touch and set clear expectations

**Sections:**
1. **Page Header**
   - Title: "Let's Talk"
   - Subtitle: "Ready to discuss how fractional product leadership can accelerate your healthcare product?"

2. **Contact Form**
   - Fields:
     * Name (required)
     * Email (required)
     * Company (optional)
     * Phone (optional)
     * How did you hear about us? (dropdown)
     * Message (required, with prompt: "Tell me about your product and what challenges you're facing")
   - Submit button: "Send Message"
   - Note: "I typically respond within 24 hours"

3. **Alternative Contact Methods**
   - Email: [email placeholder]
   - LinkedIn: [profile URL placeholder]
   - Optional: Calendly embed for direct scheduling

4. **What Happens Next**
   - Clear expectations:
     1. You'll receive a confirmation email
     2. I'll review your information
     3. We'll schedule a free 30-minute discovery call
     4. I'll prepare a tailored approach for your needs

5. **FAQ Teaser**
   - "Common Questions"
   - 2-3 quick FAQs with links to full FAQ page:
     * "What is fractional product management?"
     * "What size companies do you work with?"
     * "How do you ensure confidentiality?"

### Priority 2: Should-Have Pages

#### 5. Case Studies Page (`case-studies.html`)
**Purpose:** Demonstrate real-world impact and results

**Structure:**
- Each case study includes:
  * Project title (can be anonymized)
  * Client type (e.g., "Series A Telehealth Startup")
  * The Challenge (2-3 sentences)
  * The Approach (bullet points of what you did)
  * The Results (metrics and outcomes)
  * Healthcare-specific callout (compliance, clinical workflows, etc.)

**Placeholder Case Studies (to be filled with real examples):**
1. **Case Study 1: Telehealth Platform Launch**
   - Challenge: Early-stage startup needed to launch MVP quickly while ensuring HIPAA compliance
   - Approach: Led product strategy, coordinated development team, managed regulatory requirements
   - Results: Launched in 4 months, achieved 95% patient satisfaction, zero compliance issues

2. **Case Study 2: Patient Engagement App Optimization**
   - Challenge: Low user retention despite high download numbers
   - Approach: Conducted user research, identified friction points, redesigned onboarding
   - Results: Increased 30-day retention by 45%, improved app store rating from 3.2 to 4.6

3. **Case Study 3: Clinical Workflow Integration**
   - Challenge: Provider resistance to new tool due to workflow disruption
   - Approach: Mapped existing workflows, redesigned integration points, trained early adopters
   - Results: Provider adoption increased from 15% to 78% in 3 months

#### 6. Resources/Blog Page (`resources.html`)
**Purpose:** Demonstrate thought leadership and provide value

**Initial Content Ideas:**
- "10 Questions Every Healthcare Startup Should Ask Before Building a Product"
- "The Hidden Costs of Ignoring Clinical Workflow in Product Design"
- "HIPAA Compliance for Product Managers: What You Need to Know"
- "Why Your Telehealth Product Needs a Fractional PM"
- "Measuring What Matters: Healthcare Product Metrics That Drive Growth"

**Structure:**
- Blog-style layout with article cards
- Each card: title, excerpt, read time, publish date, "Read More" link
- Tags/categories for filtering (Strategy, Healthcare, Telehealth, Product Management)

#### 7. How We Work / Pricing Page (`pricing.html`)
**Purpose:** Set clear expectations and build trust through transparency

**Sections:**
1. **Engagement Models**
   - Detailed explanation of each model:
     * **Fractional Engagement:** 10-20 hrs/week, 3-6 month minimum, $X-Y range
     * **Project-Based:** Fixed scope, 4-12 weeks, $X-Y range
     * **Advisory Retainer:** Monthly retainer, 5-10 hrs/month, $X/month
   
2. **What's Included**
   - All engagements include:
     * Regular sync meetings
     * Slack/email access
     * Documentation and deliverables
     * Strategic recommendations
     * Team collaboration

3. **What's NOT Included**
   - Clear boundaries:
     * Not hands-on coding/development
     * Not full-time availability
     * Not employee benefits management
     * Not legal or regulatory compliance advice (but can help navigate)

4. **Investment & ROI**
   - "Why Fractional Makes Sense"
   - Cost comparison: Fractional vs. Full-time PM
   - ROI examples: "Clients typically see $3-5 return for every $1 invested through faster time-to-market, reduced waste, and improved product-market fit"

5. **CTA**
   - "Ready to discuss your needs?"
   - Button: "Schedule Discovery Call"

### Priority 3: Optional Pages

#### 8. FAQ Page (`faq.html`)
**Categories:**
- About Fractional Product Management
- Working Together
- Healthcare Expertise
- Confidentiality & Security

**Sample FAQs:**
- What is fractional product management?
- How is this different from hiring a full-time PM?
- What size companies do you work with?
- Do you sign NDAs?
- How do you handle confidential health information?
- Can you work with our existing team?
- What if we want to hire you full-time later?
- Do you have experience with [specific healthcare area]?

#### 9. Newsletter Signup Page (`newsletter.html`)
**Lead Magnet Idea:** "The Healthcare PM Starter Kit: 10 Frameworks for Building Better Healthcare Products"

**Form:**
- Email signup
- First name
- Role/Title
- What they're interested in (checkboxes: Strategy, Telehealth, Compliance, Team Leadership)

## Design Guidelines

### Brand Identity (To Be Defined by Owner)

**Colors (Suggested):**
- Primary: Professional blue (trust, healthcare) - #0066CC
- Secondary: Teal/turquoise (health, vitality) - #00B4B4
- Accent: Warm orange (energy, innovation) - #FF6B35
- Neutrals: Dark gray #2C3E50, Medium gray #7F8C8D, Light gray #ECF0F1
- Background: White #FFFFFF

**Typography:**
- Headings: Modern sans-serif (e.g., Inter, Poppins, or Montserrat)
- Body: Clean, readable sans-serif (e.g., Open Sans, Lato, or system fonts)
- Font sizes: Responsive scale (16px base, scale up for headings)

**Imagery Style:**
- Modern, authentic healthcare imagery (NOT cheesy stock photos)
- Focus on: Technology + healthcare, collaboration, patient care
- Diverse representation
- Professional but approachable

**Design Principles:**
- Clean, uncluttered layouts
- Plenty of white space
- Mobile-first responsive design
- Clear visual hierarchy
- Prominent CTAs
- Fast loading (optimized images)

### Component Library

**Buttons:**
- Primary CTA: Bold, high contrast, clear hover states
- Secondary CTA: Outlined or ghost style
- Minimum touch target: 44x44px

**Cards:**
- Services cards: Icon/image, title, description, CTA
- Case study cards: Visual, title, excerpt, "Read More"
- Testimonial cards: Quote, attribution, photo (optional)

**Forms:**
- Clear labels
- Helpful placeholder text
- Validation messages
- Accessible error states
- Privacy note: "Your information is confidential and never shared"

**Navigation:**
- Desktop: Horizontal nav with logo left, links right, CTA button
- Mobile: Hamburger menu, full-screen overlay
- Sticky/fixed on scroll (optional)
- Clear active page indicator

**Footer:**
- Links to all pages
- Social media icons (LinkedIn primarily)
- Email contact
- Copyright
- Privacy policy link (even if just a basic one)

## Content Guidelines

### Voice & Tone
- **Professional but approachable:** Expert without being academic
- **Confident but not arrogant:** Share expertise without overselling
- **Client-focused:** Talk about their needs, not just your credentials
- **Healthcare-literate:** Use industry terminology appropriately, but define when needed
- **Action-oriented:** Focus on outcomes and results

### Writing Style
- Short paragraphs (2-4 sentences)
- Bullet points for scannability
- Active voice
- Specific examples and metrics when possible
- Conversational without being casual
- Avoid jargon overload

### SEO Keywords (Target)
- Fractional product manager healthcare
- Telehealth product consultant
- Healthcare product management consultant
- Fractional CPO healthcare
- Telehealth product strategy
- Healthcare product leadership
- Remote patient monitoring consultant
- Virtual care product management

### Content Placeholders
Use these placeholders throughout the site - owner will provide real content:

- `[Owner Name]` - Consultant's name
- `[Owner Email]` - Contact email
- `[Owner LinkedIn]` - LinkedIn profile URL
- `[Owner Photo]` - Professional headshot
- `[Client Logo]` - Client logos for social proof
- `[Testimonial]` - Client testimonials
- `[Case Study Details]` - Real project examples
- `[Specific Healthcare Experience]` - Detailed experience areas

## Technical Implementation

### Project Structure
```
summerlyn-advisors/
├── public/
│   ├── favicon.ico
│   ├── images/
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── about/
│   │   └── case-studies/
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Layout.tsx
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Testimonial.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── ContactForm.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── ValueProposition.tsx
│   │   │   ├── ServicesOverview.tsx
│   │   │   ├── ClientLogos.tsx
│   │   │   └── WhyHealthcare.tsx
│   │   ├── services/
│   │   │   ├── ServiceCard.tsx
│   │   │   └── EngagementModels.tsx
│   │   ├── about/
│   │   │   ├── Story.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── Philosophy.tsx
│   │   └── case-studies/
│   │       └── CaseStudyCard.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── Resources.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   └── Newsletter.tsx
│   ├── hooks/
│   │   ├── useScrollAnimation.ts
│   │   └── useFormSubmit.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   └── seo.ts
│   ├── types/
│   │   ├── service.ts
│   │   ├── testimonial.ts
│   │   ├── caseStudy.ts
│   │   └── index.ts
│   ├── styles/
│   │   ├── index.css
│   │   └── tailwind.css (if using Tailwind)
│   ├── data/
│   │   ├── services.ts
│   │   ├── caseStudies.ts
│   │   ├── testimonials.ts
│   │   └── faqs.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── routes.tsx
│   └── vite-env.d.ts
├── .env.example
├── .env.local (gitignored)
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── vercel.json
├── tailwind.config.js (if using Tailwind)
├── postcss.config.js (if using Tailwind)
└── README.md
```

**Note:** All files use TypeScript extensions (`.ts`/`.tsx`). Create a `src/types/` directory for shared TypeScript interfaces and types.

### React Component Architecture

**Layout Components:**
- `Layout.jsx` - Wraps all pages with Header and Footer
- `Header.jsx` - Logo, navigation, mobile menu
- `Footer.jsx` - Links, social media, copyright
- `Navigation.jsx` - Reusable nav logic

**Common/Reusable Components:**
- `Button.jsx` - Primary, secondary, and tertiary button variants
- `Card.jsx` - Reusable card component for services, case studies, etc.
- `Testimonial.jsx` - Testimonial display component
- `CTASection.jsx` - Call-to-action sections used throughout site
- `ContactForm.jsx` - Form with validation and submission logic
- `SEO.jsx` - Component for managing meta tags per page

**Page-Specific Components:**
- Components organized by page in `/components/[page-name]/`
- Each page can have multiple sub-components
- Keep components focused and single-responsibility

**Data Management:**
- Static data (services, testimonials, FAQs) in `/src/data/` as TypeScript files
- Define types in `/src/types/` directory
- Makes content easy to update without touching components
- Can easily migrate to CMS later if needed

### TypeScript Type Definitions

Create shared types in the `src/types/` directory:

**src/types/service.ts:**
```typescript
export interface Service {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  included?: string[];
  forWho?: string;
  outcomes?: string;
  ctaText: string;
  ctaLink: string;
}
```

**src/types/testimonial.ts:**
```typescript
export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  company: string;
  image?: string;
}
```

**src/types/caseStudy.ts:**
```typescript
export interface CaseStudy {
  id: string;
  title: string;
  clientType: string;
  challenge: string;
  approach: string[];
  results: string[];
  healthcareSpecific: string;
  image: string;
}
```

**src/types/index.ts:**
```typescript
export type { Service } from './service';
export type { Testimonial } from './testimonial';
export type { CaseStudy } from './caseStudy';
```

### Routing Setup (React Router v6)

**src/routes.tsx:**
```typescript
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import CaseStudies from './pages/CaseStudies';
import Resources from './pages/Resources';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Newsletter from './pages/Newsletter';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'case-studies', element: <CaseStudies /> },
      { path: 'resources', element: <Resources /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'newsletter', element: <Newsletter /> },
    ],
  },
]);
```

**src/App.tsx:**
```typescript
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

### Vercel Configuration

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**vite.config.js:**
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
```

**.env.example:**
```
VITE_FORM_ENDPOINT=your_formspree_endpoint_here
VITE_GOOGLE_ANALYTICS_ID=your_ga_id_here
VITE_SITE_URL=https://summerlynagvisors.com
```

### Environment Variables Setup

1. Create `.env.local` file (gitignored):
```
VITE_FORM_ENDPOINT=https://formspree.io/f/your-form-id
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SITE_URL=http://localhost:3000
```

2. In Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Set production values

3. Access in code:
```jsx
const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT;
```

### Project Setup Files

**package.json:**
```json
{
  "name": "summerlyn-advisors",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0",
    "react-hook-form": "^7.51.0",
    "react-helmet-async": "^2.0.4"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.2.0"
  }
}
```

**Main entry point (src/main.tsx):**
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './routes';
import './styles/index.css';

// Initialize analytics
import { initGA } from './utils/analytics';
initGA();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
```

**Root HTML (index.html):**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Google Analytics (replace YOUR_GA_ID) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
    </script>
    
    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Default meta tags (overridden by SEO component) -->
    <meta name="description" content="Fractional Product Management & Technical Product Consulting for Healthcare & Telehealth Companies" />
    <title>Summerlyn Advisors | Healthcare Product Management Consulting</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**.gitignore:**
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Environment variables
.env
.env.local
.env.production.local
.env.development.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Vercel
.vercel
```

**README.md template:**
```markdown
# Summerlyn Advisors Website

Fractional Product Management & Technical Product Consulting for Healthcare & Telehealth Companies

## Tech Stack

- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form
- **SEO:** React Helmet Async
- **Deployment:** Vercel

## Development

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

\`\`\`
VITE_FORM_ENDPOINT=your_formspree_endpoint
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
VITE_SITE_URL=http://localhost:3000
\`\`\`

## Deployment

Automatically deploys to Vercel on push to main branch.

Manual deployment:
\`\`\`bash
vercel --prod
\`\`\`

## Project Structure

\`\`\`
src/
├── components/     # Reusable React components
├── pages/          # Page components (routes)
├── data/           # Static data (services, testimonials, etc.)
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
└── styles/         # Global styles
\`\`\`
```

### Required Features

### Required Features

**1. Contact Form Component**
```jsx
// src/components/common/ContactForm.jsx
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(import.meta.env.VITE_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields with validation */}
    </form>
  );
}
```

**2. SEO Component**
```jsx
// src/components/common/SEO.jsx
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  keywords,
  image,
  url 
}) {
  const siteUrl = import.meta.env.VITE_SITE_URL;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const ogImage = image || `${siteUrl}/images/og-default.jpg`;

  return (
    <Helmet>
      <title>{title} | Summerlyn Advisors</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}
```

**3. Mobile Navigation Hook**
```jsx
// src/hooks/useNavigation.js
import { useState, useEffect } from 'react';

export function useNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return {
    isMobileMenuOpen,
    toggleMenu: () => setIsMobileMenuOpen(!isMobileMenuOpen),
    closeMenu: () => setIsMobileMenuOpen(false),
  };
}
```

**4. Scroll Animation Hook (Optional)**
```jsx
// src/hooks/useScrollAnimation.js
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(options = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return [elementRef, isVisible];
}
```

**5. Analytics Integration**
```jsx
// src/utils/analytics.js
export const initGA = () => {
  const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
  if (gaId && window.gtag) {
    window.gtag('js', new Date());
    window.gtag('config', gaId);
  }
};

export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackCTAClick = (ctaName) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
  });
};

// Add to index.html in <head>:
// <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
// </script>
```

**6. Data Structure Examples**
```typescript
// src/data/services.ts
import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'strategic-planning',
    title: 'Strategic Product Planning',
    icon: '🎯',
    shortDescription: 'Define vision, roadmap, and strategy',
    included: [
      'Product vision and roadmap development',
      'Market and competitive analysis',
      'User research and validation',
      'Feature prioritization frameworks',
      'Stakeholder alignment',
    ],
    forWho: 'Early-stage startups, companies launching new products',
    outcomes: 'Clear product direction, validated strategy, aligned team',
    ctaText: 'Discuss Your Strategy Needs',
    ctaLink: '/contact',
  },
  // ... more services
];

// src/data/testimonials.ts
import { Testimonial } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: '[Testimonial quote here]',
    author: '[Client Name]',
    title: '[Client Title]',
    company: '[Company Name]',
    image: '/images/testimonials/client1.jpg', // optional
  },
  // ... more testimonials
];

// src/data/caseStudies.ts
import { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'telehealth-launch',
    title: 'Telehealth Platform Launch',
    clientType: 'Series A Telehealth Startup',
    challenge: '[Challenge description]',
    approach: [
      'Led product strategy',
      'Coordinated development team',
      'Managed regulatory requirements',
    ],
    results: [
      'Launched in 4 months',
      'Achieved 95% patient satisfaction',
      'Zero compliance issues',
    ],
    healthcareSpecific: 'Ensured HIPAA compliance from day one...',
    image: '/images/case-studies/telehealth.jpg',
  },
  // ... more case studies
];
```

### Accessibility Requirements

- Semantic HTML5
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast (4.5:1 minimum)
- Alt text for all images
- Skip to main content link
- Focus indicators
- Form labels properly associated

### Browser Testing Checklist

- [ ] Chrome (desktop & mobile)
- [ ] Firefox
- [ ] Safari (desktop & iOS)
- [ ] Edge
- [ ] Test on actual mobile devices
- [ ] Test with screen reader

## Phase 1 Deliverables (MVP)

Build in this order:

### 1. Project Setup & Foundation
- [ ] Initialize Vite + React project
- [ ] Install dependencies (React Router, React Hook Form, etc.)
- [ ] Setup Tailwind CSS (recommended) or CSS Modules
- [ ] Create base Layout component with Header and Footer
- [ ] Setup routing structure
- [ ] Create reusable Button and Card components
- [ ] Setup environment variables
- [ ] Create SEO component

### 2. Homepage
**Components to build:**
- `pages/Home.jsx` (main page component)
- `components/home/Hero.jsx`
- `components/home/ValueProposition.jsx`
- `components/home/ServicesOverview.jsx`
- `components/home/ClientLogos.jsx`
- `components/home/WhyHealthcare.jsx`
- `components/common/CTASection.jsx`

**Data files:**
- `src/data/services.js` (service overview data)

### 3. Services Page
**Components to build:**
- `pages/Services.jsx`
- `components/services/ServiceCard.jsx`
- `components/services/EngagementModels.jsx`

**Data files:**
- Update `src/data/services.js` with full service details

### 4. About Page
**Components to build:**
- `pages/About.jsx`
- `components/about/Story.jsx`
- `components/about/Experience.jsx`
- `components/about/Philosophy.jsx`

### 5. Contact Page
**Components to build:**
- `pages/Contact.jsx`
- `components/common/ContactForm.jsx` (with validation and submission)

**Integrations:**
- Setup Formspree or Web3Forms
- Test form submission
- Add success/error states

### 6. Styling & Responsive Design
- [ ] Complete Tailwind configuration (colors, fonts, spacing)
- [ ] Mobile responsive breakpoints tested
- [ ] Navigation mobile menu working
- [ ] All pages responsive on mobile, tablet, desktop
- [ ] Loading states for forms
- [ ] Hover states for interactive elements

### 7. SEO & Meta Tags
- [ ] SEO component on all pages
- [ ] Unique title and description per page
- [ ] Open Graph tags
- [ ] Favicon added
- [ ] robots.txt configured

### 8. Deployment to Vercel
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Configure environment variables in Vercel
- [ ] Test production build
- [ ] Verify all pages load correctly
- [ ] Test form submission in production

## Phase 2 Enhancements

Add after Phase 1 is live:

### 1. Case Studies Page
**Components:**
- `pages/CaseStudies.jsx`
- `components/case-studies/CaseStudyCard.jsx`
- `components/case-studies/CaseStudyDetail.jsx` (optional, for detailed view)

**Data:**
- `src/data/caseStudies.js`

### 2. Resources/Blog Page
**Components:**
- `pages/Resources.jsx`
- `components/resources/ArticleCard.jsx`
- `components/resources/ArticleFilter.jsx` (optional, for filtering by tag)

**Data:**
- `src/data/articles.js`

### 3. FAQ Page
**Components:**
- `pages/FAQ.jsx`
- `components/faq/FAQAccordion.jsx`
- `components/faq/FAQCategory.jsx`

**Data:**
- `src/data/faqs.js`

### 4. Pricing/How We Work Page
**Components:**
- `pages/Pricing.jsx`
- `components/pricing/PricingCard.jsx`
- `components/pricing/ComparisonTable.jsx`

**Data:**
- `src/data/pricing.js`

### 5. Newsletter Signup Page
**Components:**
- `pages/Newsletter.jsx`
- `components/newsletter/SignupForm.jsx`

**Integration:**
- Newsletter service (Mailchimp, ConvertKit, etc.)

### 6. Enhanced Features
- [ ] Scroll animations with Framer Motion
- [ ] Lazy loading for images
- [ ] Blog functionality with markdown support (optional)
- [ ] Testimonial carousel/slider
- [ ] Client logo animation
- [ ] "Back to top" button
- [ ] Page transition animations

### 7. Performance Optimization
- [ ] Code splitting by route
- [ ] Image optimization (use Vite's asset optimization)
- [ ] Lighthouse audit (aim for 90+ on all metrics)
- [ ] Implement service worker for offline capability (optional)

## Success Metrics

The website should achieve:
- Clear communication of value within 5 seconds of landing
- Mobile-friendly experience (mobile PageSpeed score >90)
- Contact form submissions from qualified leads
- Low bounce rate on homepage (<50%)
- Clear differentiation from generalist consultants
- Trust signals throughout (testimonials, logos, case studies)

## Notes for Implementation

1. **Placeholder Content:** All content marked with `[brackets]` should be clearly marked as placeholder that needs owner input

2. **Responsive Breakpoints:**
   - Mobile: 320px - 767px
   - Tablet: 768px - 1023px
   - Desktop: 1024px+

3. **CTA Strategy:** Every page should have a clear primary CTA. The main CTAs are:
   - "Schedule a Discovery Call" (primary)
   - "View Services" (secondary)
   - "Get in Touch" (tertiary)

4. **Healthcare Imagery:** Be thoughtful about healthcare imagery. Avoid:
   - Cliché stethoscope photos
   - Generic doctor/patient stock photos
   - Overly clinical/sterile imagery
   - Prefer: Modern technology, collaboration, abstract health concepts

5. **Loading States:** Include loading states for form submissions

6. **Error Handling:** Graceful error messages for form failures

7. **Success Messages:** Clear confirmation when forms submit successfully

8. **Print Styles:** Consider print stylesheet for case studies and resources

## Future Enhancements (Post-Launch)

- Blog with CMS integration
- Client portal (if needed)
- Calendly integration for scheduling
- Newsletter automation
- Testimonial collection system
- Case study templates
- ROI calculator tool
- Resource downloads (gated content)
- Video content embedding
- Webinar registration

## Launch Checklist

Before going live:

### Content
- [ ] All placeholder content replaced with real content
- [ ] Owner photo and bio added
- [ ] Client testimonials added (if available)
- [ ] Case studies written (at least 1-2)
- [ ] Services descriptions finalized
- [ ] About page story completed

### Technical
- [ ] All environment variables set in Vercel dashboard
- [ ] Contact form tested and working in production
- [ ] All routes accessible (no 404s)
- [ ] All internal links working
- [ ] All external links working and open in new tab
- [ ] Mobile responsive on all pages (test on real devices)
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Forms have proper validation
- [ ] Form success/error messages display correctly
- [ ] Forms redirect or show confirmation after submission

### Performance
- [ ] Page load speed optimized (Lighthouse score 90+)
- [ ] Images optimized and compressed
- [ ] No console errors or warnings
- [ ] Lazy loading implemented for images
- [ ] Code split by route (React.lazy if needed)

### SEO & Meta
- [ ] SEO component on all pages with unique content
- [ ] Title tags unique per page
- [ ] Meta descriptions unique per page (150-160 chars)
- [ ] Open Graph tags configured
- [ ] Twitter Card tags configured
- [ ] Favicon added (multiple sizes)
- [ ] robots.txt configured
- [ ] sitemap.xml created (optional but recommended)

### Accessibility
- [ ] All images have descriptive alt text
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators visible
- [ ] Form labels properly associated
- [ ] ARIA labels where needed
- [ ] Screen reader tested (optional but recommended)

### Analytics & Tracking
- [ ] Google Analytics installed and tracking
- [ ] GA tracking ID in environment variables
- [ ] Event tracking working for CTA clicks
- [ ] Form submissions tracked
- [ ] Vercel Analytics enabled (optional)

### Legal & Compliance
- [ ] Privacy policy page added
- [ ] Terms of service (if needed)
- [ ] Cookie consent (if using cookies beyond analytics)
- [ ] Copyright year correct in footer

### Vercel-Specific
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Environment variables set for all environments
- [ ] Build completes successfully
- [ ] Preview deployment tested
- [ ] Production deployment verified

### Final Checks
- [ ] Test all CTAs (Schedule Call, Contact, etc.)
- [ ] Test contact form submission in production
- [ ] Verify email notifications received
- [ ] Check mobile menu works on real devices
- [ ] Test on slow 3G connection
- [ ] Social media links working
- [ ] LinkedIn profile link correct
- [ ] Email address correct everywhere
- [ ] Phone number correct (if included)
- [ ] No Lorem Ipsum or placeholder text
- [ ] No broken images
- [ ] No `[PLACEHOLDER]` text remaining

### Post-Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google My Business (if applicable)
- [ ] Share website on LinkedIn
- [ ] Update LinkedIn profile with website URL
- [ ] Update email signature with website URL
- [ ] Monitor Vercel Analytics for issues
- [ ] Monitor form submissions
- [ ] Set up uptime monitoring (optional)

## Questions for Owner Before Starting

1. **Domain name:** What domain will this be hosted on?
2. **Email:** What email should contact form send to?
3. **Brand colors:** Any specific color preferences or existing brand colors?
4. **Logo:** Do you have a logo or should we create text-based logo?
5. **Photos:** Do you have professional photos we can use?
6. **Client logos:** Which clients can we feature (if any)?
7. **Testimonials:** Do you have any testimonials we can use?
8. **Case studies:** Can you share 1-2 detailed project examples?
9. **Hosting preference:** Where do you plan to host this?
10. **Timeline:** When do you want this live?
11. **Calendly/scheduling:** Do you have a scheduling link to integrate?
12. **Social media:** Which platforms are you active on?

## React Component Code Examples

### Example Layout Component

**src/components/layout/Layout.tsx:**
```typescript
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

### Example Header Component

**src/components/layout/Header.jsx:**
```jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './Navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-heading font-bold text-primary-500">
            Summerlyn Advisors
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <Navigation />
          </nav>

          {/* CTA Button */}
          <Link 
            to="/contact" 
            className="hidden md:block btn-primary"
            onClick={() => trackCTAClick('header_contact')}
          >
            Schedule Call
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <Navigation mobile onLinkClick={() => setIsMobileMenuOpen(false)} />
            <Link 
              to="/contact" 
              className="btn-primary w-full mt-4 text-center block"
              onClick={() => {
                setIsMobileMenuOpen(false);
                trackCTAClick('mobile_menu_contact');
              }}
            >
              Schedule Call
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
```

### Example Navigation Component

**src/components/layout/Navigation.jsx:**
```jsx
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

export default function Navigation({ mobile = false, onLinkClick }) {
  const baseStyles = mobile
    ? 'block py-2 text-gray-700 hover:text-primary-500'
    : 'px-4 py-2 text-gray-700 hover:text-primary-500';

  const activeStyles = 'text-primary-500 font-semibold';

  return (
    <nav>
      <ul className={mobile ? 'space-y-2' : 'flex space-x-1'}>
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `${baseStyles} ${isActive ? activeStyles : ''} transition-colors`
              }
              onClick={onLinkClick}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

### Example Button Component

**src/components/common/Button.tsx:**
```typescript
import { Link } from 'react-router-dom';
import { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-block font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center';

  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white',
  };

  const classes = `${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  // Internal link
  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick as any} {...props}>
        {children}
      </Link>
    );
  }

  // External link
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick as any} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  // Button
  return (
    <button type={type} className={classes} onClick={onClick as any} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
```

### Example Hero Section Component

**src/components/home/Hero.jsx:**
```jsx
import Button from '../common/Button';
import { trackCTAClick } from '../../utils/analytics';

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
            <Button 
              to="/contact"
              variant="primary"
              onClick={() => trackCTAClick('hero_schedule_call')}
            >
              Schedule a Discovery Call
            </Button>
            <Button 
              to="/services"
              variant="secondary"
              onClick={() => trackCTAClick('hero_explore_services')}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Example Service Card Component

**src/components/services/ServiceCard.tsx:**
```typescript
import Button from '../common/Button';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="card">
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-2xl font-heading font-bold mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.shortDescription}</p>

      {service.included && service.included.length > 0 && (
        <>
          <h4 className="font-semibold mb-2">What's Included:</h4>
          <ul className="space-y-1 mb-4 text-sm text-gray-600">
            {service.included.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary-500 mr-2">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      <Button to={service.ctaLink} variant="secondary" className="w-full">
        {service.ctaText}
      </Button>
    </div>
  );
}
```

### Example Contact Form Component

**src/components/common/ContactForm.jsx:**
```jsx
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from './Button';
import { trackEvent } from '../../utils/analytics';

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(import.meta.env.VITE_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        trackEvent('form_submission', { form_name: 'contact' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          {...register('company')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          rows="5"
          {...register('message', { required: 'Message is required' })}
          placeholder="Tell me about your product and what challenges you're facing..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot (anti-spam) */}
      <input
        type="text"
        {...register('_gotcha')}
        style={{ display: 'none' }}
        tabIndex="-1"
        autoComplete="off"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Thank you! Your message has been sent successfully. I'll respond within 24 hours.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          Sorry, there was an error sending your message. Please try again or email me directly.
        </div>
      )}

      <p className="text-sm text-gray-500 text-center">
        Your information is confidential and never shared.
      </p>
    </form>
  );
}
```

## Example Homepage Content (Fully Written)

### Hero Section
**Headline:** Fractional Product Leadership for Healthcare & Telehealth Companies

**Subheadline:** Expert product strategy and execution without the full-time commitment. I help healthcare startups and scale-ups build products that improve patient outcomes and drive business growth.

**Primary CTA:** Schedule a Discovery Call  
**Secondary CTA:** Explore Services

### Value Proposition Section
**Headline:** Why Healthcare Companies Choose Fractional Product Leadership

**Benefit 1: Healthcare Expertise You Can't Find Elsewhere**
Deep understanding of HIPAA compliance, clinical workflows, provider dynamics, and patient experience. I speak the language of healthcare and technology.

**Benefit 2: Flexibility That Scales With You**
Start with 10-20 hours per week. Scale up during critical launches. Scale down after major milestones. No overhead of a full-time hire, all the expertise of a senior product leader.

**Benefit 3: Proven Results in Healthcare**
Track record of successful telehealth launches, improved patient engagement, streamlined clinical workflows, and products that achieve regulatory compliance without sacrificing user experience.

### Services Overview
**Headline:** How I Can Help Your Healthcare Product Succeed

**Service 1: Strategic Product Planning**
Define your vision, prioritize features, and align stakeholders around a clear product roadmap that balances clinical needs with business goals.

**Service 2: Product Execution & Leadership**
Lead your product team with agile best practices, sprint management, and cross-functional coordination to deliver on time and within scope.

**Service 3: Go-to-Market Strategy**
Position your product for success with clear messaging, launch planning, and early customer acquisition strategies tailored to healthcare buyers.

**Service 4: Healthcare Specialization**
Navigate the unique challenges of healthcare product development: regulatory compliance, clinical workflow integration, reimbursement strategies, and patient safety.

### Why Healthcare Section
**Headline:** Healthcare Product Management Is Different

Healthcare product management requires more than general product skills. It demands understanding of:

- **Regulatory Compliance:** HIPAA, HITECH, FDA regulations for medical devices
- **Clinical Workflows:** How providers actually work, not how we think they work
- **Patient Safety:** Building features that improve care without introducing risk
- **Reimbursement:** How products fit into complex payment models
- **Stakeholder Complexity:** Patients, providers, payors, administrators—each with different needs

I've been building healthcare products for [X] years. I understand these challenges because I've navigated them successfully, from early-stage startups to established healthcare organizations.

### Final CTA Section
**Headline:** Ready to Move Your Healthcare Product Forward?

**Body:** Let's discuss how fractional product leadership can accelerate your product development, improve your team's effectiveness, and help you build healthcare solutions that truly make a difference.

**Primary CTA:** Schedule a Free 30-Minute Discovery Call  
**Secondary:** Email me at [email]

---

## Development Workflow

### Initial Setup
```bash
# Clone or create project
npm create vite@latest summerlyn-advisors -- --template react
cd summerlyn-advisors

# Install dependencies
npm install
npm install react-router-dom react-hook-form react-helmet-async

# Optional dependencies
npm install framer-motion react-icons

# If using Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Start development server
npm run dev
```

### Development Commands
```bash
# Run development server (localhost:5173 by default)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code (if ESLint configured)
npm run lint
```

### Git Workflow
```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/summerlyn-advisors.git
git branch -M main
git push -u origin main
```

### Vercel Deployment Guide

#### Option 1: Vercel CLI (Recommended for first deployment)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? summerlyn-advisors
# - In which directory is your code located? ./
# - Want to override the settings? No

# Deploy to production
vercel --prod
```

#### Option 2: Vercel Dashboard (Continuous Deployment)
1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

3. **Configure Environment Variables:**
   - In Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.example`:
     - `VITE_FORM_ENDPOINT`
     - `VITE_GOOGLE_ANALYTICS_ID`
     - `VITE_SITE_URL`
   - Set for Production, Preview, and Development environments

4. **Custom Domain (Optional):**
   - Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions
   - Vercel automatically provisions SSL certificate

5. **Automatic Deployments:**
   - Every push to `main` branch triggers production deployment
   - Every push to other branches creates preview deployment
   - Pull requests get unique preview URLs

### Environment Setup Checklist
- [ ] `.env.local` created with development values
- [ ] `.env.example` committed to repo (no secrets)
- [ ] `.env.local` added to `.gitignore`
- [ ] Environment variables added to Vercel dashboard
- [ ] Form endpoint tested in development
- [ ] Form endpoint configured for production
- [ ] Analytics ID added (if using GA)

### Build Optimization

**vite.config.js optimizations:**
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@data': resolve(__dirname, 'src/data'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          forms: ['react-hook-form'],
        },
      },
    },
    sourcemap: false, // Disable in production for smaller bundle
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    open: true, // Auto-open browser
  },
});
```

### Tailwind CSS Setup (if using)

**tailwind.config.js:**
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2ff',
          100: '#b3d9ff',
          500: '#0066CC', // Main brand color
          600: '#0052a3',
          700: '#003d7a',
        },
        secondary: {
          500: '#00B4B4', // Teal
        },
        accent: {
          500: '#FF6B35', // Orange
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
```

**src/styles/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply scroll-smooth;
  }
  
  body {
    @apply font-sans text-gray-900 antialiased;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading font-semibold;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200;
  }
  
  .btn-secondary {
    @apply bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6;
  }
  
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

## Development Start Command

## Development Start Command

When you're ready to start building:

### Quick Start
```bash
# 1. Create the project
npm create vite@latest summerlyn-advisors -- --template react
cd summerlyn-advisors

# 2. Install dependencies
npm install react-router-dom react-hook-form react-helmet-async

# 3. Start development server
npm run dev
```

### Build Order
1. **Setup project structure** - Create folders and base files
2. **Create Layout components** - Header, Footer, Navigation
3. **Setup routing** - Configure React Router with all pages
4. **Build Homepage** - Start with Hero, then other sections
5. **Create reusable components** - Button, Card, CTASection
6. **Build remaining pages** - Services, About, Contact
7. **Style and make responsive** - Mobile-first approach
8. **Test all functionality** - Forms, navigation, links
9. **Deploy to Vercel** - Push to GitHub, connect to Vercel

### Component Development Pattern
For each page, follow this pattern:

1. **Create page component** in `/src/pages/`
2. **Add route** to `routes.jsx`
3. **Create page-specific components** in `/src/components/[page-name]/`
4. **Add data** to `/src/data/` if needed
5. **Add SEO** component with appropriate meta tags
6. **Test responsiveness** at all breakpoints
7. **Test navigation** to and from the page

### Example: Building the Services Page

```bash
# 1. Create the page component
# src/pages/Services.jsx

# 2. Create components
# src/components/services/ServiceCard.jsx
# src/components/services/EngagementModels.jsx

# 3. Add data
# src/data/services.js (with full service details)

# 4. Update routes
# Add route in src/routes.jsx

# 5. Test in browser
npm run dev
# Visit http://localhost:5173/services
```

Remember: The goal is a website that generates leads by clearly communicating value, building trust, and making it easy to take the next step. Every design decision should serve that goal.

## React-Specific Best Practices

### Component Organization
- **Keep components small and focused** - Single responsibility principle
- **Use composition over prop drilling** - Context API for deeply nested props
- **Colocate related files** - Keep components, styles, and tests together
- **Name components clearly** - `ServiceCard.jsx` not `Card2.jsx`

### Performance
- **Lazy load routes** - Use `React.lazy()` for code splitting
- **Memoize expensive calculations** - Use `useMemo` and `useCallback` appropriately
- **Optimize images** - Use Vite's asset optimization, serve WebP
- **Avoid unnecessary re-renders** - Use React DevTools Profiler

### State Management
- **Keep it simple** - useState and useContext are sufficient for this project
- **Lift state only when needed** - Don't prematurely lift state
- **Use React Hook Form** - For form state and validation
- **Local storage** - For persisting user preferences (optional)

### Code Quality
- **Use consistent formatting** - Prettier recommended
- **Follow naming conventions** - camelCase for functions/variables, PascalCase for components/types/interfaces
- **TypeScript best practices:**
  - Define interfaces for all component props
  - Use type inference where possible, explicit types where needed
  - Avoid `any` type - use `unknown` if truly unknown
  - Export types from `src/types/` for reuse across components
  - Use `.tsx` for components, `.ts` for utilities/hooks
- **Comment complex logic** - Make code self-documenting

### Accessibility
- **Semantic HTML** - Use proper HTML5 elements
- **ARIA labels** - For interactive elements without visible text
- **Keyboard navigation** - Test all interactions with keyboard only
- **Focus management** - Manage focus for modals and dynamic content
- **Alt text** - Descriptive alt text for all images

## Vercel-Specific Optimizations

### Edge Functions (Optional, for future)
Vercel supports Edge Functions for:
- A/B testing landing pages
- Personalizing content based on location
- Rate limiting form submissions
- Generating dynamic OG images

### Analytics
Vercel provides free analytics:
- Enable in Project Settings → Analytics
- No code changes needed
- View Core Web Vitals and page performance

### Preview Deployments
- Every PR gets a unique preview URL
- Test changes before merging
- Share preview links with stakeholders
- Perfect for client review

### Image Optimization
Vercel automatically optimizes images:
- Serve WebP/AVIF when supported
- Resize images on-demand
- Lazy load by default
- No configuration needed

## Troubleshooting Common Issues

**Issue: Form not submitting in production**
- Check environment variables in Vercel dashboard
- Verify CORS settings on form endpoint
- Check browser console for errors

**Issue: Routes showing 404 on refresh**
- Ensure `vercel.json` has the rewrites rule
- Vercel should auto-configure this for Vite

**Issue: Slow build times**
- Check for large dependencies
- Use dynamic imports for large components
- Optimize images before committing

**Issue: Styles not applied**
- Verify Tailwind config includes all source files
- Check CSS import order in main.jsx
- Clear browser cache

**Issue: Environment variables not working**
- Ensure variables start with `VITE_`
- Restart dev server after .env changes
- Verify variables set in Vercel dashboard