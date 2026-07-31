"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";

type InformationLandscapeMotionProps = {
  children: React.ReactNode;
};

export function InformationLandscapeMotion({
  children,
}: InformationLandscapeMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let cancelled = false;
    let teardown: (() => void) | undefined;
    let readinessCleanup: (() => void) | undefined;

    /**
     * The hero visual is hidden in CSS so the clip-path wipe can reveal it. If
     * GSAP never gets that far, reveal it directly rather than leaving the LCP
     * image invisible.
     */
    const revealHeroMedia = () => {
      rootRef.current
        ?.querySelectorAll<HTMLElement>(".hero__landscape-media")
        .forEach((media) => {
          media.style.visibility = "visible";
        });
    };

    void registerGsap().then(async (runtime) => {
      if (!runtime || cancelled || !rootRef.current) return;

      const desktopQuery = window.matchMedia("(min-width: 1025px)");
      const reducedMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      const landscapeIsReady = () => {
        const root = rootRef.current;
        const stage = root?.querySelector<HTMLElement>(
          ".information-landscape__stage",
        );
        const svg = root?.querySelector<SVGSVGElement>(
          ".journey-connections",
        );
        const paths = svg?.querySelectorAll<SVGPathElement>(
          "[data-animated-path]",
        );

        if (!stage || !svg || !paths?.length) return false;

        const stageRect = stage.getBoundingClientRect();
        return (
          stageRect.width > 0 &&
          stageRect.height > 0 &&
          svg.dataset.geometryReady === "true" &&
          Array.from(paths).every(
            (path) => Number(path.dataset.pathLength) > 0,
          )
        );
      };

      await document.fonts.ready;

      if (
        desktopQuery.matches &&
        !reducedMotionQuery.matches &&
        !landscapeIsReady()
      ) {
        await new Promise<void>((resolve) => {
          let settled = false;
          const root = rootRef.current;
          const stage = root?.querySelector<HTMLElement>(
            ".information-landscape__stage",
          );
          const svg = root?.querySelector<SVGSVGElement>(
            ".journey-connections",
          );
          const resizeObserver = new ResizeObserver(checkReadiness);
          const mutationObserver = new MutationObserver(checkReadiness);
          // Never block the timeline forever on geometry that will not settle
          // (background tab, stalled measurement). Proceed and let the section
          // catch up on the next refresh.
          const timeout = window.setTimeout(finish, 1500);

          function finish() {
            if (settled) return;
            settled = true;
            window.clearTimeout(timeout);
            window.removeEventListener(
              "web2go:landscape-geometry",
              checkReadiness,
            );
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            readinessCleanup = undefined;
            resolve();
          }

          function checkReadiness() {
            if (cancelled || landscapeIsReady()) finish();
          }

          window.addEventListener(
            "web2go:landscape-geometry",
            checkReadiness,
          );
          if (stage) resizeObserver.observe(stage);
          if (svg) {
            resizeObserver.observe(svg);
            mutationObserver.observe(svg, {
              attributes: true,
              attributeFilter: ["data-geometry-ready"],
              subtree: true,
            });
          }
          readinessCleanup = finish;
          checkReadiness();
        });
      }

      if (cancelled || !rootRef.current) return;

      const { gsap, ScrollTrigger } = runtime;
      const media = gsap.matchMedia();
      let refreshFrame = 0;
      const refreshLandscapeGeometry = () => {
        if (refreshFrame) cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          refreshFrame = 0;
          ScrollTrigger.refresh();
        });
      };
      const pathLength = (_index: number, target: SVGPathElement) =>
        Number(target.dataset.pathLength) || target.getTotalLength();

      window.addEventListener(
        "web2go:landscape-geometry",
        refreshLandscapeGeometry,
      );

      const context = gsap.context(() => {
        media.add(
          "(prefers-reduced-motion: no-preference)",
          () => {
            const intro = gsap.timeline({
              paused: true,
              defaults: { ease: "power3.out" },
            });

            intro
              .from(".hero__title-word", {
                yPercent: 112,
                duration: 0.78,
                stagger: 0.075,
              })
              .from(
                ".hero__landscape-media",
                {
                  clipPath: "inset(100% 0 0 0)",
                  duration: 1.1,
                  ease: "power2.inOut",
                },
                0.08,
              )
              .from(
                ".hero__support",
                {
                  autoAlpha: 0,
                  duration: 0.62,
                  y: 22,
                },
                0.48,
              );

            intro.pause(0);
            gsap.set(".hero__landscape-media", { visibility: "visible" });
            intro.play(0);

            return () => {
              gsap.set(
                [
                  ".hero__title-word",
                  ".hero__landscape-media",
                  ".hero__support",
                ],
                { clearProps: "all" },
              );
            };
          },
        );

        media.add(
          "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
          () => {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: ".hero",
                  start: "bottom bottom",
                  end: "bottom top",
                  scrub: 0.8,
                },
              })
              .to(".hero__title", { yPercent: -7, autoAlpha: 0.34 }, 0)
              .to(".hero__support", { y: -28, autoAlpha: 0.42 }, 0)
              .to(
                ".hero__landscape-media",
                { y: -30 },
                0,
              )
              .to(
                ".hero__landscape",
                { autoAlpha: 0.5 },
                0,
              );

            return () => {
              gsap.set(
                [
                  ".hero__title",
                  ".hero__support",
                  ".hero__landscape",
                ],
                { clearProps: "all" },
              );
              gsap.set(".hero__landscape-media", {
                clearProps: "transform",
              });
            };
          },
        );

        media.add(
          "(min-width: 1025px) and (prefers-reduced-motion: no-preference)",
          () => {
            const headerHeight = () =>
              document
                .querySelector<HTMLElement>(".site-header")
                ?.getBoundingClientRect().height ?? 0;
            const transition = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: ".information-landscape__stage",
                start: () => `top top+=${headerHeight()}`,
                end: () => `+=${window.innerHeight * 1.75}`,
                pin: ".information-landscape__stage",
                pinSpacing: true,
                scrub: 0.75,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                refreshPriority: 10,
              },
            });
            transition
              .from(
                ".journey-stage h3",
                {
                  autoAlpha: 0.2,
                  duration: 0.055,
                  stagger: 0.18,
                },
                0.04,
              )
              .from(
                ".journey-progress__line",
                {
                  scaleX: 0,
                  transformOrigin: "0 50%",
                  duration: 1.16,
                },
                0.08,
              )
              .from(
                ".journey-progress__label",
                {
                  y: 5,
                  autoAlpha: 0,
                  duration: 0.06,
                  stagger: 0.38,
                },
                0.09,
              )
              .from(
                ".journey-stage--question .journey-stage__body",
                {
                  y: 20,
                  autoAlpha: 0,
                  duration: 0.07,
                },
                0.08,
              )
              .fromTo(
                ".journey-question__pulse",
                { scale: 0.75, autoAlpha: 0.8 },
                { scale: 1.45, autoAlpha: 0, duration: 0.075 },
                0.14,
              )
              .from(
                ".journey-stage--search .journey-search-nodes li",
                {
                  x: -10,
                  autoAlpha: 0,
                  stagger: 0.018,
                  duration: 0.055,
                },
                0.18,
              )
              .from(
                ".journey-paths--question path",
                {
                  strokeDashoffset: pathLength,
                  autoAlpha: 0,
                  stagger: 0.012,
                  duration: 0.065,
                },
                0.29,
              )
              .from(
                ".journey-paths--search path",
                {
                  strokeDashoffset: pathLength,
                  autoAlpha: 0,
                  stagger: 0.012,
                  duration: 0.055,
                },
                0.4,
              )
              .from(
                ".journey-source-nodes li",
                {
                  x: (index) => [-12, 9, -5, 14, -8][index] ?? 0,
                  y: 12,
                  autoAlpha: 0,
                  stagger: 0.018,
                  duration: 0.055,
                },
                0.43,
              )
              .from(
                ".journey-paths--fragmented path",
                {
                  strokeDashoffset: pathLength,
                  autoAlpha: 0,
                  stagger: 0.012,
                  duration: 0.06,
                },
                0.57,
              )
              .from(
                ".web2go-transform__rail",
                {
                  scaleY: 0,
                  transformOrigin: "50% 50%",
                  stagger: 0.015,
                  duration: 0.1,
                },
                0.62,
              )
              .from(
                ".web2go-transform__flow",
                { scaleY: 0, transformOrigin: "50% 50%", duration: 0.09 },
                0.64,
              )
              .from(
                ".web2go-transform strong",
                {
                  scale: 0.76,
                  autoAlpha: 0,
                  duration: 0.06,
                  ease: "power3.out",
                },
                0.7,
              )
              .to(
                ".web2go-transform strong",
                {
                  scale: 1.07,
                  duration: 0.04,
                  ease: "power2.out",
                  yoyo: true,
                  repeat: 1,
                },
                0.76,
              )
              .from(
                ".journey-paths--inbound path",
                {
                  strokeDashoffset: pathLength,
                  autoAlpha: 0,
                  stagger: 0.012,
                  duration: 0.055,
                },
                0.84,
              )
              .from(
                ".journey-output-nodes li",
                {
                  x: -12,
                  autoAlpha: 0,
                  stagger: 0.018,
                  duration: 0.055,
                },
                0.85,
              )
              .from(
                ".journey-output-nodes li > span",
                {
                  scale: 0.2,
                  autoAlpha: 0,
                  stagger: 0.018,
                  duration: 0.05,
                  ease: "power3.out",
                },
                0.865,
              )
              .from(
                ".journey-paths--ordered path",
                {
                  strokeDashoffset: pathLength,
                  autoAlpha: 0,
                  stagger: 0.012,
                  duration: 0.055,
                },
                0.99,
              )
              .from(
                ".journey-answer-card",
                {
                  x: 22,
                  autoAlpha: 0,
                  duration: 0.075,
                  ease: "power3.out",
                },
                0.97,
              )
              .from(
                ".journey-answer-card cite",
                { y: 8, autoAlpha: 0, duration: 0.05 },
                1.01,
              )
              .from(
                ".journey-paths--answer path",
                {
                  strokeDashoffset: pathLength,
                  autoAlpha: 0,
                  stagger: 0.008,
                  duration: 0.055,
                },
                1.11,
              )
              .from(
                ".journey-junction",
                {
                  scale: 0,
                  autoAlpha: 0,
                  transformOrigin: "50% 50%",
                  duration: 0.035,
                },
                1.11,
              )
              .to(
                ".information-journey",
                {
                  opacity: 1,
                  duration: 0.24,
                },
                1.23,
              );

            return () => {
              gsap.set(
                [
                  ".journey-stage__body",
                  ".journey-stage h3",
                  ".journey-question__pulse",
                  ".journey-paths path",
                  ".journey-junction",
                  ".journey-progress__line",
                  ".journey-progress__label",
                  ".journey-search-nodes li",
                  ".journey-source-nodes li",
                  ".web2go-transform__rail",
                  ".web2go-transform__flow",
                  ".web2go-transform strong",
                  ".journey-output-nodes li",
                  ".journey-output-nodes li > span",
                  ".journey-answer-card",
                  ".journey-answer-card cite",
                ],
                { clearProps: "all" },
              );
            };
          },
        );

        media.add(
          "(max-width: 1024px) and (prefers-reduced-motion: no-preference)",
          () => {
            const entries = gsap.utils.toArray<HTMLElement>(".journey-stage");

            entries.forEach((entry) => {
              gsap.from(entry, {
                autoAlpha: 0,
                y: 30,
                duration: 0.65,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: entry,
                  start: "top 82%",
                  toggleActions: "play none none none",
                },
              });
            });

            return () => {
              gsap.set(entries, { clearProps: "all" });
            };
          },
        );
      }, rootRef);

      refreshLandscapeGeometry();
      teardown = () => {
        window.removeEventListener(
          "web2go:landscape-geometry",
          refreshLandscapeGeometry,
        );
        if (refreshFrame) cancelAnimationFrame(refreshFrame);
        media.revert();
        context.revert();
      };
    }).catch(() => {
      // GSAP failed to load or the setup threw. Content must stay visible.
      revealHeroMedia();
    });

    return () => {
      cancelled = true;
      readinessCleanup?.();
      teardown?.();
    };
  }, []);

  return (
    <div className="first-chapter" ref={rootRef}>
      {children}
    </div>
  );
}
