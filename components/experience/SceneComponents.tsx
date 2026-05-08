import React from "react";
import { SceneData } from "./types";
import { useIsMobile } from "./hooks";

export function SceneWrapper({ opacity, children }: { opacity: number; children: React.ReactNode }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      opacity,
      transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      display: "flex", alignItems: "center", justifyContent: "center",
      pointerEvents: opacity > 0.1 ? "auto" : "none",
    }}>
      {children}
    </div>
  );
}

export function SceneText({ scene, data }: { scene: number; data: SceneData }) {
  const isGenesis = data.id === "genesis";
  const isMobile = useIsMobile();

  return (
    <div style={{
      opacity: isGenesis ? 1 : (scene > 0.15 ? 1 : scene / 0.15),
      transition: "opacity 0.6s ease-out",
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      padding: isMobile ? "0 16px" : "0 20px",
    }}>

      {/* Scene identifier pill */}
      {!isGenesis && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "4px 14px",
          border: `1px solid ${data.accent}44`,
          borderRadius: 20,
          background: `${data.accent}0a`,
          marginBottom: 20,
          opacity: scene > 0.15 ? 1 : 0,
          transform: `translateY(${scene > 0.15 ? 0 : 10}px)`,
          transition: "opacity 0.8s ease, transform 0.8s var(--ease-out-expo)",
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: data.accent, boxShadow: `0 0 8px ${data.accent}` }} />
          <span style={{
            fontSize: 9, fontFamily: "monospace", letterSpacing: "0.3em",
            color: data.accent, textTransform: "uppercase", fontWeight: 600,
          }}>
            {data.id.toUpperCase()}
          </span>
        </div>
      )}

      {/* Main headline */}
      <h2 style={{
        fontSize: isGenesis ? (isMobile ? "1.4rem" : "clamp(1rem, 2.6vw, 2.2rem)") : (isMobile ? "1.8rem" : "clamp(2rem, 4.5vw, 3.8rem)"),
        fontFamily: "'Playfair Display', Georgia, serif",
        color: "#F8FAFC",
        fontWeight: 700,
        lineHeight: 1.1,
        margin: isMobile ? "20px 0 12px" : "40px 0 18px",
        letterSpacing: isGenesis ? "0.03em" : "-0.01em",
        opacity: scene > 0.1 ? 1 : 0,
        transform: `translateY(${scene > 0.1 ? 0 : 16}px)`,
        transition: "opacity 0.9s ease-out, transform 0.9s var(--ease-out-expo)",
        maxWidth: isGenesis ? "none" : "700px",
      }}>
        {isGenesis && data.headline.includes("AI Brigade") ? (
          <>
            <span style={{
              background: "linear-gradient(115deg, #2596be 0%, #60c4e8 50%, #2596be 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient-shift 4s linear infinite",
            }}>
              AI Brigade
            </span>
            <span style={{
              color: "rgba(248, 250, 252, 0.75)",
              opacity: scene > 0.2 ? 1 : 0,
              display: "inline",
              transition: "opacity 1.2s 0.3s ease-out",
            }}>
              {data.headline.replace("AI Brigade", "")}
            </span>
          </>
        ) : (
          data.headline
        )}
      </h2>

      {/* Subtitle */}
      {data.sub && (
        <p style={{
          fontSize: isGenesis ? 13 : 17,
          color: "rgba(148, 163, 184, 0.8)",
          lineHeight: 1.75,
          maxWidth: isGenesis ? 480 : 540,
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          letterSpacing: "0.01em",
          opacity: scene > 0.2 ? 1 : 0,
          transform: `translateY(${scene > 0.2 ? 0 : 10}px)`,
          transition: "opacity 0.9s 0.15s ease-out, transform 0.9s 0.15s var(--ease-out-expo)",
        }}>
          {data.sub}
        </p>
      )}
    </div>
  );
}
