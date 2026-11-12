import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { site, positioning } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";

// Fraunces upright is preloaded (it sets the headline). The italic is a self-hosted subset of
// lowercase letters, hyphen and apostrophe only (25 KB instead of 80 KB), since it is used for a
// few accent words. If an italic word ever needs capitals or digits, regenerate the subset:
// see docs/BRIEF.md.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
  style: ["normal"],
  display: "swap",
});
const frauncesItalic = localFont({
  src: "./fonts/Fraunces-Italic-subset.woff2",
  variable: "--font-fraunces-italic",
  weight: "300 600",
  style: "italic",
  display: "swap",
  preload: false,
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Bespoke carpentry and joinery`,
    template: `%s · ${site.shortName}`,
  },
  description: positioning.sub,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: positioning.headline,
    description: positioning.sub,
  },
  // Indexable once NEXT_PUBLIC_SITE_URL is set (i.e. the live domain is configured). Previews stay out of Google.
  robots: process.env.NEXT_PUBLIC_SITE_URL ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1a1612",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${frauncesItalic.variable} ${interTight.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
