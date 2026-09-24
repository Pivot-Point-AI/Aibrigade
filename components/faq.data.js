import { projects } from "@/components/projects.data";
import { OFFICES, fullAddress } from "@/components/offices.data";
import { useCaseHref } from "@/components/usecases.data";

/**
 * The questions a buyer asks before the first call, answered.
 *
 * Three readers use this list: the FAQ chapter on the home page
 * (components/Faq.jsx), the FAQPage JSON-LD beside it (components/seo.js),
 * and /llms.txt. Search and answer engines lift question-and-answer pairs
 * almost verbatim, which is why each answer opens with the direct answer
 * and stands on its own without the question.
 *
 * SOURCES — the rules in docs/home-page-copy.md apply here as everywhere:
 * keep the hedges, no invented metrics. Every sentence below restates
 * something the site already says:
 *
 *   - what we do — the hero lede and "Most AI stops at the answer"
 *     (components/motion/DecisionPath.jsx);
 *   - the capabilities — `whyUs` in components/data.js;
 *   - industries — `services` in data.js and each product's `sector`;
 *   - the products and their languages — components/projects.data.js,
 *     generated so this cannot fall out of step with the showcase;
 *   - systems, privacy and escalation — the six steps of "Inside the
 *     system", Environments, and the Escalate / Operate privately cards;
 *   - the engagement — `features` in data.js and the Featured chapter;
 *   - reply time, NDA and offices — the contact page facts and
 *     components/offices.data.js.
 *
 * An answer is a list of parts: a string, or `{ text, href }` for a link.
 * `plainAnswer()` flattens it for the JSON-LD and llms.txt.
 */

const TRILINGUAL = projects.filter((p) => ["en", "ar", "ur"].every((c) => p.videos?.[c]));

const NUMBER = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];

/* `useCase` lines are written to stand alone, capitalised; mid-sentence
   they are lower-cased, except where the first word is a name. */
const midSentence = (s) => (/^(Zakat|AI)\b/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));

/* "A, B and C" */
const listOf = (items) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

/* The product line for the "already built" answer: every product, each
   linked to its own page, with the job it does from `useCase`. */
const productParts = projects.flatMap((p, i) => [
  i === 0 ? "" : i === projects.length - 1 ? " and " : ", ",
  { text: p.name, href: useCaseHref(p.id) },
  ` (${midSentence(p.useCase)})`,
]).filter(Boolean);

const [HQ, ...REST] = OFFICES;

export const FAQ = [
  {
    id: "what",
    q: "What does AI Brigade do?",
    a: [
      "AI Brigade builds enterprise AI that does the work rather than stopping at the answer. Its systems listen, understand, reason, connect to the systems a business already runs and execute real business workflows — and hand the decision to a person wherever judgement is required.",
    ],
  },
  {
    id: "agentic",
    q: "How is agentic AI different from AI that just answers questions?",
    a: [
      "Most AI stops at the answer: it provides a response, and a person still reviews it, decides and takes the action. Agentic AI goes past the response and turns intent into action — it reads the request against what your organisation knows, weighs the options against your rules and policy, and executes across systems, tools and teams.",
    ],
  },
  {
    id: "industries",
    q: "Which industries does AI Brigade work in?",
    a: [
      "Fintech and banking, healthtech, retail and customer operations, and industrial and energy. The products already built also cover e-commerce, call centers, automotive, food delivery and Islamic finance.",
    ],
  },
  {
    id: "built",
    q: "What has AI Brigade already built?",
    a: [
      `${NUMBER[projects.length] || projects.length} demo-ready AI products: `,
      ...productParts,
      `. ${listOf(TRILINGUAL.map((p) => p.name))} have demos in English, Arabic and Urdu.`,
    ],
  },
  {
    id: "systems",
    q: "Do we have to replace the systems we already run?",
    a: [
      "No. The agent sits across the technology estate you already own — reasoning, retrieval, voice, rules, workflow, tool use, human control and audit in one layer above the systems that hold your data. It is called from the systems you already run, with no migration and no second source of truth.",
    ],
  },
  {
    id: "private",
    q: "Can it run privately, without sending sensitive data to public AI?",
    a: [
      "Yes. It can run in the cloud, on-premises, hybrid or air-gapped, so regulated teams get the capability without sending sensitive data to public AI. Answers are grounded in your approved sources rather than in a model's general impression of your industry.",
    ],
  },
  {
    id: "escalate",
    q: "What happens when a decision needs a person?",
    a: [
      "It escalates. The handoff is designed first, not added after the first incident. Risk, confidence and approval limits live in a policy your team owns and can change without a deployment; outside the supported workflow, a person gets the decision with the context already assembled. Every action is written down, so it can be reconstructed exactly as it was taken.",
    ],
  },
  {
    id: "start",
    q: "How does an engagement start?",
    a: [
      "With one workflow, not a transformation program. Identify one workflow with measurable pain; prove it by building the agent against real business conditions; measure the outcome against your own operating baseline; then scale by reusing the capabilities across adjacent workflows. You do not need to choose a model or an agent framework first — ",
      { text: "bring us the problem", href: "/contact" },
      ", and a person replies within one business day.",
    ],
  },
  {
    id: "where",
    q: "Where is AI Brigade based?",
    a: [
      `AI Brigade's headquarters is at ${fullAddress(HQ)}. It also has offices in ${listOf(
        REST.map((o) => `${o.city}, ${o.country} (${o.role})`)
      )}.`,
    ],
  },
];

/** An answer as one plain string, for JSON-LD and llms.txt. */
export const plainAnswer = (a) => a.map((part) => (typeof part === "string" ? part : part.text)).join("");

