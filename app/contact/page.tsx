import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Book a free discovery call with AIBrigade. Start your AI journey — tell us your challenge and we'll respond within 24 hours.",
};

export default function ContactPage() {
  return <ContactForm />;
}
