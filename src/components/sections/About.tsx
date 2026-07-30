import Image from "next/image";

const photographs = [
  {
    src: "/images/about/workshop-sketches.png",
    alt: "A hand sketching website wireframes during a workshop",
    width: 424,
    height: 259,
  },
  {
    src: "/images/about/team-discussion.png",
    alt: "Two Web2Go team members discussing work at a table",
    width: 410,
    height: 259,
  },
  {
    src: "/images/about/code-workspace.png",
    alt: "A developer working with source code on a laptop",
    width: 392,
    height: 259,
  },
  {
    src: "/images/about/designer-workspace.png",
    alt: "A designer workspace with a drawing tablet and stylus",
    width: 441,
    height: 259,
  },
] as const;

const principles = [
  "Clarity before complexity",
  "Evidence over hype",
  "Human experience still matters",
  "Measure what changes",
] as const;

export function About() {
  return (
    <section
      className="about-section"
      id="about"
      aria-labelledby="about-title"
      data-about-section
    >
      <div className="completion-shell about-section__header-shell">
        <header className="completion-heading about-section__heading">
          <p className="completion-kicker" data-about-header>
            /06 About
          </p>
          <div className="about-section__title">
            <h2 id="about-title">
              <span data-about-heading-line>Built by people</span>
              <span data-about-heading-line>who care about</span>
              <span data-about-heading-line>clarity.</span>
            </h2>
            <span className="about-section__marker" aria-hidden="true" />
          </div>
        </header>
      </div>

      <div
        className="about-gallery"
        role="group"
        aria-label="Web2Go team at work"
      >
        {photographs.map((photograph) => (
          <figure className="about-gallery__panel" key={photograph.src}>
            <Image
              src={photograph.src}
              alt={photograph.alt}
              width={photograph.width}
              height={photograph.height}
              sizes="(max-width: 768px) 50vw, 25vw"
              data-about-image
            />
          </figure>
        ))}
      </div>

      <div className="completion-shell about-section__lower">
        <div className="about-section__body" data-about-copy>
          <p className="about-section__lead">
            Web2Go is a small European team combining AI strategy, web
            technology and business development. We help businesses become
            easier for people and AI systems to discover, understand and trust.
          </p>
          <p>
            We work directly, explain what we are doing and avoid inflated
            promises. AI visibility is not a trick or a guaranteed ranking
            &mdash; it is the result of clearer information, stronger sources
            and a better digital experience.
          </p>
          <span className="about-section__body-marker" aria-hidden="true" />
        </div>

        <ol className="about-principles" data-about-principles>
          {principles.map((principle, index) => (
            <li key={principle} data-about-principle>
              <span>0{index + 1}</span>
              <p>{principle}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
