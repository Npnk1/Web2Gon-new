import Image from "next/image";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__landscape" aria-hidden="true">
        <div className="hero__landscape-media">
          <Image
            className="hero__landscape-image"
            src="/images/web2go-topographic-hero.png"
            alt=""
            width={3840}
            height={1800}
            priority
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            unoptimized
          />
        </div>
      </div>

      <div className="hero__grid page-grid">
        <div className="hero__title-wrap">
          <h1
            className="hero__title"
            id="hero-title"
            aria-label="Be the answer"
          >
            <span className="hero__title-line">
              <span className="hero__title-word">Be</span>
            </span>
            <span className="hero__title-line">
              <span className="hero__title-word">the</span>
            </span>
            <span className="hero__title-line">
              <span className="hero__title-word">answer</span>
            </span>
          </h1>
        </div>

        <div className="hero__support">
          <p>
            We build and optimize websites so AI systems can understand, trust
            and cite your business.
          </p>
          <a className="hero__link" href="#information-landscape">
            AI Visibility Solutions
          </a>
        </div>
      </div>
    </section>
  );
}
