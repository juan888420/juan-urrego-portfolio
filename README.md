# Juan Pablo Urrego | Portfolio

Personal portfolio built as a product: dark, minimal and motion-driven, inspired by Raycast, Linear and Vercel.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)

A single-page portfolio for a full-stack developer focused on AI products and automations. It showcases projects, skills and contact info with a premium dark UI, custom canvas animations and careful attention to spacing and typography.

<!-- Screenshot: replace with a real capture of the hero section -->
<!-- ![Portfolio hero](docs/screenshot-hero.png) -->

## Features

- Interactive hero background rendered on canvas: cursor-lit grid, animated diamond with shimmer stripes and parallax gradient orbs
- Projects section with a featured card and a responsive secondary grid
- Skills section with category tabs, staggered card reveal and a touch carousel with snap scrolling on mobile
- Glassmorphism details: frosted panels, crystal band separators and animated section dividers with floating particles
- Fully responsive, mobile-first layout with a floating pill navbar and sheet menu
- Subtle motion throughout via Framer Motion, tuned to stay out of the way

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org) (strict)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com) primitives (Radix UI)
- Icons: [Lucide](https://lucide.dev), [Phosphor](https://phosphoricons.com), react-icons

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/juan888420/new-portafolio.git
   cd new-portafolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

Available scripts:

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

Content (projects, skills, copy) lives directly in the section components under `src/components/sections`, so updating the portfolio is editing typed data arrays, no CMS required.

## Project Structure

```
src/
├── app/                  # App Router: layout, page, global styles
├── components/
│   ├── layout/           # Navbar, Footer, Container
│   ├── sections/         # Hero, HeroBackground, Projects, Skills, Contact
│   └── ui/               # shadcn/ui primitives + custom pieces (SectionDivider, RaycastBadge)
└── lib/                  # Utilities (cn helper)
```

## License

No license file yet. All rights reserved.
