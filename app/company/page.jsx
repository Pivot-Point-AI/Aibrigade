import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import Company from "@/components/Company";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, webPageNode, breadcrumbNode, ID } from "@/components/seo";

const TITLE = "About Our Enterprise & Agentic AI Company";
const PATH = "/company";
const DESCRIPTION =
  "Meet AI Brigade, an agentic AI development company in New Jersey, Dubai and Islamabad building enterprise AI agents that execute real business work.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function CompanyPage() {
  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <Company />
        <Cta />
        <Footer />
      </div>
      <JsonLd
        graph={[
          webPageNode({
            path: PATH,
            type: "AboutPage",
            name: `${TITLE} | AI Brigade`,
            description: DESCRIPTION,
            extra: { about: { "@id": ID.org }, mainEntity: { "@id": ID.org } },
          }),
          breadcrumbNode(PATH, [{ name: "Company", path: PATH }]),
        ]}
      />
    </>
  );
}
