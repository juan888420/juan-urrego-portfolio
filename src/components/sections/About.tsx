"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import Container from "@/components/layout/Container";
import Manifesto, { type ManifestoSegment } from "@/components/sections/about/Manifesto";
import SpotlightCell from "@/components/sections/about/SpotlightCell";
import LocalTime from "@/components/sections/about/LocalTime";
import Timeline, { type Milestone } from "@/components/sections/about/Timeline";

// ──────────────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────────────

const MANIFESTO: ManifestoSegment[] = [
  { text: "Construyo" },
  { text: "productos digitales de principio a fin,", accent: true },
  { text: "combinando desarrollo, diseño y pensamiento analítico. Me interesa ir más allá de hacer que las cosas funcionen: busco crear" },
  { text: "soluciones bien pensadas,", accent: true },
  { text: "técnicamente sólidas y con una experiencia de usuario cuidada." },
];

const PROFILE: { label: string; value: ReactNode }[] = [
  { label: "Base",     value: "Medellín, Colombia" },
  { label: "Hora",     value: <LocalTime /> },
  { label: "Rol",      value: "Full-Stack Developer" },
  { label: "Stack",    value: "Next.js · React · TypeScript" },
  { label: "Idiomas",  value: "Español · Inglés (B1)" },
];

const PRINCIPLES = [
  {
    title: "El detalle es el producto",
    description: "Espaciado, tipografía y movimiento con intención. La calidad se nota en lo que casi nadie mira.",
  },
  {
    title: "Arquitectura que aguanta",
    description: "Modelos de datos pensados, tests sobre la lógica crítica y migraciones versionadas desde el día uno.",
  },
  {
    title: "IA con criterio",
    description: "Si una regla determinística lo resuelve, no uso IA. Cuando sí, la IA propone y una persona valida.",
  },
];

const MILESTONES: Milestone[] = [
  {
    period:      "2026 — Presente",
    title:       "Productos propios",
    place:       "Independiente",
    description: "Productos full-stack de principio a fin: desde un simulador financiero y reservas médicas con pagos hasta un sistema en producción para el sector público.",
    current:     true,
  },
  {
    period:      "Oct 2022 — Abr 2023",
    title:       "Soporte Técnico",
    place:       "Flag Soluciones",
    description: "Unas 10 incidencias diarias resueltas, QA sobre los sistemas en uso y respaldo semanal de la información.",
  },
  {
    period:      "Formación",
    title:       "Técnico en Sistemas de Información",
    place:       "Politécnico Colombiano Jaime Isaza Cadavid",
    description: "Bases de programación, bases de datos y análisis de sistemas.",
  },
];

const NOW_STATUS = [
  { label: "Modelo de datos",      status: "Listo",   done: true },
  { label: "Motor de reglas",      status: "Listo",   done: true },
  { label: "Clasificación con IA", status: "Listo",   done: true },
];

// ──────────────────────────────────────────────────────────────────────────
// Motion helpers
// ──────────────────────────────────────────────────────────────────────────

const EASE = [0.23, 1, 0.32, 1] as const;

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cellVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// ──────────────────────────────────────────────────────────────────────────
// Section
// ──────────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-[#09090b] py-28 sm:py-36">
      <Container>
        {/* Heading + manifesto */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-[#f4f4f5] sm:text-4xl">
              Sobre mí
            </h2>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#52525b]">
              Juan Pablo Urrego · Full-Stack
            </p>
          </motion.div>

          <Manifesto segments={MANIFESTO} />
        </div>

        {/* Blueprint grid */}
        <div className="relative mt-20 sm:mt-24">
          <Crosshair className="-left-[5px] -top-[5px]" />
          <Crosshair className="-right-[5px] -top-[5px]" />
          <Crosshair className="-bottom-[5px] -left-[5px]" />
          <Crosshair className="-bottom-[5px] -right-[5px]" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={gridVariants}
            className="grid gap-px overflow-hidden border border-white/[0.07] bg-white/[0.07] lg:grid-cols-12"
          >
            {/* Perfil */}
            <motion.div variants={cellVariants} className="lg:col-span-5">
              <SpotlightCell index="01" label="Perfil">
                <dl className="divide-y divide-white/[0.06]">
                  {PROFILE.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-6 py-3 first:pt-0">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#52525b]">
                        {row.label}
                      </dt>
                      <dd className="text-right text-[14px] text-[#d4d4d8]">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-auto flex items-center gap-2 pt-6 text-[13px] text-[#a1a1aa]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Abierto a roles Full-Stack y proyectos freelance
                </p>
              </SpotlightCell>
            </motion.div>

            {/* Principios */}
            <motion.div variants={cellVariants} className="lg:col-span-7">
              <SpotlightCell index="02" label="Cómo trabajo">
                <ul className="grid gap-7 sm:grid-cols-3 sm:gap-6">
                  {PRINCIPLES.map((principle, i) => (
                    <li key={principle.title}>
                      <span className="font-mono text-[32px] font-light leading-none text-white/[0.12]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-[#f4f4f5]">
                        {principle.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#9a9aa3]">
                        {principle.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </SpotlightCell>
            </motion.div>

            {/* Trayectoria */}
            <motion.div variants={cellVariants} className="lg:col-span-7">
              <SpotlightCell index="03" label="Trayectoria">
                <Timeline items={MILESTONES} />
              </SpotlightCell>
            </motion.div>

            {/* Ahora */}
            <motion.div variants={cellVariants} className="lg:col-span-5">
              <SpotlightCell index="04" label="Ahora mismo">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f97316] opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f97316]" />
                  </span>
                  <h3 className="text-[22px] font-semibold tracking-tight text-[#f4f4f5]">
                    Vigía, en producción
                  </h3>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-[#9a9aa3]">
                  Plataforma de control contractual para una oficina pública, desplegada y en
                  uso: un motor de reglas calcula saldos, plazos y alertas, y la IA solo
                  clasifica documentos que una persona valida.
                </p>
                <ul className="mt-6 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {NOW_STATUS.map((item) => (
                    <li key={item.label} className="flex items-center justify-between py-3 text-[13px]">
                      <span className="text-[#a1a1aa]">{item.label}</span>
                      <span
                        className={`font-mono text-[11px] uppercase tracking-[0.14em] ${
                          item.done ? "text-emerald-400/80" : "text-[#f97316]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#projects"
                  className="group/link mt-auto inline-flex items-center gap-1.5 self-start pt-8 text-[13px] font-medium text-[#f97316] outline-none transition-colors hover:text-[#fdba74] focus-visible:underline"
                >
                  Ver proyectos
                  <ArrowDown
                    weight="bold"
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-y-0.5"
                  />
                </a>
              </SpotlightCell>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Registration mark on each corner of the grid, like a technical drawing.
function Crosshair({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute z-10 h-[11px] w-[11px] ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#f97316]/50" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#f97316]/50" />
    </span>
  );
}
