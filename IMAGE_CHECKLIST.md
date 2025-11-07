# Image Checklist

Quick reference for images needed. Check off as you add them!

## 🔴 HIGH PRIORITY (Do First)

- [ ] **Owner Headshot** (`owner-headshot`)
  - **Where:** About page
  - **Search:** "professional headshot", "business consultant"
  - **File:** `public/images/headshots/owner-headshot.jpg` (800x800)

- [ ] **Primary Logo** (`logo-primary`)
  - **Where:** Header, Footer, throughout site
  - **Create in Canva:** Use brand colors (#0066CC, #00B4B4, #FF6B35)
  - **File:** `public/images/brand/logo-primary.png` (800x200)

- [ ] **Logo Icon/Favicon** (`logo-icon`)
  - **Where:** Browser tab, mobile icon
  - **Create in Canva:** Simple icon version of logo
  - **File:** `public/images/brand/logo-icon.png` (512x512)

- [ ] **Homepage Hero** (`hero-home`)
  - **Where:** Home page hero section
  - **Search:** "healthcare technology", "telehealth consultation", "doctor tablet"
  - **File:** `public/images/hero/hero-home.jpg` (1920x1080)

---

## 🟡 MEDIUM PRIORITY (Add Next)

- [ ] **Services Header** (`services-header`)
  - **Where:** Services page header
  - **Search:** "healthcare services", "healthcare technology services"
  - **File:** `public/images/hero/services-header.jpg` (1920x600)

- [ ] **About Header** (`about-header`)
  - **Where:** About page header
  - **Search:** "product management workspace", "strategy planning", "whiteboard session"
  - **File:** `public/images/hero/about-header.jpg` (1920x600)

- [ ] **Telehealth Platform** (`telehealth-platform`)
  - **Where:** Home page - Why Healthcare section
  - **Search:** "telehealth app", "video consultation", "telemedicine platform"
  - **File:** `public/images/healthcare/telehealth-platform.jpg` (1200x800)

- [ ] **Patient Care** (`patient-care`)
  - **Where:** Home page - Value Proposition or About page
  - **Search:** "patient care", "doctor patient interaction", "healthcare quality"
  - **File:** `public/images/healthcare/patient-care.jpg` (1200x800)

---

## 🟢 NICE TO HAVE (Polish & Enhancement)

### Service Card Images

- [ ] **Strategic Planning** (`product-strategy`)
  - **Search:** "product roadmap", "strategy planning", "product vision"
  - **File:** `public/images/product/product-strategy.jpg` (800x600)

- [ ] **Agile/Execution** (`agile-sprint-planning`)
  - **Search:** "agile sprint planning", "scrum board", "kanban board"
  - **File:** `public/images/product/agile-sprint.jpg` (800x600)

- [ ] **Go-to-Market** (`go-to-market`)
  - **Search:** "product launch", "rocket launch", "business growth"
  - **File:** `public/images/product/go-to-market.jpg` (800x600)

- [ ] **HIPAA Compliance** (`hipaa-compliance-icon`)
  - **Search:** "healthcare security", "HIPAA compliance", "medical data protection"
  - **File:** `public/images/graphics/hipaa-compliance.jpg` (600x600)

### Additional Supporting Images

- [ ] **Healthcare Data** (`healthcare-data`)
  - **Search:** "healthcare analytics", "medical data dashboard"
  - **File:** `public/images/healthcare/healthcare-data.jpg` (1200x800)

- [ ] **Cross-functional Team** (`cross-functional-team`)
  - **Search:** "diverse team meeting", "team collaboration"
  - **File:** `public/images/product/cross-functional-team.jpg` (1200x800)

- [ ] **Healthcare Ecosystem** (`healthcare-ecosystem`)
  - **Search:** "healthcare ecosystem", "connected health", "healthcare network"
  - **File:** `public/images/graphics/healthcare-ecosystem.jpg` (1000x800)

- [ ] **Consultation Call** (`consultation-call`)
  - **Search:** "video call", "professional consultation", "virtual meeting"
  - **File:** `public/images/contact/consultation-call.jpg` (1200x800)

- [ ] **Contact Background** (`contact-background`)
  - **Search:** "minimal workspace", "clean desk", "professional workspace"
  - **File:** `public/images/contact/contact-background.jpg` (1920x1080)

---

## ⏳ WAIT FOR REAL CONTENT (Don't Add Yet)

- [ ] **Client Testimonial 1** (`client-testimonial-1`)
  - Wait for real client photo

- [ ] **Client Testimonial 2** (`client-testimonial-2`)
  - Wait for real client photo

---

## 📋 Quick Search Tips

### Unsplash Search Combinations That Work Well:

**For Healthcare:**
- "healthcare professional technology"
- "telehealth consultation modern"
- "medical tablet digital"
- "patient care technology"

**For Product Management:**
- "agile team planning authentic"
- "whiteboard strategy modern"
- "product roadmap professional"
- "collaborative workspace technology"

**For Professional Feel:**
- Add "professional" to any search
- Add "modern" for contemporary look
- Add "authentic" to avoid cheesy stock photos
- Try "minimal" for clean compositions

### Canva Tips:

**For Logo:**
1. Start with "Logo" templates
2. Search "healthcare logo" or "consulting logo"
3. Customize with your colors
4. Keep it simple and memorable
5. Export as PNG with transparent background

**For Graphics:**
1. Search Canva's stock photos using keywords
2. Use Canva's elements library for icons
3. Create custom graphics with shapes and text
4. Export in high quality

---

## ✅ After Adding Each Image:

1. Save to correct folder in `public/images/`
2. Update `filePath` in `src/data/imageLibrary.ts`
3. Check off in this list
4. Test that image appears on the website

---

## 📂 Folder Structure to Create:

```
public/
└── images/
    ├── hero/
    ├── headshots/
    ├── healthcare/
    ├── product/
    ├── graphics/
    ├── contact/
    ├── testimonials/
    └── brand/
```

**Run this command to create all folders:**
```bash
mkdir -p public/images/{hero,headshots,healthcare,product,graphics,contact,testimonials,brand}
```
