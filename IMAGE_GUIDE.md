# Image Library Guide

This guide explains how to use the image library system to add images to the Summerlyn Advisors website.

## Overview

The website needs professional images to enhance the visual appeal and credibility. All image suggestions are organized in a structured library at [src/data/imageLibrary.ts](src/data/imageLibrary.ts).

## Quick Start

### 1. Review Image Suggestions

Open [src/data/imageLibrary.ts](src/data/imageLibrary.ts) to see all image suggestions organized by category:

- **Hero & Header Images** - Main page headers and backgrounds
- **Professional Headshot** - Owner/consultant photo (HIGH PRIORITY)
- **Healthcare & Technology** - Healthcare and telehealth imagery
- **Product Management** - Agile, strategy, collaboration images
- **Icons & Graphics** - Supporting graphics and icons
- **Contact & Call-to-Action** - CTA section images
- **Testimonials & Social Proof** - Client photos (placeholders for now)
- **Brand Assets** - Logo and favicon (HIGH PRIORITY)

### 2. Find Images on Unsplash or Canva

Each image entry includes:
- **searchKeywords**: Use these to search on Unsplash or Canva
- **description**: Detailed description of what to look for
- **style**: Style guidelines (professional, modern, clean, etc.)
- **dimensions**: Recommended size and aspect ratio

#### Recommended Sources:

**Unsplash (Free):**
- Go to [unsplash.com](https://unsplash.com)
- Use the searchKeywords provided
- Download in "Large" or "Original" size
- Free for commercial use, no attribution required

**Canva (Your Account):**
- Great for creating logos and custom graphics
- Search Canva's stock photo library using keywords
- Use Canva templates for logo design
- Export in high quality (PNG for logos, JPG for photos)

### 3. Download and Organize Images

Create this folder structure in the project:

```
public/
└── images/
    ├── hero/           # Hero and header images
    ├── headshots/      # Professional photos
    ├── healthcare/     # Healthcare imagery
    ├── product/        # Product management images
    ├── graphics/       # Icons and graphics
    ├── contact/        # Contact page images
    ├── testimonials/   # Client photos
    └── brand/          # Logo and brand assets
```

**File naming convention:**
- Use lowercase with hyphens
- Be descriptive
- Examples: `hero-home.jpg`, `owner-headshot.jpg`, `logo-primary.png`

### 4. Update the Image Library

Once you've downloaded an image, update its `filePath` in [src/data/imageLibrary.ts](src/data/imageLibrary.ts):

```typescript
{
  id: 'hero-home',
  purpose: 'Main hero background image for homepage',
  location: 'Home page - Hero section',
  filePath: '/images/hero/hero-home.jpg', // ← Add this line
  altText: 'Healthcare professional using technology for patient care',
  // ... rest of the fields
}
```

### 5. Use Images in Components

Import the image library and use the helper functions:

```typescript
import { getImageById } from '../data/imageLibrary';

// In your component
const heroImage = getImageById('hero-home');

// Use in JSX
{heroImage?.filePath && (
  <img
    src={heroImage.filePath}
    alt={heroImage.altText}
    className="w-full h-auto"
  />
)}
```

## Priority Images

### Must Have (Do These First):

1. **Owner Headshot** (`owner-headshot`)
   - Professional photo of the consultant
   - Location: About page, possibly header/footer
   - If you don't have one yet, use a placeholder from Unsplash (professional business person)

2. **Logo** (`logo-primary` and `logo-icon`)
   - Create in Canva using the brand colors
   - Primary: #0066CC (blue), Secondary: #00B4B4 (teal), Accent: #FF6B35 (orange)
   - Modern, clean, professional
   - Should work in both color and single-color versions

3. **Hero Home** (`hero-home`)
   - Main homepage background
   - Sets the tone for the entire site
   - Healthcare technology theme

### Nice to Have:

4. **Service Card Images** - Add visual interest to service offerings
5. **About Page Images** - Support the story and expertise sections
6. **Header Images** - Background images for Services and About page headers

### Can Wait:

7. **Testimonial Photos** - Wait until you have real client testimonials
8. **Additional Graphics** - Add these for polish after core images are in place

## Image Optimization Tips

### File Size:
- Hero images: Keep under 500KB
- Headshots: Keep under 200KB
- Icons/Graphics: Keep under 100KB
- Use JPG for photos, PNG for logos/graphics with transparency

### Optimization Tools:
- [TinyPNG](https://tinypng.com) - Free online image compression
- [Squoosh](https://squoosh.app) - Advanced image compression
- Canva's built-in compression when exporting

### Dimensions:
- Follow the recommended dimensions in the image library
- When in doubt, go larger (you can always scale down with CSS)
- Maintain aspect ratios to avoid distortion

## Helper Functions

The image library includes helpful utility functions:

```typescript
// Get a specific image by ID
const image = getImageById('hero-home');

// Get all images for a specific page
const aboutImages = getImagesByLocation('About page');

// Get all images that still need files
const missingImages = getImagesNeedingFiles();
```

## Search Keywords Guide

### For Healthcare Images:
- "telehealth consultation"
- "healthcare technology"
- "medical professional tablet"
- "patient care technology"
- "telemedicine"

### For Product Management Images:
- "agile sprint planning"
- "product roadmap"
- "team collaboration"
- "whiteboard strategy"
- "scrum board"

### For Professional Images:
- "professional headshot"
- "business consultant"
- "executive portrait"
- "professional workspace"

### Style Filters on Unsplash:
- Add "professional" to any search
- Add "modern" for contemporary feel
- Add "minimal" for clean, simple images
- Try "authentic" to avoid overly staged stock photos

## Example Workflow

Let's say you want to add the homepage hero image:

1. **Find the entry** in [imageLibrary.ts](src/data/imageLibrary.ts):
   - ID: `hero-home`
   - Keywords: 'healthcare technology', 'doctor tablet', 'telehealth consultation'

2. **Search on Unsplash:**
   - Go to unsplash.com
   - Search: "healthcare technology professional"
   - Filter for horizontal orientation
   - Look for warm, professional images

3. **Download:**
   - Download in "Large" size (1920x1080 or similar)
   - Save as `hero-home.jpg`

4. **Add to project:**
   - Create folder: `public/images/hero/`
   - Save file: `public/images/hero/hero-home.jpg`

5. **Update library:**
   ```typescript
   {
     id: 'hero-home',
     filePath: '/images/hero/hero-home.jpg', // ← Added this
     // ... rest stays the same
   }
   ```

6. **Use in Hero component:**
   ```typescript
   import { getImageById } from '../../data/imageLibrary';

   const heroImage = getImageById('hero-home');

   // In JSX, add background image:
   <section
     className="bg-gradient-to-br from-primary-50 to-white py-20 md:py-32"
     style={{
       backgroundImage: heroImage?.filePath
         ? `url(${heroImage.filePath})`
         : undefined,
       backgroundSize: 'cover',
       backgroundPosition: 'center',
     }}
   >
   ```

## Next Steps

1. Start with the "Must Have" images (owner headshot and logo)
2. Add hero image for homepage
3. Add header images for Services and About pages
4. Add service card images for visual interest
5. Add supporting images as needed

## Questions?

Refer to [CLAUDE.md](CLAUDE.md) for general project guidance, or ask Claude Code for help implementing specific images!
