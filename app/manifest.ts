import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AIBrigade — AI for Fintech & HealthTech",
    short_name: "AIBrigade",
    description:
      "AIBrigade builds custom AI products for Fintech and HealthTech companies in the United States.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E1B3D",
    theme_color: "#030712",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
