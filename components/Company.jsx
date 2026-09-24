import MaskHeading from "@/components/motion/MaskHeading";
import Reveal from "@/components/motion/Reveal";
import TransitionLink from "@/components/TransitionLink";
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
 * the product, gathered on one page and written for the reader who has
 * already seen the work and is now deciding whether to trust the people.
 *
 * Built from the same parts as the other inner pages: the ink band the
 * contact page and the AI Lab open with, `MaskHeading` on the h1,
 * `Reveal` for the rest, tokens from system.css. It does NOT re-mount the
 * home page's Services, Features or Reviews sections: those carry the
 * home page's chapter numbers ("05", "06"…) and its section ids, and
 * would read as a copy of the home page with the wrong numbering.
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

const cap = (title) => whyUs.find((c) => c.title === title);

/* The hero's arrow, as the panel beside the headline: the four verbs
   every system we build is made of, in the deck's colours. */
const SPINE = ["Listen", "Understand", "Reason", "Act"].map((t) => cap(t));

const NUMBER = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

const FACTS = [
  { value: String(projects.length), label: "Products built, each with a demo you can watch" },
  { value: "6", label: "Sectors, from fintech to energy" },
  { value: String(OFFICES.length), label: "Offices — New Jersey · Dubai · Islamabad" },
  { value: "4", label: "Ways to run it: cloud, on-prem, hybrid or air-gapped" },
];

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
  {
    title: features.find((f) => f.title === "Evidence, not dependency").title,
    text: features.find((f) => f.title === "Evidence, not dependency").text,
  },
];

const STAGES = ["Identify", "Prove", "Measure", "Scale"].map((t) => features.find((f) => f.title === t));

/* The four sector tracks, each with its headline, three of its agents
   and how its proof is qualified — "Proof built" and "Transferable
   proof" are not interchangeable (see services.data.js). */
const SECTORS = services.map((s, i) => ({ ...SERVICE_DETAIL[i], title: s.title }));

export default function Company() {
  return (
    <main className="ax-co">
      {/* ---------- hero ---------- */}
      <section className="ax-co__hero">
        <span className="ax-co__hero-grid" aria-hidden="true" />
        <span className="ax-co__hero-glow" aria-hidden="true" />
        <div className="padding-global">
          <div className="container-large">
            <div className="ax-co__hero-layout">
              <div className="ax-co__hero-copy">
                <span className="ax-page-eyebrow">Company</span>
                <h1 className="ax-co__title">
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

              <Reveal variant="clip" immediate className="ax-co__spine">
                <p className="ax-co__spine-label">Every system we build</p>
                <ol>
                  {SPINE.map((c, i) => (
                    <li key={c.title} style={{ "--c": c.color }}>
                      <span className="ax-co__spine-n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="ax-co__spine-body">
                        <strong>{c.title}</strong>
                        <span>{c.text.split(". ")[0].replace(/\.$/, "")}.</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <Reveal variant="stagger" selector=".ax-co__fact" className="ax-co__facts">
              {FACTS.map((f) => (
                <div className="ax-co__fact" key={f.label}>
                  <span className="ax-co__fact-value">{f.value}</span>
                  <span className="ax-co__fact-label">{f.label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- who we are ---------- */}
      <section className="ax-co__section ax-co__about" aria-labelledby="co-about-title">
        <div className="padding-global">
          <div className="container-large">
            <div className="ax-co__about-layout">
              <Reveal variant="rise" className="ax-co__head">
                <span className="ax-co__eyebrow">Who we are</span>
                <h2 id="co-about-title" className="ax-co__h2">
                  An execution layer, <span>not another screen to manage.</span>
                </h2>
              </Reveal>
              <Reveal variant="rise" delay={0.1} className="ax-co__about-copy">
                <p>
                  Most enterprise AI stops at the answer. A person still reviews it, decides and
                  takes the action. We build the other kind: agentic systems that read a request
                  against what your organisation knows, weigh it against your rules and policy,
                  and execute across systems, tools and teams — end to end.
                </p>
                <p>
                  We work in fintech and banking, healthtech, retail and customer operations, and
                  industrial and energy, and we start every engagement the same way: with one
                  workflow, not a transformation program.
                </p>
                <ul className="ax-co__offices">
                  {OFFICES.map((o) => (
                    <li key={o.id}>
                      <strong>{o.city}</strong>
                      <span>{o.country}</span>
                      <em>{o.role}</em>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- principles ---------- */}
      <section className="ax-co__section ax-co__principles" aria-labelledby="co-principles-title">
        <div className="padding-global">
          <div className="container-large">
            <Reveal variant="rise" className="ax-co__head ax-co__head--row">
              <div>
                <span className="ax-co__eyebrow">What we hold ourselves to</span>
                <h2 id="co-principles-title" className="ax-co__h2">
                  Four rules we build by.
                </h2>
              </div>
              <p className="ax-co__head-note">
                They decide what we build, what we will not build, and what we say about it.
              </p>
            </Reveal>
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

      {/* ---------- how we work ---------- */}
      <section className="ax-co__section ax-co__work" aria-labelledby="co-work-title">
        <div className="padding-global">
          <div className="container-large">
            <Reveal variant="rise" className="ax-co__head ax-co__head--row">
              <div>
                <span className="ax-co__eyebrow">How we work</span>
                <h2 id="co-work-title" className="ax-co__h2">
                  Start with one workflow. <span>Earn the right to expand.</span>
                </h2>
              </div>
              <p className="ax-co__head-note">
                No enterprise-wide transformation program is required to establish whether the
                approach works.
              </p>
            </Reveal>
            <Reveal variant="stagger" selector=".ax-co__stage" as="ol" className="ax-co__stages">
              {STAGES.map((s, i) => (
                <li className="ax-co__stage" key={s.title}>
                  <span className="ax-co__stage-n">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- sectors ---------- */}
      <section className="ax-co__section ax-co__sectors" aria-labelledby="co-sectors-title">
        <div className="padding-global">
          <div className="container-large">
            <Reveal variant="rise" className="ax-co__head ax-co__head--row">
              <div>
                <span className="ax-co__eyebrow">Where we work</span>
                <h2 id="co-sectors-title" className="ax-co__h2">
                  Six sectors, <span>one execution layer.</span>
                </h2>
              </div>
              <TransitionLink href="/#services" className="ax-co__more">
                The digital workforce, agent by agent
                {ARROW}
              </TransitionLink>
            </Reveal>
            <Reveal variant="stagger" selector=".ax-co__sector" as="ul" className="ax-co__sector-grid">
              {SECTORS.map((s) => (
                <li className="ax-co__sector" key={s.short} style={{ "--c": s.accent }}>
                  <p className="ax-co__sector-name">{s.title.split(" — ")[0]}</p>
                  <h3>{s.headline}</h3>
                  <ul className="ax-co__agents">
                    {s.builds.slice(0, 3).map((b) => (
                      <li key={b.name}>{b.name}</li>
                    ))}
                  </ul>
                  <p className="ax-co__proof">
                    <span>{s.proof.kind}</span>
                    {s.proof.items.join(" · ")}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- clients ---------- */}
      <section className="ax-co__clients" aria-labelledby="co-clients-title">
        <div className="padding-global">
          <div className="container-large">
            <div className="ax-co__clients-inner">
              <p id="co-clients-title" className="ax-co__clients-label">
                Trusted by teams at
              </p>
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
        </div>
      </section>
    </main>
  );
}
