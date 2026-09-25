import MaskHeading from "@/components/motion/MaskHeading";
import Reveal from "@/components/motion/Reveal";
import TransitionLink from "@/components/TransitionLink";
import IntelligenceSystem from "@/components/motion/IntelligenceSystem";
import Counter from "@/components/motion/Counter";
import { whyUs, features, services } from "@/components/data";
import { SERVICE_DETAIL } from "@/components/services.data";
import { projects } from "@/components/projects.data";
import { OFFICES } from "@/components/offices.data";
import { CLIENTS } from "@/components/clients.data";

/**
 * /company, page body.
 *
 * Who the company is, what it holds itself to and how it works — the
 * parts of the home page's argument that are about the firm rather than
 * the product, gathered on one page for the reader who has seen the work
 * and is now deciding whether to trust the people.
 *
 * Set in the home page's language rather than a look of its own: the
 * numbered `.ax-kicker` (path.css) over every chapter, the display-size
 * Neue Machina heading whose second line is the turn of the sentence in
 * violet, the lede pinned right behind a vertical hairline, and a
 * dark/light alternation — ink bands on the film black the home page's
 * dark bands share, light bands left transparent so the thread field
 * shows through.
 *
 * It does NOT re-mount the home page's Services, Features or Reviews
 * sections: those carry the home page's chapter numbers and section ids.
 *
 * Nothing here is a new claim. The principles restate `whyUs` and
 * `features` (components/data.js), the sectors are services.data.js, the
 * counts are the lengths of the lists they count, and the offices are
 * offices.data.js — the footer carries their addresses, so this page
 * carries what happens in each one instead. The client reviews are left
 * out on purpose: see the note on `reviews` in data.js.
 */

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

const PIN = "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11zM12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z";

const CHECK = "M5 12.5l4.5 4.5L19 7.5";

/* One glyph per sector track, in `services` order: the bank, the
   clinic, the storefront, the grid. */
const SECTOR_ICONS = [
  "M3.5 9.5L12 4l8.5 5.5M5.5 10v7.5M9.8 10v7.5M14.2 10v7.5M18.5 10v7.5M3.5 20h17",
  "M9.5 4h5v5.5H20v5h-5.5V20h-5v-5.5H4v-5h5.5z",
  "M4 9.5l1.5-5h13L20 9.5M4 9.5h16M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M5.5 12.5V20h13v-7.5M10 20v-4.5h4V20",
  "M13 3L5 13.5h6L10 21l8-10.5h-6z",
];

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const cap = (title) => whyUs.find((c) => c.title === title);

const NUMBER = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

const FACTS = [
  { value: String(projects.length), label: "Products built, each with a demo you can watch" },
  { value: "6", label: "Sectors, from fintech to energy" },
  { value: String(OFFICES.length), label: "Offices — New Jersey · Dubai · Islamabad" },
  { value: "4", label: "Ways to run it: cloud, on-prem, hybrid or air-gapped" },
];

const closer = features.find((f) => f.title === "Evidence, not dependency");

const PRINCIPLES = [
  {
    title: "Proof before promise",
    text: `We don't claim an outcome without naming the thing that was built. All ${
      NUMBER[projects.length] || projects.length
    } of our products have their own page and a demo you can watch.`,
  },
  {
    title: "The system does the work",
    text: "Most AI stops at the answer and leaves a person to act on it. Ours goes past the response: it acts in the system of record, and the record proves it did.",
  },
  {
    title: "A person wherever judgement is required",
    text: `${cap("Escalate").text} Thresholds live in a policy your team owns and can change.`,
  },
  { title: closer.title, text: closer.text },
];

const STAGES = ["Identify", "Prove", "Measure", "Scale"].map((t) => features.find((f) => f.title === t));

/* The four sector tracks, each with its headline, three of its agents
   and how its proof is qualified — "Proof built" and "Transferable
   proof" are not interchangeable (see services.data.js). */
const SECTORS = services.map((s, i) => ({ ...SERVICE_DETAIL[i], title: s.title }));

