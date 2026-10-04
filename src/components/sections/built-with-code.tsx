"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/reveal";

/* "Built with code": the code block scrolls itself into place while the
   section is pinned in view - the writing IS the reveal. Purpose:
   storytelling, the line-by-line cadence mirrors reading code. */
const CODE = [
  "const experience = {",
  '  design: true,',
  '  frontend: true,',
  '  interaction: true,',
  '  attentionToDetail: "high",',
  "}",
];

const FULL = CODE;

export function BuiltWithCodeSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section aria-label="Built with code" className="border-y border-line bg-surface/40">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-32">
        <div>
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.6rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em]">
              Design is only half the story.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[38ch] text-base leading-relaxed text-muted">
              I like turning visual ideas into interfaces that actually work.
            </p>
          </Reveal>
        </div>

        <div ref={ref}>
          <div className="border border-line bg-ink p-6 md:p-8">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              experience.ts
            </p>
            <pre className="overflow-x-auto font-mono text-[13px] leading-7 md:text-sm" translate="no">
              <code>
                {FULL.map((line, i) => (
                  <motion.span
                    key={i}
                    className="block whitespace-pre"
                    initial={reduce ? undefined : { opacity: 0, x: -12 }}
                    whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10% 0px -20% 0px" }}
                    transition={{
                      duration: 0.35,
                      delay: i * 0.09,
                      ease: "easeOut",
                    }}
                  >
                    <span className={line.includes("true") || line.includes("high") ? "text-acid" : line.startsWith("const") ? "text-paper" : "text-muted"}>
                      {line || "\u00A0"}
                    </span>
                  </motion.span>
                ))}
              </code>
            </pre>
            <span
              aria-hidden
              className="motion-safe-anim mt-1 inline-block h-4 w-[7px] bg-acid align-middle"
              style={reduce ? { display: "none" } : { animation: "pulse-soft 1.1s steps(2) infinite" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
