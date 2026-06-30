"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { useIsMobile } from "./hooks";

function Particles({ accent }: { accent: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 220;

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const color = new THREE.Color(accent);
    const secondary = new THREE.Color("#C084FC");
    for (let i = 0; i < count; i++) {
      // Layered shells for more depth than a single sphere
      const shell = Math.random();
      const r = shell < 0.6 ? 7 + Math.random() * 5 : 13 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const mix = Math.random();
      const c = color.clone().lerp(secondary, mix * 0.45);
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      siz[i] = shell < 0.6 ? 0.05 + Math.random() * 0.05 : 0.02 + Math.random() * 0.03;
    }
    return [pos, col, siz];
  }, [accent]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.035;
    pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.08;
    pointsRef.current.rotation.z = Math.cos(t * 0.012) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
        <bufferAttribute attach="attributes-size"      args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.75} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function WireframeCore({ accent }: { accent: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.12;
    const pulse = 1 + Math.sin(t * 0.6) * 0.015;
    groupRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[2.5, 0.045, 16, 48]} />
        <meshBasicMaterial color={accent} transparent opacity={0.45} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.032, 12, 36]} />
        <meshBasicMaterial color={accent} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[1.8, 0.022, 10, 28]} />
        <meshBasicMaterial color="#C084FC" transparent opacity={0.22} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function FloatingShapes({ accent }: { accent: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = t * (0.1 + i * 0.05);
      child.rotation.y = t * (0.05 + i * 0.03);
      (child as THREE.Mesh).position.y = Math.sin(t * (0.3 + i * 0.2)) * 0.35;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.4} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#C084FC" transparent opacity={0.28} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[3, 2, -4]}>
        <tetrahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color={accent} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[-3.4, -1.6, -3]}>
        <icosahedronGeometry args={[0.28, 0]} />
        <meshBasicMaterial color="#C084FC" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export function Scene3D({ progress, accent }: { progress: number; accent: string }) {
  const isMobile = useIsMobile();
  // Delay mount until after hydration to avoid SSR/client mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted || isMobile) return null;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", opacity: 0.65 }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          // Ensure context is properly disposed on unmount
          const canvas = gl.domElement;
          const handleContextLost = (e: Event) => {
            e.preventDefault();
          };
          canvas.addEventListener("webglcontextlost", handleContextLost);
          return () => canvas.removeEventListener("webglcontextlost", handleContextLost);
        }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#0D1635", 8, 22]} />
          <Particles accent={accent} />
          <WireframeCore accent={accent} />
          <FloatingShapes accent={accent} />
        </Suspense>
      </Canvas>
    </div>
  );
}

