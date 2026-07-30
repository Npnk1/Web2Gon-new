"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

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
  search: [...searchNodes.map(() => emptyPath), emptyPath, emptyPath],
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

function horizontalRoute(start: Point, end: Point) {
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} H ${end.x.toFixed(2)}`;
}

function verticalRoute(x: number, top: number, bottom: number) {
  return `M ${x.toFixed(2)} ${top.toFixed(2)} V ${bottom.toFixed(2)}`;
}

function searchToSourceRoute(
  searchBusX: number,
  sourceBusX: number,
  bridgeY: number,
  sourceBusTop: number,
  sourceBusBottom: number,
) {
  return [
    `M ${sourceBusX.toFixed(2)} ${sourceBusTop.toFixed(2)}`,
    `V ${sourceBusBottom.toFixed(2)}`,
    `M ${searchBusX.toFixed(2)} ${bridgeY.toFixed(2)}`,
    `H ${sourceBusX.toFixed(2)}`,
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

function AiSystemIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg
        className="ai-system-mark ai-system-mark--chatgpt"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729Zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944Zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464ZM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872Zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667Zm2.0107-3.0231-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66ZM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813Zm1.0976-2.3654 2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        className="ai-system-mark ai-system-mark--gemini"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
      </svg>
    );
  }

  return (
    <svg
      className="ai-system-mark ai-system-mark--perplexity"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896Zm-3.4657-4.531v4.531h-5.355l5.355-4.531Zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262ZM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576Zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993Zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588Zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087Z" />
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
            data-to={`search-${index}-input`}
          />
        ))}
      </g>

      <g className="journey-paths journey-paths--search">
        <path
          d={geometry.search[searchNodes.length]}
          fill="none"
          data-animated-path
          data-from="search-bus-top"
          data-to="search-bus-bottom"
        />
        <path
          d={geometry.search[searchNodes.length + 1]}
          fill="none"
          data-animated-path
          data-from="search-bus"
          data-to="source-bus-bottom"
        />
        {geometry.search.slice(0, searchNodes.length).map((path, index) => (
          <path
            key={`search-bus-${searchNodes[index]}`}
            d={path}
            fill="none"
            data-animated-path
            data-from="search-bus"
            data-to={`search-${index}-output`}
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
            data-from="source-bus"
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
        left: readAnchor(`search-${index}-input`, "left"),
        right: readAnchor(`search-${index}-output`, "right"),
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
      const searchSourceGap = Math.max(
        0,
        sourceLeftEdge - searchRightEdge,
      );
      const busInset = Math.max(
        2,
        Math.min(12, searchSourceGap * 0.25),
      );
      const searchBusX = searchRightEdge + busInset;
      const sourceBusX = sourceLeftEdge - busInset;
      const searchBusTop = Math.min(
        ...safeSearches.map((node) => node.right.y),
      );
      const searchBusBottom = Math.max(
        ...safeSearches.map((node) => node.right.y),
      );
      const sourceBusTop = Math.min(
        ...safeSources.map((node) => node.left.y),
      );
      const sourceBusBottom = Math.max(
        ...safeSources.map((node) => node.left.y),
      );
      const bridgeY =
        (safeSearches[Math.floor(safeSearches.length / 2)].right.y +
          safeSources[Math.floor(safeSources.length / 2)].left.y) /
        2;
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
            horizontalRoute(
              { x: searchBusX, y: search.right.y },
              search.right,
            ),
          ),
          verticalRoute(searchBusX, searchBusTop, searchBusBottom),
          searchToSourceRoute(
            searchBusX,
            sourceBusX,
            bridgeY,
            sourceBusTop,
            sourceBusBottom,
          ),
        ],
        fragmented: safeSources.map((source) =>
          horizontalRoute(
            { x: sourceBusX, y: source.left.y },
            source.left,
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
      <h2 className="sr-only" id="landscape-title">
        Information landscape
      </h2>

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
                    <li key={node}>
                      <span
                        aria-hidden="true"
                        data-connection-anchor={`search-${index}-input`}
                      >
                        <AiSystemIcon index={index} />
                      </span>
                      <strong
                        data-connection-anchor={`search-${index}-output`}
                      >
                        {node}
                      </strong>
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
                  <span className="web2go-transform__flow">
                    {Array.from({ length: 7 }, (_, index) => (
                      <i key={index} />
                    ))}
                  </span>
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

          <div className="journey-progress" aria-hidden="true">
            <span className="journey-progress__line" />
            <span className="journey-progress__label journey-progress__label--input">
              Input
            </span>
            <span className="journey-progress__label journey-progress__label--transform">
              Transformation
            </span>
            <span className="journey-progress__label journey-progress__label--output">
              Verified output
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
