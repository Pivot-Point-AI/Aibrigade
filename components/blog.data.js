import { whyUs, features } from "@/components/data";
import { projects } from "@/components/projects.data";
import { useCaseHref } from "@/components/usecases.data";

/**
 * The blog — every post, in one register. /blog lists them, /blog/<slug>
 * renders one, and the sitemap, llms.txt and each post's JSON-LD and
 * share card are built from the same entries, so a new post is one new
 * object here and nothing else.
 *
 * Plain module on purpose: the pages, the sitemap and the share cards
 * read it on the server. The index's category filter is a client
 * component, and it is handed the card fields as props rather than
 * importing this file.
 *
 * COPY RULES — the same as the rest of the site (docs/home-page-copy.md):
 * keep the hedges, no invented metrics, name the artifact rather than
 * reach for a superlative. Every claim below restates something the site
 * already says: the capabilities (`whyUs`), the engagement stages
 * (`features`), the sector agents (services.data.js), the FAQ, and the
 * products (projects.data.js — the lists that name products are generated
 * from it, so they cannot fall out of step with the showcase).
 *
 * A post:
 *   slug       its URL, /blog/<slug> — never change one once published
 *   title      the headline, as it reads on the page
 *   dek        one or two sentences under the headline; also the meta
 *              description, so keep it under ~160 characters
 *   category   one of CATEGORIES below
 *   date       ISO, the day it was published
 *   updated    ISO, optional — set it when the substance changes
 *   featured   true on the one post /blog leads with (else the newest)
 *   body       blocks, in order:
 *                { type: "p", text }            paragraph
 *                { type: "h2", text }           section heading (in the contents list)
 *                { type: "ul" | "ol", items }   list of strings
 *                { type: "steps", items }       [{ name, text }] — a numbered sequence
 *                { type: "note", title, text }  a set-off aside
 *                { type: "quote", text }        a pull quote
 *              Text may carry **bold** and [links](/path).
 */

export const BLOG_AUTHOR = "AI Brigade";

/* Each category takes one of the deck's capability colours
   (components/data.js), so a card's accent means the same thing as the
   chip of the same colour elsewhere on the site. */
export const CATEGORIES = {
  perspective: { label: "Perspective", color: "#c79bf5" },
  playbook: { label: "Playbook", color: "#f0a83c" },
  engineering: { label: "Engineering", color: "#6f95ff" },
  product: { label: "Product", color: "#2fd3c0" },
};

/* ---- helpers the posts are written with ------------------------------ */

const capability = (title) => whyUs.find((c) => c.title === title);
const stage = (title) => features.find((f) => f.title === title);

/* "A, B and C" */
const listOf = (items) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

/* Products with a demo in all three of English, Arabic and Urdu — the
   same test the FAQ uses. */
const TRILINGUAL = projects.filter((p) => ["en", "ar", "ur"].every((c) => p.videos?.[c]));
const productLink = (p) => `[${p.name}](${useCaseHref(p.id)})`;

/* ---- the posts --------------------------------------------------------- */

