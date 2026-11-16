import { notFound } from "next/navigation";
import UseCase from "@/components/UseCase";
import JsonLd from "@/components/JsonLd";
import { getUseCase, plainHeadline, useCaseIds } from "@/components/usecases.data";
import { pageMetadata, webPageNode, breadcrumbNode, useCaseNodes, useCaseFaqNode } from "@/components/seo";
import { absoluteUrl } from "@/components/site.data";

/* One page per product in the showcase, generated at build time. An id
   that isn't a product is a 404, not an empty template. */
export const dynamicParams = false;

export function generateStaticParams() {
  return useCaseIds.map((id) => ({ id }));
}

/* "FitVoice: Conversational AI shopping assistant". `searchTitle` says
   what the product is; the headline is the page's voice and some of them
   are slogans ("The call that starts every deal."), which tell a search
   result nothing. */
const titleOf = (uc) => `${uc.name}: ${uc.searchTitle || plainHeadline(uc.headline)}`;

/* A product may carry its own full <title> (`metaTitle`), brand included;
   it is then used as-is instead of getting the layout's " | AI Brigade". */
const fullTitleOf = (uc) => uc.metaTitle || `${titleOf(uc)} | AI Brigade`;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const uc = getUseCase(id);
  if (!uc) return {};
  return pageMetadata({
    title: uc.metaTitle ? { absolute: uc.metaTitle } : titleOf(uc),
    description: uc.metaDescription || uc.overview[0],
    path: uc.href,
  });
}

export default async function UseCasePage({ params }) {
  const { id } = await params;
  const uc = getUseCase(id);
  if (!uc) notFound();
  return (
    <>
      <UseCase id={id} />
      <JsonLd
        graph={[
          webPageNode({
            path: uc.href,
            name: fullTitleOf(uc),
            description: uc.metaDescription || uc.overview[0],
            image: uc.poster,
            extra: {
              about: { "@id": `${absoluteUrl(uc.href)}#service` },
              ...(uc.poster ? { video: { "@id": `${absoluteUrl(uc.href)}#video` } } : null),
            },
          }),
          breadcrumbNode(uc.href, [{ name: uc.name, path: uc.href }]),
          useCaseNodes(uc),
          ...(uc.faq ? [useCaseFaqNode(uc)] : []),
        ]}
      />
    </>
  );
}
