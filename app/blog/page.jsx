import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import BlogIndex from "@/components/blog/BlogIndex";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, blogIndexGraph } from "@/components/seo";
import { getPublishedPosts } from "@/lib/posts";
import { toCards, toCategories } from "@/lib/blogCards";

export const dynamic = "force-dynamic";

const TITLE = "Agentic AI Engineering & Workflow Blog";
const DESCRIPTION =
  "Practical engineering insights from AI Brigade on building agentic AI, designing human handoffs, choosing your first workflow and private AI hosting.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/blog",
});

export default async function BlogPage() {
  let cards = [];
  let failed = false;
  try {
    const { posts } = await getPublishedPosts({ page: 1, limit: 100 });
    cards = toCards(posts);
  } catch (e) {
    console.error("[blog] could not load posts:", e.message);
    failed = true;
  }

  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        {cards.length > 0 ? (
          <BlogIndex featured={cards[0]} posts={cards} categories={toCategories(cards)} />
        ) : (
          <main className="ax-co ax-blog">
            <section className="ax-co__hero ax-co--dark">
              <span className="ax-co__hero-grid" aria-hidden="true" />
              <div className="padding-global">
                <div className="container-large">
                  <div className="ax-co__hero-copy">
                    <span className="ax-page-eyebrow">The AI Brigade blog</span>
                    <h1 className="ax-co__title">{failed ? "The blog is taking a break" : "First posts coming soon"}</h1>
                    <div className="ax-co__lede">
                      <p>
                        {failed
                          ? "We could not load the posts just now. Please check back in a few minutes."
                          : "We are writing up what we learn shipping AI into real operations. New articles will appear here soon."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}
        <Cta />
        <Footer />
      </div>
      <JsonLd graph={blogIndexGraph({ title: TITLE, description: DESCRIPTION, posts: cards })} />
    </>
  );
}
