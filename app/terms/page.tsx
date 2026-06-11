import type { Metadata } from "next";
import { Reveal, GlowOrbs } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | AIBrigade",
  description:
    "Read the terms and conditions governing the use of AIBrigade's website and AI development services for U.S. enterprise clients.",
  path: "/terms",
});

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      {
        sub: "",
        body: "By accessing or using the AI Brigade website (aibrigade.ai) or engaging with any of our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. These terms apply to all visitors, clients, and others who access or use our services.",
      },
    ],
  },
  {
    title: "Services",
    content: [
      {
        sub: "Scope of services",
        body: "AI Brigade provides custom AI system development, consulting, and deployment services for enterprise clients. Specific deliverables, timelines, and commercial terms for client engagements are governed by separate written agreements (Statements of Work or Master Service Agreements) entered into between AI Brigade and each client.",
      },
      {
        sub: "Website use",
        body: "The content on this website is provided for general informational purposes only. Nothing on this site constitutes a binding offer, guarantee of outcomes, or warranty of any kind. All figures, case study results, and performance metrics represent past client outcomes and are not a guarantee of future results.",
      },
      {
        sub: "Service availability",
        body: "We reserve the right to modify, suspend, or discontinue any part of our website or services at any time without notice. We will not be liable to you or any third party for any such modification, suspension, or discontinuation.",
      },
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      {
        sub: "AI Brigade content",
        body: "All content on this website — including text, graphics, logos, images, and software — is the property of AI Brigade or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.",
      },
      {
        sub: "Client work product",
        body: "Intellectual property rights for work product developed under client engagements are governed by the applicable Master Service Agreement or Statement of Work. By default, upon full payment, clients receive ownership of custom deliverables. AI Brigade retains rights to its proprietary tooling, frameworks, and methodologies.",
      },
      {
        sub: "Feedback",
        body: "Any feedback, suggestions, or ideas you provide to us regarding our website or services may be used by AI Brigade without restriction or compensation to you.",
      },
    ],
  },
  {
    title: "Confidentiality",
    content: [
      {
        sub: "Our commitment",
        body: "We treat all information shared with us during the enquiry and engagement process as confidential. We do not share client information with third parties except as required to deliver services or as required by law.",
      },
      {
        sub: "NDAs",
        body: "For clients who require a formal Non-Disclosure Agreement before sharing sensitive business information, we are pleased to sign one prior to any detailed discussions. Please request an NDA through our contact page.",
      },
      {
        sub: "Your obligations",
        body: "You agree not to share, publish, or disclose any proprietary information, methodologies, or materials provided by AI Brigade in connection with an engagement without our prior written consent.",
      },
    ],
  },
  {
    title: "Disclaimers & Limitation of Liability",
    content: [
      {
        sub: "No warranty",
        body: "This website and its content are provided 'as is' without warranty of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.",
      },
      {
        sub: "Limitation of liability",
        body: "To the maximum extent permitted by applicable law, AI Brigade shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or our services, even if we have been advised of the possibility of such damages.",
      },
      {
        sub: "AI system performance",
        body: "AI systems involve inherent uncertainty. While we apply rigorous evaluation methodologies, AI Brigade does not guarantee specific performance metrics or business outcomes for any AI system developed. Client-specific results are subject to data quality, infrastructure, and operational factors outside our control.",
      },
    ],
  },
  {
    title: "Acceptable Use",
    content: [
      {
        sub: "Prohibited conduct",
        body: "You agree not to use our website or services to: (a) violate any applicable laws or regulations; (b) transmit any harmful, offensive, or disruptive content; (c) attempt to gain unauthorised access to our systems; (d) scrape, harvest, or collect data from our website without permission; or (e) impersonate any person or entity.",
      },
      {
        sub: "Compliance",
        body: "You are responsible for ensuring your use of AI systems developed by AI Brigade complies with all applicable laws in your jurisdiction, including data protection regulations (GDPR, HIPAA, CCPA), financial services regulations, and AI-specific legislation as it emerges.",
      },
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      {
        sub: "",
        body: "Our website may contain links to third-party websites or integrate third-party tools. We are not responsible for the content, privacy practices, or terms of those third parties. Links do not constitute endorsement. AI systems we build may incorporate third-party models, APIs, or cloud services, which are subject to their own terms of service.",
      },
    ],
  },
  {
    title: "Governing Law & Disputes",
    content: [
      {
        sub: "Governing law",
        body: "These Terms of Service are governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law principles.",
      },
      {
        sub: "Dispute resolution",
        body: "Any dispute arising out of or relating to these terms or your use of our website shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be subject to binding arbitration in San Francisco, California, under the rules of the American Arbitration Association.",
      },
      {
        sub: "Class action waiver",
        body: "You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.",
      },
    ],
  },
  {
    title: "Changes to These Terms",
    content: [
      {
        sub: "",
        body: "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website with an updated 'Last updated' date. Your continued use of the website after any changes constitutes your acceptance of the new terms. We encourage you to review these terms periodically.",
      },
    ],
  },
  {
    title: "Contact",
    content: [
      {
        sub: "",
        body: "If you have questions about these Terms of Service, please contact us at legal@aibrigade.ai or write to AI Brigade, San Francisco, CA. For privacy-related enquiries, please refer to our Privacy Policy.",
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(ellipse,rgba(155,77,255,0.12) 0%,transparent 70%)" }} />
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(ellipse,rgba(0,212,255,0.08) 0%,transparent 70%)" }} />
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
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[rgba(155,77,255,0.3)] bg-[rgba(155,77,255,0.07)] mb-8"
              style={{ boxShadow: "0 0 20px rgba(155,77,255,0.12)" }}>
              <span className="w-2 h-2 rounded-full bg-[#C084FC]" style={{ boxShadow: "0 0 8px #C084FC" }} />
              <span className="text-[11px] font-mono font-700 tracking-[0.3em] uppercase text-[#C084FC]">Legal</span>
            </div>

            <h1 className="font-display font-700 text-white leading-[1.06] mb-6"
              style={{ fontSize: "clamp(2rem,4.5vw,3.6rem)" }}>
              Terms of Service
            </h1>

            <p className="text-[rgba(232,243,255,0.75)] text-lg leading-relaxed max-w-2xl mb-6">
              Please read these terms carefully before using the AI Brigade website or engaging with our services.
              By accessing our site, you agree to be bound by these terms.
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#C084FC]" />
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
                  className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:translate-x-0.5 group"
                  style={{ color: "rgba(232,243,255,0.65)" }}>
                  <span className="text-[10px] font-mono text-[#C084FC] w-5 flex-shrink-0">
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
            <Reveal key={si} delay={si * 0.03}>
              <div id={`section-${si}`} className="rounded-2xl overflow-hidden" style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(13,18,40,0.72)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              }}>
                {/* Section header */}
                <div className="px-7 py-5 border-b border-[rgba(255,255,255,0.07)] flex items-center gap-4"
                  style={{ background: "linear-gradient(90deg,rgba(155,77,255,0.05),transparent)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-mono font-700 text-xs"
                    style={{ background: "rgba(155,77,255,0.1)", border: "1px solid rgba(155,77,255,0.3)", color: "#C084FC" }}>
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
                            style={{ background: ci % 2 === 0 ? "#C084FC" : "#00D4FF", boxShadow: `0 0 6px ${ci % 2 === 0 ? "#C084FC" : "#00D4FF"}` }} />
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
            border: "1px solid rgba(155,77,255,0.2)",
            background: "rgba(13,18,40,0.8)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 0 40px rgba(155,77,255,0.06)",
          }}>
            <p className="text-[rgba(232,243,255,0.75)] text-sm leading-relaxed mb-2">
              Questions about these terms?
            </p>
            <p className="text-[rgba(232,243,255,0.5)] text-xs mb-5">
              Also see our{" "}
              <a href="/privacy" className="text-[#00D4FF] hover:underline">Privacy Policy</a>
              {" "}for information about how we handle your data.
            </p>
            <a href="mailto:legal@aibrigade.ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-600 text-[#C084FC] transition-all duration-200 hover:-translate-y-0.5"
              style={{ border: "1px solid rgba(155,77,255,0.35)", background: "rgba(155,77,255,0.08)" }}>
              legal@aibrigade.ai →
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
