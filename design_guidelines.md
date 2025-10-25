# Design Guidelines for Gourav Arora's Portfolio Website

## Design Approach
**Reference-Based Approach**: Inspired by adityacprtm.dev - a clean, professional DevOps/Cloud engineer portfolio with strong emphasis on technical expertise and clear content hierarchy.

## Core Design Principles
1. **Professional Tech Aesthetic**: Clean, modern, technology-focused design that conveys expertise in DevOps, Cloud, and Cybersecurity
2. **Content-First Hierarchy**: Technical skills and accomplishments take center stage
3. **Scannable Information**: Easy-to-digest sections with clear visual separation
4. **Trust & Credibility**: Professional presentation suitable for enterprise clients and recruiters

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, and 24 for consistent spacing throughout (e.g., p-4, gap-8, mb-12, py-20)

**Container Strategy**:
- Maximum content width: `max-w-6xl` for main sections
- Full-width sections with contained content: `w-full` wrapper with `max-w-6xl mx-auto px-6`
- Consistent horizontal padding: `px-6` on mobile, `px-8 lg:px-12` on larger screens

**Section Structure**:
- Hero/About: Full viewport height with centered content
- What I Do: 2x2 grid on desktop (4 specialization cards), single column mobile
- Skills: Multi-column grid layout, 3-4 columns desktop, responsive to mobile
- Projects: 2-3 column card grid with hover effects
- Certifications: 3-4 column badge/card layout
- Experience: Timeline layout with alternating left/right positioning
- Training: Card-based grid similar to certifications
- Blog: 2-3 column card grid with featured image, title, excerpt
- Contact: Two-column layout - form on left, contact info/social on right

## Typography

**Font Families**:
- Primary (Headings): Inter or similar modern sans-serif from Google Fonts
- Secondary (Body): System font stack for optimal readability
- Code/Technical: JetBrains Mono for any code snippets or technical callouts

**Type Scale**:
- Hero Name: text-5xl lg:text-7xl, font-bold
- Section Headings: text-3xl lg:text-4xl, font-bold
- Subsection Headings: text-2xl lg:text-3xl, font-semibold
- Card Titles: text-xl lg:text-2xl, font-semibold
- Body Text: text-base lg:text-lg, font-normal, leading-relaxed
- Small Text/Metadata: text-sm, font-medium

## Component Library

### Navigation
- Fixed top navigation with smooth background transition on scroll
- Logo/Name on left, navigation links centered or right-aligned
- Smooth scroll behavior to sections
- Mobile: Hamburger menu with slide-in drawer
- Active section highlighting in navigation

### Hero/About Me Section
- Full viewport height with centered content
- Large name heading with professional title/specializations below
- Brief introduction paragraph (2-3 lines)
- CTA buttons: "View Projects" and "Contact Me" with subtle hover states
- Social media icon links row below CTAs
- Subtle gradient or tech-pattern background (optional geometric shapes)

### "What I'm Doing" Cards (4 specializations)
- Grid layout: 2 columns desktop, 1 column mobile
- Each card contains:
  - Icon/illustration at top (DevOps, Cloud, SRE, Cybersecurity themes)
  - Bold title (e.g., "DevOps Engineer")
  - 2-3 line description of expertise
- Card styling: Subtle borders, rounded corners (rounded-lg), padding p-6 to p-8
- Hover effect: Slight elevation/shadow increase

### Skills Section
- Section heading: "Technical Skills" or "Skills & Technologies"
- Grouped by category (Cloud Platforms, DevOps Tools, Security, etc.)
- Skill badges/pills layout:
  - Inline-flex wrap with gap-3
  - Each skill: rounded-full px-4 py-2, font-medium text-sm
  - Icon + text combination where applicable
- Proficiency indicators (optional visual bars or stars)

### Projects Grid
- Card-based layout with consistent height
- Each project card:
  - Featured image at top (16:9 or 4:3 aspect ratio)
  - Project title (text-xl font-semibold)
  - Brief description (2-3 lines)
  - Tech stack tags (smaller pills)
  - "View Details" link or button
- Hover: Image zoom or overlay effect with view/GitHub links

### Certifications Section
- Badge/card grid layout (3-4 columns desktop)
- Each certification:
  - Certification logo/badge image
  - Certification name
  - Issuing organization
  - Date obtained
