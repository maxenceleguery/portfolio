import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  output: 'export',
  turbopack: {
    // runtime-safe copy of the SDK, see scripts/vendor-cutforge.mjs
    resolveAlias: { "@cutforge/editor": "./vendor/cutforge/cutforge.js" },
  },
};

export default nextConfig;
