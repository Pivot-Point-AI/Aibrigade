import { CDN } from "@/components/data";
import Reveal from "@/components/motion/Reveal";
import Kicker from "@/components/motion/Kicker";
import ServiceExplorer from "@/components/motion/ServiceExplorer";

// One chip per capability card in WhyUs, in the same order — this isn't a
// new capability claim, just the eight things already argued in full
// sentences further up, surfaced as a scannable strip. That distinction
// matters: the README flags the risk of claims a prospect's procurement
// team can't verify, so nothing gets added here that isn't already stated
// in prose elsewhere on the page. This row also inherited the stack
// vocabulary the hero used to carry, which is why it reads as a stack and
// the hero now reads as a claim.
const STACK = [
  "Voice & speech",
  "Intent & documents",
  "Retrieval over private knowledge",
  "Models + rules",
  "Policy & approvals",
  "Tool use & APIs",
  "Human-in-the-loop",
  "Immutable audit trail",
];

function TickerMark({ variant }) {
  return (
    <span
      className="services_ticker_image"
      aria-hidden="true"
      style={{ display: "inline-flex", alignItems: "center" }}
    >
      {variant === 1 ? (
        <svg width="41" height="40" viewBox="0 0 41 40" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.624 5H16.1367V15.3478H5.58594V24.6528H16.1367V35H25.624V24.6528H36.1736L36.1736 15.3478L20.2364 15.3478L25.624 10.066V5Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M16.6153 34.9654L26.0714 25.691L5.01465 25.6846C5.01465 30.8106 9.25179 34.966 14.4783 34.9655L16.6153 34.9654Z"
            fill="white"
          />
          <path
            d="M22.1553 5.03906L35.528 5.03906L7.77771 32.2357C4.08338 28.6283 4.07722 22.7645 7.76396 19.1496L22.1553 5.03906Z"
            fill="white"
          />
          <path
            d="M26.0723 14.2822H35.5293V25.7137L26.0723 34.9952V14.2822Z"
            fill="white"
          />
        </svg>
      )}
    </span>
  );
}

function TickerItem({ start }) {
  const stats = [
    "One workflow, proven against real conditions",
    "Six sectors, one execution layer",
    "Cloud, on-prem, hybrid or air-gapped",
  ];
  const icons = start ? [1, 2, 1] : [2, 1, 2];
  return (
    <div className="services_ticker_item">
      {stats.map((s, i) => (
        <span key={i} style={{ display: "contents" }}>
          <TickerMark variant={icons[i]} />
          <div className="heading-style-h6">{s}</div>
        </span>
      ))}
    </div>
  );
}

export default function Services() {
  return (
    <div id="services" className="section_services">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-services">
            {/* Every other section on the page opens on this numbered
                eyebrow (WhyUs, Cases, Environments, ...) — Services was the
                one exception, missing from CHAPTERS entirely, so it read as
                a section that forgot to introduce itself right after a page
                full of sections that do. */}
            <Kicker id="services" label="The digital workforce" />
            <Reveal variant="rise" className="_3-columns-grid">
              <h2 className="gradient-background heading-gradient-60pt-ipad-pro">
                Imagine your business <br />
                with a digital workforce
              </h2>
              <p className="p2 max-width-medium text-16pt-ipad_pro">
                Instead of isolated AI tools, think in terms of agents assigned to specific
                business outcomes, each one owning a workflow end to end, with a human
                wherever judgement is required.
              </p>
            </Reveal>

            <Reveal variant="stagger" selector=".ax-stack__tag" className="ax-stack" as="ul">
              {STACK.map((tag) => (
                <li className="ax-stack__tag" key={tag}>
                  {tag}
                </li>
              ))}
            </Reveal>

            {/* Was a four-card grid of one-line offers over 3D renders.
                See ServiceExplorer.jsx: the four offers are not
                interchangeable, so the section lets you open one. */}
            <Reveal variant="rise">
              <ServiceExplorer />
            </Reveal>
          </div>
        </div>
      </div>

      {/* The violet strip closes this section rather than opening it, so it
          runs between the digital workforce and the next chapter instead of
          straight under the hero. */}
      <div className="services_ticker">
        {[0, 1].map((row) => (
          <div className="services_ticker_wrapper" key={row}>
            {[0, 1, 2, 3].map((i) => (
              <TickerItem key={i} start={i % 2 === 0} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
