import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/lib/projects";
import { getNextProject } from "@/lib/projects";
import { ExpensePreview } from "@/components/previews/expense-preview";
import { ChatPreview } from "@/components/previews/chat-preview";
import { ShoppingPreview } from "@/components/previews/shopping-preview";
import { Reveal, MaskReveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";

const livePreviews = {
  "expense-tracker": <ExpensePreview />,
  "chat-app": <ChatPreview />,
  "shopping-app": <ShoppingPreview />,
} as const;

/* One editorial template, three stories. Sections stack with hairlines,
   no card kit; the live component from the home page morphs in via
   ViewTransition, continuing the shared-element story. */
export function CaseStudyPage({ project }: { project: Project }) {
  const next = getNextProject(project.slug);

  return (
    <>
      <main id="top" className="flex-1 pt-24 md:pt-28">
        {/* Project hero */}
        <header className="mx-auto max-w-[1440px] px-5 pb-16 md:px-10 md:pb-24">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Case study <span className="text-acid">/</span> {project.n}
              </p>
              <Link
                href="/#work"
                data-cursor="open"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-paper"
              >
                All work &uarr;
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal>
                <h1 className="font-display text-[clamp(2.4rem,6.5vw,5rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em]">
                  {project.title}
                </h1>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-muted md:text-lg">
                  {project.shortDescription}
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-8 max-w-[40ch] font-display text-xl font-medium italic leading-snug text-paper md:text-2xl">
                  {project.hero}
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-4">
              <dl className="flex flex-col gap-6 border border-line bg-surface p-6">
                {(
                  [
                    ["Category", project.category],
                    ["Year", project.year],
                    ["Role", project.role],
                    ["Stack", project.tech.join(", ")],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                      {k}
                    </dt>
                    <dd className="mt-1 text-sm text-paper">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </header>

        {/* Live preview strip, morphed from the home grid */}
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <ViewTransition name={`work-${project.slug}`}>
            <MaskReveal>{livePreviews[project.slug]}</MaskReveal>
          </ViewTransition>
        </div>

        {/* Narrative sections */}
        <div className="mx-auto mt-24 flex max-w-[1440px] flex-col gap-20 px-5 md:mt-36 md:gap-28 md:px-10">
          {(
            [
              ["The idea", project.idea],
              ["The problem", project.problem],
              ["The design", project.design],
              ["The build", project.build],
            ] as const
          ).map(([title, body], i) => (
            <Reveal key={title}>
              <section
                aria-label={title}
                className="grid grid-cols-1 gap-6 border-t border-line pt-10 md:grid-cols-12 md:gap-10"
              >
                <h2 className="font-display text-2xl font-bold uppercase tracking-[-0.02em] md:col-span-4 md:text-3xl">
                  {title}
                </h2>
                <p
                  className="max-w-[62ch] text-sm leading-relaxed text-muted md:col-span-7 md:col-start-6 md:text-base"
                  style={{ marginLeft: `${(i % 2) * 2}rem` }}
                >
                  {body}
                </p>
              </section>
            </Reveal>
          ))}

          {/* Challenges */}
          <Reveal>
            <section aria-label="Challenges" className="grid grid-cols-1 gap-6 border-t border-line pt-10 md:grid-cols-12 md:gap-10">
              <h2 className="font-display text-2xl font-bold uppercase tracking-[-0.02em] md:col-span-4 md:text-3xl">
                Challenges
              </h2>
              <ul className="flex flex-col gap-5 md:col-span-7 md:col-start-6">
                {project.challenges.map((c) => (
                  <li key={c} className="flex gap-4 text-sm leading-relaxed text-muted md:text-base">
                    <span aria-hidden className="mt-2 h-px w-6 shrink-0 bg-acid" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* Result */}
          <Reveal>
            <section aria-label="Result" className="grid grid-cols-1 gap-6 border-t border-line pt-10 md:grid-cols-12 md:gap-10">
              <h2 className="font-display text-2xl font-bold uppercase tracking-[-0.02em] md:col-span-4 md:text-3xl">
                Result
              </h2>
              <p className="max-w-[62ch] text-sm leading-relaxed text-paper md:col-span-7 md:col-start-6 md:text-base">
                {project.result}
              </p>
            </section>
          </Reveal>
        </div>

        {/* Gallery */}
        <section aria-label="Project gallery" className="mx-auto mt-24 max-w-[1440px] px-5 md:mt-32 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {project.shots.map((shot, i) => (
              <Reveal key={shot.seed} delay={i * 0.08}>
                <figure>
                  <MaskReveal>
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-line">
                      <Image
                        src={`https://picsum.photos/seed/${shot.seed}/${shot.w}/${shot.h}`}
                        alt={`${shot.caption} Placeholder screenshot until the real capture ships.`}
                        fill
                        sizes="(min-width: 768px) 50vw, 90vw"
                        className="grayscale object-cover opacity-85"
                      />
                    </div>
                  </MaskReveal>
                  <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                    {shot.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Next project */}
        <section aria-label="Next project" className="mx-auto mt-24 max-w-[1440px] px-5 pb-28 md:mt-32 md:px-10 md:pb-36">
          <Reveal>
            <div className="border-t border-line pt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                Next project
              </p>
              <Link
                href={`/work/${next.slug}`}
                data-cursor="view"
                className="group mt-4 flex items-baseline justify-between gap-6"
                aria-label={`Next project: ${next.title}`}
              >
                <span className="font-display text-[clamp(2rem,6vw,4.5rem)] font-bold uppercase leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-2 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                  {next.title}
                </span>
                <span
                  aria-hidden
                  className="font-display text-3xl text-acid transition-transform duration-300 group-hover:translate-x-2 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                >
                  &rarr;
                </span>
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
