import { formatDate } from "./format";

// Database posts have free-form tags; the themed blog components want a
// category, a colour and a cover motif. The first tag is the topic, and the
// colour and motif come from a stable hash of it, so a topic always looks the same.
const COLORS = ["#c79bf5", "#f0a83c", "#6f95ff", "#2fd3c0", "#f87756", "#9248e4"];
const MOTIFS = ["perspective", "playbook", "engineering", "product"];

const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const topicId = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "insights";

export function toCards(posts) {
  const seen = {};
  return posts.map((p, i) => {
    const label = p.tags?.[0] || "Insights";
    const h = hash(label.toLowerCase());
    const motif = MOTIFS[h % MOTIFS.length];
    const variant = (seen[motif] = (seen[motif] ?? -1) + 1);
    return {
      slug: p.slug,
      href: `/blog/${p.slug}`,
      n: posts.length - i,
      variant,
      title: p.title,
      dek: p.excerpt,
      category: topicId(label),
      categoryLabel: label,
      color: COLORS[h % COLORS.length],
      motif,
      coverImage: p.coverImage,
      date: p.publishedAt,
      dateLabel: formatDate(p.publishedAt),
      minutes: p.minutes || 1,
    };
  });
}

export function toCategories(cards) {
  const map = new Map();
  for (const c of cards) {
    const e = map.get(c.category) || { id: c.category, label: c.categoryLabel, color: c.color, count: 0 };
    e.count += 1;
    map.set(c.category, e);
  }
  return [...map.values()];
}
