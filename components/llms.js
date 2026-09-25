import { SITE_NAME, SITE_ALT_NAME, absoluteUrl } from "@/components/site.data";
import { OFFICES, fullAddress } from "@/components/offices.data";
import { CONTACT_EMAIL, CONTACT_PHONE, legal } from "@/components/legal.data";
import { whyUs, services, features } from "@/components/data";
import { SERVICE_DETAIL } from "@/components/services.data";
import { projects } from "@/components/projects.data";
import { getUseCase, plainHeadline } from "@/components/usecases.data";
import { FAQ, plainAnswer } from "@/components/faq.data";
import { posts } from "@/components/blog.data";

/**
 * /llms.txt and /llms-full.txt (https://llmstxt.org) — the site as plain
 * Markdown, for the AI assistants and answer engines that read a site to
 * answer questions about it.
 *
 * The pages are built for people: most of their text sits inside
 * animation markup, and some of it (three of the four sector tabs) is
 * only rendered on a click. These two files give an assistant the same
 * facts in the order a reader needs them, with a link to the page each
 * came from — so the answer it gives, and the page it cites, are ours.
 *
 * Everything is generated from the data modules the pages render. There
 * is no copy here to keep in step; the same rules as the rest of the
 * site apply to what those modules say (docs/home-page-copy.md).
 *
 *   llms.txt       the index: who we are, the pages, the products, the FAQ
 *   llms-full.txt  all of it: every capability, sector, agent, product
 *                  page and engagement stage
 */

const link = (label, path) => `[${label}](${absoluteUrl(path)})`;
const bullets = (items) => items.map((s) => `- ${s}`).join("\n");

const SUMMARY = `${SITE_NAME} builds enterprise AI that does the work rather than stopping at the answer: agentic systems that listen, understand, reason, connect to the systems a business already runs and execute real business workflows, handing the decision to a person wherever judgement is required. It works in fintech and banking, healthtech, retail and customer operations, and industrial and energy.`;

const offices = () =>
  bullets(OFFICES.map((o) => `**${o.city}, ${o.country}**: ${o.role}. ${fullAddress(o)}`));

const contact = () =>
  bullets([
    `Email: ${CONTACT_EMAIL} (a person replies within one business day)`,
    `Phone: ${CONTACT_PHONE} (Mon–Fri, 9am–6pm ET)`,
    `Contact form: ${absoluteUrl("/contact")}`,
  ]);

const faq = () => FAQ.map((f) => `### ${f.q}\n\n${plainAnswer(f.a)}`).join("\n\n");

export function llmsTxt() {
  return `# ${SITE_NAME}

> ${SUMMARY}

Also written "${SITE_ALT_NAME}".

${SITE_NAME} is headquartered at ${fullAddress(OFFICES[0])}, with offices in ${OFFICES.slice(1)
    .map((o) => `${o.city} (${o.country})`)
    .join(" and ")}. Contact: ${CONTACT_EMAIL} · ${CONTACT_PHONE}.

## Pages

- ${link("Home", "/")}: what ${SITE_NAME} builds: the capabilities, the difference between AI that answers and AI that acts, the sectors, the products, how an engagement starts, and the FAQ.
- ${link("Company", "/company")}: who ${SITE_NAME} is, the four rules it builds by, how an engagement runs, the sectors it works in and its offices.
- ${link("Blog", "/blog")}: notes on enterprise AI that does the work.
- ${link("Contact", "/contact")}: send the problem and the constraints; an engineer replies within one business day.

## Blog

${posts.map((p) => `- ${link(p.title, p.href)}: ${p.dek}`).join("\n")}

## Products

${projects
  .map((p) => {
    const uc = getUseCase(p.id);
    return `- ${link(p.name, `/use-cases/${p.id}`)} (${p.sector}): ${uc ? uc.overview[0] : p.description}`;
  })
  .join("\n")}

## Frequently asked questions

${faq()}

## Optional

- ${link("Full text of the site, for AI assistants", "/llms-full.txt")}
${Object.values(legal)
  .map((d) => `- ${link(d.title, `/${d.slug}`)}`)
  .join("\n")}
`;
}

