"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ArrowUpRight } from "@phosphor-icons/react";
import Container from "@/components/layout/Container";

const EMAIL = "juanpurr1002@gmail.com";
const EASE = [0.23, 1, 0.32, 1] as const;

// ──────────────────────────────────────────────────────────────────────────
// Sobre animado — se abre, deja escapar un pulso, se cierra y espera ~7s.
// SVG propio para poder animar la solapa (flap) con rotateX.
// ──────────────────────────────────────────────────────────────────────────

function AnimatedEnvelope() {
  // Ciclo total: 4.5s. La acción ocurre en el primer 30%, el resto es espera.
  // 0%      cerrado
  // 8%      solapa abierta
  // 10-20%  pulso naranja sale del sobre
  // 26%     solapa cerrada
  // 26-100% reposo (~7.4s)
  const CYCLE = 4.5; // segundos

  return (
    <div className="relative h-24 w-24 sm:h-28 sm:w-28" style={{ perspective: 600 }}>
      {/* Glow base */}
      <div className="absolute inset-0 rounded-full bg-[#f97316]/10 blur-2xl" />

      {/* Pulso que "sale" del sobre al abrirse */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#f97316]"
        animate={{
          y:       [0, 0, -46, -46, 0],
          opacity: [0, 0.9, 0, 0, 0],
          scale:   [0.5, 1, 1.4, 0.5, 0.5],
        }}
        transition={{
          duration: CYCLE,
          times: [0.08, 0.12, 0.2, 0.21, 1],
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Cuerpo del sobre */}
      <svg
        viewBox="0 0 96 96"
        fill="none"
        className="relative h-full w-full"
        aria-hidden="true"
      >
        {/* Base */}
        <rect
          x="12" y="32" width="72" height="46" rx="8"
          className="fill-[#101014] stroke-white/15"
          strokeWidth="1.5"
        />
        {/* Pliegue inferior (V invertida dentro del sobre) */}
        <path
          d="M14 74 L48 52 L82 74"
          className="stroke-white/10"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Solapa — se abre con rotateX desde el borde superior */}
      <motion.svg
        viewBox="0 0 96 96"
        fill="none"
        className="absolute inset-0 h-full w-full"
        style={{ transformOrigin: "50% 34%", transformStyle: "preserve-3d" }}
        animate={{ rotateX: [0, -170, -170, 0, 0] }}
        transition={{
          duration: CYCLE,
          times: [0, 0.08, 0.2, 0.26, 1],
          repeat: Infinity,
          ease: [0.6, 0.05, 0.28, 0.99],
        }}
        aria-hidden="true"
      >
        <path
          d="M12 36 Q12 32 16 32 L80 32 Q84 32 84 36 L50.5 58 Q48 59.5 45.5 58 Z"
          className="fill-[#16161b] stroke-[#f97316]/50"
          strokeWidth="1.5"
        />
      </motion.svg>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Botón de correo — cápsula glass con brillo metálico que recorre el borde.
// Click = abre mailto. El botón secundario de copiar es discreto.
// ──────────────────────────────────────────────────────────────────────────

function EmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard no disponible */
    }
  };

  return (
    <a
      href={`mailto:${EMAIL}`}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-black/50 py-3 pl-6 pr-3 backdrop-blur-xl transition-colors duration-300 hover:border-[#f97316]/40"
    >
      {/* Sheen metálico que recorre el botón en hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

      {/* Punto de disponibilidad */}
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-[#f97316]"
        animate={{ opacity: [1, 0.35, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <span className="font-mono text-[13px] tracking-wide text-[#e4e4e7] transition-colors duration-200 group-hover:text-white sm:text-sm">
        {EMAIL}
      </span>

      {/* Acción secundaria: copiar */}
      <button
        onClick={handleCopy}
        aria-label={copied ? "Correo copiado" : "Copiar correo"}
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[#8a8a93] transition-colors duration-200 hover:border-[#f97316]/40 hover:text-[#f97316]"
      >
        {copied ? (
          <Check weight="bold" className="h-4 w-4 text-[#f97316]" />
        ) : (
          <Copy weight="regular" className="h-4 w-4" />
        )}
      </button>
    </a>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Sección
// ──────────────────────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-[#09090b] py-32 sm:py-40">
      {/* Glow ambiental muy sutil detrás del contenido */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f97316]/[0.04] blur-3xl" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col items-center text-center"
        >
          <AnimatedEnvelope />

          <h2 className="mt-10 max-w-2xl text-3xl font-semibold tracking-tight text-[#f4f4f5] sm:text-5xl">
            ¿Tienes una idea?{" "}
            <span className="bg-gradient-to-b from-[#fdba74] via-[#f97316] to-[#c2410c] bg-clip-text text-transparent [text-shadow:0_0_28px_rgba(249,115,22,0.25)]">
              Hablemos.
            </span>
          </h2>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#a1a1aa]">
            Siempre estoy abierto a nuevos proyectos, colaboraciones o
            simplemente una buena conversación sobre producto y tecnología.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            className="mt-10"
          >
            <EmailButton />
          </motion.div>

          <p className="mt-6 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#52525b]">
            Respondo en menos de 24h
            <ArrowUpRight weight="bold" className="h-3 w-3" />
          </p>
        </motion.div>
      </Container>
    </section>
  );
}