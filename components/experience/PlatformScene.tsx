"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronRight, Lock, Activity, ShieldCheck, Globe2, Zap, Brain, Layers3, BarChart3 } from "lucide-react";
import { SceneWrapper } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { SERVICES } from "./data";
import { useIsMobile, useIsShortViewport, useWindowSize } from "./hooks";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";

const AUTO_CYCLE_MS = 9000;

const ACCENT_COLORS = ["#00D4FF", "#C084FC", "#00D4FF", "#C084FC", "#00D4FF"];

const CAPABILITY_SUBLABELS = [
  "AI-powered risk assessment",
  "Detect threats in milliseconds",
  "Enterprise-ready deployment",
  "Security, compliance & scale",
];

const BOTTOM_FEATURES = [
  { icon: ShieldCheck, title: "Enterprise Grade", sub: "Bank-level security\n& compliance" },
  { icon: Zap, title: "Real-time Results", sub: "Actionable insights\nin real-time" },
  { icon: Brain, title: "AI-Powered", sub: "Advanced models\nbuilt for scale" },
  { icon: Layers3, title: "Seamless Integration", sub: "Connect with your\nexisting stack" },
  { icon: BarChart3, title: "Proven ROI", sub: "Measurable impact\nyou can trust" },
  { icon: Globe2, title: "Global Ready", sub: "Built to scale across\nregions" },
];

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
  const isShort = useIsShortViewport();
  const { width } = useWindowSize();
  const compact = width < 1400;
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
        alignItems: "center", justifyContent: "flex-start",
        paddingTop: `calc(${isMobile ? 76 : 100}px + var(--announcement-offset, 0px))`,
        paddingBottom: isMobile ? 14 : 20,
        paddingLeft: isMobile ? 16 : compact ? 60 : "calc(60px + 224px)",
        paddingRight: isMobile ? 16 : compact ? 60 : "calc(60px + 224px)",
        overflowY: "hidden",
      }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 16 : 12 }}>
          <div style={{ marginBottom: isMobile ? 8 : 10 }}>
            <Badge variant="cyan" size="md" dot>Technical Core</Badge>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? 10 : 20, flexWrap: "wrap" }}>
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 1 160px" }}>
                <div style={{ flex: 1, height: 1.5, background: "linear-gradient(to right, transparent, rgba(0,212,255,0.7))" }} />
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4FF", boxShadow: "0 0 10px #00D4FF" }} />
              </div>
            )}
            <h2 style={{
              fontSize: isMobile ? "clamp(1.3rem,6vw,1.7rem)" : "clamp(1.6rem,2.8vw,2.3rem)",
              fontFamily: "'Inter', sans-serif",
              color: "#F8FAFC", fontWeight: 800, lineHeight: 1.08, margin: 0, letterSpacing: "-0.02em",
            }}>
              Production-grade AI{" "}
              <span style={{
                background: "linear-gradient(135deg,#00D4FF,#9B4DFF)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>for every vertical</span>
            </h2>
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 1 160px" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#9B4DFF", boxShadow: "0 0 10px #9B4DFF" }} />
                <div style={{ flex: 1, height: 1.5, background: "linear-gradient(to left, transparent, rgba(155,77,255,0.7))" }} />
              </div>
            )}
          </div>
          {/* <p style={{
            fontSize: isMobile ? 12 : 12.5, color: "rgba(203,213,225,0.6)",
            fontFamily: "sans-serif", fontWeight: 300, margin: 0, marginTop: 6,
          }}>
            Built to perform. Designed to scale. Trusted to deliver.
          </p> */}
        </div>

        {/* ── Main card ── */}
        <div style={{
          width: "100%", maxWidth: 980,
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
            display: "flex", gap: 8,
            padding: isMobile ? "8px" : "8px 12px",
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
                    minHeight: 38,
                    padding: isMobile ? "8px 12px" : "8px 20px",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    background: isActive ? `${col}16` : "transparent",
                    border: `1.5px solid ${isActive ? col : "transparent"}`,
                    borderRadius: 12,
                    cursor: "pointer", transition: "all 0.3s ease",
                    position: "relative",
                    boxShadow: isActive ? `0 0 18px ${col}33` : "none",
                  }}>
                  <div style={{ color: isActive ? col : "rgba(226,232,240,0.6)", transition: "color 0.3s" }}>
                    <ServiceIcon index={i} size={isMobile ? 16 : 19} />
                  </div>
                  {!isMobile && (
                    <span style={{
                      fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
                      color: isActive ? "#fff" : "rgba(226,232,240,0.65)",
                      fontFamily: "'Inter', sans-serif", transition: "color 0.3s",
                    }}>
                      {s.title.replace("AI in ", "").replace("Custom ", "").replace("Automation & ", "")}
                    </span>
                  )}
                  {isActive && (
                    <div style={{
                      position: "absolute", bottom: -1, left: "50%", transform: "translate(-50%, 50%)",
                      width: 6, height: 6, borderRadius: "50%",
                      background: col, boxShadow: `0 0 8px ${col}`,
                    }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Content area */}
          <div style={{
            display: "flex", flexDirection: isMobile ? "column" : "row",
            gap: 0, minHeight: isMobile ? "auto" : 355,
          }}>
            {/* Left: info */}
            <div style={{ flex: "1 1 0", minWidth: 0, padding: isMobile ? "16px 16px" : "20px 22px" }}>
              {/* Module label */}
              <div style={{ fontSize: 9, fontFamily: "monospace", color: accent, letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.8, marginBottom: 4 }}>
                Module {String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
              </div>
              <div style={{ fontSize: isMobile ? 17 : 20, fontWeight: 800, color: "#fff", fontFamily: "'Inter', sans-serif", lineHeight: 1.2, marginBottom: 8 }}>
                {svc.title}
              </div>

              <p style={{
                fontSize: isMobile ? 12 : 12.5, color: "rgba(232,243,255,0.78)",
                lineHeight: 1.55, marginBottom: 12, fontFamily: "'Inter', sans-serif",
              }}>
                {svc.desc}
              </p>

              {/* Highlighted feature rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                {svc.tags.slice(0, 2).map((tag, ti) => {
                  const Icon = ti === 0 ? Lock : Activity;
                  return (
                    <div key={tag} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "9px 12px", borderRadius: 10,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}>
                      <Icon size={14} strokeWidth={1.75} color={accent} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#F0F4FF", fontFamily: "'Inter', sans-serif" }}>
                        {tag}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div
                onMouseEnter={() => setIsHovering?.(true)}
                onMouseLeave={() => setIsHovering?.(false)}
              >
                <Button href="/services" variant="primary" size="md" iconRight={<ArrowRight size={14} />}>
                  View Service Details
                </Button>
              </div>
            </div>

            {/* Center: decorative isometric graphic — hidden below 1280px to guarantee room for the sidebar */}
            {!isMobile && !compact && (
              <div style={{
                flex: "1 1 0", minWidth: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", width: 200, height: 200, borderRadius: "50%",
                  border: `1px dashed ${accent}33`,
                }} />
                {[0, 1, 2].map((i) => {
                  const ang = i * 120 + 30;
                  const rad = (ang * Math.PI) / 180;
                  return (
                    <div key={i} style={{
                      position: "absolute", left: "50%", top: "50%",
                      width: 6, height: 6, borderRadius: "50%",
                      background: accent, boxShadow: `0 0 8px ${accent}`,
                      transform: `translate(calc(-50% + ${Math.cos(rad) * 100}px), calc(-50% + ${Math.sin(rad) * 100}px))`,
                    }} />
                  );
                })}
                <div style={{
                  width: 118, height: 150, borderRadius: 14, transform: "rotate(-4deg)",
                  background: `linear-gradient(165deg, ${accent}26, rgba(10,14,30,0.95))`,
                  border: `1.5px solid ${accent}88`,
                  boxShadow: `0 0 40px ${accent}40`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
                }}>
                  <svg width="48" height="28" viewBox="0 0 60 34" style={{ overflow: "visible" }}>
                    <polyline points="2,28 14,18 24,24 38,8 50,14 58,4" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <ShieldCheck size={24} strokeWidth={1.75} color={accent} style={{ filter: `drop-shadow(0 0 10px ${accent}aa)` }} />
                </div>
                <div style={{
                  position: "absolute", bottom: "18%", width: 150, height: 28, borderRadius: "50%",
                  background: `radial-gradient(ellipse, ${accent}33, transparent 70%)`,
                  filter: "blur(4px)",
                }} />
              </div>
            )}

            {/* Right: visual stats panel */}
            <div style={{
              width: isMobile ? "100%" : 250, flexShrink: 0,
              padding: isMobile ? "14px 16px" : "12px 20px",
              display: "flex", flexDirection: "column", gap: 4,
              borderTop: isMobile ? "1px solid rgba(255,255,255,0.06)" : "none",
              borderLeft: isMobile ? "none" : "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(226,232,240,0.55)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 2 }}>
                Key Capabilities
              </div>
              {svc.tags.concat(["Production-ready", "Enterprise-grade"]).slice(0, 4).map((cap, ci) => (
                <div key={ci} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "5px 10px", borderRadius: 10,
                  background: ci === 0 ? `${accent}16` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${ci === 0 ? `${accent}45` : "rgba(255,255,255,0.07)"}`,
                  transition: "all 0.3s ease",
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: ci === 0 ? `${accent}22` : "rgba(255,255,255,0.05)",
                    border: `1px solid ${ci === 0 ? `${accent}55` : "rgba(255,255,255,0.1)"}`,
                  }}>
                    {ci === 0
                      ? <Lock size={14} strokeWidth={1.75} color={accent} />
                      : <ShieldCheck size={14} strokeWidth={1.75} color="rgba(226,232,240,0.6)" />}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: ci === 0 ? "#fff" : "rgba(232,243,255,0.75)", fontFamily: "'Inter', sans-serif", lineHeight: 1.3 }}>
                      {cap}
                    </div>
                    <div style={{ fontSize: 9.5, color: "rgba(226,232,240,0.8)", marginTop: 1, lineHeight: 1.25 }}>
                      {CAPABILITY_SUBLABELS[ci]}
                    </div>
                  </div>
                  <ChevronRight size={14} color="rgba(226,232,240,0.4)" style={{ flexShrink: 0 }} />
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
            padding: isMobile ? "10px 16px" : "8px 20px",
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

        {/* ── Bottom feature chips ── */}
        {!isMobile && !isShort && (
          <div style={{
            display: "flex", gap: 8, marginTop: 6, width: "100%", maxWidth: 980,
          }}>
            {BOTTOM_FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} style={{
                  flex: 1, display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 10px",
                  background: "linear-gradient(165deg, rgba(10,16,34,0.68), rgba(4,9,22,0.62))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  backdropFilter: "blur(20px)",
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(0,212,255,0.14)", border: "1px solid rgba(0,212,255,0.4)",
                  }}>
                    <Icon size={13} strokeWidth={1.75} color="#00D4FF" />
                  </div>
                  <div style={{ lineHeight: 1.25, minWidth: 0 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: "#F8FAFC", whiteSpace: "nowrap" }}>{f.title}</div>
                    <div style={{ fontSize: 9.5, color: "rgba(226,232,240,0.85)", whiteSpace: "pre-line" }}>{f.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SceneWrapper>
  );
}

