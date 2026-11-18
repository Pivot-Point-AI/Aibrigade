/**
 * The three service pages: /agentic-ai-solutions, /ai-automation-services
 * and /white-label-ai-services.
 *
 * Plain module on purpose, like site.data.js: ServicePage.jsx (render),
 * app/sitemap.js, components/llms.js and the JSON-LD builders in seo.js all
 * read it, and a value exported from a `"use client"` module reaches the
 * server as a client reference.
 *
 * Nothing here is a new claim. The body of each page is the site's own copy:
 * `whyUs`, `features` and `services` in data.js, the sector tracks in
 * services.data.js and the answers in faq.data.js. What these pages add is
 * the headline, the opening line, the chapter headings and the search
 * title and description, so the copy rules in docs/home-page-copy.md and
 * the "no em dashes" rule apply to every string below.
 *
 * `title` is the page's own part; the root layout's template appends
 * " | AI Brigade". `faq` names the FAQ entries (faq.data.js) the page
 * shows, in order.
 */

/**
 * The white-label page's own slides for the hero drawing
 * (components/motion/IntelligenceSystem.jsx): who it is for, not the
 * sectors. Same shape as the drawing's sector slides. The words are the
 * site's own vocabulary (channels, knowledge, escalate, human in the loop),
 * with the partner's brand where a sector slide names a system of record.
 * No figures and no commercial terms.
 */
const WHITELABEL_SLIDES = [
  {
    sector: "Agencies",
    caption: "Under your brand",
    color: "#b583f5",
    core: ["#dcc2fb", "#8b4fe0", "#3a1a73"],
    sources: [
      { label: "Client brief", sub: "workflow · outcome" },
      { label: "Client systems", sub: "CRM · helpdesk · ERP" },
      { label: "Client knowledge", sub: "policies · SOPs" },
      { label: "Client channels", sub: "voice · chat · email" },
    ],
    decisions: [
      { label: "Resolve", sub: "client request", action: "Under your name" },
      { label: "Escalate", sub: "judgement required", action: "Your team decides" },
      { label: "Report", sub: "what was done", action: "Client audit trail" },
    ],
  },
  {
    sector: "Platforms",
    caption: "Inside your product",
    color: "#6f95ff",
    core: ["#b4c6ff", "#4d6ff0", "#1a2e7a"],
    sources: [
      { label: "Your users", sub: "in-product requests" },
      { label: "Your product data", sub: "APIs · records" },
      { label: "Your knowledge", sub: "docs · help centre" },
      { label: "Your channels", sub: "voice · chat" },
    ],
    decisions: [
      { label: "Answer", sub: "in your interface", action: "Carries your name" },
      { label: "Act", sub: "through your APIs", action: "Your system updated" },
      { label: "Hand off", sub: "with full context", action: "Your support team" },
    ],
  },
  {
    sector: "AI team",
    caption: "Your AI team",
    color: "#2fd3c0",
    core: ["#7af2e2", "#17a596", "#0a4a45"],
    sources: [
      { label: "Voice", sub: "calls · multilingual" },
      { label: "Chat & email", sub: "digital channels" },
      { label: "Knowledge", sub: "policies · SOPs · FAQs" },
      { label: "Customer history", sub: "CRM · interactions" },
    ],
    decisions: [
      { label: "Resolve", sub: "customer request", action: "Case closed" },
      { label: "Follow up", sub: "outbound", action: "Reminder sent" },
      { label: "Hand off", sub: "with full context", action: "Agent assist" },
    ],
  },
];

export const SERVICE_PAGES = {
  agentic: {
    path: "/agentic-ai-solutions",
    name: "Agentic AI Solutions",
    title: "Agentic AI Solutions for Business",
    description:
      "Deploy agentic AI that understands requests, reasons through business rules and executes workflows across enterprise systems with human oversight.",
    serviceType: "Agentic AI",
    eyebrow: "Agentic AI Solutions",
    headline: "Agentic AI that\n*does the work.*",
    lede: "AI Brigade builds agentic AI solutions for business: agents that understand a request, reason through your rules and execute across your systems, with a person in the loop wherever judgement is required.",
    faq: ["what", "agentic", "industries", "built", "escalate", "start"],
  },
  automation: {
    path: "/ai-automation-services",
    name: "AI Automation Services",
    title: "AI Automation Services for Enterprises",
    description:
      "Automate business workflows with custom AI agents, enterprise integrations, intelligent decision-making and human approval controls.",
    serviceType: "AI automation",
    eyebrow: "AI Automation Services",
    headline: "AI automation that\n*runs the workflow.*",
    lede: "AI Brigade automates business workflows with custom AI agents that connect to the systems you already run, decide against your policy, and ask a person to approve wherever judgement is required.",
    faq: ["what", "systems", "private", "escalate", "start", "built"],
  },
  whitelabel: {
    path: "/white-label-ai-services",
    name: "White-Label AI Services",
    title: "White-Label AI Services and AI Teams for Agencies and Platforms",
    description:
      "Offer AI Brigade's agents, voice products and a full AI team under your own brand. White-label AI for agencies and consultancies serving their clients, and for software platforms embedding AI in their product.",
    serviceType: "White-label AI",
    eyebrow: "White-Label AI Services",
    headline: "Your brand in front.\n*Our agents behind it.*",
    lede: "AI Brigade white-labels its agents and voice products for agencies, consultancies and software platforms: you present them, singly or as a whole AI team, to your clients under your own name, and we build, run and support the system behind them.",
    faq: ["whitelabel", "what", "systems", "private", "escalate", "start"],
    /* The hero drawing's slides and the name of its tab list. */
    slides: WHITELABEL_SLIDES,
    slidesLabel: "Ways to offer it",
  },
};

export const SERVICE_PAGE_IDS = Object.keys(SERVICE_PAGES);
