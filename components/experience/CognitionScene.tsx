"use client";
import { useState, useEffect, useMemo } from "react";
import { SceneWrapper, SceneText } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { CASES } from "./data";
import { useIsMobile } from "./hooks";

interface Edge {
  from: number;
  to: number;
  id: number;
}

export function CognitionScene({ scene, mouse, data }: { scene: number; mouse: MousePosition; data: SceneData }) {
  const isMobile = useIsMobile();
  const nodes = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: 20 + (i % 4) * 22,
    y: 20 + Math.floor(i / 4) * 22,
    delay: i * 0.1,
  })), []);

  const [activeEdges, setActiveEdges] = useState<Edge[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setActiveEdges(
        Array.from({ length: 6 }, () => ({
          from: Math.floor(Math.random() * 16),
          to: Math.floor(Math.random() * 16),
          id: Math.random(),
        }))
      );
    }, 600);
    return () => clearInterval(id);
  }, []);

  const edges = useMemo(() => {
    const result: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 30) result.push([i, j]);
      }
    }
    return result;
  }, [nodes]);

  return (
    <SceneWrapper opacity={scene < 0.05 ? scene / 0.05 : scene > 0.85 ? 1 - (scene - 0.85) / 0.15 : 1}>
      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center", 
        justifyContent: isMobile ? "flex-start" : "space-around", 
        height: "100%", 
        padding: isMobile ? "70px 16px 0" : "0 60px",
        flexWrap: isMobile ? "nowrap" : "wrap", 
        gap: isMobile ? 24 : 40 
      }}>
        {/* Neural net SVG */}
        <div style={{
          transform: `perspective(800px) rotateY(${mouse.nx * 8}deg) rotateX(${-mouse.ny * 8}deg)`,
          transition: "transform 0.1s ease",
        }}>
          <svg viewBox="0 0 110 110" width={isMobile ? 160 : 360} height={isMobile ? 160 : 360}>
            {edges.map(([a, b], i) => {
              const isActive = activeEdges.some(e => (e.from === a && e.to === b) || (e.from === b && e.to === a));
              return (
                <line
                  key={i}
                  x1={nodes[a].x} y1={nodes[a].y}
                  x2={nodes[b].x} y2={nodes[b].y}
                  stroke={isActive ? "#9B4DFF" : "rgba(155,77,255,0.15)"}
                  strokeWidth={isActive ? 1.2 : 0.5}
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />
              );
            })}
            {nodes.map((n, i) => {
              const isActive = activeEdges.some(e => e.from === i || e.to === i);
              return (
                <circle
                  key={n.id}
                  cx={n.x} cy={n.y}
                  r={isActive ? 3.5 : 2}
                  fill={isActive ? "#9B4DFF" : "rgba(155,77,255,0.4)"}
                  style={{ transition: "r 0.2s, fill 0.2s" }}
                />
              );
            })}
          </svg>
        </div>

        {/* Text area */}
        <div style={{ 
          maxWidth: isMobile ? "100%" : 440, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          order: isMobile ? -1 : 0
        }}>
          <SceneText scene={scene} data={data} />
          {/* Case Cards */}
          <div style={{ marginTop: isMobile ? 20 : 28, display: "flex", flexDirection: "column", gap: isMobile ? 10 : 12, width: "100%" }}>
            {CASES.map((c, i) => (
              <div key={i} style={{
                opacity: Math.max(0, scene * 3 - i * 0.5),
                transform: `translateX(${(1 - scene) * 24}px)`,
                transition: "opacity 0.5s, transform 0.5s",
                background: "rgba(155,77,255,0.07)",
                border: "1px solid rgba(155,77,255,0.2)",
                borderRadius: 10,
                padding: isMobile ? "12px 14px" : "14px 18px",
                backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", gap: isMobile ? 12 : 16,
              }}>
                {/* Stat badge */}
                <div style={{
                  flexShrink: 0,
                  background: "rgba(155,77,255,0.15)",
                  border: "1px solid rgba(155,77,255,0.3)",
                  borderRadius: 6, padding: "6px 10px", textAlign: "center",
                }}>
                  <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 700, color: "#a78bfa", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>{c.stat}</div>
                  <div style={{ fontSize: 7, color: "rgba(167,139,250,0.6)", fontFamily: "monospace", letterSpacing: "0.1em", marginTop: 3 }}>{c.statLabel?.toUpperCase() ?? "IMPACT"}</div>
                </div>
                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: isMobile ? 9 : 10, fontFamily: "'JetBrains Mono', monospace", color: "rgba(167,139,250,0.6)", letterSpacing: "0.15em", marginBottom: 4 }}>{c.client.toUpperCase()}</div>
                  <div style={{ fontSize: isMobile ? 11 : 13, color: "rgba(248,250,252,0.8)", fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", lineHeight: 1.4 }}>
                    {c.headline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
}
