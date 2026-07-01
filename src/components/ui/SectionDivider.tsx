"use client";

import { motion } from "framer-motion";

// ──────────────────────────────────────────────────────────────────────────
// Particles — fixed positions so layout is deterministic and never chaotic.
// Spread symmetrically around the capsule; mix of white and orange.
// ──────────────────────────────────────────────────────────────────────────

interface Particle {
  id: number;
  offsetX: number; // px from center
  offsetY: number; // px from center
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
  yTravel: number; // px of vertical float
}

const PARTICLES: Particle[] = [
  { id:  1, offsetX: -210, offsetY:  -8, size: 1.5, color: "#ffffff", opacity: 0.14, duration: 4.4, delay: 0.0, yTravel: -5 },
  { id:  2, offsetX: -168, offsetY:  14, size: 1.0, color: "#f97316", opacity: 0.22, duration: 5.2, delay: 0.9, yTravel:  4 },
  { id:  3, offsetX: -122, offsetY: -20, size: 1.5, color: "#ffffff", opacity: 0.10, duration: 3.9, delay: 1.5, yTravel: -4 },
  { id:  4, offsetX:  -72, offsetY:  18, size: 1.0, color: "#ffffff", opacity: 0.12, duration: 4.7, delay: 0.4, yTravel:  5 },
  { id:  5, offsetX:  -40, offsetY: -26, size: 1.0, color: "#f97316", opacity: 0.18, duration: 5.6, delay: 1.1, yTravel: -3 },
  { id:  6, offsetX:   40, offsetY:  22, size: 1.0, color: "#ffffff", opacity: 0.11, duration: 4.1, delay: 1.8, yTravel:  4 },
  { id:  7, offsetX:   72, offsetY: -18, size: 1.5, color: "#f97316", opacity: 0.20, duration: 5.0, delay: 0.6, yTravel: -5 },
  { id:  8, offsetX:  122, offsetY:  12, size: 1.0, color: "#ffffff", opacity: 0.13, duration: 3.7, delay: 1.3, yTravel:  3 },
  { id:  9, offsetX:  168, offsetY: -10, size: 1.5, color: "#ffffff", opacity: 0.09, duration: 4.9, delay: 0.2, yTravel: -4 },
  { id: 10, offsetX:  210, offsetY:  16, size: 1.0, color: "#f97316", opacity: 0.17, duration: 5.3, delay: 0.7, yTravel:  5 },
  { id: 11, offsetX: -250, offsetY:   4, size: 1.0, color: "#ffffff", opacity: 0.07, duration: 6.1, delay: 1.6, yTravel: -3 },
  { id: 12, offsetX:  250, offsetY:  -6, size: 1.0, color: "#ffffff", opacity: 0.08, duration: 5.8, delay: 1.0, yTravel:  4 },
];

// ──────────────────────────────────────────────────────────────────────────

interface SectionDividerProps {
  label?: string;
}

export default function SectionDivider({ label = "JP" }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className="relative flex items-center justify-center py-24 overflow-hidden bg-[#09090b]"
    >
      {/* ── Particles ───────────────────────────────────────────────────── */}
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            width:     p.size,
            height:    p.size,
            left:      `calc(50% + ${p.offsetX}px)`,
            top:       "50%",
            marginTop: p.offsetY,
            background: p.color,
            opacity:   p.opacity,
          }}
          animate={{ y: [0, p.yTravel, 0] }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            repeat:   Infinity,
            ease:     "easeInOut",
          }}
        />
      ))}

      {/* ── Left line ───────────────────────────────────────────────────── */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-[#f97316]/30" />

      {/* ── Capsule ─────────────────────────────────────────────────────── */}
      <div className="relative mx-6 flex-shrink-0">
        {/* Glow — extremely subtle, far spread */}
        <div className="absolute inset-0 -m-4 rounded-full bg-[#f97316]/8 blur-2xl" />

        {/* Glass capsule */}
        <div className="relative rounded-full border border-white/10 bg-black/50 px-6 py-2 backdrop-blur-xl">
          <span className="text-xs font-semibold tracking-[0.4em] text-[#f97316] uppercase select-none">
            {label}
          </span>
        </div>
      </div>

      {/* ── Right line ──────────────────────────────────────────────────── */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/[0.06] to-[#f97316]/30" />
    </div>
  );
}