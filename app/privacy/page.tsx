import type { Metadata } from "next";
import { Reveal, GlowOrbs } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | AIBrigade",
  description:
    "Read AIBrigade's privacy policy to learn how we collect, use, and protect your personal information when you use our website and AI services.",
  path: "/privacy",
});

const sections = [
  {
    title: "Information We Collect",
    content: [
      {
        sub: "Information you provide directly",
        body: "When you contact us, request a consultation, or submit a form on our website, we collect information such as your name, email address, company name, phone number, industry, and project description.",
      },
      {
        sub: "Information collected automatically",
        body: "We may collect certain technical information automatically when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. This is used solely to improve site performance and user experience.",
      },
      {
        sub: "Cookies",
        body: "We use essential cookies to operate the website. We do not use third-party advertising cookies or sell your data to advertisers. You can disable cookies in your browser settings, though some site features may not function as intended.",
      },
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      {
        sub: "To respond to your inquiries",
        body: "We use your contact information to respond to messages, schedule discovery calls, and deliver scoped proposals you have requested.",
      },
      {
        sub: "To improve our services",
        body: "Aggregated, anonymised data may be used to understand how visitors interact with our site and to improve our content and offerings.",
      },
      {
        sub: "To send relevant communications",
        body: "With your consent, we may send updates about our services, case studies, or industry insights. You can opt out of these communications at any time via the unsubscribe link in any email.",
      },
    ],
  },
  {
    title: "How We Protect Your Information",
    content: [
      {
        sub: "Security measures",
        body: "We implement industry-standard technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. Our infrastructure is hosted on SOC 2-compliant cloud providers.",
      },
      {
        sub: "NDAs on request",
        body: "For clients sharing sensitive business information during our engagement process, we are happy to sign a mutual NDA before any detailed discussions take place. Please request one when you contact us.",
      },
      {
        sub: "Data retention",
        body: "We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Contact data from enquiries is typically retained for 24 months.",
      },
    ],
  },
  {
    title: "Sharing Your Information",
    content: [
      {
        sub: "We do not sell your data",
        body: "AI Brigade does not sell, rent, or trade your personal information to third parties for marketing purposes — ever.",
      },
      {
        sub: "Service providers",
        body: "We may share limited data with trusted service providers (e.g. email delivery, CRM, analytics) who process data on our behalf under strict data processing agreements and are prohibited from using it for any other purpose.",
      },
      {
        sub: "Legal requirements",
        body: "We may disclose your information if required to do so by law, or if we believe in good faith that such disclosure is necessary to protect our rights, your safety, or the safety of others.",
      },
    ],
  },
  {
    title: "Your Rights",
    content: [
      {
        sub: "Access and correction",
        body: "You have the right to request access to the personal data we hold about you and to request correction of any inaccurate information.",
      },
      {
        sub: "Deletion",
        body: "You may request that we delete your personal data at any time. We will honour such requests unless we are required by law to retain the data.",
      },
      {
        sub: "Data portability",
        body: "Where applicable under GDPR or other applicable law, you have the right to receive your personal data in a structured, machine-readable format.",
      },
      {
        sub: "Opt-out",
        body: "You can opt out of marketing communications at any time by clicking the unsubscribe link in any email or by contacting us directly at privacy@aibrigade.ai.",
      },
    ],
  },
  {
    title: "Third-Party Links",
    content: [
      {
        sub: "",
        body: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies independently.",
      },
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      {
        sub: "",
        body: "We may update this Privacy Policy from time to time. When we do, we will revise the 'Last updated' date at the top of this page. We encourage you to review this policy periodically. Continued use of our website after changes constitutes acceptance of the updated policy.",
      },
    ],
  },
  {
    title: "Contact Us",
    content: [
      {
        sub: "",
        body: "If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our privacy team at privacy@aibrigade.ai or write to us at AI Brigade, 370 Federal Court, Perth Amboy, NJ 08861, USA.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(ellipse,rgba(0,212,255,0.1) 0%,transparent 70%)" }} />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(ellipse,rgba(155,77,255,0.07) 0%,transparent 70%)" }} />
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.05) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />
        <GlowOrbs />
      </div>

      <div className="container-custom relative pt-36 pb-28 max-w-4xl mx-auto">

        {/* ── Header ── */}
        <Reveal>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.07)] mb-8"
              style={{ boxShadow: "0 0 20px rgba(0,212,255,0.12)" }}>
              <span className="w-2 h-2 rounded-full bg-[#00D4FF]" style={{ boxShadow: "0 0 8px #00D4FF" }} />
              <span className="text-[11px] font-mono font-700 tracking-[0.3em] uppercase text-[#00D4FF]">Legal</span>
            </div>

            <h1 className="font-display font-700 text-white leading-[1.06] mb-6"
              style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)" }}>
              Privacy Policy
            </h1>

            <p className="text-[rgba(232,243,255,0.75)] text-lg leading-relaxed max-w-2xl mb-6">
              AI Brigade is committed to protecting your privacy. This policy explains how we collect,
              use, and safeguard your personal information when you use our website or engage with our services.
            </p>

            {/* Last updated */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
              <span className="text-[11px] font-mono text-[rgba(232,243,255,0.55)] tracking-wider">
                Last updated: June 2025
              </span>
            </div>
          </div>
        </Reveal>

        {/* ── Quick nav ── */}
        <Reveal delay={0.08}>
          <div className="rounded-2xl p-6 mb-12" style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(13,18,40,0.75)",
            backdropFilter: "blur(16px)",
          }}>
            <p className="text-[11px] font-mono font-700 tracking-[0.25em] uppercase text-[rgba(232,243,255,0.45)] mb-4">
              Contents
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((s, i) => (
                <a key={i} href={`#section-${i}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:-translate-x-0.5 group"
                  style={{ color: "rgba(232,243,255,0.65)" }}>
                  <span className="text-[10px] font-mono text-[#00D4FF] w-5 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm group-hover:text-white transition-colors">{s.title}</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Sections ── */}
        <div className="flex flex-col gap-6">
          {sections.map((section, si) => (
            <Reveal key={si} delay={si * 0.04}>
              <div id={`section-${si}`} className="rounded-2xl overflow-hidden" style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(13,18,40,0.72)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              }}>
                {/* Section header */}
                <div className="px-7 py-5 border-b border-[rgba(255,255,255,0.07)] flex items-center gap-4"
                  style={{ background: "linear-gradient(90deg,rgba(0,212,255,0.05),transparent)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-mono font-700 text-xs"
                    style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>
                    {String(si + 1).padStart(2, "0")}
                  </div>
                  <h2 className="font-display font-700 text-white text-lg">{section.title}</h2>
                </div>

                {/* Section body */}
                <div className="px-7 py-6 flex flex-col gap-5">
                  {section.content.map((item, ci) => (
                    <div key={ci}>
                      {item.sub && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: ci % 2 === 0 ? "#00D4FF" : "#C084FC", boxShadow: `0 0 6px ${ci % 2 === 0 ? "#00D4FF" : "#C084FC"}` }} />
                          <h3 className="text-sm font-700 text-white">{item.sub}</h3>
                        </div>
                      )}
                      <p className="text-[rgba(232,243,255,0.82)] text-sm leading-relaxed"
                        style={{ paddingLeft: item.sub ? "1.25rem" : 0 }}>
                        {item.body}
                      </p>
                      {ci < section.content.length - 1 && (
                        <div className="mt-5 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <Reveal>
          <div className="mt-12 rounded-2xl p-8 text-center" style={{
            border: "1px solid rgba(0,212,255,0.2)",
            background: "rgba(13,18,40,0.8)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 0 40px rgba(0,212,255,0.06)",
          }}>
            <p className="text-[rgba(232,243,255,0.75)] text-sm leading-relaxed mb-4">
              Questions about your data or our privacy practices?
            </p>
            <a href="mailto:privacy@aibrigade.ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-600 text-[#00D4FF] transition-all duration-200 hover:-translate-y-0.5"
              style={{ border: "1px solid rgba(0,212,255,0.35)", background: "rgba(0,212,255,0.08)" }}>
              privacy@aibrigade.ai →
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

