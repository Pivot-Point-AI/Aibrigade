"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePopup } from "@/components/PopupContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaDark from "@/components/CtaDark";
import MaskHeading from "@/components/motion/MaskHeading";
import Reveal from "@/components/motion/Reveal";
import ProjectMedia from "@/components/projects/ProjectMedia";
import LanguageSwitcher from "@/components/projects/LanguageSwitcher";
import ProjectResources from "@/components/projects/ProjectResources";
import { LANGUAGES, defaultLanguage, formatDuration, languageCodes } from "@/components/projects.data";
import { getUseCase, otherUseCases } from "@/components/usecases.data";

/**
 * One use case — a product we have built, on its own page.
 *
 * This replaced the client case-study template (CaseStudy.jsx) that
 * /icu, /halyk and /uub rendered. That page was built around a client
 * name, a headline metric and a reel, and all three were placeholders.
 * Everything here is the product's own — its demo, its documents, the
 * chain it runs — so there is nothing on the page that a prospect could
 * check and find missing.
 *
 * The order is the order a buyer asks in:
 *
 *   1. What is it, and can I see it?   hero — headline, lede and the demo
 *                                       itself, playable in every language
 *                                       it ships in; the spec line under it
 *   2. What does it actually do?       the chain, step by step
 *   3. What does it bring?             the features, as one spec grid
 *   4. What is it made of?             the platform capabilities it chains
 *   5. (Fraud Detection) How is it delivered?
 *   6. What else have you built?       the other seven
 *
 * The hero used to show a still frame of the demo with a play button that
 * only scrolled to a second dark band showing the same frame again, and
 * the product's facts were spread over pills in the hero, a caption in
 * that band and a sticky card beside the features. The player now sits in
 * the hero and the facts sit in one line under it.
 *
 * Dark bands use the AI Lab page's surface; light bands take the home
 * page's idiom — the violet-to-ink heading gradient, hairline frames.
 */

