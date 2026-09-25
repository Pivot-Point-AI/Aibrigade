#!/usr/bin/env node
/**
 * Whole-site QA sweep: the automated half of the site-qa agent
 * (.claude/agents/site-qa.md). It reports; it never changes the site.
 *
 *   node .claude/qa/site-check.mjs --setup          one-time: playwright-core into the deps dir
 *   node .claude/qa/site-check.mjs [options]
 *
 *   --base URL          site to test (default http://localhost:3000)
 *   --routes /a,/b      only these paths (default: every sitemap URL + a 404 probe)
 *   --viewports list    presets mobile,tablet,laptop,desktop (default all four) or WxH
 *   --out DIR           where report.json, summary.md and shots/ go
 *                       (default <deps dir>/runs/<timestamp>)
 *   --screens N         screenshot pieces are N viewports tall (default 2)
 *   --no-shots          skip screenshots
 *   --no-flows          skip the scripted flows (contact form, drawer, keyboard, transition)
 *   --external          also check links to other sites
 *   --reduced-motion    emulate prefers-reduced-motion: reduce throughout
 *   --concurrency N     pages open at once (default 3)
 *
 * What it checks:
 *   static   robots.txt, sitemap.xml (and the images/videos it lists), llms.txt,
 *            the legacy redirects, a real 404, /api/contact's refusals
 *   pages    every route x viewport: HTTP status, JS errors, console errors,
 *            failed requests, sideways scroll, stuck overlays or scroll lock,
 *            text under 12px, broken images and videos, missing alt, unnamed
 *            controls, unlabelled inputs, duplicate ids, headings, small touch
 *            targets, then segmented full-page screenshots
 *   seo      title, description, canonical, Open Graph, Twitter card, JSON-LD,
 *            lang, duplicates across pages, the OG images themselves
 *   links    every internal link (and #anchor) found on any page or in llms.txt
 *   flows    contact form (validation, success, failure), the mobile drawer,
 *            keyboard focus on the home page, a page transition and Back
 *
 * CONTACT SAFETY: a /api/contact POST that passes validation sends real
 * email to the team. This script never sends one. The browser flow
 * intercepts every /api/contact request with page.route() and answers it
 * itself, and the direct API probes send only payloads that fail
 * validation or trip the honeypot (which is also missing every required
 * field, so if the honeypot were ever removed the probe gets a 422, not
 * a delivery). Keep it that way.
 */
import fs from "node:fs";
import path from "node:path";
import {
  DEPS_DIR,
  PROD_ORIGIN,
  HIDE_FOR_SHOTS,
  goto,
  launch,
  openPage,
  screenshotPage,
  scrollThrough,
  setupDeps,
  slugOf,
  viewport,
  waitForIntro,
} from "./qa-lib.mjs";

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : fallback;
};

if (flag("setup")) {
  setupDeps();
  console.log(`Ready: playwright-core in ${DEPS_DIR}`);
  process.exit(0);
}

const BASE = opt("base", "http://localhost:3000").replace(/\/$/, "");
const BASE_ORIGIN = new URL(BASE).origin;
const VPS = opt("viewports", "mobile,tablet,laptop,desktop")
  .split(",")
  .map((s) => viewport(s.trim()));
const SHOTS = !flag("no-shots");
const SCREENS = Number(opt("screens", 2));
const FLOWS = !flag("no-flows");
const EXTERNAL = flag("external");
const REDUCED = flag("reduced-motion");
const CONCURRENCY = Number(opt("concurrency", 3));
const STAMP = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const OUT = path.resolve(opt("out", path.join(DEPS_DIR, "runs", STAMP)));
const MISSING = "/qa-missing-page";
const LEGACY = ["/halyk", "/icu", "/uub", "/demos"];
/* Console warnings that come from this machine, not the site: ANGLE's
   D3D shader compiler on Windows chatters about float precision in
   three.js programs. */
const NOISE = /warning X\d{4}:|THREE\.WebGLProgram: Program Info Log/;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36 aibrigade-qa";

fs.mkdirSync(OUT, { recursive: true });

/* ------------------------------------------------------------------ */
/* Findings                                                            */
/* ------------------------------------------------------------------ */

const issues = [];
const passed = [];
/** severity: fail | warn | info */
const add = (severity, category, route, message, { vp = null, detail = null, key = null } = {}) =>
  issues.push({ severity, category, route, vp, message, key: key || message, detail });

const report = {
  base: BASE,
  startedAt: new Date().toISOString(),
  viewports: VPS.map((v) => v.name),
  reducedMotion: REDUCED,
  static: {},
  pages: [],
  seo: {},
  links: {},
  flows: {},
};

/* ------------------------------------------------------------------ */
/* HTTP helpers                                                        */
/* ------------------------------------------------------------------ */

const isOwn = (u) => {
  try {
    const x = new URL(u, BASE);
    return x.origin === BASE_ORIGIN || x.origin === PROD_ORIGIN;
  } catch {
    return false;
  }
};
/** Same path on the site under test (prod URLs are rewritten to BASE). */
const onBase = (u) => {
  const x = new URL(u, BASE);
  return isOwn(u) ? BASE + x.pathname + x.search : x.href;
};
const decodeXml = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'");

async function request(url, { method = "GET", body, headers = {}, timeout = 90000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    return await fetch(url, {
      method,
      body,
      redirect: "manual",
      signal: ctrl.signal,
      headers: { "user-agent": UA, ...headers },
    });
  } finally {
    clearTimeout(t);
  }
}

/** Follows redirects by hand so each hop is recorded. HEAD, falling back to GET. */
async function follow(url, { method = "HEAD", timeout } = {}) {
  const chain = [];
  let current = url;
  for (let hop = 0; hop < 6; hop++) {
    let res;
    try {
      res = await request(current, { method, timeout });
      if (method === "HEAD" && [403, 405, 501].includes(res.status)) {
        res = await request(current, { method: "GET", timeout });
        res.body?.cancel?.();
      }
    } catch (e) {
      chain.push({ url: current, error: e.name === "AbortError" ? "timeout" : String(e.cause?.code || e.message) });
      return { chain, status: null, error: chain.at(-1).error, final: current };
    }
    const loc = res.headers.get("location");
    chain.push({ url: current, status: res.status, ...(loc ? { location: loc } : null) });
    if (res.status >= 300 && res.status < 400 && loc) {
      const next = new URL(loc, current).href;
      current = isOwn(next) ? onBase(next) : next;
      continue;
    }
    return { chain, status: res.status, final: current, type: res.headers.get("content-type") };
  }
  return { chain, status: null, error: "too many redirects", final: current };
}

async function pool(items, size, fn) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: Math.min(size, queue.length) }, async () => {
      while (queue.length) await fn(queue.shift());
    })
  );
}

