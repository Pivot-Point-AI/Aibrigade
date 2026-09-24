"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/components/motion/gsapLoader";

/**
 * The hero's visual — a system, running, one sector at a time.
 *
 * Four sources on the left, an AI Brigade intelligence core in the middle,
 * three decisions on the right, each carried through to the action that
 * follows it. Six of them — fintech, healthtech, retail, customer ops,
 * industrial, energy — each in its own colour with its own sources and its
 * own outcomes, played in turn like slides. The chips under the drawing
 * are the slide tabs; the lit one carries the time left on its slide.
 *
 * It used to be one drawing: transactions and clinical notes fed into the
 * same core, and three generic verdicts came out. That read as everything
 * poured into one pot — the picture a bank's risk committee or a
 * hospital's governance lead is trying not to buy. One core per sector,
 * each shown on its own, says the opposite: the same AI Brigade
 * technology, a dedicated instance for each.
 *
 * Deliberately not a dashboard and not a robot. One SVG for the geometry,
 * HTML for every word, so the labels stay crisp at any size. Motion is CSS
 * keyframes and SMIL `animateMotion` — no canvas, no WebGL, no per-frame
 * JavaScript. The slide clock is the active chip's own progress animation:
 * when it ends, the next slide starts, so pausing it (pointer over the
 * visual, or keyboard focus in the tabs) pauses the slides with it, and
 * under reduced motion — where the animation never runs — the slides only
 * change when a chip is pressed. The only other script is the pointer
 * tilt (fine pointers only, eased in a short rAF loop that stops when it
 * settles).
 *
 * Every phrase on it is already on this site: the sectors are the
 * navigation's list, the sources and outcomes are the sector agents in
 * services.data.js and the environments in video.data.js, the log lines
 * are AgentConsole's traces.
 */

/* ---- geometry (viewBox 720 × 420) ------------------------------------ */

const W = 720;
/* 480 while the stage rail ran along the foot of the drawing; the sector
   tabs that replaced it sit under the drawing, in flow, so that band is
   cropped. The core's caption is the lowest thing left, ending around
   400. `.ax-sys`'s `aspect-ratio` in app/hero.css follows these two
   numbers. */
const H = 420;
const CORE = { x: 356, y: 240, r: 38 };

/* Rows. Source labels are right-aligned to `SRC_X - 40`, which gives them
   150 units — the longest sub-label holds with room to spare. */
const SRC_X = 190;
const SRC_Y = [112, 197, 282, 367];
const DEC_X = 500;
const ACT_X = 684;
const DEC_Y = [152, 240, 328];

/* One slide per sector, in the navigation's order. `color` is the
   sector's key; four are the accents ServiceExplorer already uses
   (services.data.js: teal, green, amber, blue), and the second sector of
   each pair it groups — customer ops, energy — takes a hue of its own.
   `core` is the sphere's light, body and shadow in that hue. */
