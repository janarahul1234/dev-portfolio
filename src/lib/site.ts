/* ---------------------------------------------------------------------------
   Central site content. Edit copy here, not in components.
--------------------------------------------------------------------------- */

export const site = {
  name: "Rahul Jana",
  role: "Creative Frontend Developer",
  location: "India",
  available: true,
  // TODO: replace with real profile URLs when they exist.
  email: "hello@rahuljana.dev",
  github: "https://github.com/rahuljana",
  linkedin: "https://www.linkedin.com/in/rahuljana",
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experiments", href: "/#lab" },
  { label: "Contact", href: "/#contact" },
] as const;

export const stack = [
  { n: "01", name: "React", logo: "react" },
  { n: "02", name: "Next.js", logo: "nextdotjs" },
  { n: "03", name: "Tailwind CSS", logo: "tailwindcss" },
  { n: "04", name: "MongoDB", logo: "mongodb" },
  { n: "05", name: "MySQL", logo: "mysql" },
  { n: "06", name: "JavaScript", logo: "javascript" },
  { n: "07", name: "TypeScript", logo: "typescript" },
  { n: "08", name: "Node.js", logo: "nodejs" },
  { n: "09", name: "Git", logo: "git" },
  { n: "10", name: "And more", logo: null },
] as const;

export const principles = [
  {
    n: "01",
    title: "Detail matters",
    body: "The last four percent is the whole product. Spacing, easing, hover states, empty states. Details are not details. They make the design.",
  },
  {
    n: "02",
    title: "Interaction should have purpose",
    body: "Motion that answers a question, confirms an action or guides attention. Nothing that simply decorates the viewport.",
  },
  {
    n: "03",
    title: "Code should serve the experience",
    body: "Architecture exists so the interface can feel instant, calm and alive. Clean frontend structure is the invisible half of good UI.",
  },
] as const;

/* Experience timeline. Placeholders until real entries are provided. */
export const timeline = [
  { year: "2026", label: "Currently building", detail: "This portfolio, and the next product interface." },
  { year: "2025", label: "Project / experience", detail: "Replace with a real entry." },
  { year: "2024", label: "Project / experience", detail: "Replace with a real entry." },
] as const;
