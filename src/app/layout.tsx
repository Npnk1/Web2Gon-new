import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

// next/font self-hosts these at build time and serves them from our own origin,
// so there is no runtime request to Google. Weights match docs/DESIGN.md.
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-manrope",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Web2Go — Be the answer",
    template: "%s | Web2Go",
  },
  description:
    "Web2Go builds AI-ready websites and visibility systems so AI can understand, trust and cite your business.",
  applicationName: "Web2Go",
  category: "technology",
  keywords: [
    "AI visibility",
    "AI-ready websites",
    "semantic web development",
    "structured data",
    "technical SEO",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${plexMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
