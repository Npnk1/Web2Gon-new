import { citationSteps } from "@/data/homepage";
import { LinkAction } from "@/components/ui/LinkAction";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VerificationMarker } from "@/components/ui/VerificationMarker";

export function CitationJourney() {
  return (
    <section
      className="citation-journey"
      id="citation-path"
      aria-labelledby="citation-title"
    >
      <div className="citation-journey__heading page-grid">
        <SectionLabel inverse>The answer path</SectionLabel>
        <h2 id="citation-title">A citation is the end of a chain.</h2>
        <p>
          No optimization can guarantee that an AI system will cite a company.
          But the source can make each step clearer, more consistent and easier
          to verify.
        </p>
      </div>

      <div className="citation-journey__body page-grid">
        <div className="citation-graph" aria-hidden="true">
          <div className="citation-graph__question">Buyer question</div>
          <div className="citation-graph__node citation-graph__node--1">Page</div>
          <div className="citation-graph__node citation-graph__node--2">Entity</div>
          <div className="citation-graph__node citation-graph__node--3">Source</div>
          <div className="citation-graph__node citation-graph__node--4">Evidence</div>
          <div className="citation-graph__line citation-graph__line--1" />
          <div className="citation-graph__line citation-graph__line--2" />
          <div className="citation-graph__line citation-graph__line--3" />
          <div className="citation-graph__result">
            <VerificationMarker inverse>Cited</VerificationMarker>
            <strong>[W2G]</strong>
          </div>
        </div>

        <ol className="citation-steps">
          {citationSteps.map((step) => (
            <li key={step.index}>
              <span>{step.index}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="citation-journey__action">
        <LinkAction href="#contact" variant="inverse">
          Build a clearer source path
        </LinkAction>
      </div>
    </section>
  );
}
