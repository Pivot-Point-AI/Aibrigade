import MaskHeading from "@/components/motion/MaskHeading";
import Reveal from "@/components/motion/Reveal";
import TransitionLink from "@/components/TransitionLink";
import PostCover from "@/components/blog/PostCover";
import PostCard from "@/components/blog/PostCard";
import { BLOG_AUTHOR, formatDate, slugify, postCard } from "@/components/blog.data";
import { absoluteUrl } from "@/components/site.data";

/**
 * /blog/<slug>, page body. A server component: the post is static text,
 * and only the pieces that move (MaskHeading, Reveal) or navigate through
 * the page transition (TransitionLink) are client components.
 *
 * Layout: the ink band the site's inner pages open with, carrying the
 * headline and the post's cover; then the text on white in a reading
 * column, with the contents and share links beside it. Not sticky —
 * `position: sticky` cannot work anywhere on this site while `body` is
 * `overflow-x: hidden` — so the contents sit at the top of the column,
 * where they are read before the post rather than beside it.
 */

/* **bold** and [label](href), nothing else. Internal links go through the
   page transition; anything absolute opens in a new tab. */
const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;
const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

function Inline({ text }) {
  return String(text)
    .split(INLINE)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      const link = part.match(LINK);
      if (link) {
        const [, label, href] = link;
        return /^https?:\/\//.test(href) ? (
          <a key={i} href={href} target="_blank" rel="noreferrer">
            {label}
          </a>
        ) : (
          <TransitionLink key={i} href={href}>
            {label}
          </TransitionLink>
        );
      }
      return part;
    });
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 id={slugify(block.text)}>
          <Inline text={block.text} />
        </h2>
      );
    case "ul":
    case "ol": {
      const List = block.type;
      return (
        <List>
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "steps":
      return (
        <ol className="ax-prose__steps">
          {block.items.map((s, i) => (
            <li key={s.name}>
              <span className="ax-prose__step-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{s.name}</h3>
                <p>
                  <Inline text={s.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <aside className="ax-prose__note">
          <p className="ax-prose__note-title">{block.title}</p>
          <p>
            <Inline text={block.text} />
          </p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="ax-prose__quote">
          <p>
            <Inline text={block.text} />
          </p>
        </blockquote>
      );
    default:
      return (
        <p>
          <Inline text={block.text} />
        </p>
      );
  }
}

const SHARE_ICONS = {
  LinkedIn: (
    <>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  /* The footer's mark for the same account (components/Footer.jsx). */
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

export default function BlogArticle({ post, related }) {
  const url = absoluteUrl(post.href);
  const share = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${post.dek}\n\n${url}`)}`,
    },
  ];

  return (
    <main className="ax-post" style={{ "--c": post.color }}>
      {/* ---------- hero ---------- */}
      <section className="ax-post__hero">
        <span className="ax-post__hero-grid" aria-hidden="true" />
        <span className="ax-post__hero-glow" aria-hidden="true" />
        <div className="padding-global">
          <div className="container-large">
            <nav className="ax-post__crumbs" aria-label="Breadcrumb">
              <ol>
                <li>
                  <TransitionLink href="/blog">Blog</TransitionLink>
                </li>
                <li>
                  <span aria-current="page">{post.categoryLabel}</span>
                </li>
              </ol>
            </nav>

            <div className="ax-post__hero-layout">
              <div className="ax-post__hero-copy">
                <h1 className="ax-post__title">
                  <MaskHeading text={post.title} />
                </h1>
                <Reveal variant="rise" delay={0.2} immediate className="ax-post__dek">
                  <p>{post.dek}</p>
                </Reveal>
                <Reveal variant="rise" delay={0.3} immediate className="ax-post__byline">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand-mark.png" alt="" width="40" height="40" className="ax-post__avatar" />
                  <span>
                    <strong>{BLOG_AUTHOR}</strong>
                    <span>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span aria-hidden="true"> · </span>
                      {post.minutes} min read
                    </span>
                  </span>
                </Reveal>
              </div>
              <Reveal variant="clip" immediate className="ax-post__hero-cover">
                <PostCover post={post} size="hero" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- the post ---------- */}
      <section className="ax-post__body">
        <div className="padding-global">
          <div className="container-large">
            <div className="ax-post__layout">
              <aside className="ax-post__aside">
                {post.toc.length > 1 ? (
                  <nav className="ax-post__toc" aria-labelledby="post-toc-title">
                    <p id="post-toc-title" className="ax-post__aside-label">
                      In this post
                    </p>
                    <ol>
                      {post.toc.map((t) => (
                        <li key={t.id}>
                          <TransitionLink href={`#${t.id}`}>{t.text}</TransitionLink>
                        </li>
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
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            {SHARE_ICONS[s.label]}
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <article className="ax-prose">
                {post.body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}

                <footer className="ax-post__end">
                  <p>
                    Written by the {BLOG_AUTHOR} team
                    {post.updated ? (
                      <>
                        {" "}
                        · updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                      </>
                    ) : null}
                    .
                  </p>
                  <TransitionLink href="/blog" className="ax-post__back">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M19 12H6M11 6l-6 6 6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    All posts
                  </TransitionLink>
                </footer>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- keep reading ---------- */}
      {related.length ? (
        <section className="ax-post__more" aria-labelledby="post-more-title">
          <div className="padding-global">
            <div className="container-large">
              <div className="ax-post__more-head">
                <h2 id="post-more-title" className="ax-post__more-title">
                  Keep reading
                </h2>
                <TransitionLink href="/blog" className="ax-post__more-all">
                  Every post
                </TransitionLink>
              </div>
              <Reveal variant="stagger" selector=".ax-post-card" as="ul" className="ax-post__more-grid">
                {related.map((p) => (
                  <li key={p.slug}>
                    <PostCard post={postCard(p)} />
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
