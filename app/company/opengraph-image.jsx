import { shareCard, CARD_SIZE } from "@/app/_og/shareCard";
import { whyUs } from "@/components/data";
import { OFFICES } from "@/components/offices.data";

/* The company page's link preview: its headline, the four verbs every
   system is built from, and where the team is. See app/_og/shareCard.jsx. */

export const alt = "AI Brigade — the team behind AI that does the work.";
export const size = CARD_SIZE;
export const contentType = "image/png";

export default function Image() {
  const spine = ["Listen", "Understand", "Reason", "Act"].map((t) => whyUs.find((c) => c.title === t));
  return shareCard({
    eyebrow: "Company",
    title: "The team behind\n*AI that does the work.*",
    titleSize: 66,
    chips: spine.map((c) => ({ label: c.title, color: c.color })),
    footer: OFFICES.map((o) => o.city).join(" · "),
  });
}
