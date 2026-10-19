import { llmsTxt } from "@/components/llms";
import { getPublishedPosts } from "@/lib/posts";

/* /llms.txt — the site, indexed for AI assistants (https://llmstxt.org).
   Queries live published blog posts from MongoDB so every URL resolves. */
export const dynamic = "force-dynamic";

export async function GET() {
  let posts = [];
  try {
    const res = await getPublishedPosts({ page: 1, limit: 50 });
    posts = res.posts || [];
  } catch {
    posts = [];
  }

  return new Response(llmsTxt(posts), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
