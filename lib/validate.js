import { slugify } from "./slug";

const pick = (body, key, existing, fallback = "") =>
  body[key] !== undefined ? body[key] : existing?.[key] ?? fallback;

const isUrl = (u) => !u || /^(https?:\/\/|\/)/i.test(u);

// Accepts partial bodies when `existing` is passed (used for PUT).
export function validatePost(body = {}, existing = null) {
  const title = String(pick(body, "title", existing)).trim();
  if (!title) return { error: "Title is required." };
  if (title.length > 160) return { error: "Title must be 160 characters or fewer." };

  const slug = slugify(pick(body, "slug", existing) || title);
  if (!slug) return { error: "Slug could not be generated. Use letters or numbers." };

  const excerpt = String(pick(body, "excerpt", existing)).trim();
  if (excerpt.length > 320) return { error: "Excerpt must be 320 characters or fewer." };

  const coverImage = String(pick(body, "coverImage", existing)).trim();
  if (!isUrl(coverImage)) return { error: "Cover image must be a full https:// URL or a path starting with /." };

  const rawTags = pick(body, "tags", existing, []);
  const tagList = Array.isArray(rawTags) ? rawTags : String(rawTags).split(",");
  const tags = [...new Set(tagList.map((t) => String(t).trim()).filter(Boolean))].slice(0, 8);

  const status = pick(body, "status", existing, "draft");
  if (!["draft", "published"].includes(status)) return { error: "Status must be draft or published." };

  const content = String(pick(body, "content", existing));
  if (status === "published" && content.trim().length < 20) {
    return { error: "Add some content before publishing." };
  }

  return {
    data: {
      title,
      slug,
      excerpt,
      coverImage,
      tags,
      status,
      content,
      author: String(pick(body, "author", existing, "AIBrigade Team")).trim() || "AIBrigade Team",
    },
  };
}
