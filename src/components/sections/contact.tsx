"use client";

import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

/* Contact: the closing statement. The email link is the CTA, rendered as
   display type rather than a button, per the brief. */
export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-44"
    >
      <Reveal>
        <h2
          id="contact-heading"
          className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold uppercase leading-[1.0] tracking-[-0.03em]"
        >
          Let&apos;s build<br />
          something good<span className="text-acid">.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-[44ch] text-base leading-relaxed text-muted md:text-lg">
          Have an idea, product or interface that needs to exist? Let&apos;s talk.
        </p>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mt-14 md:mt-20">
          <Magnetic strength={0.2} className="inline-block">
            <a
              href={`mailto:${site.email}`}
              data-cursor="open"
              className="group inline-flex items-baseline gap-4 border-b-2 border-acid pb-2 font-display text-2xl font-bold uppercase tracking-[-0.02em] text-paper transition-colors hover:text-acid md:text-4xl"
            >
              Let&apos;s talk
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-2 motion-reduce:transition-none"
              >
                &rarr;
              </span>
            </a>
          </Magnetic>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <ul className="mt-16 flex flex-wrap gap-x-12 gap-y-4">
          {(
            [
              ["GitHub", site.github],
              ["LinkedIn", site.linkedin],
              ["Email", `mailto:${site.email}`],
            ] as const
          ).map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                data-cursor="open"
                className="font-display text-lg font-medium uppercase tracking-tight text-muted underline decoration-line underline-offset-8 transition-colors hover:text-paper hover:decoration-acid md:text-xl"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
