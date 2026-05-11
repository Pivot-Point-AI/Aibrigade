"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, Suspense, useEffect } from "react";
import * as THREE from "three";
import { useIsMobile } from "./hooks";

function Particles({ progress, accent }: { progress: number; accent: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const sizes = useMemo(() => {
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      sz[i] = Math.random() * 0.12 + 0.03;
    }
    return sz;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const color = new THREE.Color(accent);
    for (let i = 0; i < count; i++) {
      const variation = 0.1 * (Math.random() - 0.5);
      cols[i * 3] = color.r + variation;
      cols[i * 3 + 1] = color.g + variation;
      cols[i * 3 + 2] = color.b + variation;
    }
    return cols;
  }, [accent]);

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.elapsedTime;
      pointsRef.current.rotation.y = t * 0.03;
      pointsRef.current.rotation.x = Math.sin(t * 0.015) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function WireframeCore({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[2.5, 0.04, 16, 48]} />
        <meshBasicMaterial color="#2596be" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.03, 16, 32]} />
        <meshBasicMaterial color="#2596be" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[1.8, 0.02, 12, 24]} />
        <meshBasicMaterial color="#2596be" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function FloatingShapes({ progress }: { progress: number }) {
  const shapesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (shapesRef.current) {
      const t = state.clock.elapsedTime;
      shapesRef.current.children.forEach((child, i) => {
        child.rotation.x = t * (0.1 + i * 0.05);
        child.rotation.y = t * (0.05 + i * 0.03);
        child.position.y = Math.sin(t * (0.3 + i * 0.2)) * 0.3;
      });
    }
  });

  return (
    <group ref={shapesRef}>
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#2596be" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#2596be" transparent opacity={0.3} />
      </mesh>
      <mesh position={[3, 2, -4]}>
        <tetrahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color="#2596be" transparent opacity={0.2} />
      </mesh>
      <mesh position={[-3, -2, -5]}>
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color="#2596be" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function Grid() {
  const gridRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.z = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial color="#020817" wireframe transparent opacity={0.05} />
    </mesh>
  );
}

export function Scene3D({ progress, accent }: { progress: number; accent: string }) {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 3,
      pointerEvents: "none",
      opacity: 0.6,
    }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={null}>
          <Particles progress={progress} accent={accent} />
          <WireframeCore progress={progress} />
          <FloatingShapes progress={progress} />
          <Grid />
        </Suspense>
      </Canvas>
    </div>
  );
}