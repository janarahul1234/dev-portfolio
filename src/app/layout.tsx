import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { CustomCursor } from "@/components/custom-cursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rahuljana.dev"),
  title: {
    default: "Rahul Jana - Creative Frontend Developer",
    template: "%s - Rahul Jana",
  },
  description:
    "Rahul Jana is a creative frontend developer building expressive, interactive and polished digital experiences with React, Next.js and modern web technologies.",
  openGraph: {
    title: "Rahul Jana - Creative Frontend Developer",
    description:
      "I build expressive digital experiences where thoughtful UI, interaction and code come together.",
    url: "https://rahuljana.dev",
    siteName: "Rahul Jana",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Jana - Creative Frontend Developer",
    description:
      "I build expressive digital experiences where thoughtful UI, interaction and code come together.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        {/* preconnect for placeholder photography + stack icon CDNs */}
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="preconnect" href="https://cdn.simpleicons.org" />
        <CustomCursor />
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
