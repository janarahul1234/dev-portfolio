"use client";

import { useState } from "react";
import { stack } from "@/lib/site";
import { Reveal } from "@/components/reveal";

/* THE STACK: a typographic list where the hovered row grows and its real
   brand mark (Simple Icons) surfaces in the margin. The rest of the list
   dims - the page reacts to attention. */
export function StackSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="stack" aria-labelledby="stack-heading" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <h2
          id="stack-heading"
          className="font-display text-4xl font-bold uppercase leading-none tracking-[-0.03em] md:text-6xl"
        >
          The Stack
        </h2>
      </Reveal>

      <ul className="mt-14 md:mt-20" onMouseLeave={() => setActive(null)}>
        {stack.map((t, i) => (
          <li
            key={t.name}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className="border-b border-line first:border-t"
          >
            <div className="relative flex items-center justify-between py-4 md:py-5">
              <div className="flex items-baseline gap-5 md:gap-8">
                <span className="w-8 font-mono text-[11px] tabular-nums text-faint">
                  {t.n}
                </span>
                <span
                  className={`origin-left font-display text-2xl font-bold uppercase tracking-[-0.02em] transition-[scale,color] duration-300 ease-out motion-reduce:transition-none md:text-4xl ${
                    active === i ? "scale-[1.06] text-paper md:scale-[1.1] md:text-5xl" : "text-muted"
                  }`}
                >
                  {t.name}
                </span>
              </div>

              {/* brand mark preview: SVGs from Simple Icons, served as-is
                  (the image optimizer does not process remote SVGs) */}
              <span className="relative flex h-10 w-10 items-center justify-end md:w-14">
                {t.logo && (
                  // the next/image optimizer refuses remote SVGs; these are
                  // 3KB monochrome marks with fixed dimensions
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://cdn.simpleicons.org/${t.logo}/e8e6df`}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className={`h-8 w-8 object-contain transition-[scale,opacity] duration-300 ease-out motion-reduce:transition-none md:h-10 md:w-10 ${
                      active === i ? "scale-100 opacity-100" : "scale-75 opacity-0"
                    }`}
                  />
                )}
                {!t.logo && active === i && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-acid">
                    curious
                  </span>
                )}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
