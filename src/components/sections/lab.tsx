"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Magnetic } from "@/components/magnetic";
import { TiltCard } from "@/components/tilt-card";
import { ScrambleText } from "@/components/scramble-text";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "@phosphor-icons/react";

/* A scroll-linked kinetic line: letter-spacing answers the scrollbar.
   Motion values only, no state per frame. */
function ScrollText() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const spacing = useTransform(scrollYProgress, [0, 1], ["0.02em", "0.42em"]);
  return (
    <motion.p
      ref={ref}
      aria-label="Try it, break it, ship it"
      className="whitespace-nowrap font-display text-xl font-bold uppercase tracking-[0.02em] text-muted md:text-3xl"
      style={reduce ? undefined : { letterSpacing: spacing }}
    >
      Try it. Break it. Ship it.
    </motion.p>
  );
}

export function LabSection() {
  return (
    <section id="lab" aria-labelledby="lab-heading" className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <h2
            id="lab-heading"
            className="max-w-[16ch] font-display text-4xl font-bold uppercase leading-[1.02] tracking-[-0.03em] md:text-6xl"
          >
            Things I break to see how they work.
          </h2>
          <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-muted md:text-base">
            The Lab runs live on this page. Every tile below is the real
            component, not a recording. Try it.
          </p>
        </Reveal>

        {/* asymmetric bento of live experiments */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12 md:gap-5">
          {/* 01 magnetic */}
          <Reveal className="md:col-span-5">
            <div
              data-cursor="play"
              className="flex h-full min-h-[240px] flex-col justify-between border border-line bg-ink p-6"
            >
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  Experiment 01
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  Motion / Springs
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <Magnetic strength={0.45}>
                  <span className="flex h-24 w-24 items-center justify-center rounded-full bg-acid font-display text-xs font-bold uppercase tracking-tight text-ink">
                    Pull me
                  </span>
                </Magnetic>
              </div>
              <p className="font-display text-lg font-bold uppercase tracking-tight">
                Magnetic Button
              </p>
            </div>
          </Reveal>

          {/* 02 tilt */}
          <Reveal delay={0.08} className="md:col-span-7">
            <div
              data-cursor="play"
              className="flex h-full min-h-[240px] flex-col justify-between border border-line bg-ink p-6"
            >
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  Experiment 02
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  CSS 3D / Pointer
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center py-4">
                <TiltCard className="w-[220px] border border-line bg-surface p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
                  <div className="flex items-baseline justify-between">
                    <p className="font-display text-sm font-bold tracking-tight">
                      Card Title
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-acid">
                      3D
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    Move the pointer across the surface. Rotation follows,
                    springs settle it back.
                  </p>
                  <div className="mt-4 h-px w-full bg-line" />
                  <div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-widest text-faint">
                    <span>hover</span>
                    <span>tilt</span>
                    <span>release</span>
                  </div>
                </TiltCard>
              </div>
              <p className="font-display text-lg font-bold uppercase tracking-tight">
                3D Tilt Card
              </p>
            </div>
          </Reveal>

          {/* 03 scramble */}
          <Reveal delay={0.04} className="md:col-span-7">
            <div
              data-cursor="play"
              className="flex h-full min-h-[220px] flex-col justify-between border border-line bg-ink p-6"
            >
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  Experiment 03
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  JS / Timers
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center py-6">
                <ScrambleText
                  text="HOVER TO SCRAMBLE"
                  className="text-center text-lg font-bold md:text-2xl"
                />
              </div>
              <p className="font-display text-lg font-bold uppercase tracking-tight">
                Text Distortion
              </p>
            </div>
          </Reveal>

          {/* 04 scroll-linked */}
          <Reveal delay={0.1} className="md:col-span-5">
            <div
              data-cursor="play"
              className="flex h-full min-h-[220px] flex-col justify-between overflow-hidden border border-line bg-ink p-6"
            >
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  Experiment 04
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  Scroll-driven
                </p>
              </div>
              <div className="flex flex-1 -rotate-90 items-center justify-center py-10">
                <ScrollText />
              </div>
              <p className="font-display text-lg font-bold uppercase tracking-tight">
                Scroll Reaction
              </p>
            </div>
          </Reveal>
        </div>

        {/* backlog, honest about not existing yet */}
        <Reveal>
          <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              In the backlog: liquid cursor, WebGL shader type, loading choreography
            </p>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-acid"
              data-cursor="open"
            >
              Suggest one
              <ArrowRight
                size={14}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
