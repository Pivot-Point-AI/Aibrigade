import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import BlogArticle from "@/components/blog/BlogArticle";
import JsonLd from "@/components/JsonLd";
import { getPost, postSlugs, relatedPosts, BLOG_AUTHOR } from "@/components/blog.data";
import { pageMetadata, webPageNode, breadcrumbNode, ID } from "@/components/seo";
import { absoluteUrl } from "@/components/site.data";

/* Every post is built at build time; an unknown slug is a 404 rather
   than an on-demand render. */
export const dynamicParams = false;
export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const base = pageMetadata({ title: post.title, description: post.dek, path: post.href });
  return {
    ...base,
    /* An article, not a website — and the dates travel with the card. */
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      ...(post.updated ? { modifiedTime: post.updated } : null),
      section: post.categoryLabel,
      authors: [BLOG_AUTHOR],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = absoluteUrl(post.href);

  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <BlogArticle post={post} related={relatedPosts(slug)} />
        <Cta />
        <Footer />
      </div>
      <JsonLd
        graph={[
          webPageNode({
            path: post.href,
            name: `${post.title} | ${BLOG_AUTHOR}`,
            description: post.dek,
            extra: { mainEntity: { "@id": `${url}#article` } },
          }),
          breadcrumbNode(post.href, [
            { name: "Blog", path: "/blog" },
            { name: post.title, path: post.href },
          ]),
          {
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: post.title,
            description: post.dek,
            url,
            mainEntityOfPage: { "@id": `${url}#webpage` },
            isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
            image: absoluteUrl(`${post.href}/opengraph-image`),
            datePublished: post.date,
            dateModified: post.updated || post.date,
            /* The company is the author: posts are written by the team,
               and inventing a named byline would be a claim the site
               cannot back. */
            author: { "@id": ID.org },
            publisher: { "@id": ID.org },
            articleSection: post.categoryLabel,
            wordCount: post.words,
            inLanguage: "en-US",
          },
        ]}
      />
    </>
  );
}
