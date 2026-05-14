"use client";
import { useState, useEffect, useMemo } from "react";
import { SceneWrapper } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { CASES } from "./data";
import { useIsMobile } from "./hooks";

interface Edge { from: number; to: number; id: number; }

export function CognitionScene({ scene, mouse, data }: { scene: number; mouse: MousePosition; data: SceneData }) {
  const isMobile = useIsMobile();
  const [activeEdges, setActiveEdges] = useState<Edge[]>([]);

  const nodes = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: 18 + (i % 4) * 28,
    y: 18 + Math.floor(i / 4) * 28,
  })), []);

  const edges = useMemo(() => {
    const result: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 36) result.push([i, j]);
      }
    return result;
  }, [nodes]);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveEdges(Array.from({ length: 8 }, () => ({
        from: Math.floor(Math.random() * 16),
        to: Math.floor(Math.random() * 16),
        id: Math.random(),
      })));
    }, 500);
    return () => clearInterval(id);
  }, []);

  const fadeIn = scene < 0.05 ? scene / 0.05 : scene > 0.85 ? 1 - (scene - 0.85) / 0.15 : 1;

  return (
    <SceneWrapper opacity={fadeIn}>
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: isMobile ? "70px 20px 0" : "0 60px",
        gap: isMobile ? 32 : 70,
      }}>

        {/* Neural net */}
        <div style={{
          flexShrink: 0,
          transform: `perspective(900px) rotateY(${mouse.nx * 6}deg) rotateX(${-mouse.ny * 6}deg)`,
          transition: "transform 0.12s ease",
          filter: "drop-shadow(0 0 40px rgba(155,77,255,0.4))",
        }}>
          <svg viewBox="0 0 118 118" width={isMobile ? 220 : 420} height={isMobile ? 220 : 420} style={{ overflow: "visible" }}>
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glow2" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {edges.map(([a, b], i) => {
              const isActive = activeEdges.some(e =>
                (e.from === a && e.to === b) || (e.from === b && e.to === a));
              return (
                <line key={i}
                  x1={nodes[a].x} y1={nodes[a].y}
                  x2={nodes[b].x} y2={nodes[b].y}
                  stroke={isActive ? "#C084FC" : "rgba(155,77,255,0.3)"}
                  strokeWidth={isActive ? 2 : 1}
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />
              );
            })}

            {nodes.map((n, i) => {
              const isActive = activeEdges.some(e => e.from === i || e.to === i);
              return (
                <circle key={n.id}
                  cx={n.x} cy={n.y}
                  r={isActive ? 7 : 4.5}
                  fill={isActive ? "#C084FC" : "rgba(155,77,255,0.65)"}
                  filter={isActive ? "url(#glow2)" : "url(#glow)"}
                  style={{ transition: "r 0.25s, fill 0.25s" }}
                />
              );
            })}
          </svg>
        </div>

        {/* Content */}
        <div style={{
          flex: 1, maxWidth: isMobile ? "100%" : 500,
          display: "flex", flexDirection: "column",
          alignItems: isMobile ? "center" : "flex-start",
          order: isMobile ? -1 : 0,
        }}>

          {/* Label */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 18px",
            background: "rgba(155,77,255,0.12)",
            border: "1px solid rgba(155,77,255,0.4)",
            borderRadius: 100, marginBottom: 18,
            boxShadow: "0 0 20px rgba(155,77,255,0.15)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#9B4DFF", boxShadow: "0 0 10px #9B4DFF", display: "inline-block" }} />
            <span style={{ fontSize: 10, fontFamily: "monospace", fontWeight: 700, color: "#C084FC", letterSpacing: "0.25em", textTransform: "uppercase" }}>
              Proven Outcomes
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontSize: isMobile ? "clamp(1.8rem,7vw,2.2rem)" : "clamp(2.4rem,3.8vw,3.4rem)",
            fontFamily: "Georgia, serif", fontWeight: 700,
            lineHeight: 1.1, margin: 0, marginBottom: 10,
            letterSpacing: "-0.02em", color: "#F0F4FF",
            textShadow: "0 0 40px rgba(155,77,255,0.2)",
          }}>
            Real impact,{" "}
            <span style={{
              background: "linear-gradient(135deg,#9B4DFF,#C084FC)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>measurable results</span>
          </h2>
          <p style={{
            fontSize: isMobile ? 14 : 16, color: "rgba(203,213,225,0.8)",
            fontFamily: "sans-serif", fontWeight: 300, lineHeight: 1.7,
            margin: 0, marginBottom: isMobile ? 22 : 32,
          }}>
            Real-world impact delivered across regulated industries.
          </p>

          {/* Case cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 12 : 14, width: "100%" }}>
            {CASES.map((c, i) => (
              <div key={i} style={{
                opacity: Math.max(0, Math.min(1, scene * 4 - i * 0.5)),
                transform: `translateX(${Math.max(0, (1 - scene) * 30)}px)`,
                transition: "opacity 0.5s, transform 0.5s",
                background: "rgba(155,77,255,0.1)",
                border: "1px solid rgba(155,77,255,0.35)",
                borderRadius: 14,
                padding: isMobile ? "16px 18px" : "18px 22px",
                backdropFilter: "blur(16px)",
                display: "flex", alignItems: "center", gap: isMobile ? 16 : 20,
                boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(155,77,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}>
                <div style={{
                  flexShrink: 0, minWidth: isMobile ? 68 : 80,
                  background: "rgba(155,77,255,0.18)",
                  border: "1.5px solid rgba(155,77,255,0.45)",
                  borderRadius: 10, padding: isMobile ? "10px 12px" : "12px 14px", textAlign: "center",
                  boxShadow: "0 0 20px rgba(155,77,255,0.2)",
                }}>
                  <div style={{
                    fontSize: isMobile ? 20 : 26, fontWeight: 700,
                    color: "#C084FC", fontFamily: "monospace", lineHeight: 1,
                    textShadow: "0 0 20px rgba(192,132,252,0.8)",
                  }}>{c.stat}</div>
                  <div style={{
                    fontSize: 8, color: "rgba(192,132,252,0.7)",
                    fontFamily: "monospace", letterSpacing: "0.1em", marginTop: 5, textTransform: "uppercase",
                  }}>{c.statLabel ?? "IMPACT"}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: isMobile ? 10 : 11, fontFamily: "monospace",
                    color: "rgba(192,132,252,0.7)", letterSpacing: "0.15em",
                    marginBottom: 6, textTransform: "uppercase", fontWeight: 600,
                  }}>{c.client}</div>
                  <div style={{
                    fontSize: isMobile ? 13 : 15, color: "#F0F4FF",
                    fontFamily: "Georgia, serif", fontStyle: "italic", lineHeight: 1.5,
                    textShadow: "0 1px 8px rgba(0,0,0,0.3)",
                  }}>{c.headline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
}
