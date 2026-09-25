/**
 * Browser helpers for the site-qa agent (.claude/agents/site-qa.md).
 * site-check.mjs is built on these, and so are the agent's one-off flow
 * scripts: import them with a file:// URL from anywhere.
 *
 * playwright-core is deliberately NOT a project dependency. Any
 * `npm install` in the project prunes packages missing from package.json,
 * so it lives in a scratch deps dir outside the tree:
 *
 *   node .claude/qa/site-check.mjs --setup      (one-time, idempotent)
 *
 * It drives the installed Chrome, headless. No browser download.
 */
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export const DEPS_DIR = process.env.QA_DEPS || path.join(os.tmpdir(), "aibrigade-qa");
export const CHROME =
  process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";

/** The canonical host. Absolute links to it count as internal. */
export const PROD_ORIGIN = "https://aibrigade.ai";

/**
 * Four widths that each cross a layout break on this site: phone, tablet
 * portrait, the ~1024 laptop where the fluid root font-size shrinks small
 * text the most, and a common desktop.
 */
export const VIEWPORTS = {
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
  tablet: { width: 768, height: 1024, isMobile: true, hasTouch: true },
  laptop: { width: 1024, height: 768 },
  desktop: { width: 1440, height: 900 },
};

/**
 * Hidden before any screenshot. A fullPage capture paints the page-
 * transition panel (.ax-wipe, parked one viewport below the top) as a dark
 * block mid-page; the custom cursor and Next's dev overlay are noise.
 */
export const HIDE_FOR_SHOTS =
  ".ax-wipe,.ax-cursor,.ax-cursor-dot,nextjs-portal{display:none!important}" +
  ".ax-intro{display:none!important}";

export function setupDeps() {
  fs.mkdirSync(DEPS_DIR, { recursive: true });
  const pkg = path.join(DEPS_DIR, "package.json");
  if (!fs.existsSync(pkg)) {
    fs.writeFileSync(pkg, JSON.stringify({ name: "aibrigade-qa-deps", private: true }));
  }
  if (!fs.existsSync(path.join(DEPS_DIR, "node_modules", "playwright-core"))) {
    execSync("npm i playwright-core --no-audit --no-fund", { cwd: DEPS_DIR, stdio: "inherit" });
  }
  if (!fs.existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME}; set CHROME_PATH.`);
}

export function playwright() {
  const req = createRequire(path.join(DEPS_DIR, "package.json"));
  try {
    return req("playwright-core");
  } catch {
    throw new Error(
      `playwright-core is not installed in ${DEPS_DIR}. Run: node .claude/qa/site-check.mjs --setup`
    );
  }
}

export async function launch() {
  const { chromium } = playwright();
  return chromium.launch({ executablePath: CHROME, headless: true });
}

/** Accepts a preset name ("mobile") or "WIDTHxHEIGHT". */
export function viewport(spec) {
  if (VIEWPORTS[spec]) return { name: spec, ...VIEWPORTS[spec] };
  const m = /^(\d+)x(\d+)$/.exec(spec);
  if (!m) throw new Error(`Unknown viewport "${spec}"`);
  const width = +m[1];
  return { name: spec, width, height: +m[2], isMobile: width < 1024, hasTouch: width < 1024 };
}

/**
 * A fresh context + page at one viewport, with every console error,
 * uncaught exception, failed request and 4xx/5xx response collected into
 * `page.qa`.
 */
export async function openPage(browser, vp, { reducedMotion = "no-preference" } = {}) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: !!vp.isMobile,
    hasTouch: !!vp.hasTouch,
    deviceScaleFactor: 1,
    reducedMotion,
  });
  const page = await context.newPage();
  const qa = { console: [], pageErrors: [], failed: [], httpErrors: [] };
  page.qa = qa;
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") {
      qa.console.push({ type: m.type(), text: m.text().slice(0, 500) });
    }
  });
  page.on("pageerror", (e) => qa.pageErrors.push(String(e?.stack || e).slice(0, 800)));
  page.on("requestfailed", (r) => {
    const failure = r.failure()?.errorText || "";
    qa.failed.push({
      url: r.url(),
      type: r.resourceType(),
      failure,
      // An aborted media request is usually the browser changing its mind
      // about a lazy or offscreen video, not a fault.
      routine: failure.includes("ERR_ABORTED") && ["media", "image"].includes(r.resourceType()),
    });
  });
  page.on("response", (r) => {
    if (r.status() >= 400) qa.httpErrors.push({ url: r.url(), status: r.status(), type: r.request().resourceType() });
  });
  return page;
}

/** Waits for the intro curtain (components/Preloader.jsx) to lift. */
export async function waitForIntro(page, timeout = 6000) {
  await page
    .waitForFunction(
      () => {
        const el = document.querySelector(".ax-intro");
        return !el || el.dataset.done === "true";
      },
      null,
      { timeout }
    )
    .catch(() => {
      page.qa?.pageErrors.push(`Preloader (.ax-intro) had not lifted after ${timeout}ms`);
    });
}

/** Loads a URL and waits for the intro. Returns the document response. */
export async function goto(page, url) {
  const res = await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await waitForIntro(page);
  return res;
}

/**
 * Scrolls the whole page in 80%-of-a-screen steps so lazy media, reveals
 * and ScrollTrigger sections all run, then returns to the top.
 * `window.scrollTo` is what components/motion/SmoothScroll.jsx drives
 * itself, so this does not fight it.
 */
export async function scrollThrough(page, stepPause = 220) {
  await page.evaluate(async (pause) => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.round(innerHeight * 0.8);
    for (let y = 0, i = 0; i < 120; i++) {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (y >= max) break;
      y = Math.min(y + step, max);
      window.scrollTo({ top: y, behavior: "instant" });
      await sleep(pause);
    }
    await sleep(500);
    window.scrollTo({ top: 0, behavior: "instant" });
    await sleep(500);
  }, stepPause);
}

/**
 * Full-page screenshots, cut into pieces `screens` viewports tall so each
 * piece stays legible when viewed. Returns the file paths.
 */
export async function screenshotPage(page, filePrefix, { screens = 2, quality = 70 } = {}) {
  await page.addStyleTag({ content: HIDE_FOR_SHOTS });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(300);
  const { width, height } = page.viewportSize();
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const piece = height * screens;
  const files = [];
  fs.mkdirSync(path.dirname(filePrefix), { recursive: true });
  for (let y = 0, n = 1; y < total && n <= 40; y += piece, n++) {
    const file = `${filePrefix}-${String(n).padStart(2, "0")}.jpg`;
    await page.screenshot({
      path: file,
      type: "jpeg",
      quality,
      fullPage: true,
      clip: { x: 0, y, width, height: Math.min(piece, total - y) },
    });
    files.push(file);
  }
  return files;
}

/** "/" -> "home", "/blog/a-post" -> "blog__a-post". */
export const slugOf = (pathname) =>
  pathname === "/" ? "home" : pathname.replace(/^\/|\/$/g, "").replace(/[\/?#=&]+/g, "__");
