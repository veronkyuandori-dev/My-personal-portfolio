# Professional Portfolio Application

## Overview

A modern, "Void Terminal" dark editorial professional portfolio website built as a single-page application (SPA) using React and TypeScript. The portfolio showcases personal information, projects, skills, certifications, and contact details for an aspiring software engineer. Features include an animated cosmic background with particle effects, smooth section navigation, a 3D AI chatbot integration, light/dark theme support, and a contact form with email notifications via Resend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing (SPA)
- Path aliases configured: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

**UI Component System**
- Shadcn/ui component library (New York style variant) located in `client/src/components/ui/`
- Radix UI primitives for accessible interactive components
- Tailwind CSS with custom design tokens via CSS variables
- Custom fonts: Space Grotesk, Inter (loaded via Google Fonts CDN)

**State Management**
- TanStack Query (React Query) for server state and API caching
- React hooks for local component state
- Theme toggle stored in localStorage with system preference detection

**Key Components**
- `Portfolio.tsx`: Main page composing all sections (Hero, About, Projects, GitHub Stats, Skills, Certifications, Blog, Contact)
- `EnhancedCosmicBackground.tsx`: Canvas-based animated particle background
- `ChatBot3D.tsx`: 3D AI chatbot using Three.js (@react-three/fiber, @react-three/drei)
- `ThemeToggle.tsx`: Light/dark mode switcher
- `AnimationWrapper.tsx`: Scroll-triggered animation component

### Backend Architecture

**Server Framework**
- Express.js with TypeScript running on Node.js
- Entry point: `server/index.ts`
- Routes registered in `server/routes.ts`

**API Structure**
- RESTful endpoints under `/api/` prefix
- Contact form: `POST /api/contact` - stores messages and sends email via Resend
- Blog endpoints: `GET /api/blogs`, `GET /api/blogs/:id`
- Chat endpoints: conversation and message CRUD for AI chatbot
- Image generation: `POST /api/generate-image` using OpenAI integration

**Replit Integrations**
- Located in `server/replit_integrations/`
- Chat module: AI-powered conversations using OpenAI API
- Image module: Image generation using `gpt-image-1` model
- Batch processing utilities with rate limiting and retries

### Data Storage

**Database**
- PostgreSQL via Drizzle ORM
- Neon serverless PostgreSQL driver (`@neondatabase/serverless`)
- Schema defined in `shared/schema.ts`
- Migrations output to `./migrations/` directory
- Run `npm run db:push` to push schema changes

**Schema Tables**
- `users`: id, username, password
- `messages`: contact form submissions with name, email, subject, category, message, fileUrl
- `blogs`: id, title, excerpt, content, category, date, imageUrl
- `conversations` and `messages` (chat): defined in `shared/models/chat.ts`

**Storage Layer**
- `server/storage.ts` provides `IStorage` interface with both database and in-memory implementations
- `MemStorage` class used as fallback/development storage with seeded blog data

### Development & Build

**Scripts**
- `npm run dev`: Start development server with hot reload
- `npm run build`: Build for production (Vite frontend + esbuild backend)
- `npm run start`: Run production build
- `npm run check`: TypeScript type checking
- `npm run db:push`: Push Drizzle schema to database

**Configuration Files**
- `vite.config.ts`: Vite build configuration with React plugin and Replit plugins
- `tailwind.config.ts`: Custom Tailwind theme with HSL color variables
- `tsconfig.json`: TypeScript configuration with path aliases
- `components.json`: Shadcn/ui configuration
- `drizzle.config.ts`: Drizzle ORM database configuration

## External Dependencies

**Third-Party Services**
- **Resend**: Email delivery for contact form notifications (requires `RESEND_API_KEY` environment variable)
- **OpenAI API**: AI chat and image generation via Replit AI Integrations (requires `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL`)
- **Neon**: Serverless PostgreSQL database (requires `DATABASE_URL` environment variable)
- **Google Fonts CDN**: Typography (Space Grotesk, Inter)

**Key NPM Packages**
- Frontend: React, Wouter, TanStack Query, Radix UI, Tailwind CSS, Three.js (@react-three/fiber, @react-three/drei), react-hook-form, zod
- Backend: Express, Drizzle ORM, Resend, OpenAI SDK
- Development: Vite, esbuild, TypeScript, drizzle-kit