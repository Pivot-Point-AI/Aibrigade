import type { Metadata } from "next";
import { AIBrigadeLanding } from "@/components/landing/AIBrigadeLanding";

export const metadata: Metadata = {
  title: "AI Brigade | AI Systems Company",
  description:
    "AI Brigade builds production AI systems: copilots, automation agents, internal GPT platforms, and decision intelligence workflows.",
};

export default function HomePage() {
  return <AIBrigadeLanding />;
}
