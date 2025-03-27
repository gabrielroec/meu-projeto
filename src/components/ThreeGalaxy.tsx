"use client";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// Componente mais simples para teste
function SimpleBox() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default function ThreeGalaxy() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <SimpleBox />
    </Canvas>
  );
}