const POSTS = [
  {
    slug: "most-enterprise-ai-stops-at-the-answer",
    title: "Most enterprise AI stops at the answer",
    dek: "An answer still leaves a person to review it, decide and act. The value is in what happens after the answer, and that takes a different system to build.",
    category: "perspective",
    date: "2026-09-24",
    featured: true,
    body: [
      {
        type: "p",
        text: "Ask most enterprise AI a question and you get a good answer. Then someone on your team reads it, works out what it means for the case in front of them, opens another system and does the work. The AI saved them a search. It did not save them the job.",
      },
      {
        type: "p",
        text: "That is not a failure of the model. It is a question of where the system stops. A chatbot, a copilot, a summariser: each one ends at a response, and everything after it (the decision, the action, the record that the action happened) is still done by hand.",
      },
      { type: "h2", text: "The answer is not the work" },
      {
        type: "p",
        text: "In most operations the expensive part is not finding out what to do. It is the chain that follows: checking the request against policy, deciding within a limit, updating the system of record, telling the customer, and leaving a trail someone can audit later. An assistant that stops at the answer leaves that chain exactly where it was.",
      },
      {
        type: "p",
        text: "This is why so many AI pilots demo well and change little. The demo measures the answer. The operation runs on everything after it.",
      },
      { type: "h2", text: "What changes when the system acts" },
      {
        type: "p",
        text: "AI that does the work goes past the response and turns intent into action. Every system we build follows the same four steps:",
      },
      {
        type: "steps",
        items: ["Listen", "Understand", "Reason", "Act"].map((t) => ({ name: t, text: capability(t).text })),
      },
      {
        type: "p",
        text: "The last step is the one most enterprise AI skips, and it is where most of the design work is.",
      },
      { type: "h2", text: "Acting is where the design work is" },
      {
        type: "p",
        text: "A system that only answers can be wrong in a harmless way: someone reads the answer and ignores it. A system that acts has to get more than the answer right. It needs to know:",
      },
      {
        type: "ul",
        items: [
          "which actions it is allowed to take, and in which systems;",
          "where the threshold sits for each decision, and who is allowed to move it;",
          "what happens when a request falls outside the supported workflow;",
          "how every action is written down, so it can be reconstructed exactly as it was taken.",
        ],
      },
      {
        type: "p",
        text: "None of that is a model choice. It is the engineering around the model: policy, permissions, escalation and audit, built as one layer above the systems that already hold your data.",
      },
      { type: "h2", text: "How to tell which kind you are buying" },
      {
        type: "p",
        text: "Five questions separate an assistant from a system that does the work:",
      },
      {
        type: "ol",
        items: [
          "Does it write to the system of record, or hand a person something to copy across?",
          "Who owns each decision threshold, and can they change it without a deployment?",
          "When it escalates, what does the person receive, and how much of the context is already assembled?",
          "Can every action be reconstructed later, step by step?",
          "Where does it run, and does sensitive data leave your environment to get an answer?",
        ],
      },
      {
        type: "p",
        text: "If the answers are vague, you are looking at an answer engine with a workflow diagram drawn around it.",
      },
      {
        type: "quote",
        text: "The real value isn't in getting an answer. It's in getting the thing done.",
      },
      {
        type: "p",
        text: "That is the whole argument behind what we build. If you have a workflow where the answer is the easy part, [bring us that problem](/contact).",
      },
    ],
  },

  {
    slug: "how-to-choose-your-first-ai-workflow",
    title: "How to choose your first AI workflow",
    dek: "Skip the transformation program. Start with one workflow that has measurable pain, prove it against your own baseline, then decide whether to expand.",
    category: "playbook",
    date: "2026-09-24",
    body: [
      {
        type: "p",
        text: "The most common way an enterprise AI program stalls is by starting too wide. A strategy covers every department, a platform is chosen before any workflow is, and a year later nobody can say whether the approach works.",
      },
      {
        type: "p",
        text: "We start the other way round: one workflow, built against real business conditions and measured on numbers your team already trusts. You don't need an enterprise-wide transformation program to find out whether the approach works.",
      },
      { type: "h2", text: "What makes a good first workflow" },
      {
        type: "p",
        text: "The best first candidate has measurable pain. In practice it has at least one of these problems:",
      },
      {
        type: "ul",
        items: [
          "**Slow**: requests wait in a queue longer than the customer or the business can tolerate.",
          "**Expensive**: skilled people spend their time on steps that follow a known pattern.",
          "**Manual**: the same information is read, checked and re-keyed between systems.",
          "**Risky**: a missed signal or an inconsistent decision has a real cost.",
          "**Frustrating**: customers or staff repeat themselves to get something simple done.",
        ],
      },
      {
        type: "p",
        text: "Two more things make a candidate practical, not just painful. It should be **bounded**: you can say where the workflow starts, where it ends and what counts as done. And the systems it touches should be **reachable**: there is an API, a database or an application the agent is permitted to work through.",
      },
      {
        type: "note",
        title: "You don't need to choose a model first",
        text: "You do not need to choose a model, design a RAG architecture or define an agent framework before the first conversation. Bring the problem, the constraints and the systems it has to live inside. Choosing the architecture is our job.",
      },
      { type: "h2", text: "Four stages, in order" },
      {
        type: "p",
        text: "Every engagement follows the same sequence, and each stage has to earn the next.",
      },
      {
        type: "steps",
        items: ["Identify", "Prove", "Measure", "Scale"].map((t) => ({ name: t, text: stage(t).text })),
      },
      { type: "h2", text: "Why the second workflow costs less" },
      {
        type: "p",
        text: "An agent is built from capabilities (speech, document understanding, retrieval over your knowledge, policy and approvals, tool use, escalation, audit), and none of them is specific to one workflow. Once they are running against your systems, the next workflow reuses most of them. That is what “earn the right to expand” means in practice: the first workflow pays for the proof, and the proof can be reused.",
      },
      { type: "h2", text: "What you should have at the end" },
      { type: "quote", text: stage("Evidence, not dependency").text },
      {
        type: "p",
        text: "If you already know which workflow hurts most, [tell us about it](/contact). If you don't, that is a fine place to start too. Finding it is what the first stage is for.",
      },
    ],
  },

  {
    slug: "design-the-human-handoff-first",
    title: "Design the handoff first",
    dek: "An agent that acts has to know when not to. Where a person steps in is the first thing we design, not something added after the first incident.",
    category: "engineering",
    date: "2026-09-24",
    body: [
      {
        type: "p",
        text: "Every system that takes actions will meet a request it should not handle alone. The case is ambiguous, the confidence is low, the amount is over a limit, or the request is simply outside the workflow the agent was built for. What happens next decides whether the system can be trusted in production.",
      },
      {
        type: "p",
        text: "That is why we design the handoff first. The escalation path is part of the first workflow's specification. It is not a patch added after the first incident.",
      },
      { type: "h2", text: "The threshold is a business decision" },
      {
        type: "p",
        text: "Where an agent stops and a person takes over is not a technical parameter. It is risk appetite, and it belongs to the people who own the risk.",
      },
      {
        type: "p",
        text: "So thresholds (risk scores, confidence levels, approval limits) live in a policy your team owns. They can be changed without a deployment, and a change is recorded like any other action. The model supplies a judgement; the policy decides what that judgement is allowed to trigger.",
      },
      { type: "h2", text: "What a good handoff carries" },
      {
        type: "p",
        text: "An escalation that says “please review” and links to a raw transcript has moved the work, not done it. The person receiving it should get the decision with the context already assembled:",
      },
      {
        type: "ul",
        items: [
          "the original request, in the customer's own words and language;",
          "what the agent read to handle it, and from which approved sources;",
          "what it concluded and why, including which rule or threshold fired;",
          "the action it would have taken, ready to approve, amend or reject.",
        ],
      },
      {
        type: "p",
        text: "Done well, the handoff makes a person faster than they would have been without the agent, even on the cases the agent could not finish.",
      },
      { type: "h2", text: "An example: fraud" },
      {
        type: "p",
        text: "Our fraud work follows this pattern. The fraud agent scores suspicious activity and creates explainable intervention context: the signals behind the score, set out for the analyst. Where a case sits against the threshold decides what happens next, and above it a person gets the case with the reasons already laid out. The decision stays theirs. You can watch [Fraud Zero](/use-cases/fraud-detection) run.",
      },
      { type: "h2", text: "Write everything down" },
      {
        type: "p",
        text: "The other half of trust is the record. Every action the agent takes, and every action a person takes on an escalated case, is written to an immutable audit trail, so any outcome can be reconstructed exactly as it happened. When a regulator, an auditor or a customer asks why something happened, the answer is a record, not a recollection.",
      },
      { type: "h2", text: "A checklist for your own system" },
      {
        type: "ol",
        items: [
          "Can you list every action the agent is allowed to take, and in which systems?",
          "Is each threshold in a policy your risk team can change without an engineer?",
          "Does an escalated case arrive with its context assembled, or as raw input?",
          "Can a person approve, amend or reject the proposed action in one place?",
          "Can every outcome, automated or human, be reconstructed from the record?",
        ],
      },
      {
        type: "p",
        text: "If any of the answers is no, fix it before the agent takes on more volume.",
      },
    ],
  },

  {
    slug: "run-ai-where-your-data-lives",
    title: "Run AI where your data already lives",
    dek: "Cloud, on-premises, hybrid or air-gapped. For regulated teams, where the system runs is part of the design, not a hosting detail.",
    category: "engineering",
    date: "2026-09-24",
    body: [
      {
        type: "p",
        text: "For a bank, a hospital or an operator of critical infrastructure, the first question about an AI system is often not what it can do. It is where the data goes while it does it. If the answer is “to a public AI service”, many of the workflows worth automating are ruled out before anyone has seen a demo.",
      },
      {
        type: "p",
        text: "So deployment is a design decision we make with you at the start, not a hosting detail settled at the end.",
      },
      { type: "h2", text: "Four ways to run it" },
      {
        type: "p",
        text: "The same system can run in four arrangements. Which one fits depends on your data, your regulator and the estate you already operate.",
      },
      {
        type: "steps",
        items: [
          {
            name: "Cloud",
            text: "In your own cloud tenancy. The quickest to stand up, and the natural fit when the data involved already lives there under your controls.",
          },
          {
            name: "On-premises",
            text: "Inside your own data centre, next to the systems of record. Sensitive data stays in the environment you already secure and audit.",
          },
          {
            name: "Hybrid",
            text: "Split by sensitivity. Workloads that touch regulated data stay on-premises; the rest can use cloud capacity.",
          },
          {
            name: "Air-gapped",
            text: "No connection to the outside at all, for environments where that is the requirement rather than a preference.",
          },
        ],
      },
      {
        type: "p",
        text: "The principle is the same in all four: regulated teams get the capability without sending sensitive data to public AI.",
      },
      { type: "h2", text: "Grounded in your sources, not a model's impression" },
      {
        type: "p",
        text: "Where the model runs is half of it. The other half is what it answers from. Our systems retrieve from the approved sources you designate (policies, SOPs, product documents, records) and ground their answers in them, not in a model's general impression of your industry. When the approved sources don't cover a question, the right behaviour is to say so and escalate, not to improvise.",
      },
      { type: "h2", text: "No migration, no second source of truth" },
      {
        type: "p",
        text: "Running privately does not mean building a parallel platform. The agent sits across the technology estate you already own: reasoning, retrieval, voice, rules, workflow, tool use, human control and audit, in one layer above the systems that hold your data. It is called from the systems you already run and writes back to them. There is no migration, and no second copy of the truth to reconcile.",
      },
      { type: "h2", text: "Questions to settle early" },
      {
        type: "ul",
        items: [
          "Which data does the workflow touch, and what does your regulator require of it?",
          "Which systems must the agent read from, and which may it write to?",
          "Which sources are approved for grounding answers, and who maintains them?",
          "Who operates the system day to day, and who can change its policy?",
        ],
      },
      {
        type: "p",
        text: "If you are weighing where an AI system could run inside your environment, [talk to the engineers who would build it](/contact).",
      },
    ],
  },

  {
    slug: "why-our-demos-speak-three-languages",
    title: "Why our demos speak English, Arabic and Urdu",
    dek: "Customers don't switch language to suit a system. Listening in the language the conversation starts in is the first step of doing the work.",
    category: "product",
    date: "2026-09-24",
    body: [
      {
        type: "p",
        text: "The first step of every system we build is to listen, and listening starts wherever the customer already is: on the phone, on the web, in a mobile app, and in the language they actually speak.",
      },
      {
        type: "p",
        text: `In many of the markets we work in, that means more than one language. So we build and demo our products that way: ${listOf(
          TRILINGUAL.map(productLink)
        )} each have demos in English, Arabic and Urdu.`,
      },
      { type: "h2", text: "Language is part of the workflow" },
      {
        type: "p",
        text: "A voice agent that only works well in English does not automate a workflow in a market where many of the calls arrive in another language. It automates part of the workflow and sends the rest to a queue. The unsupported language becomes the escalation path, which is the most expensive way to handle it.",
      },
      {
        type: "p",
        text: "Treating multilingual speech as a core capability changes that. The same agent handles the same request, against the same policy and with the same audit trail, whichever language it arrived in.",
      },
      { type: "h2", text: "The same system, three times over" },
      {
        type: "p",
        text: "Watching one product in three languages is useful because of what stays the same. The workflow, the rules and the actions don't change. What changes is the surface: recognition and synthesis in each language, and the wording of each reply.",
      },
      {
        type: "ul",
        items: TRILINGUAL.map((p) => `${productLink(p)}: ${p.useCase}.`),
      },
      { type: "h2", text: "What it takes" },
      {
        type: "p",
        text: "Doing this well takes more than translating prompts:",
      },
      {
        type: "ul",
        items: [
          "speech recognition that holds up on real calls and real accents, not only on clean audio;",
          "intent understood in each language against the same enterprise knowledge;",
          "replies that read naturally in each language, not as translations of the English one;",
          "one policy and one audit trail across all of them.",
        ],
      },
      {
        type: "p",
        text: "Every product page plays its demo in each language it ships in. [See what we've built](/#reels), or [bring us a workflow](/contact) that has to work in more than one language.",
      },
    ],
  },
];

