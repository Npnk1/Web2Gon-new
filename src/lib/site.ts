/**
 * Single source of truth for site-level identity, contact routing and
 * navigation. Everything that renders a "Contact" affordance must import from
 * here so there is exactly one place to change the destination.
 */

/**
 * ⚠️ REPLACE BEFORE LAUNCH — placeholder, not a real inbox.
 *
 * The brief that asked for this wiring left the address as "[ВСТАВИТЬ EMAIL]",
 * so no address has been supplied yet. Every contact CTA on the site resolves
 * through this constant: change this one line and the header, footer, mobile
 * menu, hero and final CTA all follow.
 */
export const CONTACT_EMAIL = "REPLACE-ME@web2go.example";

/** True once a real inbox has been supplied. Guards the launch checklist. */
export const CONTACT_EMAIL_IS_PLACEHOLDER =
  CONTACT_EMAIL.includes("REPLACE-ME");

export const CONTACT_SUBJECT = "AI visibility audit enquiry";

/** The one href every contact CTA uses. */
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  CONTACT_SUBJECT,
)}`;

/**
 * Production origin. Set NEXT_PUBLIC_SITE_URL in the deployment environment so
 * a domain can be attached later without touching code. The localhost fallback
 * only affects local builds; metadataBase needs an absolute URL either way.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const SITE_NAME = "Web2Go";

export const SITE_DESCRIPTION =
  "Web2Go builds AI-ready websites and visibility systems so AI can understand, trust and cite your business.";

/**
 * Section navigation. Shared by the header, the compact menu and the footer so
 * the three can never drift apart.
 */
export const NAVIGATION = [
  { label: "Landscape", href: "#information-landscape" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Demonstration", href: "#demonstration" },
  { label: "Method", href: "#method" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
