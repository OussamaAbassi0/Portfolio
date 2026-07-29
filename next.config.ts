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
      {
        source: "/projets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // En-têtes de sécurité : Google en tient compte, et un site qui les
        // ignore paraît négligé lors d'un audit client.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Une seule adresse canonique : oussamaabassi.com.
      // Sans cette redirection, Google voit deux sites identiques (avec et sans
      // www) et répartit la popularité entre les deux au lieu de la concentrer.
      // 308 = permanent : Google transfère l'historique vers la version retenue.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.oussamaabassi.com" }],
        destination: "https://oussamaabassi.com/:path*",
        permanent: true,
      },
      // Anciennes URL du site v1 : elles sont déjà indexées par Google, on les
      // renvoie vers leur équivalent plutôt que de laisser des 404 qui gâchent
      // le référencement acquis. Les pages /services n'existant plus, tout
      // arrive sur l'accueil qui contient désormais la section correspondante.
      { source: "/", destination: "/fr", permanent: false },
      { source: "/services", destination: "/fr", permanent: true },
      { source: "/work", destination: "/fr", permanent: true },
      { source: "/about", destination: "/fr", permanent: true },
    ];
  },
};

export default nextConfig;
