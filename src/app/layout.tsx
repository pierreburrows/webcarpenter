import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site, positioning } from "@/lib/site";

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
  robots: { index: false, follow: false }, // flipped to true at launch
};

export const viewport: Viewport = {
  themeColor: "#171412",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-fg">{children}</body>
    </html>
  );
}
