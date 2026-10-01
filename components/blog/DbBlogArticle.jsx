import MaskHeading from "@/components/motion/MaskHeading";
import Reveal from "@/components/motion/Reveal";
import TransitionLink from "@/components/TransitionLink";
import PostCover from "@/components/blog/PostCover";
import PostCard from "@/components/blog/PostCard";
import { renderMarkdown } from "@/lib/markdown";
import { absoluteUrl } from "@/components/site.data";

/**
 * /blog/<slug> for a post written in the admin. Same layout as BlogArticle
 * (ink hero with the cover, reading column with contents and share links,
 * "Keep reading"), but the body is the markdown the editor saved, rendered
 * to HTML, instead of the typed blocks of the code-defined posts.
 *
 * `card` is the post in card shape (lib/blogCards.js); `post` is the record.
 */

const strip = (s) =>
  s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').trim();

const idOf = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";

// Gives every h2/h3 an id and collects them for the contents list.
function withIds(html) {
  const toc = [];
  const seen = {};
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level, inner) => {
    const text = strip(inner);
    let id = idOf(text);
    seen[id] = (seen[id] || 0) + 1;
    if (seen[id] > 1) id += `-${seen[id]}`;
    toc.push({ id, text });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  return { html: out, toc };
}

const SHARE_ICONS = {
  LinkedIn: (
    <>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  X: (
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
  ),
  Email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
};

export default function DbBlogArticle({ post, card, related }) {
  const { html, toc } = withIds(renderMarkdown(post.content));
  const url = absoluteUrl(card.href);
  const share = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}` },
    { label: "Email", href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${post.excerpt}\n\n${url}`)}` },
  ];

  return (
    <main className="ax-post" style={{ "--c": card.color }}>
      <section className="ax-post__hero">
        <span className="ax-post__hero-grid" aria-hidden="true" />
        <span className="ax-post__hero-glow" aria-hidden="true" />
        <div className="padding-global">
          <div className="container-large">
            <nav className="ax-post__crumbs" aria-label="Breadcrumb">
              <ol>
                <li><TransitionLink href="/blog">Blog</TransitionLink></li>
                <li><span aria-current="page">{card.categoryLabel}</span></li>
              </ol>
            </nav>

            <div className="ax-post__hero-layout">
              <div className="ax-post__hero-copy">
                <h1 className="ax-post__title">
                  <MaskHeading text={post.title} />
                </h1>
                {post.excerpt && (
                  <Reveal variant="rise" delay={0.2} immediate className="ax-post__dek">
                    <p>{post.excerpt}</p>
                  </Reveal>
                )}
                <Reveal variant="rise" delay={0.3} immediate className="ax-post__byline">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand-mark.png" alt="" width="40" height="40" className="ax-post__avatar" />
                  <span>
                    <strong>{post.author || "AI Brigade"}</strong>
                    <span>
                      <time dateTime={post.publishedAt}>{card.dateLabel}</time>
                      <span aria-hidden="true"> · </span>
                      {card.minutes} min read
                    </span>
                  </span>
                </Reveal>
              </div>
              <Reveal variant="clip" immediate className="ax-post__hero-cover">
                <PostCover post={card} size="hero" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="ax-post__body">
        <div className="padding-global">
          <div className="container-large">
            <div className="ax-post__layout">
              <aside className="ax-post__aside">
                {toc.length > 1 ? (
                  <nav className="ax-post__toc" aria-labelledby="post-toc-title">
                    <p id="post-toc-title" className="ax-post__aside-label">In this post</p>
                    <ol>
                      {toc.map((t) => (
                        <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>
                      ))}
                    </ol>
                  </nav>
                ) : null}
                <div className="ax-post__share">
                  <p className="ax-post__aside-label">Share</p>
                  <ul>
                    {share.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          aria-label={`Share on ${s.label}`}
                          title={s.label}
                          {...(s.label === "Email" ? null : { target: "_blank", rel: "noreferrer" })}
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">{SHARE_ICONS[s.label]}</svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <div className="ax-post__text">
                <article className="ax-prose" dangerouslySetInnerHTML={{ __html: html }} />
                <footer className="ax-post__end">
                  <p>Written by {post.author || "the AI Brigade team"}.</p>
                  <TransitionLink href="/blog" className="ax-post__back">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 12H6M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    All posts
                  </TransitionLink>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="ax-post__more" aria-labelledby="post-more-title">
          <div className="padding-global">
            <div className="container-large">
              <div className="ax-post__more-head">
                <h2 id="post-more-title" className="ax-post__more-title">Keep reading</h2>
                <TransitionLink href="/blog" className="ax-post__more-all">Every post</TransitionLink>
              </div>
              <Reveal variant="stagger" selector=".ax-post-card" as="ul" className="ax-post__more-grid">
                {related.map((p) => (
                  <li key={p.slug}><PostCard post={p} /></li>
                ))}
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