/* ------------------------------------------------------------------ */
/* Static checks                                                       */
/* ------------------------------------------------------------------ */

const linkSources = new Map(); // internal path(+hash) -> Set of "where found"
const externalSources = new Map();
const noteLink = (href, from) => {
  if (!/^https?:/i.test(href)) return;
  const own = isOwn(href);
  const x = new URL(href);
  const key = own ? x.pathname + x.search + x.hash : x.href;
  const map = own ? linkSources : externalSources;
  if (!map.has(key)) map.set(key, new Set());
  map.get(key).add(from);
};

async function staticChecks() {
  const s = report.static;

  // robots.txt
  const robots = await request(`${BASE}/robots.txt`);
  const robotsText = robots.ok ? await robots.text() : "";
  s.robots = { status: robots.status, sitemap: /^sitemap:\s*(\S+)/im.exec(robotsText)?.[1] || null };
  if (robots.status !== 200) add("fail", "seo", "/robots.txt", `robots.txt answered ${robots.status}`);
  else if (!s.robots.sitemap) add("warn", "seo", "/robots.txt", "robots.txt does not name a sitemap");
  else if (s.robots.sitemap !== `${PROD_ORIGIN}/sitemap.xml`)
    add("warn", "seo", "/robots.txt", `robots.txt points crawlers at ${s.robots.sitemap}`);
  else passed.push("robots.txt is served and names the canonical sitemap");

  // sitemap.xml
  const sm = await request(`${BASE}/sitemap.xml`);
  const xml = sm.ok ? await sm.text() : "";
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decodeXml(m[1].trim()));
  const assets = [
    ...xml.matchAll(/<(image:loc|video:thumbnail_loc|video:content_loc)>([^<]+)<\/\1>/g),
  ].map((m) => decodeXml(m[2].trim()));
  s.sitemap = { status: sm.status, urls: locs.length, assets: assets.length };
  if (sm.status !== 200 || !locs.length) {
    add("fail", "seo", "/sitemap.xml", `sitemap.xml answered ${sm.status} with ${locs.length} URLs`);
  } else {
    const foreign = locs.filter((u) => !u.startsWith(PROD_ORIGIN));
    if (foreign.length)
      add("fail", "seo", "/sitemap.xml", `${foreign.length} sitemap URL(s) are not on ${PROD_ORIGIN}`, { detail: foreign });
    const dupes = locs.filter((u, i) => locs.indexOf(u) !== i);
    if (dupes.length) add("warn", "seo", "/sitemap.xml", "Sitemap lists a URL twice", { detail: dupes });
    passed.push(`sitemap.xml lists ${locs.length} URLs and ${assets.length} media files`);
  }
  s.sitemap.assetResults = {};
  await pool([...new Set(assets)], 4, async (a) => {
    const r = await follow(onBase(a));
    s.sitemap.assetResults[a] = r.status ?? r.error;
    if (r.status !== 200)
      add("fail", "seo", "/sitemap.xml", `Sitemap media ${new URL(a).pathname} answered ${r.status ?? r.error}`);
  });

  // llms.txt, llms-full.txt
  s.llms = {};
  for (const p of ["/llms.txt", "/llms-full.txt"]) {
    const r = await request(BASE + p);
    const text = r.ok ? await r.text() : "";
    s.llms[p] = { status: r.status, type: r.headers.get("content-type"), bytes: text.length };
    if (r.status !== 200 || text.length < 200) add("fail", "seo", p, `${p} answered ${r.status}, ${text.length} bytes`);
    else passed.push(`${p} is served (${Math.round(text.length / 1024)} KB)`);
    for (const m of text.matchAll(/https?:\/\/[^\s)<>\]"'`]+/g)) noteLink(m[0].replace(/[.,;:]+$/, ""), p);
  }

  // Legacy routes must redirect, not 404.
  s.redirects = {};
  for (const p of LEGACY) {
    const r = await follow(BASE + p);
    const first = r.chain[0] || {};
    s.redirects[p] = { status: first.status, location: first.location || null, finalStatus: r.status };
    if (!(first.status >= 300 && first.status < 400))
      add("fail", "redirects", p, `Legacy route answered ${first.status ?? r.error}, expected a redirect`);
    else if (r.status !== 200)
      add("fail", "redirects", p, `Redirects to ${first.location}, which answers ${r.status ?? r.error}`);
    else passed.push(`${p} → ${first.location} (${first.status})`);
  }

  // A missing page must be a real 404.
  const miss = await request(BASE + MISSING);
  s.notFound = { status: miss.status };
  if (miss.status !== 404) add("fail", "http", MISSING, `A missing page answered ${miss.status}, not 404`);
  else passed.push("Missing pages answer 404");

  // /api/contact refusals. None of these can deliver mail — see CONTACT SAFETY.
  const api = `${BASE}/api/contact`;
  const json = { "content-type": "application/json" };
  const probes = [
    { name: "GET is refused", method: "GET", expect: [405] },
    { name: "malformed JSON is a 400", method: "POST", body: "{not json", headers: json, expect: [400] },
    {
      name: "empty submission is a 422 naming each field",
      method: "POST",
      body: "{}",
      headers: json,
      expect: [422],
      check: (j) => ["name", "email", "message", "consent"].every((k) => j?.errors && k in j.errors),
    },
    {
      name: "a filled honeypot is a silent 200",
      method: "POST",
      body: JSON.stringify({ website: "https://qa-bot.example", name: "", email: "", message: "", consent: false }),
      headers: json,
      expect: [200],
      check: (j) => j?.ok === true,
    },
  ];
  s.api = {};
  for (const p of probes) {
    let status, body;
    try {
      const r = await request(api, p);
      status = r.status;
      body = await r.json().catch(() => null);
    } catch (e) {
      status = String(e.message);
    }
    const ok = p.expect.includes(status) && (!p.check || p.check(body));
    s.api[p.name] = { status, body, ok };
    if (ok) passed.push(`/api/contact: ${p.name}`);
    else add("fail", "api", "/api/contact", `${p.name}: got ${status}`, { detail: body });
  }

  return locs.map((u) => new URL(u).pathname);
}

/* ------------------------------------------------------------------ */
/* Per-page audit (runs inside the page)                               */
/* ------------------------------------------------------------------ */

