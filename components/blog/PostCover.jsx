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
 * Each category has two layouts, picked by `post.variant` (the post's
 * place within its category, blog.data.js), and a third post in one
 * category draws the first layout mirrored — so posts that share a
 * category never share a cover.
 *
 * Pure markup with no hooks, so it renders on the server and inside the
 * client-side index alike. Decorative: the title beside it carries the
 * meaning, so the whole thing is hidden from assistive technology.
 */

const dots = (points, r = 4.5) =>
  points.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r} className="ax-cover__dot" />);

const chips = (points) =>
  points.map(([x, y]) => (
    <rect key={`${x}-${y}`} x={x - 5} y={y - 5} width="10" height="10" rx="2" className="ax-cover__dot" />
  ));

const bars = (heights, x0 = 92, step = 13) =>
  heights.map((h, i) => <line key={i} x1={x0 + i * step} x2={x0 + i * step} y1={96 - h / 2} y2={96 + h / 2} />);

const MOTIFS = {
  perspective: [
    <>
      <circle cx="226" cy="96" r="30" />
      <circle cx="226" cy="96" r="58" opacity="0.6" />
      <circle cx="226" cy="96" r="86" opacity="0.32" />
      {dots([[226, 96], [284, 96]])}
      <circle cx="165" cy="38" r="3.2" className="ax-cover__dot" opacity="0.7" />
    </>,
    <>
      <ellipse cx="220" cy="96" rx="92" ry="30" transform="rotate(-18 220 96)" />
      <ellipse cx="220" cy="96" rx="92" ry="30" transform="rotate(42 220 96)" opacity="0.6" />
      <ellipse cx="220" cy="96" rx="92" ry="30" transform="rotate(102 220 96)" opacity="0.32" />
      {dots([[220, 96]], 6)}
      {dots([[305, 68], [168, 170]], 3.6)}
    </>,
  ],
  playbook: [
    <>
      <path d="M40 168 H104 V128 H168 V88 H232 V48 H300" />
      {dots([[104, 128], [168, 88], [232, 48]])}
      {dots([[300, 48]], 6.5)}
    </>,
    <>
      <path d="M60 164 L120 124 L180 124 L240 70 L300 70" />
      <path d="M60 164 H300" opacity="0.28" strokeDasharray="3 7" />
      {dots([[120, 124], [180, 124], [240, 70]])}
      {dots([[300, 70]], 6.5)}
    </>,
  ],
  engineering: [
    <>
      <path d="M120 40 H200 V96 H290" />
      <path d="M120 150 H176 V96" opacity="0.6" />
      <path d="M200 96 V160 H260" opacity="0.6" />
      <path d="M60 96 H176" opacity="0.32" />
      {chips([[120, 40], [200, 96], [290, 96], [120, 150], [260, 160]])}
    </>,
    <>
      <path d="M80 150 H150 V56 H240 V120 H296" />
      <path d="M150 104 H200" opacity="0.6" />
      <path d="M240 120 V168" opacity="0.6" />
      <path d="M40 56 H150" opacity="0.32" />
      {chips([[80, 150], [150, 56], [240, 120], [296, 120], [200, 104], [240, 168]])}
    </>,
  ],
  product: [
    <>{bars([14, 26, 44, 30, 62, 84, 52, 70, 96, 64, 40, 58, 34, 20, 30, 12])}</>,
    <>{bars([10, 18, 30, 52, 76, 100, 76, 52, 30, 44, 66, 44, 26, 16, 10], 96, 14)}</>,
  ],
};

export default function PostCover({ post, size = "card" }) {
  const layouts = MOTIFS[post.category];
  const v = post.variant || 0;
  const mirrored = v >= layouts.length;

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
        <g transform={mirrored ? "translate(320 0) scale(-1 1)" : undefined}>{layouts[v % layouts.length]}</g>
      </svg>
      <span className="ax-cover__cat">{post.categoryLabel}</span>
      <span className="ax-cover__n">{String(post.n).padStart(2, "0")}</span>
    </div>
  );
}
