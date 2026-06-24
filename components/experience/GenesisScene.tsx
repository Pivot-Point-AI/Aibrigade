"use client";
import { useState, useEffect } from "react";
import {
  Box, Layers, TrendingUp, Globe, Shield,
  Bot, ShoppingCart, Landmark, HeartPulse, Code2,
} from "lucide-react";
import { SceneWrapper } from "./SceneComponents";
import { SceneData } from "./types";
import { SERVICES } from "./data";
import { useIsMobile, useWindowSize } from "./hooks";
import { SITE_STATS } from "@/data/siteStats";

const PILL_ICON_MAP: Record<string, React.ElementType<{ size?: number; strokeWidth?: number }>> = {
  Bot, ShoppingCart, Landmark, HeartPulse, Code2,
};

const INDUSTRIES = ["Fintech", "Healthcare", "Retail", "Manufacturing", "Insurance"];

export function GenesisScene({ scene, onSelectModule, data, setIsHovering }: {
  scene: number;
  onSelectModule: (idx: number) => void;
  data: SceneData;
  setIsHovering?: (hover: boolean) => void;
}) {
  const [tick, setTick] = useState(0);
  const [industryIdx, setIndustryIdx] = useState(0);
  const [industryVisible, setIndustryVisible] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndustryVisible(false);
      setTimeout(() => {
        setIndustryIdx((i) => (i + 1) % INDUSTRIES.length);
        setIndustryVisible(true);
      }, 350);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const opacity = scene;
  const { width } = useWindowSize();

  // R scales with viewport width — wide enough to separate labels, never clips
  const R = isMobile
    ? Math.min(95, width * 0.24)
    : Math.min(150, width * 0.10);

  // Orbital center sits in the lower 65-70% of screen
  const pct = isMobile ? "68%" : "70%";

  // Title shrinks ONLY on very narrow viewports, stays big everywhere else
  const titleSize = isMobile
    ? "clamp(2.8rem,12vw,5rem)"
    : "clamp(3.5rem,6.5vw,8rem)";

  // Subtitle font
  const subSize = isMobile ? 13 : width < 1100 ? 16 : 19;

  /* Decorative rings */
  const rings: [number, number, boolean, boolean, number][] = [
    [R * 1.42, 300, false, false, 0.11],
    [R * 1.10, 230, true,  true,  0.22],
    [R * 0.78, 160, false, false, 0.33],
    [R * 0.48, 110, true,  true,  0.46],
  ];

  const stats = [
    { value: SITE_STATS.enterpriseClients, label: "Systems",   icon: Box,        color: "#00D4FF" },
    { value: SITE_STATS.valueDelivered,    label: "Delivered", icon: Layers,     color: "#C084FC" },
    { value: SITE_STATS.avgRoiLift,        label: "ROI",       icon: TrendingUp, color: "#00D4FF" },
    { value: "Global",                      label: "Reach",    icon: Globe,      color: "#00D4FF" },
  ];

  return (
    <SceneWrapper opacity={opacity}>
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>

        {/* ── Hero text (compact so orbital has room) ── */}
        <div style={{
          position: "absolute",
          top: isMobile ? 72 : 80,
          left: 0, right: 0, zIndex: 20,
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", padding: "0 12px", pointerEvents: "none",
        }}>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: isMobile ? "5px 14px" : "6px 18px",
            background: "rgba(0,212,255,0.06)",
            border: "1px solid rgba(0,212,255,0.18)",
            borderRadius: 100, marginBottom: isMobile ? 12 : 14,
            backdropFilter: "blur(12px)",
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "#00D4FF", boxShadow: "0 0 8px #00D4FF",
              display: "inline-block",
              animation: "pulse-core 2s ease-in-out infinite",
            }} />
            <span style={{
              fontSize: "clamp(8px, 2vw, 10px)", fontFamily: "monospace", fontWeight: 600,
              color: "rgba(0,212,255,0.85)", letterSpacing: "0.2em", textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              Enterprise AI Systems Company
            </span>
          </div>

          {/* Brand name */}
          <h1 style={{
            fontSize: titleSize,
            fontFamily: "Georgia, serif", fontWeight: 700,
            lineHeight: 1.1, margin: 0, marginBottom: isMobile ? 10 : 12,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg,#ffffff 15%,#7EEEFF 45%,#C084FC 80%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", animation: "gradient-shift 6s linear infinite",
          }}>
            AI Brigade
          </h1>

          {/* Subtitle — wraps on small screens */}
          <div style={{
            display: "flex", alignItems: "baseline", justifyContent: "center",
            gap: 5, flexWrap: "wrap",
            marginBottom: isMobile ? 10 : 12,
            maxWidth: isMobile ? "90vw" : "70vw",
            lineHeight: 1.5,
          }}>
            <span style={{ fontSize: subSize, color: "rgba(203,213,225,0.75)", fontFamily: "sans-serif", fontWeight: 300 }}>
              Enterprise AI for
            </span>
            <span style={{
              fontSize: subSize, fontFamily: "sans-serif", fontWeight: 600,
              opacity: industryVisible ? 1 : 0,
              transform: industryVisible ? "translateY(0)" : "translateY(-5px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              background: "linear-gradient(135deg,#00D4FF,#9B4DFF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {INDUSTRIES[industryIdx]}
            </span>
            <span style={{ fontSize: subSize - 2, color: "rgba(203,213,225,0.3)", fontFamily: "sans-serif" }}>·</span>
            <span style={{ fontSize: subSize - 2, color: "rgba(203,213,225,0.65)", fontFamily: "sans-serif", fontWeight: 300, whiteSpace: "nowrap" }}>
              Discovery to deployment
            </span>
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            {INDUSTRIES.map((_, i) => (
              <div key={i} style={{
                width: i === industryIdx ? 22 : 4, height: 2, borderRadius: 2,
                background: i === industryIdx ? "#00D4FF" : "rgba(0,212,255,0.15)",
                transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: i === industryIdx ? "0 0 8px rgba(0,212,255,0.7)" : "none",
              }} />
            ))}
          </div>
        </div>

        {/* ── Decorative rings ── */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
          <div style={{
            position: "absolute", left: "50%", top: pct,
            transform: "translate(-50%,-50%)",
          }}>
            {rings.map(([r, dur, rev, dashed, op], i) => (
              <div key={i} style={{
                position: "absolute", width: r * 2, height: r * 2,
                borderRadius: "50%",
                border: `1px ${dashed ? "dashed" : "solid"} rgba(0,212,255,${op})`,
                animation: `${rev ? "orbit-ccw" : "orbit-cw"} ${dur}s linear infinite`,
                willChange: "transform",
              }} />
            ))}
            {/* Ambient glow */}
            <div style={{
              position: "absolute",
              width: isMobile ? 240 : 380, height: isMobile ? 240 : 380,
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(0,212,255,0.07) 0%,rgba(155,77,255,0.04) 45%,transparent 70%)",
              transform: "translate(-50%,-50%)",
            }} />
          </div>
        </div>

        {/* ── Core orb + revolving labels ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 100 }}>
          <div
            onClick={(e) => { e.stopPropagation(); onSelectModule(0); }}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            style={{
              position: "absolute", left: "50%", top: pct,
              transform: "translate(-50%,-50%)",
              width: isMobile ? 54 : 110, height: isMobile ? 54 : 110,
              borderRadius: "50%",
              background: "radial-gradient(circle at 38% 35%,rgba(0,212,255,0.24),rgba(10,14,30,0.96))",
              border: "1.5px solid rgba(0,212,255,0.55)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 0 30px rgba(0,212,255,0.16),inset 0 1px 0 rgba(255,255,255,0.06)",
              cursor: "pointer", pointerEvents: "auto",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Shield
              size={isMobile ? 26 : 48}
              strokeWidth={1.5}
              style={{
                color: "#00D4FF",
                filter: "drop-shadow(0 0 10px rgba(0,212,255,0.7))",
              }}
            />
          </div>

          {/* ── Revolving service labels — full 360° circle ── */}
          {SERVICES.map((s, i) => {
            const angle = (i * 72) + tick * 0.05;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * R;
            const y = Math.sin(rad) * R;
            const isHov = hoveredIdx === i;

            return (
              <div
                key={i}
                onClick={(e) => { e.stopPropagation(); onSelectModule(i); }}
                onMouseEnter={() => { setHoveredIdx(i); setIsHovering?.(true); }}
                onMouseLeave={() => { setHoveredIdx(null); setIsHovering?.(false); }}
                style={{
                  position: "absolute", left: "50%", top: pct,
                  transform: `translate(calc(-50% + ${x}px),calc(-50% + ${y}px)) scale(${isHov ? 1.07 : 1})`,
                  cursor: "pointer", pointerEvents: "auto", zIndex: 200,
                  transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <div style={{
                  display: "flex", alignItems: "center",
                  gap: isMobile ? 8 : 12,
                  padding: isMobile ? "8px 12px" : "10px 18px 10px 12px",
                  minHeight: 40,
                  background: isHov
                    ? "rgba(0,212,255,0.16)"
                    : "rgba(6,12,30,0.92)",
                  border: `1.5px solid rgba(0,212,255,${isHov ? 0.9 : 0.55})`,
                  borderRadius: 10,
                  backdropFilter: "blur(20px)",
                  boxShadow: isHov
                    ? "0 0 16px rgba(0,212,255,0.35),0 4px 16px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.1)"
                    : "0 4px 12px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.05)",
                  transition: "all 0.3s ease",
                }}>
                  <div style={{
                    width: isMobile ? 26 : 32, height: isMobile ? 26 : 32, borderRadius: 8,
                    flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(0,212,255,0.10)",
                    border: "1px solid rgba(0,212,255,0.35)",
                  }}>
                    {(() => {
                      const Icon = PILL_ICON_MAP[s.iconKey] || Bot;
                      return <Icon size={isMobile ? 14 : 17} strokeWidth={1.75} color="#00D4FF" />;
                    })()}
                  </div>
                  <span style={{
                    fontSize: isMobile ? 9 : 12,
                    fontFamily: "sans-serif",
                    letterSpacing: "0.04em",
                    color: "#e8f8ff",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    lineHeight: 1.35,
                    whiteSpace: "normal",
                    maxWidth: isMobile ? 84 : 110,
                  }}>
                    {s.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Stats — left side vertical strip (desktop) / bottom bar (mobile) ── */}
        {!isMobile ? (
          <div style={{
            position: "absolute", left: 32, top: "50%", transform: "translateY(-50%)",
            zIndex: 30, pointerEvents: "none",
            opacity: scene > 0.2 ? 1 : 0, transition: "opacity 1.4s ease",
            display: "flex", flexDirection: "column", gap: 0,
            background: "rgba(4,9,22,0.6)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12, overflow: "hidden",
            backdropFilter: "blur(24px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "16px 22px",
                  borderBottom: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  position: "relative",
                }}>
                  {/* Left accent line */}
                  <div style={{
                    position: "absolute", left: 0, top: "20%", bottom: "20%",
                    width: 2, borderRadius: 1,
                    background: "linear-gradient(to bottom, #00D4FF, #9B4DFF)",
                    opacity: 0.7,
                  }} />
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${stat.color}1a`,
                    border: `1px solid ${stat.color}55`,
                  }}>
                    <Icon size={17} strokeWidth={1.75} color={stat.color} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <span style={{
                      fontSize: 22, fontFamily: "sans-serif", fontWeight: 700,
                      color: "#F8FAFC", lineHeight: 1.15, marginBottom: 3,
                    }}>{stat.value}</span>
                    <span style={{
                      fontSize: 9, fontFamily: "monospace",
                      color: "rgba(148,163,184,0.55)", letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}>{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)",
            zIndex: 30, pointerEvents: "none",
            opacity: scene > 0.2 ? 1 : 0, transition: "opacity 1.4s ease",
            width: "calc(100% - 32px)",
          }}>
            <div style={{
              display: "flex", alignItems: "stretch", justifyContent: "space-around",
              background: "rgba(4,9,22,0.65)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10, overflow: "hidden",
              backdropFilter: "blur(24px)",
              boxShadow: "0 6px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "9px 14px", flex: 1,
                  borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}>
                  <span style={{
                    fontSize: 17, fontFamily: "monospace", fontWeight: 700,
                    background: "linear-gradient(135deg,#7EEEFF,#C084FC)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", lineHeight: 1, marginBottom: 4,
                  }}>{stat.value}</span>
                  <span style={{
                    fontSize: 7, fontFamily: "monospace",
                    color: "rgba(148,163,184,0.45)", letterSpacing: "0.16em", textTransform: "uppercase",
                  }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── "41 Years Straight" badge — bottom left ── */}
        {!isMobile && (
          <div style={{
            position: "absolute", left: 32, bottom: 28, zIndex: 30,
            display: "flex", alignItems: "center", gap: 12,
            opacity: scene > 0.2 ? 1 : 0, transition: "opacity 1.4s ease",
            pointerEvents: "none",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(0,212,255,0.35)",
              background: "rgba(4,9,22,0.6)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 24px rgba(0,212,255,0.15)",
            }}>
              <span style={{
                fontSize: 22, fontFamily: "sans-serif", fontWeight: 700,
                background: "linear-gradient(135deg,#7EEEFF,#C084FC)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>41</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
              <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.18em", color: "rgba(148,163,184,0.55)", textTransform: "uppercase" }}>Years</span>
              <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.18em", color: "rgba(148,163,184,0.55)", textTransform: "uppercase" }}>Of Experience</span>
            </div>
          </div>
        )}

      </div>
    </SceneWrapper>
  );
}
