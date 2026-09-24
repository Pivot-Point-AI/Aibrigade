import { CHAPTERS } from "@/components/motion/chapters";

/**
 * The chapter label that opens a section: its descriptor and a hairline
 * running off toward the margin.
 *
 * It used to lead with the chapter's number as a pill ("06"), looked up
 * from `CHAPTERS`. The number was dropped at the user's request. The
 * lookup stays: a section whose id is not in `CHAPTERS` (Cases, while it
 * is commented out of app/page.jsx) still renders no kicker.
 *
 * `label` is the section's own descriptor and is deliberately NOT the
 * chapter name: the rail says "Evidence", the section heading says
 * "Prominent Cases", and printing both in the same spot would just be the
 * same phrase twice.
 */
export default function Kicker({ id, label, tone }) {
  if (!CHAPTERS.some((c) => c.id === id)) return null;

  const cls = ["ax-kicker", tone ? `ax-kicker--${tone}` : ""]
    .filter(Boolean)
    .join(" ");

  return <p className={cls}>{label}</p>;
}
