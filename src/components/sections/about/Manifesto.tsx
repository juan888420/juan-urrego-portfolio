"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export interface ManifestoSegment {
  text: string;
  accent?: boolean;
}

// Editorial statement whose words light up one by one as the section scrolls
// into view. With reduced motion the text renders fully lit.
export default function Manifesto({ segments }: { segments: ManifestoSegment[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.65"],
  });

  const words = segments.flatMap((segment) =>
    segment.text.split(" ").map((word) => ({ word, accent: segment.accent })),
  );

  return (
    <p
      ref={ref}
      className="relative text-[28px] font-medium leading-[1.2] tracking-tight sm:text-4xl lg:text-[44px] lg:leading-[1.15]"
    >
      {words.map(({ word, accent }, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          accent={accent}
          static={reduceMotion ?? false}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
  static: boolean;
}

function Word({ children, progress, range, accent, static: isStatic }: WordProps) {
  const opacity = useTransform(progress, range, [0.16, 1]);

  return (
    <>
      <motion.span
        style={{ opacity: isStatic ? 1 : opacity }}
        className={
          accent
            ? "bg-gradient-to-b from-[#fdba74] via-[#f97316] to-[#c2410c] bg-clip-text text-transparent"
            : "text-[#f4f4f5]"
        }
      >
        {children}
      </motion.span>{" "}
    </>
  );
}
