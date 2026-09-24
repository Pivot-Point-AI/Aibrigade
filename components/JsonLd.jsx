/**
 * One JSON-LD graph as a <script> tag. The nodes come from
 * components/seo.js; empty entries are dropped so callers can pass
 * conditionals.
 *
 * Serialising our own build-time data, never anything a visitor
 * supplied. The escape keeps a literal "</script>" in future copy from
 * closing the tag early.
 */
export default function JsonLd({ graph }) {
  const data = { "@context": "https://schema.org", "@graph": graph.flat().filter(Boolean) };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
