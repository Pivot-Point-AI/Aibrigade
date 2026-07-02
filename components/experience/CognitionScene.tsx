"use client";
import {
  ShieldCheck, Zap, Brain, Database, TrendingUp, Activity, Settings2, Target, Layers3,
} from "lucide-react";
import { SceneWrapper } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { useIsMobile, useWindowSize } from "./hooks";
import { Badge } from "@/components/ui/Card";

const FEATURES = [
  { title: "Enterprise Grade\nSecurity", icon: ShieldCheck, color: "#00D4FF" },
  { title: "Real-Time\nIntelligence", icon: Zap, color: "#F0B429" },
  { title: "AI Powered\nDecisions", icon: Brain, color: "#9B4DFF" },
  { title: "Scalable\nInfrastructure", icon: Database, color: "#00D4FF" },
];

const HUB_NODES = [
  { label: "Predict", sub: "Anticipate outcomes", icon: TrendingUp },
  { label: "Analyze", sub: "Deep data insights", icon: Activity },
  { label: "Automate", sub: "Intelligent actions", icon: Settings2 },
  { label: "Optimize", sub: "Continuous improvement", icon: Target },
  { label: "Scale", sub: "Enterprise ready", icon: Layers3 },
];
// Pentagon order: top, upper-left, upper-right, lower-left, lower-right
const HUB_ANGLES = [-90, -90 - 144, -90 + 144, -90 - 72, -90 + 72];

