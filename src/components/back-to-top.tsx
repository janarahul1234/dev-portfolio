"use client";

/* Back to top: honours reduced motion via native smooth-scroll behavior. */
export function BackToTop() {
  return (
    <button
      type="button"
      data-cursor="top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-acid"
    >
      Back to top &uarr;
    </button>
  );
}
