import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, webPageNode, breadcrumbNode, ID } from "@/components/seo";

const TITLE = "Contact";
const DESCRIPTION =
  "Talk to the engineers who build AI systems for FinTech and HealthTech. Send us the problem and the constraints, and you will get an answer within one business day.";

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
          breadcrumbNode("/contact", [{ name: TITLE, path: "/contact" }]),
        ]}
      />
    </>
  );
}
