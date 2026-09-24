import { SITE_URL } from "@/components/site.data";

/**
 * /robots.txt — there was none (a 404), so crawlers had to guess.
 *
 * Everything public is open. /api/ is closed: it is the contact form's
 * endpoint and the AI Lab's engines, and a crawled POST-only route is
 * only noise.
 *
 * The AI crawlers are named rather than left to `*`. A crawler that finds
 * a group naming it obeys only that group, so these stay allowed even if
 * a blanket rule is ever added above — being citable by the answer
 * engines (ChatGPT, Claude, Perplexity, Gemini, Copilot) is the point of
 * /llms.txt and the site's structured data. To stay in AI search but out
 * of model training, remove the training-only agents from AI_AGENTS:
 * GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot and
 * meta-externalagent. The search and user-fetch agents (OAI-SearchBot,
 * ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot,
 * Perplexity-User) are what put the site in answers.
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_AGENTS, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
