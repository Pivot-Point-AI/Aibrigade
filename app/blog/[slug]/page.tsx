import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, GlowOrbs } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Calendar, User, Clock } from "lucide-react";
import { buildMetadata, buildBreadcrumbSchema } from "@/lib/seo";

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.status !== "published") return { title: "Article Not Found" };

  return buildMetadata({
    title: `${post.title} | AIBrigade Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: [...post.tags, post.category, "AI blog"],
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== "published") notFound();

  const allPosts = await getPublishedPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = allPosts[currentIndex + 1];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  const contentHtml = renderMarkdown(post.content);
  const minutes = readingTime(post.content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="pt-24 pb-4">
        <div className="container-custom">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Blog
          </Link>
        </div>
      </div>

      <section className="relative pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,212,255,0.1),transparent)]" />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <GlowOrbs />
        </div>

        <div className="container-custom relative max-w-3xl mx-auto">
          <Reveal amount={0}>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="cyan" dot>{post.category}</Badge>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="neutral">{tag}</Badge>
              ))}
            </div>

            <h1 className="font-display font-700 text-white leading-[1.15] mb-6 tracking-tight" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm text-text-muted pb-8 mb-8 border-b border-border">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {formatDate(post.publishedAt ?? post.createdAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {minutes} min read
              </span>
            </div>

            {post.coverImage && (
              <div className="mb-10 rounded-2xl overflow-hidden border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.coverImage} alt={post.title} className="w-full h-auto max-h-[420px] object-cover" />
              </div>
            )}

            <div className="prose-blog" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </Reveal>
        </div>
      </section>

      <section className="py-16 relative border-t border-border">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-text-secondary mb-4 sm:mb-0">Have a project in mind? Let&apos;s talk.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="md" href="/blog">
                All Articles
              </Button>
              {nextPost && (
                <Button variant="primary" size="md" href={`/blog/${nextPost.slug}`} iconRight={<ArrowRight className="w-4 h-4" />}>
                  Next Article
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
