import { promises as fs } from "fs";
import path from "path";
import type { BlogPost } from "@/types";
import { slugify } from "@/lib/utils";

const DATA_PATH = path.join(process.cwd(), "data", "blog.json");

async function readAll(): Promise<BlogPost[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return [];
  }
}

async function writeAll(posts: BlogPost[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await readAll();
  return posts.sort((a, b) => (b.publishedAt ?? b.updatedAt).localeCompare(a.publishedAt ?? a.updatedAt));
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.status === "published");
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await readAll();
  return posts.find((p) => p.slug === slug);
}

export async function getPostById(id: string): Promise<BlogPost | undefined> {
  const posts = await readAll();
  return posts.find((p) => p.id === id);
}

function uniqueSlug(base: string, posts: BlogPost[], excludeId?: string): string {
  let slug = slugify(base) || "post";
  let n = 2;
  while (posts.some((p) => p.slug === slug && p.id !== excludeId)) {
    slug = `${slugify(base)}-${n}`;
    n += 1;
  }
  return slug;
}

export interface BlogPostInput {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: string;
  author: string;
  status: "draft" | "published";
}

export async function createPost(input: BlogPostInput): Promise<BlogPost> {
  const posts = await readAll();
  const now = new Date().toISOString();
  const post: BlogPost = {
    id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    slug: uniqueSlug(input.title, posts),
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
    category: input.category,
    tags: input.tags,
    coverImage: input.coverImage,
    author: input.author,
    status: input.status,
    createdAt: now,
    updatedAt: now,
    publishedAt: input.status === "published" ? now : undefined,
  };
  posts.push(post);
  await writeAll(posts);
  return post;
}

export async function updatePost(id: string, input: BlogPostInput): Promise<BlogPost | undefined> {
  const posts = await readAll();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;

  const existing = posts[idx];
  const now = new Date().toISOString();
  const wasPublished = existing.status === "published";
  const nowPublished = input.status === "published";

  const updated: BlogPost = {
    ...existing,
    slug: existing.title === input.title ? existing.slug : uniqueSlug(input.title, posts, id),
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
    category: input.category,
    tags: input.tags,
    coverImage: input.coverImage,
    author: input.author,
    status: input.status,
    updatedAt: now,
    publishedAt: nowPublished ? existing.publishedAt ?? now : wasPublished ? existing.publishedAt : undefined,
  };
  posts[idx] = updated;
  await writeAll(posts);
  return updated;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await readAll();
  const next = posts.filter((p) => p.id !== id);
  if (next.length === posts.length) return false;
  await writeAll(next);
  return true;
}
