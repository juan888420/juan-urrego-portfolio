"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import Container from "@/components/layout/Container";

// ─── Animation variants ───────────────────────────────────────────────────────

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ─── RaycastBadge ─────────────────────────────────────────────────────────────
// Orange neon ring via box-shadow (single, no double border).
// White spark travels the perimeter via SVG stroke-dashoffset animation.
// Three SVG layers: diffused halo, tight core trail, white-hot spark head.

function RaycastBadge({ leftText }: { leftText: string }) {
  const pillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;

    const NS = "http://www.w3.org/2000/svg";

    const build = () => {
      pill.querySelector("svg[data-spark]")?.remove();

      const w = pill.offsetWidth;
      const h = pill.offsetHeight;
      if (!w || !h) return;

      // Offset hacia afuera para que el trazo se centre sobre el ring naranja (1px fuera).
      // Dentro de build(), reemplaza el bloque del SVG por esto:

      const O = 1;
      const W = w + O * 2;
      const H = h + O * 2;
      const r = H / 2;
      const perim = Math.PI * 2 * r + 2 * (W - 2 * r);

      // Path en coords 0..W / 0..H (sin offsets negativos)
      const d = [
        `M ${W / 2} 0`,
        `L ${W - r} 0`,
        `A ${r} ${r} 0 0 1 ${W - r} ${H}`,
        `L ${r} ${H}`,
        `A ${r} ${r} 0 0 1 ${r} 0`,
        `Z`,
      ].join(" ");

      const HEAD = Math.max(2, perim * 0.012);
      const HALO = perim * 0.09;
      const DUR  = (perim / 170).toFixed(2) + "s";

      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("data-spark", "");
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.setAttribute("preserveAspectRatio", "none"); // opcional; con pill height-based no distorsiona
      svg.setAttribute("aria-hidden", "true");
      // 👇 Clave: el SVG se extiende O px hacia afuera en los 4 lados
      svg.style.cssText =
        `position:absolute;left:-${O}px;top:-${O}px;` +
        `width:calc(100% + ${O * 2}px);height:calc(100% + ${O * 2}px);` +
        `overflow:visible;pointer-events:none;z-index:2;`;


      svg.innerHTML = `
        <defs>
          <filter id="spark-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
          <filter id="spark-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.6" />
          </filter>
        </defs>

        <path
          d="${d}"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="${HALO} ${perim - HALO}"
          filter="url(#spark-glow)"
        >
          <animate attributeName="stroke-dashoffset"
            from="0" to="${-perim}" dur="${DUR}" repeatCount="indefinite" />
        </path>

        <path
          d="${d}"
          fill="none"
          stroke="#ffffff"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-dasharray="${HEAD} ${perim - HEAD}"
          stroke-dashoffset="${-(HALO * 0.85)}"
          filter="url(#spark-blur)"
        >
          <animate attributeName="stroke-dashoffset"
            from="${-(HALO * 0.85)}"
            to="${-(perim + HALO * 0.85)}"
            dur="${DUR}" repeatCount="indefinite" />
        </path>
      `;

      pill.appendChild(svg);
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(pill);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={pillRef}
      className="relative inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-white/90"
      style={{
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(6px)",
        boxShadow: [
          "0 0 0 1px rgba(249,115,22,0.95)",
          "0 0 8px rgba(249,115,22,0.55)",
          "0 0 18px 2px rgba(249,115,22,0.30)",
          "inset 0 0 0 1px rgba(255,255,255,0.04)",
        ].join(", "),
      }}
    >
      <span className="relative z-[3]">{leftText}</span>
    </div>
  );
}

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
      className="relative min-h-svh flex items-center pt-32"
    >
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-2xl flex flex-col gap-6 md:gap-7"
        >
          {/* ── Role badge ── */}
          <motion.div variants={item}>
            <RaycastBadge leftText="Software Developer"/>
          </motion.div>

          {/* ── Name ── */}
          <motion.div variants={item} className="flex flex-col gap-1">
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

          {/* ── Divider ── */}
          <motion.div variants={item}>
            <HairlineDivider />
          </motion.div>

          {/* ── Description ── */}
          <motion.p
            variants={item}
            className="font-sans text-base sm:text-lg leading-relaxed text-zinc-400 max-w-md"
          >
            Construyo interfaces y sistemas que priorizan la claridad, el
            rendimiento y los detalles que marcan la diferencia. Enfocado en
            productos modernos con intención.
          </motion.p>

          {/* ── CTAs ── */}
          <motion.div variants={item} className="flex items-center gap-4 pt-1">
          <a
            href="#projects"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium text-zinc-950 bg-zinc-50 transition-all duration-200 ease-out hover:bg-zinc-200 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            Ver proyectos
            <span aria-hidden="true">↓</span>
          </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-400 border border-orange-500/40 px-5 py-2.5 rounded-md transition-all duration-200 hover:text-orange-300 hover:border-orange-400 hover:shadow-[0_0_12px_rgba(249,115,22,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
              Hablemos
            </a>
          </motion.div>

          {/* ── Availability row ── */}
          <motion.div
            variants={item}
            className="flex items-center gap-5 pt-2 border-t border-zinc-800/60"
          >
            <span className="ml-auto flex items-center gap-1.5 text-xs text-zinc-500">
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
              />
              Disponible para proyectos
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}