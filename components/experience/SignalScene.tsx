"use client";
import { useState, useEffect, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { SceneWrapper, SceneText } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { useIsMobile } from "./hooks";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";

export function SignalScene({ scene, mouse, data, setIsHovering }: { 
  scene: number; 
  mouse: MousePosition; 
  data: SceneData;
  setIsHovering?: (hover: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [typed, setTyped] = useState("");
  const [cursor, setCursor] = useState(true);
  const [tick, setTick] = useState(0);

  const fullText = "Intelligence rendered, ready.";

  useEffect(() => {
    if (scene < 0.1) { setTyped(""); return; }
    const speed = Math.max(30, 80 - scene * 60);
    const id = setInterval(() => {
      setTyped((prev) => {
        if (prev.length >= fullText.length) { clearInterval(id); return prev; }
        return fullText.slice(0, prev.length + 1);
      });
    }, speed);
    return () => clearInterval(id);
  }, [scene]);

  useEffect(() => {
    const id = setInterval(() => setCursor((c) => !c), 500);
    return () => clearInterval(id);
  }, []);

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
        justifyContent: isMobile ? "flex-start" : "center",
        height: "100%", gap: isMobile ? 16 : 40,
        padding: isMobile ? "70px 16px 0" : "0 40px",
        textAlign: "center" 
      }}>
        {/* Terminal window */}
        <div style={{
          background: "linear-gradient(165deg, rgba(8,14,32,0.78), rgba(2, 8, 23, 0.72))",
          border: "1px solid rgba(0,212,255,0.28)",
          borderRadius: 18, padding: isMobile ? "24px" : "32px", width: "100%", maxWidth: 540,
          backdropFilter: "blur(44px)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 40px rgba(0,212,255,0.08)",
          transform: isMobile ? "none" : `perspective(1000px) rotateX(${mouse.ny * -2}deg) rotateY(${mouse.nx * 2}deg)`,
          transition: "transform 0.2s ease-out",
        }}>
          {/* Terminal header */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />
            ))}
            <span style={{ marginLeft: "auto", fontSize: isMobile ? 8 : 10, fontFamily: "monospace", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>AIBRIGADE / OUTPUT</span>
          </div>

          <div style={{ fontFamily: "monospace", fontSize: isMobile ? 12 : 14, color: "#00D4FF", textAlign: "left", lineHeight: 1.8 }}>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>$ </span>
            <span style={{ color: "#9B4DFF" }}>run</span>
            <span style={{ color: "rgba(255,255,255,0.5)" }}> inference.signal </span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>› </span>
            {typed}
            <span style={{ opacity: cursor ? 1 : 0, color: "#00D4FF" }}>▌</span>
          </div>
        </div>

        <SceneText scene={scene} data={data} />

        {/* CTA Group */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: isMobile ? 14 : 18, marginTop: 4, position: "relative", zIndex: 100 }}>
          {/* Primary CTA */}
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
              Book a Discovery Call
            </Button>
          </div>

          {/* Secondary CTA */}
          <Button href="/projects" variant="ghost" size="sm">
            View Our Work
          </Button>

          {/* Trust signals */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            flexWrap: "wrap", gap: isMobile ? 8 : 10, marginTop: 4,
            maxWidth: "100%", padding: isMobile ? "0 8px" : 0,
          }}>
            {["47+ Production Systems", "HIPAA Compliant", "SOC 2 Type II"].map((t, i) => (
              <Badge key={i} variant="neutral" size="sm" dot>{t}</Badge>
            ))}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
}
