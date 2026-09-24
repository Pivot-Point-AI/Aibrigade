"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { prefersReducedMotion } from "@/components/motion/gsapLoader";

/* How long each step stays lit while the panel plays itself. Long enough
   to read the readout line twice. The progress segments under the head
   run on the same number (`--hold`), so they cannot drift from it. */
const HOLD = 3600;

/* useLayoutEffect warns on the server; this is the usual guard. */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * The /company hero's panel: Listen → Understand → Reason → Act, as a
 * request actually moves through it.
 *
 * It plays itself, one step at a time, with the charged line filling down
 * to the lit ring and the readout under the list carrying that step's
 * second sentence. The reader takes over by pointing at a step (it lights
 * while the pointer is on the panel, and play resumes from there when it
 * leaves) or by clicking or focusing one (play stops for good — they have
 * chosen what to read). It only plays while it is on screen and never
 * under `prefers-reduced-motion`, where the steps still answer a click.
 *
 * The rows keep one height whichever step is lit: the longer sentence goes
 * in the readout, whose cell is as tall as its longest line, so nothing
 * beside or under the panel moves while it plays.
 *
 *   steps: [{ title, color, domain, lead, detail, icon }]
 */
export default function SpinePanel({ label, flow, steps }) {
  const trackRef = useRef(null);
  const markRefs = useRef([]);
  const centers = useRef([]);

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [chosen, setChosen] = useState(false); // clicked or focused: stop playing
  const [held, setHeld] = useState(false); // pointer or focus is on the panel
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(prefersReducedMotion()), []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = !chosen && !held && visible && !reduced;

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % steps.length), HOLD);
    return () => clearTimeout(id);
  }, [playing, active, steps.length]);

  /* The line is drawn between ring centres measured off the DOM, not
     assumed from the ring size: a lead that wraps to two lines at a narrow
     width makes that row taller, and a line computed from the ring alone
     would then stop short of the last ring. */
  const placeFill = useCallback((i) => {
    const el = trackRef.current;
    const c = centers.current;
    if (!el || !c.length) return;
    el.style.setProperty("--fill", `${c[i] - c[0]}px`);
  }, []);

  useIsoLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const top = el.getBoundingClientRect().top;
      centers.current = markRefs.current.map((m) => {
        const r = m.getBoundingClientRect();
        return r.top - top + r.height / 2;
      });
      const c = centers.current;
      if (!c.length) return;
      el.style.setProperty("--y0", `${c[0]}px`);
      el.style.setProperty("--yb", `${el.offsetHeight - c[c.length - 1]}px`);
      el.style.setProperty("--len", `${c[c.length - 1] - c[0]}px`);
      placeFill(activeRef.current);
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [placeFill]);

  useIsoLayoutEffect(() => {
    activeRef.current = active;
    placeFill(active);
  }, [active, placeFill]);

  const pick = (i) => {
    setActive(i);
    setChosen(true);
  };

  const onKeyDown = (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const n = steps.length;
    const next = (active + (e.key === "ArrowDown" ? 1 : n - 1)) % n;
    trackRef.current?.querySelectorAll("button")[next]?.focus();
  };

  /* A light that follows the pointer across the glass. Written straight
     onto the element — it is decoration, and a React render per
     pointermove would be the most expensive thing on the page. */
  const onPointerMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Reveal
      variant="clip"
      immediate
      className="ax-co__spine"
      data-playing={playing ? "true" : "false"}
      style={{ "--hold": `${HOLD}ms` }}
      onPointerMove={onPointerMove}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHeld(false)}
    >
      <span className="ax-co__spine-glow" aria-hidden="true" />

      <div className="ax-co__spine-head">
        <p className="ax-co__spine-label">{label}</p>
        <p className="ax-co__spine-flow" aria-hidden="true">
          {flow[0]} <span>→</span> {flow[1]}
        </p>
      </div>

      {/* One segment per step: the lit one runs for as long as the step
          holds, the ones before it stay full. Keyed on `playing` so a
          pause shows a full bar and a resume starts it from empty, in
          step with the timer above. */}
      <div className="ax-co__spine-progress" aria-hidden="true">
        {steps.map((s, i) => (
          <span key={s.title} style={{ "--c": s.color }} data-state={i < active ? "done" : i === active ? "on" : "next"}>
            <i key={i === active ? `${active}-${playing}` : "idle"} />
          </span>
        ))}
      </div>

      {/* The charged line, its lit length and the signal riding its tip
          sit beside the list rather than in it: an <ol> holds only <li>s. */}
      <div ref={trackRef} className="ax-co__spine-track">
        <span className="ax-co__spine-line" aria-hidden="true" />
        <span className="ax-co__spine-fill" aria-hidden="true" />
        <span className="ax-co__spine-signal" aria-hidden="true" />
        <ol className="ax-co__spine-list" onKeyDown={onKeyDown}>
          {steps.map((s, i) => {
            const state = i < active ? "done" : i === active ? "on" : "next";
            return (
              <li key={s.title} style={{ "--c": s.color }} data-state={state}>
                <button
                  type="button"
                  className="ax-co__spine-row"
                  aria-pressed={i === active}
                  aria-describedby={`ax-spine-detail-${i}`}
                  onClick={() => pick(i)}
                  onFocus={(e) => {
                    /* Keyboard focus picks the step; a mouse click already
                       does, through onClick. */
                    if (e.target.matches(":focus-visible")) pick(i);
                  }}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                >
                  <span
                    className="ax-co__spine-mark"
                    ref={(m) => {
                      markRefs.current[i] = m;
                    }}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d={s.icon}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="ax-co__spine-body">
                    <strong>
                      <em>{String(i + 1).padStart(2, "0")}</em>
                      {s.title}
                    </strong>
                    <span>{s.lead}</span>
                  </span>
                  <svg className="ax-co__spine-go" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M9 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Every step's second sentence, stacked in one cell so the box is
          as tall as the longest and never changes height. */}
      <div className="ax-co__spine-readout">
        {steps.map((s, i) => (
          <p
            key={s.title}
            id={`ax-spine-detail-${i}`}
            style={{ "--c": s.color }}
            data-on={i === active ? "true" : "false"}
            aria-hidden={i === active ? undefined : "true"}
          >
            <span className="ax-co__spine-tag">
              {String(i + 1).padStart(2, "0")} · {s.domain}
            </span>
            <span className="ax-co__spine-text">{s.detail}</span>
          </p>
        ))}
      </div>
    </Reveal>
  );
}
