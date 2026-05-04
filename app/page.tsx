import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { CTASection } from "@/components/sections/home/CTASection";

export const metadata: Metadata = {
  title: "AIBrigade — AI for Fintech & HealthTech",
  description:
    "Custom AI solutions for Fintech and HealthTech companies. From credit risk AI to clinical documentation — we build systems that move the needle.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <FeaturedProjects />
      <Testimonials />
      <CTASection />
    </>
  );
}
