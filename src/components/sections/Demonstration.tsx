import { AnswerPanel } from "./demonstration/AnswerPanel";
import { CanonicalRecord } from "./demonstration/CanonicalRecord";
import { ScatteredSignals } from "./demonstration/ScatteredSignals";
import { DISCLAIMER, RECORD_ID, phaseCaptions } from "./demonstration/data";

export function Demonstration() {
  return (
    <section
      className="demonstration-section"
      id="demonstration"
      aria-labelledby="demonstration-title"
      data-completion-demonstration
    >
      <div className="completion-shell demo__inner">
        <header className="demo__head">
          <p className="demo__kicker">
            <span className="demo__kicker-index">/04 Demonstration</span>
            <span className="demo__kicker-note">{DISCLAIMER}</span>
            <span className="demo__kicker-fig">Fig. 04.1</span>
          </p>

          <div className="demo__head-grid">
            <h2 className="demo__title" id="demonstration-title">
              From ambiguity
              <br />
              to an answer
              <span className="demo__title-mark" aria-hidden="true">
                .
              </span>
            </h2>

            <p className="demo__lede">
              A fictional but realistic example: the same restaurant, described
              by five conflicting sources — then by one verified record.
            </p>

            <div className="demo__subject">
              <p className="demo__subject-label">Subject</p>
              <p className="demo__subject-name">North Table — Amsterdam</p>
              <p className="demo__subject-meta">
                Fictional example · {RECORD_ID}
              </p>
              <p className="demo__subject-flow">
                5 signals → 1 source → 1 answer
              </p>
            </div>
          </div>
        </header>

        <div className="demo__body">
          <ScatteredSignals />
          <CanonicalRecord />
          <AnswerPanel />
        </div>

        <p className="demo__phases" aria-hidden="true">
          {phaseCaptions.map((caption) => (
            <span key={caption}>{caption}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
