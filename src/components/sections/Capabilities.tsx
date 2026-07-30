const capabilities = [
  {
    title: "AI Visibility",
    description:
      "Be present when high-intent customers ask ChatGPT, Gemini and Perplexity for a recommendation.",
    result: ["More qualified discovery.", "More chances to enter the shortlist."],
  },
  {
    title: "Technical Structure",
    description:
      "Make your website easier for search engines and AI systems to crawl, interpret and connect.",
    result: ["Clearer understanding.", "Fewer technical barriers."],
  },
  {
    title: "Content Authority",
    description:
      "Build useful, trustworthy and verifiable content around the questions customers actually ask.",
    result: ["Stronger trust signals.", "More reasons to cite your business."],
  },
  {
    title: "AI-Ready Websites",
    description:
      "Design and build fast, structured websites for people, search engines and AI systems.",
    result: ["A clearer customer journey.", "More qualified enquiries."],
  },
] as const;

type Capability = (typeof capabilities)[number];

type CapabilityRowProps = {
  capability: Capability;
  foreground?: boolean;
  index: number;
};

function CapabilityRow({
  capability,
  foreground = false,
  index,
}: CapabilityRowProps) {
  return (
    <li
      className={`capability-row${index === 0 ? " is-active" : ""}`}
      {...(foreground
        ? { "data-capability-foreground-row": true }
        : { "data-capability-row": true })}
    >
      <div className="capability-row__title-wrap">
        <h3>{capability.title}</h3>
        <span className="capability-row__bracket" aria-hidden="true" />
      </div>

      <div className="capability-row__details">
        <p className="capability-row__description">{capability.description}</p>

        <div className="capability-row__result">
          <span className="capability-row__result-label">Result</span>
          <p>
            {capability.result.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
      </div>
    </li>
  );
}

export function Capabilities() {
  return (
    <section
      className="capabilities"
      id="capabilities"
      aria-labelledby="capabilities-title"
      data-capabilities
    >
      <div className="capabilities__pin" data-capabilities-pin>
        <div className="capabilities__inner">
          <header className="capabilities__header">
            <h2 id="capabilities-title">
              <span>/02</span>
              <span>Capabilities</span>
            </h2>
          </header>

          <div className="capabilities__rows-stage" data-capabilities-stage>
            <div
              className="capabilities__active-band"
              data-capabilities-band
              aria-hidden="true"
            />

            <div
              className="capabilities__foreground"
              data-capabilities-foreground
              aria-hidden="true"
            >
              <ol className="capabilities__rows">
                {capabilities.map((capability, index) => (
                  <CapabilityRow
                    capability={capability}
                    foreground
                    index={index}
                    key={capability.title}
                  />
                ))}
              </ol>
            </div>

            <ol className="capabilities__rows">
              {capabilities.map((capability, index) => (
                <CapabilityRow
                  capability={capability}
                  index={index}
                  key={capability.title}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
