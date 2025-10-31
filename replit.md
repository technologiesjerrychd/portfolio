# Portfolio Website - Gourav Arora

## Project Overview
This is a professional portfolio website built for Gourav Arora, showcasing his skills, projects, certifications, experience, training, and blog posts. The site features a modern, responsive design with an integrated admin panel for content management.

**Purpose**: Personal portfolio website with content management capabilities
**Tech Stack**: React, TypeScript, Express.js, Vite, TailwindCSS
**Last Updated**: October 25, 2025

## Key Features
- **Public Portfolio**: Hero section, skills showcase, project gallery, certifications, experience timeline, training, blog, and contact form
- **Admin Dashboard**: Secure admin panel accessible at `/nexus` for managing all portfolio content
- **Responsive Design**: Mobile-first design with dark/light theme support
- **Content Management**: Full CRUD operations for all content types
- **File-Based Storage**: JSON file storage in `/data` directory (no database required)

## Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: TailwindCSS with custom design system
- **UI Components**: Radix UI primitives + custom components
- **State Management**: TanStack Query for server state
- **Animations**: Framer Motion

### Backend
- **Server**: Express.js (Node.js)
- **Port**: 5000 (frontend and backend integrated)
- **Host**: 0.0.0.0 for frontend serving
- **Storage**: File-based JSON storage (no database)
- **Authentication**: Session-based auth for admin panel

### Project Structure
```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities
│   └── public/          # Static assets
├── server/              # Backend Express server
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   ├── storage.ts       # File storage layer
│   └── vite.ts          # Vite dev server setup
├── shared/              # Shared TypeScript types/schemas
├── data/                # JSON data files
└── public/images/       # Image assets
```

## Development

### Running Locally
The project is configured to run with a single command:
```bash
npm run dev
```
This starts the Express server with Vite middleware on port 5000.

### Available Scripts
- `npm run dev` - Start development server (port 5000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema (if using database)

### Key Configuration Files
- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - TailwindCSS theming
- `tsconfig.json` - TypeScript compiler options
- `drizzle.config.ts` - Database configuration (not currently used)

## Deployment
The project is configured for Replit Autoscale deployment:
- **Build Command**: `npm run build`
- **Run Command**: `npm start`
- **Deployment Type**: Autoscale (stateless)

## Admin Access
The admin panel is accessible at `/nexus` and requires authentication. Admin credentials should be configured through environment variables or the authentication system.

## Content Management
All content is stored in JSON files in the `/data` directory:
- `skills.json` - Technical skills
- `projects.json` - Portfolio projects
- `certifications.json` - Professional certifications
- `training.json` - Training and courses
- `experience.json` - Work experience
- `blogs.json` - Blog posts
- `social.json` - Social media links
- `contact.json` - Contact information
- `profile.json` - Profile information

## Recent Changes
**October 25, 2025**:
- Imported project from GitHub
- Configured for Replit environment
- Added `.gitignore` for Node.js project
- Set up development workflow on port 5000
- Configured deployment settings (Autoscale)
- Updated browserslist database to latest version
- Verified website is running correctly with proper host configuration
- Fixed profile image loading issue:
  - Updated Hero component to remove broken image imports
  - Copied images from root `public/images/` to `client/public/images/` for Vite dev server
  - Verified images are now loading correctly in development mode
- Fixed blog "Read More" functionality:
  - Created BlogDetail page component to display full blog posts
  - Added `/blog/:slug` route to App.tsx
  - Updated BlogCard to navigate to blog detail page
- **Added Training Courses Feature**:
  - Created Course schema and data structure
  - Built courses API endpoints (GET, POST, PUT, DELETE)
  - Created CourseCard component to display course information
  - Added "Training Courses Offered" section to portfolio
  - Integrated course selection in contact form
  - Clients can now browse courses (AWS, Azure, DevOps, Ethical Hacking)
  - "Enroll Now" button scrolls to contact form with pre-filled course info
  - Contact form includes course dropdown for training inquiries
  - Added "Courses" link to navigation menu

## Design Guidelines
Detailed design guidelines are documented in `design_guidelines.md`, covering:
- Professional tech aesthetic
- Typography system
- Color palette (dark/light themes)
- Component specifications
- Responsive breakpoints
- Animation patterns

## Notes
- The project already has `allowedHosts: true` configured in the Vite server setup, ensuring proper functionality in the Replit proxy environment
- **Images**: In development mode, Vite serves static files from `client/public/`. Images should be placed in `client/public/images/` to be accessible at `/images/*` paths. The root `public/images/` folder is used for production builds.
- The site uses a file-based storage system, making it easy to backup and version control content
- The admin panel requires authentication - access credentials should be configured via the authentication system
