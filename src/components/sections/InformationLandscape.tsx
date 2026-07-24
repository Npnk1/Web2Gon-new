"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const searchNodes = ["ChatGPT", "Gemini", "Perplexity"] as const;
const sourceNodes = ["Website", "Reviews", "PDF", "News", "Schema"] as const;
const outputNodes = ["Structure", "Clarify", "Verify", "Enrich", "Align"] as const;
const emptyPath = "M 0 0";

type Point = {
  x: number;
  y: number;
};

type JourneyGeometry = {
  width: number;
  height: number;
  ready: boolean;
  question: string[];
  search: string[];
  fragmented: string[];
  inbound: string[];
  ordered: string[];
  answer: string[];
  junction: Point;
};

const emptyGeometry: JourneyGeometry = {
  width: 1,
  height: 1,
  ready: false,
  question: searchNodes.map(() => emptyPath),
  search: [...searchNodes.map(() => emptyPath), emptyPath],
  fragmented: sourceNodes.map(() => emptyPath),
  inbound: sourceNodes.map(() => emptyPath),
  ordered: outputNodes.map(() => emptyPath),
  answer: [...outputNodes.map(() => emptyPath), emptyPath],
  junction: { x: 0, y: 0 },
};

function horizontalCurve(start: Point, end: Point, tension = 0.44) {
  const distance = Math.max(24, Math.abs(end.x - start.x) * tension);
  const direction = end.x >= start.x ? 1 : -1;

  return [
    `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `C ${(start.x + distance * direction).toFixed(2)} ${start.y.toFixed(2)}`,
    `${(end.x - distance * direction).toFixed(2)} ${end.y.toFixed(2)}`,
    `${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
  ].join(" ");
}

function PersonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <circle cx="16" cy="10" r="5" />
      <path d="M7 27c0-5 3.7-8 9-8s9 3 9 8" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="m14.5 14.5 5 5" />
    </svg>
  );
}

function SourceIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect x="3.5" y="4" width="17" height="12" rx="1" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M6 3.5h8l4 4V21H6zM14 3.5V8h4M9 12h6M9 16h6" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect x="3.5" y="5" width="17" height="14" rx="1" />
        <path d="M7 8h4v4H7zM13.5 8H18M13.5 11H18M7 15h11" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m8 6-5 6 5 6M16 6l5 6-5 6M14 4l-4 16" />
    </svg>
  );
}

function getAnimatedTranslation(
  element: HTMLElement,
  container: HTMLElement,
) {
  let current: HTMLElement | null = element;
  let x = 0;
  let y = 0;

  while (current && current !== container) {
    const transform = window.getComputedStyle(current).transform;

    if (transform && transform !== "none") {
      try {
        const matrix = new DOMMatrixReadOnly(transform);
        x += matrix.m41;
        y += matrix.m42;
      } catch {
        // A transient invalid matrix should not prevent the next scheduled measure.
      }
    }

    current = current.parentElement;
  }

  return { x, y };
}