function auditInPage({ touch }) {
  const vw = document.documentElement.clientWidth;
  const vh = innerHeight;
  const sel = (el) => {
    const parts = [];
    for (let e = el, i = 0; e && e.nodeType === 1 && i < 4; e = e.parentElement, i++) {
      let s = e.tagName.toLowerCase();
      if (e.id) {
        parts.unshift(`${s}#${e.id}`);
        break;
      }
      const cls = [...e.classList].filter((c) => !/^(is-|w-)/.test(c)).slice(0, 2);
      if (cls.length) s += "." + cls.join(".");
      parts.unshift(s);
    }
    return parts.join(" > ");
  };
  const text = (el, n = 60) => (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, n);
  // Laid out AND visible: closed menus here are opacity 0, not display none.
  const shown = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return false;
    return el.checkVisibility({ opacityProperty: true, visibilityProperty: true });
  };
  const accName = (el) => {
    const label = el.getAttribute("aria-label");
    if (label && label.trim()) return label.trim();
    const by = el.getAttribute("aria-labelledby");
    if (by) {
      const t = by
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent || "")
        .join(" ")
        .trim();
      if (t) return t;
    }
    const own = (el.innerText || el.textContent || "").trim();
    if (own) return own;
    const img = el.querySelector("img[alt]");
    if (img && img.alt.trim()) return img.alt.trim();
    const t = el.querySelector("svg title");
    if (t && t.textContent.trim()) return t.textContent.trim();
    return (el.getAttribute("title") || "").trim();
  };
  const all = [...document.body.querySelectorAll("*")];

  // Sideways overflow. docOverflow is the page itself scrolling sideways;
  // offenders are elements past the edge that only html/body clip, which
  // still pans on some phones and hides real layout bugs.
  const docOverflow = document.documentElement.scrollWidth - vw;
  const clipsX = (e) => ["hidden", "clip", "auto", "scroll"].includes(getComputedStyle(e).overflowX);
  const offenderEls = [];
  const offenders = [];
  for (const el of all) {
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    const over = Math.max(r.right - vw, -r.left);
    if (over <= 2) continue;
    if (offenderEls.some((o) => o.contains(el))) continue;
    const cs = getComputedStyle(el);
    if (cs.position === "fixed" || cs.visibility === "hidden") continue;
    let clipped = false;
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      // A clipping ancestor is deliberate; a fixed one (the custom cursor)
      // moves with the pointer and never widens the page.
      if (clipsX(p) || getComputedStyle(p).position === "fixed") {
        clipped = true;
        break;
      }
    }
    if (clipped) continue;
    offenderEls.push(el);
    if (offenders.length < 12) offenders.push({ sel: sel(el), overPx: Math.round(over), width: Math.round(r.width) });
  }

  // Text below 12px.
  const small = new Map();
  const seen = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = walker.nextNode()); ) {
    if (!n.nodeValue.trim()) continue;
    const el = n.parentElement;
    if (!el || seen.has(el) || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(el.tagName)) continue;
    seen.add(el);
    const px = parseFloat(getComputedStyle(el).fontSize);
    if (px >= 12 || !shown(el)) continue;
    const key = `${sel(el)}|${px}`;
    if (!small.has(key)) small.set(key, { sel: sel(el), px: Math.round(px * 10) / 10, sample: text(el, 40), count: 0 });
    small.get(key).count++;
  }
  const smallText = [...small.values()].sort((a, b) => a.px - b.px).slice(0, 40);
  const smallTextTotal = small.size;

  // Media.
  const imgs = [...document.images];
  const brokenImages = imgs.filter((i) => i.complete && i.currentSrc && i.naturalWidth === 0).map((i) => i.currentSrc);
  const missingAlt = imgs.filter((i) => !i.hasAttribute("alt")).map((i) => i.currentSrc || i.src || sel(i));
  const videos = [...document.querySelectorAll("video")];
  const videoErrors = videos
    .filter((v) => v.error || (v.networkState === 3 && (v.currentSrc || v.querySelector("source"))))
    .map((v) => ({ src: v.currentSrc || v.querySelector("source")?.src, code: v.error?.code ?? "no-source" }));

  // Links and controls.
  const anchors = [...document.querySelectorAll("a[href]")];
  const links = anchors.map((a) => ({ href: a.href, text: text(a, 50) || accName(a).slice(0, 50) }));
  const badHrefs = anchors
    .filter((a) => {
      const h = (a.getAttribute("href") || "").trim();
      return !h || h === "#" || /^javascript:/i.test(h);
    })
    .map((a) => sel(a));
  const controls = [...document.querySelectorAll('a[href], button, [role="button"], summary')].filter(shown);
  const unnamed = controls.filter((el) => !accName(el)).map((el) => sel(el)).slice(0, 20);
  const hiddenFocusable = [
    ...document.querySelectorAll(
      '[aria-hidden="true"] a[href], [aria-hidden="true"] button, [aria-hidden="true"] input, [aria-hidden="true"] [tabindex]'
    ),
  ]
    .filter((el) => el.tabIndex >= 0 && !el.closest("[inert]") && shown(el))
    .map((el) => sel(el))
    .slice(0, 15);
  const fields = [...document.querySelectorAll('input:not([type="hidden"]), select, textarea')];
  const unlabelled = fields
    .filter((f) => !(f.labels && f.labels.length) && !f.getAttribute("aria-label") && !f.getAttribute("aria-labelledby"))
    .map((f) => sel(f));

  // Touch targets under 24px (WCAG 2.2 AA), inline text links exempt.
  const smallTargets = touch
    ? controls
        .filter((el) => {
          const r = el.getBoundingClientRect();
          if (r.width >= 24 && r.height >= 24) return false;
          return !(el.tagName === "A" && getComputedStyle(el).display === "inline");
        })
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { sel: sel(el), size: `${Math.round(r.width)}x${Math.round(r.height)}`, name: accName(el).slice(0, 30) };
        })
        .slice(0, 20)
    : [];

  // ids and headings.
  const idCount = {};
  for (const el of document.querySelectorAll("[id]")) idCount[el.id] = (idCount[el.id] || 0) + 1;
  const duplicateIds = Object.keys(idCount).filter((k) => idCount[k] > 1);
  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
    .filter((h) => getComputedStyle(h).display !== "none")
    .map((h) => ({ level: +h.tagName[1], text: text(h, 70) }));
  const h1 = headings.filter((h) => h.level === 1).map((h) => h.text);
  const headingSkips = [];
  headings.forEach((h, i) => {
    if (i && h.level > headings[i - 1].level + 1)
      headingSkips.push(`h${headings[i - 1].level} → h${h.level} ("${h.text}")`);
  });

  // Anything still covering the page, or a leftover scroll lock.
  const probe = document.elementFromPoint(vw / 2, vh / 2);
  const cover = probe?.closest?.(".ax-intro, .ax-wipe, .ax-nav__drawer, .ax-nav__scrim");
  const overlay = cover ? sel(cover) : null;
  const locked = [document.documentElement, document.body].some((e) => getComputedStyle(e).overflowY === "hidden");

  // Head.
  const meta = (q) => document.querySelector(q)?.getAttribute("content") ?? null;
  const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
    try {
      const data = JSON.parse(s.textContent);
      const types = [];
      const walk = (o) => {
        if (Array.isArray(o)) return o.forEach(walk);
        if (o && typeof o === "object") {
          if (o["@type"]) types.push([].concat(o["@type"]).join("/"));
          if (o["@graph"]) walk(o["@graph"]);
        }
      };
      walk(data);
      return { ok: true, types };
    } catch (e) {
      return { ok: false, error: String(e.message).slice(0, 120) };
    }
  });
  const nav = performance.getEntriesByType("navigation")[0];

  return {
    head: {
      title: document.title,
      description: meta('meta[name="description"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      robots: meta('meta[name="robots"]'),
      viewport: meta('meta[name="viewport"]'),
      lang: document.documentElement.lang || null,
      ogTitle: meta('meta[property="og:title"]'),
      ogDescription: meta('meta[property="og:description"]'),
      ogImage: meta('meta[property="og:image"]'),
      ogUrl: meta('meta[property="og:url"]'),
      twitterCard: meta('meta[name="twitter:card"]'),
      twitterImage: meta('meta[name="twitter:image"]'),
      jsonld,
    },
    height: document.documentElement.scrollHeight,
    timing: nav ? { dcl: Math.round(nav.domContentLoadedEventEnd), load: Math.round(nav.loadEventEnd) } : null,
    docOverflow,
    offenders,
    smallText,
    smallTextTotal,
    brokenImages,
    missingAlt,
    videoCount: videos.length,
    videoErrors,
    links,
    badHrefs,
    unnamed,
    hiddenFocusable,
    unlabelled,
    smallTargets,
    duplicateIds,
    headings: headings.length,
    h1,
    headingSkips,
    overlay,
    locked,
    ids: Object.keys(idCount),
  };
}

