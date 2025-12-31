# Legal Tech Frontend

A modern legal technology SaaS platform built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **UI Library:** React 19.2.3
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Linting:** ESLint 9

## Project Structure

```
legal-tech-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx              # Homepage/Landing page
│   │   ├── globals.css           # Global styles and Tailwind imports
│   │   ├── signin/
│   │   │   └── page.tsx          # Sign in page
│   │   └── signup/
│   │       └── page.tsx          # Sign up page
│   ├── components/
│   │   ├── navbar/
│   │   │   ├── Navbar.tsx        # Main navigation component
│   │   │   ├── DropdownMenu.tsx  # Reusable dropdown component
│   │   │   └── MobileMenu.tsx    # Mobile navigation menu
│   │   ├── footer/
│   │   │   └── Footer.tsx        # Site footer component
│   │   └── ui/
│   │       ├── Input.tsx         # Reusable input field component
│   │       └── Button.tsx        # Reusable button component
│   └── lib/
│       └── colors.ts             # Centralized color system
├── public/
│   ├── logo.png                  # Company logo
│   ├── video.mp4                 # Homepage background video
│   ├── singup.png                # Signup page asset
│   ├── file.svg                  # Icon assets
│   ├── globe.svg
│   └── window.svg
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
├── eslint.config.mjs             # ESLint configuration
└── package.json                  # Project dependencies

```

## Available Routes

### Public Routes

- **/** - Homepage/Landing page with hero section, features, and call-to-action
- **/signin** - User authentication sign-in page
- **/signup** - User registration sign-up page
## Design System

### Color Scheme
- Primary: Black and White
- Text: Black on white backgrounds
- Borders: Neutral gray tones
- Focus states: Black ring
- Hover states: Black/White transitions

### Spacing
- Consistent padding and margins
- Responsive breakpoints (sm, md, lg, xl)
- Grid-based layouts

## Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Development Server

The application runs on `http://localhost:3000` by default.

## Key Features Implementation

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Adaptive layouts for all screen sizes
- Touch-friendly mobile interface

## Component Architecture

### Reusable Components
All UI components are built to be reusable and accept props for customization:
- Input fields with validation
- Buttons with variants and loading states
- Dropdown menus with dynamic content
- Navigation components with responsive behavior

### Component Props
Components use TypeScript interfaces for type safety and clear prop definitions.

## Styling Approach

- Tailwind CSS utility classes
- Component-level styling
- Responsive utilities
- Custom color system in lib/colors.ts
- No external CSS libraries

## Future Enhancement Areas

- Protected routes with authentication
- User dashboard
- Document management system
- Case tracking features
- Analytics integration
- API integration
- Database connection
- User profile management

## Notes

- The project uses Next.js App Router (not Pages Router)
- All components are client components ('use client') where interactivity is needed
- Images are optimized using Next.js Image component
- TypeScript is used throughout for type safety
