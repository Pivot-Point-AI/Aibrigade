"use client";
import {
  Boxes, Bot, Mic, Building2, Settings2, BookOpenCheck, Users2, ArrowRight,
  Layers, Users, ShieldCheck, Zap, Globe2,
} from "lucide-react";
import { SceneWrapper } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { useIsMobile, useWindowSize, useIsShortViewport } from "./hooks";
import { Badge } from "@/components/ui/Card";

const CYAN = "#00D4FF";
const VIOLET = "#9B4DFF";

const CAPABILITIES = [
  { num: "01", title: "AI Product Development", desc: "Turn your idea into a production-ready AI application.", icon: Boxes, color: CYAN },
  { num: "02", title: "Agentic AI", desc: "Autonomous AI systems that reason, plan, and execute business workflows.", icon: Bot, color: VIOLET },
  { num: "03", title: "Voice AI", desc: "Human-like conversational AI for customer service, banking, healthcare, and enterprise applications.", icon: Mic, color: CYAN },
  { num: "04", title: "Enterprise AI", desc: "Private cloud and on-premise AI deployments built for security and compliance.", icon: Building2, color: VIOLET },
  { num: "05", title: "AI Automation", desc: "Replace repetitive manual processes with intelligent automation.", icon: Settings2, color: CYAN },
  { num: "06", title: "RAG & Knowledge Assistants", desc: "Enable AI to securely search, understand, and answer questions using your business knowledge.", icon: BookOpenCheck, color: VIOLET },
  { num: "07", title: "AI Staff Augmentation", desc: "Scale your team with experienced AI engineers and specialists whenever you need them.", icon: Users2, color: CYAN },
];

const BOTTOM_FEATURES = [
  { icon: Layers, title: "7 Capabilities", sub: "One complete suite" },
  { icon: Users, title: "One Team", sub: "Multidisciplinary experts" },
  { icon: ShieldCheck, title: "Enterprise Ready", sub: "Secure. Compliant. Scalable." },
  { icon: Zap, title: "Faster Deployment", sub: "From weeks to days" },
  { icon: Globe2, title: "End-to-End Support", sub: "With you at every step" },
];

