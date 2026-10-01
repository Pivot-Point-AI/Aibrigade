import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import DbBlogArticle from "@/components/blog/DbBlogArticle";
import { pageMetadata } from "@/components/seo";
import { getPublishedPost, getRelatedPosts } from "@/lib/posts";
import { toCards } from "@/lib/blogCards";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const post = await getPublishedPost(slug);
    if (!post) return { title: "Post not found | AI Brigade" };
    return pageMetadata({
      title: post.title,
      description: post.excerpt || undefined,
      path: `/blog/${post.slug}`,
    });
  } catch {
    return { title: "Blog | AI Brigade" };
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
    </>
  );
}
