import { shareCard, CARD_SIZE } from "./_og/shareCard";
import { whyUs } from "@/components/data";

/* The site's link preview — the home page's, and every page's that has
   none of its own (the legal pages). The hero, restated: its four chips,
   its claim, its lede and its sector row. See app/_og/shareCard.jsx. */

export const alt =
  "AI Brigade: AI that does the work. Enterprise AI that listens, understands, reasons and acts inside the systems you already run.";
export const size = CARD_SIZE;
export const contentType = "image/png";

const HERO_CHIPS = ["Listen", "Understand", "Reason", "Act"];

export default function Image() {
  return shareCard({
    chips: whyUs.filter((c) => HERO_CHIPS.includes(c.title)).map((c) => ({ label: c.title, color: c.color })),
    title: "AI that does\n*the work.*",
    titleSize: 96,
    lede: "Enterprise AI that listens, understands, reasons, connects to the systems you already run, and executes real business workflows.",
    footer: "Fintech · Healthtech · Retail · Customer ops · Industrial · Energy",
  });
}