function ConnectionLayer({
  geometry,
  svgRef,
}: {
  geometry: JourneyGeometry;
  svgRef: RefObject<SVGSVGElement | null>;
}) {
  return (
    <svg
      ref={svgRef}
      className="journey-connections"
      aria-hidden="true"
      data-geometry-ready={geometry.ready ? "true" : "false"}
      fill="none"
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      preserveAspectRatio="none"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <marker
          id="journey-arrow"
          markerHeight="8"
          markerWidth="8"
          orient="auto"
          refX="7"
          refY="4"
          viewBox="0 0 8 8"
        >
          <path
            className="journey-arrowhead"
            d="M0 0 8 4 0 8Z"
            fill="var(--color-cobalt)"
            stroke="none"
          />
        </marker>
      </defs>

      <g className="journey-paths journey-paths--question">
        {geometry.question.map((path, index) => (
          <path
            key={`question-search-${searchNodes[index]}`}
            d={path}
            fill="none"
            data-animated-path
            data-from="customer-question"
            data-to={`search-${index}`}
          />
        ))}
      </g>

      <g className="journey-paths journey-paths--search">
        {geometry.search.map((path, index) => (
          <path
            key={
              index < searchNodes.length
                ? `search-bus-${searchNodes[index]}`
                : "search-bus-spine"
            }
            d={path}
            fill="none"
            data-animated-path
            data-from={
              index < searchNodes.length
                ? `search-${index}`
                : "search-bus-top"
            }
            data-to={
              index < searchNodes.length
                ? "search-bus"
                : "search-bus-bottom"
            }
          />
        ))}
      </g>

      <g className="journey-paths journey-paths--fragmented">
        {geometry.fragmented.map((path, index) => (
          <path
            key={`search-source-${sourceNodes[index]}`}
            d={path}
            fill="none"
            data-animated-path
            data-from="search-bus"
            data-to={`source-${index}`}
          />
        ))}
      </g>

      <g className="journey-paths journey-paths--inbound">
        {geometry.inbound.map((path, index) => (
          <path
            key={`source-transform-${sourceNodes[index]}`}
            d={path}
            fill="none"
            data-animated-path
            data-from={`source-${index}`}
            data-to={`transform-in-${index}`}
          />
        ))}
      </g>

      <g className="journey-paths journey-paths--ordered">
        {geometry.ordered.map((path, index) => (
          <path
            key={`transform-output-${outputNodes[index]}`}
            d={path}
            fill="none"
            data-animated-path
            data-from={`transform-out-${index}`}
            data-to={`output-${index}`}
          />
        ))}
      </g>

      <g className="journey-paths journey-paths--answer">
        {geometry.answer.slice(0, outputNodes.length).map((path, index) => (
          <path
            key={`output-junction-${outputNodes[index]}`}
            d={path}
            fill="none"
            data-animated-path
            data-from={`output-${index}`}
            data-to="answer-junction"
          />
        ))}
        <path
          d={geometry.answer[geometry.answer.length - 1]}
          fill="none"
          data-animated-path
          data-from="answer-junction"
          data-to="answer-input"
          markerEnd="url(#journey-arrow)"
        />
        <circle
          className="journey-junction"
          cx={geometry.junction.x}
          cy={geometry.junction.y}
          r="3"
        />
      </g>
    </svg>
  );
}