function CapabilityCard({ c }: { c: typeof CAPABILITIES[number] }) {
  const Icon = c.icon;
  return (
    <div style={{
      position: "relative", flex: 1, minWidth: 0,
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      background: "linear-gradient(165deg, rgba(13,18,40,0.85), rgba(8,12,28,0.82))",
      border: `1px solid ${c.color}33`,
      borderRadius: 16, padding: "12px 12px 32px",
      backdropFilter: "blur(20px)",
      boxShadow: "0 12px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
    }}>
      {/* Index badge */}
      <span style={{
        position: "absolute", top: 12, left: 12, zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "center",
        minWidth: 26, height: 22, padding: "0 6px", borderRadius: 7,
        fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
        color: "#fff", letterSpacing: "0.03em",
        background: `${c.color}30`, border: `1px solid ${c.color}55`,
      }}>
        {c.num}
      </span>

      {/* Icon tile — rotated platform with pedestal glow, echoes the hero cube */}
      <div style={{
        position: "relative", height: 50, width: "100%", marginBottom: 9, marginTop: 2,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", bottom: 0, width: 42, height: 9, borderRadius: "50%",
          background: `radial-gradient(ellipse, ${c.color}40, transparent 70%)`,
          filter: "blur(2px)",
        }} />
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `linear-gradient(155deg, ${c.color}30, ${c.color}10)`,
          border: `1.5px solid ${c.color}60`,
          boxShadow: `0 0 22px ${c.color}30, inset 0 1px 0 rgba(255,255,255,0.1)`,
          transform: "perspective(400px) rotateX(6deg) rotateY(-10deg)",
        }}>
          <Icon size={20} strokeWidth={1.75} color={c.color} />
        </div>
      </div>

      <div style={{ fontSize: 14, fontWeight: 700, color: "#F8FAFC", lineHeight: 1.3, marginBottom: 5 }}>
        {c.title}
      </div>
      <div style={{ fontSize: 11.5, color: "rgba(203,213,225,0.6)", lineHeight: 1.45, fontWeight: 400 }}>
        {c.desc}
      </div>

      {/* Arrow CTA */}
      <div style={{
        position: "absolute", bottom: 10, right: 10,
        width: 28, height: 28, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1.5px solid ${c.color}55`, background: `${c.color}14`,
      }}>
        <ArrowRight size={13} color={c.color} />
      </div>
    </div>
  );
}

function CoreCube({ size }: { size: number }) {
  return (
    <div style={{
      position: "relative", width: size, height: size, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      pointerEvents: "none",
    }}>
      {/* Orbit rings */}
      <div style={{
        position: "absolute", width: size * 1.45, height: size * 1.45, borderRadius: "50%",
        border: "1px dashed rgba(0,212,255,0.22)",
      }} />
      <div style={{
        position: "absolute", width: size * 1.1, height: size * 1.1, borderRadius: "50%",
        border: "1px solid rgba(155,77,255,0.18)",
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute", width: size * 1.25, height: size * 1.25, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,255,0.18) 0%, rgba(155,77,255,0.09) 45%, transparent 75%)",
        filter: "blur(6px)",
      }} />
      {/* Orbiting nodes */}
      {[0, 130, 250].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const r = size * 0.72;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r * 0.6;
        return (
          <div key={i} style={{
            position: "absolute", left: "50%", top: "50%",
            width: 9, height: 9, borderRadius: "50%",
            background: i % 2 === 0 ? CYAN : VIOLET,
            boxShadow: `0 0 10px ${i % 2 === 0 ? CYAN : VIOLET}`,
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
          }} />
        );
      })}
      {/* Cube */}
      <div style={{
        position: "relative", width: size * 0.58, height: size * 0.58, borderRadius: 18,
        background: "linear-gradient(155deg, rgba(0,212,255,0.24), rgba(155,77,255,0.3))",
        border: "1.5px solid rgba(0,212,255,0.5)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 50px rgba(0,212,255,0.25), 0 0 90px rgba(155,77,255,0.12), inset 0 1px 0 rgba(255,255,255,0.12)",
        transform: "perspective(600px) rotateX(8deg) rotateY(-14deg)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontSize: size * 0.19, fontWeight: 800, fontFamily: "'Inter', sans-serif",
          background: "linear-gradient(135deg,#fff,#9be9ff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          letterSpacing: "-0.02em",
        }}>
          AI
        </span>
      </div>
      {/* Pedestal glow */}
      <div style={{
        position: "absolute", bottom: size * 0.04, width: size * 0.65, height: size * 0.1, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(155,77,255,0.35), transparent 70%)",
        filter: "blur(4px)",
      }} />
    </div>
  );
}

export function CapabilitiesScene({ scene, data: _data }: { scene: number; mouse?: MousePosition; data: SceneData }) {
  const isMobile = useIsMobile();
  const { width } = useWindowSize();
  const isShort = useIsShortViewport();
  const sidebarVisible = !isMobile && width >= 1400;
  const compact = width < 900;
  const showCube = !isMobile && width >= 1024;
  const showFeatureStrip = !isMobile && !isShort && width >= 1100;

  return (
    <SceneWrapper opacity={scene}>
      <div style={{
        position: "relative",
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: isMobile ? "flex-start" : "center",
        padding: isMobile ? "calc(76px + var(--announcement-offset, 0px)) 20px 16px" : "calc(78px + var(--announcement-offset, 0px)) 60px 50px",
        paddingRight: isMobile ? 20 : sidebarVisible ? 284 : 60,
        overflowY: isMobile ? "auto" : "hidden",
      }}>
        {/* ── Decorative cube — floats in the open corner, clear of header/sidebar ── */}
        {showCube && (
          <div style={{
            position: "absolute", left: "clamp(20px, 4vw, 56px)",
            top: "calc(50% - 40px)", transform: "translateY(-50%)",
            zIndex: 1, opacity: 0.9,
          }}>
            <CoreCube size={90} />
          </div>
        )}

        {/* ── Header ── */}
        <div style={{
          width: "100%", maxWidth: 760, textAlign: "center",
          display: "flex", flexDirection: "column", alignItems: "center",
          marginBottom: isMobile ? 16 : 14,
        }}>
          <div style={{ marginBottom: isMobile ? 10 : 12 }}>
            <Badge variant="cyan" size={isMobile ? "sm" : "md"} dot>One Brigade</Badge>
          </div>
          <h2 style={{
            fontSize: isMobile ? "clamp(1.5rem,6.5vw,1.9rem)" : "clamp(1.9rem,3vw,2.4rem)",
            fontFamily: "'Inter', sans-serif",
            color: "#F8FAFC", fontWeight: 800, lineHeight: 1.15, margin: 0, letterSpacing: "-0.02em",
          }}>
            One Brigade.{" "}
            <span style={{
              background: "linear-gradient(135deg,#00D4FF,#9B4DFF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Every AI Capability You Need.</span>
          </h2>
       
        </div>

        {/* ── Capability grid ── */}
        {isMobile || compact ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
            gap: 10, width: "100%", maxWidth: 1040,
          }}>
            {CAPABILITIES.map((c) => <CapabilityCard key={c.num} c={c} />)}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 1040 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10 }}>
              {CAPABILITIES.slice(0, 4).map((c) => <CapabilityCard key={c.num} c={c} />)}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              {CAPABILITIES.slice(4, 7).map((c) => (
                <div key={c.num} style={{ flex: "0 0 calc((100% - 30px) / 4)" }}>
                  <CapabilityCard c={c} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Bottom feature strip ── */}
        {showFeatureStrip && (
          <div style={{ display: "flex", gap: 10, marginTop: 10, width: "100%", maxWidth: 1040 }}>
            {BOTTOM_FEATURES.map((f, i) => {
              const Icon = f.icon;
              const color = i % 2 === 0 ? CYAN : VIOLET;
              return (
                <div key={f.title} style={{
                  flex: 1, display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 12px",
                  background: "linear-gradient(165deg, rgba(10,16,34,0.68), rgba(4,9,22,0.62))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  backdropFilter: "blur(20px)",
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${color}24`, border: `1px solid ${color}66`,
                  }}>
                    <Icon size={14} strokeWidth={1.75} color={color} />
                  </div>
                  <div style={{ lineHeight: 1.25, minWidth: 0 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: "#F8FAFC", whiteSpace: "nowrap" }}>{f.title}</div>
                    <div style={{ fontSize: 9.5, color: "rgba(226,232,240,0.8)", whiteSpace: "nowrap" }}>{f.sub}</div>
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
