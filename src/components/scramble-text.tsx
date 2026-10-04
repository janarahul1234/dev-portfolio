"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*/<>_";

/* Text scramble: characters churn and settle on hover.
   Self-contained timer inside the demo leaf, cleared on unmount. */
export function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const frame = useRef<number | null>(null);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let iteration = 0;
    if (interval.current) clearInterval(interval.current);
    interval.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < iteration) return text[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration >= text.length && interval.current) {
        clearInterval(interval.current);
        interval.current = null;
        setDisplay(text);
      }
    }, 28);
  }, [text]);

  useEffect(
    () => () => {
      if (interval.current) clearInterval(interval.current);
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    []
  );

  return (
    <span
      className={`inline-block cursor-none font-mono select-none ${className ?? ""}`}
      onMouseEnter={scramble}
      role="button"
      tabIndex={0}
      aria-label={`Scramble text demo: ${text}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") scramble();
      }}
    >
      {display}
    </span>
  );
}
