import MaskHeading from "@/components/motion/MaskHeading";
import Reveal from "@/components/motion/Reveal";
import TransitionLink from "@/components/TransitionLink";
import IntelligenceSystem from "@/components/motion/IntelligenceSystem";
import Faq from "@/components/Faq";
import Counter from "@/components/motion/Counter";
import { Head, SectorGrid, ARROW, STAGES, FACTS } from "@/components/Company";
import { useCaseHref } from "@/components/usecases.data";
import { whyUs } from "@/components/data";
import { SERVICE_DETAIL } from "@/components/services.data";
import { FAQ, plainAnswer } from "@/components/faq.data";
import { SERVICE_PAGES } from "@/components/servicepages.data";

/**
 * /agentic-ai-solutions and /ai-automation-services, page body.
 *
 * Set in /company's language (company.css): the dark hero with the home
 * page's intelligence drawing, numbered chapters that alternate light and
 * dark, and the same cards, stages and sector grid. They do not re-mount
 * the home page's own sections, which carry its chapter numbers and ids
 * (see the note at the top of Company.jsx).
 *
 * The two pages share a skeleton but not a story. Agentic AI is about what
 * the agents are and do: the capabilities and the sectors. Automation is
 * about the workflow: where it runs, the six steps from request to outcome,
 * and where a person approves. Both end on how an engagement starts, then
 * the questions a buyer asks first.
 *
 * Every body string comes from data.js, faq.data.js or the home page's
 * Environments chapter, restated as written. See servicepages.data.js.
 */

const answer = (id) => plainAnswer(FAQ.find((f) => f.id === id).a);
const cap = (title) => whyUs.find((c) => c.title === title);
const pad = (i) => String(i + 1).padStart(2, "0");

/* One of the home page's capability cards, in /company's principle card. */
function Cards({ items, cols }) {
  return (
    <Reveal
      variant="stagger"
      selector=".ax-co__principle"
      as="ol"
      className={`ax-co__principle-grid${cols ? ` ax-co__principle-grid--${cols}` : ""}`}
    >
      {items.map((c, i) => (
        <li className="ax-co__principle" key={c.title} style={{ "--c": c.color }}>
          <span className="ax-co__principle-n">{pad(i)}</span>
          {/* The capability's group (Input, Judgement, Execution,
              Control) in its own colour, as the home page's cards use it. */}
          <p className="ax-co__mini-label ax-sp__domain">
            <span className="ax-co__proof-dot" aria-hidden="true" />
            {c.domain}
          </p>
          <h3>{c.title}</h3>
          <p>{c.text}</p>
        </li>
      ))}
    </Reveal>
  );
}

