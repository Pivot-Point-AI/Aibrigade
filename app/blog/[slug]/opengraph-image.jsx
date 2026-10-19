import { shareCard, CARD_SIZE } from "@/app/_og/shareCard";
import { getPost, formatDate } from "@/components/blog.data";
import { getPublishedPost } from "@/lib/posts";
import { toCards } from "@/lib/blogCards";

/* Each post's link preview: its headline, its dek and its date, in the
   post's category colour. Supports dynamic MongoDB posts with a safe
   fallback. See app/_og/shareCard.jsx. */

export const alt = "A post from the AI Brigade blog.";
export const size = CARD_SIZE;
export const contentType = "image/png";

export default async function Image({ params }) {
  const { slug } = await params;

  let card = getPost(slug);
  if (!card) {
    try {
      const dbPost = await getPublishedPost(slug);
      if (dbPost) {
        const [mapped] = toCards([dbPost]);
        card = mapped;
      }
    } catch {
      card = null;
    }
  }

  if (!card) {
    return shareCard({
      eyebrow: "Blog · AI Brigade",
      title: "Enterprise & Agentic AI\n*Engineering Blog.*",
      titleSize: 64,
      chips: [{ label: "Insights", color: "#c79bf5" }],
      lede: "Practical engineering insights from AI Brigade on building and running agentic AI in production.",
      footer: "aibrigade.ai/blog",
    });
  }

  return shareCard({
    eyebrow: `Blog · ${card.categoryLabel || "Insights"}`,
    title: card.title,
    titleSize: card.title.length > 40 ? 60 : 68,
    chips: [{ label: card.categoryLabel || "Insights", color: card.color || "#c79bf5" }],
    lede: card.dek || "",
    footer: `${card.dateLabel || (card.date ? formatDate(card.date) : "AI Brigade")} · ${card.minutes || 1} min read`,
  });
}
