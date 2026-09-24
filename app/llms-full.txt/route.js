import { llmsFullTxt } from "@/components/llms";

/* /llms-full.txt — the whole site as one Markdown document, for AI
   assistants. Built once at build time; see components/llms.js. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
