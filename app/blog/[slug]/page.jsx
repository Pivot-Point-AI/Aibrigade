import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import DbBlogArticle from "@/components/blog/DbBlogArticle";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, blogPostGraph } from "@/components/seo";
import { getPublishedPost, getRelatedPosts } from "@/lib/posts";
import { toCards } from "@/lib/blogCards";

export const dynamic = "force-dynamic";

const trimMeta = (s, max = 155) => {
  const clean = String(s || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 100 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:!?-]+$/, "")}…`;
};

/* A description for a post that has no excerpt: its first real paragraph,
   with the markdown taken off. */
const firstParagraph = (markdown) => {
  const paragraphs = String(markdown || "")
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .map((p) =>
      p
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_`>]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter((p) => p && !/^(#|[-+]\s|\d+\.\s|\|)/.test(p));
  return paragraphs.find((p) => p.length >= 60) || paragraphs[0] || "";
};

/* The brand suffix is dropped when it would push the title past about 60
   characters, where search results start to cut it. */
const TITLE_SUFFIX = " | AI Brigade";
const searchTitle = (title) => (title.length + TITLE_SUFFIX.length > 60 ? { absolute: title } : title);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const post = await getPublishedPost(slug);
    if (!post) {
      return {
        title: "Post not found",
        robots: { index: false, follow: false },
      };
    }
    const publishedTime = post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined;
    const modifiedTime = post.updatedAt ? new Date(post.updatedAt).toISOString() : publishedTime;
    return pageMetadata({
      title: searchTitle(String(post.title || "").replace(/\s+/g, " ").trim()),
      description: trimMeta(post.excerpt || firstParagraph(post.content), 155) || undefined,
      path: `/blog/${post.slug}`,
      ogType: "article",
      openGraphExtra: {
        ...(publishedTime ? { publishedTime } : null),
        ...(modifiedTime ? { modifiedTime } : null),
        ...(post.author ? { authors: [post.author] } : null),
        ...(post.category ? { section: post.category } : null),
        ...(Array.isArray(post.tags) && post.tags.length ? { tags: post.tags } : null),
      },
    });
  } catch {
    return { title: "Blog" };
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post).catch(() => []);
  const [card] = toCards([post]);

  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <DbBlogArticle post={post} card={card} related={toCards(related)} />
        <Cta />
        <Footer />
      </div>
      <JsonLd graph={blogPostGraph(post)} />
    </>
  );
}
