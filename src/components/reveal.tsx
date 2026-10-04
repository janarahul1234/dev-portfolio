"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Scroll reveal: content rises and settles once, when it enters view.
   Purpose: pacing, the page reads top to bottom as an editorial sequence. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* Mask reveal: a block wipes upward from behind its own bottom edge.
   Used for previews and images so they arrive like a printed page.
   Detection cannot live on the translated child: IntersectionObserver
   clips targets by ancestor overflow, and the child starts fully outside
   the clip box. An undisturbed full-size wrapper observes entry and the
   inner child animates in response. */
export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [entered, setEntered] = useState(false);

  if (reduce)
    return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={`relative overflow-hidden ${className ?? ""}`}
      onViewportEnter={() => setEntered(true)}
      viewport={{ once: true, margin: "-6% 0px -6% 0px" }}
    >
      <motion.div
        initial={{ y: "110%" }}
        animate={entered ? { y: 0 } : undefined}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* Line reveal for display headlines: each line slides up inside a clipped
   row. Fires on load (hero) or in view (sections). */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  inView = false,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={`block ${className ?? ""}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={reduce ? undefined : { y: "105%" }}
            {...(inView
              ? {
                  whileInView: reduce ? undefined : { y: 0 },
                  viewport: { once: true, amount: 0.5 },
                }
              : { animate: reduce ? undefined : { y: 0 } })}
            transition={{ duration: 0.8, delay: delay + i * 0.08, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
