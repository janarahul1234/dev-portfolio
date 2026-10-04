"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/* Live Chat App preview: plays the brief's exchange sequence
   (message in, typing, reply out) on a loop while in view. */

type Step =
  | { kind: "incoming"; text: string }
  | { kind: "typing" }
  | { kind: "outgoing"; text: string };

const SCRIPT: Step[] = [
  { kind: "incoming", text: "Hey Rahul, nice interface." },
  { kind: "typing" },
  { kind: "outgoing", text: "Thanks :)" },
];

const STEP_MS = [1400, 1600, 1800];

function Bubble({ step }: { step: Step }) {
  if (step.kind === "typing") {
    return (
      <div className="max-w-[70%] self-start border border-line bg-elevated px-4 py-3">
        <span className="flex items-center gap-1" aria-label="typing">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="motion-safe-anim h-1.5 w-1.5 rounded-full bg-muted"
              style={{ animation: "typing-bounce 1.1s ease-in-out infinite", animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      </div>
    );
  }
  const outgoing = step.kind === "outgoing";
  return (
    <div
      className={`max-w-[78%] px-4 py-2.5 text-sm leading-snug ${
        outgoing ? "self-end bg-acid text-ink" : "self-start border border-line bg-elevated text-paper"
      }`}
    >
      {step.text}
      <span className={`mt-1 block text-right font-mono text-[9px] ${outgoing ? "text-ink/60" : "text-faint"}`}>
        {outgoing ? "read" : "09:41"}
      </span>
    </div>
  );
}

export function ChatPreview() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(0);
  const [inView, setInView] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (reduce || !inView) return;
    if (visible >= SCRIPT.length) {
      timer.current = setTimeout(() => setVisible(0), 2600);
    } else {
      timer.current = setTimeout(() => setVisible((v) => v + 1), STEP_MS[visible] ?? 1200);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [visible, inView, reduce]);

  const shownCount = reduce ? SCRIPT.length : visible;

  return (
    <div ref={ref} className="border border-line bg-surface">
      {/* conversation header strip */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-elevated font-display text-xs font-bold text-acid">
            PD
          </span>
          <div>
            <p className="text-sm text-paper">Priya D.</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-acid">online</p>
          </div>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-widest text-faint">Chat App</p>
      </div>

      {/* thread */}
      <div className="flex min-h-[220px] flex-col justify-end gap-2.5 px-5 py-6 sm:min-h-[240px]">
        <AnimatePresence mode="popLayout">
          {SCRIPT.slice(0, shownCount).map((step, i) => (
            <motion.div
              key={i}
              layout
              initial={reduce ? false : { opacity: 0, y: 12, scale: 0.97 }}
              animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${step.kind === "outgoing" ? "justify-end" : "justify-start"}`}
            >
              <Bubble step={step} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* input row */}
      <div className="flex items-center gap-3 border-t border-line px-5 py-3.5">
        <span className="flex-1 text-xs text-faint">Message…</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-acid">Send</span>
      </div>
    </div>
  );
}