function Stages() {
  return (
    <Reveal variant="stagger" selector=".ax-co__stage" as="ol" className="ax-co__stages">
      {STAGES.map((s, i) => (
        <li className="ax-co__stage" key={s.title}>
          <span className="ax-co__stage-dot" aria-hidden="true" />
          <span className="ax-co__stage-n">{pad(i)}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </Reveal>
  );
}

/* Two statements side by side, as /company's "who we are" chapter sets them. */
function Statements({ left, right, leftLabel, rightLabel, cta = true }) {
  return (
    <div className="ax-co__about-body">
      <Reveal variant="rise" className="ax-co__statement">
        <p className="ax-sp__tag">{leftLabel}</p>
        <p>{left}</p>
        {cta ? (
          <TransitionLink href="/contact" className="ax-co__more">
            Talk to the team
            {ARROW}
          </TransitionLink>
        ) : null}
      </Reveal>
      <Reveal variant="rise" className="ax-co__statement">
        <p className="ax-sp__tag">{rightLabel}</p>
        <p>{right}</p>
      </Reveal>
    </div>
  );
}

function Hero({ page }) {
  return (
    <section className="ax-co__hero ax-co--dark">
      <span className="ax-co__hero-grid" aria-hidden="true" />
      <div className="padding-global">
        <div className="container-large">
          <div className="ax-co__hero-layout">
            <div className="ax-co__hero-copy">
              <span className="ax-page-eyebrow">{page.eyebrow}</span>
              <h1 className="ax-co__title ax-co__title--fit">
                <MaskHeading text={page.headline} />
              </h1>
              <Reveal variant="rise" delay={0.2} immediate className="ax-co__lede">
                <p>{page.lede}</p>
              </Reveal>
              <Reveal variant="rise" delay={0.3} immediate className="ax-co__actions">
                <TransitionLink href="/contact" className="ax-co__btn">
                  <span>Let&rsquo;s Start the Conversation</span>
                  {ARROW}
                </TransitionLink>
                <TransitionLink href="/#reels" className="ax-co__link">
                  See what we&rsquo;ve built
                </TransitionLink>
              </Reveal>
            </div>
            <div className="ax-co__hero-visual">
              <IntelligenceSystem slides={page.slides} label={page.slidesLabel} />
            </div>
          </div>

          {/* The company page's own figures: counts of the lists they
              count (products, sectors, offices), so they cannot drift. */}
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
  );
}

function Band({ dark, id, className = "", children }) {
  return (
    <section
      className={`ax-co__band${dark ? " ax-co--dark" : ""} ${className}`.trim()}
      aria-labelledby={id}
    >
      <div className="padding-global">
        <div className="container-large">{children}</div>
      </div>
    </section>
  );
}

function Questions({ ids }) {
  return <Faq items={ids.map((id) => FAQ.find((f) => f.id === id))} />;
}

/* Where to go next: the other service page, the voice product people
   searching for an AI call center want, and the company. Each line
   is the page's own description. */
function related(kind) {
  const link = (p) => ({ label: p.name, text: p.description, href: p.path });
  const callmate = {
    label: "CallMate",
    text: "An outbound AI voice agent for lead qualification, appointment booking and live call transfers.",
    href: useCaseHref("callmate"),
  };
  const company = {
    label: "Company",
    text: "Who AI Brigade is, the rules it builds by and how an engagement runs.",
    href: "/company",
  };
  if (kind === "whitelabel") return [link(SERVICE_PAGES.agentic), link(SERVICE_PAGES.automation), company];
  const other = kind === "agentic" ? SERVICE_PAGES.automation : SERVICE_PAGES.agentic;
  return [link(other), link(SERVICE_PAGES.whitelabel), callmate];
}

function Related({ kind }) {
  return (
    <section className="ax-co__band ax-sp__related" aria-labelledby="sp-related-title">
      <div className="padding-global">
        <div className="container-large">
          <Reveal variant="rise">
            <h2 id="sp-related-title" className="ax-sp__related-title">
              Keep exploring
            </h2>
          </Reveal>
          <Reveal variant="stagger" selector=".ax-sp__rel" as="ul" className="ax-sp__rel-grid">
            {related(kind).map((r) => (
              <li className="ax-sp__rel" key={r.href}>
                <TransitionLink href={r.href} className="ax-sp__rel-link">
                  <span className="ax-sp__rel-name">{r.label}</span>
                  <span className="ax-sp__rel-text">{r.text}</span>
                  <span className="ax-sp__rel-go" aria-hidden="true">
                    {ARROW}
                  </span>
                </TransitionLink>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Agentic({ page }) {
  return (
    <>
      <Hero page={page} />

      <Band id="sp-means-title" className="ax-co__about">
        <Head
          n="01"
          label="What agentic means"
          id="sp-means-title"
          title="Past the answer,"
          accent="into the action."
          lede="Most enterprise AI stops at the answer, and a person still reviews it, decides and takes the action."
        />
        <Statements
          leftLabel="The difference"
          left={answer("agentic")}
          rightLabel="No rip and replace"
          right={answer("systems")}
        />
      </Band>

      <Band dark id="sp-caps-title" className="ax-co__principles">
        <Head
          n="02"
          invert
          label="What every agent does"
          id="sp-caps-title"
          title="Eight capabilities,"
          accent="one governed system."
          lede="From the first input to the closing message, with the handoff to a person designed first."
        />
        <Cards items={whyUs} />
      </Band>

      <Band id="sp-work-title" className="ax-co__work">
        <Head
          n="03"
          label="How we start"
          id="sp-work-title"
          title="One workflow first,"
          accent="then the rest."
          lede="No enterprise-wide transformation program is required to establish whether the approach works."
        />
        <Stages />
      </Band>

      <Band dark id="sp-sectors-title" className="ax-co__sectors">
        <Head
          n="04"
          invert
          label="Where we work"
          id="sp-sectors-title"
          title="Four tracks,"
          accent="each with its own agents."
          lede="Each one says plainly whether its proof is already built or carried over from an adjacent sector."
        >
          <TransitionLink href="/#services" className="ax-co__more ax-co__more--invert">
            Every agent, sector by sector
            {ARROW}
          </TransitionLink>
        </Head>
        <SectorGrid />
      </Band>
    </>
  );
}

function Automation({ page }) {
  return (
    <>
      <Hero page={page} />

      <Band id="sp-estate-title" className="ax-co__about">
        <Head
          n="01"
          label="Across your estate"
          id="sp-estate-title"
          title="Don't replace your systems."
          accent="Put intelligence across them."
          lede="Automation sits in one layer above the systems that already hold your data."
        />
        <Statements
          leftLabel="One layer above"
          rightLabel="Runs privately"
          left="Agentic AI can sit across the technology estate you already own: reasoning, retrieval, voice, rules, workflow, tool use, human control and audit, in one layer above the systems that already hold your data."
          right={answer("private")}
        />
      </Band>

      <Band dark id="sp-steps-title" className="ax-co__principles">
        <Head
          n="02"
          invert
          label="The workflow, end to end"
          id="sp-steps-title"
          title="Six steps,"
          accent="from request to outcome."
          lede="Every automation follows the same route, and the system of record shows what it did."
        />
        <Cards items={whyUs.slice(0, 6)} cols={3} />
      </Band>

      <Band id="sp-work-title" className="ax-co__work">
        <Head
          n="03"
          label="How we start"
          id="sp-work-title"
          title="Start with one workflow."
          accent="Earn the right to expand."
          lede="No enterprise-wide transformation program is required to establish whether the approach works."
        />
        <Stages />
      </Band>

      <Band dark id="sp-control-title" className="ax-co__principles">
        <Head
          n="04"
          invert
          label="Human control"
          id="sp-control-title"
          title="A person wherever"
          accent="judgement is required."
          lede="Where the threshold sits is a business decision, and it lives somewhere your risk team can change it."
        />
        <Cards items={[cap("Escalate"), cap("Operate privately")]} cols={2} />
      </Band>
    </>
  );
}

/* The agents a partner can present as one AI team. Each is a sector agent
   the site already describes (services.data.js), picked by name so its line
   is restated as written and cannot drift. The card's group label is the
   job the agent does, in the colour of the sector it comes from. */
const TEAM = [
  ["Customer service agent", "Service"],
  ["Outbound agent", "Outreach"],
  ["Knowledge agent", "Knowledge"],
  ["Store ops agent", "Operations"],
  ["Agent assist", "Assist"],
  ["Analytics agent", "Insight"],
];

const teamCards = TEAM.map(([name, domain]) => {
  for (const d of Object.values(SERVICE_DETAIL)) {
    const b = d.builds.find((x) => x.name === name);
    if (b) return { title: b.name, text: b.text, domain, color: d.accent };
  }
  return null;
}).filter(Boolean);

/* White-label: the same agents, offered under a partner's name, either one
   at a time or together as an AI team. The capabilities, stages and sectors
   are the site's own; what this page adds is who it is for and what stays
   with the partner. Commercial terms are deliberately not stated: they are
   agreed per engagement. */
function Whitelabel({ page }) {
  return (
    <>
      <Hero page={page} />

      <Band id="sp-front-title" className="ax-co__about">
        <Head
          n="01"
          label="Who it is for"
          id="sp-front-title"
          title="Your name on the front,"
          accent="our system behind it."
          lede="Two kinds of partner, one arrangement: the client sees your brand, and the agent behind it is built and run by AI Brigade."
        />
        <Statements
          leftLabel="Agencies and consultancies"
          left="Offer agents and voice products to your own clients as part of your practice. You hold the client relationship and present the work under your name, and we build and run the system behind it."
          rightLabel="Software platforms"
          right="Embed agents and voice inside your own product, so your customers get AI that does the work without a second vendor appearing in front of them."
        />
      </Band>

      <Band dark id="sp-team-title" className="ax-co__principles">
        <Head
          n="02"
          invert
          label="Offer an AI team"
          id="sp-team-title"
          title="Not one agent."
          accent="A whole AI team."
          lede="Present a set of agents as your own AI team, under your name: each one owns a workflow end to end, with a person wherever judgement is required. Start with one agent and add the rest as the client is ready."
        />
        <Cards items={teamCards} cols={3} />
      </Band>

      <Band id="sp-work-title" className="ax-co__work">
        <Head
          n="03"
          label="How we start"
          id="sp-work-title"
          title="One workflow first,"
          accent="then the rest."
          lede="Start with one client or one product workflow. No enterprise-wide transformation program is required to establish whether the approach works."
        />
        <Stages />
      </Band>

      <Band dark id="sp-caps-title" className="ax-co__principles">
        <Head
          n="04"
          invert
          label="What every agent does"
          id="sp-caps-title"
          title="Eight capabilities,"
          accent="one governed system."
          lede="From the first input to the closing message, with the handoff to a person designed first."
        />
        <Cards items={whyUs} />
      </Band>

      <Band id="sp-sectors-title" className="ax-co__sectors">
        <Head
          n="05"
          label="Where it applies"
          id="sp-sectors-title"
          title="Four tracks,"
          accent="each with its own agents."
          lede="Each one says plainly whether its proof is already built or carried over from an adjacent sector."
        >
          <TransitionLink href="/use-cases" className="ax-co__more">
            Every product we have built
            {ARROW}
          </TransitionLink>
        </Head>
        <SectorGrid />
      </Band>
    </>
  );
}

export default function ServicePage({ kind }) {
  const page = SERVICE_PAGES[kind];
  return (
    <main className="ax-co ax-sp">
      {kind === "agentic" ? (
        <Agentic page={page} />
      ) : kind === "whitelabel" ? (
        <Whitelabel page={page} />
      ) : (
        <Automation page={page} />
      )}
      <Questions ids={page.faq} />
      <Related kind={kind} />
    </main>
  );
}
