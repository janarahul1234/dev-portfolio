import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-start justify-center px-6 md:px-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
        404 <span className="text-acid">/</span> Nothing here
      </p>
      <h1 className="mt-6 max-w-[12ch] font-display text-[clamp(2.6rem,8vw,6rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em]">
        This page was never built.
      </h1>
      <Link
        href="/"
        data-cursor="open"
        className="mt-10 border-b-2 border-acid pb-1 font-display text-lg font-bold uppercase tracking-tight text-paper transition-colors hover:text-acid"
      >
        Back to the playground &rarr;
      </Link>
    </main>
  );
}