/**
 * A chapter's opening, as the home page sets it: the numbered kicker
 * across the top, the heading left with its second line in violet, the
 * lede right behind a hairline, and a rule under the lot.
 */
function Head({ n, label, title, accent, lede, id, invert, children }) {
  return (
    <Reveal variant="rise" className="ax-co__head">
      <p className={`ax-kicker${invert ? " ax-kicker--invert" : ""}`}>
        <span>{n}</span>
        {label}
      </p>
      <h2 id={id} className="ax-co__h2">
        {title}
        <br />
        <span>{accent}</span>
      </h2>
      <div className="ax-co__lede2">
        <p>{lede}</p>
        {children}
      </div>
    </Reveal>
  );
}

export default function Company() {
  return (
    <main className="ax-co">
      {/* ---------- hero ---------- */}
      <section className="ax-co__hero ax-co--dark">
        <span className="ax-co__hero-grid" aria-hidden="true" />
        <div className="padding-global">
          <div className="container-large">
            <div className="ax-co__hero-layout">
              <div className="ax-co__hero-copy">
                <span className="ax-page-eyebrow">Company</span>
                <h1 className="ax-co__title ax-co__title--fit">
                  <MaskHeading text={"The team behind\n*AI that does the work.*"} />
                </h1>
                <Reveal variant="rise" delay={0.2} immediate className="ax-co__lede">
                  <p>
                    AI Brigade builds enterprise AI that listens, understands, reasons and acts
                    inside the systems a business already runs — and hands the decision to a
                    person wherever judgement is required.
                  </p>
                </Reveal>
                <Reveal variant="rise" delay={0.3} immediate className="ax-co__actions">
                  <TransitionLink href="/contact" className="ax-co__btn">
                    <span>Bring us one problem</span>
                    {ARROW}
                  </TransitionLink>
                  <TransitionLink href="/#reels" className="ax-co__link">
                    See what we&rsquo;ve built
                  </TransitionLink>
                </Reveal>
              </div>

              {/* The home hero's drawing, as it is there: one intelligence
                  core per sector, played in turn. */}
              <div className="ax-co__hero-visual">
                <IntelligenceSystem />
              </div>
            </div>

            {/* `start` sits low because the rule is on the first screen at
                most desktop heights — see `immediate` in Reveal for what a
                reveal waiting below the fold does to above-the-fold copy. */}
            <Reveal variant="stagger" selector=".ax-co__fact" start="top 96%" className="ax-co__facts">
              {FACTS.map((f) => (
                <div className="ax-co__fact" key={f.label}>
                  <span className="ax-co__fact-value">
                    <Counter to={Number(f.value)} />
                  </span>
                  <span className="ax-co__fact-label">{f.label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 01 who we are — light ---------- */}
      <section className="ax-co__band ax-co__about" aria-labelledby="co-about-title">
        <div className="padding-global">
          <div className="container-large">
            <Head
              n="01"
              label="Who we are"
              id="co-about-title"
              title="An execution layer,"
              accent="not another screen."
              lede="Most enterprise AI stops at the answer, and a person still reviews it, decides and takes the action. We build the other kind: agentic systems that execute across systems, tools and teams — end to end."
            />
            <div className="ax-co__about-body">
              <Reveal variant="rise" className="ax-co__statement">
                <p>
                  We work in fintech and banking, healthtech, retail and customer operations, and
                  industrial and energy — and we start every engagement the same way:{" "}
                  <strong>with one workflow, not a transformation program.</strong>
                </p>
                <TransitionLink href="/contact" className="ax-co__more">
                  Talk to the team
                  {ARROW}
                </TransitionLink>
              </Reveal>
              <Reveal variant="stagger" selector=".ax-co__office" as="ul" className="ax-co__offices">
                {OFFICES.map((o) => (
                  <li className="ax-co__office" key={o.id}>
                    <span className="ax-co__office-mark">
                      <Icon d={PIN} />
                    </span>
                    <span className="ax-co__office-place">
                      <strong>{o.city}</strong>
                      <span>{o.country}</span>
                    </span>
                    <em>{o.role}</em>
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 02 principles — dark ---------- */}
      <section className="ax-co__band ax-co--dark ax-co__principles" aria-labelledby="co-principles-title">
        <div className="padding-global">
          <div className="container-large">
            <Head
              n="02"
              invert
              label="What we hold ourselves to"
              id="co-principles-title"
              title="Four rules"
              accent="we build by."
              lede="They decide what we build, what we will not build, and what we say about it."
            />
            <Reveal variant="stagger" selector=".ax-co__principle" as="ol" className="ax-co__principle-grid">
              {PRINCIPLES.map((p, i) => (
                <li className="ax-co__principle" key={p.title}>
                  <span className="ax-co__principle-n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 03 how we work — light ---------- */}
      <section className="ax-co__band ax-co__work" aria-labelledby="co-work-title">
        <div className="padding-global">
          <div className="container-large">
            <Head
              n="03"
              label="How we work"
              id="co-work-title"
              title="Start with one workflow."
              accent="Earn the right to expand."
              lede="No enterprise-wide transformation program is required to establish whether the approach works."
            />
            <Reveal variant="stagger" selector=".ax-co__stage" as="ol" className="ax-co__stages">
              {STAGES.map((s, i) => (
                <li className="ax-co__stage" key={s.title}>
                  <span className="ax-co__stage-dot" aria-hidden="true" />
                  <span className="ax-co__stage-n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 04 sectors — dark ---------- */}
      <section className="ax-co__band ax-co--dark ax-co__sectors" aria-labelledby="co-sectors-title">
        <div className="padding-global">
          <div className="container-large">
            <Head
              n="04"
              invert
              label="Where we work"
              id="co-sectors-title"
              title="Six sectors,"
              accent="one execution layer."
              lede="Four tracks, each with its own agents — and each says plainly whether its proof is already built or carried over from an adjacent sector."
            >
              <TransitionLink href="/#services" className="ax-co__more ax-co__more--invert">
                Every agent, sector by sector
                {ARROW}
              </TransitionLink>
            </Head>
            <Reveal variant="stagger" selector=".ax-co__sector" as="ul" className="ax-co__sector-grid">
              {SECTORS.map((s, i) => {
                const built = s.proof.kind === "Proof built";
                return (
                  <li className="ax-co__sector" key={s.short} style={{ "--c": s.accent }}>
                    <div className="ax-co__sector-head">
                      <span className="ax-co__sector-mark">
                        <Icon d={SECTOR_ICONS[i]} />
                      </span>
                      <p className="ax-co__sector-name">{s.short}</p>
                      <span className="ax-co__sector-n" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                        <span> / {String(SECTORS.length).padStart(2, "0")}</span>
                      </span>
                    </div>

                    <h3>{s.headline}</h3>

                    <div className="ax-co__agents-wrap">
                      <p className="ax-co__mini-label">
                        {NUMBER[s.builds.length] || s.builds.length} agents
                      </p>
                      <ul className="ax-co__agents">
                        {s.builds.map((b) => (
                          <li key={b.name} title={b.text}>
                            <Icon d={CHECK} />
                            {b.name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* `kind` is printed as written: "Proof built" and
                        "Transferable proof" are not interchangeable. */}
                    <div className="ax-co__proof" data-built={built ? "true" : "false"}>
                      <p className="ax-co__mini-label">
                        <span className="ax-co__proof-dot" aria-hidden="true" />
                        {s.proof.kind}
                      </p>
                      <ul className="ax-co__proof-items">
                        {s.proof.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      {s.proof.caveat ? <p className="ax-co__caveat">{s.proof.caveat}</p> : null}
                    </div>
                  </li>
                );
              })}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 05 clients — light ---------- */}
      <section className="ax-co__band ax-co__clients" aria-labelledby="co-clients-title">
        <div className="padding-global">
          <div className="container-large">
            <Reveal variant="rise">
              <p id="co-clients-title" className="ax-kicker">
                <span>05</span>
                Trusted by teams at
              </p>
            </Reveal>
            <Reveal variant="stagger" selector="li" as="ul" className="ax-co__logos">
              {CLIENTS.map((c) => (
                <li key={c.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.src} alt={c.name} loading="lazy" decoding="async" />
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
