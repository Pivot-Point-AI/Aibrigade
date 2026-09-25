import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import BlogIndex from "@/components/blog/BlogIndex";
import JsonLd from "@/components/JsonLd";
import { posts, featuredPost, postCard, CATEGORIES, BLOG_AUTHOR } from "@/components/blog.data";
import { pageMetadata, webPageNode, breadcrumbNode, ID } from "@/components/seo";
import { absoluteUrl } from "@/components/site.data";

const TITLE = "Blog";
const PATH = "/blog";
const DESCRIPTION =
  "Notes on enterprise AI that does the work: choosing the first workflow, designing the human handoff, and running AI privately inside a regulated estate.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

/* Only the categories that have a post, in register order. */
const categories = Object.entries(CATEGORIES)
  .map(([id, c]) => ({ id, label: c.label, color: c.color, count: posts.filter((p) => p.category === id).length }))
  .filter((c) => c.count);

/* The Blog, listing every post by `@id` — each post's own page carries
   the full BlogPosting node these point at. */
const blogNode = {
  "@type": "Blog",
  "@id": `${absoluteUrl(PATH)}#blog`,
  name: `${BLOG_AUTHOR} Blog`,
  description: DESCRIPTION,
  url: absoluteUrl(PATH),
  publisher: { "@id": ID.org },
  inLanguage: "en-US",
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(p.href)}#article`,
    headline: p.title,
    url: absoluteUrl(p.href),
    datePublished: p.date,
  })),
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <BlogIndex
          featured={postCard(featuredPost)}
          posts={posts.map(postCard)}
          categories={categories}
        />
        <Cta />
        <Footer />
      </div>
      <JsonLd
        graph={[
          webPageNode({
            path: PATH,
            type: "CollectionPage",
            name: `${TITLE} | ${BLOG_AUTHOR}`,
            description: DESCRIPTION,
            extra: { mainEntity: { "@id": blogNode["@id"] } },
          }),
          breadcrumbNode(PATH, [{ name: TITLE, path: PATH }]),
          blogNode,
        ]}
      />
    </>
  );
}
