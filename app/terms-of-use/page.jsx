import LegalPage from "@/components/LegalPage";
import JsonLd from "@/components/JsonLd";
import { legal } from "@/components/legal.data";
import { pageMetadata, legalPageGraph } from "@/components/seo";

const PATH = "/terms-of-use";
const DESCRIPTION =
  "The terms on which you may use aibrigade.ai: what is on the site, what you may do with it, and the limits of what it promises.";

export const metadata = pageMetadata({ title: "Terms of Use", description: DESCRIPTION, path: PATH, siteCard: true });

export default function Page() {
  return (
    <>
      <LegalPage slug="terms-of-use" />
      <JsonLd graph={legalPageGraph(legal["terms-of-use"], PATH, DESCRIPTION)} />
    </>
  );
}