/* ------------------------------------------------------------------ */
/* Crawl                                                               */
/* ------------------------------------------------------------------ */

const idsByRoute = {};
const headByRoute = {};

async function crawl(browser, routes) {
  const tasks = routes.flatMap((route) => VPS.map((vp) => ({ route, vp })));
  let done = 0;
  await pool(tasks, CONCURRENCY, async ({ route, vp }) => {
    const page = await openPage(browser, vp, { reducedMotion: REDUCED ? "reduce" : "no-preference" });
    const rec = { route, viewport: vp.name };
    try {
      const res = await goto(page, BASE + route);
      rec.status = res?.status() ?? null;
      await scrollThrough(page);
      const audit = await page.evaluate(auditInPage, { touch: !!vp.hasTouch });
      idsByRoute[route] = [...new Set([...(idsByRoute[route] || []), ...audit.ids])];
      if (!headByRoute[route] || vp.name === "desktop") headByRoute[route] = audit.head;
      for (const l of audit.links) noteLink(l.href, route);
      delete audit.ids;
      audit.links = audit.links.length;
      rec.audit = audit;
      if (SHOTS) {
        const files = await screenshotPage(page, path.join(OUT, "shots", slugOf(route), vp.name), { screens: SCREENS });
        rec.shots = files.map((f) => path.relative(OUT, f).replace(/\\/g, "/"));
      }
    } catch (e) {
      rec.error = String(e?.message || e).split("\n")[0].slice(0, 300);
    }
    rec.runtime = page.qa;
    await page.context().close();
    report.pages.push(rec);
    done++;
    console.log(`  [${done}/${tasks.length}] ${vp.name.padEnd(8)} ${route}${rec.error ? `  ERROR ${rec.error}` : ""}`);
  });
}

function judgePage(rec) {
  const { route, viewport: vp } = rec;
  const o = { vp };
  const expect404 = route === MISSING;
  if (rec.error) add("fail", "load", route, `Page failed to load or audit: ${rec.error}`, { ...o, key: "load-error" });
  if (rec.status != null && rec.status !== (expect404 ? 404 : 200))
    add("fail", "http", route, `Document answered ${rec.status}`, o);

  const rt = rec.runtime || { pageErrors: [], console: [], failed: [], httpErrors: [] };
  for (const e of new Set(rt.pageErrors))
    add("fail", "js-error", route, e.split("\n")[0], { ...o, detail: e });
  const docUrl = BASE + route;
  const errs = rt.console.filter(
    (c) => c.type === "error" && !(expect404 && /status of 404/.test(c.text))
  );
  for (const t of new Set(errs.map((c) => c.text))) add("fail", "console-error", route, t.slice(0, 240), o);
  for (const t of new Set(rt.console.filter((c) => c.type === "warning" && !NOISE.test(c.text)).map((c) => c.text)))
    add("warn", "console-warning", route, t.slice(0, 240), o);
  for (const f of rt.failed.filter((f) => !f.routine))
    add(isOwn(f.url) ? "fail" : "warn", "network", route, `${f.type} request failed (${f.failure}): ${f.url}`, o);
  for (const h of rt.httpErrors) {
    if (expect404 && h.url.startsWith(docUrl)) continue;
    add(isOwn(h.url) ? "fail" : "warn", "network", route, `${h.status} for ${h.type} ${h.url}`, o);
  }

  const a = rec.audit;
  if (!a) return;
  if (a.docOverflow > 1)
    add("fail", "layout", route, `Page scrolls sideways by ${a.docOverflow}px`, { ...o, key: "doc-overflow", detail: a.offenders });
  else if (a.offenders.length)
    add("warn", "layout", route, "Elements run past the viewport edge, clipped only by html/body", {
      ...o,
      key: "offenders",
      detail: a.offenders,
    });
  if (a.overlay) add("fail", "overlay", route, `${a.overlay} still covers the page after load`, o);
  if (a.locked) add("fail", "scroll", route, "Page scroll is still locked (overflow hidden on html/body) after load", o);
  if (a.smallText.length) {
    // Under 9px is unreadable, not merely small: that is a bare rem label
    // on the fluid root (≈9.6px at 1024), and it is always a real defect.
    const min = a.smallText[0].px;
    add(
      min < 9 ? "fail" : "warn",
      "readability",
      route,
      `${a.smallTextTotal} text style(s) below 12px, smallest ${min}px`,
      { ...o, key: min < 9 ? "tiny-text" : "small-text", detail: a.smallText }
    );
  }
  for (const src of a.brokenImages) add("fail", "media", route, `Broken image ${src}`, o);
  for (const v of a.videoErrors) add("fail", "media", route, `Video failed (${v.code}): ${v.src}`, o);
  if (a.missingAlt.length) add("warn", "a11y", route, `${a.missingAlt.length} image(s) with no alt attribute`, { ...o, detail: a.missingAlt });
  if (a.unnamed.length) add("warn", "a11y", route, "Links/buttons with no accessible name", { ...o, key: "unnamed", detail: a.unnamed });
  if (a.hiddenFocusable.length)
    add("warn", "a11y", route, "Focusable elements inside aria-hidden", { ...o, key: "hidden-focusable", detail: a.hiddenFocusable });
  if (a.unlabelled.length) add("warn", "a11y", route, "Form fields with no label", { ...o, detail: a.unlabelled });
  if (a.smallTargets.length)
    add("warn", "touch", route, "Touch targets smaller than 24×24px", { ...o, key: "small-targets", detail: a.smallTargets });
  if (a.duplicateIds.length) add("warn", "html", route, "Duplicate ids", { ...o, detail: a.duplicateIds });
  if (a.badHrefs.length) add("warn", "links", route, 'Links with an empty, "#" or javascript: href', { ...o, detail: a.badHrefs });
  if (!expect404) {
    if (a.h1.length === 0) add("fail", "headings", route, "No h1", o);
    else if (a.h1.length > 1) add("warn", "headings", route, `${a.h1.length} h1 elements`, { ...o, detail: a.h1 });
    if (a.headingSkips.length) add("warn", "headings", route, "Heading levels skip", { ...o, detail: a.headingSkips });
  }
}

