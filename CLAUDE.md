# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Summerlyn Advisors** - A professional consulting website for fractional product management and technical product consulting, specializing in telehealth and healthcare technology.

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
├── pages/             # Page components (Home, Services, About, Contact)
├── types/             # TypeScript type definitions (Service, Testimonial, CaseStudy)
├── data/              # Static data (services, testimonials)
├── utils/             # Utility functions
├── hooks/             # Custom React hooks
├── routes.tsx         # React Router configuration
├── App.tsx            # Main app component with RouterProvider
└── main.tsx           # App entry point with HelmetProvider
```

## Key TypeScript Types

**Service** - Product management service offerings (strategic planning, execution, go-to-market, healthcare specialization)
**Testimonial** - Client testimonials and reviews
**CaseStudy** - Project case studies (for future implementation)

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
3. **About** (`/about`) - Story, experience/expertise, working philosophy
4. **Contact** (`/contact`) - Contact form with validation, contact info, FAQ teaser

## Form Handling

Contact form uses **React Hook Form** for validation. Currently logs to console - needs integration with:
- Formspree (recommended)
- Web3Forms
- Or custom backend

Update form endpoint in `src/components/common/ContactForm.tsx`

## Content Updates Needed

Search for these placeholders and replace with real content:
- `[Owner Name]` - Consultant's name
- `[Owner Email]` - Contact email
- `[Owner LinkedIn]` - LinkedIn profile URL
- `[Client Name]` - Client testimonials
- Healthcare experience years and specific details

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

## Next Steps / Roadmap

### High Priority
- [ ] Replace placeholder content with real information
- [ ] Add professional photos/images
- [ ] Connect contact form to email service (Formspree/Web3Forms)
- [ ] Add actual client testimonials
- [ ] Deploy to Vercel

### Medium Priority
- [ ] Add Case Studies page with real examples
- [ ] Create Resources/Blog section for thought leadership
- [ ] Add Google Analytics tracking
- [ ] Create environment variables file (`.env.local`)
- [ ] Add loading states and error boundaries

### Nice to Have
- [ ] Scroll animations with Framer Motion
- [ ] Newsletter signup integration
- [ ] Pricing/How We Work page
- [ ] FAQ page with accordion component
- [ ] Dark mode support
- [ ] Performance optimizations (lazy loading, code splitting)

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
