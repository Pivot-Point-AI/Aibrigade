"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap, Globe, TrendingUp, Brain } from "lucide-react";

const STATS = [
  { value: "500+", label: "AI Models Deployed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "10x", label: "Faster Development" },
  { value: "$2B+", label: "Value Generated" },
];

const FLOATING_TAGS = [
  { label: "GPT-4o Integration", icon: Brain, x: "8%", y: "25%", delay: 0 },
  { label: "99.9% Uptime", icon: Shield, x: "82%", y: "18%", delay: 0.3 },
  { label: "Real-time AI", icon: Zap, x: "88%", y: "70%", delay: 0.6 },
  { label: "Global Scale", icon: Globe, x: "4%", y: "72%", delay: 0.9 },
];

function AnimatedGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.08),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(6,182,212,0.06),rgba(255,255,255,0))]" />

      {/* Animated grid highlight lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(79,70,229,0)" />
            <stop offset="50%" stopColor="rgba(79,70,229,0.8)" />
            <stop offset="100%" stopColor="rgba(79,70,229,0)" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(6,182,212,0)" />
            <stop offset="50%" stopColor="rgba(6,182,212,0.8)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0)" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0" y1="33%" x2="100%" y2="33%"
          stroke="url(#lineGrad1)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.line
          x1="0" y1="67%" x2="100%" y2="67%"
          stroke="url(#lineGrad1)" strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
        />
        <motion.line
          x1="33%" y1="0" x2="33%" y2="100%"
          stroke="url(#lineGrad2)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.0, ease: "easeInOut" }}
        />
        <motion.line
          x1="67%" y1="0" x2="67%" y2="100%"
          stroke="url(#lineGrad2)" strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.2, ease: "easeInOut" }}
        />
      </svg>

      {/* Glowing intersection dots */}
      {[
        { cx: "33%", cy: "33%", r: 3, color: "#4F46E5", delay: 1.5 },
        { cx: "67%", cy: "33%", r: 2, color: "#06B6D4", delay: 1.7 },
        { cx: "33%", cy: "67%", r: 2, color: "#8B5CF6", delay: 1.9 },
        { cx: "67%", cy: "67%", r: 3, color: "#06B6D4", delay: 2.1 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: dot.cx,
            top: dot.cy,
            width: dot.r * 2,
            height: dot.r * 2,
            background: dot.color,
            boxShadow: `0 0 12px ${dot.color}`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.7] }}
          transition={{ delay: dot.delay, duration: 0.5 }}
        />
      ))}
    </div>
  );
}

function FloatingOrbs() {
  return (
    <>
      <div
        className="orb w-[600px] h-[600px] animate-float1"
        style={{
          top: "-15%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, rgba(79,70,229,0.04) 50%, transparent 70%)",
        }}
      />
      <div
        className="orb w-[500px] h-[500px] animate-float2"
        style={{
          top: "30%",
          right: "-15%",
          background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(6,182,212,0.03) 50%, transparent 70%)",
          animationDelay: "-3s",
        }}
      />
      <div
        className="orb w-[400px] h-[400px] animate-float3"
        style={{
          bottom: "10%",
          left: "20%",
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.02) 50%, transparent 70%)",
          animationDelay: "-6s",
        }}
      />
    </>
  );
}