/* ------------------------------------------------------------------ */
/* SEO across pages                                                    */
/* ------------------------------------------------------------------ */

async function seoChecks(sitemapRoutes) {
  const titles = {};
  const descs = {};
  const images = new Map();
  for (const [route, h] of Object.entries(headByRoute)) {
    if (route === MISSING) continue;
    report.seo[route] = h;
    const indexable = sitemapRoutes.includes(route);
    if (!h.title) add("fail", "seo", route, "No <title>");
    else {
      if (h.title.length > 65) add("warn", "seo", route, `Title is ${h.title.length} chars (search results cut ~60)`, { detail: h.title });
      (titles[h.title] ||= []).push(route);
    }
    if (!h.description) add("fail", "seo", route, "No meta description");
    else {
      const n = h.description.length;
      if (n < 70 || n > 170) add("warn", "seo", route, `Meta description is ${n} chars (aim for 70–160)`, { detail: h.description });
      (descs[h.description] ||= []).push(route);
    }
    const expected = PROD_ORIGIN + (route === "/" ? "" : route);
    const canon = h.canonical?.replace(/\/$/, "");
    if (!h.canonical) add("fail", "seo", route, "No canonical link");
    else if (canon !== expected) add("warn", "seo", route, `Canonical is ${h.canonical}, expected ${expected}`);
    if (!h.lang) add("fail", "seo", route, "<html> has no lang");
    if (!h.viewport) add("fail", "seo", route, "No viewport meta");
    if (indexable && /noindex/i.test(h.robots || "")) add("fail", "seo", route, `In the sitemap but marked ${h.robots}`);
    if (!h.ogTitle || !h.ogDescription) add("warn", "seo", route, "Missing og:title or og:description");
    if (!h.ogImage) add("fail", "seo", route, "No og:image");
    if (!h.twitterCard) add("warn", "seo", route, "No twitter:card");
    for (const img of [h.ogImage, h.twitterImage].filter(Boolean)) {
      // `next dev` points file-based share images at itself whatever
      // metadataBase says; only a production server shows the real host.
      const devSelf = BASE_ORIGIN !== PROD_ORIGIN && img.startsWith(BASE_ORIGIN);
      if (!img.startsWith(PROD_ORIGIN) && !devSelf)
        add("warn", "seo", route, `Share image is not on ${PROD_ORIGIN}: ${img}`);
      if (!images.has(img)) images.set(img, []);
      images.get(img).push(route);
    }
    if (!h.jsonld.length) add("warn", "seo", route, "No JSON-LD");
    for (const j of h.jsonld.filter((j) => !j.ok)) add("fail", "seo", route, `JSON-LD does not parse: ${j.error}`);
  }
  for (const [t, rs] of Object.entries(titles))
    if (rs.length > 1) add("warn", "seo", rs[0], `Title shared by ${rs.join(", ")}`, { detail: t });
  for (const [d, rs] of Object.entries(descs))
    if (rs.length > 1) add("warn", "seo", rs[0], `Meta description shared by ${rs.join(", ")}`, { detail: d });

  report.seo._shareImages = {};
  await pool([...images.keys()], 3, async (img) => {
    const r = await follow(onBase(img), { method: "GET", timeout: 120000 });
    report.seo._shareImages[img] = { status: r.status ?? r.error, type: r.type };
    if (r.status !== 200 || !/^image\//.test(r.type || ""))
      add("fail", "seo", images.get(img)[0], `Share image answered ${r.status ?? r.error} (${r.type || "no type"}): ${img}`, {
        detail: images.get(img),
      });
  });
  if (images.size) passed.push(`${images.size} share images checked`);
}

/* ------------------------------------------------------------------ */
/* Links                                                               */
/* ------------------------------------------------------------------ */

async function linkChecks() {
  const byPath = new Map(); // path+search -> Set(sources)
  for (const [key, from] of linkSources) {
    const x = new URL(key, BASE);
    const p = x.pathname + x.search;
    if (!byPath.has(p)) byPath.set(p, new Set());
    for (const f of from) byPath.get(p).add(f);
  }
  report.links.internal = {};
  await pool([...byPath.keys()], 6, async (p) => {
    const r = await follow(BASE + p);
    report.links.internal[p] = { status: r.status ?? r.error, hops: r.chain.length - 1 };
    const from = [...byPath.get(p)];
    if (r.status == null || r.status >= 400)
      add("fail", "links", from[0], `Broken link to ${p} (${r.status ?? r.error})`, { detail: { foundOn: from } });
    else if (r.chain.length > 1 && !LEGACY.includes(p))
      add("warn", "links", from[0], `Link to ${p} goes through a redirect to ${r.chain[0].location}`, { detail: { foundOn: from } });
  });
  passed.push(`${byPath.size} internal link targets checked`);

  // #anchors: the target page must have that id. Same-page misses are
  // usually the shared nav's "#section" links repeated on every inner
  // page, so they are reported once, not once per anchor per page.
  const samePageMisses = new Map(); // "#id" -> Set(pages)
  for (const [key, from] of linkSources) {
    const x = new URL(key, BASE);
    const id = decodeURIComponent(x.hash.slice(1));
    if (!id) continue;
    const ids = idsByRoute[x.pathname];
    if (!ids || ids.includes(id)) continue;
    if (from.has(x.pathname)) {
      if (!samePageMisses.has(`#${id}`)) samePageMisses.set(`#${id}`, new Set());
      samePageMisses.get(`#${id}`).add(x.pathname);
    } else {
      add("warn", "links", [...from][0], `Link to ${x.pathname}#${id}: no element with that id`, {
        detail: { foundOn: [...from] },
      });
    }
  }
  if (samePageMisses.size) {
    const pages = [...new Set([...samePageMisses.values()].flatMap((s) => [...s]))].sort();
    add(
      "warn",
      "links",
      pages[0],
      `${[...samePageMisses.keys()].join(", ")} point at the current page on ${pages.length} page(s) that lack those ids ` +
        "(only JS rerouting makes them work; new-tab, no-JS and crawlers land nowhere)",
      { detail: Object.fromEntries([...samePageMisses].map(([id, s]) => [id, [...s]])) }
    );
  }

  if (!EXTERNAL) return;
  const blocked = /linkedin\.com|x\.com|twitter\.com|instagram\.com|facebook\.com/;
  report.links.external = {};
  await pool([...externalSources.keys()].filter((u) => /^https?:/.test(u)), 6, async (u) => {
    const r = await follow(u, { timeout: 12000 });
    report.links.external[u] = r.status ?? r.error;
    if (r.status != null && r.status < 400) return;
    const from = [...externalSources.get(u)];
    if (blocked.test(u)) add("info", "external-links", from[0], `Could not verify ${u} (${r.status ?? r.error}; the site blocks bots)`);
    else add("warn", "external-links", from[0], `External link ${u} answered ${r.status ?? r.error}`, { detail: { foundOn: from } });
  });
}

/* ------------------------------------------------------------------ */
/* Flows                                                               */
/* ------------------------------------------------------------------ */

async function flowShot(page, name) {
  if (!SHOTS) return null;
  await page.addStyleTag({ content: HIDE_FOR_SHOTS }).catch(() => {});
  const file = path.join(OUT, "shots", "flows", `${name}.png`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await page.screenshot({ path: file });
  return path.relative(OUT, file).replace(/\\/g, "/");
}

async function waitForPath(page, predicate, timeout = 10000) {
  const until = Date.now() + timeout;
  while (Date.now() < until) {
    const p = await page.evaluate(() => location.pathname).catch(() => null);
    if (p && predicate(p)) return p;
    await page.waitForTimeout(200);
  }
  return null;
}

const covered = (page) =>
  page.evaluate(() => {
    const el = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
    const c = el?.closest?.(".ax-intro, .ax-wipe");
    return c ? c.className : null;
  });

async function contactFlow(browser, vpName) {
  const vp = viewport(vpName);
  const page = await openPage(browser, vp);
  const res = { viewport: vpName, steps: [], shots: [] };
  const step = (name, ok, note) => {
    res.steps.push({ name, ok, ...(note ? { note } : null) });
    if (!ok) add("fail", "contact-form", "/contact", `${name}${note ? ` — ${note}` : ""}`, { vp: vpName, key: name });
  };
  // Every /api/contact request from this page is answered here and never
  // reaches the server. See CONTACT SAFETY at the top.
  const sent = [];
  let reply = { status: 200, body: { ok: true } };
  await page.route("**/api/contact**", async (route) => {
    let body = null;
    try {
      body = route.request().postDataJSON();
    } catch {}
    sent.push(body);
    await route.fulfill({ status: reply.status, contentType: "application/json", body: JSON.stringify(reply.body) });
  });
  const submit = async () => {
    const btn = page.locator("form.ax-contact__form button[type=submit]");
    await btn.scrollIntoViewIfNeeded();
    try {
      await btn.click({ timeout: 4000 });
    } catch (e) {
      res.steps.push({ name: "submit button clickable", ok: false, note: String(e.message).split("\n")[0] });
      add("warn", "contact-form", "/contact", "Submit button click was intercepted by another element", { vp: vpName });
      await btn.evaluate((b) => b.click());
    }
  };
  const fill = async () => {
    await page.fill("#contact-name", "QA Check");
    await page.fill("#contact-email", "qa@example.com");
    await page.fill("#contact-message", "Automated QA run. This request is intercepted in the browser and never sent.");
    await page.$eval('input[name="consent"]', (c) => {
      if (!c.checked) c.click();
    });
  };
  try {
    await goto(page, `${BASE}/contact`);

    await submit();
    await page.waitForTimeout(600);
    const v = await page.evaluate(() => ({
      invalid: document.querySelectorAll('form.ax-contact__form [aria-invalid="true"]').length,
      messages: [...document.querySelectorAll(".ax-contact__error")].filter((e) => e.offsetParent).length,
      focused: document.activeElement?.id || document.activeElement?.tagName,
    }));
    step("empty submit shows field errors", v.invalid >= 3 && v.messages >= 3, `${v.invalid} invalid, ${v.messages} messages`);
    step("empty submit sends nothing", sent.length === 0, `${sent.length} requests`);
    step("focus moves to the first invalid field", v.focused === "contact-name", `focused ${v.focused}`);
    res.shots.push(await flowShot(page, `contact-${vpName}-1-invalid`));

    await fill();
    await submit();
    const okShown = await page
      .waitForSelector(".ax-contact__sent", { state: "visible", timeout: 6000 })
      .then(() => true)
      .catch(() => false);
    const body = sent[0] || {};
    step("valid submit posts once", sent.length === 1, `${sent.length} requests`);
    step(
      "payload carries the fields",
      body.name === "QA Check" && body.email === "qa@example.com" && body.consent === true && !body.website,
      JSON.stringify(body).slice(0, 200)
    );
    step("success message shows", okShown);
    if (okShown) {
      await page.locator(".ax-contact__sent").scrollIntoViewIfNeeded();
      res.shots.push(await flowShot(page, `contact-${vpName}-2-sent`));
      await page.click(".ax-contact__reset");
      await page.waitForSelector("form.ax-contact__form", { timeout: 4000 });
    }

    reply = { status: 503, body: { ok: false, error: "QA: simulated outage." } };
    await fill();
    await submit();
    const failShown = await page
      .waitForSelector(".ax-contact__failure", { state: "visible", timeout: 6000 })
      .then(() => true)
      .catch(() => false);
    step("server failure shows an error, not a success", failShown);
    if (failShown) {
      await page.locator(".ax-contact__failure").scrollIntoViewIfNeeded();
      res.shots.push(await flowShot(page, `contact-${vpName}-3-failure`));
    }
  } catch (e) {
    step("flow completed", false, String(e.message).split("\n")[0]);
  }
  res.requestsIntercepted = sent.length;
  res.runtime = page.qa;
  await page.context().close();
  return res;
}

async function drawerFlow(browser) {
  const page = await openPage(browser, viewport("mobile"));
  const res = { steps: [], shots: [] };
  const step = (name, ok, note) => {
    res.steps.push({ name, ok, ...(note ? { note } : null) });
    if (!ok) add("fail", "nav-drawer", "/", `${name}${note ? ` — ${note}` : ""}`, { vp: "mobile", key: name });
  };
  try {
    await goto(page, `${BASE}/`);
    const burger = page.locator(".ax-nav__burger");
    step("menu button is visible on a phone", await burger.isVisible());
    await burger.click();
    await page.waitForTimeout(800);
    const open = await page.evaluate(() => ({
      expanded: document.querySelector(".ax-nav__burger")?.getAttribute("aria-expanded"),
      drawer: document.querySelector("#nav-drawer")?.dataset.open,
      links: [...document.querySelectorAll("#nav-drawer a[href]")].filter((a) => a.getBoundingClientRect().width > 0).length,
    }));
    step("drawer opens", open.expanded === "true" && open.drawer === "true", JSON.stringify(open));
    step("drawer shows links", open.links > 0, `${open.links} visible`);
    res.shots.push(await flowShot(page, "drawer-mobile-open"));
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
    const closed = await page.evaluate(() => ({
      expanded: document.querySelector(".ax-nav__burger")?.getAttribute("aria-expanded"),
      focusBack: document.activeElement?.classList.contains("ax-nav__burger"),
    }));
    step("Escape closes the drawer", closed.expanded === "false");
    step("focus returns to the menu button", !!closed.focusBack);

    await burger.click();
    await page.waitForTimeout(800);
    const target = await page.evaluate(() => {
      const a = [...document.querySelectorAll("#nav-drawer a[href]")].find((a) => {
        const u = new URL(a.href);
        const r = a.getBoundingClientRect();
        return (
          u.origin === location.origin &&
          u.pathname !== "/" &&
          r.width > 0 &&
          a.contains(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2))
        );
      });
      a?.setAttribute("data-qa-target", "");
      return a ? new URL(a.href).pathname : null;
    });
    if (target) {
      await page.locator("[data-qa-target]").click();
      const arrived = await waitForPath(page, (p) => p === target);
      await page.waitForTimeout(1500);
      const after = await page.evaluate(() => ({
        drawer: document.querySelector("#nav-drawer")?.dataset.open,
        locked: [document.documentElement, document.body].some((e) => getComputedStyle(e).overflowY === "hidden"),
      }));
      step(`drawer link navigates to ${target}`, !!arrived);
      step("drawer is closed after navigating", after.drawer === "false");
      step("page scrolls after navigating from the drawer", !after.locked);
      step("nothing covers the new page", !(await covered(page)));
    } else step("drawer has an internal page link", false);
  } catch (e) {
    step("flow completed", false, String(e.message).split("\n")[0]);
  }
  res.runtime = page.qa;
  await page.context().close();
  return res;
}

async function keyboardFlow(browser) {
  const page = await openPage(browser, viewport("desktop"));
  const res = { stops: [] };
  try {
    await goto(page, `${BASE}/`);
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press("Tab");
      await page.waitForTimeout(120);
      res.stops.push(
        await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return { sel: "body" };
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          const name = (el.getAttribute("aria-label") || el.innerText || el.getAttribute("title") || "").trim().slice(0, 40);
          return {
            sel: el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : ""),
            name,
            ring: (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== "none",
            onScreen: r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth,
          };
        })
      );
    }
    const first = res.stops[0];
    if (!/skip/i.test(first?.name || ""))
      add("info", "keyboard", "/", `First Tab stop is ${first?.sel} "${first?.name}", not a skip link`, { vp: "desktop" });
    const noRing = res.stops.filter((s) => s.sel !== "body" && !s.ring);
    if (noRing.length)
      add("warn", "keyboard", "/", "Focused elements with no outline or box-shadow (check the screenshots: a colour change may be the indicator)", {
        vp: "desktop",
        detail: [...new Set(noRing.map((s) => `${s.sel} "${s.name}"`))],
      });
    const hidden = res.stops.filter((s) => s.sel !== "body" && !s.onScreen);
    if (hidden.length)
      add("warn", "keyboard", "/", "Tab lands on elements that are not on screen", {
        vp: "desktop",
        detail: [...new Set(hidden.map((s) => `${s.sel} "${s.name}"`))],
      });
    const stuck = res.stops.slice(3).every((s, i) => s.sel === res.stops[i + 2].sel && s.name === res.stops[i + 2].name);
    if (stuck) add("fail", "keyboard", "/", "Tab stops moving: focus is trapped", { vp: "desktop" });
  } catch (e) {
    add("fail", "keyboard", "/", `Keyboard flow broke: ${String(e.message).split("\n")[0]}`, { vp: "desktop" });
  }
  res.runtime = page.qa;
  await page.context().close();
  return res;
}

