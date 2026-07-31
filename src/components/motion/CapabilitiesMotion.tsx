"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import { registerGsap } from "@/lib/gsap";

type CapabilitiesMotionProps = {
  children: ReactNode;
};

/* Breakpoints mirror capabilities.css: pinning starts above 48rem so that 768px
   itself stays unpinned, matching the rest of the site. */
const desktopQuery =
  "(min-width: 48.0625rem) and (prefers-reduced-motion: no-preference)";
const mobileQuery =
  "(max-width: 48rem) and (prefers-reduced-motion: no-preference)";

export function CapabilitiesMotion({ children }: CapabilitiesMotionProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;

    const initialize = async () => {
      const scope = scopeRef.current;

      if (!scope) {
        return;
      }

      const [runtime] = await Promise.all([
        registerGsap(),
        document.fonts.ready,
      ]);

      if (cancelled || !scopeRef.current || !runtime) {
        return;
      }

      const { gsap, ScrollTrigger } = runtime;

      const context = gsap.context(() => {
        const section = scope.querySelector<HTMLElement>("[data-capabilities]");
        const pin = scope.querySelector<HTMLElement>(
          "[data-capabilities-pin]",
        );
        const stage = scope.querySelector<HTMLElement>(
          "[data-capabilities-stage]",
        );
        const band = scope.querySelector<HTMLElement>(
          "[data-capabilities-band]",
        );
        const foreground = scope.querySelector<HTMLElement>(
          "[data-capabilities-foreground]",
        );
        const rows = Array.from(
          scope.querySelectorAll<HTMLElement>("[data-capability-row]"),
        );
        const foregroundRows = Array.from(
          scope.querySelectorAll<HTMLElement>(
            "[data-capability-foreground-row]",
          ),
        );

        if (
          !section ||
          !pin ||
          !stage ||
          !band ||
          !foreground ||
          rows.length !== 4 ||
          foregroundRows.length !== rows.length
        ) {
          return;
        }

        const media = gsap.matchMedia();

        const resetRows = () => {
          [...rows, ...foregroundRows].forEach((row, index) => {
            const rowIndex = index % rows.length;

            row.classList.toggle("is-active", rowIndex === 0);

            const details =
              row.querySelector<HTMLElement>(".capability-row__details");

            if (details) {
              gsap.set(details, { clearProps: "opacity,transform" });
            }
          });

          gsap.set(band, { clearProps: "height,transform" });
          gsap.set(foreground, { clearProps: "clipPath" });
          section.style.removeProperty("--capabilities-header-offset");
        };

        media.add(desktopQuery, () => {
          let activeIndex = 0;
          let rowOffsets = rows.map(() => 0);
          let rowHeights = rows.map(() => 0);
          let stageHeight = 0;
          let resizeFrame = 0;
          let refreshFrame = 0;

          const setActiveRow = (index: number, animate = true) => {
            if (index === activeIndex && animate) {
              return;
            }

            activeIndex = index;

            rows.forEach((row, rowIndex) => {
              const isActive = rowIndex === index;
              row.classList.toggle("is-active", isActive);
            });

            foregroundRows.forEach((row, rowIndex) => {
              const isActive = rowIndex === index;
              const details =
                row.querySelector<HTMLElement>(".capability-row__details");

              row.classList.toggle("is-active", isActive);

              if (!details) {
                return;
              }

              if (animate) {
                gsap.to(details, {
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 10,
                  duration: 0.24,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              } else {
                gsap.set(details, {
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 10,
                });
              }
            });
          };

          const measure = () => {
            const firstOffset = rows[0].offsetTop;
            const header =
              document.querySelector<HTMLElement>(".site-header");
            const headerHeight = header?.getBoundingClientRect().height ?? 0;

            rowOffsets = rows.map((row) => row.offsetTop - firstOffset);
            rowHeights = rows.map(
              (row) => row.getBoundingClientRect().height,
            );
            stageHeight = stage.getBoundingClientRect().height;
            section.style.setProperty(
              "--capabilities-header-offset",
              `${Math.round(headerHeight)}px`,
            );

            gsap.set(band, {
              y: rowOffsets[activeIndex],
              height: rowHeights[activeIndex],
            });
            gsap.set(foreground, {
              clipPath: `inset(${rowOffsets[activeIndex]}px 0px ${Math.max(
                0,
                stageHeight -
                  rowOffsets[activeIndex] -
                  rowHeights[activeIndex],
              )}px 0px)`,
            });
          };

          setActiveRow(0, false);
          measure();

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: pin,
              start: () =>
                `top top+=${Math.round(
                  document
                    .querySelector<HTMLElement>(".site-header")
                    ?.getBoundingClientRect().height ?? 0,
                )}`,
              end: () => `+=${Math.round(window.innerHeight * 1.7)}`,
              pin,
              pinSpacing: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (
                self: import("gsap/ScrollTrigger").ScrollTrigger,
              ) => {
                const nextIndex = Math.min(
                  rows.length - 1,
                  Math.round(self.progress * (rows.length - 1)),
                );

                setActiveRow(nextIndex);
              },
            },
          });

          rows.slice(1).forEach((_, index) => {
            const targetIndex = index + 1;

            timeline.to(
              band,
              {
                y: () => rowOffsets[targetIndex],
                height: () => rowHeights[targetIndex],
                duration: 1,
              },
              index,
            );
            timeline.to(
              foreground,
              {
                clipPath: () =>
                  `inset(${rowOffsets[targetIndex]}px 0px ${Math.max(
                    0,
                    stageHeight -
                      rowOffsets[targetIndex] -
                      rowHeights[targetIndex],
                  )}px 0px)`,
                duration: 1,
              },
              index,
            );
          });

          const scheduleRefresh = () => {
            cancelAnimationFrame(resizeFrame);
            cancelAnimationFrame(refreshFrame);

            resizeFrame = requestAnimationFrame(() => {
              measure();
              refreshFrame = requestAnimationFrame(() => {
                ScrollTrigger.refresh();
              });
            });
          };

          const resizeObserver = new ResizeObserver(scheduleRefresh);
          resizeObserver.observe(stage);
          resizeObserver.observe(pin);
          // ScrollTrigger writes an inline width onto the pin, so observing it
          // is not enough to notice a viewport change. Watch the window too.
          window.addEventListener("resize", scheduleRefresh);
          window.addEventListener("orientationchange", scheduleRefresh);
          ScrollTrigger.addEventListener("refreshInit", measure);

          refreshFrame = requestAnimationFrame(() => {
            measure();
            ScrollTrigger.refresh();
          });

          return () => {
            cancelAnimationFrame(resizeFrame);
            cancelAnimationFrame(refreshFrame);
            resizeObserver.disconnect();
            window.removeEventListener("resize", scheduleRefresh);
            window.removeEventListener("orientationchange", scheduleRefresh);
            ScrollTrigger.removeEventListener("refreshInit", measure);
            timeline.scrollTrigger?.kill();
            timeline.kill();
            resetRows();
          };
        });

        media.add(mobileQuery, () => {
          let activeIndex = 0;

          const setActiveRow = (index: number) => {
            if (index === activeIndex) {
              return;
            }

            activeIndex = index;
            rows.forEach((row, rowIndex) => {
              row.classList.toggle("is-active", rowIndex === index);
            });
          };

          const updateFromViewport = () => {
            const targetY = window.innerHeight * 0.46;
            let closestIndex = 0;
            let closestDistance = Number.POSITIVE_INFINITY;

            rows.forEach((row, index) => {
              const rect = row.getBoundingClientRect();
              const distance = Math.abs(
                rect.top + rect.height / 2 - targetY,
              );

              if (
                rect.bottom > window.innerHeight * 0.16 &&
                rect.top < window.innerHeight * 0.84 &&
                distance < closestDistance
              ) {
                closestDistance = distance;
                closestIndex = index;
              }
            });

            setActiveRow(closestIndex);
          };

          const observer = new IntersectionObserver(updateFromViewport, {
            rootMargin: "-16% 0px -16% 0px",
            threshold: [0, 0.25, 0.5, 0.75, 1],
          });

          rows.forEach((row) => observer.observe(row));
          updateFromViewport();

          return () => {
            observer.disconnect();
            resetRows();
          };
        });

        media.add("(prefers-reduced-motion: reduce)", () => {
          [...rows, ...foregroundRows].forEach((row) =>
            row.classList.remove("is-active"),
          );
          gsap.set(band, { clearProps: "height,transform" });
          gsap.set(foreground, { clearProps: "clipPath" });

          return resetRows;
        });

        return () => media.revert();
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
    <div className="capabilities-motion" ref={scopeRef}>
      {children}
    </div>
  );
}
