import { shareCard, CARD_SIZE } from "@/app/_og/shareCard";
import { OFFICES } from "@/components/offices.data";

/* The contact page's link preview: its headline, and the reply promise
   the page makes. See app/_og/shareCard.jsx. */

export const alt = "Contact AI Brigade and talk to the engineers who build it. First reply within one business day.";
export const size = CARD_SIZE;
export const contentType = "image/png";

export default function Image() {
  return shareCard({
    eyebrow: "Contact",
    title: "Talk to the engineers\n*who build it.*",
    titleSize: 76,
    lede: "Send us the problem and the constraints. A person replies within one business day.",
    footer: OFFICES.map((o) => o.city).join(" · "),
  });
}
