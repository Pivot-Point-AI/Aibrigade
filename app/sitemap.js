import { absoluteUrl } from "@/components/site.data";
import { getUseCase, useCaseIds } from "@/components/usecases.data";
import { legal } from "@/components/legal.data";
import { isoDate } from "@/components/seo";

/**
 * /sitemap.xml — every indexable page, built from the same lists the
 * routes are, so a new product page is listed the moment it exists.
 *
 * Left out: /icu, /halyk and /uub (permanent redirects) and /api.
 *
 * No `lastModified` except on the legal pages, which carry a real date.
 * Google ignores lastmod once it has seen it be wrong, and a build
 * timestamp on every URL is wrong for every page that did not change.
 * `changeFrequency` and `priority` are left out too — Google ignores both.
 *
 * Each product page lists its demo video and poster, which is how Google
 * finds a video it can show in video results (the page's VideoObject in
 * components/seo.js carries the rest).
 */

export default function sitemap() {
  const useCases = useCaseIds.map((id) => {
    const uc = getUseCase(id);
    const video = Object.values(uc.videos || {}).find((v) => v.poster === uc.poster);
    return {
      url: absoluteUrl(uc.href),
      ...(uc.poster ? { images: [absoluteUrl(uc.poster)] } : null),
      ...(video
        ? {
            videos: [
              {
                title: `${uc.name} demo`,
                thumbnail_loc: absoluteUrl(video.poster),
                description: uc.overview[0],
                content_loc: absoluteUrl(video.src),
                ...(video.duration ? { duration: video.duration } : null),
              },
            ],
          }
        : null),
    };
  });

  return [
    { url: absoluteUrl("/") },
    ...useCases,
    { url: absoluteUrl("/demos") },
    { url: absoluteUrl("/contact") },
    ...Object.values(legal).map((doc) => ({
      url: absoluteUrl(`/${doc.slug}`),
      lastModified: isoDate(doc.updated),
    })),
  ];
}
