"use client";
import { useState, useEffect } from "react";
import {
  Box, Layers, TrendingUp, Globe, Shield, Award, ChevronRight,
  Bot, ShoppingCart, Landmark, HeartPulse, Code2,
} from "lucide-react";
import { SceneWrapper } from "./SceneComponents";
import { SceneData } from "./types";
import { SERVICES } from "./data";
import { useWindowSize, useIsMobile } from "./hooks";
import { SITE_STATS } from "@/data/siteStats";
import { Badge } from "@/components/ui/Card";

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
  const isMobile = useIsMobile();
  const { width } = useWindowSize();

  // Below this width the floating side panels (stats, insights, trust bar) would
  // collide with the hub — fall back to the stacked/compact layout instead.
  const compact = width < 1180;

  // R scales with viewport width — wide enough to separate labels, never clips
  const R = isMobile
    ? Math.min(100, width * 0.25)
    : compact
      ? Math.min(120, width * 0.3)
      : Math.min(195, width * 0.13);

  // Orbital center — vertically centered under the headline, not pushed to the bottom.
  // Shifted down by the announcement bar's height too, so the hub keeps its gap
  // below the headline instead of drifting up underneath it when the bar shows.
  const pct = `calc(${isMobile ? "52%" : compact ? "64%" : "60%"} + var(--announcement-offset, 0px) / 2)`;

  // Headline size — matches reference hero proportions (compact, leaves room for the hub)
  const titleSize = isMobile
    ? "clamp(2.8rem,10vw,3.5rem)"
    : compact
      ? "clamp(1.8rem,8vw,2.6rem)"
      : "clamp(2.2rem,3.6vw,3.4rem)";

  // Subtitle font
  const subSize = compact ? 13.5 : width < 1100 ? 16.5 : 19.5;

  /* Decorative rings */
  const rings: [number, number, boolean, boolean, number][] = [
    [R * 1.42, 300, false, false, 0.11],
    [R * 1.10, 230, true,  true,  0.22],
    [R * 0.78, 160, false, false, 0.33],
    [R * 0.48, 110, true,  true,  0.46],
  ];

  const stats = [
    { value: SITE_STATS.enterpriseClients, label: "Systems",  sublabel: "Deployed",      icon: Box,        color: "#00D4FF" },
    { value: SITE_STATS.valueDelivered,    label: "Value",    sublabel: "Delivered",      icon: Layers,     color: "#9B4DFF" },
    { value: SITE_STATS.avgRoiLift,        label: "Average",  sublabel: "ROI",            icon: TrendingUp, color: "#2DD4BF" },
    { value: "Global",                      label: "Presence",   sublabel: "Worldwide Operations", icon: Globe,      color: "#00D4FF" },
    { value: "10+",                         label: "Years",    sublabel: "Of Experience",  icon: Award,      color: "#9B4DFF" },
  ];

  // Pentagon order matching the reference layout; slowly revolves via `tick`
  const HUB_ORDER = [
    "AI in Healthcare", "Custom AI Development", "Automation & Integrations",
    "AI in Retail", "AI in Fintech",
  ];
  const hubAngle = (title: string) => {
    const idx = HUB_ORDER.indexOf(title);
    return -90 + (idx >= 0 ? idx : 0) * 72 + tick * 0.05;
  };

  const RY = R * 0.83; // flattens the orbit into an ellipse, matching the reference layout

  return (
    <SceneWrapper opacity={opacity}>
      <style>{`
        @keyframes genesisPulse1 { 0% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; } 100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; } }
        @keyframes genesisPulse2 { 0% { transform: translate(-50%,-50%) scale(1); opacity: 0.4; } 100% { transform: translate(-50%,-50%) scale(1.7); opacity: 0; } }
      `}</style>
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>

        {/* ── Hero text (compact so orbital has room) ── */}
        <div style={{
          position: "absolute",
          top: `calc(${isMobile ? 78 : compact ? 88 : 100}px + var(--announcement-offset, 0px))`,
          left: 0, right: 0, zIndex: 20,
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", padding: "0 12px", pointerEvents: "none",
        }}>
          {/* Eyebrow */}
          <div style={{ marginBottom: isMobile ? 5 : compact ? 12 : 14 }}>
            <Badge variant="cyan" size="sm" dot>
              {isMobile ? "AI Development Brigade" : "Your AI Product Development Brigade"}
            </Badge>
          </div>

          {/* Headline — big, matches reference hero */}
          <h1 style={{
            display: "flex",
            alignItems: isMobile ? "center" : "baseline",
            justifyContent: "center",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 2 : compact ? 8 : 14,
            flexWrap: isMobile ? "nowrap" : "wrap",
            marginBottom: isMobile ? 8 : compact ? 10 : 14,
            maxWidth: compact ? "92vw" : "80vw",
            lineHeight: 1.05,
          }}>
            <span style={{ fontSize: titleSize, color: "#F8FAFC", fontFamily: "sans-serif", fontWeight: 900, letterSpacing: "-0.02em" }}>
              Enterprise AI for
            </span>
            <span style={{
              fontSize: titleSize, fontFamily: "sans-serif", fontWeight: 900, letterSpacing: "-0.02em",
              opacity: industryVisible ? 1 : 0,
              transform: industryVisible ? "translateY(0)" : "translateY(-5px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              background: "linear-gradient(135deg,#00D4FF,#9B4DFF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {INDUSTRIES[industryIdx]}
            </span>
          </h1>

          {/* Subtitle — shown on mobile */}
          {isMobile && (
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: "rgba(203,213,225,0.65)", fontFamily: "sans-serif", fontWeight: 300, lineHeight: 1.5 }}>
                Build smarter. Automate faster.<br />Scale with AI.
              </span>
            </div>
          )}

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
              width: compact ? 240 : 380, height: compact ? 240 : 380,
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
              width: isMobile ? 72 : compact ? 72 : 150, height: isMobile ? 72 : compact ? 72 : 150,
              borderRadius: "50%",
              background: "radial-gradient(circle at 38% 35%,rgba(0,212,255,0.28),rgba(10,14,30,0.96))",
              border: "1.5px solid rgba(0,212,255,0.6)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 0 40px rgba(0,212,255,0.22),0 0 80px rgba(155,77,255,0.08),inset 0 1px 0 rgba(255,255,255,0.08)",
              cursor: "pointer", pointerEvents: "auto",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {/* Pulse rings */}
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              width: isMobile ? 52 : compact ? 72 : 150, height: isMobile ? 52 : compact ? 72 : 150,
              borderRadius: "50%", border: "1.5px solid rgba(0,212,255,0.5)",
              animation: "genesisPulse1 2.4s ease-out infinite",
            }} />
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              width: isMobile ? 72 : compact ? 72 : 150, height: isMobile ? 72 : compact ? 72 : 150,
              borderRadius: "50%", border: "1px solid rgba(155,77,255,0.4)",
              animation: "genesisPulse2 2.4s ease-out infinite 0.8s",
            }} />
            <Shield
              size={isMobile ? 30 : compact ? 34 : 64}
              strokeWidth={1.5}
              style={{
                color: "#00D4FF",
                filter: "drop-shadow(0 0 10px rgba(0,212,255,0.7))",
                position: "relative", zIndex: 1,
              }}
            />
          </div>

          {/* ── Connecting lines — core to each tile (revolving ellipse) ── */}
          {SERVICES.map((s, i) => {
            const rad = (hubAngle(s.title) * Math.PI) / 180;
            const lx = Math.cos(rad) * R;
            const ly = Math.sin(rad) * RY;
            const dist = Math.sqrt(lx * lx + ly * ly);
            const lineAngle = (Math.atan2(ly, lx) * 180) / Math.PI;
            return (
              <div key={`line-${i}`} style={{
                position: "absolute", left: "50%", top: pct,
                width: dist, height: 2,
                background: "linear-gradient(to right, rgba(0,212,255,0.95), rgba(155,77,255,0.15))",
                boxShadow: "0 0 8px rgba(0,212,255,0.6)",
                transformOrigin: "0 50%",
                transform: `translateY(-50%) rotate(${lineAngle}deg)`,
                pointerEvents: "none",
              }} />
            );
          })}

          {/* ── Service tiles — revolving elliptical pentagon layout ── */}
          {SERVICES.map((s, i) => {
            const rad = (hubAngle(s.title) * Math.PI) / 180;
            const x = Math.cos(rad) * R;
            const y = Math.sin(rad) * RY;
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
                  padding: isMobile ? "8px 10px" : compact ? "10px 14px" : "13px 22px 12px 15px",
                  minHeight:isMobile?10: 40,
                  background: isHov
                    ? "rgba(0,212,255,0.16)"
                    : "rgba(6,12,30,0.92)",
                  border: `1.5px solid rgba(0,212,255,${isHov ? 0.9 : 0.55})`,
                  borderRadius: 14,
                  backdropFilter: "blur(20px)",
                  boxShadow: isHov
                    ? "0 0 16px rgba(0,212,255,0.35),0 4px 16px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.1)"
                    : "0 4px 12px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.05)",
                  transition: "all 0.3s ease",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 9 : compact ? 8 : 12 }}>
                    <div style={{
                      width: isMobile ? 28 : compact ? 32 : 40, height: isMobile ? 28 : compact ? 32 : 40, borderRadius: 8,
                      flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(0,212,255,0.10)",
                      border: "1px solid rgba(0,212,255,0.35)",
                    }}>
                      {(() => {
                        const Icon = PILL_ICON_MAP[s.iconKey] || Bot;
                        return <Icon size={isMobile ? 12 : compact ? 17 : 21} strokeWidth={1.75} color="#00D4FF" />;
                      })()}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
                      <span style={{
                        fontSize: isMobile ? 7 : compact ? 11 : 14,
                        fontFamily: "sans-serif",
                        letterSpacing: "0.04em",
                        color: "#e8f8ff",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        lineHeight: 1.3,
                        whiteSpace: "normal",
                        maxWidth: isMobile ? 95 : compact ? 100 : 130,
                      }}>
                        {s.title}
                      </span>
              
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Stats — left side vertical strip (desktop) / bottom bar (mobile) ── */}
        {!compact ? (
          <div style={{
            position: "absolute", left: 32, top: "50%", transform: "translateY(-50%)",
            zIndex: 30, pointerEvents: "none",
            opacity: scene > 0.2 ? 1 : 0, transition: "opacity 1.4s ease",
            display: "flex", flexDirection: "column", gap: 14,
          }}>
            {/* Box 1 — primary stats */}
            <div style={{
              display: "flex", flexDirection: "column",
              background: "linear-gradient(165deg, rgba(10,16,34,0.68), rgba(4,9,22,0.62))",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 22, overflow: "hidden",
              backdropFilter: "blur(28px)",
              boxShadow: "0 12px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(0,212,255,0.05)",
            }}>
              {stats.slice(0, 4).map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "17px 24px",
                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.055)" : "none",
                    position: "relative",
                  }}>
                    <div style={{
                      position: "absolute", left: 0, top: "20%", bottom: "20%",
                      width: 2, borderRadius: 1,
                      background: stat.color,
                      opacity: 0.85,
                      boxShadow: `0 0 8px ${stat.color}66`,
                    }} />
                    <div style={{
                      width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: `${stat.color}1f`,
                      border: `1px solid ${stat.color}60`,
                      boxShadow: `0 0 16px ${stat.color}22`,
                    }}>
                      <Icon size={17} strokeWidth={1.75} color={stat.color} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                      <span style={{
                        fontSize: 23, fontFamily: "sans-serif", fontWeight: 800,
                        color: "#F8FAFC", lineHeight: 1.1, marginBottom: 3, letterSpacing: "-0.01em",
                      }}>{stat.value}</span>
                      <span style={{
                        fontSize: 9, fontFamily: "monospace",
                        color: "rgba(226,232,240,0.75)", letterSpacing: "0.16em",
                        textTransform: "uppercase", lineHeight: 1.5,
                      }}>{stat.label}<br />{stat.sublabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Box 2 — years of experience, separate card */}
            {(() => {
              const stat = stats[4];
              const Icon = stat.icon;
              return (
                <div style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "17px 24px",
                  background: "linear-gradient(165deg, rgba(10,16,34,0.68), rgba(4,9,22,0.62))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 22,
                  backdropFilter: "blur(28px)",
                  boxShadow: "0 12px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(155,77,255,0.05)",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${stat.color}1f`,
                    border: `1px solid ${stat.color}60`,
                    boxShadow: `0 0 16px ${stat.color}22`,
                  }}>
                    <Icon size={17} strokeWidth={1.75} color={stat.color} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1 }}>
                    <span style={{
                      fontSize: 23, fontFamily: "sans-serif", fontWeight: 800,
                      color: "#F8FAFC", lineHeight: 1.1, marginBottom: 3, letterSpacing: "-0.01em",
                    }}>{stat.value}</span>
                    <span style={{
                      fontSize: 9, fontFamily: "monospace",
                      color: "rgba(226,232,240,0.75)", letterSpacing: "0.16em",
                      textTransform: "uppercase", lineHeight: 1.5, marginBottom: 8,
                    }}>{stat.label}<br />{stat.sublabel}</span>
                    <div style={{ width: "100%", height: 3, borderRadius: 2, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                      <div style={{ width: "70%", height: "100%", background: `linear-gradient(90deg, ${stat.color}, #00D4FF)`, boxShadow: `0 0 8px ${stat.color}66` }} />
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div style={{
            position: "absolute", bottom: isMobile ? 14 : 8, left: "50%", transform: "translateX(-50%)",
            zIndex: 30, pointerEvents: "none",
            opacity: scene > 0.2 ? 1 : 0, transition: "opacity 1.4s ease",
            width: "calc(100% - 32px)",
          }}>
            <div style={{
              display: "flex", alignItems: "stretch", justifyContent: "space-around",
              background: "rgba(4,9,22,0.65)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, overflow: "hidden",
              backdropFilter: "blur(24px)",
              boxShadow: "0 6px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}>
              {stats.slice(0, 4).map((stat, i) => (
                <div key={i} style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "7px 10px", flex: 1,
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}>
                  <span style={{
                    fontSize: 14, fontFamily: "monospace", fontWeight: 700,
                    background: "linear-gradient(135deg,#2DD4BF,#C084FC)",
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

        {/* ── Insights panel — right side, below the scene nav (desktop) ── */}
        {!compact && (
          <div style={{
            position: "absolute", right: "clamp(14px, 2.5vw, 28px)", bottom: 104, zIndex: 30,
            width: 200, pointerEvents: "none",
            opacity: scene > 0.2 ? 1 : 0, transition: "opacity 1.4s ease",
            background: "linear-gradient(165deg, rgba(10,16,34,0.68), rgba(4,9,22,0.62))",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 22, padding: "16px 20px",
            backdropFilter: "blur(28px)",
            boxShadow: "0 12px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(155,77,255,0.05)",
          }}>
            <div style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(148,163,184,0.6)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Insights
            </div>
            <div style={{ fontSize: 11, color: "rgba(203,213,225,0.5)", marginBottom: 12, marginTop: 2 }}>
              Real-time AI Analytics
            </div>
            {(() => {
              const heights = [40, 55, 35, 60, 48, 70, 58, 78];
              const w = 160, h = 36;
              const pts = heights.map((v, i) => {
                const x = (i / (heights.length - 1)) * w;
                const y = h - (v / 100) * h;
                return [x, y];
              });
              const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
              const areaPath = `${path} L${w},${h} L0,${h} Z`;
              const [lastX, lastY] = pts[pts.length - 1];
              return (
                <svg width={w} height={h} style={{ marginBottom: 12, overflow: "visible" }}>
                  <defs>
                    <linearGradient id="genesisSpark" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#C084FC" />
                      <stop offset="100%" stopColor="#00D4FF" />
                    </linearGradient>
                    <linearGradient id="genesisSparkFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9B4DFF" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#9B4DFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={areaPath} fill="url(#genesisSparkFill)" />
                  <path d={path} fill="none" stroke="url(#genesisSpark)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  {pts.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r={2} fill="#fff" opacity={0.85} />
                  ))}
                  <circle cx={lastX} cy={lastY} r={4} fill="#00D4FF" />
                </svg>
              );
            })()}
            <div style={{
              fontSize: 23, fontFamily: "sans-serif", fontWeight: 800,
              color: "#F8FAFC", lineHeight: 1.1, marginBottom: 3, letterSpacing: "-0.01em",
            }}>
              98.7%
            </div>
            <div style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(148,163,184,0.6)", marginBottom: 10 }}>
              System Accuracy
            </div>
            <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div style={{ width: "98.7%", height: "100%", background: "linear-gradient(90deg, #9B4DFF, #00D4FF)", boxShadow: "0 0 8px rgba(0,212,255,0.5)" }} />
            </div>
          </div>
        )}

        {/* ── Trust bar — bottom strip (desktop), split into two boxes ── */}
        {!compact && (
          <div style={{
            position: "absolute", left: "clamp(12px, 3vw, 28px)", right: "clamp(12px, 3vw, 28px)", bottom: 14,
            zIndex: 40, opacity: scene > 0.3 ? 1 : 0, transition: "opacity 1.4s ease",
            display: "flex", alignItems: "stretch", gap: 14,
          }}>
            {/* Box 1 — trusted-by logos + stats */}
            <div style={{
              flex: 1, display: "flex", alignItems: "center", gap: "clamp(10px, 1.5vw, 22px)", minWidth: 0,
              background: "linear-gradient(165deg, rgba(10,16,34,0.7), rgba(4,9,22,0.64))",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14, padding: "12px clamp(12px, 1.8vw, 22px)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 10px 36px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}>
              {/* Trusted-by logos */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 1.2vw, 16px)" }}>
                  {["Zindigi", "G-Tag", "E-Parking", "BankIslami"].map((name) => (
                    <span key={name} style={{ fontSize: 13, fontWeight: 700, color: "rgba(226,232,240,0.55)", fontFamily: "sans-serif", whiteSpace: "nowrap" }}>
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ width: 1, alignSelf: "stretch", background: "rgba(255,255,255,0.08)" }} />

              {/* Stat columns */}
              <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 2vw, 28px)", flexShrink: 0, marginLeft: "auto" }}>
                {[
                  { value: "250+", label: "AI Experts" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "150+", label: "Enterprise Clients" },
                  { value: "24/7", label: "Support" },
                ].map((s) => (
                  <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                    <span style={{
                      fontSize: 18, fontWeight: 800, fontFamily: "sans-serif", lineHeight: 1,
                      background: "linear-gradient(135deg,#2DD4BF,#C084FC)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>{s.value}</span>
                    <span style={{ fontSize: 8, fontFamily: "monospace", color: "rgba(226,232,240,0.8)", letterSpacing: "0.14em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 2 — built for scale, separate card */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10, flexShrink: 0, pointerEvents: "auto", cursor: "pointer",
              background: "linear-gradient(135deg, rgba(0,212,255,0.16), rgba(155,77,255,0.16))",
              border: "1.5px solid rgba(0,212,255,0.5)",
              borderRadius: 14, padding: "12px 20px",
              backdropFilter: "blur(24px)",
              boxShadow: "0 10px 36px rgba(0,0,0,0.45), 0 0 28px rgba(0,212,255,0.18), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(135deg, #00D4FF, #9B4DFF)",
                boxShadow: "0 0 22px rgba(0,212,255,0.6)",
              }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>AI</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", whiteSpace: "nowrap", textShadow: "0 0 10px rgba(0,212,255,0.7)" }}>BUILT FOR SCALE</span>
                <span style={{ fontSize: 9, color: "rgba(203,213,225,0.75)", whiteSpace: "nowrap" }}>Secure. Compliant. Reliable.</span>
              </div>
              <ChevronRight size={16} color="#00D4FF" />
            </div>
          </div>
        )}

      </div>
    </SceneWrapper>
  );
}

