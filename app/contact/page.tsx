import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { buildMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { officeLocalBusinessSchemas } from "@/lib/schema";

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

export const metadata: Metadata = buildMetadata({
  title: "Contact AIBrigade | Book a Free AI Discovery Call",
  description:
    "Book a free discovery call with AIBrigade. Tell us about your Fintech or HealthTech AI challenge and our U.S.-based team will respond within 24 hours.",
  path: "/contact",
  keywords: ["contact AIBrigade", "AI consultation USA", "book AI discovery call", "AI development quote"],
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(officeLocalBusinessSchemas) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactForm />
    </>
  );
}
