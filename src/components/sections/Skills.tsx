"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  type LucideIcon,
  LayoutGrid,
  Wand2,
  Smartphone,
  Server,
  Database,
  Workflow,
  BrainCircuit,
  MessageSquareCode,
  Terminal,
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Container from "@/components/layout/Container";

// ──────────────────────────────────────────────────────────────────────────
// Tipos
// ──────────────────────────────────────────────────────────────────────────

type CategoryId = "frontend" | "backend" | "ai" | "tooling";

interface SkillCard {
  title: string;
  description: string;
  technologies: string[];
  icon: LucideIcon;
  /** Canal RGB del acento de la tarjeta, ej. "129 140 248" (indigo-400) */
  accent: string;
}

interface Category {
  id: CategoryId;
  label: string;
  skills: SkillCard[];
}

// ──────────────────────────────────────────────────────────────────────────
// Datos
// ──────────────────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      {
        title: "Interfaces modernas",
        description: "Construyo interfaces rápidas, claras y mantenibles.",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
        icon: LayoutGrid,
        accent: "129 140 248",
      },
      {
        title: "Animación e interacción",
        description: "Microinteracciones y transiciones con sensación premium.",
        technologies: ["Framer Motion", "CSS", "Canvas"],
        icon: Wand2,
        accent: "167 139 250",
      },
      {
        title: "Responsive design",
        description: "Experiencias consistentes en cualquier dispositivo.",
        technologies: ["Flexbox", "Grid", "Mobile First"],
        icon: Smartphone,
        accent: "56 189 248",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      {
        title: "APIs REST",
        description: "Desarrollo de APIs escalables y seguras.",
        technologies: ["Node.js", "Express", "REST", "JWT"],
        icon: Server,
        accent: "52 211 153",
      },
      {
        title: "Bases de datos",
        description: "Modelado y consultas eficientes.",
        technologies: ["Supabase", "Firebase", "SQL"],
        icon: Database,
        accent: "45 212 191",
      },
    ],
  },
  {
    id: "ai",
    label: "IA",
    skills: [
      {
        title: "Agentes y automatización",
        description: "Flujos que conectan APIs y datos en tiempo real.",
        technologies: ["n8n", "Claude API", "Webhooks"],
        icon: Workflow,
        accent: "249 115 22",
      },
      {
        title: "Sistemas RAG",
        description: "Bases de conocimiento consultables con contexto real.",
        technologies: ["pgvector", "Embeddings", "Supabase"],
        icon: BrainCircuit,
        accent: "232 121 249",
      },
      {
        title: "Integraciones con LLMs",
        description: "Conecto modelos de lenguaje a productos reales.",
        technologies: ["Anthropic API", "Prompt Engineering"],
        icon: MessageSquareCode,
        accent: "251 113 133",
      },
    ],
  },
  {
    id: "tooling",
    label: "Tooling",
    skills: [
      {
        title: "Entorno de desarrollo",
        description: "Configuraciones pensadas para velocidad y consistencia.",
        technologies: ["Git", "VS Code", "CLAUDE.md"],
        icon: Terminal,
        accent: "96 165 250",
      },
      {
        title: "Despliegue e infraestructura",
        description: "De código a producción sin fricción.",
        technologies: ["Vercel", "GitHub Actions", "Railway"],
        icon: Rocket,
        accent: "34 211 238",
      },
    ],
  },
];


