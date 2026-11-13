/* The gradient shield logo (cyan to magenta). It reads on both the dark hero
   and the light scrolled bar, so it is never inverted.

   Two lockups, same artwork:
   - stacked (default): shield over the wordmark, for the intro and the
     page transition where it sits alone on a dark field;
   - `horizontal`: shield beside the wordmark, for the nav and footer
     where the bar is short and wide.

   `dark` is kept in the signature so older call sites keep working. */
// eslint-disable-next-line no-unused-vars
export default function Logo({ dark = false, horizontal = false, size = "1.5rem", className = "", priority = false }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={horizontal ? "/logo-horizontal.webp" : "/logo.webp"}
      alt="AIBrigade"
      className={className}
      /* `priority` is for the intro's mark, the page's largest paint: it
         should not queue behind the ticker logos and other images the
         browser finds in the same markup. */
      fetchPriority={priority ? "high" : undefined}
      style={{
        display: "block",
        height: size,
        width: "auto",
        flexShrink: 0,
      }}
    />
  );
}
