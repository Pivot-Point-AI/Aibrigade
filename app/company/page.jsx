import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import Company from "@/components/Company";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, webPageNode, breadcrumbNode, ID } from "@/components/seo";

const TITLE = "Company";
const PATH = "/company";
const DESCRIPTION =
  "AI Brigade builds enterprise AI that does the work — agentic systems that act inside the systems a business already runs. Who we are, what we build by, and how we work, from New Jersey, Dubai and Islamabad.";

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
          breadcrumbNode(PATH, [{ name: TITLE, path: PATH }]),
        ]}
      />
    </>
  );
}
