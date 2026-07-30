const methodSteps = [
  {
    index: "01",
    title: "Audit",
    body: "Find what AI systems can and cannot understand about your business.",
  },
  {
    index: "02",
    title: "Structure",
    body: "Create one clear, machine-readable source of truth.",
  },
  {
    index: "03",
    title: "Authority",
    body: "Strengthen useful, trustworthy and verifiable content.",
  },
  {
    index: "04",
    title: "Experience",
    body: "Turn clearer information into a faster and better customer journey.",
  },
  {
    index: "05",
    title: "Measure",
    body: "Track visibility, citations and qualified enquiries.",
  },
] as const;

function MethodDotField({ className }: { className: string }) {
  const dots = Array.from({ length: 28 }, (_, index) => ({
    x: 4 + (index % 7) * 12,
    y: 4 + Math.floor(index / 7) * 12,
  }));

  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 80 44"
      fill="none"
    >
      {dots.map((dot) => (
        <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r="0.75" />
      ))}
    </svg>
  );
}

export function Method() {
  return (
    <section
      className="method-section"
      id="method"
      aria-labelledby="method-title"
      data-completion-method
    >
      <div className="completion-shell method-section__inner">
        <header className="method-section__header">
          <p className="completion-kicker method-section__kicker">
            /05 Method
          </p>
          <span className="method-registration method-registration--top" aria-hidden="true" />

          <div className="method-section__heading">
            <h2 id="method-title">
              <span>A clear process.</span>
              <span>No mystery.</span>
            </h2>

            <p
              className="method-section__sequence"
              aria-label="Audit, Structure, Authority, Experience, Measure"
            >
              <span>Audit</span>
              <b aria-hidden="true">&rarr;</b>
              <span>Structure</span>
              <b aria-hidden="true">&rarr;</b>
              <span>Authority</span>
              <b aria-hidden="true">&rarr;</b>
              <span>Experience</span>
              <b aria-hidden="true">&rarr;</b>
              <span>Measure</span>
            </p>
          </div>
        </header>

        <div className="method-stage">
          <MethodDotField className="method-dots method-dots--upper" />
          <MethodDotField className="method-dots method-dots--lower" />
          <span className="method-registration method-registration--lower" aria-hidden="true" />

          <div
            className="method-stage__destination"
            data-method-panel
            aria-hidden="true"
          >
            <span />
          </div>

          <svg
            className="method-route"
            aria-hidden="true"
            viewBox="0 0 1600 500"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <marker
                id="method-route-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0 0L8 4L0 8Z" />
              </marker>
            </defs>

            <path
              className="method-route__path"
              data-method-route
              d="M24 80H292Q304 80 304 92V103Q304 115 316 115H620Q632 115 632 127V133Q632 145 644 145H910Q922 145 922 157V163Q922 175 934 175H1210Q1222 175 1222 187V193Q1222 205 1234 205H1570"
              markerEnd="url(#method-route-arrow)"
              fill="none"
            />
            <circle className="method-route__origin" cx="24" cy="80" r="4" />

            {[
              { index: "01", x: 100, y: 80 },
              { index: "02", x: 450, y: 115 },
              { index: "03", x: 750, y: 145 },
              { index: "04", x: 1040, y: 175 },
              { index: "05", x: 1370, y: 205 },
            ].map((node) => (
              <g
                className="method-route__node"
                data-method-node
                key={node.index}
              >
                <line
                  x1={node.x}
                  y1={node.y + 24}
                  x2={node.x}
                  y2={node.y + 68}
                />
                <circle cx={node.x} cy={node.y} r="24" />
                <text x={node.x} y={node.y}>
                  {node.index}
                </text>
              </g>
            ))}
          </svg>

          <ol className="method-steps">
            {methodSteps.map((step) => (
              <li
                className={`method-step method-step--${step.index}`}
                data-method-step
                key={step.index}
              >
                <span className="method-step__mobile-node" aria-hidden="true">
                  {step.index}
                </span>
                <div className="method-step__content" data-method-content>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
