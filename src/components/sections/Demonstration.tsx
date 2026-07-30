const ambiguousSignals = [
  {
    source: "Website footer",
    title: "Opening hours",
    value: "Wed-Sun / 17:00-late",
    status: "Conflicts with booking page",
  },
  {
    source: "Menu PDF",
    title: "Vegan options",
    value: "Ask the kitchen",
    status: "Not explicit",
  },
  {
    source: "Directory profile",
    title: "Cuisine",
    value: "Modern international",
    status: "Outdated description",
  },
  {
    source: "Social profile",
    title: "Reservations",
    value: "Three separate links",
    status: "No official source",
  },
] as const;

const structuredSignals = [
  "Canonical opening hours",
  "Structured cuisine and menu",
  "Vegan options explicitly stated",
  "Official address and booking source",
  "Connected, verifiable information",
] as const;

export function Demonstration() {
  return (
    <section
      className="demonstration-section"
      id="demonstration"
      aria-labelledby="demonstration-title"
      data-completion-demonstration
    >
      <div className="completion-shell">
        <header className="completion-heading demonstration-section__heading">
          <p className="completion-kicker">/04 Demonstration</p>
          <div className="completion-heading__grid">
            <h2 id="demonstration-title">From ambiguity to an answer.</h2>
            <div className="completion-heading__copy">
              <p>
                A fictional but realistic example of how clearer business
                information can lead to a more useful AI response.
              </p>
              <p className="demonstration-section__disclaimer">
                Illustrative demonstration &mdash; not client work
              </p>
            </div>
          </div>
        </header>

        <div
          className="demonstration-flow"
          aria-label="Scattered information becomes a structured source and then a clear AI answer"
        >
          <article
            className="demonstration-phase demonstration-phase--before"
            data-demonstration-phase
          >
            <header className="demonstration-phase__header">
              <span>01 / Before</span>
              <div>
                <h3>Scattered signals</h3>
                <p>North Table / Independent restaurant / Amsterdam</p>
              </div>
            </header>

            <div className="demonstration-fragments">
              {ambiguousSignals.map((signal) => (
                <div className="demonstration-fragment" key={signal.title}>
                  <span>{signal.source}</span>
                  <strong>{signal.title}</strong>
                  <p>{signal.value}</p>
                  <small>{signal.status}</small>
                </div>
              ))}
            </div>
          </article>

          <div className="demonstration-flow__connector" aria-hidden="true">
            <span />
            <b>&rarr;</b>
          </div>

          <article
            className="demonstration-phase demonstration-phase--structured"
            data-demonstration-phase
          >
            <header className="demonstration-phase__header">
              <span>02 / Web2Go structures</span>
              <div>
                <h3>One source of truth</h3>
                <p>North Table / Canonical business record</p>
              </div>
            </header>

            <div className="structured-source">
              <div className="structured-source__identity">
                <span>Verified source</span>
                <strong>North Table</strong>
                <p>Seasonal European restaurant / Amsterdam</p>
              </div>
              <ul>
                {structuredSignals.map((signal) => (
                  <li key={signal}>
                    <span aria-hidden="true">+</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <div className="demonstration-flow__connector" aria-hidden="true">
            <span />
            <b>&rarr;</b>
          </div>

          <article
            className="demonstration-phase demonstration-phase--answer"
            data-demonstration-phase
          >
            <header className="demonstration-phase__header">
              <span>03 / AI answer</span>
              <p>Clear, attributable response</p>
            </header>

            <blockquote>
              <span aria-hidden="true">&ldquo;</span>
              <p>
                North Table is an independent restaurant in Amsterdam serving
                seasonal European cuisine, with clearly listed vegan options
                and online reservations. It is open Wednesday through Sunday.{" "}
                <sup>[1]</sup>
              </p>
            </blockquote>

            <footer>
              <span>[1]</span>
              <cite>
                Official website &middot; Menu &middot; Reservations
              </cite>
            </footer>
          </article>
        </div>

        <p className="demonstration-section__sequence" aria-hidden="true">
          <span>Scattered information</span>
          <i />
          <span>Structured source</span>
          <i />
          <span>Clear AI answer</span>
        </p>
      </div>
    </section>
  );
}
