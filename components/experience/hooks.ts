"use client";
import { useState, useEffect, useRef } from "react";
import { MousePosition } from "./types";

export function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, velocity: 0 });
  const lastProgress = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? Math.min(1, window.scrollY / docH) : 0;
      const now = Date.now();
      const dt = Math.max(1, now - lastTime.current);
      const v = Math.abs(p - lastProgress.current) / dt;
      lastProgress.current = p;
      lastTime.current = now;
      setState({ progress: p, velocity: Math.min(v * 1000, 1) });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}

export function useMousePosition(): MousePosition & { velocity: number; isMoving: boolean } {
  const [pos, setPos] = useState<MousePosition & { velocity: number; isMoving: boolean }>({ 
    x: 0, y: 0, nx: 0, ny: 0, velocity: 0, isMoving: false 
  });
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(1, now - lastPos.current.time);
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const v = Math.sqrt(dx * dx + dy * dy) / dt;

      lastPos.current = { x: e.clientX, y: e.clientY, time: now };
      
      setPos({
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / window.innerWidth) * 2 - 1,
        ny: (e.clientY / window.innerHeight) * 2 - 1,
        velocity: Math.min(v * 20, 100), // Scaled velocity
        isMoving: true
      });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setPos(prev => ({ ...prev, isMoving: false, velocity: 0 }));
      }, 100);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  return pos;
}

export function useFollowMouse(mouse: MousePosition, lerp = 0.1): MousePosition {
  const [pos, setPos] = useState<MousePosition>(mouse);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const loop = () => {
      setPos((prev) => ({
        ...prev,
        x: prev.x + (mouse.x - prev.x) * lerp,
        y: prev.y + (mouse.y - prev.y) * lerp,
        nx: prev.nx + (mouse.nx - prev.nx) * lerp,
        ny: prev.ny + (mouse.ny - prev.ny) * lerp,
        velocity: mouse.velocity,
        isMoving: mouse.isMoving
      }));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mouse, lerp]);

  return pos;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}