// ──────────────────────────────────────────────────────────────────────────
// Componente principal
// ──────────────────────────────────────────────────────────────────────────

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("frontend");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselIndexRef = useRef(0);

  const current = categories.find((c) => c.id === activeCategory)!;
  const total = current.skills.length;

  function handleCategoryChange(id: CategoryId) {
    setActiveCategory(id);
    setCarouselIndex(0);
    carouselIndexRef.current = 0;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }

  const scrollToIndex = useCallback((index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    carouselIndexRef.current = index;
    setCarouselIndex(index);
  }, []);

  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el || !el.children.length) return;
    let minDist = Infinity;
    let nearest = 0;
    for (let i = 0; i < el.children.length; i++) {
      const c = el.children[i] as HTMLElement;
      const d = Math.abs(c.offsetLeft - el.scrollLeft);
      if (d < minDist) { minDist = d; nearest = i; }
    }
    if (nearest !== carouselIndexRef.current) {
      carouselIndexRef.current = nearest;
      setCarouselIndex(nearest);
    }
  }, []);

  return (
    <section id="skills" className="scroll-mt-24 bg-[#09090b] py-28 sm:py-36">
      <Container>
        {/* Encabezado */}
        <div className="mb-16 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#f4f4f5] sm:text-4xl">
              Habilidades &amp; Tecnologías 
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#a1a1aa]">
              Capacidades reales que respaldo con las herramientas que uso día a día.
            </p>
          </div>

          {/* Tabs — scroll horizontal en mobile para que no rompa el layout */}
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden self-start sm:self-end">
            <div
              role="tablist"
              aria-label="Categorías de habilidades"
              className="inline-flex min-w-max shrink-0 gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] p-1.5"
            >
              {categories.map((category) => {
                const isActive = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#f97316]/50 sm:px-5 sm:py-2.5 sm:text-[15px] ${
                      isActive
                        ? "text-[#f4f4f5]"
                        : "text-[#a1a1aa] hover:text-[#f4f4f5]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-tab-pill"
                        className="absolute inset-0 rounded-full border border-[#f97316]/30 bg-[#f97316]/10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        className="relative z-10 h-1.5 w-1.5 rounded-full bg-[#f97316]"
                        animate={{ opacity: [1, 0.35, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                    <span className="relative z-10">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Área de tarjetas — key fuerza remount limpio sin flash */}
        <div key={activeCategory}>
          {/* ── Carrusel mobile (< sm) ─────────────────────────────────── */}
          <div className="sm:hidden">
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6"
              style={{ scrollPaddingLeft: "1.5rem" }}
            >
              {current.skills.map((skill, i) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="h-[460px] w-[82vw] shrink-0 snap-start"
                >
                  <SkillItem skill={skill} />
                </motion.div>
              ))}
              <div className="w-6 shrink-0" aria-hidden />
            </div>

            {/* Controles: flechas + dots */}
            <div className="mt-6 flex items-center justify-center gap-5">
              <button
                onClick={() => scrollToIndex(Math.max(0, carouselIndex - 1))}
                disabled={carouselIndex === 0}
                aria-label="Tarjeta anterior"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-[#a1a1aa] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-[#f4f4f5] disabled:pointer-events-none disabled:opacity-25"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                {current.skills.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Ir a tarjeta ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === carouselIndex
                        ? "w-5 bg-[#f97316]"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => scrollToIndex(Math.min(total - 1, carouselIndex + 1))}
                disabled={carouselIndex === total - 1}
                aria-label="Tarjeta siguiente"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-[#a1a1aa] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-[#f4f4f5] disabled:pointer-events-none disabled:opacity-25"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ── Grid desktop (sm+) — cada card aparece con delay escalonado ── */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {current.skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="h-full"
              >
                <SkillItem skill={skill} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Tarjeta individual
// ──────────────────────────────────────────────────────────────────────────

function SkillItem({ skill }: { skill: SkillCard }) {
  const Icon = skill.icon;

  return (
    <div
      style={{ ["--accent" as string]: skill.accent }}
      className="group relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-2xl border border-[rgb(var(--accent)/0.13)] bg-[#0d0d10] transition-colors duration-300 hover:border-[rgb(var(--accent)/0.22)]"
    >
      {/* Fondo — color + textura de partícula */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: `rgb(var(--accent) / 0.055)`,
          backgroundImage:
            "radial-gradient(rgb(var(--accent) / 0.4) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <div className="absolute inset-0 [background:radial-gradient(55%_45%_at_50%_35%,rgb(var(--accent)/0.22),transparent_75%)]" />
      </div>

      {/* Overlay de oscurecimiento en hover */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />

      {/* Panel glass superior — ícono + título + descripción */}
      <div className="relative bg-white/[0.05] backdrop-blur-md px-5 pt-7 pb-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--accent)/0.14)]">
            <Icon className="h-[18px] w-[18px] text-[rgb(var(--accent))]" strokeWidth={1.7} />
          </div>
          <h3 className="text-[15px] font-semibold tracking-tight text-[#f0f0f2]">
            {skill.title}
          </h3>
        </div>
        <p className="text-[13px] leading-relaxed text-[#909099] min-h-[2.75rem]">
          {skill.description}
        </p>
      </div>

      {/* Banda de cristal superior */}
      <div className="relative h-[3px] w-full shrink-0">
        <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/[0.28] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent [filter:blur(2px)]" />
      </div>

      {/* Espacio central — el patrón de puntos queda visible aquí */}
      <div className="relative flex-1" />

      {/* Banda de cristal inferior */}
      <div className="relative h-[3px] w-full shrink-0">
        <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/[0.28] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent [filter:blur(2px)]" />
      </div>

      {/* Panel glass inferior — skills */}
      <div className="relative bg-white/[0.05] backdrop-blur-md px-5 py-4">
        <div className="flex flex-nowrap gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {skill.technologies.map((tech) => (
            <span
              key={tech}
              className="shrink-0 whitespace-nowrap rounded-md border border-white/[0.09] bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] tracking-wide text-[#606068] transition-colors duration-300 group-hover:border-[rgb(var(--accent)/0.2)] group-hover:text-[#888890]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