async function transitionFlow(browser) {
  const page = await openPage(browser, viewport("desktop"));
  const res = { steps: [], shots: [] };
  const step = (name, ok, note) => {
    res.steps.push({ name, ok, ...(note ? { note } : null) });
    if (!ok) add("fail", "transition", "/", `${name}${note ? ` — ${note}` : ""}`, { vp: "desktop", key: name });
  };
  try {
    await goto(page, `${BASE}/`);
    const homeTitle = await page.title();
    // Tag the exact link a person could click: the same hrefs also sit in
    // the closed Demos panel and the drawer, laid out but invisible.
    const target = await page.evaluate(() => {
      const clickable = (a) => {
        const r = a.getBoundingClientRect();
        if (r.width < 1 || r.top < 0 || r.bottom > innerHeight) return false;
        return a.contains(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2));
      };
      const scopes = [document.querySelector(".ax-nav"), document.querySelector("footer"), document.body].filter(Boolean);
      for (const s of scopes) {
        const a = [...s.querySelectorAll("a[href]")].find((a) => {
          const u = new URL(a.href);
          return u.origin === location.origin && u.pathname !== "/" && !u.hash && clickable(a);
        });
        if (a) {
          a.setAttribute("data-qa-target", "");
          return new URL(a.href).pathname;
        }
      }
      return null;
    });
    if (!target) {
      step("an internal link is visible on the first screen", false);
    } else {
      await page.locator("[data-qa-target]").click();
      const arrived = await waitForPath(page, (p) => p === target);
      await page.waitForTimeout(1800);
      step(`clicking a link to ${target} navigates`, !!arrived);
      const state = await page.evaluate(() => ({ y: scrollY, title: document.title }));
      step("new page opens at the top", state.y < 5, `scrollY ${state.y}`);
      step("title changes", state.title !== homeTitle, state.title);
      const cover = await covered(page);
      step("transition panel clears", !cover, cover || "");
      res.shots.push(await flowShot(page, "transition-arrived"));
      await page.goBack();
      const back = await waitForPath(page, (p) => p === "/");
      await page.waitForTimeout(1800);
      step("Back returns home", !!back);
      const cover2 = await covered(page);
      step("home is visible after Back", !cover2, cover2 || "");
    }
  } catch (e) {
    step("flow completed", false, String(e.message).split("\n")[0]);
  }
  res.runtime = page.qa;
  for (const e of res.runtime.pageErrors) add("fail", "transition", "/", `JS error during navigation: ${e.split("\n")[0]}`, { vp: "desktop" });
  await page.context().close();
  return res;
}

