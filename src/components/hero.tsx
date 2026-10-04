"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { LineReveal } from "@/components/reveal";

/* Depth layers drift against the pointer. Each layer declares its own
   parallax factor; springs keep the drift heavy and calm, never jittery. */
function useParallax(factor: number, mx: MotionValue<number>, my: MotionValue<number>) {
  const x = useTransform(mx, (v: number) => v * factor);
  const y = useTransform(my, (v: number) => v * factor);
  return { x: useSpring(x, { stiffness: 140, damping: 24 }), y: useSpring(y, { stiffness: 140, damping: 24 }) };
}

const CODE_LINES: [string, string][] = [
  ["const", " Rahul = {"],
  ["  focus", ' : "frontend",'],
  ["  stack", ' : ["React", "Next.js", "Tailwind"],'],
  ["  obsession", ' : "good UI",'],
  ["  status", ' : "available for work",'],
  ["}", ""],
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const headline = useParallax(reduce ? 0 : -6, rawX, rawY);
  const panel = useParallax(reduce ? 0 : 14, rawX, rawY);
  const chipA = useParallax(reduce ? 0 : 30, rawX, rawY);
  const chipB = useParallax(reduce ? 0 : -22, rawX, rawY);
  const ring = useParallax(reduce ? 0 : 8, rawX, rawY);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      aria-label="Introduction"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden pt-24 pb-10 md:justify-center md:pb-16"
    >
      {/* faint composition ring, sits behind the code panel */}
      <motion.div
        aria-hidden
        style={ring}
        className="pointer-events-none absolute right-[-14%] top-[16%] hidden h-[460px] w-[460px] rounded-full border border-line md:block"
      >
        <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/60" />
      </motion.div>

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
        {/* left: the statement */}
        <div>
          <motion.p
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
          >
            01 <span className="text-acid">/</span> Creative Developer
          </motion.p>

          <motion.h1 style={reduce ? {} : headline} className="text-pretty">
            <LineReveal
              lines={["I BUILD", "INTERFACES", "THAT FEEL", <>ALIVE<span className="text-acid">.</span></>]}
              lineClassName="font-display text-[clamp(2.6rem,7.4vw,5.5rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em]"
            />
          </motion.h1>

          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-[46ch] text-base leading-relaxed text-muted md:text-lg"
          >
            Frontend developer with a designer&apos;s eye for interaction,
            typography and detail.
          </motion.p>

          <motion.div
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t border-line pt-5"
          >
            <span className="font-display text-sm font-medium tracking-tight">
              RAHUL JANA
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              Frontend / UI / Creative Development
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              India
            </span>
          </motion.div>
        </div>

        {/* right: interactive code panel with drifting chips */}
        <div className="relative hidden lg:block">
          <motion.div
            style={panel}
            initial={reduce ? undefined : { opacity: 0, y: 32 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative border border-line bg-surface p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
          >
            <div className="mb-5 flex items-center gap-2 border-b border-line pb-4">
              <span className="h-2 w-2 rounded-full bg-faint/60" />
              <span className="h-2 w-2 rounded-full bg-faint/40" />
              <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                rahul.ts
              </span>
            </div>
            <pre className="overflow-x-auto font-mono text-[13px] leading-7 text-muted" translate="no">
              <code>
                {CODE_LINES.map(([a, b], i) => (
                  <span key={i} className="block">
                    <span className="text-paper">{a}</span>
                    <span>{b}</span>
                  </span>
                ))}
              </code>
            </pre>
          </motion.div>

          <motion.span
            style={chipA}
            aria-hidden
            className="absolute -left-10 -top-8 border border-line bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-acid"
          >
            interaction
          </motion.span>
          <motion.span
            style={chipB}
            aria-hidden
            className="absolute -bottom-7 right-8 border border-line bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
          >
            typography
          </motion.span>
        </div>
      </div>
    </section>
  );
}
