"use client";

import { useEffect, useRef } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const CELL = typeof window !== "undefined"
  ? window.innerWidth > 1600
    ? 64
    : 56
  : 56;                                  // wider cells → less density
const SPOTLIGHT_RADIUS = 140;                       // tighter spotlight → less area lit
const LINE_COLOR_LIT  = "rgba(255,255,255,0.09)";  // was 0.18 — much softer peak
const LINE_COLOR_REST = "rgba(255,255,255,0.022)";  // was 0.04 — barely-there resting
const LERP_ORBS = 0.055;
const LERP_SPOT = 0.10;
const LERP_TILT = 0.06; // slower → more cinematic tilt

// Diamond visual config
const DIAMOND_SIZE   = 200;  // was 260 — smaller footprint, more air around it
const STRIPE_GAP     = 22;   // was 18 — fewer stripes, less visual noise
const ORANGE_PRIMARY = "249,115,22";
const ORANGE_DIM     = "194,65,12";
const MAX_TILT       = 10;   // was 14 — subtler tilt response

// ─── Orb layers ───────────────────────────────────────────────────────────────

interface OrbLayer { xMult:number; yMult:number; size:string; color:string; opacity:number; blur:number; }

const ORB_LAYERS: OrbLayer[] = [
  { xMult:  0.12, yMult:  0.10, size: "80vmax", color: "99,102,241",  opacity: 0.022, blur: 50 },
  { xMult:  0.22, yMult:  0.18, size: "55vmax", color: "71,85,105",   opacity: 0.04,  blur: 50 },
  { xMult: -0.08, yMult: -0.06, size: "45vmax", color: "30,41,59",    opacity: 0.07,  blur: 70 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Linear interpolation */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Clip a value to [min, max] */
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orb1Ref   = useRef<HTMLDivElement>(null);
  const orb2Ref   = useRef<HTMLDivElement>(null);
  const orb3Ref   = useRef<HTMLDivElement>(null);
  const orbRefs   = [orb1Ref, orb2Ref, orb3Ref];
  const rafRef    = useRef<number | null>(null);

  // Mouse / lerp state — all in refs, no React state → zero re-renders
  const mouse      = useRef({ x: -9999, y: -9999 });
  const spot       = useRef({ x: -9999, y: -9999 });
  const orbTarget  = useRef({ x: 0, y: 0 });
  const orbCurrent = useRef({ x: 0, y: 0 });
  const tiltTarget  = useRef({ rx: 0, ry: 0 }); // deg
  const tiltCurrent = useRef({ rx: 0, ry: 0 });
  const timeRef    = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize ────────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Mouse ─────────────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      const nx = e.clientX / window.innerWidth  - 0.5; // -0.5…0.5
      const ny = e.clientY / window.innerHeight - 0.5;
      orbTarget.current = { x: nx, y: ny };
      // Tilt: cursor right → lean right (positive ry), cursor down → lean down (positive rx)
      tiltTarget.current = {
        rx: clamp( ny * MAX_TILT * 2, -MAX_TILT, MAX_TILT),
        ry: clamp(-nx * MAX_TILT * 2, -MAX_TILT, MAX_TILT),
      };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Draw background grid ─────────────────────────────────────────────────
    const drawGrid = (spotX: number, spotY: number, w: number, h: number) => {
      const r = SPOTLIGHT_RADIUS;

      for (let x = 0; x <= w; x += CELL) {
        const dx = Math.abs(x - spotX);
        if (dx < r) {
          const half = Math.sqrt(r * r - dx * dx);
          const y0 = spotY - half, y1 = spotY + half;
          if (y0 > 0) {
            ctx.beginPath(); ctx.moveTo(x+.5,0); ctx.lineTo(x+.5,y0);
            ctx.strokeStyle = LINE_COLOR_REST; ctx.lineWidth = 0.5; ctx.stroke();
          }
          const gFull = ctx.createLinearGradient(x, y0, x, y1);
          gFull.addColorStop(0, LINE_COLOR_REST);
          gFull.addColorStop(0.5, LINE_COLOR_LIT);
          gFull.addColorStop(1, LINE_COLOR_REST);
          ctx.beginPath(); ctx.moveTo(x+.5,Math.max(0,y0)); ctx.lineTo(x+.5,Math.min(h,y1));
          ctx.strokeStyle = gFull; ctx.lineWidth = 0.5; ctx.stroke();
          if (y1 < h) {
            ctx.beginPath(); ctx.moveTo(x+.5,y1); ctx.lineTo(x+.5,h);
            ctx.strokeStyle = LINE_COLOR_REST; ctx.lineWidth = 0.5; ctx.stroke();
          }
        } else {
          ctx.beginPath(); ctx.moveTo(x+.5,0); ctx.lineTo(x+.5,h);
          ctx.strokeStyle = LINE_COLOR_REST; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }

      for (let y = 0; y <= h; y += CELL) {
        const dy = Math.abs(y - spotY);
        if (dy < r) {
          const half = Math.sqrt(r * r - dy * dy);
          const x0 = spotX - half, x1 = spotX + half;
          if (x0 > 0) {
            ctx.beginPath(); ctx.moveTo(0,y+.5); ctx.lineTo(x0,y+.5);
            ctx.strokeStyle = LINE_COLOR_REST; ctx.lineWidth = 0.5; ctx.stroke();
          }
          const gH = ctx.createLinearGradient(x0,y,x1,y);
          gH.addColorStop(0, LINE_COLOR_REST);
          gH.addColorStop(0.5, LINE_COLOR_LIT);
          gH.addColorStop(1, LINE_COLOR_REST);
          ctx.beginPath(); ctx.moveTo(Math.max(0,x0),y+.5); ctx.lineTo(Math.min(w,x1),y+.5);
          ctx.strokeStyle = gH; ctx.lineWidth = 0.5; ctx.stroke();
          if (x1 < w) {
            ctx.beginPath(); ctx.moveTo(x1,y+.5); ctx.lineTo(w,y+.5);
            ctx.strokeStyle = LINE_COLOR_REST; ctx.lineWidth = 0.5; ctx.stroke();
          }
        } else {
          ctx.beginPath(); ctx.moveTo(0,y+.5); ctx.lineTo(w,y+.5);
          ctx.strokeStyle = LINE_COLOR_REST; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    };

    // ── Draw diamond ─────────────────────────────────────────────────────────
    const drawDiamond = (
      cx: number, cy: number,
      tiltRx: number, tiltRy: number,
      t: number
    ) => {
      const S = DIAMOND_SIZE;

      // 3-D perspective tilt via canvas transform
      // We approximate tilt with a mild skew + scale
      const skewX = Math.sin((tiltRy * Math.PI) / 180) * 0.18;
      const skewY = Math.sin((tiltRx * Math.PI) / 180) * 0.18;
      const scaleY = 1 - Math.abs(tiltRx) / 180;
      const scaleX = 1 - Math.abs(tiltRy) / 180;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.transform(scaleX, skewY, skewX, scaleY, 0, 0);

      // ── Clip to diamond shape ──
      ctx.beginPath();
      ctx.moveTo(0, -S);
      ctx.lineTo(S, 0);
      ctx.lineTo(0, S);
      ctx.lineTo(-S, 0);
      ctx.closePath();
      ctx.clip();

      // ── Fill very dark base ──
      ctx.fillStyle = "rgba(9,9,11,0.85)";
      ctx.fillRect(-S, -S, S * 2, S * 2);

      // ── Diagonal stripes (bottom-left → top-right) ──
      // Animate shimmer: each stripe has a phase offset
      const stripeCount = Math.ceil((S * 4) / STRIPE_GAP) + 2;
      const shimmerSpeed = 0.0004;

      for (let i = 0; i < stripeCount; i++) {
        const offset = (i * STRIPE_GAP - S * 2) + ((t * shimmerSpeed * STRIPE_GAP) % STRIPE_GAP);
        // Phase for shimmer: sine wave per stripe
        const phase = Math.sin(t * 0.0008 + i * 0.42) * 0.5 + 0.5; // 0…1
        const alpha = lerp(0.025, 0.11, phase); // was 0.04–0.22 — much calmer shimmer
        // Color cycles between orange shades
        const colorPhase = Math.sin(t * 0.0005 + i * 0.3) * 0.5 + 0.5;
        const r = Math.round(lerp(194, 249, colorPhase));
        const g = Math.round(lerp(65,  115, colorPhase));
        const b = Math.round(lerp(12,   22, colorPhase));

        ctx.beginPath();
        // 45° stripe: line from bottom-left region to top-right region
        ctx.moveTo(-S * 2 + offset,  S * 2);
        ctx.lineTo( S * 2 + offset, -S * 2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── Radial glow at diamond center ──
      const glowPhase = Math.sin(t * 0.0006) * 0.5 + 0.5;
      const glowAlpha = lerp(0.04, 0.10, glowPhase); // was 0.08–0.18
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, S * 0.7);
      glow.addColorStop(0,   `rgba(${ORANGE_PRIMARY},${glowAlpha})`);
      glow.addColorStop(0.5, `rgba(${ORANGE_DIM},${glowAlpha * 0.3})`);
      glow.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(-S, -S, S * 2, S * 2);

      // ── Edge fade mask (dark vignette toward diamond border) ──
      const edgeFade = ctx.createRadialGradient(0, 0, S * 0.45, 0, 0, S);
      edgeFade.addColorStop(0, "rgba(0,0,0,0)");
      edgeFade.addColorStop(0.6, "rgba(9,9,11,0.4)");
      edgeFade.addColorStop(1, "rgba(9,9,11,0.92)"); // was 0.72 — harder fade to black
      ctx.fillStyle = edgeFade;
      ctx.fillRect(-S, -S, S * 2, S * 2);

      ctx.restore();

      // ── Diamond border ────────────────────────────────────────────────────
      ctx.save();
      ctx.translate(cx, cy);
      ctx.transform(scaleX, skewY, skewX, scaleY, 0, 0);

      const borderPhase = Math.sin(t * 0.0007) * 0.5 + 0.5;
      const borderAlpha = lerp(0.15, 0.32, borderPhase); // was 0.25–0.55

      // Outer border — orange
      ctx.beginPath();
      ctx.moveTo(0, -S); ctx.lineTo(S, 0);
      ctx.lineTo(0, S);  ctx.lineTo(-S, 0);
      ctx.closePath();
      ctx.strokeStyle = `rgba(${ORANGE_PRIMARY},${borderAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner inset border — dimmer
      const IS = S - 10;
      ctx.beginPath();
      ctx.moveTo(0, -IS); ctx.lineTo(IS, 0);
      ctx.lineTo(0, IS);  ctx.lineTo(-IS, 0);
      ctx.closePath();
      ctx.strokeStyle = `rgba(${ORANGE_DIM},${borderAlpha * 0.35})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Corner tick marks (small lines at each vertex)
      const TICK = 14;
      const corners = [[0,-S],[S,0],[0,S],[-S,0]] as [number,number][];
      const inward  = [[0,1],[-1,0],[0,-1],[1,0]]  as [number,number][];
      corners.forEach(([vx, vy], i) => {
        const [ix, iy] = inward[i];
        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.lineTo(vx + ix * TICK, vy + iy * TICK);
        ctx.strokeStyle = `rgba(${ORANGE_PRIMARY},${borderAlpha * 1.2})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      ctx.restore();
    };

    // ── RAF loop ──────────────────────────────────────────────────────────────
    const tick = (timestamp: number) => {
      timeRef.current = timestamp;
      const w = canvas.width;
      const h = canvas.height;

      // Lerp spotlight
      spot.current.x = lerp(spot.current.x, mouse.current.x, LERP_SPOT);
      spot.current.y = lerp(spot.current.y, mouse.current.y, LERP_SPOT);

      // Lerp orbs
      orbCurrent.current.x = lerp(orbCurrent.current.x, orbTarget.current.x, LERP_ORBS);
      orbCurrent.current.y = lerp(orbCurrent.current.y, orbTarget.current.y, LERP_ORBS);

      // Lerp tilt
      tiltCurrent.current.rx = lerp(tiltCurrent.current.rx, tiltTarget.current.rx, LERP_TILT);
      tiltCurrent.current.ry = lerp(tiltCurrent.current.ry, tiltTarget.current.ry, LERP_TILT);

      // Update DOM orbs
      const { x: ox, y: oy } = orbCurrent.current;
      orbRefs.forEach((ref, i) => {
        if (!ref.current) return;
        const l = ORB_LAYERS[i];
        ref.current.style.transform =
          `translate(calc(-50% + ${ox * l.xMult * 100}vw), calc(-50% + ${oy * l.yMult * 100}vh))`;
      });

      // Draw
      ctx.clearRect(0, 0, w, h);
      drawGrid(spot.current.x, spot.current.y, w, h);
      drawDiamond(w / 2, h / 2, tiltCurrent.current.rx, tiltCurrent.current.ry, timestamp);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden bg-[#09090B]"
    >
      {/* ── Canvas: grid + diamond ──────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: "block" }}
      />

      {/* ── Parallax gradient orbs ──────────────────────────────────────────── */}
      {ORB_LAYERS.map((layer, i) => (
        <div
          key={i}
          ref={orbRefs[i]}
          className="pointer-events-none absolute will-change-transform"
          style={{
            top: "50%", left: "50%",
            width: layer.size, height: layer.size,
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background: `radial-gradient(circle at center, rgba(${layer.color},${layer.opacity}) 0%, transparent 20%)`,
            filter: `blur(${layer.blur}px)`,
          }}
        />
      ))}

      {/* ── Static corner accents ───────────────────────────────────────────── */}
      <div className="pointer-events-none absolute" style={{ bottom:"-10%",left:"-5%",width:"40vmax",height:"40vmax",borderRadius:"50%",background:"radial-gradient(circle at center,rgba(30,41,59,0.05) 0%,transparent 70%)",filter:"blur(80px)" }} />

      {/* ── Vignette — stronger black edges ─────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background:"radial-gradient(ellipse 75% 65% at 50% 50%, transparent 20%, rgba(9,9,11,0.88) 100%)" }}
      />

      {/* ── Bottom hairline ─────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{ height:"1px", background:"linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.04) 20%,rgba(255,255,255,0.06) 50%,rgba(255,255,255,0.04) 80%,transparent 100%)" }}
      />
    </div>
  );
}