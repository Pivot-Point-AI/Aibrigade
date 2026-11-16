/**
 * The two service pages: /agentic-ai-solutions and /ai-automation-services.
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

export const SERVICE_PAGES = {
  agentic: {
    path: "/agentic-ai-solutions",
    name: "Agentic AI Solutions",
    title: "Agentic AI Solutions for Business",
    description:
      "Deploy agentic AI that understands requests, reasons through business rules and executes workflows across enterprise systems with governed human oversight.",
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
};

export const SERVICE_PAGE_IDS = Object.keys(SERVICE_PAGES);
