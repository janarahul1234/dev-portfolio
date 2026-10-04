import Link from "next/link";
import { ViewTransition } from "react";
import { projects } from "@/lib/projects";
import { ExpensePreview } from "@/components/previews/expense-preview";
import { ChatPreview } from "@/components/previews/chat-preview";
import { ShoppingPreview } from "@/components/previews/shopping-preview";
import { Reveal, MaskReveal } from "@/components/reveal";

function ProjectMeta({ n }: { n: string }) {
  const p = projects.find((x) => x.n === n)!;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-acid">{p.n}</span>
        <Link
          href={`/work/${p.slug}`}
          className="group/title inline-block"
          data-cursor="view"
        >
          <h3 className="font-display text-3xl font-bold uppercase leading-none tracking-[-0.03em] text-paper transition-transform duration-300 group-hover/title:-translate-x-1 md:text-4xl">
            {p.title}
          </h3>
        </Link>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
        {p.category}
      </p>
      <p className="max-w-[42ch] text-sm leading-relaxed text-muted md:text-base">
        {p.shortDescription}
      </p>
      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {p.tech.map((t) => (
          <li key={t} className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            {t}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-line pt-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {p.role}
        </span>
        <span className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {p.year}
          </span>
          <span aria-hidden className="text-acid transition-transform duration-300 group-hover/proj:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </div>
  );
}

/* Selected work: three editorial presentations, each a different layout
   family: split-left, split-right, full-width immersive. */
export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-heading" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <div className="mb-16 md:mb-24">
          <h2
            id="work-heading"
            className="font-display text-4xl font-bold uppercase leading-none tracking-[-0.03em] md:text-6xl"
          >
            Selected Work
          </h2>
          <p className="mt-4 text-sm text-muted md:text-base">A few things I&apos;ve built.</p>
        </div>
      </Reveal>

      <div className="flex flex-col gap-24 md:gap-36">
        {/* 01 - preview left, info right */}
        <Reveal>
          <article className="group/proj grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10">
            <div className="order-1 md:col-span-7">
              <ViewTransition name="work-expense-tracker">
                <Link href="/work/expense-tracker" data-cursor="view" aria-label="Expense Tracker case study">
                  <MaskReveal>
                    <div className="transition-transform duration-500 ease-out hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100">
                      <ExpensePreview />
                    </div>
                  </MaskReveal>
                </Link>
              </ViewTransition>
            </div>
            <div className="order-2 md:col-span-5">
              <ProjectMeta n="01" />
            </div>
          </article>
        </Reveal>

        {/* 02 - info left, preview right */}
        <Reveal>
          <article className="group/proj grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10">
            <div className="order-2 md:order-1 md:col-span-5">
              <ProjectMeta n="02" />
            </div>
            <div className="order-1 md:order-2 md:col-span-7">
              <ViewTransition name="work-chat-app">
                <Link href="/work/chat-app" data-cursor="view" aria-label="Chat App case study">
                  <MaskReveal>
                    <div className="transition-transform duration-500 ease-out hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100">
                      <ChatPreview />
                    </div>
                  </MaskReveal>
                </Link>
              </ViewTransition>
            </div>
          </article>
        </Reveal>

        {/* 03 - full-width immersive */}
        <Reveal>
          <article className="group/proj">
            <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-acid">03</span>
                <Link
                  href="/work/shopping-app"
                  className="group/title inline-block"
                  data-cursor="view"
                >
                  <h3 className="font-display text-3xl font-bold uppercase leading-none tracking-[-0.03em] text-paper transition-transform duration-300 group-hover/title:-translate-x-1 md:text-5xl">
                    Shopping App
                  </h3>
                </Link>
              </div>
              <p className="max-w-[46ch] text-sm leading-relaxed text-muted md:text-right">
                E-commerce / UI / Frontend. A visually focused shopping experience
                built around product discovery and clean interaction.
              </p>
            </div>
            <ViewTransition name="work-shopping-app">
              <Link href="/work/shopping-app" data-cursor="view" aria-label="Shopping App case study">
                <MaskReveal>
                  <div className="transition-transform duration-500 ease-out hover:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:scale-100">
                    <ShoppingPreview />
                  </div>
                </MaskReveal>
              </Link>
            </ViewTransition>
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              <span>Live component, filter it</span>
              <span>2026 <span aria-hidden className="ml-3 text-acid transition-transform duration-300 group-hover/proj:translate-x-1">&rarr;</span></span>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
