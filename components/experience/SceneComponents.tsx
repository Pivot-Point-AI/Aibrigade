import React from "react";
import { SceneData } from "./types";
import { useIsMobile } from "./hooks";

// opacity is now 1 (active) or 0 (inactive) — CSS transition handles the fade
export function SceneWrapper({ opacity, children }: { opacity: number; children: React.ReactNode }) {
  const isVisible = opacity > 0.5;
  return (
    <div style={{
      position: "absolute", inset: 0,
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? "visible" : "hidden",
      transition: "opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
      display: "flex", alignItems: "center", justifyContent: "center",
      pointerEvents: isVisible ? "auto" : "none",
      zIndex: isVisible ? 10 : 0,
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
      opacity: 1,
      transition: "opacity 0.6s ease-out",
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      padding: isMobile ? "0 16px" : "0 24px",
    }}>

      {/* Scene identifier pill */}
      {!isGenesis && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "5px 16px",
          border: `1px solid ${data.accent}55`,
          borderRadius: 20,
          background: `${data.accent}10`,
          marginBottom: 22,
          opacity: scene > 0.15 ? 1 : 0,
          transform: `translateY(${scene > 0.15 ? 0 : 12}px)`,
          transition: "opacity 0.8s ease, transform 0.8s var(--ease-out-expo)",
          backdropFilter: "blur(8px)",
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: data.accent,
            boxShadow: `0 0 10px ${data.accent}, 0 0 4px ${data.accent}`,
          }} />
          <span style={{
            fontSize: 9, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.35em",
            color: data.accent, textTransform: "uppercase", fontWeight: 600,
          }}>
            {data.id.toUpperCase()}
          </span>
        </div>
      )}

      {/* Main headline */}
      <h2 style={{
        fontSize: isGenesis
          ? (isMobile ? "clamp(1.6rem, 8vw, 2.2rem)" : "clamp(2.8rem, 4.5vw, 4.2rem)")
          : (isMobile ? "clamp(1.3rem, 6vw, 1.8rem)" : "clamp(2rem, 4.5vw, 3.8rem)"),
        fontFamily: "'Playfair Display', Georgia, serif",
        color: "#F8FAFC",
        fontWeight: 700,
        lineHeight: 1.1,
        margin: isGenesis
          ? (isMobile ? "10px 0 6px" : "16px 0 14px")
          : (isMobile ? "10px 0 6px" : "28px 0 18px"),
        letterSpacing: isGenesis ? "0.02em" : "-0.02em",
        opacity: 1,
        transform: "translateY(0px)",
        transition: "opacity 0.9s ease-out, transform 0.9s var(--ease-out-expo)",
        maxWidth: isGenesis ? (isMobile ? "none" : "820px") : "700px",
      }}>
        {isGenesis && data.headline.includes("AI Brigade") ? (
          <>
            <span style={{
              background: "linear-gradient(115deg, #00D4FF 0%, #9B4DFF 50%, #00D4FF 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradient-shift 4s linear infinite",
            }}>
              AI Brigade
            </span>
            <span style={{
              color: "rgba(248, 250, 252, 0.82)",
              opacity: 1,
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
      {data.sub && isGenesis ? (() => {
        const [tagline, descriptor] = data.sub.split(" — ");
        return (
          <div style={{
            opacity: 1,
            transform: "translateY(0px)",
            transition: "opacity 0.9s 0.15s ease-out, transform 0.9s 0.15s var(--ease-out-expo)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: isMobile ? 6 : 10,
          }}>
            {/* Bold tagline */}
            <p style={{
              fontSize: isMobile ? "clamp(0.85rem, 4vw, 1rem)" : "clamp(1rem, 1.5vw, 1.25rem)",
              color: "rgba(226, 232, 240, 0.95)",
              lineHeight: 1.4,
              margin: 0,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.01em",
              maxWidth: isMobile ? "100%" : 600,
            }}>
              {tagline}
            </p>
            {/* Supporting descriptor */}
            {descriptor && (
              <p style={{
                fontSize: isMobile ? 12 : 14,
                color: "rgba(203, 213, 225, 0.9)",
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                letterSpacing: "0.01em",
                maxWidth: isMobile ? "100%" : 520,
              }}>
                {descriptor}
              </p>
            )}
          </div>
        );
      })() : data.sub ? (
        <p style={{
          fontSize: isMobile ? 13 : 17,
          color: "rgba(148, 163, 184, 0.85)",
          lineHeight: 1.8,
          maxWidth: 540,
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          letterSpacing: "0.02em",
          opacity: 1,
          transform: "translateY(0px)",
          transition: "opacity 0.9s 0.15s ease-out, transform 0.9s 0.15s var(--ease-out-expo)",
        }}>
          {data.sub}
        </p>
      ) : null}
    </div>
  );
}
