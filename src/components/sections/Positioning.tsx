import { LinkAction } from "@/components/ui/LinkAction";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Positioning() {
  return (
    <section
      className="positioning page-grid"
      id="what-we-do"
      aria-labelledby="positioning-title"
    >
      <SectionLabel>What Web2Go changes</SectionLabel>
      <h2 id="positioning-title">
        Ranking is not enough when the answer is generated.
      </h2>
      <div className="positioning__copy">
        <p>
          When buyers ask an AI system for a recommendation, your website has
          to do more than appear in search. It has to explain who you are,
          connect what you do to the right entities and topics, support
          important claims, and make every useful fact easy to verify.
        </p>
        <p>
          Web2Go turns websites into clear, connected evidence systems—for
          people, search engines and AI assistants.
        </p>
        <LinkAction href="#method">Explore our method</LinkAction>
      </div>
      <div className="positioning__annotation" aria-hidden="true">
        <span>Source</span>
        <span>Context</span>
        <span>Evidence</span>
        <i />
      </div>
    </section>
  );
}
