import { shareCard, publicImage, CARD_SIZE } from "@/app/_og/shareCard";
import { getUseCase, useCaseIds } from "@/components/usecases.data";

/* Each product's link preview: its name, the page's own headline, the
   capability chips the page lists under "built from", and the demo's
   poster at its own ratio. Generated at build for every product, like the
   pages. See app/_og/shareCard.jsx. */

export const alt = "An AI Brigade product: its headline, the capabilities it is built from, and a frame from its demo.";
export const size = CARD_SIZE;
export const contentType = "image/png";

export const dynamicParams = false;
export function generateStaticParams() {
  return useCaseIds.map((id) => ({ id }));
}

const clock = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default async function Image({ params }) {
  const { id } = await params;
  const uc = getUseCase(id);

  /* The poster's ratio is its video's — the cut the page opens on. */
  const video = Object.values(uc.videos || {}).find((v) => v.poster === uc.poster);
  const media = video
    ? { src: await publicImage(uc.poster), width: video.width, height: video.height }
    : null;

  const languages = uc.languages.map((l) => l.english);
  const demo = [
    languages.length > 1
      ? `Demo in ${languages.slice(0, -1).join(", ")} and ${languages.at(-1)}`
      : `Demo in ${languages[0] || "English"}`,
    uc.duration ? clock(uc.duration) : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return shareCard({
    eyebrow: `Use case · ${uc.sector}`,
    kicker: uc.name,
    title: uc.headline,
    titleSize: media && media.height > media.width ? 62 : 56,
    chips: uc.capabilities.map((c) => ({ label: c.title, color: c.color })),
    media,
    footer: demo,
  });
}
