import { ImageResponse } from "next/og";

import { SITE_NAME } from "@/lib/site";

export const alt = "Web2Go — Be the answer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time rather than shipped as a binary: the card is pure
 * type on the site's paper background, so there is no artwork to maintain.
 * Uses system-stack fonts -- next/og cannot reach the next/font files, and
 * loading a WOFF2 here would add a build-time fetch for one image.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8f5ee",
          color: "#151619",
          padding: "72px 80px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 24,
            letterSpacing: "0.3em",
            fontWeight: 600,
          }}
        >
          {SITE_NAME.toUpperCase()}
          <div style={{ width: 10, height: 10, background: "#174bff" }} />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 148,
            fontWeight: 600,
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          Be the answer
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 27,
            lineHeight: 1.4,
            color: "#5b6068",
            maxWidth: 900,
          }}
        >
          AI-ready websites and visibility systems — so AI can understand,
          trust and cite your business.
        </div>
      </div>
    ),
    size,
  );
}
