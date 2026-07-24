import { process } from "@/data/homepage";
import { LinkAction } from "@/components/ui/LinkAction";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Process() {
  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <div className="process__heading page-grid">
        <SectionLabel>How we work</SectionLabel>
        <h2 id="process-title">
          Diagnose first. Structure before motion. Verify before launch.
        </h2>
      </div>

      <ol className="process__steps">
        {process.map((step) => (
          <li key={step.index}>
            <span>{step.index}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="process__action">
        <LinkAction href="#contact">Discuss your starting point</LinkAction>
      </div>
    </section>
  );
}
