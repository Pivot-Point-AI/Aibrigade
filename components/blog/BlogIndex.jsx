"use client";

import { useState } from "react";
import MaskHeading from "@/components/motion/MaskHeading";
import Reveal from "@/components/motion/Reveal";
import TransitionLink from "@/components/TransitionLink";
import PostCover from "@/components/blog/PostCover";
import PostCard, { ARROW } from "@/components/blog/PostCard";

/**
 * /blog, page body.
 *
 * The same shape as the site's other inner pages: an ink band that opens
 * it (the contact page's and the AI Lab's), then the content on white.
 * The band carries the lead post rather than a decorative panel — on a
 * blog, the newest argument is the thing worth putting at eye level.
 *
 * Client-side only for the category filter. Every post is in the server
 * HTML; the filter only hides cards, so a crawler that never clicks still
 * sees the whole list.
 *
 * `posts` and `featured` are card shapes (`postCard()` in blog.data.js);
 * `categories` is [{ id, label, color, count }].
 */
export default function BlogIndex({ featured, posts, categories }) {
  const [active, setActive] = useState("all");

  /* "All" leaves the lead post out of the grid — it is directly above.
     A category shows every post in it, the lead post included, or
     choosing the lead post's own category would show an empty grid. */
  const shown =
    active === "all" ? posts.filter((p) => p.slug !== featured.slug) : posts.filter((p) => p.category === active);

  return (
    <main className="ax-blog">
      {/* ---------- hero, with the lead post ---------- */}
      <section className="ax-blog__hero">
        <span className="ax-blog__hero-grid" aria-hidden="true" />
        <span className="ax-blog__hero-glow" aria-hidden="true" />
        <div className="padding-global">
          <div className="container-large">
            <div className="ax-blog__hero-layout">
              <div className="ax-blog__hero-copy">
                <span className="ax-page-eyebrow">Blog</span>
                <h1 className="ax-blog__title">
                  <MaskHeading text={"Notes on AI that\n*does the work.*"} />
                </h1>
                <Reveal variant="rise" delay={0.2} immediate className="ax-blog__lede">
                  <p>
                    How to pick the first workflow, where a person stays in the loop, and what it
                    takes to run AI inside a regulated estate — written by the team that builds
                    it.
                  </p>
                </Reveal>
                <Reveal variant="rise" delay={0.3} immediate className="ax-blog__hero-stats">
                  <p>
                    <strong>{posts.length}</strong> posts
                    <span aria-hidden="true">·</span>
                    <strong>{categories.length}</strong> topics
                  </p>
                </Reveal>
              </div>

              <Reveal variant="clip" immediate className="ax-blog__lead">
                <article className="ax-blog-lead" style={{ "--c": featured.color }}>
                  <TransitionLink href={featured.href} className="ax-blog-lead__link">
                    <PostCover post={featured} size="lead" />
                    <div className="ax-blog-lead__body">
                      <p className="ax-blog-lead__meta">
                        <span className="ax-blog-lead__flag">Latest</span>
                        <span>{featured.categoryLabel}</span>
                        <span>{featured.minutes} min read</span>
                      </p>
                      <h2 className="ax-blog-lead__title">{featured.title}</h2>
                      <p className="ax-blog-lead__dek">{featured.dek}</p>
                      <span className="ax-blog-lead__more">
                        Read the post
                        {ARROW}
                      </span>
                    </div>
                  </TransitionLink>
                </article>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- every post ---------- */}
      <section className="ax-blog__list" aria-labelledby="blog-list-title">
        <div className="padding-global">
          <div className="container-large">
            <div className="ax-blog__list-head">
              <h2 id="blog-list-title" className="ax-blog__list-title">
                {active === "all"
                  ? "More from the blog"
                  : categories.find((c) => c.id === active)?.label}
              </h2>
              <div className="ax-blog__filters" role="group" aria-label="Filter posts by topic">
                <button
                  type="button"
                  className="ax-blog__filter"
                  aria-pressed={active === "all"}
                  onClick={() => setActive("all")}
                >
                  All
                  <span className="ax-blog__filter-n">{posts.length}</span>
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className="ax-blog__filter"
                    style={{ "--c": c.color }}
                    aria-pressed={active === c.id}
                    onClick={() => setActive(c.id)}
                  >
                    <span className="ax-blog__filter-dot" aria-hidden="true" />
                    {c.label}
                    <span className="ax-blog__filter-n">{c.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Every card stays in the DOM; the filter hides the rest. */}
            <ul className="ax-blog__grid">
              {posts.map((p) => {
                const visible = shown.some((s) => s.slug === p.slug);
                return (
                  <li key={p.slug} hidden={!visible}>
                    <PostCard post={p} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
