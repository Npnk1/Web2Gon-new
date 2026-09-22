import Image from "next/image";

import { CONTACT_HREF } from "@/lib/site";

const auditedSystems = ["ChatGPT", "Gemini", "Perplexity"] as const;

const processColumns = [
  { figure: "Audit", caption: "Technical & content analysis" },
  { figure: "Structure", caption: "Schema, entities & clarity" },
  { figure: "Measure", caption: "Visibility across AI systems" },
] as const;

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__landscape" aria-hidden="true">
        <div className="hero__landscape-media">
          <Image
            className="hero__landscape-image"
            src="/images/web2go-topographic-hero.png"
            alt=""
            width={3840}
            height={1800}
            priority
            quality={60}
            /* Below 48rem the media is scaled to calc(78svh * 32 / 15), which is
               far wider than the viewport (~1704px at 768, ~1405px at 390), so
               100vw would under-request there. */
            sizes="(max-width: 48rem) 1800px, 100vw"
          />
        </div>
      </div>
      {/* Live terrain replaces the image above on capable desktop widths; see
          InformationLandscapeMotion. A sibling of .hero__landscape (not
          nested inside it) so it isn't subject to that element's opacity/
          mix-blend-mode dimming, which the static image relies on but the
          canvas's own alpha values already account for. Hidden until JS
          confirms desktop + no-reduced-motion, so the image stays the
          LCP/no-JS/reduced-motion/mobile source at all times. */}
      <canvas className="hero__terrain" aria-hidden="true" />

      <div className="hero__grid page-grid">
        <p className="hero__kicker">
          <span className="hero__kicker-left">
            <span className="hero__kicker-index">001</span>
            <span className="hero__kicker-rule" aria-hidden="true" />
            <span>AI Visibility Solutions</span>
          </span>
          <span className="hero__kicker-note">
            Scroll to structure the answer
          </span>
        </p>

        <div className="hero__main">
          <div className="hero__title-wrap">
            <h1
              className="hero__title"
              id="hero-title"
              aria-label="Be the answer"
            >
              <span className="hero__title-line">
                <span className="hero__title-word">Be</span>
              </span>
              <span className="hero__title-line">
                <span className="hero__title-word hero__title-word--serif">
                  the
                </span>{" "}
                <span className="hero__title-word">answer</span>
              </span>
            </h1>
          </div>

          <div className="hero__support">
            <p className="hero__support-hook">
              When customers ask AI, will it find you?
            </p>
            <p className="hero__support-body">
              We build and optimise websites so ChatGPT, Gemini and
              Perplexity can <em>understand</em>, <em>trust</em> and{" "}
              <em>recommend</em> your business.
            </p>
            <div className="hero__actions">
              <a className="hero__cta hero__cta--primary" href={CONTACT_HREF}>
                <span>Start with an AI visibility audit</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                className="hero__cta hero__cta--secondary"
                href="#demonstration"
              >
                See how it works
              </a>
            </div>
          </div>
        </div>

        <div className="hero__band">
          {processColumns.map((column) => (
            <div className="hero__band-col" key={column.figure}>
              <p className="hero__band-figure">{column.figure}</p>
              <p className="hero__band-caption">{column.caption}</p>
            </div>
          ))}

          <div className="hero__band-col hero__band-col--audited">
            <p className="hero__band-label">Built for visibility across</p>
            <ul>
              {auditedSystems.map((system) => (
                <li key={system}>{system}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
