"use client";

import { motion } from "framer-motion";

export interface Milestone {
  period: string;
  title: string;
  place: string;
  description: string;
  current?: boolean;
}

const EASE = [0.23, 1, 0.32, 1] as const;

// Vertical timeline; the rail draws itself when it enters the viewport.
export default function Timeline({ items }: { items: Milestone[] }) {
  return (
    <ol className="relative">
      <motion.span
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute bottom-2 left-[3px] top-2 w-px origin-top bg-gradient-to-b from-[#f97316]/60 via-white/10 to-transparent"
      />

      {items.map((item) => (
        <li key={item.title} className="relative pb-8 pl-8 last:pb-0">
          <span
            aria-hidden="true"
            className={`absolute left-0 top-[7px] h-[7px] w-[7px] rounded-full ${
              item.current
                ? "bg-[#f97316] shadow-[0_0_0_4px_rgba(249,115,22,0.15)]"
                : "border border-white/25 bg-[#09090b]"
            }`}
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#71717a]">
            {item.period}
          </p>
          <h4 className="mt-2 text-[15px] font-semibold tracking-tight text-[#f4f4f5]">
            {item.title}
            <span className="font-normal text-[#71717a]"> · {item.place}</span>
          </h4>
          <p className="mt-1.5 max-w-[52ch] text-[13px] leading-relaxed text-[#9a9aa3]">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