const SLIDES = [
  {
    sector: "Fintech",
    color: "#2fd3c0",
    core: ["#7af2e2", "#17a596", "#0a4a45"],
    sources: [
      { label: "Transactions", sub: "real-time" },
      { label: "Applications", sub: "underwriting files" },
      { label: "Calls", sub: "voice · multilingual" },
      { label: "Core banking", sub: "disputes · exceptions" },
    ],
    decisions: [
      { label: "Approve", sub: "within appetite", action: "Written back" },
      { label: "Refer", sub: "with reasons", action: "Analyst queue" },
      { label: "Hold", sub: "human in the loop", action: "Fraud review" },
    ],
    event: { id: "txn_8f2a41", text: "Transaction risk 0.94 — referred to an analyst" },
  },
  {
    sector: "Healthtech",
    color: "#4ade80",
    core: ["#9af7bb", "#22b35e", "#0e4a2a"],
    sources: [
      { label: "Clinical notes", sub: "EHR · HL7 FHIR" },
      { label: "Eligibility", sub: "payer checks" },
      { label: "Billing", sub: "AR · denials" },
      { label: "Calls", sub: "patient access" },
    ],
    decisions: [
      { label: "Draft", sub: "documentation", action: "Clinician sign-off" },
      { label: "Schedule", sub: "patient access", action: "Booked in the EHR" },
      { label: "Follow up", sub: "AR · denials", action: "Billing queue" },
    ],
    event: { id: "enc_5d90", text: "Clinical note drafted — held for clinician sign-off" },
  },
  {
    sector: "Retail",
    color: "#f0a83c",
    core: ["#fcd594", "#e08e1b", "#6b3c07"],
    sources: [
      { label: "Stock", sub: "WMS · POS" },
      { label: "Floor voice", sub: "hands-free" },
      { label: "Movements", sub: "location · transfers" },
      { label: "Store SOPs", sub: "tasks · policies" },
    ],
    decisions: [
      { label: "Update", sub: "stock & location", action: "Written to WMS" },
      { label: "Guide", sub: "task & SOP", action: "Store team" },
      { label: "Flag", sub: "exception", action: "Ops escalation" },
    ],
    event: { id: "sku_4b19", text: "Stock movement confirmed by voice — WMS updated" },
  },
  {
    sector: "Customer Ops",
    color: "#f472b6",
    core: ["#fbb6da", "#e0468f", "#6d1440"],
    sources: [
      { label: "Calls", sub: "voice · multilingual" },
      { label: "Chat & email", sub: "digital channels" },
      { label: "Knowledge", sub: "policies · SOPs" },
      { label: "History", sub: "CRM" },
    ],
    decisions: [
      { label: "Resolve", sub: "supported request", action: "Case closed" },
      { label: "Follow up", sub: "outbound", action: "Reminder sent" },
      { label: "Hand off", sub: "with context", action: "Agent assist" },
    ],
    event: { id: "call_0e47", text: "Service request resolved on the call — case closed" },
  },
  {
    sector: "Industrial",
    color: "#6f95ff",
    core: ["#b4c6ff", "#4d6ff0", "#1a2e7a"],
    sources: [
      { label: "Manuals", sub: "SOPs · history" },
      { label: "Work orders", sub: "maintenance" },
      { label: "Sensors", sub: "IoT / OT" },
      { label: "Spares", sub: "parts stores" },
    ],
    decisions: [
      { label: "Triage", sub: "fault diagnosis", action: "Technician guided" },
      { label: "Raise", sub: "work order", action: "Prioritised" },
      { label: "Locate", sub: "spare parts", action: "Stock confirmed" },
    ],
    event: { id: "wo_7731", text: "Fault matched to the manual — work order raised" },
  },
  {
    sector: "Energy",
    color: "#facc15",
    core: ["#fde68a", "#d9a90b", "#6b5006"],
    sources: [
      { label: "Meter data", sub: "interval reads" },
      { label: "Billing", sub: "accounts · tariffs" },
      { label: "Telemetry", sub: "IoT / OT · drift" },
      { label: "Field calls", sub: "voice · point of work" },
    ],
    decisions: [
      { label: "Classify", sub: "meter exception", action: "Billing review" },
      { label: "Alert", sub: "drift detected", action: "Control room" },
      { label: "Dispatch", sub: "field job", action: "Work order raised" },
    ],
    event: { id: "mtr_2c08", text: "Meter exception classified — routed to billing review" },
  },
];

/* How long a leaving slide stays on screen while the next fades in. Must
   cover `ax-sys-slide-out` in app/hero.css. */
const LEAVE_MS = 600;

const pct = (v, of) => `${(v / of) * 100}%`;

const list = (words) => `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}`;
const describe = (d) =>
  `Diagram of the AI Brigade intelligence core for ${d.sector}: ${list(
    d.sources.map((s) => s.label.toLowerCase())
  )} flow into it, and it returns ${list(d.decisions.map((x) => x.label.toLowerCase()))} decisions, each carried through to an action — ${list(
    d.decisions.map((x) => x.action.toLowerCase())
  )}.`;