- Clean, professional presentation with subtle borders

### Experience Timeline
- Vertical timeline with alternating positions (desktop)
- Each experience entry:
  - Company logo (small, circular)
  - Job title (bold)
  - Company name and duration
  - Key responsibilities/achievements (bullet points)
  - Timeline connector line with dots
- Mobile: Linear single-column layout

### Training Section
- Similar to certifications but with course/training focus
- Grid of training cards with:
  - Training provider logo
  - Course name
  - Completion date
  - Brief description or key topics

### Blog Section
- Card grid (2-3 columns)
- Each blog card:
  - Featured image (16:9 aspect ratio)
  - Category tag
  - Title (text-xl)
  - Excerpt (2-3 lines)
  - Read time and publish date
  - "Read More" link
- Latest 6-9 posts with "View All" button

### Contact Section
- Two-column layout (form left, info right)
- Contact Form:
  - Name input (full width)
  - Email input (full width)
  - Subject input (full width)
  - Message textarea (4-6 rows)
  - Submit button (primary CTA style)
  - Form validation states
- Contact Info Panel:
  - Email address with icon
  - Phone (dummy)
  - Location (optional)
  - Social media links (larger, interactive icons)
  - Availability status or response time

### Footer
- Three-column layout on desktop
- Column 1: Brief about/tagline + social links
- Column 2: Quick navigation links
- Column 3: Contact snippet
- Bottom bar: Copyright and "Built with ❤️" message
- Minimal, professional styling

## Animations & Interactions

**Scroll Animations**: Subtle fade-in and slide-up on scroll for section entries (use Intersection Observer)

**Hover States**:
- Cards: Slight elevation with shadow increase (shadow-md to shadow-lg)
- Buttons: Subtle scale (scale-105) and background shift
- Links: Underline animation from center
- Project images: Zoom effect (scale-110) within container

**Transitions**: Use `transition-all duration-300 ease-in-out` for smooth state changes

**Navigation**: Smooth scroll behavior with offset for fixed header

## Images

**Hero Section**: 
- Optional: Professional headshot or abstract tech-themed background (subtle geometric patterns, circuit board aesthetic, or cloud infrastructure visualization)
- If using headshot: Circular or rounded-square, positioned prominently

**What I'm Doing Icons**: 
- 4 custom illustrations representing DevOps (pipeline/automation gears), Cloud Computing (cloud with infrastructure), Cybersecurity (shield/lock), and SRE (monitoring graphs/uptime)
- SVG format, consistent style, placed at top of each card
- Size: 80-120px width/height

**Project Images**: 
- Screenshots or mockups of projects
- Aspect ratio: 16:9 or 4:3
- Quality: High-resolution, optimized for web
- Placement: Top of each project card
- Fallback: Gradient placeholder with project icon if no image available

**Certification Badges**: 
- Official certification logos from AWS, Google Cloud, Azure, etc.
- Square or rectangular format
- Consistent sizing across all badges
- White or transparent backgrounds

**Training Provider Logos**: 
- Platform logos (Udemy, Coursera, Pluralsight, etc.)
- Consistent height, variable width
- Professional presentation

**Blog Featured Images**: 
- Relevant technical imagery (code snippets, infrastructure diagrams, security concepts)
- 16:9 aspect ratio
- High contrast for text overlay
- Fallback: Category-based gradient with icon

## Responsive Breakpoints

- Mobile: < 768px (single column layouts)
- Tablet: 768px - 1024px (2 columns for most grids)
- Desktop: > 1024px (3-4 columns, full layout features)

## Admin Panel (/nexus)

- Clean dashboard layout with sidebar navigation
- Login page: Centered card with username/password inputs
- CRUD interfaces: Table views with action buttons, modal forms for add/edit
- Image upload: Drag-and-drop zones with preview
- Form styling: Consistent with main site but with admin-specific highlights
- Success/error notifications: Toast messages
- Logout button in top-right corner

## Additional Notes

- All interactive elements have clear focus states for accessibility
- Form inputs have proper labels and validation feedback
- Maintain consistent spacing and alignment throughout
- Use subtle shadows and borders to create depth without overwhelming
- Technical credibility: Use authentic data, real certifications, genuine project descriptions
- Mobile-first approach with progressive enhancement for larger screens