export default function Logo({ dark = false, size = "1.5rem", className = "", priority = false }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.webp"
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
        filter: dark ? "invert(1)" : "none",
      }}
    />
  );
}
