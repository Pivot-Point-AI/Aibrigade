import AIBrigadeLanding from "@/components/landing/AIBrigadeLanding";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AIBrigade | Custom AI Systems for Fintech & HealthTech",
  description:
    "AIBrigade builds production-grade AI systems for U.S. Fintech and HealthTech companies — copilots, automation agents, GPT platforms, and decision intelligence workflows.",
  path: "/",
  keywords: [
    "AI development company USA",
    "fintech AI solutions",
    "healthtech AI solutions",
    "custom AI systems",
    "AI automation agents",
    "enterprise AI consulting",
  ],
});

export default function HomePage() {
  return <AIBrigadeLanding />;
}
