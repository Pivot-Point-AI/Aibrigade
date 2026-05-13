import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        "bg-secondary": "var(--bg-soft)",
        surface: "var(--card)",
        "surface-2": "rgba(255,255,255,0.04)",
        "surface-3": "rgba(255,255,255,0.07)",
        border: "var(--border)",
        "border-light": "rgba(255,255,255,0.14)",
        "border-hover": "rgba(255,255,255,0.22)",

        /* Primary = Electric Cyan */
        cyan: {
          DEFAULT: "#00D4FF",
          dark: "#0099CC",
          light: "#7EEEFF",
        },

        /* Secondary = Neon Violet */
        violet: {
          DEFAULT: "#9B4DFF",
          light: "#C084FC",
          dark: "#7B2FE0",
        },
        gold: {
          DEFAULT: "#00D4FF",
          light: "#7EEEFF",
        },

        success: {
          DEFAULT: "#10B981",   // emerald green
          soft:    "#67E8F9",   // soft cyan alternative
          dark:    "#059669",
        },

        /* Text */
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "#6B7280",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body:    ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono:    ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontWeight: {
        "400": "400",
        "500": "500",
        "600": "600",
        "700": "700",
        "800": "800",
      },
      fontSize: {
        "display-2xl": ["clamp(3.25rem,6vw,5.75rem)", { lineHeight: "1.03", letterSpacing: "-0.04em" }],
        "display-xl":  ["clamp(2.5rem,4.5vw,4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "display-lg":  ["clamp(2rem,3.5vw,3.25rem)",   { lineHeight: "1.08", letterSpacing: "-0.03em"  }],
        "display-md":  ["clamp(1.6rem,2.5vw,2.35rem)",  { lineHeight: "1.13", letterSpacing: "-0.025em" }],
        "display-sm":  ["clamp(1.3rem,2vw,1.8rem)",     { lineHeight: "1.2",  letterSpacing: "-0.02em"  }],
      },
      boxShadow: {
        card: "0 2px 16px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07)",
        "card-md": "0 8px 28px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)",
        "card-hover":        "0 16px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,212,255,0.3), 0 0 30px rgba(0,212,255,0.1)",
        "card-hover-violet": "0 16px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(155,77,255,0.3), 0 0 30px rgba(155,77,255,0.1)",
        "glow-cyan":   "0 0 20px rgba(0,212,255,0.45), 0 0 60px rgba(0,212,255,0.18)",
        "glow-violet": "0 0 20px rgba(155,77,255,0.45), 0 0 60px rgba(155,77,255,0.18)",
        "glow-sm":     "0 0 12px rgba(0,212,255,0.4)",
        "inner-top": "inset 0 1px 0 rgba(255,255,255,0.08)",
        navbar: "0 1px 0 rgba(255,255,255,0.9), 0 8px 24px rgba(15,23,42,0.08)",
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out infinite 3s",
        "orb-1": "orbFloat1 20s ease-in-out infinite",
        "orb-2": "orbFloat2 25s ease-in-out infinite",
        "orb-3": "orbFloat3 30s ease-in-out infinite",
        beam: "beam 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 6s ease infinite",
        "scroll-x": "scrollX 35s linear infinite",
        "scroll-x-reverse": "scrollXReverse 35s linear infinite",
        "scan-line": "scanLine 8s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "border-spin": "borderSpin 4s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        orbFloat1: {
          "0%,100%": { transform: "translate(0px,0px) scale(1)" },
          "33%": { transform: "translate(35px,-35px) scale(1.06)" },
          "66%": { transform: "translate(-22px,22px) scale(0.94)" },
        },
        orbFloat2: {
          "0%,100%": { transform: "translate(0px,0px) scale(1)" },
          "33%": { transform: "translate(-45px,22px) scale(1.08)" },
          "66%": { transform: "translate(28px,-18px) scale(0.93)" },
        },
        orbFloat3: {
          "0%,100%": { transform: "translate(0px,0px) scale(1)" },
          "33%": { transform: "translate(22px,42px) scale(0.95)" },
          "66%": { transform: "translate(-32px,-28px) scale(1.06)" },
        },
        beam: {
          "0%,100%": { opacity: "0.25", transform: "scaleX(0.8)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        scrollX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollXReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        scanLine: {
          "0%": { top: "-5%", opacity: "0" },
          "5%": { opacity: "0.8" },
          "95%": { opacity: "0.8" },
          "100%": { top: "105%", opacity: "0" },
        },
        glowPulse: {
          "0%,100%": { boxShadow: "0 0 15px rgba(59,130,246,0.25)" },
          "50%":     { boxShadow: "0 0 40px rgba(59,130,246,0.5), 0 0 80px rgba(59,130,246,0.16)" },
        },
        borderSpin: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
