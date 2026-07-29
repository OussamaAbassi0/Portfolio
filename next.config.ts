import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Un package-lock.json traîne dans le dossier parent : sans ça, Turbopack
  // remonte trop haut pour déduire la racine du projet.
  turbopack: { root: path.resolve(process.cwd()) },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lenis"],
  },
  async headers() {
    return [
      {
        source: "/hero/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [{ source: "/", destination: "/fr", permanent: false }];
  },
};

export default nextConfig;
