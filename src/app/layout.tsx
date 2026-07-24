import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