const Arrow = ({ d = "M5 12h13M13 6l6 6-6 6" }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={d} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const COUNT = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

/* "Voice AI · Call Center" beside a sector of "Call center" says the
   sector twice; the spec line keeps only what the type adds. */
const productKind = (uc) =>
  uc.type
    .split("·")
    .map((s) => s.trim())
    .filter((s) => s.toLowerCase() !== String(uc.sector).toLowerCase())
    .join(" · ");

/* ---- the demo, in the hero -------------------------------------------- */

function Player({ uc }) {
  const codes = languageCodes(uc);
  const [code, setCode] = useState(() => defaultLanguage(uc));
  const stageRef = useRef(null);
  // Same hand-off ProjectCard makes: a language change while the demo is
  // playing keeps it playing in the new language.
  const [resumeToken, setResumeToken] = useState(0);

  const changeLanguage = useCallback((next) => {
    const v = stageRef.current?.querySelector("video");
    const wasPlaying = Boolean(v && !v.paused && !v.ended);
    setCode(next);
    setResumeToken(wasPlaying ? Date.now() : 0);
  }, []);

  const video = code ? uc.videos[code] : null;
  if (!video) return null;
  const lang = LANGUAGES[code];

  return (
    <div className="ax-uc__player" data-orientation={uc.posterOrientation}>
      <div ref={stageRef} className="ax-uc__player-stage">
        <ProjectMedia
          video={video}
          code={code}
          projectName={uc.name}
          variant="featured"
          resumeToken={resumeToken}
        />
      </div>

      <div className="ax-uc__player-bar">
        {codes.length > 1 ? (
          <LanguageSwitcher
            codes={codes}
            active={code}
            onChange={changeLanguage}
            projectName={uc.name}
          />
        ) : (
          <p className="ax-uc__player-label">Product demo</p>
        )}
        {video.duration ? (
          <p className="ax-uc__player-meta">
            <span>{formatDuration(video.duration)}</span>
            {lang ? lang.english : null}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ---- the page ---------------------------------------------------------- */

export default function UseCase({ id }) {
  const { startTransition } = usePopup();
  const uc = getUseCase(id);

  const go = (href) => (e) => {
    e.preventDefault();
    startTransition(href);
  };
  const toSection = (target) => (e) => {
    const el = document.getElementById(target);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!uc) return null;
  const others = otherUseCases(id);
  const n = String(uc.index + 1).padStart(2, "0");

  // The feature grid runs four across when the count divides by four
  // (InCall, Fraud Detection: eight), three otherwise. A row left one
  // short takes the "next step" cell, so the grid always closes square.
  const featureCount = uc.features.length;
  const cols = featureCount % 4 === 0 ? 4 : 3;
  const fillLg = featureCount % cols !== 0;
  const fillMd = featureCount % 2 !== 0;

  return (
    <>
      <Navbar />
      <main className="ax-uc">
        {/* ---------------- 1. hero ---------------- */}
        <header className="ax-uc__hero">
          <div className="ax-uc__grid-bg" aria-hidden="true" />
          <div className="ax-uc__glow" aria-hidden="true" />

          <div className="padding-global">
            <div className="container-large">
              <div className="ax-uc__hero-layout" data-orientation={uc.posterOrientation}>
                <div className="ax-uc__hero-copy">
                  <nav className="ax-kicker ax-kicker--invert ax-uc__kicker" aria-label="Breadcrumb">
                    <span>{n}</span>
                    <a href="/#reels" onClick={go("/#reels")}>
                      Use cases
                    </a>
                    <i aria-hidden="true">/</i>
                    {/* Not a <span>: `.ax-kicker > span` is the number pill. */}
                    <b className="ax-uc__kicker-here" aria-current="page">
                      {uc.sector}
                    </b>
                  </nav>

                  <p className="ax-uc__product">
                    <strong>{uc.name}</strong>
                    <span>{uc.searchTitle}</span>
                  </p>

                  <h1 className="ax-uc__title">
                    <MaskHeading text={uc.headline} delay={0.1} />
                  </h1>

                  <Reveal variant="rise" delay={0.3} immediate>
                    <p className="ax-uc__lede">{uc.overview[0]}</p>
                  </Reveal>

                  <Reveal variant="rise" delay={0.42} immediate className="ax-uc__actions">
                    <Link href="/contact" className="ax-uc__cta" onClick={go("/contact")}>
                      Talk to us about {uc.name}
                      <Arrow />
                    </Link>
                    {uc.resources?.length ? (
                      <ProjectResources resources={uc.resources} projectName={uc.name} heading={false} />
                    ) : (
                      <a href="#how" className="ax-uc__ghost" onClick={toSection("how")}>
                        How it runs
                        <Arrow d="M12 5v13M6 13l6 6 6-6" />
                      </a>
                    )}
                  </Reveal>
                </div>

                <Reveal variant="rise" delay={0.5} immediate className="ax-uc__hero-media">
                  <Player uc={uc} />
                </Reveal>
              </div>

              {/* The facts a buyer scans for, in one line. */}
              <Reveal variant="rise" delay={0.6} immediate as="dl" className="ax-uc__facts">
                <div className="ax-uc__fact">
                  <dt>Sector</dt>
                  <dd>{uc.sector}</dd>
                </div>
                {uc.audience ? (
                  <div className="ax-uc__fact ax-uc__fact--wide">
                    <dt>Built for</dt>
                    <dd>{uc.audience}</dd>
                  </div>
                ) : null}
                <div className="ax-uc__fact">
                  <dt>Product</dt>
                  <dd>{productKind(uc)}</dd>
                </div>
                <div className="ax-uc__fact">
                  <dt>Languages</dt>
                  <dd className="ax-uc__langs">
                    {/* The separator sits between the labels, never
                        inside one: inside an RTL label it lands on the
                        wrong side of the word. */}
                    {uc.languages.map((l, i) => (
                      <span key={l.code} className="ax-uc__lang">
                        {i > 0 ? <i aria-hidden="true">·</i> : null}
                        <span lang={l.code} dir={l.dir} title={l.english}>
                          {l.label}
                        </span>
                      </span>
                    ))}
                  </dd>
                </div>
              </Reveal>
            </div>
          </div>
        </header>

        {/* ---------------- 2. the chain ---------------- */}
        <section id="how" className="ax-uc__flow" aria-labelledby="uc-flow-title">
          <div className="padding-global">
            <div className="container-large">
              <Reveal variant="rise" className="ax-uc__head">
                <div>
                  <p className="ax-uc__label">How it runs</p>
                  <h2 id="uc-flow-title" className="ax-uc__h2">
                    From the first request <br />
                    to the finished action.
                  </h2>
                </div>
                <p className="ax-uc__head-text">{uc.overview[1] || uc.overview[0]}</p>
              </Reveal>

              <Reveal
                variant="stagger"
                selector=".ax-uc__step"
                className="ax-uc__steps"
                as="ol"
                style={{ "--n": uc.flow.length }}
              >
                {uc.flow.map((s, i) => (
                  <li className="ax-uc__step" key={s.name}>
                    <span className="ax-uc__step-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="ax-uc__step-name">{s.name}</span>
                    <p className="ax-uc__step-text">{s.text}</p>
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- 3. what it brings ---------------- */}
        <section className="ax-uc__brings" aria-labelledby="uc-features-title">
          <div className="padding-global">
            <div className="container-large">
              <Reveal variant="rise" className="ax-uc__head">
                <div>
                  <p className="ax-uc__label">What it brings</p>
                  <h2 id="uc-features-title" className="ax-uc__h2">
                    Built to do the work, <br />
                    not describe it.
                  </h2>
                </div>
                {uc.stats?.length ? (
                  <dl className="ax-uc__stats">
                    {uc.stats.map((s) => (
                      <div className="ax-uc__stat" key={s.label}>
                        <dt className="ax-uc__stat-label">{s.label}</dt>
                        <dd className="ax-uc__stat-value">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </Reveal>

              {/* One reveal for the whole grid: the hairlines are the gaps
                  between cells, and a cell scaling in on its own shows
                  them as grey slabs. */}
              <Reveal
                variant="rise"
                className="ax-uc__features"
                as="ul"
                data-cols={cols}
                data-fill-lg={fillLg || undefined}
                data-fill-md={fillMd || undefined}
              >
                {uc.features.map((f, i) => (
                  <li className="ax-uc__feature" key={f.title}>
                    <span className="ax-uc__feature-n">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="ax-uc__feature-title">{f.title}</h3>
                    <p className="ax-uc__feature-text">{f.text}</p>
                  </li>
                ))}
                <li className="ax-uc__feature ax-uc__feature--fill">
                  <span className="ax-uc__feature-n">Next step</span>
                  <p className="ax-uc__feature-title">Bring us one problem.</p>
                  <Link href="/contact" className="ax-uc__fill-link" onClick={go("/contact")}>
                    Talk to us about {uc.name}
                    <Arrow />
                  </Link>
                </li>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- 4. built from ---------------- */}
        <section className="ax-uc__build" aria-labelledby="uc-build-title">
          <div className="ax-uc__grid-bg" aria-hidden="true" />
          <div className="padding-global">
            <div className="container-large">
              <Reveal variant="rise" className="ax-uc__head">
                <div>
                  <p className="ax-uc__label ax-uc__label--invert">Built from</p>
                  <h2 id="uc-build-title" className="ax-uc__h2 ax-uc__h2--invert">
                    {COUNT[uc.capabilities.length] || uc.capabilities.length} building blocks,{" "}
                    <br />
                    one chain.
                  </h2>
                </div>
                <p className="ax-uc__head-text ax-uc__head-text--invert">
                  {uc.name} runs on{" "}
                  {(COUNT[uc.capabilities.length] || String(uc.capabilities.length)).toLowerCase()} of
                  the capabilities every AI Brigade system is built from, chained in the order it
                  uses them.
                </p>
              </Reveal>

              <Reveal
                variant="stagger"
                selector=".ax-uc__cap"
                className="ax-uc__caps"
                as="ol"
                data-n={uc.capabilities.length}
                style={{ "--n": uc.capabilities.length }}
              >
                {uc.capabilities.map((c) => (
                  <li className="ax-uc__cap" key={c.title} style={{ "--cap": c.color }}>
                    <span className="ax-uc__cap-domain">{c.domain}</span>
                    <span className="ax-uc__cap-title">{c.title}</span>
                    <span className="ax-uc__cap-text">{c.line}</span>
                  </li>
                ))}
              </Reveal>

              {uc.stack?.length ? (
                <Reveal variant="rise" className="ax-uc__stack">
                  <p className="ax-uc__stack-label">Under the hood</p>
                  <ul className="ax-uc__stack-list">
                    {uc.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>

        {/* ---------------- 5. delivery (where the product says) ---------------- */}
        {uc.delivery?.length ? (
          <section className="ax-uc__delivery" aria-labelledby="uc-delivery-title">
            <div className="padding-global">
              <div className="container-large">
                <Reveal variant="rise" className="ax-uc__head">
                  <div>
                    <p className="ax-uc__label">How it is delivered</p>
                    <h2 id="uc-delivery-title" className="ax-uc__h2">
                      Shadow-run first. <br />
                      Trusted after.
                    </h2>
                  </div>
                  <p className="ax-uc__head-text">
                    Nothing decides until it has been proven against live traffic — and nothing
                    ships without a way to switch it off.
                  </p>
                </Reveal>
                <Reveal variant="stagger" selector=".ax-uc__phase" className="ax-uc__phases" as="ol">
                  {uc.delivery.map((d, i) => (
                    <li className="ax-uc__phase" key={d.name}>
                      <span className="ax-uc__phase-n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="ax-uc__phase-name">{d.name}</span>
                      <p className="ax-uc__phase-text">{d.text}</p>
                    </li>
                  ))}
                </Reveal>
              </div>
            </div>
          </section>
        ) : null}

        {/* ---------------- 6. more use cases ---------------- */}
        <section className="ax-uc__more" aria-labelledby="uc-more-title">
          <div className="padding-global">
            <div className="container-large">
              <Reveal variant="rise" className="ax-uc__head ax-uc__head--solo">
                <div>
                  <p className="ax-uc__label">More use cases</p>
                  <h2 id="uc-more-title" className="ax-uc__h2">
                    The same building blocks, <br />
                    other workflows.
                  </h2>
                </div>
              </Reveal>

              <Reveal variant="stagger" selector=".ax-uc__card" className="ax-uc__cards" as="ul">
                {others.map((o) => (
                  <li key={o.id} className="ax-uc__card">
                    <a href={o.href} className="ax-uc__card-link" onClick={go(o.href)}>
                      {/* A phone screen cropped to a landscape tile shows
                          only its status bar, so a portrait frame stands
                          whole on a blurred wash of itself instead. */}
                      <span className="ax-uc__card-media" data-orientation={o.posterOrientation}>
                        {o.poster && o.posterOrientation === "portrait" ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={o.poster} alt="" loading="lazy" className="ax-uc__card-wash" />
                        ) : null}
                        {o.poster ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={o.poster} alt="" loading="lazy" className="ax-uc__card-img" />
                        ) : null}
                      </span>
                      <span className="ax-uc__card-body">
                        <span className="ax-uc__card-sector">{o.sector}</span>
                        <span className="ax-uc__card-name">{o.name}</span>
                        <span className="ax-uc__card-line">{o.useCase}</span>
                      </span>
                      <span className="ax-uc__card-arrow" aria-hidden="true">
                        <Arrow />
                      </span>
                    </a>
                  </li>
                ))}
                {/* Seven others leave one slot in a four-column row; the
                    way back to the whole showcase takes it. */}
                <li className="ax-uc__card ax-uc__card--all">
                  <a href="/#reels" className="ax-uc__card-link" onClick={go("/#reels")}>
                    <span className="ax-uc__card-body">
                      <span className="ax-uc__card-sector">The portfolio</span>
                      <span className="ax-uc__card-name">
                        All {others.length + 1} products, running
                      </span>
                      <span className="ax-uc__card-line">
                        Every demo, in every language it ships in.
                      </span>
                    </span>
                    <span className="ax-uc__card-go">
                      See every demo
                      <Arrow />
                    </span>
                  </a>
                </li>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <CtaDark />
      <Footer />
    </>
  );
}
