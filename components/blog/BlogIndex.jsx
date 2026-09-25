"use client";

import { useState } from "react";
import MaskHeading from "@/components/motion/MaskHeading";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import TransitionLink from "@/components/TransitionLink";
import IntelligenceSystem from "@/components/motion/IntelligenceSystem";
import PostCard, { ARROW } from "@/components/blog/PostCard";

/**
 * /blog, page body.
 *
 * Built from /company's pieces (components/Company.jsx, app/company.css),
 * used as they are rather than copied, so the two pages cannot drift:
 * the ink hero with its grid and bloom, the display heading whose second
 * line turns lavender, the call to action, the facts rule, and the
 * numbered chapter head over the light band.
 *
 * Beside the headline, the home hero's drawing (`IntelligenceSystem`), as
 * on /company and /contact. The latest post is one click away through
 * "Read the latest".
 *
 * Under it, every post: the "Example briefs" tabs from the home page as
 * the topic filter, and a grid of cards closed by a violet "next step"
 * card, so the last row is never left half empty at the current count.
 *
 * Client-side only for the filter. Every post is in the server HTML; the
 * filter only hides cards, so a crawler that never clicks still sees the
 * whole list.
 *
 * `posts` and `featured` are card shapes (`postCard()` in blog.data.js);
 * `categories` is [{ id, label, color, count }].
 */

const NUMBER = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

/* "A, B and C" */
const listOf = (items) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

const pad = (n) => String(n).padStart(2, "0");

export default function BlogIndex({ featured, posts, categories }) {
  const [active, setActive] = useState("all");

  const shown = active === "all" ? posts : posts.filter((p) => p.category === active);
  const count = NUMBER[posts.length] || String(posts.length);

  const FACTS = [
    { value: posts.length, label: "Posts so far, newest first" },
    { value: categories.length, label: `Topics: ${listOf(categories.map((c) => c.label))}` },
    { value: posts.reduce((n, p) => n + p.minutes, 0), label: "Minutes to read every post" },
  ];

  return (
    <main className="ax-co ax-blog">
      {/* ---------- hero, with the latest post ---------- */}
      <section className="ax-co__hero ax-co--dark">
        <span className="ax-co__hero-grid" aria-hidden="true" />
        <div className="padding-global">
          <div className="container-large">
            <div className="ax-co__hero-layout">
              <div className="ax-co__hero-copy">
                <span className="ax-page-eyebrow">Blog</span>
                <h1 className="ax-co__title">
                  <MaskHeading text={"Notes on AI that\n*does the work.*"} />
                </h1>
                <Reveal variant="rise" delay={0.2} immediate className="ax-co__lede">
                  <p>
                    How to pick the first workflow, where a person stays in the loop, and what it
                    takes to run AI inside a regulated estate, written by the team that builds it.
                  </p>
                </Reveal>
                <Reveal variant="rise" delay={0.3} immediate className="ax-co__actions">
                  <TransitionLink href={featured.href} className="ax-co__btn">
                    <span>Read the latest</span>
                    {ARROW}
                  </TransitionLink>
                  <a href="#posts" className="ax-co__link">
                    Browse every post
                  </a>
                </Reveal>
              </div>

              {/* The home hero's drawing, as it is there. */}
              <div className="ax-co__hero-visual">
                <IntelligenceSystem />
              </div>
            </div>

            <Reveal
              variant="stagger"
              selector=".ax-co__fact"
              start="top 96%"
              className="ax-co__facts ax-blog__facts"
            >
              {FACTS.map((f) => (
                <div className="ax-co__fact" key={f.label}>
                  <span className="ax-co__fact-value">
                    <Counter to={f.value} />
                  </span>
                  <span className="ax-co__fact-label">{f.label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 01 every post — light ---------- */}
      <section id="posts" className="ax-co__band ax-blog__list" aria-labelledby="blog-list-title">
        <div className="padding-global">
          <div className="container-large">
            <Reveal variant="rise" className="ax-co__head">
              <p className="ax-kicker">
                <span>01</span>
                Every post
              </p>
              <h2 id="blog-list-title" className="ax-co__h2">
                {count.charAt(0).toUpperCase() + count.slice(1)} notes,
                <br />
                <span>one argument.</span>
              </h2>
              <div className="ax-co__lede2">
                <p>
                  That AI is worth building when it does the work. Each post takes one part of it
                  (the first workflow, the handoff to a person, where the system runs) and says
                  plainly how we do it.
                </p>
              </div>
            </Reveal>

            <div className="ax-blog__bar">
              <p className="ax-blog__bar-label" id="blog-filter-label">
                Filter by topic
              </p>
              <div className="ax-blog__tabs" role="group" aria-labelledby="blog-filter-label">
                <button
                  type="button"
                  className="ax-blog__tab"
                  aria-pressed={active === "all"}
                  onClick={() => setActive("all")}
                >
                  All
                  <span className="ax-blog__tab-n">{posts.length}</span>
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className="ax-blog__tab"
                    style={{ "--c": c.color }}
                    aria-pressed={active === c.id}
                    onClick={() => setActive(c.id)}
                  >
                    <span className="ax-blog__tab-dot" aria-hidden="true" />
                    {c.label}
                    <span className="ax-blog__tab-n">{c.count}</span>
                  </button>
                ))}
              </div>
              <p className="ax-blog__count" aria-live="polite">
                {active === "all" ? `${pad(posts.length)} posts` : `${pad(shown.length)} of ${pad(posts.length)}`}
              </p>
            </div>

            {/* Every card stays in the DOM; the filter hides the rest. */}
            <ul className="ax-blog__grid">
              {posts.map((p) => (
                <li key={p.slug} hidden={!shown.some((s) => s.slug === p.slug)}>
                  <PostCard post={p} latest={p.slug === featured.slug} />
                </li>
              ))}
              <li>
                <TransitionLink href="/contact" className="ax-blog-ask">
                  <span className="ax-blog-ask__grid" aria-hidden="true" />
                  <span className="ax-blog-ask__kicker">Next step</span>
                  {/* Not "Bring us one problem." — that is the headline of
                      the closing CTA band directly below the grid. */}
                  <span className="ax-blog-ask__title">Have a workflow in mind?</span>
                  <span className="ax-blog-ask__text">
                    Tell us the one that is too slow, too expensive, too manual or too risky. We&rsquo;ll
                    tell you whether AI can materially improve it, and build it if it can.
                  </span>
                  <span className="ax-blog-ask__more">
                    Send us a brief
                    {ARROW}
                  </span>
                </TransitionLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
