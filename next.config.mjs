/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Dockerfile runs the self-contained server this produces
  // (`.next/standalone/server.js`), with public/ and .next/static copied
  // in beside it — see Dockerfile and .github/workflows/deploy.yml.
  output: "standalone",
  images: {
    // We reference the original brand assets straight from Webflow's CDN + S3.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "s3.amazonaws.com" },
      { protocol: "https", hostname: "d3e54v103j8qbb.cloudfront.net" },
    ],
  },
  // components/video.data.js's own comments assume "browser cache makes the
  // second request nearly free" for a film reused across sections — true
  // only once a response is actually cacheable long-term, and Next's default
  // static headers don't promise that. Most of these 14 clips back 2+
  // <AmbientVideo> instances (fintechGrowth alone backs six, at 5.9MB;
  // geneEditing backs five, at 14.9MB), so without this, every repeat
  // mount either re-fetches or spends a round trip revalidating a file that
  // never changes without also changing name. `immutable` is safe here
  // specifically because /video is the curated, provenance-tracked manifest
  // in video.data.js — swapping a clip's content means editing that file
  // too, which is the cue to rename it.
  //
  // Deliberately NOT applied to /reels: those paths are placeholders for
  // client footage that doesn't exist yet (see deployments.data.js) and
  // will land at their current names once shot, which a long-lived
  // immutable cache would then hide from returning visitors.
  // The site moved from Vercel to aibrigade.ai, and aibrigade.vercel.app
  // kept serving a full copy with its own canonical URLs — a duplicate
  // site competing with the real one in search. This sends that host to
  // the same path on aibrigade.ai. It takes effect only when the Vercel
  // project builds this code; if it no longer does, redirect or delete
  // the project in the Vercel dashboard instead. Host-matched, so it
  // never fires on the VPS.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "aibrigade.vercel.app" }],
        destination: "https://aibrigade.ai/:path*",
        permanent: true,
      },
      // The AI Lab (/demos) was removed. Links to it — search results,
      // old posts, anything shared — land on the product showcase, the
      // nearest thing the site still has, rather than on a 404.
      {
        source: "/demos",
        destination: "/#reels",
        permanent: true,
      },
      // The call-centre product was renamed from InCall to CallMate, and
      // its page moved with the name. Old links follow it.
      {
        source: "/use-cases/incall",
        destination: "/use-cases/callmate",
        permanent: true,
      },
      // RM2 was renamed Kwery (and is no longer pitched as retail-only).
      {
        source: "/use-cases/rm2",
        destination: "/use-cases/kwery",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/video/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // The self-hosted Webflow stylesheets (see app/layout.jsx). Their
      // origins cached them for a year; without this, every visit would
      // revalidate two render-blocking files. Same rule as /video: a
      // changed file gets a new name.
      {
        source: "/vendor/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // The self-hosted brand fonts (app/layout.jsx). Same rule again: a
      // changed font file gets a new name.
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
