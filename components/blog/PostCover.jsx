/**
 * A post's cover, drawn rather than fetched.
 *
 * The site has no editorial photography, and stock imagery is the one
 * thing guaranteed to make a firm that sells engineering read as a
 * content farm. So each cover is the dark-band material the rest of the
 * site already uses — ink, the engineering grid, a bloom — in the post's
 * category colour, with a motif per category and the post's issue number
 * set large in Neue Machina:
 *
 *   perspective  orbits — a point of view on the whole field
 *   playbook     a staircase — stages, in order
 *   engineering  a circuit — systems wired together
 *   product      a waveform — the products listen and speak
 *
 * Pure markup with no hooks, so it renders on the server and inside the
 * client-side index alike. Decorative: the title beside it carries the
 * meaning, so the whole thing is hidden from assistive technology.
 */

const MOTIFS = {
  perspective: (
    <>
      <circle cx="236" cy="96" r="30" />
      <circle cx="236" cy="96" r="58" opacity="0.6" />
      <circle cx="236" cy="96" r="86" opacity="0.32" />
      <circle cx="236" cy="96" r="4.5" className="ax-cover__dot" />
      <circle cx="294" cy="96" r="4" className="ax-cover__dot" />
      <circle cx="175" cy="38" r="3.2" className="ax-cover__dot" opacity="0.7" />
    </>
  ),
  playbook: (
    <>
      <path d="M40 168 H104 V128 H168 V88 H232 V48 H300" />
      {[
        [104, 128],
        [168, 88],
        [232, 48],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="4.5" className="ax-cover__dot" />
      ))}
      <circle cx="300" cy="48" r="6.5" className="ax-cover__dot" />
    </>
  ),
  engineering: (
    <>
      <path d="M120 40 H200 V96 H290" />
      <path d="M120 150 H176 V96" opacity="0.6" />
      <path d="M200 96 V160 H260" opacity="0.6" />
      <path d="M60 96 H176" opacity="0.32" />
      {[
        [120, 40],
        [200, 96],
        [290, 96],
        [120, 150],
        [260, 160],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x - 5} y={y - 5} width="10" height="10" rx="2" className="ax-cover__dot" />
      ))}
    </>
  ),
  product: (
    <>
      {[14, 26, 44, 30, 62, 84, 52, 70, 96, 64, 40, 58, 34, 20, 30, 12].map((h, i) => (
        <line key={i} x1={92 + i * 13} x2={92 + i * 13} y1={96 - h / 2} y2={96 + h / 2} />
      ))}
    </>
  ),
};

export default function PostCover({ post, size = "card" }) {
  return (
    <div
      className={`ax-cover ax-cover--${size}`}
      style={{ "--c": post.color }}
      data-category={post.category}
      aria-hidden="true"
    >
      <span className="ax-cover__grid" />
      <span className="ax-cover__glow" />
      <svg className="ax-cover__motif" viewBox="0 0 320 192" preserveAspectRatio="xMaxYMid meet">
        {MOTIFS[post.category]}
      </svg>
      <span className="ax-cover__cat">{post.categoryLabel}</span>
      <span className="ax-cover__n">{String(post.n).padStart(2, "0")}</span>
    </div>
  );
}