export function InformationLandscape() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const geometrySignatureRef = useRef("");
  const [geometry, setGeometry] = useState<JourneyGeometry>(emptyGeometry);

  useLayoutEffect(() => {
    const container = journeyRef.current;
    if (!container) return;

    const stage = container.closest<HTMLElement>(
      ".information-landscape__stage",
    );
    const header = document.querySelector<HTMLElement>(".site-header");
    const desktopQuery = window.matchMedia("(min-width: 1025px)");
    let animationFrame = 0;

    const readAnchor = (
      name: string,
      side: "left" | "right" | "center",
    ): Point | null => {
      const element = container.querySelector<HTMLElement>(
        `[data-connection-anchor="${name}"]`,
      );
      if (!element) return null;

      const containerRect = container.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      const translation = getAnimatedTranslation(element, container);
      const left = rect.left - containerRect.left - translation.x;
      const top = rect.top - containerRect.top - translation.y;

      return {
        x:
          side === "left"
            ? left
            : side === "right"
              ? left + rect.width
              : left + rect.width / 2,
        y: top + rect.height / 2,
      };
    };

    const measure = () => {
      animationFrame = 0;

      if (stage && header) {
        stage.style.setProperty(
          "--landscape-header-height",
          `${header.getBoundingClientRect().height}px`,
        );
      }

      if (!desktopQuery.matches) {
        if (geometrySignatureRef.current !== "mobile") {
          geometrySignatureRef.current = "mobile";
          setGeometry(emptyGeometry);
        }
        return;
      }

      const question = readAnchor("customer-question", "right");
      const searches = searchNodes.map((_, index) => ({
        left: readAnchor(`search-${index}`, "left"),
        right: readAnchor(`search-${index}`, "right"),
      }));
      const sources = sourceNodes.map((_, index) => ({
        left: readAnchor(`source-${index}`, "left"),
        right: readAnchor(`source-${index}`, "right"),
      }));
      const transformInputs = sourceNodes.map((_, index) =>
        readAnchor(`transform-in-${index}`, "center"),
      );
      const transformOutputs = outputNodes.map((_, index) =>
        readAnchor(`transform-out-${index}`, "center"),
      );
      const outputs = outputNodes.map((_, index) => ({
        left: readAnchor(`output-${index}`, "left"),
        right: readAnchor(`output-${index}`, "right"),
      }));
      const answerInput = readAnchor("answer-input", "center");

      const requiredPoints = [
        question,
        answerInput,
        ...searches.flatMap((node) => [node.left, node.right]),
        ...sources.flatMap((node) => [node.left, node.right]),
        ...transformInputs,
        ...transformOutputs,
        ...outputs.flatMap((node) => [node.left, node.right]),
      ];

      if (requiredPoints.some((point) => !point)) return;

      const safeQuestion = question as Point;
      const safeAnswerInput = answerInput as Point;
      const safeSearches = searches as { left: Point; right: Point }[];
      const safeSources = sources as { left: Point; right: Point }[];
      const safeTransformInputs = transformInputs as Point[];
      const safeTransformOutputs = transformOutputs as Point[];
      const safeOutputs = outputs as { left: Point; right: Point }[];
      const searchRightEdge = Math.max(
        ...safeSearches.map((node) => node.right.x),
      );
      const sourceLeftEdge = Math.min(
        ...safeSources.map((node) => node.left.x),
      );
      const searchBusX =
        searchRightEdge +
        Math.max(20, (sourceLeftEdge - searchRightEdge) * 0.5);
      const searchBusTop = Math.min(
        ...safeSearches.map((node) => node.right.y),
        ...safeSources.map((node) => node.left.y),
      );
      const searchBusBottom = Math.max(
        ...safeSearches.map((node) => node.right.y),
        ...safeSources.map((node) => node.left.y),
      );
      const outputEdge = Math.max(...safeOutputs.map((node) => node.right.x));
      const availableJunctionGap = Math.max(
        16,
        safeAnswerInput.x - outputEdge,
      );
      const junction: Point = {
        x: Math.min(
          safeAnswerInput.x - 12,
          outputEdge + Math.max(14, availableJunctionGap * 0.58),
        ),
        y: safeAnswerInput.y,
      };

      const nextGeometry: JourneyGeometry = {
        width: Math.max(1, container.clientWidth),
        height: Math.max(1, container.clientHeight),
        ready: true,
        question: safeSearches.map((search) =>
          horizontalCurve(safeQuestion, search.left, 0.36),
        ),
        search: [
          ...safeSearches.map((search) =>
            horizontalCurve(
              search.right,
              { x: searchBusX, y: search.right.y },
              0.42,
            ),
          ),
          `M ${searchBusX.toFixed(2)} ${searchBusTop.toFixed(2)} L ${searchBusX.toFixed(2)} ${searchBusBottom.toFixed(2)}`,
        ],
        fragmented: safeSources.map((source) =>
          horizontalCurve(
            { x: searchBusX, y: source.left.y },
            source.left,
            0.42,
          ),
        ),
        inbound: safeSources.map((source, index) =>
          horizontalCurve(source.right, safeTransformInputs[index], 0.4),
        ),
        ordered: safeOutputs.map((output, index) =>
          horizontalCurve(safeTransformOutputs[index], output.left, 0.4),
        ),
        answer: [
          ...safeOutputs.map((output) =>
            horizontalCurve(output.right, junction, 0.44),
          ),
          horizontalCurve(junction, safeAnswerInput, 0.36),
        ],
        junction,
      };
      const signature = JSON.stringify(nextGeometry);

      if (signature !== geometrySignatureRef.current) {
        geometrySignatureRef.current = signature;
        setGeometry(nextGeometry);
      }
    };

    const scheduleMeasure = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(measure);
    };

    const observedElements = [
      container,
      ...(header ? [header] : []),
      ...container.querySelectorAll<HTMLElement>(
        "[data-connection-anchor]",
      ),
    ];
    const observer = new ResizeObserver(scheduleMeasure);
    observedElements.forEach((element) => observer.observe(element));
    desktopQuery.addEventListener("change", scheduleMeasure);
    window.addEventListener("resize", scheduleMeasure);
    void document.fonts.ready.then(scheduleMeasure);
    scheduleMeasure();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      observer.disconnect();
      desktopQuery.removeEventListener("change", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, []);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || !geometry.ready) return;

    svg
      .querySelectorAll<SVGPathElement>("[data-animated-path]")
      .forEach((path) => {
        const length = path.getTotalLength();
        path.dataset.pathLength = String(length);
        path.style.strokeDasharray = `${length} ${length}`;
        path.style.strokeDashoffset = "0";
      });

    window.dispatchEvent(new CustomEvent("web2go:landscape-geometry"));
  }, [geometry]);

  return (
    <section
      className="information-landscape"
      id="information-landscape"
      aria-labelledby="landscape-title"
    >
      <div className="information-landscape__intro">
        <div className="information-landscape__eyebrow page-grid">
          <SectionLabel>Information landscape / 01</SectionLabel>
        </div>

        <div className="information-landscape__heading page-grid">
          <h2
            id="landscape-title"
            aria-label="From fragmented information to a trusted answer."
          >
            <span className="landscape-word">From fragmented information</span>
            <span className="landscape-word">to a trusted answer.</span>
          </h2>
        </div>
      </div>

      <div className="information-landscape__stage">
        <div className="information-journey" ref={journeyRef}>
          <ConnectionLayer geometry={geometry} svgRef={svgRef} />

          <ol className="information-journey__stages">
            <li className="journey-stage journey-stage--question">
              <h3>
                <span>1.</span> Customer question
              </h3>
              <div className="journey-stage__body journey-question">
                <span className="journey-question__person" aria-hidden="true">
                  <PersonIcon />
                  <span className="journey-question__pulse" />
                </span>
                <p data-connection-anchor="customer-question">
                  Who is the best provider for this?
                </p>
              </div>
            </li>

            <li className="journey-stage journey-stage--search">
              <h3>
                <span>2.</span> AI searches online
              </h3>
              <div className="journey-stage__body">
                <ul className="journey-search-nodes">
                  {searchNodes.map((node, index) => (
                    <li
                      key={node}
                      data-connection-anchor={`search-${index}`}
                    >
                      <span aria-hidden="true">
                        <SearchIcon />
                      </span>
                      <strong>{node}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className="journey-stage journey-stage--sources">
              <h3>
                <span>3.</span> Before Web2Go
              </h3>
              <div className="journey-stage__body">
                <ul className="journey-source-nodes">
                  {sourceNodes.map((source, index) => (
                    <li
                      key={source}
                      data-connection-anchor={`source-${index}`}
                    >
                      <span aria-hidden="true">
                        <SourceIcon index={index} />
                      </span>
                      <strong>{source}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className="journey-stage journey-stage--transform">
              <h3>
                <span>4.</span> Web2Go transformation
              </h3>
              <div className="journey-stage__body">
                <div className="web2go-transform" aria-hidden="true">
                  <span className="web2go-transform__rail web2go-transform__rail--outer" />
                  <span className="web2go-transform__rail web2go-transform__rail--middle" />
                  <span className="web2go-transform__rail web2go-transform__rail--inner" />
                  <span className="web2go-transform__flow" />
                  {sourceNodes.map((source, index) => (
                    <span
                      className="web2go-transform__port web2go-transform__port--input"
                      data-connection-anchor={`transform-in-${index}`}
                      key={`input-${source}`}
                      style={
                        {
                          "--port-position": `${10 + index * 20}%`,
                        } as CSSProperties
                      }
                    />
                  ))}
                  {outputNodes.map((output, index) => (
                    <span
                      className="web2go-transform__port web2go-transform__port--output"
                      data-connection-anchor={`transform-out-${index}`}
                      key={`output-${output}`}
                      style={
                        {
                          "--port-position": `${10 + index * 20}%`,
                        } as CSSProperties
                      }
                    />
                  ))}
                  <strong>W</strong>
                </div>
                <p className="sr-only">
                  Web2Go turns fragmented information into ordered, verifiable
                  source paths.
                </p>
              </div>
            </li>

            <li className="journey-stage journey-stage--outputs">
              <h3>
                <span>5.</span> After Web2Go
              </h3>
              <div className="journey-stage__body">
                <ul className="journey-output-nodes">
                  {outputNodes.map((output, index) => (
                    <li
                      key={output}
                      data-connection-anchor={`output-${index}`}
                    >
                      <span aria-hidden="true">✓</span>
                      <strong>{output}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className="journey-stage journey-stage--answer">
              <h3>
                <span>6.</span> AI recommendation
              </h3>
              <div className="journey-stage__body">
                <blockquote className="journey-answer-card">
                  <span
                    className="journey-answer-card__input"
                    data-connection-anchor="answer-input"
                    aria-hidden="true"
                  />
                  <span
                    className="journey-answer-card__quote"
                    aria-hidden="true"
                  >
                    “
                  </span>
                  <p>
                    Web2Go is a European technology studio specialising in AI
                    visibility. We help ambitious businesses become easier for
                    AI to discover, understand and recommend.
                  </p>
                  <cite>[1] Verified source</cite>
                </blockquote>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
