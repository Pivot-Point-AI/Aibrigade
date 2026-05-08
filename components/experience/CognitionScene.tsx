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
        justifyContent: isMobile ? "center" : "space-around", 
        height: "100%", 
        padding: isMobile ? "0 20px" : "0 60px", 
        flexWrap: isMobile ? "nowrap" : "wrap", 
        gap: isMobile ? 32 : 40 
      }}>
        {/* Neural net SVG */}
        <div style={{
          transform: `perspective(800px) rotateY(${mouse.nx * 8}deg) rotateX(${-mouse.ny * 8}deg)`,
          transition: "transform 0.1s ease",
        }}>
          <svg viewBox="0 0 110 110" width={isMobile ? 220 : 360} height={isMobile ? 220 : 360}>
            {edges.map(([a, b], i) => {
              const isActive = activeEdges.some(e => (e.from === a && e.to === b) || (e.from === b && e.to === a));
              return (
                <line
                  key={i}
                  x1={nodes[a].x} y1={nodes[a].y}
                  x2={nodes[b].x} y2={nodes[b].y}
                  stroke={isActive ? "#8B5CF6" : "rgba(139,92,246,0.15)"}
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
                  fill={isActive ? "#8B5CF6" : "rgba(139,92,246,0.4)"}
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
          {/* Case Stats */}
          <div style={{ marginTop: isMobile ? 24 : 32, display: "flex", flexDirection: "column", gap: isMobile ? 12 : 16, width: "100%" }}>
            {CASES.map((c, i) => (
              <div key={i} style={{
                opacity: Math.max(0, scene * 3 - i * 0.5),
                transform: `translateX(${(1 - scene) * 20}px)`,
                transition: "opacity 0.5s, transform 0.5s"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>{c.client.toUpperCase()}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#8B5CF6" }}>{c.stat}</span>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "serif", fontStyle: "italic" }}>
                  {c.headline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
}
