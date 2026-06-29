import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { organizationSchema, websiteSchema } from "@/lib/schema";

/* ── Fonts (zero layout shift, self-hosted via next/font) ────
   A single professional typeface — Inter — used consistently
   across body text, headings, and display copy.
   Mono: JetBrains Mono — for numbers & code accents
─────────────────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/* ── Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://aibrigade.ai"),
  title: {
    default: "AIBrigade — AI for Fintech & HealthTech",
    template: "%s | AIBrigade",
  },
  description:
    "AIBrigade builds custom AI products for Fintech and HealthTech companies. From intelligent automation to predictive analytics — we deliver enterprise-grade AI that drives measurable outcomes.",
  keywords: [
    "AI solutions", "fintech AI", "healthtech AI", "custom AI development",
    "machine learning", "artificial intelligence", "AI consulting",
    "financial AI", "healthcare AI", "predictive analytics", "automation", "North America",
  ],
  authors: [{ name: "AIBrigade", url: "https://aibrigade.ai" }],
  creator: "AIBrigade",
  publisher: "AIBrigade",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aibrigade.ai",
    siteName: "AIBrigade",
    title: "AIBrigade — AI for Fintech & HealthTech",
    description: "Enterprise-grade AI solutions for the future of finance and healthcare. Custom-built. Measurably impactful.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "AIBrigade" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIBrigade — AI for Fintech & HealthTech",
    description: "Enterprise-grade AI solutions for the future of finance and healthcare.",
    images: ["/opengraph-image"],
    creator: "@aibrigadeai",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/logo.png" }],
  },
  alternates: { canonical: "https://aibrigade.ai" },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className="font-body antialiased overflow-x-hidden selection:bg-[var(--accent)]/30 selection:text-[var(--text-primary)]"
        style={{ background: "linear-gradient(135deg, #0E1B3D 0%, #0D1535 35%, #190D3A 65%, #0E1B3D 100%)", minHeight: "100vh" }}
      >
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
