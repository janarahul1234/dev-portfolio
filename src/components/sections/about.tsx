import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { principles, timeline } from "@/lib/site";

const LIKES = ["Clean interfaces", "Motion", "Typography", "Good coffee", "Building things"];

const DETAILS = [
  { label: "Focus", value: ["Frontend / UI"] },
  { label: "Currently learning", value: ["Creative web", "Advanced interaction"] },
  { label: "Likes", value: LIKES },
];

/* About: editorial portrait + statement, quiet detail column, then the
   philosophy block (brief's "Good UI is felt" section folded in). */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <Reveal>
            <h2
              id="about-heading"
              className="font-display text-[clamp(2.2rem,5.4vw,4.2rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em]"
            >
              The person behind the pixels.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex max-w-[58ch] flex-col gap-6 text-base leading-relaxed text-muted">
              <p className="text-paper">
                I&apos;m Rahul Jana, a frontend-focused developer who enjoys
                building interfaces where design and technology meet.
              </p>
              <p>
                I care about the small things: spacing, typography, motion,
                responsive behavior and the feeling a product gives you when
                you use it.
              </p>
              <p>
                I&apos;m constantly experimenting with new ways to make the web
                more expressive.
              </p>
            </div>
          </Reveal>

          {/* placeholder timeline, easy to replace with real entries */}
          <Reveal delay={0.15}>
            <ol className="mt-14">
              {timeline.map((t) => (
                <li
                  key={t.year}
                  className="grid grid-cols-[4rem_minmax(0,1fr)] gap-4 border-b border-line py-4 first:border-t md:grid-cols-[6rem_minmax(0,26ch)_minmax(0,1fr)]"
                >
                  <span className="font-mono text-xs tabular-nums text-acid">{t.year}</span>
                  <span className="font-display text-sm font-medium uppercase tracking-tight">
                    {t.label}
                  </span>
                  <span className="col-span-2 text-xs text-faint md:col-span-1">{t.detail}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/* right column: portrait + details */}
        <div className="md:col-span-4 md:col-start-9">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-line">
              <Image
                src="https://picsum.photos/seed/rahul-jana-desk-portrait/900/1125"
                alt="Placeholder portrait until a real photograph is provided"
                fill
                sizes="(min-width: 768px) 30vw, 90vw"
                className="grayscale object-cover opacity-90"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-8 space-y-6">
              {DETAILS.map((d) => (
                <div key={d.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                    {d.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-paper">
                    {d.value.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Philosophy: three principles, a real sequence of beliefs */}
      <div className="mt-28 md:mt-40">
        <Reveal>
          <p className="max-w-[14ch] font-display text-[clamp(2rem,5vw,3.8rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em]">
            Good UI is felt before it is understood.
          </p>
        </Reveal>
        {/* Staggered editorial rows, not a row of identical cards. */}
        <ol className="mt-14 md:mt-20">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 0.08}>
              <div
                className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-4 border-t border-line py-8 md:grid-cols-[5rem_minmax(0,32ch)_minmax(0,1fr)] md:gap-10"
                style={{ marginLeft: `${i * 3}rem`, maxWidth: "min(100%, 72rem)" }}
              >
                <span className="font-mono text-xs text-acid">{p.n}</span>
                <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight md:text-2xl">
                  {p.title}
                </h3>
                <p className="col-span-2 max-w-[52ch] text-sm leading-relaxed text-muted md:col-span-1">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
