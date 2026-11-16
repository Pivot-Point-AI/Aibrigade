import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import ServicePage from "@/components/ServicePage";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, servicePageGraph } from "@/components/seo";
import { SERVICE_PAGES } from "@/components/servicepages.data";

const PAGE = SERVICE_PAGES.automation;

/* No opengraph-image.jsx of its own, so it names the site's card. */
export const metadata = pageMetadata({
  title: PAGE.title,
  description: PAGE.description,
  path: PAGE.path,
  siteCard: true,
});

export default function AiAutomationServicesPage() {
  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <ServicePage kind="automation" />
        <Cta />
        <Footer />
      </div>
      <JsonLd graph={servicePageGraph("automation")} />
    </>
  );
}
