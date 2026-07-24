type GsapRuntime = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let runtimePromise: Promise<GsapRuntime> | null = null;

/**
 * Load and register GSAP only in the browser. Future motion components must
 * call this inside an effect and clean their gsap.context() on unmount.
 */
export function registerGsap(): Promise<GsapRuntime | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  runtimePromise ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]).then(([gsapModule, scrollTriggerModule]) => {
    const { gsap } = gsapModule;
    const { ScrollTrigger } = scrollTriggerModule;

    gsap.registerPlugin(ScrollTrigger);

    return { gsap, ScrollTrigger };
  });

  return runtimePromise;
}
