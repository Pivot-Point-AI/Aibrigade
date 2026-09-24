import LegalPage from "@/components/LegalPage";
import JsonLd from "@/components/JsonLd";
import { legal } from "@/components/legal.data";
import { pageMetadata, legalPageGraph } from "@/components/seo";

const PATH = "/privacy-policy";
const DESCRIPTION =
  "What AI Brigade collects when you use aibrigade.ai or send an enquiry, why we hold it, who it reaches, and how to have it removed.";

export const metadata = pageMetadata({ title: "Privacy Policy", description: DESCRIPTION, path: PATH, siteCard: true });

export default function Page() {
  return (
    <>
      <LegalPage slug="privacy-policy" />
      <JsonLd graph={legalPageGraph(legal["privacy-policy"], PATH, DESCRIPTION)} />
    </>
  );
}
