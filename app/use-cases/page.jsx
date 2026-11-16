import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import UseCasesHub from "@/components/UseCasesHub";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, useCasesHubGraph } from "@/components/seo";
import { USE_CASES_PAGE } from "@/components/usecases.data";

/* No opengraph-image.jsx of its own, so it names the site's card. */
export const metadata = pageMetadata({
  title: USE_CASES_PAGE.title,
  description: USE_CASES_PAGE.description,
  path: USE_CASES_PAGE.path,
  siteCard: true,
});

export default function UseCasesPage() {
  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <UseCasesHub />
        <Cta />
        <Footer />
      </div>
      <JsonLd graph={useCasesHubGraph()} />
    </>
  );
}
