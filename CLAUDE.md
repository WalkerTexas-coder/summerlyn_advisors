# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Summerlyn Advisors** - A professional consulting website for fractional product management and technical product consulting, specializing in telehealth and healthcare technology.

**Owner:** Austin Walker - Product Manager with experience across Rugiet, FightingWeight, CompoundLive, Teligant, and Hedfirst

**Business Goal:** Attract contract positions and consulting clients in the healthcare/telehealth space.

**Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS v3 + React Router v6

## Development Commands

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production (TypeScript compilation + Vite build)
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── common/        # Reusable components (Button, Card, SEO, ContactForm, CTASection)
│   ├── layout/        # Layout components (Header, Footer, Navigation, Layout)
│   ├── home/          # Homepage sections (Hero, ValueProposition, ServicesOverview, WhyHealthcare)
│   ├── services/      # Services page components (ServiceCard)
│   └── about/         # About page components (currently integrated in page)
├── pages/             # Page components (Home, Services, About, Resources, Article, Contact)
├── types/             # TypeScript type definitions (Service, Testimonial, CaseStudy, Article, ImageAsset)
├── data/              # Static data (services, testimonials, articles)
├── utils/             # Utility functions
├── hooks/             # Custom React hooks
├── routes.tsx         # React Router configuration
├── App.tsx            # Main app component with RouterProvider
└── main.tsx           # App entry point with HelmetProvider
```

## Key TypeScript Types

**Service** - Product management service offerings (strategic planning, execution, go-to-market, telehealth platform development)
**Testimonial** - Client testimonials and reviews (based on Teligant and Hedfirst experience)
**CaseStudy** - Project case studies (for future implementation)
**Article** - Blog posts, case studies, and thought leadership content
**ArticleContent** - Content blocks for articles (headings, paragraphs, lists, highlights, stats)
**ImageAsset** - Image library management with categories

All types are exported from `src/types/index.ts` for easy importing.

## Component Architecture

- **Layout**: Wraps all pages with Header/Footer, uses React Router's `<Outlet />` for page content
- **Pages**: Route-level components that compose smaller components
- **Common**: Reusable UI components used across multiple pages
- **SEO**: React Helmet Async for meta tags on each page

## Styling

**Tailwind CSS v3** with custom configuration:

- Primary color: `#0066CC` (professional blue)
- Secondary color: `#00B4B4` (teal)
- Accent color: `#FF6B35` (warm orange)
- Custom utility classes: `.btn-primary`, `.btn-secondary`, `.card`, `.container-custom`

## Current Pages

1. **Home** (`/`) - Hero, value proposition, services overview, why healthcare section, CTA
2. **Services** (`/services`) - Detailed service cards, engagement models
3. **About** (`/about`) - Austin Walker's story, career progression, experience/expertise, working philosophy
4. **Resources** (`/resources`) - Case studies, guides, and thought leadership articles
5. **Article** (`/resources/:slug`) - Individual article pages with full content
6. **Contact** (`/contact`) - Contact form with validation, contact info, FAQ teaser

## Form Handling

Contact form uses **React Hook Form** for validation. Currently logs to console - needs integration with:
- Formspree (recommended)
- Web3Forms
- Or custom backend

Update form endpoint in `src/components/common/ContactForm.tsx`

## Content Status

### ✅ Completed
- Owner name: Austin Walker (updated throughout site)
- About page: Complete career progression from software engineer → solutions engineer → technical product lead → product manager
- Services: Updated to emphasize telehealth platform development expertise
- Testimonials: Added authentic testimonials based on Teligant and Hedfirst experience
- Resources: 4 comprehensive articles created:
  - Teligant case study (0→1 telehealth SaaS platform)
  - Hedfirst case study (integrations & compliance)
  - Complete guide to building telehealth platforms
  - Telehealth integration strategy

### ⚠️ Still Needed
- LinkedIn profile URL (placeholder "#" in Contact.tsx:53 and Footer.tsx:65)
- Professional photos/headshots
- Contact form email integration (currently logs to console)