/* ---- derived ----------------------------------------------------------- */

/* Words in a post's body, and minutes at ~220 words a minute. */
const plain = (s) => String(s).replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
const blockText = (b) =>
  [b.text, b.title, ...(b.items || []).map((i) => (typeof i === "string" ? i : `${i.name} ${i.text}`))]
    .filter(Boolean)
    .map(plain)
    .join(" ");

export const slugify = (s) =>
  plain(s)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function withDerived(post, i) {
  const words = post.body.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;
  return {
    ...post,
    n: i + 1,
    /* Which of its category's cover layouts it draws (PostCover), so two
       posts in one category never share a cover. */
    variant: POSTS.slice(0, i).filter((p) => p.category === post.category).length,
    href: `/blog/${post.slug}`,
    words,
    minutes: Math.max(1, Math.round(words / 220)),
    categoryLabel: CATEGORIES[post.category].label,
    color: CATEGORIES[post.category].color,
    /* The contents list: every h2, with the id the page gives it. */
    toc: post.body.filter((b) => b.type === "h2").map((b) => ({ id: slugify(b.text), text: b.text })),
  };
}

/** Every post, newest first; the register order breaks ties. */
export const posts = POSTS.map(withDerived).sort((a, b) =>
  a.date === b.date ? a.n - b.n : a.date < b.date ? 1 : -1
);

export const postSlugs = posts.map((p) => p.slug);

export const getPost = (slug) => posts.find((p) => p.slug === slug);

/** The post /blog leads with. */
export const featuredPost = posts.find((p) => p.featured) || posts[0];

/** Up to `count` other posts: same category first, then the newest. */
export function relatedPosts(slug, count = 3) {
  const post = getPost(slug);
  const others = posts.filter((p) => p.slug !== slug);
  return [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, count);
}

/** The card fields only — what the client-side index is handed. */
export const postCard = (p) => ({
  slug: p.slug,
  href: p.href,
  n: p.n,
  variant: p.variant,
  title: p.title,
  dek: p.dek,
  category: p.category,
  categoryLabel: p.categoryLabel,
  color: p.color,
  date: p.date,
  dateLabel: formatDate(p.date),
  minutes: p.minutes,
});

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-09-24" -> "24 Sep 2026". Parsed by hand, so no time zone can
 *  move it a day. */
export const formatDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};
