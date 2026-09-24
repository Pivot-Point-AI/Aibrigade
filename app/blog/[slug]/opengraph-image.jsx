import { shareCard, CARD_SIZE } from "@/app/_og/shareCard";
import { getPost, postSlugs, formatDate } from "@/components/blog.data";

/* Each post's link preview: its headline, its dek and its date, in the
   post's category colour. Generated at build for every post, like the
   pages. See app/_og/shareCard.jsx. */

export const alt = "A post from the AI Brigade blog.";
export const size = CARD_SIZE;
export const contentType = "image/png";

export const dynamicParams = false;
export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  return shareCard({
    eyebrow: `Blog · ${post.categoryLabel}`,
    title: post.title,
    titleSize: post.title.length > 40 ? 60 : 68,
    chips: [{ label: post.categoryLabel, color: post.color }],
    lede: post.dek,
    footer: `${formatDate(post.date)} · ${post.minutes} min read`,
  });
}
