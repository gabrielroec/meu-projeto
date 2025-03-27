"use client";
import { motion } from "framer-motion";
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

const HeroSection = () => {
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-40 relative">
      {/* Galáxia em Three.js */}
      <div className="absolute inset-0 z-0" style={{ height: "100vh", top: "-40vh" }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <Galaxy mouseX={mousePosition.x} mouseY={mousePosition.y} />
        </Canvas>
      </div>

      {/* Conteúdo existente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full relative z-10"
      >
        <motion.h1
          className="text-2xl md:text-4xl lg:text-6xl font-bold leading-tight mb-8 text-left max-w-[90%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            "Nós",
            "criamos",
            "sites",
            "de",
            "outro",
            "mundo,",
            "qualidade",
            "de uma",
            "agência",
            "pelo",
            "preço",
            "de um",
            "profissional",
          ].map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
          <br />
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}>
          <motion.button
            className="px-8 py-4 bg-black text-white rounded-full text-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Faça um orçamento
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
