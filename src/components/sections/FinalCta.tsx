export function FinalCta() {
  return (
    <section
      className="final-cta"
      id="contact"
      aria-labelledby="final-cta-title"
    >
      <div className="completion-shell final-cta__inner">
        <h2 id="final-cta-title">
          The next answer could include your company.
        </h2>

        <div className="final-cta__details">
          <p>
            Let&apos;s make your business easier to discover, understand and
            recommend.
          </p>
          <div className="final-cta__actions">
            <span
              className="final-cta__primary"
              aria-disabled="true"
              title="Contact destination pending verification"
            >
              Start a conversation
              <span aria-hidden="true">&rarr;</span>
            </span>
            <a className="final-cta__secondary" href="#method">
              Explore our method
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
