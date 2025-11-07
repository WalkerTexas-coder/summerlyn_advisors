import { ImageCategory } from '../types/image';

/**
 * Image Library for Summerlyn Advisors Website
 *
 * This file organizes all image assets needed for the website.
 * When you download images from Unsplash/Canva, update the `filePath` field.
 *
 * Usage:
 * 1. Search for images using the searchKeywords provided
 * 2. Download and save to /public/images/[category]/[filename]
 * 3. Update filePath with the path: '/images/[category]/[filename].jpg'
 * 4. Import this library in components and reference by ID
 */

export const imageLibrary: ImageCategory[] = [
  {
    category: 'Hero & Header Images',
    images: [
      {
        id: 'hero-home',
        purpose: 'Main hero background image for homepage',
        location: 'Home page - Hero section',
        altText: 'Healthcare professional using technology for patient care',
        searchKeywords: [
          'healthcare technology',
          'doctor tablet',
          'telehealth consultation',
          'medical professional laptop',
          'healthcare innovation',
          'telemedicine',
        ],
        dimensions: {
          recommended: '1920x1080',
          aspectRatio: '16:9',
        },
        description: 'Professional image showing healthcare technology in action. Should convey modern healthcare, professionalism, and human connection. Avoid cliché stock photos. Look for: doctor or healthcare worker using tablet/laptop, preferably in a clinical setting or having a video consultation. Warm, professional lighting.',
        style: ['professional', 'modern', 'clean', 'warm tones', 'high quality'],
      },
      {
        id: 'about-header',
        purpose: 'Background image for About page header',
        location: 'About page - Header section',
        altText: 'Collaborative workspace for product management',
        searchKeywords: [
          'product management workspace',
          'agile team meeting',
          'strategy planning',
          'whiteboard session',
          'collaborative workspace',
          'product strategy',
        ],
        dimensions: {
          recommended: '1920x600',
          aspectRatio: '16:5',
        },
        description: 'Professional workspace that conveys strategic thinking and collaboration. Look for: whiteboard with product roadmaps, team planning session, modern office space with sticky notes/diagrams. Should feel strategic and organized, not chaotic.',
        style: ['professional', 'collaborative', 'strategic', 'modern'],
      },
      {
        id: 'services-header',
        purpose: 'Background image for Services page header',
        location: 'Services page - Header section',
        altText: 'Healthcare product services and solutions',
        searchKeywords: [
          'healthcare services',
          'medical consultation',
          'healthcare solutions',
          'product delivery',
          'healthcare technology services',
        ],
        dimensions: {
          recommended: '1920x600',
          aspectRatio: '16:5',
        },
        description: 'Professional image showing healthcare services being delivered or healthcare products in use. Could be a healthcare professional using technology, a telehealth platform interface (blurred/generic), or a modern healthcare setting.',
        style: ['professional', 'service-oriented', 'modern', 'clean'],
      },
    ],
  },
  {
    category: 'Professional Headshot',
    images: [
      {
        id: 'owner-headshot',
        purpose: 'Professional photo of the consultant/owner',
        location: 'About page - Story section OR Header/Footer',
        altText: '[Owner Name] - Healthcare Product Management Consultant',
        searchKeywords: [
          'professional headshot',
          'business professional',
          'consultant portrait',
          'executive headshot',
        ],
        dimensions: {
          recommended: '800x800',
          aspectRatio: '1:1',
        },
        description: 'HIGH PRIORITY: Professional headshot of the consultant. Should be on plain or slightly blurred background, professional attire, friendly and approachable expression. Well-lit, high quality, current photo. If using a placeholder from Unsplash, look for a professional-looking person in business casual attire.',
        style: ['professional', 'approachable', 'high quality', 'well-lit'],
      },
    ],
  },
  {
    category: 'Healthcare & Technology',
    images: [
      {
        id: 'telehealth-platform',
        purpose: 'Illustration of telehealth/digital health platforms',
        location: 'Home page - Why Healthcare section',
        altText: 'Telehealth platform connecting patients and providers',
        searchKeywords: [
          'telehealth app',
          'video consultation',
          'telemedicine platform',
          'remote healthcare',
          'patient provider video call',
          'digital health',
        ],
        dimensions: {
          recommended: '1200x800',
          aspectRatio: '3:2',
        },
        description: 'Image showing telehealth in action - video consultation between patient and provider, or someone using a health app. Should convey connectivity, accessibility, and modern healthcare delivery.',
        style: ['modern', 'technology-focused', 'clean', 'professional'],
      },
      {
        id: 'healthcare-data',
        purpose: 'Healthcare analytics and data visualization',
        location: 'Services page OR About page - Expertise section',
        altText: 'Healthcare data analytics and insights',
        searchKeywords: [
          'healthcare analytics',
          'medical data dashboard',
          'health metrics',
          'healthcare KPI',
          'medical data visualization',
        ],
        dimensions: {
          recommended: '1200x800',
          aspectRatio: '3:2',
        },
        description: 'Professional image showing healthcare analytics, dashboards, or data-driven decision making in healthcare. Could be someone reviewing health data on screens or a clean visualization of health metrics.',
        style: ['data-driven', 'professional', 'modern', 'analytical'],
      },
      {
        id: 'patient-care',
        purpose: 'Patient-centered care and outcomes',
        location: 'Home page - Value Proposition OR About page',
        altText: 'Patient receiving quality healthcare',
        searchKeywords: [
          'patient care',
          'doctor patient interaction',
          'healthcare quality',
          'patient outcomes',
          'compassionate care',
          'medical consultation',
        ],
        dimensions: {
          recommended: '1200x800',
          aspectRatio: '3:2',
        },
        description: 'Warm, human image showing positive patient-provider interaction. Should convey care, trust, and positive outcomes. Look for genuine moments, diverse representation, and professional healthcare settings.',
        style: ['warm', 'human-centered', 'professional', 'diverse'],
      },
    ],
  },
  {
    category: 'Product Management',
    images: [
      {
        id: 'agile-sprint-planning',
        purpose: 'Agile team collaboration',
        location: 'Services page - Product Execution service card',
        altText: 'Agile team sprint planning session',
        searchKeywords: [
          'agile sprint planning',
          'scrum board',
          'kanban board',
          'team standup',
          'agile team meeting',
          'product backlog',
        ],
        dimensions: {
          recommended: '800x600',
          aspectRatio: '4:3',
        },
        description: 'Team working together on agile planning - could be physical or digital board with user stories, sprint planning session, or team collaboration. Should show organization and teamwork.',
        style: ['collaborative', 'organized', 'agile', 'team-focused'],
      },
      {
        id: 'product-strategy',
        purpose: 'Strategic product planning and roadmapping',
        location: 'Services page - Strategic Planning service card',
        altText: 'Product strategy and roadmap planning',
        searchKeywords: [
          'product roadmap',
          'strategy planning',
          'product vision',
          'strategic planning',
          'business strategy whiteboard',
          'product planning',
        ],
        dimensions: {
          recommended: '800x600',
          aspectRatio: '4:3',
        },
        description: 'Strategic planning in action - whiteboard with roadmap, product vision diagrams, or strategic planning session. Should convey forward-thinking and strategic direction.',
        style: ['strategic', 'visionary', 'organized', 'professional'],
      },
      {
        id: 'go-to-market',
        purpose: 'Product launch and go-to-market',
        location: 'Services page - Go-to-Market service card',
        altText: 'Product launch and market entry strategy',
        searchKeywords: [
          'product launch',
          'market entry',
          'rocket launch',
          'business growth',
          'go to market',
          'product release',
        ],
        dimensions: {
          recommended: '800x600',
          aspectRatio: '4:3',
        },
        description: 'Image conveying launch, growth, or market entry. Could be metaphorical (rocket launch) or literal (product launch event, growth charts). Should feel energetic and forward-moving.',
        style: ['dynamic', 'energetic', 'growth-focused', 'optimistic'],
      },
      {
        id: 'cross-functional-team',
        purpose: 'Cross-functional team collaboration',
        location: 'About page - How I Work section',
        altText: 'Diverse team collaborating on product development',
        searchKeywords: [
          'diverse team meeting',
          'cross-functional team',
          'team collaboration',
          'inclusive workplace',
          'team diversity',
          'collaborative meeting',
        ],
        dimensions: {
          recommended: '1200x800',
          aspectRatio: '3:2',
        },
        description: 'Diverse team working together - should show inclusion, collaboration, and different perspectives coming together. Professional setting with people engaged in discussion or working together.',
        style: ['inclusive', 'collaborative', 'diverse', 'professional'],
      },
    ],
  },
  {
    category: 'Icons & Graphics',
    images: [
      {
        id: 'hipaa-compliance-icon',
        purpose: 'HIPAA compliance visual',
        location: 'Services page - Healthcare Specialization service card',
        altText: 'HIPAA compliance and healthcare security',
        searchKeywords: [
          'healthcare security',
          'HIPAA compliance',
          'medical data protection',
          'healthcare privacy',
          'secure healthcare',
          'health data security',
        ],
        dimensions: {
          recommended: '600x600',
          aspectRatio: '1:1',
        },
        description: 'Professional image representing healthcare data security and compliance. Could be padlock with medical symbol, secure data transmission, or healthcare security shield. Should convey trust and protection.',
        style: ['secure', 'trustworthy', 'professional', 'clean'],
      },
      {
        id: 'healthcare-ecosystem',
        purpose: 'Healthcare ecosystem illustration',
        location: 'Home page - Why Healthcare section',
        altText: 'Connected healthcare ecosystem',
        searchKeywords: [
          'healthcare ecosystem',
          'connected health',
          'healthcare network',
          'integrated healthcare',
          'health system',
        ],
        dimensions: {
          recommended: '1000x800',
          aspectRatio: '5:4',
        },
        description: 'Illustration or image showing the interconnected nature of healthcare - patients, providers, systems, data. Could be a network diagram, connected people, or integrated systems visualization.',
        style: ['connected', 'systematic', 'modern', 'clear'],
      },
    ],
  },
  {
    category: 'Contact & Call-to-Action',
    images: [
      {
        id: 'consultation-call',
        purpose: 'Discovery call or consultation image',
        location: 'Contact page OR CTA sections',
        altText: 'Professional consultation and discovery call',
        searchKeywords: [
          'video call',
          'professional consultation',
          'business meeting online',
          'remote consultation',
          'virtual meeting',
        ],
        dimensions: {
          recommended: '1200x800',
          aspectRatio: '3:2',
        },
        description: 'Professional engaged in a video consultation or call. Should look welcoming and professional - person smiling at camera/screen in professional setting. This represents the discovery call CTA.',
        style: ['welcoming', 'professional', 'approachable', 'modern'],
      },
      {
        id: 'contact-background',
        purpose: 'Contact page background or accent',
        location: 'Contact page - Background or section',
        altText: 'Get in touch with healthcare product expertise',
        searchKeywords: [
          'minimal workspace',
          'clean desk',
          'modern office',
          'professional workspace',
          'contact us background',
        ],
        dimensions: {
          recommended: '1920x1080',
          aspectRatio: '16:9',
        },
        description: 'Clean, minimal workspace or abstract professional background. Should be subtle enough to not distract from contact form. Neutral colors, professional aesthetic.',
        style: ['minimal', 'clean', 'professional', 'subtle'],
      },
    ],
  },
  {
    category: 'Testimonials & Social Proof',
    images: [
      {
        id: 'client-testimonial-1',
        purpose: 'Client testimonial photo placeholder',
        location: 'Home page - Future testimonials section',
        altText: 'Healthcare startup founder testimonial',
        searchKeywords: [
          'startup founder',
          'healthcare CEO',
          'tech entrepreneur',
          'business professional',
        ],
        dimensions: {
          recommended: '400x400',
          aspectRatio: '1:1',
        },
        description: 'Professional headshot for client testimonial. Can be placeholder until real client photos are available. Look for professional-looking healthcare or tech industry professionals.',
        style: ['professional', 'credible', 'approachable'],
      },
      {
        id: 'client-testimonial-2',
        purpose: 'Client testimonial photo placeholder',
        location: 'Home page - Future testimonials section',
        altText: 'Healthcare company executive testimonial',
        searchKeywords: [
          'executive portrait',
          'CTO',
          'healthcare executive',
          'professional headshot',
        ],
        dimensions: {
          recommended: '400x400',
          aspectRatio: '1:1',
        },
        description: 'Professional headshot for client testimonial. Can be placeholder until real client photos are available. Different from client-testimonial-1 for variety.',
        style: ['professional', 'credible', 'diverse'],
      },
    ],
  },
  {
    category: 'Brand Assets',
    images: [
      {
        id: 'logo-primary',
        purpose: 'Primary company logo',
        location: 'Header, Footer, and throughout site',
        altText: 'Summerlyn Advisors logo',
        searchKeywords: ['create in Canva'],
        dimensions: {
          recommended: '800x200',
          aspectRatio: 'Horizontal logo format',
        },
        description: 'PRIMARY NEED: Professional logo for Summerlyn Advisors. Can be created in Canva. Should incorporate healthcare/product management themes. Professional color scheme matching the brand (primary blue #0066CC, optional teal/orange accents). Clean, modern, memorable.',
        style: ['professional', 'modern', 'clean', 'memorable', 'brand-aligned'],
      },
      {
        id: 'logo-icon',
        purpose: 'Logo icon/favicon',
        location: 'Browser tab favicon, mobile icon',
        altText: 'Summerlyn Advisors icon',
        searchKeywords: ['create in Canva'],
        dimensions: {
          recommended: '512x512',
          aspectRatio: '1:1',
        },
        description: 'Square icon version of logo for favicon and mobile. Should be simple enough to recognize at small sizes. Can be an abbreviated version or symbol from main logo.',
        style: ['simple', 'recognizable', 'scalable', 'brand-aligned'],
      },
    ],
  },
];

/**
 * Helper function to get image by ID
 */
export function getImageById(id: string) {
  for (const category of imageLibrary) {
    const image = category.images.find((img) => img.id === id);
    if (image) return image;
  }
  return null;
}

/**
 * Helper function to get all images for a specific location
 */
export function getImagesByLocation(location: string) {
  const images = [];
  for (const category of imageLibrary) {
    images.push(...category.images.filter((img) => img.location.includes(location)));
  }
  return images;
}

/**
 * Helper function to get all images that need file paths
 */
export function getImagesNeedingFiles() {
  const images = [];
  for (const category of imageLibrary) {
    images.push(...category.images.filter((img) => !img.filePath));
  }
  return images;
}
