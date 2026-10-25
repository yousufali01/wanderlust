import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: false,
  partialPrefetching: false,
  reactCompiler: true,
  images: {
    // Destination photos are user-supplied URLs from the API, so allow any
    // http(s) host. Tighten this to known image hosts before production.
    remotePatterns: [
      { protocol: "http", hostname: "**" },
      { protocol: "https", hostname: "**" },
    ],
    // The dev API stores image URLs on localhost (e.g. http://localhost:3000
    // or :8000), which Next blocks by default. Revisit before production.
    dangerouslyAllowLocalIP: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
