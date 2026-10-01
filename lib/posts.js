import connectDB from "./mongodb";
import Post from "../models/Post";
import { readingTime } from "./format";

export function serialize(d) {
  return {
    id: String(d._id),
    title: d.title,
    slug: d.slug,
    excerpt: d.excerpt || "",
    content: d.content || "",
    minutes: readingTime(d.content || ""),
    coverImage: d.coverImage || "",
    tags: d.tags || [],
    author: d.author || "",
    status: d.status,
    publishedAt: d.publishedAt ? new Date(d.publishedAt).toISOString() : null,
    createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : null,
    updatedAt: d.updatedAt ? new Date(d.updatedAt).toISOString() : null,
  };
}

const LIST_FIELDS = "-content";

// List items keep the computed read time but not the article body.
const card = (d) => ({ ...serialize(d), content: "" });

// ---- public ----
export async function getPublishedPosts({ page = 1, limit = 9, tag } = {}) {
  await connectDB();
  const filter = { status: "published" };
  if (tag) filter.tags = tag;
  const [docs, total] = await Promise.all([
    Post.find(filter)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Post.countDocuments(filter),
  ]);
  return { posts: docs.map(card), total, pages: Math.max(1, Math.ceil(total / limit)) };
}

export async function getPublishedTags() {
  await connectDB();
  const tags = await Post.distinct("tags", { status: "published" });
  return tags.sort((a, b) => a.localeCompare(b));
}

export async function getPublishedPost(slug) {
  await connectDB();
  const doc = await Post.findOne({ slug, status: "published" }).lean();
  return doc ? serialize(doc) : null;
}

export async function getRelatedPosts(post, limit = 3) {
  await connectDB();
  const base = { status: "published", _id: { $ne: post.id } };
  let docs = post.tags.length
    ? await Post.find({ ...base, tags: { $in: post.tags } })
        .sort({ publishedAt: -1 }).limit(limit).lean()
    : [];
  if (docs.length < limit) {
    const have = docs.map((d) => d._id);
    const more = await Post.find({ ...base, _id: { $nin: [...have, post.id] } })
      .sort({ publishedAt: -1 }).limit(limit - docs.length).lean();
    docs = [...docs, ...more];
  }
  return docs.map(card);
}

// ---- admin ----
export async function getAllPosts() {
  await connectDB();
  const docs = await Post.find().select(LIST_FIELDS).sort({ updatedAt: -1 }).lean();
  return docs.map(serialize);
}

export async function getPostById(id) {
  await connectDB();
  const doc = await Post.findById(id).lean();
  return doc ? serialize(doc) : null;
}
