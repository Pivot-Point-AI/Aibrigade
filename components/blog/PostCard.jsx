import TransitionLink from "@/components/TransitionLink";
import PostCover from "@/components/blog/PostCover";

const ARROW = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 12h13M13 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * One post in a list — /blog's grid and "Keep reading" under a post.
 * `post` is the card shape from `postCard()` in components/blog.data.js.
 *
 * The whole card is the link: a reader aims at the cover or the title,
 * rarely at a "read more" line, and one link per card is one tab stop
 * rather than three. `as` sets the title's level for the list it sits in.
 * `layout="row"` puts the cover beside the text (the /blog index);
 * the default stacks it above (the "Keep reading" row under a post).
 */
export default function PostCard({ post, as: Title = "h3", layout = "stack" }) {
  return (
    <article className={`ax-post-card ax-post-card--${layout}`} style={{ "--c": post.color }}>
      <TransitionLink href={post.href} className="ax-post-card__link">
        <PostCover post={post} />
        <div className="ax-post-card__body">
          <p className="ax-post-card__meta">
            <span className="ax-post-card__cat">{post.categoryLabel}</span>
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span>{post.minutes} min read</span>
          </p>
          <Title className="ax-post-card__title">{post.title}</Title>
          <p className="ax-post-card__dek">{post.dek}</p>
          <span className="ax-post-card__more">
            Read the post
            {ARROW}
          </span>
        </div>
      </TransitionLink>
    </article>
  );
}

export { ARROW };
