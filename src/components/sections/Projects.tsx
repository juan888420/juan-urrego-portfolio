"use client";

// Design read: developer portfolio for design-conscious recruiters + clients,
// dark-tech / Raycast-inspired aesthetic, Tailwind v4, motion/react.
// Dials: DESIGN_VARIANCE: 7 / MOTION_INTENSITY: 5 / VISUAL_DENSITY: 4

import { motion } from "framer-motion";
import { ArrowUpRight, GithubLogo, ArrowRight } from "@phosphor-icons/react";
import Container from "@/components/layout/Container";

// ──────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────

interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  image: string;          // picsum.photos/seed/{slug}/{w}/{h}
  liveUrl?: string;
  githubUrl?: string;
  accent: string;         // RGB triplet for accent stripe
}

// ──────────────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────────────

const FEATURED: Project = {
  slug:        "AI-OS",
  title:       "AI-OS",
  tagline:     "An AI operating system for your business.",
  description:
    "A conversational assistant that understands your business, replies to customers and executes real actions. Connects WhatsApp, Gmail, Google Calendar and CRM into a single live control panel. No complex setup.",
  stack:       ["Next.js", "TypeScript", "Claude API", "Supabase", "Tailwind"],
  image:       "/ai-os.png",
  liveUrl:     "#",
  githubUrl:   "https://github.com/juan888420/ai-os",
  accent:      "94 234 212",
};

const SECONDARY: Project[] = [
  {
    slug:        "MediReserva",
    title:       "MediReserva",
    tagline:     "Automation for dental clinics.",
    description:
      "WhatsApp-native appointment system with AI triage and automatic follow-ups. Connects n8n, Supabase, and Manychat into a single workflow that saves the front desk two hours a day.",
    stack:       ["n8n", "Supabase", "Claude API", "Manychat"],
    image:       "/medirerva.png",
    liveUrl:     "https://reservas-project-production.up.railway.app/",
    githubUrl:   "https://github.com/juan888420/Reservas-project",
    accent:      "99 102 241",
  },
  {
    slug:        "Job-Tracker",
    title:       "Job-Tracker",
    tagline:     "Your knowledge base, searchable by meaning.",
    description:
      "A personal RAG system that indexes notes, PDFs, and URLs into a pgvector store. Ask questions in plain language, get answers with citations. Zero cloud lock-in.",
    stack:       ["Next.js", "Supabase pgvector", "Embeddings", "TypeScript"],
    image:       "https://picsum.photos/seed/shelf-library-books-dark/800/600",
    githubUrl:   "https://github.com/juan888420/job-tracker",
    accent:      "167 139 250",
  },
  {
    slug:        "MistherBarber",
    title:       "MistherBarber",
    tagline:     "Analytics for vacation rental hosts.",
    description:
      "Real-time occupancy and revenue dashboard that pulls from Airbnb, Booking.com, and direct channels. Built for a host managing 14 properties who was drowning in spreadsheets.",
    stack:       ["Next.js", "Supabase", "Recharts", "Node.js"],
    image:       "/misther_barber.png",
    liveUrl:     "https://misther-baber-dqv2vebj2-juan-pablo-s-projects17.vercel.app/",
    githubUrl:   "https://github.com/juan888420/Misther_Baber",
    accent:      "212 175 55",
  },
];

// ──────────────────────────────────────────────────────────────────────────
// Motion helpers
// ──────────────────────────────────────────────────────────────────────────

const EASE = [0.23, 1, 0.32, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.02 } },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 12, scale: 0.98 },
  visible:  { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: EASE } },
};

