"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent, AnimatePresence, motion } from "motion/react";
import { navLinks, site } from "@/lib/site";

/* Fixed nav. Transparent at the top of the home page, gains a hairline and
   a tinted backdrop once scrolled. Collapses to a text toggle on mobile. */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  /* menu: lock body scroll, Escape closes */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-line bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-[72px] md:px-10"
        >
          <Link
            href="/"
            className="font-display text-sm font-medium tracking-tight text-paper"
            onClick={() => setOpen(false)}
          >
            RAHUL JANA<sup className="text-acid">&reg;</sup>
          </Link>

          {/* desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-paper"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2.5 md:flex">
            {site.available && (
              <span
                aria-hidden
                className="motion-safe-anim inline-block h-1.5 w-1.5 rounded-full bg-acid"
                style={{ animation: "pulse-soft 2.4s ease-in-out infinite" }}
              />
            )}
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-acid">
              Available for work
            </span>
          </div>

          {/* mobile toggle */}
          <button
            type="button"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-center overflow-hidden overscroll-contain bg-ink px-6 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-display text-4xl font-medium tracking-tight text-paper active:text-acid"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-acid">
              Available for work
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
