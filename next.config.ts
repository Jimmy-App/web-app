import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // Next 16: React Compiler support.
  distDir: process.env.NEXT_DIST_DIR ?? ".next", // Separate dev/build output dirs via scripts.
  logging: {
    fetches: { fullUrl: true },
    incomingRequests: true,
  },
  experimental: {
    viewTransition: true, // React 19 view transitions.
    cacheComponents: true, // Enable "use cache" directive for Cache Components.
  },
};

export default nextConfig;
