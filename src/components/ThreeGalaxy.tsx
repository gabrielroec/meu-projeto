"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

interface GalaxyProps {
  mouseX?: number;
  mouseY?: number;
}

function Galaxy({ mouseX, mouseY }: GalaxyProps) {
  const ref = useRef<THREE.Points>(null);
  const [points] = useState<THREE.Vector3[]>(() => {
    const points: THREE.Vector3[] = [];
    const numPoints = 5000;
    const radius = 10;

    for (let i = 0; i < numPoints; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radius;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const z = (Math.random() - 0.5) * 2;

      points.push(new THREE.Vector3(x, y, z));
    }

    return points;
  });

  useFrame((state, delta) => {
    if (!ref.current) return;

    ref.current.rotation.z += delta * 0.07;

    if (mouseX !== undefined && mouseY !== undefined) {
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouseY * 0.5, 0.5);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouseX * 0.5, 0.5);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
          args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <PointMaterial transparent color="#ffffff" size={0.05} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function ThreeGalaxy() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <Galaxy mouseX={mousePosition.x} mouseY={mousePosition.y} />
    </Canvas>
  );
}
