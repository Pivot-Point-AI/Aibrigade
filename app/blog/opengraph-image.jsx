import { shareCard, CARD_SIZE } from "@/app/_og/shareCard";
import { posts, CATEGORIES } from "@/components/blog.data";

/* The blog's link preview: its headline and what it covers.
   See app/_og/shareCard.jsx. */

export const alt = "The AI Brigade blog: we build AI that does the work.";
export const size = CARD_SIZE;
export const contentType = "image/png";

export default function Image() {
  const topics = Object.entries(CATEGORIES).filter(([id]) => posts.some((p) => p.category === id));
  return shareCard({
    eyebrow: "Blog",
    title: "We build AI that\n*does the work.*",
    titleSize: 72,
    chips: topics.map(([, c]) => ({ label: c.label, color: c.color })),
    lede: "Choosing the first workflow, keeping people in charge of the decisions that matter, and running AI privately in regulated industries.",
    footer: `${posts.length} posts`,
  });
}
