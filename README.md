# Professional Portfolio Application

## Overview

This is a modern, cosmic-themed professional portfolio website built as a single-page application (SPA). The portfolio showcases personal information, projects, skills, certifications, and contact details with an immersive space/cosmic visual theme. The application features smooth scrolling navigation, responsive design, and interactive UI components.

The portfolio is designed for an aspiring engineer named Veronque Andrie, displaying their professional work including web development projects (Webtracker, Buddydash, Library Management System) and AI projects (Facial Recognition), along with various technical certifications from AWS, Microsoft, Cisco, and other providers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Single-page application (SPA) architecture using Wouter for lightweight client-side routing

**UI Component System**
- Shadcn/ui component library (New York style variant) for consistent, accessible UI components
- Radix UI primitives as the foundation for complex interactive components (dialogs, dropdowns, tooltips, etc.)
- Tailwind CSS for utility-first styling with custom design tokens and CSS variables
- Component architecture follows a modular pattern with reusable UI components in `client/src/components/ui/`

**Styling Approach**
- CSS-in-JS via Tailwind with custom configuration supporting light/dark themes
- Custom color system using HSL values with CSS variable fallbacks for theming
- Typography system using Google Fonts: Space Grotesk, Inter, and Orbitron
- Responsive design with mobile-first breakpoints
- Custom animations and transitions for cosmic/immersive effects

**State Management**
- TanStack Query (React Query) for server state management and caching
- React hooks (useState, useEffect) for local component state
- Context API for theme management (light/dark mode)

**Page Structure**
- Single main portfolio page (`Portfolio.tsx`) composed of multiple section components:
  - HeroSection: Landing section with profile image and introduction
  - AboutSection: Professional background and statistics
  - ProjectsSection: Portfolio of completed projects with images
  - SkillsSection: Technical skills categorized by type
  - CertificationsSection: Professional certifications with modal views
  - ContactSection: Contact form and social links
  - Footer: Site navigation and additional links
- CosmicBackground: Canvas-based animated background with particle effects
- Navigation: Fixed header with smooth scroll-to-section functionality

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- TypeScript for type safety across the entire stack
- ESM (ES Modules) for modern JavaScript module system

**Development Setup**
- Vite middleware integration in development for seamless HMR
- Custom logging middleware for API request tracking
- Static file serving for production builds
- Request body parsing with raw body preservation for webhook handling

**API Structure**
- RESTful API design with `/api` prefix for all endpoints
- Currently using in-memory storage (MemStorage) as data layer abstraction
- Storage interface (`IStorage`) designed for easy migration to database persistence
- User management capabilities (getUser, getUserByUsername, createUser) defined but not yet utilized

**Build & Deployment**
- Production build process uses esbuild for server bundling
- Client assets built with Vite and served from `dist/public`
- Environment-aware configuration (NODE_ENV) for development vs production behavior

### Data Storage Solutions

**Current Implementation**
- In-memory storage using Map data structures
- Storage abstraction interface allows for future database integration without changing application code

**Database Schema (Prepared but not actively used)**
- Drizzle ORM configured for PostgreSQL with Neon serverless driver
- User table schema defined with:
  - UUID primary keys (generated via `gen_random_uuid()`)
  - Username and password fields
  - Zod validation schemas for type-safe insertions
- Migration system configured via Drizzle Kit

**Design Decision**
The application currently uses in-memory storage because it's primarily a static portfolio showcase. The database infrastructure is prepared for future features like contact form submissions, analytics, or user authentication, but these features are not yet implemented. This approach keeps the initial deployment simple while maintaining the flexibility to add persistence later.

### Authentication and Authorization

**Current State**
- No authentication implemented in the current version
- User schema exists in the database schema but is not actively used
- Portfolio is a public-facing application with no protected routes

**Prepared Infrastructure**
- User table with username/password fields ready for authentication implementation
- Express session middleware (`connect-pg-simple`) available in dependencies for session management when needed

### External Dependencies

**UI Component Libraries**
- Radix UI: Comprehensive set of unstyled, accessible component primitives
- Shadcn/ui: Styled component implementations built on Radix UI
- Lucide React: Icon library for consistent iconography
- React Icons: Additional icon sets (Simple Icons for brand logos)

**Styling & Design**
- Tailwind CSS: Utility-first CSS framework
- class-variance-authority: Type-safe variant management for components
- clsx & tailwind-merge: Conditional class name utilities
- PostCSS & Autoprefixer: CSS processing pipeline

**Forms & Validation**
- React Hook Form: Form state management and validation
- Zod: Schema validation for type-safe data handling
- @hookform/resolvers: Integration between React Hook Form and Zod

**Data Fetching**
- TanStack Query: Asynchronous state management for server data
- Custom fetch wrapper with error handling and credential management

**Development Tools**
- Replit-specific plugins for development experience (vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner)
- TypeScript for static type checking across the entire codebase

**Database & ORM (Configured but not actively used)**
- Drizzle ORM: Type-safe ORM for PostgreSQL
- @neondatabase/serverless: Serverless PostgreSQL driver
- drizzle-zod: Integration between Drizzle and Zod for schema validation
- pg & connect-pg-simple: PostgreSQL client and session store

**Build Tools**
- Vite: Frontend build tool and dev server
- esbuild: JavaScript bundler for server-side code
- tsx: TypeScript execution for development

**Routing**
- Wouter: Minimalist client-side routing library (lightweight alternative to React Router)

**Date Utilities**
- date-fns: Modern date utility library for JavaScript

**UI Enhancement Libraries**
- cmdk: Command palette component
- embla-carousel-react: Carousel/slider functionality
- vaul: Drawer component for mobile interfaces
- input-otp: OTP/PIN input component
- recharts: Charting library (available but not currently used in portfolio)