const METRICS = [
  { label: "Prediction Accuracy", sub: "Default Prediction Accuracy", value: "94.2%", delta: "↑ 12.4% vs last period", icon: Target, color: "#00D4FF", points: [20, 28, 22, 34, 30, 42, 38, 50] },
  { label: "Readmission Reduction", sub: "Readmission Rate Reduction", value: "28%", delta: "↑ 8.7% vs last period", icon: Activity, color: "#F0B429", points: [38, 30, 36, 26, 32, 20, 26, 14] },
  { label: "Fraud Detection Rate", sub: "Real-Time Fraud Detection", value: "97.8%", delta: "↑ 15.3% vs last period", icon: ShieldCheck, color: "#2DD4BF", points: [18, 26, 20, 32, 28, 40, 36, 48] },
];

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const w = 70, h = 28;
  const pts = points.map((v, i) => [
    (i / (points.length - 1)) * w,
    h - (v / 50) * h,
  ]);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  return (
    <svg width={w} height={h} style={{ flexShrink: 0 }}>
      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CognitionScene({ scene, mouse, data }: { scene: number; mouse: MousePosition; data: SceneData }) {
  const isMobile = useIsMobile();
  const { width } = useWindowSize();
  const compact = width < 1180;
  const sidebarVisible = !isMobile && width >= 1400;

  const fadeIn = scene;

  const R = isMobile
    ? Math.min(140, width * 0.45)
    : compact
      ? Math.min(120, width * 0.3)
      : Math.min(145, width * 0.13);  const RY = R * 0.62;

  return (
    <SceneWrapper opacity={fadeIn}>
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
        <div style={{
          display: "flex",
          flexDirection: compact ? "column" : "row",
          alignItems: "center",
          height: "100%", width: "100%",
          paddingTop: `calc(${isMobile ? 76 : 100}px + var(--announcement-offset, 0px))`,
          paddingBottom: compact ? 20 : 0,
          paddingLeft: isMobile ? 20 : sidebarVisible ? 284 : "clamp(24px, 4vw, 64px)",
          paddingRight: isMobile ? 20 : sidebarVisible ? 284 : "clamp(24px, 4vw, 64px)",
          gap: compact ? 32 : 40,
          overflowY: compact ? "auto" : "hidden",
        }}>
          {/* â”€â”€ Left: headline + feature chips â”€â”€ */}
          <div style={{
            flex: compact ? 1 : "0 0 33%", maxWidth: compact ? "100%" : 460,
            display: "flex", flexDirection: "column",
            alignItems: compact ? "center" : "flex-start",
            textAlign: compact ? "center" : "left",
            order: compact ? -1 : 0,
          }}>
            <div style={{ marginBottom: 16 }}>
              <Badge variant="violet" size={isMobile ? "sm" : "md"} dot>AI That Delivers Real Outcomes</Badge>
            </div>

            <h2 style={{
              fontSize: isMobile ? "clamp(1.9rem,7.5vw,2.3rem)" : "clamp(2.4rem,3.6vw,3.2rem)",
              fontFamily: "'Inter', sans-serif", fontWeight: 900,
              lineHeight: 1.05, margin: 0, marginBottom: 14,
              letterSpacing: "-0.025em", color: "#FFFFFF",
              textShadow: "0 2px 24px rgba(0,212,255,0.15)",
            }}>
              Real impact,{" "}
              <span style={{
                background: "linear-gradient(135deg,#00D4FF,#9B4DFF)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>measurable results</span>
            </h2>

            <p style={{
              fontSize: isMobile ? 14.5 : 13.5, color: "rgba(203,213,225,0.85)",
              fontFamily: "sans-serif", fontWeight: 300, lineHeight: 1.6,
              margin: 0, marginBottom: isMobile ? 22 : 26,
            }}>
              Not pilots. Production AI delivering measurable ROI across regulated industries.
            </p>

            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
              width: "100%", maxWidth: isMobile ? 360 : "none",
            }}>
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.16)",
                    borderRadius: 16, padding: "14px 14px",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 11, marginBottom: 10,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: `${f.color}2a`, border: `1px solid ${f.color}88`,
                    }}>
                      <Icon size={17} strokeWidth={1.75} color={f.color} />
                    </div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.3, whiteSpace: "pre-line" }}>
                      {f.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* â”€â”€ Center: orbit hub â”€â”€ */}
          <div style={{
            position: "relative", flex: compact ? "0 0 auto" : 1, height: compact ? 280 : "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            minWidth: compact ? "auto" : 360,
            width: compact ? "100%" : "auto",
          }}>
            {/* Ellipse orbit rings */}
            <div style={{ position: "absolute", left: "50%", top: "50%", pointerEvents: "none" }}>
              <div style={{
                position: "absolute", width: R * 2.5, height: RY * 2.5, borderRadius: "50%",
                border: "1px solid rgba(148,163,184,0.14)",
                transform: "translate(-50%,-50%)",
              }} />
              <div style={{
                position: "absolute", width: R * 2.5, height: RY * 2.5, borderRadius: "50%",
                border: "1px solid rgba(148,163,184,0.1)",
                transform: "translate(-50%,-50%) rotate(90deg)",
              }} />
              <div style={{
                position: "absolute", width: R * 1.5, height: RY * 1.5, borderRadius: "50%",
                border: "1px dashed rgba(148,163,184,0.16)",
                transform: "translate(-50%,-50%)",
              }} />
            </div>

            {/* Connector lines + nodes */}
            {HUB_NODES.map((node, i) => {
              const rad = (HUB_ANGLES[i] * Math.PI) / 180;
              const x = Math.cos(rad) * R;
              const y = Math.sin(rad) * RY;
              const dist = Math.sqrt(x * x + y * y);
              const lineAngle = (Math.atan2(y, x) * 180) / Math.PI;
              const Icon = node.icon;
              return (
                <div key={node.label}>
                  <div style={{
                    position: "absolute", left: "50%", top: "50%",
                    width: dist, height: 1,
                    background: "linear-gradient(to right, rgba(148,163,184,0.4), rgba(148,163,184,0.05))",
                    transformOrigin: "0 50%",
                    transform: `translateY(-50%) rotate(${lineAngle}deg)`,
                    pointerEvents: "none",
                  }} />
                  <div style={{
                    position: "absolute", left: "50%", top: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    zIndex: 20,
                  }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: isMobile ? "6px 10px" : "7px 12px",
                      background: "rgba(13,18,36,0.94)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
                      whiteSpace: "nowrap",
                    }}>
                      <div style={{
                        width: isMobile ? 22 : 24, height: isMobile ? 22 : 24, borderRadius: 6,
                        flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)",
                      }}>
                        <Icon size={isMobile ? 11 : 12} strokeWidth={1.75} color="rgba(226,232,240,0.85)" />
                      </div>
                      <div>
                        <div style={{ fontSize: isMobile ? 9 : 10.5, fontWeight: 600, color: "rgba(255,255,255,0.88)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {node.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Core orb */}
            <div style={{
              position: "relative", width: isMobile ? 70 : 100, height: isMobile ? 70 : 100,
              borderRadius: "50%",
              background: "radial-gradient(circle at 38% 35%, rgba(100,116,150,0.28), rgba(10,14,30,0.97))",
              border: "1px solid rgba(255,255,255,0.16)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 0 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 30,
              transform: `perspective(900px) rotateY(${mouse.nx * 4}deg) rotateX(${-mouse.ny * 4}deg)`,
            }}>
              <Brain
                size={isMobile ? 28 : 40}
                strokeWidth={1.5}
                style={{ color: "rgba(226,232,240,0.92)", filter: "drop-shadow(0 0 8px rgba(0,212,255,0.35))" }}
              />
            </div>

            {/* Pulse rings */}
            <div style={{
              position: "absolute", width: isMobile ? 90 : 130, height: isMobile ? 90 : 130,
              borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)",
              animation: "genesisPulse1 2.4s ease-out infinite", pointerEvents: "none",
            }} />
          </div>

          {/* â”€â”€ Right: metric cards â”€â”€ */}
          {!compact && (
            <div style={{
              flex: "0 0 260px",
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              {METRICS.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.label} style={{
                    background: "linear-gradient(165deg, rgba(10,22,14,0.9), rgba(10,14,30,0.85))",
                    border: "1px solid rgba(255,255,255,0.16)",
                    borderRadius: 18, padding: "16px 18px",
                    backdropFilter: "blur(24px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: `${m.color}2a`, border: `1px solid ${m.color}99`,
                        }}>
                          <Icon size={16} strokeWidth={1.75} color={m.color} />
                        </div>
                        <span style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: "rgba(203,213,225,0.96)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                          {m.label}
                        </span>
                      </div>
                      <Sparkline points={m.points} color={m.color} />
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: "#FFFFFF", lineHeight: 1, marginBottom: 6 }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(203,213,225,0.85)", fontWeight: 500 }}>
                      {m.sub} <span style={{ color: "#2DD4BF", fontWeight: 700 }}>{m.delta}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* â”€â”€ Trust bar â€” bottom strip (desktop) â”€â”€ */}
        {!compact && (
          <div style={{
            position: "absolute", left: "clamp(12px, 3vw, 28px)", right: "clamp(12px, 3vw, 28px)", bottom: 14,
            zIndex: 40, opacity: scene > 0.3 ? 1 : 0, transition: "opacity 1.4s ease",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
            background: "linear-gradient(165deg, rgba(10,22,14,0.72), rgba(10,14,30,0.66))",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 14, padding: "16px 22px",
            backdropFilter: "blur(24px)",
            boxShadow: "0 10px 36px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>

          </div>
        )}
      </div>
    </SceneWrapper>
  );
}