/* Both control points run forward along the path, and each line lands on
   its own point of the core's edge, fanned across it in row order — so
   the lines arrive as a convergence rather than a knot. `dock` is the x of
   a circle of radius `DOCK_R` at height `dy`, which keeps the lines
   touching the sphere instead of stopping short of it or running under
   it. */
const DOCK_R = CORE.r + 6;
const dock = (dy) => Math.sqrt(Math.max(0, DOCK_R * DOCK_R - dy * dy));

const IN_FAN = [-13.5, -4.5, 4.5, 13.5];
const OUT_FAN = [-9, 0, 9];

const inPath = (y, i) => {
  const dy = IN_FAN[i] ?? 0;
  const ey = CORE.y + dy;
  return `M ${SRC_X} ${y} C ${SRC_X + 72} ${y}, ${CORE.x - 92} ${ey}, ${(CORE.x - dock(dy)).toFixed(2)} ${ey}`;
};
const outPath = (y, i) => {
  const dy = OUT_FAN[i] ?? 0;
  const sy = CORE.y + dy;
  return `M ${(CORE.x + dock(dy)).toFixed(2)} ${sy} C ${CORE.x + 88} ${sy}, ${DEC_X - 72} ${y}, ${DEC_X - 10} ${y}`;
};
/* A short lead-in rather than a rule spanning the whole gap: the label
   block sits in that gap, and a line drawn across three lines of type
   reads as a strike-through, not as a connection. */
const actPath = (y) => `M ${ACT_X - 40} ${y} L ${ACT_X - 12} ${y}`;

/* One sector's drawing. Keyed by slide, so a new slide is a new SVG with
   its own SMIL timeline and its own ids — two are on screen together
   while one fades out over the other, and they must not share gradient or
   path ids. */
