import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VerificationMarker } from "@/components/ui/VerificationMarker";

export function ContactCta() {
  return (
    <section className="contact-cta" id="contact" aria-labelledby="contact-title">
      <Image
        className="contact-cta__image"
        src="/images/information-landscape.webp"
        alt=""
        fill
        sizes="100vw"
      />
      <div className="contact-cta__veil" aria-hidden="true" />
      <div className="contact-cta__inner page-grid">
        <SectionLabel>Start with the source</SectionLabel>
        <VerificationMarker>Cited</VerificationMarker>
        <h2 id="contact-title">
          Make your business easier to understand—and harder to overlook.
        </h2>
        <div className="contact-cta__copy">
          <p>
            Tell us what customers should understand about your business. We
            will help you identify what AI systems can see today and what the
            website needs to make clear next.
          </p>
          <div className="contact-cta__actions" aria-label="Contact status">
            <span className="contact-cta__pending">Request an AI visibility audit</span>
            <span>Contact route pending verification</span>
          </div>
        </div>
      </div>
    </section>
  );
}