/* ------------------------------------------------------------------ */
/* Report                                                              */
/* ------------------------------------------------------------------ */

function merged() {
  const groups = new Map();
  for (const i of issues) {
    const k = `${i.severity}|${i.category}|${i.route}|${i.key}`;
    if (!groups.has(k)) groups.set(k, { ...i, vps: [], messages: new Map(), details: new Map() });
    const g = groups.get(k);
    if (i.vp) g.vps.push(i.vp);
    g.messages.set(i.message, (g.messages.get(i.message) || []).concat(i.vp || []));
    if (i.detail != null) g.details.set(i.vp || "-", i.detail);
  }
  const rank = { fail: 0, warn: 1, info: 2 };
  return [...groups.values()]
    .map((g) => ({
      severity: g.severity,
      category: g.category,
      route: g.route,
      viewports: [...new Set(g.vps)],
      message:
        g.messages.size === 1
          ? [...g.messages.keys()][0]
          : [...g.messages].map(([m, vps]) => `${vps.join("/")}: ${m}`).join("; "),
      detail: g.details.size ? Object.fromEntries(g.details) : undefined,
    }))
    .sort((a, b) => rank[a.severity] - rank[b.severity] || a.category.localeCompare(b.category) || a.route.localeCompare(b.route));
}

function summaryMd(list, seconds) {
  const lines = [];
  const count = (s) => list.filter((i) => i.severity === s).length;
  lines.push(`# Site QA: ${BASE}`, "");
  lines.push(
    `${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC · ${new Set(report.pages.map((p) => p.route)).size} routes × ${VPS.length} viewports (${VPS.map((v) => `${v.name} ${v.width}`).join(", ")})` +
      `${REDUCED ? " · reduced motion" : ""} · ${Math.round(seconds)}s`,
    "",
    `**${count("fail")} failures · ${count("warn")} warnings · ${count("info")} notes**`,
    ""
  );
  for (const sev of ["fail", "warn", "info"]) {
    const items = list.filter((i) => i.severity === sev);
    if (!items.length) continue;
    lines.push(`## ${{ fail: "Failures", warn: "Warnings", info: "Notes" }[sev]}`, "");
    for (const i of items) {
      const all = VPS.length > 1 && VPS.every((v) => i.viewports.includes(v.name));
      const vps = i.viewports.length ? ` _(${all ? "all viewports" : i.viewports.join(", ")})_` : "";
      lines.push(`- **${i.category}** \`${i.route}\`${vps}: ${i.message}`);
      if (i.detail) {
        const d = Object.values(i.detail)[0];
        const shown = Array.isArray(d) ? d.slice(0, 6) : d;
        lines.push(`  - ${JSON.stringify(shown).slice(0, 400)}`);
      }
    }
    lines.push("");
  }
  lines.push("## Passed", "", ...passed.map((p) => `- ${p}`), "");
  if (report.flows && Object.keys(report.flows).length) {
    lines.push("## Flows", "");
    for (const [name, f] of Object.entries(report.flows)) {
      const steps = f.steps || [];
      const bad = steps.filter((s) => !s.ok).length;
      lines.push(`- ${name}: ${steps.length ? `${steps.length - bad}/${steps.length} steps passed` : "see report.json"}`);
    }
    lines.push("");
  }
  lines.push(
    "## Pages",
    "",
    "| route | viewport | status | height | load ms | shots |",
    "|---|---|---|---|---|---|",
    ...report.pages
      .slice()
      .sort((a, b) => a.route.localeCompare(b.route) || a.viewport.localeCompare(b.viewport))
      .map(
        (p) =>
          `| ${p.route} | ${p.viewport} | ${p.status ?? p.error ?? "?"} | ${p.audit?.height ?? ""} | ${p.audit?.timing?.load ?? ""} | ${p.shots?.length ?? 0} |`
      ),
    "",
    `Screenshots: \`${path.join(OUT, "shots")}\` (\`<route>/<viewport>-NN.jpg\`, flows in \`shots/flows\`)`,
    `Full data: \`${path.join(OUT, "report.json")}\``
  );
  return lines.join("\n");
}

