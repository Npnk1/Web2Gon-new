import { services } from "@/data/homepage";
import type { Service } from "@/types/content";
import { LinkAction } from "@/components/ui/LinkAction";
import { SectionLabel } from "@/components/ui/SectionLabel";

function ServiceVisual({ service }: { service: Service }) {
  if (service.id === "audit") {
    return (
      <div className="service-visual service-visual--audit" aria-hidden="true">
        <span className="service-visual__big">01</span>
        <div className="audit-track">
          <i /><i /><i /><i /><i />
        </div>
        <div className="audit-sample">
          <span>Question</span><strong>Can this source be trusted?</strong>
        </div>
        <div className="audit-status">Observed / traced / prioritized</div>
      </div>
    );
  }

  if (service.id === "websites") {
    return (
      <div className="service-visual service-visual--websites" aria-hidden="true">
        <span className="service-visual__big">02</span>
        <div className="page-plane page-plane--1"><i /><i /><i /></div>
        <div className="page-plane page-plane--2"><i /><i /><i /><i /></div>
        <div className="page-plane page-plane--3"><i /><i /></div>
        <div className="website-relation">Entity → service → evidence</div>
      </div>
    );
  }

  if (service.id === "technical") {
    return (
      <div className="service-visual service-visual--technical" aria-hidden="true">
        <span className="service-visual__big">03</span>
        <div className="graph-node graph-node--a">Organization</div>
        <div className="graph-node graph-node--b">Service</div>
        <div className="graph-node graph-node--c">Author</div>
        <div className="graph-node graph-node--d">Evidence</div>
        <div className="graph-line graph-line--1" />
        <div className="graph-line graph-line--2" />
        <div className="graph-line graph-line--3" />
        <div className="graph-status">Consistent relationship</div>
      </div>
    );
  }

  return (
    <div className="service-visual service-visual--authority" aria-hidden="true">
      <span className="service-visual__big">04</span>
      <div className="evidence-ledger">
        <div><span>Owner</span><strong>Named expert</strong></div>
        <div><span>Date</span><strong>Current</strong></div>
        <div><span>Method</span><strong>Documented</strong></div>
        <div><span>Source</span><strong>Traceable</strong></div>
      </div>
      <div className="authority-status">[W2G] Evidence-ready</div>
    </div>
  );
}

function ServiceSection({ service, position }: { service: Service; position: number }) {
  return (
    <section
      className={`service service--${service.id}${position % 2 ? " service--reverse" : ""}`}
      id={service.id}
      aria-labelledby={`${service.id}-title`}
    >
      <div className="service__inner page-grid">
        <div className="service__content">
          <SectionLabel index={service.index}>{service.label}</SectionLabel>
          <h2 id={`${service.id}-title`}>{service.title}</h2>
          <p className="service__body">{service.body}</p>
          {service.deliverable ? (
            <p className="service__deliverable">
              <span>Deliverable</span>
              {service.deliverable}
            </p>
          ) : null}
          <LinkAction href="#contact">{service.action}</LinkAction>
        </div>

        <ServiceVisual service={service} />

        <div className="service__capabilities">
          <p>Selected capabilities</p>
          <ul>
            {service.capabilities.map((capability, index) => (
              <li key={capability}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <div className="services" aria-label="Web2Go services">
      <section className="services__intro page-grid" aria-labelledby="services-title">
        <SectionLabel>Four connected capabilities</SectionLabel>
        <h2 id="services-title">
          One source system.
          <br /> Four ways to make it clearer.
        </h2>
      </section>
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} position={index} />
      ))}
    </div>
  );
}
