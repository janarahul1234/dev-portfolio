import { BackToTop } from "@/components/back-to-top";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-6 px-5 py-10 md:px-10 md:py-12">
        <div className="flex flex-col gap-1">
          <p className="font-display text-sm font-medium tracking-tight">
            RAHUL JANA<sup className="text-acid">&reg;</sup>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
            Creative Frontend Developer
          </p>
        </div>
        <div className="flex items-end gap-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
            &copy; 2026 Rahul Jana
            <span className="mt-1 block">{site.location}</span>
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
