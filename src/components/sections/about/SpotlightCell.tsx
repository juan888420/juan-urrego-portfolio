"use client";

import type { MouseEvent, ReactNode } from "react";

interface SpotlightCellProps {
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
}

// Blueprint-grid cell: hairline-bordered by the parent grid, with a soft
// orange spotlight that follows the cursor on hover.
export default function SpotlightCell({ index, label, children, className = "" }: SpotlightCellProps) {
  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group/cell relative flex h-full flex-col overflow-hidden bg-[#09090b] p-7 sm:p-9 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/cell:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--x, 50%) var(--y, 50%), rgba(249,115,22,0.07), transparent 65%)",
        }}
      />

      <p className="relative mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#52525b]">
        <span className="text-[#f97316]/70">{index}</span>
        <span aria-hidden="true" className="h-px w-4 bg-white/10" />
        {label}
      </p>

      <div className="relative flex flex-1 flex-col">{children}</div>
    </div>
  );
}
