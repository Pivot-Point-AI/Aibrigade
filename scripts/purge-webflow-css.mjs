#!/usr/bin/env node
/*
 * Rebuilds the purged copy of the Webflow shared stylesheet that
 * app/layout.jsx links.
 *
 *   npm run build && node scripts/purge-webflow-css.mjs
 *
 * RUN IT AGAIN whenever markup starts using a Webflow class it didn't use
 * before (anything from the original template: `heading-style-*`,
 * `padding-*`, `w-*`, …). The purged file only carries the rules whose
 * classes the site used when it was last generated, so a newly used class
 * would otherwise render unstyled. Build first: the prerendered HTML in
 * .next/server/app is part of what it reads.
 *
 * What it does. The Webflow sheet is 261KB, and ~80% of its rules style
 * template pages this site never had. A rule is dropped only when EVERY
 * selector in its list requires a class or id (outside :not()/:is()/…)
 * that appears nowhere in app/, components/, the prerendered HTML, or the
 * libraries that add classes at runtime (Swiper, GSAP) — i.e. when no
 * element can ever match it. Selector lists are never edited, element and
 * attribute selectors are always kept, and so are @font-face and
 * @keyframes. The three brand fonts are pointed at the self-hosted WOFF2
 * copies in public/fonts.
 *
 * Output name carries a content hash because /vendor is cached as
 * immutable (next.config.mjs); the script prints the new name — update
 * WF_SHARED_CSS in app/layout.jsx if it changed.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import postcss from "postcss"; // present via next's own dependency

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "public/vendor/webflow/fintech-auxility-ca.webflow.shared.8bf8d5ffb.min.css");
const OUT_DIR = path.join(root, "public/vendor/webflow");

const FONTS = {
  "6418357693b27039eb978364_PPNeueMachina-InktrapMedium.otf": "/fonts/PPNeueMachina-InktrapMedium.woff2",
  "6418353e9d0e377693884f52_Aeonik-Medium.otf": "/fonts/Aeonik-Medium.woff2",
  "64183533a18bb64cc9e08913_Aeonik-Regular.otf": "/fonts/Aeonik-Regular.woff2",
};

function walk(dir, exts, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, exts, acc);
    else if (exts.some((x) => e.name.endsWith(x))) acc.push(p);
  }
  return acc;
}

const html = walk(path.join(root, ".next/server/app"), [".html"]);
if (!html.length) {
  console.error("No prerendered HTML in .next/server/app — run `npm run build` first.");
  process.exit(1);
}
const files = [
  ...walk(path.join(root, "app"), [".js", ".jsx"]),
  ...walk(path.join(root, "components"), [".js", ".jsx"]),
  ...html,
  ...walk(path.join(root, "node_modules/swiper"), [".mjs"]),
  ...walk(path.join(root, "node_modules/gsap/dist"), [".js"]),
];
const tokens = new Set();
for (const f of files) for (const t of fs.readFileSync(f, "utf8").split(/[^A-Za-z0-9_-]+/)) if (t) tokens.add(t);

/* The classes and ids a selector cannot match without. Arguments of
   functional pseudo-classes are cut out first (`.a:not(.b)` still matches
   when `.b` exists nowhere), and so are attribute selectors and strings. */
const FUNCTIONAL = /:(not|is|where|has|matches|-webkit-any|-moz-any|nth-child|nth-last-child|host|host-context)\(/gi;
function required(sel) {
  let s = sel.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, "").replace(/\[[^\]]*\]/g, "");
  for (let m; (m = FUNCTIONAL.exec(s)); ) {
    let depth = 1, i = m.index + m[0].length;
    while (i < s.length && depth) { if (s[i] === "(") depth++; else if (s[i] === ")") depth--; i++; }
    s = s.slice(0, m.index) + s.slice(i);
    FUNCTIONAL.lastIndex = m.index;
  }
  return [...s.matchAll(/[.#]((?:[A-Za-z0-9_-]|\\.)+)/g)].map((m) => m[1].replace(/\\(.)/g, "$1"));
}
const canMatch = (sel) => required(sel).every((name) => tokens.has(name));

const src = fs.readFileSync(SRC, "utf8");
const ast = postcss.parse(src);
let kept = 0;
let dropped = 0;
ast.walkRules((rule) => {
  if (rule.parent?.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;
  if (rule.selectors.some(canMatch)) kept++;
  else { dropped++; rule.remove(); }
});
for (let again = true; again; ) {
  again = false;
  ast.walkAtRules((at) => {
    if (/^(media|supports)$/i.test(at.name) && !at.nodes?.length) { at.remove(); again = true; }
  });
}
ast.walkAtRules("font-face", (at) =>
  at.walkDecls("src", (d) => {
    for (const [from, to] of Object.entries(FONTS)) if (d.value.includes(from)) d.value = `url(${to}) format("woff2")`;
  })
);

const out = ast.toString();
const hash = crypto.createHash("sha1").update(out).digest("hex").slice(0, 10);
const name = `webflow.shared.purged.${hash}.css`;
for (const f of fs.readdirSync(OUT_DIR)) if (/^webflow\.shared\.purged\..*\.css$/.test(f) && f !== name) fs.rmSync(path.join(OUT_DIR, f));
fs.writeFileSync(path.join(OUT_DIR, name), out);
console.log(`${files.length} files, ${tokens.size} tokens; kept ${kept} rules, dropped ${dropped}`);
console.log(`${(src.length / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB  public/vendor/webflow/${name}`);
