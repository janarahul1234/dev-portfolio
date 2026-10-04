import { Reveal } from "@/components/reveal";

/* Editorial introduction. Brief-specified "02 / ABOUT" label, one of the
   two numbered labels on the page (the other is the hero's). */
export function IntroSection() {
  return (
    <section
      id="about-intro"
      aria-label="Introduction statement"
      className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40"
    >
      <Reveal>
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          02 <span className="text-acid">/</span> About
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <blockquote className="max-w-[16ch] font-display text-[clamp(2.2rem,6vw,4.5rem)] font-bold uppercase leading-[1.04] tracking-[-0.03em]">
          &ldquo;I like the space between design and code.&rdquo;
        </blockquote>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-8">
        <Reveal delay={0.15} className="md:col-span-5 md:col-start-2">
          <p className="max-w-[52ch] text-base leading-relaxed text-paper md:text-lg">
            I&apos;m Rahul, a creative frontend developer focused on building
            interfaces that feel as good as they function.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="md:col-span-4 md:col-start-8">
          <p className="max-w-[46ch] text-sm leading-relaxed text-muted">
            I enjoy turning ideas, rough concepts and product problems into
            polished digital experiences with strong visual systems, thoughtful
            interactions and clean frontend architecture.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
