import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CONTACT_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found" id="main-content">
        <div className="completion-shell not-found__inner">
          <p className="not-found__kicker">
            <span className="not-found__code">404</span>
            <span className="not-found__rule" aria-hidden="true" />
            <span>Page not found</span>
          </p>

          <h1 className="not-found__title">
            This page isn&apos;t
            <br />
            part of the answer.
          </h1>

          <p className="not-found__body">
            The address you followed doesn&apos;t exist. Everything Web2Go
            publishes lives on the home page.
          </p>

          <div className="not-found__actions">
            <Link
              className="not-found__cta not-found__cta--primary"
              href="/"
            >
              <span>Back to the home page</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <a
              className="not-found__cta not-found__cta--secondary"
              href={CONTACT_HREF}
            >
              Get in touch
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
