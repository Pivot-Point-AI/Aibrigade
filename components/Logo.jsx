/* The gradient shield logo (cyan to magenta).

   Two lockups, same artwork:
   - stacked (default): shield over the wordmark, for the intro and the
     page transition where it sits alone on a dark field;
   - `horizontal`: shield beside the wordmark, for the nav and footer
     where the bar is short and wide.

   `dark` means "this sits on a light surface" (the name predates the
   gradient logo and is kept so call sites do not change). The cyan end of
   the gradient is only about 1.6:1 against white, so the horizontal lockup
   has a light-surface file (`-light`) with the same artwork and gradient,
   darkened only as far as it needs to be to read. The two are stacked and
   cross-faded, so the bar changing from dark to white does not flash. */
export default function Logo({ dark = false, horizontal = false, size = "1.5rem", className = "", priority = false }) {
  const base = horizontal ? "/logo-horizontal" : "/logo";
  const img = {
    display: "block",
    height: size,
    width: "auto",
    flexShrink: 0,
  };

  /* The stacked lockup only ever sits on dark, so it has one file. */
  if (!horizontal) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`${base}.webp`}
        alt="AIBrigade"
        className={className}
        /* `priority` is for the intro's mark, the page's largest paint: it
           should not queue behind the ticker logos and other images the
           browser finds in the same markup. */
        fetchPriority={priority ? "high" : undefined}
        style={img}
      />
    );
  }

  const fade = "opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
  return (
    <span style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${base}.webp`}
        alt="AIBrigade"
        className={className}
        style={{ ...img, opacity: dark ? 0 : 1, transition: fade }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${base}-light.webp`}
        alt=""
        aria-hidden="true"
        className={className}
        style={{ ...img, position: "absolute", inset: 0, opacity: dark ? 1 : 0, transition: fade }}
      />
    </span>
  );
}
