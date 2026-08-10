"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
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
  image: string;          // screenshot under /public
  liveUrl?: string;
  githubUrl?: string;
  accent: string;         // RGB triplet for accent stripe
}

// ──────────────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────────────

const FEATURED: Project = {
  slug:        "Vectra",
  title:       "Vectra",
  tagline:     "Simulador de escenarios financieros personales.",
  description:
    "Modela decisiones financieras antes de tomarlas: construye escenarios combinando productos reutilizables, categorías y fuentes de ingreso, y compara su impacto proyectado a mes, semestre y año. API en Fastify con JWT y refresh tokens; frontend en React con TanStack Query y validación end-to-end con Zod.",
  stack:       ["React", "TypeScript", "Fastify", "Prisma", "PostgreSQL"],
  image:       "/vectra1.png",
  githubUrl:   "https://github.com/juan888420/vectra",
  accent:      "248 113 113",
};

const SECONDARY: Project[] = [
  {
    slug:        "AI-OS",
    title:       "AI-OS",
    tagline:     "Plataforma de IA conversacional para negocios.",
    description:
      "Asistente de chat en tiempo real impulsado por la Claude API, con queries reactivas e historial persistente por cliente sobre Convex. MVP en TypeScript estricto con landing de demo en vivo; integraciones con WhatsApp, CRM y agendamiento en el roadmap.",
    stack:       ["React", "TypeScript", "Vite", "Convex", "Claude API"],
    image:       "/ai-os.png",
    githubUrl:   "https://github.com/juan888420/ai-os",
    accent:      "94 234 212",
  },
  {
    slug:        "MediReserva",
    title:       "MediReserva",
    tagline:     "Tu cita médica, a un clic.",
    description:
      "Los pacientes eligen médico, horario disponible y pagan con PayPal; los médicos inician sesión para ver sus citas confirmadas. Supabase maneja auth y row-level security, con procedimientos atómicos que evitan el doble agendamiento y Resend enviando los correos de confirmación.",
    stack:       ["Next.js", "Supabase", "PayPal", "Resend", "Tailwind"],
    image:       "/medirerva.png",
    liveUrl:     "https://reservas-project-production.up.railway.app/",
    githubUrl:   "https://github.com/juan888420/Reservas-project",
    accent:      "99 102 241",
  },
  {
    slug:        "Job-Tracker",
    title:       "Job-Tracker",
    tagline:     "Todas tus postulaciones en un solo lugar.",
    description:
      "Dashboard SaaS para gestionar postulaciones de empleo: CRUD completo, filtros, seguimiento de estados y gráficas de estadísticas, detrás de rutas protegidas con JWT. Express y Prisma impulsan la API mientras React Query mantiene el cliente sincronizado.",
    stack:       ["React", "Vite", "Express", "Prisma", "PostgreSQL"],
    image:       "/job-tracker.png",
    githubUrl:   "https://github.com/juan888420/job-tracker",
    accent:      "167 139 250",
  },
  {
    slug:        "MistherBarber",
    title:       "MistherBarber",
    tagline:     "Presencia web moderna para una barbería.",
    description:
      "Sitio de marketing para una marca de barbería: servicios, estilo e información de reservas en un layout limpio y visual. Construido con Svelte y desplegado en Vercel.",
    stack:       ["Svelte", "Tailwind", "Vercel"],
    image:       "/misther_barber.png",
    liveUrl:     "https://misther-baber.vercel.app/",
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
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SECONDARY.map((project) => (
            <motion.div key={project.slug} variants={itemVariants}>
              <SecondaryCard project={project} />
            </motion.div>
          ))}
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
                className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 font-mono text-[11px] tracking-wide text-[#8a8a93] transition-colors duration-200 hover:border-[rgb(var(--accent)/0.4)] hover:bg-[rgb(var(--accent)/0.08)] hover:text-[rgb(var(--accent))]"
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
                className="group/btn inline-flex w-[142px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.1)] px-4 py-2 text-[13px] font-medium text-[rgb(var(--accent))] outline-none transition-colors duration-200 hover:bg-[rgb(var(--accent)/0.18)] focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent)/0.6)]"
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
                className="inline-flex w-[142px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/[0.1] px-4 py-2 text-[13px] font-medium text-[#a1a1aa] outline-none transition-colors duration-200 hover:border-white/[0.2] hover:text-[#f4f4f5] focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <GithubLogo weight="fill" className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Right - image panel */}
      <div className="relative min-h-[280px] overflow-hidden bg-[#0a0a0c] lg:min-h-0">
        <Image
          src={project.image}
          alt={`Captura de pantalla de ${project.title}`}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-contain object-center p-3 transition-transform duration-700 group-hover:scale-[1.02] sm:p-5"
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
        <Image
          src={project.image}
          alt={`Captura de pantalla de ${project.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain object-center p-2.5 transition-transform duration-700 group-hover:scale-[1.03]"
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
            className="mt-0.5 min-h-[36px] text-[12px] font-medium leading-relaxed"
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
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="whitespace-nowrap rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 font-mono text-[11px] tracking-wide text-[#8a8a93] transition-colors duration-200 hover:border-[rgb(var(--accent)/0.4)] hover:bg-[rgb(var(--accent)/0.08)] hover:text-[rgb(var(--accent))]"
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
                className="group/btn inline-flex w-[142px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.1)] px-4 py-2 text-[13px] font-medium text-[rgb(var(--accent))] outline-none transition-colors duration-200 hover:bg-[rgb(var(--accent)/0.18)] focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent)/0.6)]"
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
                className="inline-flex w-[142px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/[0.1] px-4 py-2 text-[13px] font-medium text-[#a1a1aa] outline-none transition-colors duration-200 hover:border-white/[0.2] hover:text-[#f4f4f5] focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <GithubLogo weight="fill" className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}