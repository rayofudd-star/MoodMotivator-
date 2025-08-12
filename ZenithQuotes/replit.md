# Overview

This is a modern emotion-based quote application that helps users discover inspirational quotes based on their current emotional state. The app presents a clean, interactive interface where users select emotions through animated buttons and receive curated quotes with smooth animations. Built as a full-stack application with a React frontend and Express backend, it features a sophisticated emotion management system with quote randomization to avoid repetition.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side uses a modern React stack with TypeScript and Vite for development. The architecture follows a component-based design with:

- **React Router**: Uses Wouter for lightweight client-side routing
- **State Management**: Leverages TanStack Query for server state management and React hooks for local state
- **Animation System**: Framer Motion provides smooth transitions and interactive animations throughout the UI
- **Styling Framework**: Tailwind CSS with shadcn/ui components for a consistent design system
- **Component Structure**: Well-organized component hierarchy with reusable UI components under `/components/ui/`

The frontend is configured with path aliases (@, @shared, @assets) for clean imports and uses TypeScript for type safety across all components.

## Backend Architecture

The server uses Express.js with TypeScript in a RESTful API design:

- **Route Organization**: Clean separation of API routes handling emotions and quotes
- **Data Storage**: Currently uses in-memory storage with the IStorage interface, allowing for easy database integration later
- **Quote Management**: Sophisticated randomization system that tracks used quotes to prevent immediate repetition
- **Development Setup**: Integrated Vite middleware for hot module replacement during development

The backend follows a modular pattern with clear separation between route handlers, storage layer, and server configuration.

## Database Design

The application uses a PostgreSQL schema managed by Drizzle ORM:

- **quotes table**: Stores quote text, author, and associated emotion
- **emotions table**: Manages emotion metadata including icons and display names
- **users table**: Prepared for future authentication features

Drizzle provides type-safe database operations with automatic TypeScript inference from the schema definitions.

## UI/UX Architecture

The interface uses a card-based layout with:

- **Emotion Selection**: Grid of interactive buttons with emoji icons and hover effects
- **Quote Display**: Animated quote cards with author attribution and emotion context
- **Responsive Design**: Mobile-first approach using Tailwind's responsive utilities
- **Visual Polish**: Floating background elements and smooth transitions create an engaging user experience

## Development Workflow

The build system supports:

- **Development Mode**: Vite dev server with HMR for the frontend, nodemon-like behavior for the backend
- **Production Build**: Separate builds for client (Vite) and server (esbuild)
- **Type Checking**: Comprehensive TypeScript configuration covering client, server, and shared code
- **Database Migrations**: Drizzle Kit for schema management and database updates

# External Dependencies

## UI Framework Dependencies

- **React Ecosystem**: React 18 with TypeScript support
- **Radix UI**: Comprehensive set of unstyled, accessible UI components
- **shadcn/ui**: Pre-styled component library built on Radix primitives
- **Framer Motion**: Animation library for smooth transitions and interactions
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens

## Backend Dependencies

- **Express.js**: Web framework for the REST API
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL support
- **Neon Database**: Serverless PostgreSQL database provider
- **TanStack Query**: Server state management and caching

## Development Tools

- **Vite**: Build tool and development server
- **esbuild**: Fast JavaScript bundler for production builds
- **TypeScript**: Type checking and enhanced developer experience
- **Drizzle Kit**: Database schema management and migration tool

## Database Integration

- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **PostgreSQL**: Primary database for production deployment
- **Connection Pooling**: Configured through environment variables for scalable database access

The application is designed to be deployed on platforms like Replit with automatic database provisioning through environment variables.