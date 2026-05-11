"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { SceneWrapper, SceneText } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { useIsMobile } from "./hooks";

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

  const fullText = "Intelligence rendered — ready.";

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
    const id = setInterval(() => setTick((t) => t + 1), 60);
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
    <SceneWrapper opacity={scene < 0.05 ? scene / 0.05 : 1}>
      {/* Vertical data streams */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {streamLines.map((s) => {
          const y = ((tick * s.speed * 0.5 + s.delay * 20) % 120) - 10;
          return (
            <line key={s.id} x1={s.x} y1={y} x2={s.x} y2={y + s.len * 0.3}
              stroke="#38BDF8" strokeWidth={0.3}
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
          background: "rgba(2, 8, 23, 0.7)", border: "1px solid rgba(56,189,248,0.25)",
          borderRadius: 16, padding: isMobile ? "24px" : "32px", width: "100%", maxWidth: 540,
          backdropFilter: "blur(40px)",
          boxShadow: "0 0 60px rgba(56,189,248,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
          transform: isMobile ? "none" : `perspective(1000px) rotateX(${mouse.ny * -2}deg) rotateY(${mouse.nx * 2}deg)`,
          transition: "transform 0.2s ease-out",
        }}>
          {/* Terminal header */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />
            ))}
            <span style={{ marginLeft: "auto", fontSize: isMobile ? 8 : 10, fontFamily: "monospace", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>AIBRIGADE — OUTPUT</span>
          </div>

          <div style={{ fontFamily: "monospace", fontSize: isMobile ? 12 : 14, color: "#38BDF8", textAlign: "left", lineHeight: 1.8 }}>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>$ </span>
            <span style={{ color: "#A855F7" }}>run</span>
            <span style={{ color: "rgba(255,255,255,0.5)" }}> inference.signal </span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>› </span>
            {typed}
            <span style={{ opacity: cursor ? 1 : 0, color: "#38BDF8" }}>▌</span>
          </div>
        </div>

        <SceneText scene={scene} data={data} />

        {/* Glowing CTA */}
        <div style={{ marginTop: 8, position: "relative", zIndex: 100 }}>
          <Link 
            href="/contact" 
            style={{ textDecoration: "none", position: "relative", zIndex: 100 }}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
          >
            <div style={{
              display: "inline-block", padding: isMobile ? "12px 24px" : "12px 32px",
              border: "1px solid rgba(56,189,248,0.4)", borderRadius: 24,
              fontFamily: "monospace", fontSize: isMobile ? 9 : 11, letterSpacing: isMobile ? "0.08em" : "0.15em",
              color: "#38BDF8", cursor: "pointer",
              background: "rgba(56,189,248,0.05)",
              boxShadow: "0 0 20px rgba(56,189,248,0.1)",
              transition: "all 0.3s ease",
              animation: "signal-pulse 2s ease-in-out infinite",
              pointerEvents: "auto",
            }}>
              INITIALISE → AIBRIGADE
            </div>
          </Link>
        </div>
      </div>
    </SceneWrapper>
  );
}