function productSection(p) {
  const uc = getUseCase(p.id);
  if (!uc) return `### ${p.name}\n\n${p.description || p.tagline || ""}`;
  const parts = [
    `### ${uc.name}: ${uc.searchTitle || plainHeadline(uc.headline)}`,
    `Page: ${absoluteUrl(uc.href)} · Sector: ${uc.sector} · ${uc.type}${
      uc.languages.length ? ` · Demo in ${uc.languages.map((l) => l.english).join(", ")}` : ""
    }`,
    `**${plainHeadline(uc.headline)}**`,
    uc.overview.join("\n\n"),
    uc.audience ? `Built for: ${uc.audience}.` : null,
    uc.stats?.length ? `Figures:\n${bullets(uc.stats.map((s) => `${s.value}: ${s.label}`))}` : null,
    `How it runs:\n${bullets(uc.flow.map((f) => `**${f.name}**: ${f.text}`))}`,
    `What it brings:\n${bullets(uc.features.map((f) => `**${f.title}**: ${f.text}`))}`,
    uc.stack?.length ? `Stack: ${uc.stack.join(", ")}.` : null,
    uc.delivery?.length ? `How it is delivered:\n${bullets(uc.delivery.map((d) => `**${d.name}**: ${d.text}`))}` : null,
    `Built from the capabilities: ${uc.capabilities.map((c) => c.title).join(", ")}.`,
  ];
  return parts.filter(Boolean).join("\n\n");
}

export function llmsFullTxt() {
  const stages = features.filter((f) => ["Identify", "Prove", "Measure", "Scale"].includes(f.title));
  const closer = features.find((f) => !stages.includes(f));

  return `# ${SITE_NAME}: full text

> ${SUMMARY}

Source: ${absoluteUrl("/")}. Also written "${SITE_ALT_NAME}". The short index is ${absoluteUrl("/llms.txt")}.

## Most AI stops at the answer

The real value isn't in getting an answer. It's in getting the thing done. Most AI provides an answer, and the real work is still human: a person reviews it, decides and takes the action. Agentic AI goes past the response and turns intent into action: it reads the request against what the organisation knows, weighs the options against its rules and policy, and executes across systems, tools and teams, end to end. ${SITE_NAME} builds the second kind: AI as an execution layer, not another screen employees have to manage.

## Capabilities

The reusable building blocks behind every solution.

${bullets(whyUs.map((c) => `**${c.title}** (${c.domain}): ${c.text}`))}

## Sectors: a digital workforce

Instead of isolated AI tools, agents assigned to specific business outcomes, each one owning a workflow end to end, with a human wherever judgement is required. "Proof built" means a named ${SITE_NAME} product already does this; "transferable proof" means the capability is built and shipping in an adjacent sector.

${services
  .map((s, i) => {
    const d = SERVICE_DETAIL[i];
    return [
      `### ${s.title}`,
      d.headline,
      bullets(d.builds.map((b) => `**${b.name}**: ${b.text}`)),
      `${d.proof.kind}: ${d.proof.items.join(", ")}.${d.proof.caveat ? ` ${d.proof.caveat}` : ""}`,
    ].join("\n\n");
  })
  .join("\n\n")}

## Products

${projects.length} demo-ready AI products, each with a page and a demo that plays on it.

${projects.map(productSection).join("\n\n")}

## How an engagement works

Start with one workflow and earn the right to expand. No enterprise-wide transformation program is required to establish whether the approach works, and there is no need to choose a model, design a RAG architecture or define an agent framework before the first conversation.

${bullets(stages.map((s) => `**${s.title}**: ${s.text}`))}

${closer ? `${closer.title}: ${closer.text}` : ""}

## Frequently asked questions

${faq()}

## Offices

${offices()}

## Contact

${contact()}
`;
}