/* ------------------------------------------------------------------ */

const t0 = Date.now();
console.log(`Site QA → ${BASE}\nOutput  → ${OUT}\n`);

let sitemapRoutes = [];
const onlyRoutes = opt("routes", null);
console.log("Static checks…");
try {
  sitemapRoutes = await staticChecks();
} catch (e) {
  add("fail", "static", "/", `Static checks broke: ${e.message}`);
}
/* Git Bash rewrites a leading "/contact" argument into
   "C:/Program Files/Git/contact" unless MSYS_NO_PATHCONV=1 is set. */
const unmangle = (r) => r.replace(/^[A-Za-z]:[\\/].*?[\\/]Git(?=[\\/])/i, "").replace(/\\/g, "/") || "/";
const routes = onlyRoutes
  ? onlyRoutes.split(",").map((r) => unmangle(r.trim()))
  : [...new Set(["/", ...sitemapRoutes, MISSING])];

// Warm each route once so a dev server's first compile does not eat the browser timeouts.
console.log(`Warming ${routes.length} routes…`);
await pool(routes, 3, (r) => request(BASE + r, { timeout: 180000 }).then((x) => x.body?.cancel?.()).catch(() => {}));

const browser = await launch();
try {
  console.log(`Crawling ${routes.length} routes × ${VPS.length} viewports…`);
  await crawl(browser, routes);
  report.pages.forEach(judgePage);
  console.log("SEO, share images and links…");
  await seoChecks(sitemapRoutes);
  await linkChecks();
  if (FLOWS) {
    console.log("Flows…");
    report.flows.contactDesktop = await contactFlow(browser, "desktop");
    report.flows.contactMobile = await contactFlow(browser, "mobile");
    report.flows.drawer = await drawerFlow(browser);
    report.flows.keyboard = await keyboardFlow(browser);
    report.flows.transition = await transitionFlow(browser);
  }
} finally {
  await browser.close();
}

const list = merged();
report.finishedAt = new Date().toISOString();
report.passed = passed;
report.issues = list;
fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
fs.writeFileSync(path.join(OUT, "summary.md"), summaryMd(list, (Date.now() - t0) / 1000));
const c = (s) => list.filter((i) => i.severity === s).length;
console.log(`\nDone in ${Math.round((Date.now() - t0) / 1000)}s: ${c("fail")} failures, ${c("warn")} warnings, ${c("info")} notes`);
console.log(`Summary: ${path.join(OUT, "summary.md")}`);
