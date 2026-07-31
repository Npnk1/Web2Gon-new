import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback, per docs/PERFORMANCE.md.
    formats: ["image/avif", "image/webp"],
    // Next 16 only honours quality values listed here; 75 stays for defaults.
    qualities: [60, 75],
  },
};

export default nextConfig;
