import { DISCLAIMER, RECORD_ID } from "./data";

export function AnswerPanel() {
  return (
    <article
      className="demo-phase demo-phase--answer"
      data-demonstration-phase
      data-demo-answer
      aria-labelledby="demo-answer-title"
    >
      <span className="demo-answer__numeral" aria-hidden="true">
        03
      </span>

      {/* The design gives phase 03 no separate title, so the kicker carries the
          heading — keeping one h3 per phase in the outline. */}
      <h3 className="demo-phase__kicker demo-answer__kicker" id="demo-answer-title">
        <span>03</span> / AI answer
      </h3>
      <p className="demo-answer__output">Output</p>

      <blockquote className="demo-answer__quote">
        <span className="demo-answer__mark" aria-hidden="true">
          &ldquo;
        </span>
        <p>
          North Table is an independent restaurant in Amsterdam serving seasonal
          European cuisine, with clearly listed vegan options and online
          reservations. It is open Wednesday through Sunday.
          <sup className="demo-answer__ref">[1]</sup>
        </p>
      </blockquote>

      <footer className="demo-answer__footer">
        <p className="demo-answer__citation">
          <span className="demo-answer__ref">[1]</span>
          <cite>Official website · Menu · Reservations</cite>
        </p>
        <p className="demo-answer__provenance">
          Verified by Web2Go · {RECORD_ID}
          <span className="demo-answer__provenance-note">{DISCLAIMER}</span>
        </p>
      </footer>
    </article>
  );
}
