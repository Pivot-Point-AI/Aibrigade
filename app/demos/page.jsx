import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoLab from "@/components/demos/DemoLab";
import JsonLd from "@/components/JsonLd";
import { demos } from "@/components/demos/demos.data";
import { pageMetadata, webPageNode, breadcrumbNode } from "@/components/seo";
import { absoluteUrl } from "@/components/site.data";

/**
 * /demos — the AI Lab. The route keeps its original name so links already
 * shared to it keep working; everything a reader sees says "AI Lab".
 *
 * Same shell as every other route on this site: the shared navigation, the
 * page body, the shared footer, inside `.main-wrapper` so the preloader's
 * reveal and the page transition both apply here as they do elsewhere.
 */

const TITLE = "AI Lab";
const PATH = "/demos";
const DESCRIPTION =
  "Four live modules from the AI systems we build — real-time fraud decisioning, document intelligence, agent intent routing and grounded retrieval over a private corpus. Each one shows its working. Run your own input through it.";

export const metadata = {
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH }),
  keywords: [
    "AI lab",
    "AI demo",
    "fraud detection demo",
    "document AI",
    "RAG demo",
    "intent classification",
    "enterprise AI",
  ],
};

/**
 * One ItemList naming the four demos. It is the structured-data shape that
 * actually matches what this page is — a list of named interactive items —
 * rather than dressing it up as something with richer markup and no basis.
 * Built from the same register the page renders, so it cannot fall out of
 * step with what is on screen.
 */
const demoList = {
  "@type": "ItemList",
  "@id": `${absoluteUrl(PATH)}#modules`,
  name: "AI Brigade AI Lab — live modules",
  description: DESCRIPTION,
  numberOfItems: demos.length,
  itemListElement: demos.map((d, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: d.title,
    description: d.summary,
    url: absoluteUrl(`${PATH}#${d.id}`),
  })),
};

export default function DemosPage() {
  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <DemoLab />
        <Footer />
      </div>
      <JsonLd
        graph={[
          webPageNode({
            path: PATH,
            name: `${TITLE} | AI Brigade`,
            description: DESCRIPTION,
            extra: { mainEntity: { "@id": demoList["@id"] } },
          }),
          breadcrumbNode(PATH, [{ name: TITLE, path: PATH }]),
          demoList,
        ]}
      />
    </>
  );
}