// ──────────────────────────────────────────────────────────────────────────
// Section
// ──────────────────────────────────────────────────────────────────────────

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 bg-[#09090b] py-28 sm:py-36">
      <Container>
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="mb-14"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-[#f4f4f5] sm:text-4xl">
            Proyectos
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#a1a1aa]">
            Productos reales, stacks reales. Sin demos de tutorial.
          </p>
        </motion.div>

        {/* Featured card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={itemVariants}
        >
          <FeaturedCard project={FEATURED} />
        </motion.div>

        {/* Secondary grid - staggered */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SECONDARY.map((project) => (
            <motion.div key={project.slug} variants={itemVariants}>
              <SecondaryCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
          className="mt-12 flex"
        >
          <a
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-[14px] font-medium text-[#a1a1aa] transition-colors duration-200 hover:border-white/[0.2] hover:text-[#f4f4f5]"
          >
            Ver todos los proyectos
            <ArrowRight
              weight="regular"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Featured card - landscape, split layout
// Content lives on the left; image fills the right.
// Hover: border + shadow deepen, image zooms slightly (contained by overflow-hidden).
// ──────────────────────────────────────────────────────────────────────────

function FeaturedCard({ project }: { project: Project }) {
  return (
    <div
      style={{ ["--accent" as string]: project.accent }}
      className="group relative grid min-h-[420px] overflow-hidden rounded-2xl border border-white/[0.08] transition-[border-color,box-shadow] duration-300 hover:border-[rgb(var(--accent)/0.3)] hover:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.6)] lg:grid-cols-[1fr_1.1fr]"
    >
      {/* Left - content panel */}
      <div className="relative z-10 flex flex-col justify-between bg-[#0d0d10] p-8 sm:p-10">
        {/* Accent top bar */}
        <div
          className="mb-8 h-px w-12 rounded-full"
          style={{ background: `rgb(var(--accent))` }}
        />

        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#f4f4f5] sm:text-3xl">
            {project.title}
          </h3>
          <p
            className="mt-1 text-[14px] font-medium"
            style={{ color: `rgb(var(--accent))` }}
          >
            {project.tagline}
          </p>
          <p className="mt-4 max-w-[38ch] text-[14px] leading-relaxed text-[#a1a1aa]">
            {project.description}
          </p>
        </div>

        <div className="mt-8 space-y-5">
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 font-mono text-[11px] tracking-wide text-[#8a8a93]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.1)] px-4 py-2 text-[13px] font-medium text-[rgb(var(--accent))] transition-colors duration-200 hover:bg-[rgb(var(--accent)/0.18)]"
              >
                Ver proyecto
                <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] px-4 py-2 text-[13px] font-medium text-[#a1a1aa] transition-colors duration-200 hover:border-white/[0.2] hover:text-[#f4f4f5]"
              >
                <GithubLogo weight="fill" className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Right - image panel */}
      <div className="relative min-h-[280px] overflow-hidden bg-[#0a0a0c] lg:min-h-0">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-contain object-center p-3 transition-transform duration-700 group-hover:scale-[1.02] sm:p-5"
        />
        {/* Inner edge fade toward content panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d10] via-transparent to-transparent lg:from-[#0d0d10]/60" />
        {/* Bottom scrim for mobile (image is below content) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/70 via-transparent to-transparent lg:hidden" />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Secondary card - portrait, image top / content bottom
// Hover: image zooms, border + shadow deepen (no scale on card itself).
// ──────────────────────────────────────────────────────────────────────────

function SecondaryCard({ project }: { project: Project }) {
  return (
    <div
      style={{ ["--accent" as string]: project.accent }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d10] transition-[border-color,box-shadow] duration-300 hover:border-[rgb(var(--accent)/0.28)] hover:shadow-[0_20px_50px_-16px_rgba(0,0,0,0.55)]"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-[#0a0a0c]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-contain object-center p-2.5 transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10]/30 to-transparent" />
        {/* Accent stripe bottom of image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-60"
          style={{ background: `linear-gradient(90deg, rgb(var(--accent)/0.7), transparent)` }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="text-[16px] font-semibold tracking-tight text-[#f4f4f5]">
            {project.title}
          </h3>
          <p
            className="mt-0.5 text-[12px] font-medium"
            style={{ color: `rgb(var(--accent))` }}
          >
            {project.tagline}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-[#9a9aa3]">
            {project.description}
          </p>
        </div>

        <div className="mt-5 space-y-4">
          {/* Stack chips */}
          <div className="flex flex-nowrap gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="shrink-0 whitespace-nowrap rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 font-mono text-[11px] tracking-wide text-[#8a8a93]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Separator */}
          <div className="h-px bg-white/[0.06]" />

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.1)] px-4 py-2 text-[13px] font-medium text-[rgb(var(--accent))] transition-colors duration-200 hover:bg-[rgb(var(--accent)/0.18)]"
              >
                Ver proyecto
                <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] px-4 py-2 text-[13px] font-medium text-[#a1a1aa] transition-colors duration-200 hover:border-white/[0.2] hover:text-[#f4f4f5]"
              >
                <GithubLogo weight="fill" className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}