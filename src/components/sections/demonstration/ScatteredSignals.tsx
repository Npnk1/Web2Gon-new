import type { CSSProperties } from "react";

import { signals } from "./data";

/**
 * Per-card placement from the design, expressed as percentages of the column so
 * the deliberate left-edge bleed survives a fluid grid. Rotation is dropped at
 * narrow widths in CSS, where it would cause horizontal overflow.
 */
const placement = [
  { x: "-4%", w: "60%", r: "-0.9deg" },
  { x: "28%", w: "63%", r: "1.4deg" },
  { x: "-16%", w: "59%", r: "0.4deg" },
  { x: "31%", w: "61%", r: "-1.7deg" },
  { x: "-3%", w: "57%", r: "1deg" },
] as const;

export function ScatteredSignals() {
  return (
    <article
      className="demo-phase demo-phase--signals"
      data-demonstration-phase
      aria-labelledby="demo-signals-title"
    >
      <p className="demo-phase__kicker">
        <span>01</span> / Before
      </p>
      <h3 className="demo-phase__title" id="demo-signals-title">
        Scattered signals
      </h3>
      <p className="demo-phase__meta">unverified · contradictory · unreadable</p>

      <ol className="demo-signals">
        {signals.map((signal, index) => (
          <li className="demo-signal" key={signal.source}>
            <div
              className={`demo-signal__card demo-signal__card--${signal.tone}`}
              data-demo-signal
              style={
                {
                  "--signal-x": placement[index].x,
                  "--signal-w": placement[index].w,
                  "--signal-r": placement[index].r,
                } as CSSProperties
              }
            >
              <p className="demo-signal__source">{signal.source}</p>
              <p className="demo-signal__value">
                {signal.struck ? (
                  <s className="demo-signal__struck">{signal.struck}</s>
                ) : null}
                {signal.struck ? " " : null}
                {signal.value}
              </p>
              <p
                className={
                  signal.emphasis
                    ? "demo-signal__problem demo-signal__problem--flagged"
                    : "demo-signal__problem"
                }
              >
                {signal.problem}
              </p>
            </div>

            <span className="demo-signal__lineage" aria-hidden="true">
              <i className="demo-signal__rule" data-demo-lineage />
              <b className="demo-signal__index">{`0${index + 1}`}</b>
              <i className="demo-signal__node" data-demo-node />
            </span>
          </li>
        ))}
      </ol>

      <p className="demo-signals__doc" aria-hidden="true">
        Doc. photo
        <span>facade / signage</span>
      </p>
    </article>
  );
}
