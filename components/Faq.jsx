"use client";

import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import { usePopup } from "@/components/PopupContext";
import Reveal from "@/components/motion/Reveal";
import Kicker from "@/components/motion/Kicker";
import { FAQ } from "@/components/faq.data";

/**
 * The questions a buyer asks before the first call, answered — between
 * the reviews and "Give us a business problem".
 *
 * It is also the page's answer-engine surface. Search and AI answer
 * engines lift question-and-answer pairs close to verbatim, and they
 * cite the page the pair was on; the FAQPage JSON-LD in app/page.jsx is
 * built from the same list (components/faq.data.js), which is where the
 * copy and its sources live.
 *
 * A question explorer, the Services chapter's pattern (ServiceExplorer,
 * svc.css): the questions down the left, the chosen one's answer in the
 * violet panel on the right. Unlike that panel, which renders only the
 * open tab, every answer here is in the server HTML — they are stacked in
 * one grid cell and only the chosen one is visible, as the Featured
 * chapter stacks its briefs — so a crawler reads all nine, and the panel
 * is as tall as the longest answer and never jumps.
 *
 * One DOM for both layouts. Each item is a heading-wrapped button and its
 * answer region (the accordion pattern: `aria-expanded`, one open at a
 * time). On desktop the items are `display: contents`, so the buttons
 * fill the left column and the answers share the right one; below 992px
 * they stack, and each answer opens under its own question.
 *
 * Click or keyboard, not hover: moving the pointer from a question
 * across to its answer must not pass over another question and swap it.
 */
export default function Faq() {
  const { startTransition } = usePopup();
  const [active, setActive] = useState(0);
  const buttons = useRef([]);
  const last = FAQ.length - 1;

  const go = (href) => (e) => {
    e.preventDefault();
    startTransition(href);
  };

  const step = (by) => setActive((i) => (i + by + FAQ.length) % FAQ.length);

  const onKeyDown = (e) => {
    let next = null;
    if (e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };

  const count = (i) => String(i + 1).padStart(2, "0");

  return (
    <div id="faq" className="section_faq">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-faq">
            <Kicker id="faq" label="Before the first call" />
            <Reveal variant="rise" className="_3-columns-grid">
              <h2 className="heading-style-h4 _2 _3 heading-30pt-tablet heading-40pt-ipad_pro">
                What buyers ask first. <br />
                <span className="text-span">Answered plainly.</span>
              </h2>
              <p className="p2 max-width-medium _2 text-16pt-ipad_pro">
                The questions that come up before every first call, answered from what we have
                already built.
              </p>
            </Reveal>

            <Reveal variant="rise" className="ax-faq" style={{ "--n": FAQ.length }}>
              {FAQ.map((f, i) => {
                const on = i === active;
                return (
                  <div className="ax-faq__item" key={f.id} data-active={on}>
                    <h3 className="ax-faq__q" style={{ "--row": i + 1 }}>
                      <button
                        type="button"
                        id={`faq-q-${f.id}`}
                        aria-expanded={on}
                        aria-controls={`faq-a-${f.id}`}
                        ref={(el) => (buttons.current[i] = el)}
                        className="ax-faq__tab"
                        onClick={() => setActive(i)}
                        onKeyDown={onKeyDown}
                      >
                        <span className="ax-faq__tab-index" aria-hidden="true">
                          {count(i)}
                        </span>
                        <span className="ax-faq__tab-text">{f.q}</span>
                        <span className="ax-faq__tab-mark" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`faq-a-${f.id}`}
                      role="region"
                      aria-labelledby={`faq-q-${f.id}`}
                      className="ax-faq__panel"
                      data-active={on}
                    >
                      <div className="ax-faq__panel-inner">
                        <span className="ax-faq__mark" aria-hidden="true">
                          {count(i)}
                        </span>
                        <p className="ax-faq__count" aria-hidden="true">
                          Question <b>{count(i)}</b> / {count(last)}
                        </p>
                        {/* The question again, at the panel's size — the
                            button to the left already names this region
                            for assistive tech, so it is not read twice. */}
                        <p className="ax-faq__panel-q" aria-hidden="true">
                          {f.q}
                        </p>
                        <p className="ax-faq__panel-a">
                          {f.a.map((part, j) =>
                            typeof part === "string" ? (
                              <Fragment key={j}>{part}</Fragment>
                            ) : (
                              <Link key={j} href={part.href} onClick={go(part.href)}>
                                {part.text}
                              </Link>
                            )
                          )}
                        </p>

                        <div className="ax-faq__foot">
                          <Link href="/contact" className="ax-faq__ask" onClick={go("/contact")}>
                            Ask us something else
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                          <div className="ax-faq__steps">
                            <button type="button" className="ax-faq__step" onClick={() => step(-1)} aria-label="Previous question">
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 12H6M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                            <button type="button" className="ax-faq__step" onClick={() => step(1)} aria-label="Next question">
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
