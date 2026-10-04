"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/* Labels the cursor wears when hovering elements marked with data-cursor.
   Brief-specified states: VIEW (project), OPEN (link), PLAY (experiment). */
const LABELS: Record<string, string> = {
  view: "VIEW",
  open: "OPEN",
  play: "PLAY",
  top: "TOP",
};

export function CustomCursor() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      const el = document.getElementById("site-cursor");
      if (!el) return;
      const kind = target?.getAttribute("data-cursor") ?? "";
      const label = LABELS[kind] ?? "";
      const isInteractive = !!target || !!(e.target as HTMLElement)?.closest?.("a, button");
      el.setAttribute("data-mode", label || (isInteractive ? "link" : ""));
      el.querySelector("#site-cursor-label")!.textContent = label
        ? kind === "open"
          ? "OPEN \u2192"
          : label
        : "";
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  // No-JS / coarse-pointer / reduced-motion users keep their normal pointer.
  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden [@media(pointer:fine)]:block"
      style={{ x: springX, y: springY }}
    >
      <div
        id="site-cursor"
        className="group -translate-x-1/2 -translate-y-1/2 flex h-3 w-3 items-center justify-center rounded-full border border-paper/70 bg-paper/10 backdrop-blur-[1px] transition-[width,height,background-color,border-color] duration-300 ease-out data-[mode=link]:h-10 data-[mode=link]:w-10 data-[mode=view]:h-14 data-[mode=view]:w-14 data-[mode=view]:bg-acid data-[mode=view]:border-acid data-[mode=open]:h-14 data-[mode=open]:w-auto data-[mode=open]:min-w-14 data-[mode=open]:bg-acid data-[mode=open]:border-acid data-[mode=play]:h-14 data-[mode=play]:w-14 data-[mode=play]:bg-acid data-[mode=play]:border-acid data-[mode=top]:h-12 data-[mode=top]:w-12 data-[mode=top]:bg-acid"
      >
        <span
          id="site-cursor-label"
          className="hidden whitespace-nowrap font-mono text-[10px] font-bold tracking-wide text-ink [@media(pointer:fine)]:block"
        />
      </div>
    </motion.div>
  );
}
