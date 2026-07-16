import AIBrigadeLanding from "@/components/landing/AIBrigadeLanding";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { generateFAQSchema } from "@/lib/schema";
import { services } from "@/data/services";
import { HOME_FAQS } from "@/data/faq";

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

const faqSchema = generateFAQSchema(
  HOME_FAQS.map((faq) => ({ question: faq.question, answer: faq.answer }))
);

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/*
        Server-rendered content for crawlers that don't execute JavaScript
        (many AI/answer-engine bots included). The visual homepage experience
        below is a client-only animation (ssr: false), so without this block
        the page would ship no readable text in its initial HTML.
      */}
      <div className="sr-only">
        <h1>AIBrigade — Custom AI Systems for Fintech &amp; HealthTech</h1>
        <p>
          AIBrigade builds production-grade AI systems for U.S. Fintech and
          HealthTech companies — copilots, automation agents, GPT platforms,
          and decision intelligence workflows, taken from discovery through
          production deployment.
        </p>

        <h2>Services</h2>
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              <h3>{service.title}</h3>
              <p>{service.shortDescription}</p>
            </li>
          ))}
        </ul>

        <h2>Our Process</h2>
        <ol>
          <li>Discover — Understand your business goals and identify high-value AI opportunities.</li>
          <li>Design — Architect the right AI solution for your business.</li>
          <li>Build — Develop and test using Agile methodologies and rapid iterations.</li>
          <li>Deploy — Launch securely into production with ongoing monitoring and optimization.</li>
          <li>Scale — Continuously improve and expand your AI capabilities as your business grows.</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        {HOME_FAQS.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>

      <AIBrigadeLanding />
    </>
  );
}
