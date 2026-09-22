"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import { registerGsap } from "@/lib/gsap";

type CompletionMotionProps = {
  children: ReactNode;
};

export function CompletionMotion({ children }: CompletionMotionProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;

    const initialize = async () => {
      const scope = scopeRef.current;

      if (!scope) return;

      const [runtime] = await Promise.all([registerGsap(), document.fonts.ready]);

      if (cancelled || !scopeRef.current || !runtime) return;

      const { gsap, ScrollTrigger } = runtime;

      const context = gsap.context(() => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        if (reducedMotion) return;

        const demonstration = scope.querySelector<HTMLElement>(
          "[data-completion-demonstration]",
        );
        const q = (selector: string) =>
          Array.from(scope.querySelectorAll<HTMLElement>(selector));
        // /04 reveals in reading order: sources, then the lineage that connects
        // them, then the canonical record, then the answer.
        const demoSignals = q("[data-demo-signal]");
        const demoLineage = q("[data-demo-lineage]");
        const demoNodes = q("[data-demo-node]");
        const demoRecord = q("[data-demo-record]");
        const demoAnswer = q("[data-demo-answer]");
        const demoTargets = [
          ...demoSignals,
          ...demoLineage,
          ...demoNodes,
          ...demoRecord,
          ...demoAnswer,
        ];
        const method = scope.querySelector<HTMLElement>(
          "[data-completion-method]",
        );
        const methodHeading = method?.querySelector<HTMLElement>(
          ".method-section__heading h2",
        );
        const methodRoute = scope.querySelector<SVGPathElement>(
          "[data-method-route]",
        );
        const methodOrigin = method?.querySelector<SVGCircleElement>(
          ".method-route__origin",
        );
        const methodArrow = method?.querySelector<SVGPathElement>(
          ".method-route marker path",
        );
        const methodNodes = Array.from(
          scope.querySelectorAll<SVGGElement>("[data-method-node]"),
        );
        const methodMobileNodes = Array.from(
          scope.querySelectorAll<HTMLElement>(".method-step__mobile-node"),
        );
        const methodContents = Array.from(
          scope.querySelectorAll<HTMLElement>("[data-method-content]"),
        );
        const methodPanel = scope.querySelector<HTMLElement>(
          "[data-method-panel]",
        );
        const methodMeasureStep =
          scope.querySelector<HTMLElement>(".method-step--05");
        const methodIsMobile = window.matchMedia("(max-width: 48rem)").matches;
        const activeMethodNodes = methodIsMobile
          ? methodMobileNodes
          : methodNodes;
        const activeMethodPanel = methodIsMobile
          ? methodMeasureStep
          : methodPanel;

        let demonstrationPlayed = false;
        let demonstrationTimeline: ReturnType<typeof gsap.timeline> | undefined;
        let methodPlayed = false;
        let methodTimeline: ReturnType<typeof gsap.timeline> | undefined;
        let methodTrigger: ReturnType<typeof ScrollTrigger.create> | undefined;
        let refreshFrame = 0;

        const demonstrationObserver = new IntersectionObserver(
          ([entry]) => {
            if (!entry?.isIntersecting || demonstrationPlayed) return;

            demonstrationPlayed = true;
            demonstrationTimeline = gsap
              .timeline({
                defaults: { ease: "power3.out" },
                onComplete: () => {
                  gsap.set(demoTargets, {
                    clearProps: "opacity,visibility,transform",
                  });
                },
              })
              .fromTo(
                demoSignals,
                { autoAlpha: 0, y: 14 },
                { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.07 },
              )
              .fromTo(
                demoLineage,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.34, stagger: 0.05 },
                0.46,
              )
              .fromTo(
                demoNodes,
                { autoAlpha: 0, scale: 0.4 },
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.24,
                  stagger: 0.05,
                  transformOrigin: "50% 50%",
                },
                0.62,
              )
              .fromTo(
                demoRecord,
                { autoAlpha: 0, y: 16 },
                { autoAlpha: 1, y: 0, duration: 0.46 },
                0.58,
              )
              .fromTo(
                demoAnswer,
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, duration: 0.55 },
                0.96,
              );
            demonstrationObserver.disconnect();
          },
          { threshold: [0, 0.16, 0.32] },
        );

        if (
          method &&
          methodHeading &&
          methodRoute &&
          methodOrigin &&
          methodArrow &&
          activeMethodPanel &&
          activeMethodNodes.length === methodContents.length
        ) {
          const routeLength = methodRoute.getTotalLength();

          gsap.set(methodHeading, { autoAlpha: 0, y: 16 });
          gsap.set(methodRoute, {
            strokeDasharray: routeLength,
            strokeDashoffset: routeLength,
          });
          gsap.set(methodOrigin, { autoAlpha: 0 });
          gsap.set(methodArrow, { autoAlpha: 0 });
          gsap.set(activeMethodNodes, {
            autoAlpha: 0,
            scale: 0.92,
            transformOrigin: "center center",
          });
          gsap.set(methodContents, { autoAlpha: 0, y: 16 });
          gsap.set(activeMethodPanel, {
            clipPath: "inset(0 0 0 100%)",
          });

          const playMethod = () => {
            if (methodPlayed) return;
            methodPlayed = true;
            methodTimeline = gsap
              .timeline({
                onComplete: () => {
                  gsap.set(
                    [
                      methodHeading,
                      methodRoute,
                      methodOrigin,
                      methodArrow,
                      ...activeMethodNodes,
                      ...methodContents,
                      activeMethodPanel,
                    ],
                    {
                      clearProps:
                        "opacity,visibility,transform,clipPath,strokeDasharray,strokeDashoffset",
                    },
                  );
                },
              })
              .to(methodHeading, {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                ease: "power2.out",
              })
              .to(
                methodOrigin,
                {
                  autoAlpha: 1,
                  duration: 0.18,
                  ease: "power2.out",
                },
                0.16,
              )
              .to(
                methodRoute,
                {
                  strokeDashoffset: routeLength * 0.13,
                  duration: 1.95,
                  ease: "power2.inOut",
                },
                0.18,
              );

            const stageProgress = [0.1, 0.3, 0.5, 0.7, 0.87];
            const routeStart = 0.18;
            const routeDuration = 1.95;

            stageProgress.forEach((progress, index) => {
              const stageTime =
                routeStart + routeDuration * (progress / 0.87);

              methodTimeline
                ?.to(
                  activeMethodNodes[index],
                  {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.28,
                    ease: "power2.out",
                  },
                  stageTime,
                )
                .to(
                  methodContents[index],
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                  },
                  stageTime + 0.06,
                );
            });

            methodTimeline
              .to(
                activeMethodPanel,
                {
                  clipPath: "inset(0 0 0 0%)",
                  duration: 0.48,
                  ease: "power3.out",
                },
                1.98,
              )
              .to(
                methodRoute,
                {
                  strokeDashoffset: 0,
                  duration: 0.38,
                  ease: "power2.inOut",
                },
                2.27,
              )
              .to(
                methodArrow,
                {
                  autoAlpha: 1,
                  duration: 0.18,
                  ease: "power2.out",
                },
                2.52,
              );
          };

          methodTrigger = ScrollTrigger.create({
            trigger: method,
            start: "top 75%",
            once: true,
            onEnter: playMethod,
          });

          if (method.getBoundingClientRect().top <= window.innerHeight * 0.75) {
            playMethod();
          }

          refreshFrame = window.requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        }

        if (demonstration) demonstrationObserver.observe(demonstration);

        return () => {
          demonstrationObserver.disconnect();
          if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
          methodTrigger?.kill();
          methodTimeline?.kill();
          demonstrationTimeline?.kill();
          gsap.set(demoTargets, { clearProps: "opacity,visibility,transform" });
          gsap.set(
            [
              methodHeading,
              methodRoute,
              methodOrigin,
              methodArrow,
              ...activeMethodNodes,
              ...methodContents,
              activeMethodPanel,
            ].filter(Boolean),
            {
              clearProps:
                "opacity,visibility,transform,clipPath,strokeDasharray,strokeDashoffset",
            },
          );
        };
      }, scope);

      dispose = () => context.revert();
    };

    void initialize();

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div className="completion-motion" ref={scopeRef}>
      {children}
    </div>
  );
}
