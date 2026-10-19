import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, webPageNode, breadcrumbNode, ID } from "@/components/seo";

const TITLE = "Contact the Enterprise AI Agent Team";
const DESCRIPTION =
  "Scope your custom AI agent or workflow automation project with AI Brigade engineers. Send your problem and constraints for a reply in 1 business day.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <Contact />
        <Footer />
      </div>
      <JsonLd
        graph={[
          webPageNode({
            path: "/contact",
            type: "ContactPage",
            name: `${TITLE} | AI Brigade`,
            description: DESCRIPTION,
            extra: { mainEntity: { "@id": ID.org } },
          }),
          breadcrumbNode("/contact", [{ name: "Contact", path: "/contact" }]),
        ]}
      />
    </>
  );
}
