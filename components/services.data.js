/**
 * The four sector offers behind "Imagine your business with a digital
 * workforce" — the detail components/motion/ServiceExplorer.jsx shows one
 * tab at a time, keyed by the index of the matching entry in `services`
 * (components/data.js).
 *
 * It lives here rather than in ServiceExplorer because that is a
 * `"use client"` module, and the server-side readers of this list — the
 * home page JSON-LD and /llms-full.txt (components/seo.js) — would get a
 * client reference from it instead of the object. Those readers matter:
 * the explorer renders only the open tab, so without them three of the
 * four sectors never reach a crawler that does not click.
 */

/**
 * `proof.kind` is where the proof is qualified, and the wording is load-bearing.
 * "Proof built" means a named product of ours already does this. "Transferable
 * proof" means the capability is built and shipping, but in an adjacent
 * sector — no client in this one has taken delivery yet. The two are not
 * interchangeable and a later editing pass should not smooth them into one.
 *
 * `headline` is the deck's own sector headline, one per track. The section
 * above this component opens on the general form of the claim ("Imagine your
 * business with a digital workforce"); each of the four sectors states it
 * again in its own terms, and those four sentences are the only place the
 * page says what the workforce actually *does* for a bank as against a
 * hospital as against a shop floor. They were the one part of slides 6–9
 * with nowhere to land when this panel carried only `short` as its title —
 * "AI in Fintech" is a label, not a claim, and the claim is the thing the
 * slide was written for. `short` stays as the eyebrow: it is the tab's own
 * name and the panel has to say which tab you opened. It uses the deck's
 * sector names ("Healthtech", not "AI in Healthcare") so the tabs match the
 * sector row in the hero.
 *
 * `builds` are name + one line, and render as a grid of agent tiles rather
 * than a bullet list of "Name — description" strings: the deck sets each
 * agent as its own card, and a reader scans for the agent's name first.
 * `proof` is split the same way — `kind` is the "Proof built" /
 * "Transferable proof" distinction above, `items` are the named products,
 * and `caveat` holds the one qualifier that is not a product.
 *
 * `accent` is the deck's colour for each sector (teal, green, amber, blue),
 * using hexes the site already uses elsewhere (compose.css, console.css).
 */
export const SERVICE_DETAIL = {
  0: {
    headline: "Imagine your bank with a digital workforce.",
    short: "Fintech",
    accent: "#2fd3c0",
    builds: [
      { name: "Customer agent", text: "Handles supported service and banking requests conversationally." },
      { name: "Fraud agent", text: "Scores suspicious activity and creates explainable intervention context." },
      { name: "Collections agent", text: "Contacts customers, captures outcomes and escalates exceptions." },
      { name: "Operations agent", text: "Works disputes, reconciliation and exception queues." },
      { name: "Knowledge agent", text: "Governed access to policies, SOPs and institutional knowledge." },
      { name: "Employee copilot", text: "Assists regulated teams without sending sensitive data to public AI." },
    ],
    proof: {
      kind: "Proof built",
      items: ["AXON", "Fraud Zero (live fraud detection)", "AI Outbound Voice Engagement", "Private Enterprise LLM"],
    },
  },
  1: {
    headline: "Imagine administrative work moving before staff have to chase it.",
    short: "Healthtech",
    accent: "#4ade80",
    builds: [
      { name: "Patient access agent", text: "Scheduling, navigation, FAQs and service requests." },
      { name: "RCM agent", text: "Eligibility, AR follow-up, billing and denial workflow assistance." },
      { name: "Patient financial agent", text: "Multilingual billing support and proactive follow-up." },
      { name: "Knowledge agent", text: "SOP, policy and operational knowledge grounded in approved sources." },
      { name: "Supply agent", text: "Voice-driven stock and availability for pharmacy and clinical supplies." },
      { name: "Workforce copilot", text: "Summaries, document assistance and workflow guidance for staff." },
    ],
    proof: {
      kind: "Transferable proof",
      items: ["Voice AI", "Outbound Voice", "Private RAG/LLM", "Voice Inventory"],
    },
  },
  2: {
    headline: "Imagine every frontline team having an AI operator beside them.",
    short: "Retail & Customer Ops",
    accent: "#f0a83c",
    builds: [
      { name: "Inventory agent", text: "Hands-free stock, location, movement and exception visibility." },
      { name: "Store ops agent", text: "Guides tasks, SOPs and operational issue escalation." },
      { name: "Customer service agent", text: "Resolves supported requests across voice and digital channels." },
      { name: "Outbound agent", text: "Reminders, campaigns, qualification and follow-up." },
      { name: "Agent assist", text: "Retrieves knowledge, summarizes conversations and suggests next actions." },
      { name: "Analytics agent", text: "Surfaces operational exceptions through natural-language interaction." },
    ],
    proof: {
      kind: "Proof built",
      items: ["AI Voice Retail Inventory Manager", "AXON", "AXON 2.0", "AI Outbound Voice Engagement"],
    },
  },
  3: {
    headline: "Imagine field and operations teams with governed AI at the point of work.",
    short: "Industrial & Energy",
    accent: "#4d7cf5",
    builds: [
      { name: "Maintenance agent", text: "Uses manuals, history and SOPs to support troubleshooting." },
      { name: "Field voice copilot", text: "Hands-free procedures, work instructions and knowledge access." },
      { name: "Spares agent", text: "Inventory and availability across parts stores and warehouses." },
      { name: "Work order agent", text: "Creates, enriches, prioritizes and updates maintenance workflows." },
      { name: "Asset knowledge agent", text: "Searches technical documentation and maintenance records." },
      { name: "Exception agent", text: "Classifies operational, meter, billing or process exceptions." },
    ],
    proof: {
      kind: "Transferable proof",
      items: ["Private Enterprise LLM/RAG", "Voice Inventory", "AXON voice stack", "Workflow orchestration"],
      caveat: "Integration depends on the client's OT/SCADA architecture and permitted interfaces.",
    },
  },
};

/**
 * The six sectors the navigation names, and the track above each opens.
 * Six names, four tracks: retail and customer ops share one, as do
 * industrial and energy. The chips used to point at the section alone,
 * so every one of them landed on whichever track the explorer happened
 * to be rotating through.
 */
export const SECTORS = [
  { label: "Fintech", track: 0 },
  { label: "Healthtech", track: 1 },
  { label: "Retail", track: 2 },
  { label: "Customer Ops", track: 2 },
  { label: "Industrial", track: 3 },
  { label: "Energy", track: 3 },
];

/** Window event the explorer listens for: `{ detail: { track } }`. */
export const SELECT_SERVICE = "ax:select-service";

/* A chip pressed on another page navigates home first, and the explorer
   isn't mounted yet to hear an event. The choice waits here for it.
   Module state rather than sessionStorage: it lives exactly as long as
   the client-side navigation that carries it, so a later reload can
   never reopen a stale choice.

   Read and cleared separately, and only good for a few seconds: React
   runs a mount effect twice in development, and a read that also cleared
   left the second, surviving run with nothing to act on. */
const PARK_TTL = 8000;
let parked = null;

export const parkServiceTrack = (track) => {
  parked = { track, at: Date.now() };
};

export const peekParkedServiceTrack = () =>
  parked && Date.now() - parked.at < PARK_TTL ? parked.track : null;

export const clearParkedServiceTrack = () => {
  parked = null;
};
