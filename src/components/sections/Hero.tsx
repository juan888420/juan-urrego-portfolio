"use client";

import { motion, type Variants } from "framer-motion";
import RaycastBadge from "@/components/ui/RaycastBadge";
import Container from "@/components/layout/Container";

// ─── Variants ─────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const leftCol: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.9, delay: 0.5, ease: EASE } },
};

// ─── HairlineDivider ──────────────────────────────────────────────────────────

function HairlineDivider() {
  return (
    <div
      aria-hidden="true"
      className="w-16 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(249,115,22,0.5) 40%, rgba(249,115,22,0.5) 60%, transparent)",
      }}
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      aria-label="Introducción"
      className="relative overflow-hidden min-h-svh flex items-center pt-28 sm:pt-24 lg:pt-20"
    >
      <Container>
        <div className="flex flex-row items-start justify-between w-full">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <motion.div
            variants={leftCol}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 md:gap-7 max-w-xl flex-1 min-w-0"
          >
            <motion.div variants={fadeUp}>
              <RaycastBadge leftText="Software Developer" />
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-1">
              <h1 className="font-sans font-bold leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl text-zinc-50">
                Juan Pablo
              </h1>
              <p
                aria-hidden="true"
                className="font-sans font-bold leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl text-zinc-400"
              >
                Urrego
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <HairlineDivider />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="font-sans text-base sm:text-lg leading-relaxed text-zinc-400 max-w-md"
            >
              Construyo interfaces y sistemas que priorizan la claridad, el
              rendimiento y los detalles que marcan la diferencia. Enfocado en
              productos modernos con intención.
            </motion.p>

            {/* CTAs: stacked on mobile, side by side on sm+ */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 pt-1"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center h-11 px-5 rounded-md text-sm font-medium text-zinc-950 bg-zinc-50 transition-all duration-200 ease-out hover:bg-zinc-200 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                Ver proyectos ↓
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center h-11 px-5 rounded-md text-sm font-medium text-orange-400 border border-orange-500/40 transition-all duration-200 hover:text-orange-300 hover:border-orange-400 hover:shadow-[0_0_12px_rgba(249,115,22,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                Hablemos ✧
              </a>
            </motion.div>

            {/* Availability row — mobile/tablet only (lg: hidden by right panel) */}
            <motion.div
              variants={fadeUp}
              className="flex lg:hidden items-center gap-5 pt-2 border-t border-white/5"
            >
              <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Disponible
              </span>
              <a href="/cv.pdf" download
                className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors duration-200">
                Descargar CV ↓
              </a>
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer"
                className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors duration-200">
                Ver CV ↗
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN — desktop only ─────────────────────────────── */}
          <div className="hidden lg:block" style={{ flexShrink: 0, marginTop: "17rem" }}>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="show"
              className="flex flex-col rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
              style={{ width: "176px" }}
            >
              {/* Disponible */}
              <div className="flex flex-col gap-1.5 px-4 py-4">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"
                  />
                  <span className="text-[11px] font-medium text-zinc-400 tracking-wide uppercase">
                    Disponible
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed pl-3.5">
                  Para proyectos<br />freelance
                </p>
              </div>

              <div aria-hidden="true" className="h-px mx-4 bg-white/5" />

              {/* Descargar CV */}
              <a
                href="/cv.pdf"
                download
                className="group flex items-center justify-between px-4 py-4 text-[11px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors duration-200"
              >
                <span>Descargar CV</span>
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className="text-zinc-600 group-hover:text-zinc-400 transition-colors duration-200 flex-shrink-0">
                  <path d="M6 1v7M3 5.5 6 8l3-2.5M1.5 10.5h9"
                    stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <div aria-hidden="true" className="h-px mx-4 bg-white/5" />

              {/* Ver CV */}
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-4 py-4 text-[11px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors duration-200 rounded-b-[11px]"
              >
                <span>Ver CV</span>
                <svg aria-hidden="true" width="11" height="11" viewBox="0 0 11 11" fill="none"
                  className="text-zinc-600 group-hover:text-zinc-400 transition-colors duration-200 flex-shrink-0">
                  <path d="M2 9 9 2M5 2h4v4"
                    stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}