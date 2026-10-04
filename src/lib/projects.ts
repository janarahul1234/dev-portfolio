/* ---------------------------------------------------------------------------
   Project content. Case-study copy is written by Rahul's side of the desk,
   no invented clients, awards or metrics. Replace freely.
--------------------------------------------------------------------------- */

export type ProjectKey = "expense-tracker" | "chat-app" | "shopping-app";

export type Project = {
  slug: ProjectKey;
  n: string;
  title: string;
  category: string;
  year: string;
  role: string;
  shortDescription: string;
  tech: string[];
  hero: string;
  idea: string;
  problem: string;
  design: string;
  build: string;
  challenges: string[];
  result: string;
  /* gallery photography seeds (placeholders until real screenshots ship) */
  shots: { seed: string; caption: string; w: number; h: number }[];
};

export const projects: Project[] = [
  {
    slug: "expense-tracker",
    n: "01",
    title: "Expense Tracker",
    category: "Product / UI / Frontend",
    year: "2026",
    role: "UI / Development",
    shortDescription:
      "A clean and intuitive expense tracking experience designed to make personal finance feel simple.",
    tech: ["React", "Next.js", "Tailwind", "MongoDB"],
    hero: "Money data is stressful. The interface should not add to it.",
    idea: "A personal finance app that behaves like a quiet ledger: open it, understand the month at a glance, log an expense in two taps, close it. No gamification, no streaks, no noise.",
    problem: "Most expense apps bury the one useful question, where did my money go, under tabs of settings, budgets nobody sets and charts designed for accountants. The interface has to answer that question before the user asks it.",
    design: "One dark, calm surface. A single acid-green accent reserved for the number that matters this month. Type does the hierarchy: large tabular figures for amounts, small mono labels for categories. Charts are thin bars, not rainbow donuts.",
    build: "Next.js App Router with Server Components for the overview data, client islands only where interaction lives (adding transactions, switching ranges). Charts rendered as lightweight SVG from data, transactions optimistic-updated against a MongoDB-backed API route, everything keyboard-first.",
    challenges: [
      "Keeping chart animations on transform and opacity only, so month-to-month switching never reflows the layout.",
      "One input flow for speed: a single field parses amount, category and note, with live parsing shown inline.",
      "Currency figures align across weights and fonts with tabular numbers, without breaking the variable display face.",
    ],
    result: "A working tracker where the month's story, the spend, the categories, the outliers, reads in one screen. The preview on this page is the real component, not a picture of one.",
    shots: [
      { seed: "expense-ledger-overview", caption: "Overview, the month at a glance.", w: 1600, h: 1000 },
      { seed: "expense-add-transaction", caption: "Two taps to log a transaction.", w: 1600, h: 1000 },
    ],
  },
  {
    slug: "chat-app",
    n: "02",
    title: "Chat App",
    category: "Real-time Product / UI",
    year: "2026",
    role: "UI / Development",
    shortDescription:
      "A modern chat experience focused on clean communication, responsive interactions and a simple visual language.",
    tech: ["React", "Next.js", "Tailwind", "MongoDB"],
    hero: "A message should feel like a tap, not a page load.",
    idea: "A messaging product stripped to its parts: conversations, threads, people. Everything else, presence, typing, delivery, is told through small, precise interface behavior instead of extra chrome.",
    problem: "Chat UIs tend to over-decorate: gradients behind bubbles, twelve status badges, a sidebar of features. Communication becomes the secondary thing on screen. The app should disappear while the conversation is happening.",
    design: "Two bubble weights on a near-black canvas. Incoming messages sit in muted gray, outgoing in the single accent color, so direction is readable at a glance without arrows or names on every row. Avatars carry the only color variety.",
    build: "MongoDB change feed pushing events over a realtime channel to the client. Messages render optimistically before the round trip resolves, typing indicators are debounced events, not timers. The animated thread previewed on the home page is the same component the app ships.",
    challenges: [
      "Keeping scroll anchored at the bottom while new messages arrive, without fighting the user who scrolled up to read history.",
      "Typing, delivered and read states as a tiny state machine, so the UI never shows two contradictory signals.",
      "Virtualizing long threads so switching conversations stays instant on low-end mobile.",
    ],
    result: "A messenger that feels immediate. The hover conversation on the home page plays the real exchange sequence, message, typing, reply.",
    shots: [
      { seed: "chat-thread-dark", caption: "A thread mid-conversation.", w: 1600, h: 1000 },
      { seed: "chat-mobile-list", caption: "Conversation list on mobile.", w: 1600, h: 1000 },
    ],
  },
  {
    slug: "shopping-app",
    n: "03",
    title: "Shopping App",
    category: "E-commerce / UI / Frontend",
    year: "2026",
    role: "UI / Development",
    shortDescription:
      "A visually focused shopping experience built around product discovery and clean interaction.",
    tech: ["Next.js", "React", "Tailwind", "MongoDB"],
    hero: "The product is the interface. Everything else is support.",
    idea: "A storefront where photography carries the page and the interface stays out of the way. Discovery first: browse, filter, open, add. Each step should feel like one gesture, not one decision.",
    problem: "Small catalogs rendered by generic commerce templates make five products look like a warehouse. Strong editorial layout makes five products look like a collection.",
    design: "Full-bleed imagery with generous negative space, a type scale borrowed from print catalogs, and filters as quiet inline chips instead of sidebar forms. The cart is a drawer, never a page.",
    build: "Static product pages through the App Router with on-demand revalidation for inventory. The filter row updates results client-side against data already prefetched, so filtering is instant. The discovery grid previewed in the Lab section of this page is a working, clickable component.",
    challenges: [
      "Image-weight discipline: next/image with tuned sizes keeps a photo-led storefront fast on mid-range devices.",
      "Keeping grid rhythm when product aspect ratios vary, without cropping the photography badly.",
      "Cart state that survives refresh and stays in sync with the server without a full client store.",
    ],
    result: "A storefront that reads like a magazine and behaves like an app. The preview grid on this page filters and responds to hover for real.",
    shots: [
      { seed: "shopping-collection-grid", caption: "Collection grid, editorial spacing.", w: 1600, h: 1000 },
      { seed: "shopping-product-detail", caption: "Product detail with quiet filters.", w: 1600, h: 1000 },
    ],
  },
];

export const projectOrder: ProjectKey[] = projects.map((p) => p.slug);

export function getProject(slug: ProjectKey) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: ProjectKey) {
  const i = projectOrder.indexOf(slug);
  return projects[(i + 1) % projects.length];
}
