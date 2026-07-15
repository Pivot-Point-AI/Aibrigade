import React from "react";
import { SceneData } from "./types";
import { useIsMobile } from "./hooks";
import { Badge } from "@/components/ui/Card";

// opacity is now 1 (active) or 0 (inactive) — CSS transition handles the fade
export function SceneWrapper({ opacity, children }: { opacity: number; children: React.ReactNode }) {
  const isVisible = opacity > 0.5;
  return (
    <div style={{
      position: "absolute", inset: 0,
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? "visible" : "hidden",
      transform: isVisible ? "scale(1) translateY(0px)" : "scale(0.985) translateY(8px)",
      filter: isVisible ? "blur(0px)" : "blur(2px)",
      transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease",
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
          marginBottom: 22,
          opacity: scene > 0.15 ? 1 : 0,
          transform: `translateY(${scene > 0.15 ? 0 : 12}px)`,
          transition: "opacity 0.8s ease, transform 0.8s var(--ease-out-expo)",
        }}>
          <Badge variant={data.accent === "#9B4DFF" ? "violet" : "cyan"} size="md" dot>
            {data.id}
          </Badge>
        </div>
      )}

      {/* Main headline */}
      <h2 style={{
        fontSize: isGenesis
          ? (isMobile ? "clamp(1.8rem, 9vw, 2.4rem)" : "clamp(3.1rem, 5vw, 4.6rem)")
          : (isMobile ? "clamp(1.4rem, 6.5vw, 1.9rem)" : "clamp(2.2rem, 4.8vw, 4rem)"),
        fontFamily: "'Inter', sans-serif",
        color: "#F8FAFC",
        fontWeight: 800,
        lineHeight: 1.06,
        margin: isGenesis
          ? (isMobile ? "10px 0 6px" : "16px 0 14px")
          : (isMobile ? "10px 0 6px" : "28px 0 18px"),
        letterSpacing: isGenesis ? "0.01em" : "-0.025em",
        opacity: 1,
        transform: "translateY(0px)",
        transition: "opacity 0.9s ease-out, transform 0.9s var(--ease-out-expo)",
        maxWidth: isGenesis ? (isMobile ? "none" : "860px") : "740px",
      }}>
        {isGenesis && (data.headline.includes("AI Brigade") || data.headline.includes("Private LLMs")) ? (() => {
          const highlight = data.headline.includes("AI Brigade") ? "AI Brigade" : "Private LLMs";
          const idx = data.headline.indexOf(highlight);
          const before = data.headline.slice(0, idx);
          const after = data.headline.slice(idx + highlight.length);
          return (
            <>
              {before}
              <span style={{
                background: "linear-gradient(115deg, #00D4FF 0%, #9B4DFF 50%, #00D4FF 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-shift 4s linear infinite",
              }}>
                {highlight}
              </span>
              <span style={{
                color: "rgba(248, 250, 252, 0.82)",
                opacity: 1,
                display: "inline",
                transition: "opacity 1.2s 0.3s ease-out",
              }}>
                {after}
              </span>
            </>
          );
        })() : (
          data.headline
        )}
      </h2>

      {/* Subtitle */}
      {data.sub && isGenesis ? (() => {
        const [tagline, descriptor] = data.sub.split(/\.\s+(?=[A-Z])/);
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
          fontSize: isMobile ? 13.5 : 17.5,
          color: "rgba(203, 213, 225, 0.88)",
          lineHeight: 1.75,
          maxWidth: 560,
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          letterSpacing: "0.012em",
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

