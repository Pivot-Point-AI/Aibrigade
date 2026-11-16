import { SITE_URL, SITE_NAME, BLOG_DESCRIPTION, BLOG_FEED, absoluteUrl } from "@/components/site.data";
import { getPublishedPosts } from "@/lib/posts";

/* /rss.xml: the blog's feed, newest first. Readers, aggregators and AI
   assistants that follow feeds find new posts without a crawl. Each item
   carries the post's excerpt and links to the post; the full text stays on
   the page. Linked from /blog with <link rel="alternate">. */
export const dynamic = "force-dynamic";

const esc = (s) =>
  String(s ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const rfc822 = (d) => new Date(d).toUTCString();

export async function GET() {
  let posts = [];
  try {
    posts = (await getPublishedPosts({ page: 1, limit: 50 })).posts || [];
  } catch (e) {
    console.error("[rss] could not load posts:", e.message);
  }

  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/blog/${p.slug}`);
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>${p.publishedAt ? `\n      <pubDate>${rfc822(p.publishedAt)}</pubDate>` : ""}
      <dc:creator>${esc(p.author || SITE_NAME)}</dc:creator>${(p.tags || []).map((t) => `\n      <category>${esc(t)}</category>`).join("")}${p.excerpt ? `\n      <description>${esc(p.excerpt)}</description>` : ""}
    </item>`;
    })
    .join("\n");

  const newest = posts.map((p) => p.updatedAt || p.publishedAt).filter(Boolean).sort().pop();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(BLOG_FEED.title)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${esc(BLOG_DESCRIPTION)}</description>
    <language>en-us</language>${newest ? `\n    <lastBuildDate>${rfc822(newest)}</lastBuildDate>` : ""}
    <atom:link href="${absoluteUrl(BLOG_FEED.path)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