function AIPreviewCard() {
  const [activeMetric, setActiveMetric] = useState(0);
  const metrics = [
    { label: "Accuracy", value: 99.2, color: "#4F46E5" },
    { label: "Speed", value: 97.8, color: "#06B6D4" },
    { label: "Efficiency", value: 94.5, color: "#8B5CF6" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveMetric(p => (p + 1) % 3), 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
      className="relative glass rounded-3xl border border-[rgba(15,23,42,0.08)] shadow-xl overflow-hidden max-w-md mx-auto"
      style={{ boxShadow: "0 32px 80px rgba(15,23,42,0.1), 0 8px 32px rgba(15,23,42,0.06)" }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[rgba(15,23,42,0.06)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-emerald-700">AI Model Live</span>
          </div>
        </div>
        <div className="text-[13px] font-semibold text-primary">AI Brigade Dashboard</div>
        <div className="text-[11px] text-slate-400 mt-0.5">Enterprise Intelligence Platform v3.1</div>
      </div>

      {/* Metrics */}
      <div className="p-5 space-y-4">
        {/* Performance chart */}
        <div className="space-y-3">
          {metrics.map((metric, i) => (
            <div key={metric.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[12px] font-medium text-slate-600">{metric.label}</span>
                <motion.span
                  className="text-[12px] font-bold"
                  style={{ color: metric.color }}
                  animate={{ opacity: activeMetric === i ? 1 : 0.5 }}
                >
                  {metric.value}%
                </motion.span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: metric.color }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${metric.value}%`,
                    opacity: activeMetric === i ? 1 : 0.5,
                  }}
                  transition={{ duration: 1.5, delay: 1.5 + i * 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Live requests */}
        <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-[rgba(15,23,42,0.05)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Live Requests/s
            </span>
            <TrendingUp size={12} className="text-emerald-500" />
          </div>
          <div className="flex items-end gap-1 h-12">
            {[40, 65, 45, 80, 55, 90, 72, 95, 68, 88, 76, 99].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  background: `linear-gradient(to top, #4F46E5, #06B6D4)`,
                  height: `${h}%`,
                  opacity: 0.7 + (i / 12) * 0.3,
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.8 + i * 0.05, duration: 0.4, ease: "easeOut" }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-[11px] font-bold text-primary">12,450 req/s</span>
            <span className="text-[11px] text-emerald-600 font-semibold">↑ 24.5%</span>
          </div>
        </div>
      </div>

      {/* Gradient bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue via-soft-purple to-accent-cyan" />
    </motion.div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } },
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Background */}
      <AnimatedGridBackground />
      <FloatingOrbs />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-texture pointer-events-none opacity-40" />

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center py-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[rgba(79,70,229,0.2)] shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="flex -space-x-1">
                {["#4F46E5", "#06B6D4", "#8B5CF6"].map((c, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border-2 border-white"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span className="text-[13px] font-semibold text-slate-700">
                Trusted by 500+ enterprises worldwide
              </span>
              <Sparkles size={13} className="text-accent-blue" />
            </motion.div>
          </motion.div>

          {/* Main headline */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-[3.2rem] sm:text-[4.5rem] lg:text-[6rem] xl:text-[7rem] font-extrabold tracking-[-0.04em] leading-[1.0] text-primary max-w-5xl mx-auto">
              The{" "}
              <span className="relative inline-block">
                <span className="text-gradient-animate">AI Layer</span>
                <motion.div
                  className="absolute -inset-2 rounded-xl opacity-20"
                  style={{
                    background: "linear-gradient(135deg, rgba(79,70,229,0.3), rgba(6,182,212,0.3))",
                    filter: "blur(20px)",
                  }}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
              {" "}for Your{" "}
              <br className="hidden sm:block" />
              Enterprise Future
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            We architect, build, and deploy cutting-edge AI systems that transform
            operations, accelerate growth, and create lasting competitive advantages.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#contact"
              className="group relative px-8 py-4 text-[15px] font-semibold text-white rounded-2xl overflow-hidden btn-glow shadow-lg"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#06B6D4] bg-[length:200%_100%] animate-[gradientShift_3s_ease_infinite]" />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
              <span className="relative z-10 flex items-center gap-2.5">
                Start Building Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 shadow-glow-blue opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            <motion.a
              href="#solutions"
              className="group px-8 py-4 text-[15px] font-semibold text-primary rounded-2xl border border-[rgba(15,23,42,0.12)] bg-white hover:bg-slate-50 hover:border-[rgba(79,70,229,0.3)] transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                Watch Demo
              </span>
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-6"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 glass rounded-2xl border border-[rgba(15,23,42,0.06)] shadow-sm"
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(15,23,42,0.1)" }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="text-2xl sm:text-3xl font-extrabold gradient-text-blue mb-1">
                  {stat.value}
                </div>
                <div className="text-[12px] text-slate-500 font-medium leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* AI Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mt-20 relative"
        >
          <div className="max-w-lg mx-auto">
            <AIPreviewCard />
          </div>

          {/* Floating badge cards */}
          {FLOATING_TAGS.map((tag) => {
            const Icon = tag.icon;
            return (
              <motion.div
                key={tag.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + tag.delay, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="absolute hidden xl:flex items-center gap-2 glass px-3.5 py-2.5 rounded-xl border border-[rgba(15,23,42,0.08)] shadow-md animate-float2"
                style={{
                  left: tag.x,
                  top: tag.y,
                  animationDelay: `${tag.delay}s`,
                }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.15), rgba(6,182,212,0.15))" }}>
                  <Icon size={14} className="text-accent-blue" />
                </div>
                <span className="text-[12px] font-semibold text-primary whitespace-nowrap">
                  {tag.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
          Scroll to explore
        </span>
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-slate-200 flex items-start justify-center pt-1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-2 rounded-full bg-accent-blue"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}