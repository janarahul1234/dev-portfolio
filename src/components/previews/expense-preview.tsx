"use client";

import { motion, useReducedMotion } from "motion/react";

/* Live Expense Tracker preview.
   Sample data, rendered by the same patterns the real app uses. */

const MONTHS = [
  { m: "M", v: 42 },
  { m: "T", v: 61 },
  { m: "W", v: 38 },
  { m: "T", v: 74 },
  { m: "F", v: 88 },
  { m: "S", v: 56 },
  { m: "S", v: 31 },
];

const CATS = [
  { name: "Groceries", pct: 34, top: true },
  { name: "Transport", pct: 22, top: false },
  { name: "Rent", pct: 28, top: false },
  { name: "Fun", pct: 16, top: false },
];

const TXNS = [
  { label: "Weekly groceries", cat: "Groceries", amount: "₹2,480" },
  { label: "Metro card top-up", cat: "Transport", amount: "₹500" },
  { label: "Coffee, third one", cat: "Fun", amount: "₹310" },
];

export function ExpensePreview() {
  const reduce = useReducedMotion();
  return (
    <div className="border border-line bg-surface">
      <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* main panel */}
        <div className="bg-surface p-5 md:p-7">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              This month
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              Apr
            </p>
          </div>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            ₹18,420<span className="text-acid">.</span>
          </p>
          <p className="mt-1 text-xs text-muted">spent so far, sample data</p>

          {/* bar chart */}
          <div className="mt-7 flex h-28 items-end gap-2 md:h-32" aria-hidden>
            {MONTHS.map((d, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-acid/80"
                initial={reduce ? undefined : { scaleY: 0 }}
                whileInView={reduce ? undefined : { scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                style={{ originY: 1, height: `${d.v}%` }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
          <div className="mt-2 flex gap-2 text-center font-mono text-[9px] text-faint" aria-hidden>
            {MONTHS.map((d, i) => (
              <span key={i} className="flex-1">{d.m}</span>
            ))}
          </div>

          {/* transactions */}
          <ul className="mt-6 border-t border-line pt-4">
            {TXNS.map((t) => (
              <li key={t.label} className="flex items-baseline justify-between py-2">
                <div>
                  <p className="text-sm text-paper">{t.label}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    {t.cat}
                  </p>
                </div>
                <p className="font-mono text-sm tabular-nums text-paper">{t.amount}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* side panel: categories + mobile peek */}
        <div className="flex flex-col justify-between bg-surface p-5 md:p-7">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              Categories
            </p>
            <ul className="mt-4 space-y-3">
              {CATS.map((c) => (
                <li key={c.name}>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className={c.top ? "text-paper" : "text-muted"}>{c.name}</span>
                    <span className="font-mono tabular-nums text-faint">{c.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-px w-full bg-line">
                    <motion.div
                      className={`h-px ${c.top ? "bg-acid" : "bg-faint/70"}`}
                      initial={reduce ? undefined : { scaleX: 0 }}
                      whileInView={reduce ? undefined : { scaleX: 1 }}
                      viewport={{ once: true }}
                      style={{ width: `${c.pct * 2.4}%`, transformOrigin: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* phone silhouette showing the mobile UI */}
          <div className="mt-8 hidden md:block" aria-label="Mobile summary view" role="img">
            <div className="mx-auto w-[104px] border border-line bg-ink p-2.5 pt-3">
              <div className="mx-auto mb-2 h-px w-8 bg-line" />
              <p className="font-mono text-[8px] uppercase tracking-widest text-faint">Today</p>
              <p className="mt-0.5 font-display text-sm font-bold">₹3,290</p>
              <div className="mt-2 space-y-1">
                <div className="h-1 w-full bg-acid/70" />
                <div className="h-1 w-3/4 bg-faint/40" />
                <div className="h-1 w-1/2 bg-faint/25" />
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-line pt-2">
                <span className="font-mono text-[8px] text-faint">+ Add</span>
                <span className="h-3 w-3 rounded-full bg-acid/90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
