import { Hero } from "@/components/hero";
import { IntroSection } from "@/components/sections/intro";
import { WorkSection } from "@/components/sections/work";
import { BuiltWithCodeSection } from "@/components/sections/built-with-code";
import { StackSection } from "@/components/sections/stack";
import { LabSection } from "@/components/sections/lab";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { SiteFooter } from "@/components/site-footer";

/* Route transitions: the short black wipe lives in globals.css at the
   ::view-transition root level, so it runs on every navigation without
   per-page wrappers. Reduced motion falls back to an instant swap. */
export default function Home() {
  return (
    <>
      <main id="top" className="flex-1">
        <Hero />
        <IntroSection />
        <WorkSection />
        <BuiltWithCodeSection />
        <StackSection />
        <LabSection />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
