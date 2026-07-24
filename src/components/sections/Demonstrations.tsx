import { demonstrations } from "@/data/homepage";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Demonstrations() {
  return (
    <section className="demonstrations" id="work" aria-labelledby="work-title">
      <div className="demonstrations__heading page-grid">
        <SectionLabel>Selected capabilities</SectionLabel>
        <h2 id="work-title">Show the method before claiming the result.</h2>
      </div>

      <div className="demonstration-list">
        {demonstrations.map((item) => (
          <article className="demonstration" key={item.index}>
            <span className="demonstration__index" aria-hidden="true">
              {item.index}
            </span>
            <p className="demonstration__label">{item.label}</p>
            <h3>{item.title}</h3>
            <p className="demonstration__description">{item.description}</p>
            <p className="demonstration__status">{item.status}</p>
            <div className="demonstration__diagram" aria-hidden="true">
              <i /><i /><i /><span>[W2G]</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
