"use client";
import { useState, useEffect, useMemo } from "react";
import { ArrowRight, Activity, Database, ShieldCheck, Lock } from "lucide-react";
import { SceneWrapper } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { useIsMobile } from "./hooks";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";

const STATS = [
  { icon: Database, value: "47+", label: "Production Systems" },
  { icon: ShieldCheck, value: "HIPAA", label: "Compliant" },
  { icon: Lock, value: "SOC 2", label: "Type II Certified" },
];

export function SignalScene({ scene, mouse: _mouse, data, setIsHovering }: {
  scene: number;
  mouse: MousePosition;
  data: SceneData;
  setIsHovering?: (hover: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 100);
    return () => clearInterval(id);
  }, []);

  // Data stream lines
  const streamLines = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    speed: 1 + Math.random() * 2,
    len: 40 + Math.random() * 60,
    delay: Math.random() * 3,
  })), []);

  return (
    <SceneWrapper opacity={scene}>
      {/* Vertical data streams */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {streamLines.map((s) => {
          const y = ((tick * s.speed * 0.5 + s.delay * 20) % 120) - 10;
          return (
            <line key={s.id} x1={s.x} y1={y} x2={s.x} y2={y + s.len * 0.3}
              stroke="#00D4FF" strokeWidth={0.3}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center",
        height: "100%", gap: isMobile ? 14 : 18,
        padding: isMobile ? "calc(70px + var(--announcement-offset, 0px)) 16px 16px" : "calc(88px + var(--announcement-offset, 0px)) 40px 24px",
        textAlign: "center",
      }}>
        {/* Signal badge */}
        <Badge variant="cyan" size="md" dot>
          <Activity size={12} style={{ marginRight: 2 }} />
          Signal
        </Badge>

        {/* Headline */}
        <h2 style={{
          fontSize: isMobile ? "clamp(1.8rem,9vw,2.4rem)" : "clamp(2.6rem,5vw,4rem)",
          fontFamily: "'Inter', sans-serif",
          color: "#F8FAFC", fontWeight: 800, lineHeight: 1.08, margin: 0, letterSpacing: "-0.02em",
        }}>
          Ready to{" "}
          <span style={{
            background: "linear-gradient(115deg,#00D4FF,#9B4DFF)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>Build Your AI Product?</span>
        </h2>

        {/* Subtitle */}
        <p style={{
          fontSize: isMobile ? 13.5 : 17, color: "rgba(203,213,225,0.85)",
          lineHeight: 1.6, maxWidth: 520, margin: 0,
          fontFamily: "'Inter', sans-serif", fontWeight: 300,
        }}>
          {data.sub}
        </p>

        {/* CTA Group */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: isMobile ? 12 : 14, marginTop: 6, position: "relative", zIndex: 100 }}>
          <div
            style={{ position: "relative", zIndex: 100 }}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
          >
            <Button
              href="/contact"
              variant="primary"
              size={isMobile ? "md" : "lg"}
              iconRight={<ArrowRight size={16} />}
            >
              Book Your Free Strategy Session
            </Button>
          </div>

          <Button href="/contact" variant="ghost" size="sm">
            Hire AI Engineers from $89/hour
          </Button>
        </div>

        {/* Stat cards */}
        <div style={{
          display: "flex", gap: isMobile ? 8 : 14, marginTop: 8, width: "100%",
          maxWidth: 720, flexWrap: isMobile ? "wrap" : "nowrap",
        }}>
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} style={{
                flex: isMobile ? "1 1 100%" : 1,
                display: "flex", alignItems: "center", gap: 10,
                padding: isMobile ? "10px 14px" : "12px 18px",
                borderRadius: 14, textAlign: "left",
                background: "rgba(13,18,40,0.75)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: i === 0 ? "rgba(0,212,255,0.14)" : "rgba(155,77,255,0.14)",
                  border: `1px solid ${i === 0 ? "rgba(0,212,255,0.4)" : "rgba(155,77,255,0.4)"}`,
                }}>
                  <Icon size={16} color={i === 0 ? "#00D4FF" : "#C084FC"} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#F8FAFC", fontFamily: "'Inter', sans-serif", lineHeight: 1.1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(203,213,225,0.6)", fontFamily: "'Inter', sans-serif" }}>
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneWrapper>
  );
}
