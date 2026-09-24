"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { services } from "@/components/data";
import { filmFor } from "@/components/video.data";
import AmbientVideo from "@/components/motion/AmbientVideo";
import { prefersReducedMotion } from "@/components/motion/gsapLoader";
import {
  SERVICE_DETAIL as DETAIL,
  SELECT_SERVICE,
  clearParkedServiceTrack,
  peekParkedServiceTrack,
} from "@/components/services.data";

/**
 * "What we can help you with", as something you operate rather than
 * something you scroll past.
 *
 * It was four equal cards, each a sentence over a purple 3D render — the
 * layout every agency site uses for a services grid, and the one place a
 * reader learns nothing by looking. The four offers are not
 * interchangeable, so making the reader pick one and see what is actually
 * inside it is both more useful and more honest than showing all four at
 * a depth of one line.
 *
 * Every phrase in `DETAIL` (components/services.data.js) already appears in this page's own copy — the
 * capability strip above this component (`STACK` in Services.jsx), the
 * WhyUs card titles (components/data.js) and the case studies. Nothing
 * here is a new capability claim; it is the same claims, sorted under the
 * offer they belong to.
 *
 * Interaction: hover or focus previews, click pins. Arrow keys move
 * between offers, which matters because this is a tab list — the panel is
 * the only place the detail exists.
 */