## Deployment

**Recommended: Vercel**

1. Push to GitHub (already done)
2. Connect repository to Vercel
3. Vercel auto-detects Vite config
4. Add environment variables:
   - `VITE_FORM_ENDPOINT` - Form submission endpoint
   - `VITE_GOOGLE_ANALYTICS_ID` - Google Analytics tracking ID (optional)
   - `VITE_SITE_URL` - Production domain

```bash
# Manual deploy with Vercel CLI
vercel --prod
```

## Resources Section

The Resources section showcases Austin's expertise through detailed articles:

**Article Structure:**
- Each article has: id, title, slug, excerpt, category, date, readTime, content, tags
- Categories: `case-study`, `thought-leadership`, `guide`
- Content is built from ArticleContent blocks for flexible rendering

**Current Articles:**
1. **Teligant Case Study** - Building a 0→1 telehealth SaaS platform with 7 core capabilities
2. **Hedfirst Case Study** - Managing LegitScript/SureScripts certification, Dosespot, pharmacy, and ShipStation integrations
3. **Building Telehealth Platforms Guide** - Comprehensive 15-minute guide covering compliance, architecture, integrations
4. **Telehealth Integration Strategy** - Deep dive into e-prescribing, pharmacy, and fulfillment integrations

**To add more articles:**
Edit `src/data/articles.ts` and add new Article objects following the existing pattern.

## Next Steps / Roadmap

### High Priority
- [x] Replace placeholder content with real information ✅
- [x] Add actual testimonials (based on real experience) ✅
- [x] Create Resources/Blog section for thought leadership ✅
- [ ] Add LinkedIn profile URL
- [ ] Add professional photos/images
- [ ] Connect contact form to email service (Formspree/Web3Forms)
- [ ] Deploy to Vercel

### Medium Priority
- [ ] Add Google Analytics tracking
- [ ] Create environment variables file (`.env.local`)
- [ ] Add loading states and error boundaries
- [ ] Add more case studies and articles
- [ ] Add social sharing for articles

### Nice to Have
- [ ] Scroll animations with Framer Motion
- [ ] Newsletter signup integration
- [ ] Pricing/How We Work page
- [ ] FAQ page with accordion component
- [ ] Dark mode support
- [ ] Performance optimizations (lazy loading, code splitting)
- [ ] Article search and filtering

## TypeScript Best Practices

- All components use `.tsx` extension
- Utilities and hooks use `.ts` extension
- Define interfaces for all component props
- Use type inference where possible
- Avoid `any`, prefer `unknown` if truly unknown
- Export types from `src/types/` for reuse

## Common Tasks

**Adding a new page:**
1. Create component in `src/pages/PageName.tsx`
2. Add route in `src/routes.tsx`
3. Add navigation link in `src/components/layout/Navigation.tsx`
4. Include SEO component with appropriate meta tags

**Adding a new component:**
1. Create in appropriate folder (`common`, `layout`, or page-specific)
2. Define TypeScript interface for props
3. Use Tailwind classes for styling
4. Export default

**Updating services:**
Edit `src/data/services.ts` - automatically reflected on homepage and services page.

**Adding a new article:**
1. Add article object to `src/data/articles.ts`
2. Define title, slug, excerpt, category, tags, and content blocks
3. Article automatically appears on `/resources` page
4. Article accessible at `/resources/[slug]`

## Git Workflow

```bash
# Check status
git status

# Stage changes
git add .

# Commit with message
git commit -m "Your message here"

# Push to main
git push origin main
```

## Troubleshooting

**Tailwind classes not working:** Ensure dev server is running and check `tailwind.config.js` content array includes all source files.

**Type errors:** Run `npm run build` to see TypeScript compilation errors.

**Dev server won't start:** Check for port conflicts on 5173, kill existing processes.

**Form not submitting:** Contact form currently logs to console - needs email service integration.

## Support & Documentation

- [React Router v6 Docs](https://reactrouter.com)
- [Tailwind CSS v3 Docs](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
