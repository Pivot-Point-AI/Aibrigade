import { shareCard, CARD_SIZE } from "@/app/_og/shareCard";
import { posts, CATEGORIES } from "@/components/blog.data";

/* The blog's link preview: its headline and what it covers.
   See app/_og/shareCard.jsx. */

export const alt = "The AI Brigade blog: notes on AI that does the work.";
export const size = CARD_SIZE;
export const contentType = "image/png";

export default function Image() {
  const topics = Object.entries(CATEGORIES).filter(([id]) => posts.some((p) => p.category === id));
  return shareCard({
    eyebrow: "Blog",
    title: "Notes on AI that\n*does the work.*",
    titleSize: 72,
    chips: topics.map(([, c]) => ({ label: c.label, color: c.color })),
    lede: "Choosing the first workflow, designing the human handoff, and running AI inside a regulated estate.",
    footer: `${posts.length} posts`,
  });
}
