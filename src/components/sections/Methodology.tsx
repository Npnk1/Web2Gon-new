import { methodology } from "@/data/homepage";
import { LinkAction } from "@/components/ui/LinkAction";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Methodology() {
  return (
    <section className="methodology" id="method" aria-labelledby="method-title">
      <div className="methodology__intro page-grid">
        <SectionLabel>A measurable methodology</SectionLabel>
        <div>
          <h2 id="method-title">We measure observable signals, not vanity scores.</h2>
          <p>
            An AI visibility audit records what can be discovered, how clearly
            it can be interpreted, where evidence is available, and whether a
            useful answer has a source worth citing. Every finding links to an
            observed page, response or technical signal.
          </p>
        </div>
      </div>

      <div className="methodology__dimensions page-grid">
        {methodology.map((dimension) => (
          <article className="dimension" key={dimension.index}>
            <div className="dimension__number" aria-hidden="true">
              {dimension.index}
            </div>
            <h3>{dimension.title}</h3>
            <p className="dimension__question">{dimension.question}</p>
            <dl>
              <div>
                <dt>Measure</dt>
                <dd>{dimension.measure}</dd>
              </div>
              <div>
                <dt>Output</dt>
                <dd>{dimension.output}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="methodology__action">
        <LinkAction href="#audit" variant="primary">
          See what an audit includes
        </LinkAction>
      </div>
    </section>
  );
}
