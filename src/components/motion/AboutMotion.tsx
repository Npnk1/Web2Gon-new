"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import { registerGsap } from "@/lib/gsap";

type AboutMotionProps = {
  children: ReactNode;
};

export function AboutMotion({ children }: AboutMotionProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;

    const initialize = async () => {
      const scope = scopeRef.current;

      if (!scope) return;

      const [runtime] = await Promise.all([registerGsap(), document.fonts.ready]);

      if (cancelled || !scopeRef.current || !runtime) return;

      const { gsap } = runtime;
      const context = gsap.context(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return;
        }

        const section = scope.querySelector<HTMLElement>(
          "[data-about-section]",
        );
        const header = scope.querySelector<HTMLElement>("[data-about-header]");
        const headingLines = Array.from(
          scope.querySelectorAll<HTMLElement>("[data-about-heading-line]"),
        );
        const images = Array.from(
          scope.querySelectorAll<HTMLElement>("[data-about-image]"),
        );
        const copy = scope.querySelector<HTMLElement>("[data-about-copy]");
        const principles = Array.from(
          scope.querySelectorAll<HTMLElement>("[data-about-principle]"),
        );

        if (!section || !header || !copy) return;

        const animatedElements = [
          header,
          ...headingLines,
          ...images,
          copy,
          ...principles,
        ];
        let timeline: ReturnType<typeof gsap.timeline> | undefined;
        let played = false;

        gsap.set(header, { autoAlpha: 0, y: 8 });
        gsap.set(headingLines, { autoAlpha: 0, y: 28 });
        gsap.set(images, { autoAlpha: 0, y: 18 });
        gsap.set([copy, ...principles], { autoAlpha: 0, y: 14 });

        const play = () => {
          if (played) return;
          played = true;

          timeline = gsap
            .timeline({
              defaults: { ease: "power3.out" },
              onComplete: () => {
                gsap.set(animatedElements, {
                  clearProps: "opacity,visibility,transform",
                });
              },
            })
            .to(header, { autoAlpha: 1, y: 0, duration: 0.22 })
            .to(
              headingLines,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.42,
                stagger: 0.07,
              },
              0.1,
            )
            .to(
              images,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.38,
                stagger: 0.075,
              },
              0.36,
            )
            .to(copy, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.77)
            .to(
              principles,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.32,
                stagger: 0.045,
              },
              0.83,
            );
        };

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry?.isIntersecting) return;
            play();
            observer.disconnect();
          },
          { threshold: [0, 0.12, 0.24] },
        );

        observer.observe(section);

        if (section.getBoundingClientRect().top <= window.innerHeight * 0.88) {
          play();
          observer.disconnect();
        }

        return () => {
          observer.disconnect();
          timeline?.kill();
          gsap.set(animatedElements, {
            clearProps: "opacity,visibility,transform",
          });
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
    <div className="about-motion" ref={scopeRef}>
      {children}
    </div>
  );
}
