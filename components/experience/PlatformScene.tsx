"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { SceneWrapper } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { SERVICES } from "./data";
import { useIsMobile } from "./hooks";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";

const AUTO_CYCLE_MS = 9000;

const ACCENT_COLORS = ["#00D4FF", "#C084FC", "#00D4FF", "#C084FC", "#00D4FF"];

// Icon SVGs per service
const ServiceIcon = ({ index, size = 28 }: { index: number; size?: number }) => {
  const icons = [
    // Fintech
    <svg key="0" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>,
    // Healthcare
    <svg key="1" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>,
    // Custom AI
    <svg key="2" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>,
    // Automation
    <svg key="3" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>,
    // Retail
    <svg key="4" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>,
  ];
  return icons[index] ?? icons[0];
};

export function PlatformScene({ scene, mouse, data, setIsHovering, initialService = 0 }: {
  scene: number;
  mouse: MousePosition;
  data: SceneData;
  setIsHovering?: (hover: boolean) => void;
  initialService?: number;
}) {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(initialService);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(p => (p + 1) % SERVICES.length), AUTO_CYCLE_MS);
  };

  useEffect(() => {
    if (scene > 0.5) { setActive(initialService); startTimer(); }
    else if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [scene > 0.5, initialService]);

  const svc = SERVICES[active];
  const accent = ACCENT_COLORS[active];

  return (
    <SceneWrapper opacity={scene}>
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: isMobile ? "80px 16px 20px" : "0 60px",
      }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 24 : 36 }}>
          <div style={{ marginBottom: isMobile ? 10 : 14 }}>
            <Badge variant="cyan" size="md" dot>Technical Core</Badge>
          </div>
          <h2 style={{
            fontSize: isMobile ? "clamp(1.5rem,6.5vw,1.9rem)" : "clamp(2rem,3.8vw,2.9rem)",
            fontFamily: "'Inter', sans-serif",
            color: "#F8FAFC", fontWeight: 800, lineHeight: 1.08, margin: 0, letterSpacing: "-0.02em",
          }}>
            Production-grade AI{" "}
            <span style={{
              background: "linear-gradient(135deg,#00D4FF,#9B4DFF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>for every vertical</span>
          </h2>
        </div>

        {/* ── Main card ── */}
        <div style={{
          width: "100%", maxWidth: 900,
          borderRadius: 22,
          background: "linear-gradient(165deg, rgba(15,21,44,0.92), rgba(11,16,34,0.88))",
          border: `1px solid ${accent}3d`,
          backdropFilter: "blur(28px)",
          boxShadow: `0 28px 60px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 36px ${accent}10`,
          overflow: "hidden",
          transition: "border-color 0.5s ease, box-shadow 0.5s ease",
        }}>
          {/* Top tab bar */}
          <div style={{
            display: "flex",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            overflowX: "auto",
          }}>
            {SERVICES.map((s, i) => {
              const isActive = i === active;
              const col = ACCENT_COLORS[i];
              return (
                <button key={i} onClick={() => { setActive(i); startTimer(); }}
                  style={{
                    flex: isMobile ? "0 0 auto" : 1,
                    minHeight: 40,
                    padding: isMobile ? "12px 14px" : "14px 12px",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    background: isActive ? `${col}12` : "transparent",
                    border: "none", borderBottom: `2px solid ${isActive ? col : "transparent"}`,
                    cursor: "pointer", transition: "all 0.3s ease",
                    position: "relative",
                  }}>
                  <div style={{ color: isActive ? col : "rgba(255,255,255,0.35)", transition: "color 0.3s" }}>
                    <ServiceIcon index={i} size={isMobile ? 16 : 18} />
                  </div>
                  {!isMobile && (
                    <span style={{
                      fontSize: 10, fontWeight: 600, whiteSpace: "nowrap",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.38)",
                      fontFamily: "'Inter', sans-serif", transition: "color 0.3s",
                    }}>
                      {s.title.replace("AI in ", "").replace("Custom ", "").replace("Automation & ", "")}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Content area */}
          <div style={{
            display: "flex", flexDirection: isMobile ? "column" : "row",
            gap: 0, minHeight: isMobile ? "auto" : 320,
          }}>
            {/* Left: info */}
            <div style={{ flex: 1, padding: isMobile ? "20px 18px" : "32px 36px", borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.06)" }}>
              {/* Module label */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${accent}18`, border: `1px solid ${accent}40`,
                  color: accent, flexShrink: 0,
                }}>
                  <ServiceIcon index={active} size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 9, fontFamily: "monospace", color: accent, letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.8 }}>
                    Module {String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 700, color: "#fff", fontFamily: "'Inter', sans-serif", lineHeight: 1.2 }}>
                    {svc.title}
                  </div>
                </div>
              </div>

              <p style={{
                fontSize: isMobile ? 12 : 13, color: "rgba(232,243,255,0.78)",
                lineHeight: 1.7, marginBottom: 20, fontFamily: "'Inter', sans-serif",
              }}>
                {svc.desc}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                {svc.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 9, fontFamily: "monospace", padding: "4px 10px",
                    borderRadius: 4, letterSpacing: "0.12em", textTransform: "uppercase",
                    background: `${accent}12`, border: `1px solid ${accent}30`, color: accent,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div
                onMouseEnter={() => setIsHovering?.(true)}
                onMouseLeave={() => setIsHovering?.(false)}
              >
                <Button href="/services" variant="outline" size="sm" iconRight={<ArrowRight size={14} />}>
                  View Service
                </Button>
              </div>
            </div>

            {/* Right: visual stats panel */}
            <div style={{
              width: isMobile ? "100%" : 260, flexShrink: 0,
              padding: isMobile ? "16px 18px" : "32px 24px",
              display: "flex", flexDirection: "column", gap: 14,
              borderTop: isMobile ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <div style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(255,255,255,0.35)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 4 }}>
                Key Capabilities
              </div>
              {svc.tags.concat(["Production-ready", "Enterprise-grade"]).slice(0, 4).map((cap, ci) => (
                <div key={ci} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", borderRadius: 10,
                  background: ci === 0 ? `${accent}12` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${ci === 0 ? `${accent}30` : "rgba(255,255,255,0.07)"}`,
                  transition: "all 0.3s ease",
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                    background: ci === 0 ? accent : "rgba(255,255,255,0.2)",
                    boxShadow: ci === 0 ? `0 0 8px ${accent}` : "none",
                  }} />
                  <span style={{ fontSize: 11, color: ci === 0 ? "#fff" : "rgba(232,243,255,0.65)", fontFamily: "'Inter', sans-serif" }}>
                    {cap}
                  </span>
                </div>
              ))}

              {/* Auto-progress bar */}
              <div style={{ marginTop: "auto" }}>
                <div style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 8 }}>
                  AUTO-CYCLING
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {SERVICES.map((_, i) => (
                    <div key={i} style={{
                      flex: 1, height: 3, borderRadius: 2,
                      background: i === active ? accent : "rgba(255,255,255,0.1)",
                      boxShadow: i === active ? `0 0 8px ${accent}88` : "none",
                      transition: "all 0.4s ease",
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom navigation */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: isMobile ? "12px 18px" : "12px 24px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            <button onClick={() => { setActive(p => Math.max(0, p - 1)); startTimer(); }} style={{
              background: "none", border: "none", cursor: active === 0 ? "not-allowed" : "pointer",
              color: active === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.55)",
              fontSize: 10, fontFamily: "monospace", letterSpacing: "0.12em", transition: "color 0.2s",
              minHeight: 40, padding: "8px 4px", display: "flex", alignItems: "center",
            }}>← PREV</button>

            <span style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(255,255,255,0.22)", letterSpacing: "0.2em" }}>
              {active + 1} / {SERVICES.length}
            </span>

            <button onClick={() => { setActive(p => Math.min(SERVICES.length - 1, p + 1)); startTimer(); }} style={{
              background: "none", border: "none",
              cursor: active === SERVICES.length - 1 ? "not-allowed" : "pointer",
              color: active === SERVICES.length - 1 ? "rgba(255,255,255,0.18)" : accent,
              fontSize: 10, fontFamily: "monospace", letterSpacing: "0.12em", transition: "color 0.2s",
              minHeight: 40, padding: "8px 4px", display: "flex", alignItems: "center",
            }}>NEXT →</button>
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
}
