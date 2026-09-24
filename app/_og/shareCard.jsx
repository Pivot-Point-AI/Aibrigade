import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * The 1200×630 link-preview card — what LinkedIn, X, Slack and iMessage
 * show when someone shares a page from this site.
 *
 * Every card is rendered by `next build` from the same data the pages
 * are (see the `opengraph-image.jsx` files), so a changed headline or a
 * new product gets its card without anyone opening a design tool. It
 * replaced the use-case pages sending the demo poster itself: four of
 * those are portrait phone recordings, and a 1.91:1 preview crops a
 * portrait frame to a strip of status bar.
 *
 * The look is the hero's: the near-black header canvas, the violet glow,
 * PP Neue Machina for the claim with its second line in the violet-300
 * accent, Aeonik for everything else, and the capability chips in their
 * deck colours (components/data.js).
 *
 * This folder is private (the leading underscore keeps it out of the
 * router). The fonts are the self-hosted WOFF2 in public/fonts unpacked
 * to OTF — the image renderer cannot read WOFF2. They are read from disk
 * at build time only: every card route here is static, so the container
 * never runs this code, and would not find app/ if it did.
 */

export const CARD_SIZE = { width: 1200, height: 630 };

const INK = "#05070a";
const VIOLET_300 = "#c79bf5";
const DIR = join(process.cwd(), "app", "_og");

const file = (name) => readFile(join(DIR, name));

async function fonts() {
  const [machina, regular, medium] = await Promise.all([
    file("PPNeueMachina-InktrapMedium.otf"),
    file("Aeonik-Regular.otf"),
    file("Aeonik-Medium.otf"),
  ]);
  return [
    { name: "Machina", data: machina, weight: 500, style: "normal" },
    { name: "Aeonik", data: regular, weight: 400, style: "normal" },
    { name: "Aeonik", data: medium, weight: 500, style: "normal" },
  ];
}

const dataUri = (buf, type) => `data:${type};base64,${buf.toString("base64")}`;

/** A poster from public/, as a data URI the renderer can embed. */
export async function publicImage(path) {
  const buf = await readFile(join(process.cwd(), "public", path));
  return dataUri(buf, path.endsWith(".png") ? "image/png" : "image/jpeg");
}

/* A MaskHeading string ("line\n*accent line*") as lines of segments. */
function titleLines(title) {
  return String(title)
    .split("\n")
    .map((line) =>
      line
        .split(/(\*[^*]+\*)/)
        .filter(Boolean)
        .map((s) => (s.startsWith("*") ? { text: s.slice(1, -1), accent: true } : { text: s }))
    );
}

