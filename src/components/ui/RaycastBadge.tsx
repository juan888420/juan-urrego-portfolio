"use client";

import { useEffect, useRef } from "react";


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

  export default RaycastBadge;