function Scene({ s, phase }) {
  const d = SLIDES[s];
  const [light, mid, dark] = d.core;
  const id = (name) => `ax-sys-${name}-${s}`;
  const leaving = phase === "leaving";

  return (
    <div
      className={`ax-sys__scene${phase ? ` is-${phase}` : ""}`}
      style={{ "--sys-c": d.color }}
      role={leaving ? undefined : "img"}
      aria-label={leaving ? undefined : describe(d)}
      aria-hidden={leaving ? "true" : undefined}
    >
      <svg className="ax-sys__svg" viewBox={`0 0 ${W} ${H}`} fill="none" focusable="false" aria-hidden="true">
        <defs>
          <radialGradient id={id("glow")} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={mid} stopOpacity="0.55" />
            <stop offset="55%" stopColor={mid} stopOpacity="0.14" />
            <stop offset="100%" stopColor={mid} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={id("core")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={light} />
            <stop offset="55%" stopColor={mid} />
            <stop offset="100%" stopColor={dark} />
          </linearGradient>
          <linearGradient id={id("in")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={d.color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={light} stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={id("out")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={light} stopOpacity="0.85" />
            <stop offset="100%" stopColor={d.color} stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* The core's light, brightening as the pointer approaches. */}
        <circle className="ax-sys__glow" cx={CORE.x} cy={CORE.y} r="118" fill={`url(#${id("glow")})`} />

        {/* ---- connections ---- */}
        <g className="ax-sys__lines ax-sys__lines--in" stroke={`url(#${id("in")})`} strokeWidth="1">
          {SRC_Y.map((y, i) => (
            <path key={i} id={id(`in-${i}`)} d={inPath(y, i)} pathLength="1" style={{ "--i": i }} />
          ))}
        </g>
        <g className="ax-sys__lines ax-sys__lines--out" stroke={`url(#${id("out")})`} strokeWidth="1">
          {DEC_Y.map((y, i) => (
            <path key={i} id={id(`out-${i}`)} d={outPath(y, i)} pathLength="1" style={{ "--i": i + 4 }} />
          ))}
        </g>
        <g className="ax-sys__lines ax-sys__lines--act" stroke={d.color} strokeOpacity="0.5" strokeWidth="1">
          {DEC_Y.map((y, i) => (
            <path key={i} id={id(`act-${i}`)} d={actPath(y)} pathLength="1" style={{ "--i": i + 7 }} />
          ))}
        </g>

        {/* ---- the core ---- */}
        <g className="ax-sys__core">
          <circle className="ax-sys__ring ax-sys__ring--far" cx={CORE.x} cy={CORE.y} r="110" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <g className="ax-sys__ring ax-sys__ring--arcs">
            <circle
              cx={CORE.x}
              cy={CORE.y}
              r="84"
              stroke={light}
              strokeOpacity="0.55"
              strokeWidth="1.25"
              strokeDasharray="132 396"
              strokeLinecap="round"
            />
            <circle
              cx={CORE.x}
              cy={CORE.y}
              r="84"
              stroke={light}
              strokeOpacity="0.55"
              strokeWidth="1.25"
              strokeDasharray="132 396"
              strokeDashoffset="-264"
              strokeLinecap="round"
            />
          </g>
          <circle
            className="ax-sys__ring ax-sys__ring--dash"
            cx={CORE.x}
            cy={CORE.y}
            r="60"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            strokeDasharray="1.5 7"
            strokeLinecap="round"
          />
          {/* The sphere, in four passes rather than one flat disc and a
              dot: a thin shell just outside it so it has an edge against
              the glow, the graded body, a soft highlight where the light
              falls, and a small bright centre with its own halo. */}
          <circle cx={CORE.x} cy={CORE.y} r={CORE.r + 7} fill="none" stroke={light} strokeOpacity="0.25" strokeWidth="1" />
          <circle className="ax-sys__disc" cx={CORE.x} cy={CORE.y} r={CORE.r} fill={`url(#${id("core")})`} />
          <circle cx={CORE.x} cy={CORE.y} r={CORE.r} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <circle cx={CORE.x - 13} cy={CORE.y - 13} r="17" fill="rgba(255,255,255,0.14)" />
          <circle cx={CORE.x - 17} cy={CORE.y - 17} r="7" fill="rgba(255,255,255,0.2)" />
          <circle cx={CORE.x} cy={CORE.y} r="9" fill="rgba(255,255,255,0.16)" />
          <circle cx={CORE.x} cy={CORE.y} r="3.75" fill="#fff" />
        </g>

        {/* ---- nodes ---- */}
        <g className="ax-sys__nodes">
          {SRC_Y.map((y, i) => (
            <g key={i}>
              <line x1={SRC_X - 28} y1={y} x2={SRC_X - 13} y2={y} stroke="rgba(255,255,255,0.32)" strokeWidth="1" />
              <circle cx={SRC_X} cy={y} r="10" fill="rgba(5,7,10,0.85)" stroke={d.color} strokeOpacity="0.5" strokeWidth="1" />
              <circle cx={SRC_X} cy={y} r="3.5" fill={d.color} />
            </g>
          ))}
          {DEC_Y.map((y, i) => (
            <g key={i}>
              <circle cx={DEC_X} cy={y} r="11" fill="rgba(5,7,10,0.85)" stroke={light} strokeOpacity="0.65" strokeWidth="1" />
              <circle cx={DEC_X} cy={y} r="4" fill={light} />
              {/* The thing the decision is written into: a tray with the
                  result dropping into it. */}
              <rect
                x={ACT_X - 8}
                y={y - 8}
                width="16"
                height="16"
                rx="3.5"
                stroke={d.color}
                strokeOpacity="0.55"
                strokeWidth="1"
                fill="rgba(5,7,10,0.9)"
              />
              <path
                d={`M ${ACT_X} ${y - 4.5} v 5.5 m -2.6 -2.4 2.6 2.6 2.6 -2.6`}
                fill="none"
                stroke={d.color}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d={`M ${ACT_X - 4} ${y + 4} h 8`} stroke={d.color} strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
            </g>
          ))}
        </g>

        {/* ---- signals ---- */}
        {leaving ? null : (
          <g className="ax-sys__pulses">
            {SRC_Y.map((y, i) => (
              <circle key={`in-${i}`} r="2.6" fill={d.color} className="ax-sys__pulse">
                <animateMotion dur="3.6s" repeatCount="indefinite" begin={`${i * 0.9}s`} calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1" keyPoints="0;1">
                  <mpath href={`#${id(`in-${i}`)}`} />
                </animateMotion>
              </circle>
            ))}
            {DEC_Y.map((y, i) => (
              <circle key={`out-${i}`} r="2.6" fill={light} className="ax-sys__pulse">
                <animateMotion dur="3s" repeatCount="indefinite" begin={`${1.4 + i * 1.0}s`} calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1" keyPoints="0;1">
                  <mpath href={`#${id(`out-${i}`)}`} />
                </animateMotion>
              </circle>
            ))}
            {DEC_Y.map((y, i) => (
              <circle key={`act-${i}`} r="2" fill={d.color} fillOpacity="0.9" className="ax-sys__pulse">
                <animateMotion dur="1.5s" repeatCount="indefinite" begin={`${3.2 + i * 1.0}s`}>
                  <mpath href={`#${id(`act-${i}`)}`} />
                </animateMotion>
              </circle>
            ))}
          </g>
        )}
      </svg>

      {/* ---- every word, as HTML ---- */}
      <div className="ax-sys__labels" aria-hidden="true">
        {d.sources.map((src, i) => (
          <span
            key={i}
            className="ax-sys__label ax-sys__label--src"
            style={{ right: pct(W - (SRC_X - 40), W), top: pct(SRC_Y[i], H), "--n": i }}
          >
            {src.label}
            <small>{src.sub}</small>
          </span>
        ))}

        <span className="ax-sys__label ax-sys__label--core" style={{ left: pct(CORE.x, W), top: pct(CORE.y + 124, H) }}>
          AI Brigade Intelligence Core
          <small>
            <b>{d.sector}</b>
            <span className="ax-sys__core-stack"> · models · policy · audit</span>
          </small>
        </span>

        {/* Decision, qualifier, and where it lands — one block, three
            lines, one left edge. */}
        {d.decisions.map((x, i) => (
          <span
            key={`d-${i}`}
            className="ax-sys__label ax-sys__label--dec"
            style={{ left: pct(DEC_X + 20, W), top: pct(DEC_Y[i], H), "--n": i }}
          >
            {x.label}
            <small>{x.sub}</small>
            <em className="ax-sys__action">{x.action}</em>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function IntelligenceSystem({ className = "" }) {
  const hostRef = useRef(null);
  const [slide, setSlide] = useState(0);
  /* The slide on its way out, drawn under the incoming one until its fade
     ends; and whether any slide has changed yet — the first one arrives
     with the page's own entrance, not a slide transition. */
  const [leaving, setLeaving] = useState(null);
  const [moved, setMoved] = useState(false);
  const leaveTimer = useRef(0);

  const go = useCallback(
    (next) => {
      if (next === slide) return;
      clearTimeout(leaveTimer.current);
      if (!prefersReducedMotion()) {
        setLeaving(slide);
        leaveTimer.current = setTimeout(() => setLeaving(null), LEAVE_MS);
      }
      setMoved(true);
      setSlide(next);
    },
    [slide]
  );
  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  /* The active chip's progress bar is the clock. */
  const onProgressEnd = (e) => {
    if (e.animationName !== "ax-sys-progress") return;
    go((slide + 1) % SLIDES.length);
  };

  /* Arrow keys move along the tabs, as a tab list should. */
  const onTabsKey = (e) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (slide + step + SLIDES.length) % SLIDES.length;
    go(next);
    e.currentTarget.querySelectorAll("[role=tab]")[next]?.focus();
  };

  /* ---- pointer tilt ----------------------------------------------------
     Target follows the pointer; the current value eases toward it in a
     rAF loop that runs only while there is distance left to cover. Written
     as CSS custom properties, so the CSS decides what each layer does with
     them — the scene tilts a few degrees, the labels drift a few pixels,
     the core brightens as the pointer nears it. */
  useEffect(() => {
    const host = hostRef.current;
    if (!host || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const target = { x: 0, y: 0, near: 0 };
    const current = { x: 0, y: 0, near: 0 };
    let raf = 0;

    const write = () => {
      host.style.setProperty("--sys-rx", current.x.toFixed(4));
      host.style.setProperty("--sys-ry", current.y.toFixed(4));
      host.style.setProperty("--sys-near", current.near.toFixed(4));
    };
    const step = () => {
      raf = 0;
      let moving = false;
      for (const k of ["x", "y", "near"]) {
        const dd = target[k] - current[k];
        if (Math.abs(dd) > 0.0015) {
          current[k] += dd * 0.085;
          moving = true;
        } else {
          current[k] = target[k];
        }
      }
      write();
      if (moving) raf = requestAnimationFrame(step);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      target.x = Math.max(-1, Math.min(1, nx));
      target.y = Math.max(-1, Math.min(1, ny));
      /* Distance from the core, in the visual's own space. */
      const cx = ((e.clientX - r.left) / r.width) * W;
      const cy = ((e.clientY - r.top) / r.height) * H;
      const dd = Math.hypot(cx - CORE.x, cy - CORE.y);
      target.near = Math.max(0, 1 - dd / 190);
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      target.near = 0;
      kick();
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const d = SLIDES[slide];

  return (
    <div className={`ax-sys-wrap ${className}`.trim()}>
      <div ref={hostRef} className="ax-sys" id="ax-sys-panel" role="tabpanel" aria-labelledby={`ax-sys-tab-${slide}`}>
        {leaving !== null ? <Scene key={`scene-${leaving}`} s={leaving} phase="leaving" /> : null}
        <Scene key={`scene-${slide}`} s={slide} phase={moved ? "entering" : ""} />

        {/* The readout: one line of what this sector's core just did, and
            that it is running. Decorative — the scene's `role="img"` label
            carries the meaning for assistive tech. */}
        <div className="ax-sys__hud" aria-hidden="true">
          {/* Green, not coral: coral is this site's "needs a human" colour
              (see sysv.css), and a pulsing coral dot beside "system active"
              read as an alarm. */}
          <span className="ax-sys__status">
            <span className="ax-sys__status-dot" />
            Live
          </span>
          <p className="ax-sys__event" key={slide}>
            <i className="ax-sys__event-mark" style={{ background: d.color }} />
            <code>{d.event.id}</code>
            <span>{d.event.text}</span>
          </p>
        </div>
      </div>

      {/* The slide tabs — the sector row that used to sit beside the logo
          in the navigation. Each in its sector's colour; the selected one
          fills with the time left on its slide. */}
      <div className="ax-sys__sectors" role="tablist" aria-label="Sectors" onKeyDown={onTabsKey}>
        {SLIDES.map((x, i) => (
          <button
            key={x.sector}
            type="button"
            role="tab"
            id={`ax-sys-tab-${i}`}
            aria-selected={i === slide}
            aria-controls="ax-sys-panel"
            tabIndex={i === slide ? 0 : -1}
            className={`ax-sys__sector${i === slide ? " is-on" : ""}`}
            style={{ "--c": x.color }}
            onClick={() => go(i)}
            onAnimationEnd={i === slide ? onProgressEnd : undefined}
          >
            {x.sector}
          </button>
        ))}
      </div>
    </div>
  );
}