function Chips({ chips, compact }) {
  const gap = compact ? 8 : 10;
  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap }}>
      {chips.map((c, i) => (
        <div key={c.label} style={{ display: "flex", alignItems: "center", gap }}>
          {/* The arrow is the hero chain (listen → understand → reason →
              act). Beside a poster the chips are a product's own list and
              wrap, and an arrow opening the second line reads as an error. */}
          {i > 0 && !compact ? <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }}>→</div> : null}
          <div
            style={{
              display: "flex",
              padding: compact ? "5px 11px" : "6px 14px",
              borderRadius: 999,
              border: `1.5px solid ${c.color}`,
              color: c.color,
              fontFamily: "Aeonik",
              fontWeight: 500,
              fontSize: compact ? 14 : 17,
              letterSpacing: compact ? 1.8 : 2.2,
              textTransform: "uppercase",
            }}
          >
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * @param eyebrow   small label top right, e.g. "Use case · E-commerce"
 * @param kicker    a name set just above the claim, e.g. "Fitzy"
 * @param title     MaskHeading syntax: "\n" breaks, *stars* mark the accent
 * @param lede      one or two lines under the claim
 * @param chips     [{ label, color }] — drawn as the hero's capability
 *                  chips: above the claim as in the hero, or, beside a
 *                  poster, under it and smaller
 * @param media     { src, width, height } — a poster, drawn on the right
 * @param footer    the line along the bottom edge
 * @param titleSize px; the claim is the card, so it is set large
 */
export async function shareCard({ eyebrow, kicker, title, lede, chips = [], media, footer, titleSize = 64 }) {
  const logo = dataUri(await file("logo.png"), "image/png");

  /* The poster column: a landscape frame is shown 16:9, a portrait one
     as a phone. Either way it is sized from its own ratio, never cropped. */
  let frame = null;
  if (media) {
    const portrait = media.height > media.width;
    /* 396px is what the card has between its top and bottom rows. */
    const h = portrait ? 396 : Math.round((440 * media.height) / media.width);
    const w = portrait ? Math.round((396 * media.width) / media.height) : 440;
    frame = { ...media, w, h, radius: portrait ? 26 : 18 };
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: INK,
          backgroundImage: [
            "radial-gradient(circle at 78% 42%, rgba(146,72,228,0.42) 0%, rgba(146,72,228,0) 46%)",
            "radial-gradient(circle at 8% 0%, rgba(103,44,169,0.35) 0%, rgba(103,44,169,0) 38%)",
          ].join(", "),
          color: "#fff",
          fontFamily: "Aeonik",
          padding: "56px 64px",
        }}
      >
        {/* Without media: the hero's intelligence core, as a glowing orb. */}
        {!frame ? (
          <div
            style={{
              position: "absolute",
              right: 96,
              top: 150,
              width: 300,
              height: 300,
              borderRadius: 999,
              border: "1px solid rgba(199,155,245,0.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: 999,
                backgroundImage:
                  "radial-gradient(circle at 34% 30%, #e2cbf8 0%, #9248e4 42%, #3f166e 100%)",
                boxShadow: "0 0 90px 20px rgba(146,72,228,0.55)",
              }}
            />
          </div>
        ) : null}

        <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "space-between" }}>
          {/* top: the logo, and the eyebrow on the right */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={logo} width={154} height={50} />
            {eyebrow ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: 2.4,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {eyebrow}
              </div>
            ) : null}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48 }}>
            {/* Without a poster the column stops short of the orb. */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1, ...(frame ? null : { maxWidth: 720 }) }}>
              {chips.length && !frame ? <Chips chips={chips} /> : null}
              {kicker ? (
                <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: VIOLET_300, marginBottom: -8 }}>
                  {kicker}
                </div>
              ) : null}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {titleLines(title).map((segs, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      fontFamily: "Machina",
                      fontWeight: 500,
                      fontSize: titleSize,
                      lineHeight: 1.04,
                      letterSpacing: -0.035 * titleSize,
                    }}
                  >
                    {segs.map((s, j) => (
                      <span key={j} style={{ color: s.accent ? VIOLET_300 : "#fff" }}>
                        {s.text}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              {lede ? (
                <div
                  style={{
                    display: "flex",
                    fontSize: 25,
                    lineHeight: 1.4,
                    color: "rgba(255,255,255,0.72)",
                    maxWidth: frame ? 620 : 700,
                  }}
                >
                  {lede}
                </div>
              ) : null}
              {chips.length && frame ? <Chips chips={chips} compact /> : null}
            </div>

            {frame ? (
              <div
                style={{
                  display: "flex",
                  borderRadius: frame.radius,
                  border: "1.5px solid rgba(255,255,255,0.16)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 120px rgba(146,72,228,0.35)",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                <img src={frame.src} width={frame.w} height={frame.h} style={{ objectFit: "cover" }} />
              </div>
            ) : null}
          </div>

          {/* bottom: a hairline, then the footer line */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(255,255,255,0.14)",
              paddingTop: 20,
              fontSize: 17,
              fontWeight: 500,
              letterSpacing: 2.2,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            <div style={{ display: "flex" }}>{footer}</div>
            <div style={{ display: "flex", color: "rgba(255,255,255,0.8)" }}>aibrigade.ai</div>
          </div>
        </div>
      </div>
    ),
    { ...CARD_SIZE, fonts: await fonts() }
  );
}