export default function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const tabRefs = useRef([]);

  /* Until someone takes over, the panel walks itself through the four
     offers — the section says "there are four of these and they are
     different" without requiring anyone to discover the control first.
     Any hover, focus or click stops it for good; an autoplay that
     resumes and moves the panel out from under a reader is worse than no
     autoplay at all. */
  useEffect(() => {
    if (pinned) return;
    const t = setInterval(() => setActive((i) => (i + 1) % services.length), 4200);
    return () => clearInterval(t);
  }, [pinned]);

  const pick = (i) => {
    setActive(i);
    setPinned(true);
  };

  /* The sector chips in the navigation (`SECTORS` in services.data.js)
     open a track and bring the explorer to the middle of the window —
     the section's own top is a ticker and a heading, and the track the
     reader asked for would sit below the fold. */
  const rootRef = useRef(null);
  useEffect(() => {
    const open = (track) => {
      if (!DETAIL[track]) return false;
      setActive(track);
      setPinned(true);
      return true;
    };
    /* Centred when the whole explorer fits the window. Stacked on a phone
       it runs taller than the screen, and centring it put the top of the
       list — and the panel's heading — above the viewport; there the
       opened track's panel goes to the top instead (its scroll-margin in
       svc.css clears the fixed bar). */
    const reveal = () => {
      const root = rootRef.current;
      if (!root) return;
      const behavior = prefersReducedMotion() ? "auto" : "smooth";
      if (root.offsetHeight <= window.innerHeight * 0.85) {
        root.scrollIntoView({ behavior, block: "center" });
      } else {
        root.querySelector(".ax-svc__panel")?.scrollIntoView({ behavior, block: "start" });
      }
    };

    const onSelect = (e) => {
      if (open(Number(e.detail?.track))) reveal();
    };
    window.addEventListener(SELECT_SERVICE, onSelect);

    /* A chip pressed on another page parks its track and navigates here,
       and the home page is still settling when this mounts: GSAP arrives
       late and a pinned section's scroll spacing then lands above this
       one (WhyUs's pin added ~1800px when it was on the page), which
       strands any scroll made on arrival (the router's hash scroll
       included) well short. So for the first few seconds the explorer
       re-centres whenever its place in the document moves, and lets go
       the moment the reader scrolls for themselves. */
    let poll = 0;
    const stop = () => {
      clearInterval(poll);
      poll = 0;
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
    const parked = peekParkedServiceTrack();
    if (parked !== null && open(parked)) {
      let last = null;
      let ticks = 0;
      poll = setInterval(() => {
        // Cleared here rather than on read — see services.data.js.
        clearParkedServiceTrack();
        const el = rootRef.current;
        if (!el || ++ticks > 16) return stop();
        const y = Math.round(el.getBoundingClientRect().top + window.scrollY);
        if (y !== last) {
          last = y;
          reveal();
        }
      }, 250);
      window.addEventListener("wheel", stop, { passive: true });
      window.addEventListener("touchstart", stop, { passive: true });
      window.addEventListener("keydown", stop);
    }

    return () => {
      window.removeEventListener(SELECT_SERVICE, onSelect);
      stop();
    };
  }, []);

  const onKeyDown = (e) => {
    const last = services.length - 1;
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    pick(next);
    tabRefs.current[next]?.focus();
  };

  /* Each offer gets the environment it is sold into, behind the panel.
     Mounted as they are first shown rather than all four up front — the
     panel rotates on its own, so a reader who leaves the section alone
     still only pays for the offers that actually appeared. Tracked in
     state, in an effect: a Set mutated during render is read back at a
     different value on React's second pass in development, so the first
     clip would intermittently fail to mount. */
  const [seen, setSeen] = useState(() => new Set([filmFor.services[0]]));
  useEffect(() => {
    const film = filmFor.services[active];
    setSeen((prev) => (prev.has(film) ? prev : new Set(prev).add(film)));
  }, [active]);

  const mounted = useMemo(
    () => [...new Set(filmFor.services)].filter((f) => seen.has(f)),
    [seen]
  );

  const item = services[active];
  const detail = DETAIL[active];

  return (
    <div className="ax-svc" ref={rootRef}>
      <div
        className="ax-svc__list"
        role="tablist"
        aria-orientation="vertical"
        aria-label="What we can help you with"
        onKeyDown={onKeyDown}
      >
        {services.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            id={`svc-tab-${i}`}
            aria-selected={i === active}
            aria-controls="svc-panel"
            tabIndex={i === active ? 0 : -1}
            ref={(el) => (tabRefs.current[i] = el)}
            className="ax-svc__tab"
            onMouseEnter={() => pick(i)}
            onFocus={() => pick(i)}
            onClick={() => pick(i)}
          >
            <span className="ax-svc__tab-index" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="ax-svc__tab-body">
              <span className="ax-svc__tab-short">{DETAIL[i].short}</span>
              {/* The full offer line is the one already written in
                  components/data.js — the short name is a handle for it,
                  not a replacement. */}
              <span className="ax-svc__tab-full">
                {s.title.split("—")[1]?.trim() || s.title}
              </span>
              <span className="ax-svc__tab-meta">
                {DETAIL[i].builds.length} agents &middot; {DETAIL[i].proof.kind}
              </span>
            </span>
            <span className="ax-svc__tab-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      <div
        className="ax-svc__panel"
        id="svc-panel"
        role="tabpanel"
        aria-labelledby={`svc-tab-${active}`}
        style={{ "--svc-accent": detail.accent }}
      >
        <div className="ax-svc__stage" aria-hidden="true">
          {mounted.map((f) => (
            <AmbientVideo
              key={f}
              film={f}
              play={f === filmFor.services[active]}
              data-on={f === filmFor.services[active]}
              className="ax-svc__film"
              rootMargin="0px"
            />
          ))}
        </div>
        {/* `key` remounts on every change so the panel's entrance replays
            — the swap is the feedback that the control did something. */}
        <div className="ax-svc__panel-inner" key={active}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.img} alt={item.alt} className="ax-svc__render" loading="lazy" />
          <div className="ax-svc__panel-copy">
            {/* Eyebrow then claim: the eyebrow confirms which tab is open,
                the heading is the sector's own sentence from the deck. The
                heading used to be the eyebrow's text, which meant the panel
                named itself twice (the tab already says "AI in Fintech" two
                columns to the left) and never said what the track is for. */}
            <p className="ax-svc__panel-eyebrow">{detail.short}</p>
            <h3 className="ax-svc__panel-title">{detail.headline}</h3>
            <ul className="ax-svc__builds">
              {detail.builds.map((b) => (
                <li className="ax-svc__agent" key={b.name}>
                  <h4 className="ax-svc__agent-name">{b.name}</h4>
                  <p className="ax-svc__agent-text">{b.text}</p>
                </li>
              ))}
            </ul>
            <div className="ax-svc__proof">
              <p className="ax-svc__proof-kind">{detail.proof.kind}</p>
              <ul className="ax-svc__proof-items">
                {detail.proof.items.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {detail.proof.caveat ? (
                <p className="ax-svc__proof-caveat">*{detail.proof.caveat}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
