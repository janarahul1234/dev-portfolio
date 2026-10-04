"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";

/* Live Shopping App preview: a working filter + discovery grid.
   Product photos are picsum placeholders until catalog imagery exists. */

const FILTERS = ["All", "Wear", "Objects", "Desk"] as const;
type Filter = (typeof FILTERS)[number];

type Product = {
  seed: string;
  name: string;
  price: string;
  tag: Exclude<Filter, "All">;
};

const PRODUCTS: Product[] = [
  { seed: "knit-jacket-studio", name: "Boxed Knit Jacket", price: "₹4,900", tag: "Wear" },
  { seed: "ceramic-mug-linen", name: "Matte Ceramic Mug", price: "₹890", tag: "Objects" },
  { seed: "task-lamp-aluminium", name: "Slim Task Lamp", price: "₹3,200", tag: "Desk" },
  { seed: "canvas-tote-olive", name: "Olive Canvas Tote", price: "₹1,450", tag: "Wear" },
];

export function ShoppingPreview() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const shown =
    filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.tag === filter);

  return (
    <div className="border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5 md:px-7">
        <p className="font-display text-sm font-medium tracking-tight">
          New Season
          <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-faint">
            {shown.length} items
          </span>
        </p>
        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Filter products (preview)"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                filter === f
                  ? "bg-acid text-ink"
                  : "text-muted hover:text-paper"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout={!reduce}
        className="grid grid-cols-2 gap-px bg-line p-px md:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.figure
              key={p.seed}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden bg-surface"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${p.seed}/600/750`}
                  alt={`${p.name}, placeholder product photography`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="grayscale object-cover opacity-80 transition-[filter,opacity,transform] duration-500 ease-out group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:opacity-100 motion-reduce:transition-none"
                />
              </div>
              <figcaption className="flex items-baseline justify-between px-3.5 py-3">
                <span className="text-xs text-paper md:text-sm">{p.name}</span>
                <span className="font-mono text-[11px] tabular-nums text-muted">
                  {p.price}
                </span>
              </figcaption>
              <span className="pointer-events-none absolute right-2.5 top-2.5 translate-y-1 bg-ink/90 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-acid opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
                Add
              </span>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
