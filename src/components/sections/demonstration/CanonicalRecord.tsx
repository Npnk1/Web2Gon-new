import { DISCLAIMER, recordEntries } from "./data";

export function CanonicalRecord() {
  return (
    <article
      className="demo-phase demo-phase--record"
      data-demonstration-phase
      aria-labelledby="demo-record-title"
    >
      <p className="demo-phase__kicker">
        <span>02</span> / Web2Go structures
      </p>
      <h3 className="demo-phase__title" id="demo-record-title">
        One source of truth
      </h3>
      <p className="demo-phase__meta">canonical business record</p>

      <div className="demo-record" data-demo-record>
        <p className="demo-record__verified">
          <i aria-hidden="true" />
          Verified source
        </p>
        <p className="demo-record__name">North Table</p>
        <p className="demo-record__descriptor">
          Seasonal European restaurant · Amsterdam
        </p>

        <ol className="demo-record__rows">
          {recordEntries.map((entry, index) => (
            <li className="demo-record__row" key={entry.label}>
              <span className="demo-record__index">{`0${index + 1}`}</span>
              <span className="demo-record__label">{entry.label}</span>
              <span className="demo-record__status">{entry.status}</span>
            </li>
          ))}
        </ol>

        <p className="demo-record__summary">
          5 signals merged · 0 conflicts left
          <span className="demo-record__summary-note">{DISCLAIMER}</span>
        </p>
      </div>
    </article>
  );
}
