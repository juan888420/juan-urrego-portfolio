"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import Container from "@/components/layout/Container";
import ProjectCard, { type Project } from "@/components/ui/ProjectCard";

// ──────────────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────────────

const GITHUB_PROFILE = "https://github.com/juan888420";

const PROJECTS: Project[] = [
  {
    slug:        "Vectra",
    title:       "Vectra",
    tagline:     "Simulador de escenarios financieros personales.",
    description:
      "Modela decisiones financieras antes de tomarlas: escenarios con productos, categorías e ingresos, y su impacto proyectado a mes, semestre y año. API en Fastify con JWT y refresh tokens; React con TanStack Query y validación con Zod.",
    stack:       ["React", "TypeScript", "Fastify", "Prisma", "PostgreSQL"],
    image:       "/vectra1.png",
    githubUrl:   "https://github.com/juan888420/vectra",
    accent:      "248 113 113",
  },
  {
    slug:        "Vigia",
    title:       "Vigía",
    tagline:     "Control y seguimiento de contratos públicos.",
    description:
      "Centraliza los expedientes de una oficina pública y muestra en segundos el estado documental, financiero y temporal de cada contrato. Un motor de reglas determinístico calcula saldos, plazos y alertas; la IA solo propone y el usuario valida.",
    stack:       ["Next.js", "Fastify", "Prisma", "PostgreSQL", "Supabase"],
    isPrivate:   true,
    accent:      "52 211 153",
  },
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

        {/* Grid - 3 + 3, staggered */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.slug} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* More projects */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
          className="mt-12 flex justify-center"
        >
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-[14px] font-medium text-[#d4d4d8] outline-none transition-colors duration-200 hover:border-[#f97316]/40 hover:text-[#f4f4f5] focus-visible:ring-2 focus-visible:ring-[#f97316]/50"
          >
            <GithubLogo weight="fill" className="h-4 w-4" />
            Ver más proyectos
            <ArrowUpRight
              weight="bold"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

      </Container>
    </section>
  );
}
