import { llmsTxt } from "@/components/llms";

/* /llms.txt — the site, indexed for AI assistants (https://llmstxt.org).
   Built once at build time from the data modules; see components/llms.js. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
