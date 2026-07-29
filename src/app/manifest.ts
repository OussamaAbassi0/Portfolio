import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oussama Abassi — Automatisation IA & data",
    short_name: "Oussama Abassi",
    description:
      "Ingénieur freelance à Paris : automatisation n8n et IA, pipelines de données, dashboards, sites et applications.",
    start_url: "/fr",
    display: "standalone",
    background_color: "#0A0510",
    theme_color: "#0A0510",
    lang: "fr",
    icons: [
      { src: "/logo-oa.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
