"use client";
import { useState, useEffect, useRef } from "react";
import { Landmark, HeartPulse, ShieldCheck, CheckCircle2, Code2 } from "lucide-react";
import { SceneWrapper } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { TESTIMONIALS, METRICS, TRUSTED_LOGOS } from "./data";
import { useIsMobile, useWindowSize } from "./hooks";
import { Badge } from "@/components/ui/Card";

const INDUSTRY_ICONS: Record<string, typeof Landmark> = { Landmark, HeartPulse };
const TAG_ICONS = [ShieldCheck, CheckCircle2, Code2];

const CYCLE_MS = 7000;

export function ResonanceScene({ scene, mouse: _mouse, data }: { scene: number; mouse: MousePosition; data: SceneData }) {
  const isMobile = useIsMobile();
  const { width } = useWindowSize();
  const sidebarVisible = !isMobile && width >= 1400;
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(p => (p + 1) % TESTIMONIALS.length), CYCLE_MS);
  };

  useEffect(() => {
    if (scene > 0.5) { setActive(0); startTimer(); }
    else if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [scene > 0.5]);

  const t = TESTIMONIALS[active];

  return (
    <SceneWrapper opacity={scene}>
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        paddingTop: `calc(${isMobile ? 80 : 100}px + var(--announcement-offset, 0px))`,
        paddingBottom: isMobile ? 20 : 24,
        paddingLeft: isMobile ? 20 : sidebarVisible ? 284 : 60,
        paddingRight: isMobile ? 20 : sidebarVisible ? 284 : 60,
        gap: isMobile ? 16 : 20,
        overflowY: isMobile ? "auto" : "hidden",
      }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: isMobile ? 10 : 14 }}>
            <Badge variant="violet" size="md" dot>Client Resonance</Badge>
          </div>
          <h2 style={{
            fontSize: isMobile ? "clamp(1.5rem,6.5vw,1.9rem)" : "clamp(2rem,3.3vw,2.7rem)",
            fontFamily: "'Inter', sans-serif",
            color: "#F8FAFC", fontWeight: 800, lineHeight: 1.08, margin: 0, letterSpacing: "-0.02em",
          }}>
            Voices from the{" "}
            <span style={{
              background: "linear-gradient(135deg,#C084FC,#9B4DFF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>enterprises we've transformed</span>
          </h2>
      
        </div>

        {/* ── Main layout ── */}
        <div style={{
          width: "100%", maxWidth: 920,
          display: "flex", flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 16 : 20,
          alignItems: "stretch",
        }}>

          {/* ── Testimonial card ── */}
          <div style={{
            flex: 1,
            borderRadius: 22,
            background: "linear-gradient(165deg, rgba(15,21,44,0.92), rgba(11,16,34,0.88))",
            border: "1px solid rgba(155,77,255,0.28)",
            backdropFilter: "blur(28px)",
            boxShadow: "0 28px 72px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 48px rgba(155,77,255,0.1)",
            overflow: "hidden",
          }}>
            {/* Card header bar */}
            <div style={{
              padding: isMobile ? "14px 18px" : "16px 28px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              background: "linear-gradient(90deg,rgba(155,77,255,0.07),transparent)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Avatar */}
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg,rgba(155,77,255,0.4),rgba(0,212,255,0.3))",
                  border: "1.5px solid rgba(155,77,255,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: "#e9d5ff",
                  fontFamily: "monospace",
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'Inter', sans-serif", lineHeight: 1.2 }}>{t.name}</div>
                  <div style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(196,181,253,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 1 }}>
                    {t.title} · {t.company}
                  </div>
                </div>
              </div>
              {/* Stars */}
              <div style={{ display: "flex", gap: 2 }}>
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} width="12" height="12" viewBox="0 0 24 24" fill="#C084FC" style={{ opacity: 0.9 }}>
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Quote body */}
            <div style={{ padding: isMobile ? "20px 18px" : "28px 28px 24px" }}>
              <div style={{ fontSize: isMobile ? 28 : 40, color: "rgba(155,77,255,0.4)", fontFamily: "'Inter', sans-serif", lineHeight: 0.6, marginBottom: 12 }}>"</div>
              <p style={{
                fontSize: isMobile ? 13 : 15,
                color: "rgba(232,243,255,0.88)",
                fontWeight: 400,
                lineHeight: 1.75,
                fontFamily: "'Inter', sans-serif",
                margin: 0,
              }}>
                {t.quote}
              </p>
              {t.tags.length > 0 && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
                  {t.tags.map((tag, ti) => {
                    const TagIcon = TAG_ICONS[ti % TAG_ICONS.length];
                    return (
                      <div key={tag} style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "6px 10px", borderRadius: 10,
                        background: "rgba(155,77,255,0.08)",
                        border: "1px solid rgba(155,77,255,0.22)",
                        fontSize: 11, color: "rgba(232,243,255,0.8)",
                        fontFamily: "'Inter', sans-serif", fontWeight: 500,
                      }}>
                        <TagIcon size={12} color="#C084FC" />
                        {tag}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom nav */}
            <div style={{
              padding: isMobile ? "12px 18px" : "14px 28px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <button onClick={() => { setActive(p => Math.max(0, p - 1)); startTimer(); }} style={{
                background: "none", border: "none", cursor: active === 0 ? "not-allowed" : "pointer",
                color: active === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.55)",
                fontSize: 10, fontFamily: "monospace", letterSpacing: "0.12em",
                minHeight: 40, padding: "8px 4px", display: "flex", alignItems: "center",
              }}>← PREV</button>

              {/* Dot indicators */}
              <div style={{ display: "flex", gap: 5 }}>
                {TESTIMONIALS.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => { setActive(i); startTimer(); }}
                    style={{
                      minWidth: 24, minHeight: 24,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{
                      width: i === active ? 20 : 5, height: 4, borderRadius: 2,
                      background: i === active ? "#C084FC" : "rgba(155,77,255,0.25)",
                      transition: "all 0.4s ease",
                      boxShadow: i === active ? "0 0 6px rgba(155,77,255,0.45)" : "none",
                    }} />
                  </div>
                ))}
              </div>

              <button onClick={() => { setActive(p => Math.min(TESTIMONIALS.length - 1, p + 1)); startTimer(); }} style={{
                background: "none", border: "none",
                cursor: active === TESTIMONIALS.length - 1 ? "not-allowed" : "pointer",
                color: active === TESTIMONIALS.length - 1 ? "rgba(255,255,255,0.18)" : "#C084FC",
                fontSize: 10, fontFamily: "monospace", letterSpacing: "0.12em",
                minHeight: 40, padding: "8px 4px", display: "flex", alignItems: "center",
              }}>NEXT →</button>
            </div>
          </div>

          {/* ── Right: metrics panel ── */}
          {!isMobile && (
            <div style={{
              width: 220, flexShrink: 0,
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              {/* Industry badge */}
              <div style={{
                padding: "14px 16px", borderRadius: 14,
                background: "rgba(13,18,40,0.88)",
                border: "1px solid rgba(155,77,255,0.2)",
                backdropFilter: "blur(16px)",
                display: "flex", gap: 12, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(155,77,255,0.14)", border: "1px solid rgba(155,77,255,0.35)",
                }}>
                  {(() => {
                    const IndustryIcon = INDUSTRY_ICONS[t.industryIcon];
                    return <IndustryIcon size={17} color="#C084FC" />;
                  })()}
                </div>
                <div>
                  <div style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(196,181,253,0.6)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 4 }}>
                    Industry
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
                    {t.industry}
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <Badge variant="violet" size="sm" dot>Verified</Badge>
                  </div>
                </div>
              </div>

              {/* Key metrics */}
              {METRICS.slice(0, 3).map((m, mi) => (
                <div key={mi} style={{
                  padding: "16px", borderRadius: 14,
                  background: "rgba(13,18,40,0.88)",
                  border: `1px solid ${mi === 0 ? "rgba(155,77,255,0.25)" : "rgba(255,255,255,0.07)"}`,
                  backdropFilter: "blur(16px)",
                  textAlign: "center",
                }}>
                  <div style={{
                    fontSize: "clamp(1.4rem,2.5vw,1.9rem)",
                    fontWeight: 800,
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1,
                    marginBottom: 4,
                    color: mi === 0 ? "#C084FC" : "#00D4FF",
                    textShadow: `0 0 10px ${mi === 0 ? "rgba(155,77,255,0.35)" : "rgba(0,212,255,0.35)"}`,
                  }}>
                    {m.prefix ?? ""}{m.value}{m.suffix}
                  </div>
                  <div style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile metrics row */}
        {isMobile && (
          <div style={{ display: "flex", gap: 10, width: "100%" }}>
            {METRICS.slice(0, 3).map((m, mi) => (
              <div key={mi} style={{
                flex: 1, padding: "12px 8px", borderRadius: 12, textAlign: "center",
                background: "rgba(13,18,40,0.85)", border: "1px solid rgba(155,77,255,0.18)",
                backdropFilter: "blur(12px)",
              }}>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: mi === 0 ? "#C084FC" : "#00D4FF", fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
                  {m.prefix ?? ""}{m.value}{m.suffix}
                </div>
                <div style={{ fontSize: 8, fontFamily: "monospace", color: "rgba(255,255,255,0.38)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 3 }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

   
      </div>
    </SceneWrapper>
  );
}

