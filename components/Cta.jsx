"use client";

import Link from "next/link";
import { usePopup } from "@/components/PopupContext";
import MaskHeading from "@/components/motion/MaskHeading";
import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";

/* The spine every system runs on — the deck's four steps in the deck's
   four colours (teal, blue, violet, green), each with the few words the
   page already uses for it. */
const ROUTE = [
  { label: "Listen", text: "Calls, documents, events", color: "#2fd3c0" },
  { label: "Understand", text: "Intent, context and policy", color: "#6f95ff" },
  { label: "Reason", text: "Models and your rules, together", color: "#c79bf5" },
  { label: "Act", text: "Executes across your systems", color: "#4ade80" },
];

const ARROW = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 12h13M13 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * "Bring us one problem" — the closing card on the home page, /company,
 * /blog and every post.
 *
 * It was the Webflow template's CTA: a flat violet slab, a clay chain
 * render and a square dark button — the one block on those pages still in
 * the template's language rather than the site's. It is now built from
 * the site's own material: an ink card with the engineering grid and the
 * violet bloom, the display face, the hero's white pill, and on the right
 * the Listen → Understand → Reason → Act route every system runs on, with
 * a pulse running down it. `id="cta"` is kept: refine.css sets its
 * scroll margin, and anchors point at it.
 */
export default function Cta() {
  const { startTransition } = usePopup();
  const go = (href) => (e) => {
    e.preventDefault();
    startTransition(href);
  };

  return (
    <section id="cta" className="ax-cta" aria-labelledby="cta-title">
      <div className="padding-global">
        <div className="container-large">
          <div className="ax-cta__card">
            <span className="ax-cta__grid" aria-hidden="true" />
            <span className="ax-cta__glow" aria-hidden="true" />

            <div className="ax-cta__copy">
              <p className="ax-cta__label">Start here</p>
              <h2 id="cta-title" className="ax-cta__title">
                <MaskHeading text={"Bring us\n*one problem.*"} />
              </h2>
              <Reveal variant="rise" delay={0.15}>
                <p className="ax-cta__lede">
                  We&rsquo;ll scope it with your team, build the system that handles it, and
                  measure the result against your own baseline &mdash; in weeks, not a
                  transformation program.
                </p>
              </Reveal>
              <Reveal variant="rise" delay={0.25} className="ax-cta__actions">
                <Magnetic>
                  <Link href="/contact" className="ax-hero__cta" onClick={go("/contact")}>
                    Start the conversation
                    {ARROW}
                  </Link>
                </Magnetic>
                <a href="/#reels" className="ax-cta__ghost" onClick={go("/#reels")}>
                  See what we&rsquo;ve built
                  {ARROW}
                </a>
                <p className="ax-cta__note">
                  <span className="ax-cta__note-dot" aria-hidden="true" />
                  A person replies within one business day.
                </p>
              </Reveal>
            </div>

            <Reveal variant="rise" delay={0.2} className="ax-cta__side">
              <p className="ax-cta__side-label">Every system we build</p>
              <ol className="ax-cta__route">
                {ROUTE.map((r, i) => (
                  <li key={r.label} className="ax-cta__node" style={{ "--c": r.color }}>
                    <span className="ax-cta__node-mark" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="ax-cta__node-body">
                      <span className="ax-cta__node-name">{r.label}</span>
                      <span className="ax-cta__node-text">{r.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
