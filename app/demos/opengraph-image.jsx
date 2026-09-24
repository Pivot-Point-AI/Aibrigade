import { shareCard, CARD_SIZE } from "@/app/_og/shareCard";
import { demos } from "@/components/demos/demos.data";

/* The AI Lab's link preview: the page's headline and its four modules.
   See app/_og/shareCard.jsx. */

export const alt = "AI Brigade AI Lab — see the reasoning, not just the answer. Four live modules you can run your own input through.";
export const size = CARD_SIZE;
export const contentType = "image/png";

export default function Image() {
  return shareCard({
    eyebrow: "AI Lab",
    title: "See the reasoning,\n*not just the answer.*",
    titleSize: 68,
    /* The page's own description of the four, not their titles run
       together. */
    lede: "Real-time fraud decisioning, document intelligence, agent intent routing and grounded retrieval over a private corpus.",
    footer: `${demos.length} live modules · Run your own input`,
  });
}
