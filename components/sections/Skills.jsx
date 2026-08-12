"use client";

import { useRef, useState, useMemo, Suspense } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/lib/data";

function SkillGlobe({ skillList }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.06) * 0.15;
  });

  const positions = useMemo(() => {
    const count = skillList.length;
    return skillList.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 2.2;
      return [
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ];
    });
  }, [skillList]);

  const surfacePoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 140; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 2.2;
      pts.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    return new Float32Array(pts);
  }, []);

  return (
    <group ref={groupRef}>
      {/* Outer atmosphere glow */}
      <Sphere args={[2.5, 32, 32]}>
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>
      {/* Ghost wireframe sphere */}
      <Sphere args={[2.2, 32, 32]}>
        <meshBasicMaterial
          color="#60a5fa"
          wireframe
          transparent
          opacity={0.45}
        />
      </Sphere>
      {/* Surface points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[surfacePoints, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#3b82f6"
          size={0.035}
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      {/* Inner glow sphere */}
      <Sphere args={[0.6, 32, 32]}>
        <meshStandardMaterial
          color="#1d4ed8"
          transparent
          opacity={0.6}
          roughness={0}
          metalness={0.2}
          emissive="#3b82f6"
          emissiveIntensity={1.4}
        />
      </Sphere>
      <Sphere args={[0.85, 32, 32]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {skillList.map((skill, i) => (
        <Html key={skill.name} position={positions[i]} center distanceFactor={8}>
          <div
            className="tech-badge pointer-events-none select-none"
            style={{ fontSize: "10px", padding: "2px 8px", whiteSpace: "nowrap" }}
          >
            {skill.name}
          </div>
        </Html>
      ))}
    </group>
  );
}

const categoryColors = {
  "AI / ML": { text: "#818cf8", hex: "#6366f1" },
  "Backend": { text: "#a78bfa", hex: "#8b5cf6" },
  "Frontend": { text: "#22d3ee", hex: "#06b6d4" },
  "DevOps / Tools": { text: "#34d399", hex: "#10b981" },
};

const categoryIcons = {
  "AI / ML": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a3 3 0 1 0-6 0" />
    <path d="M12 18v3" />
    <circle cx="12" cy="21" r="1" />
  </svg>

  ,
  "Backend": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="15" x2="12" y2="19" />
  </svg>
  ,
  "Frontend": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#047857" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2 2 7l10 5 10-5-10-5Z" />
    <path d="m2 17 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </svg>

  ,
  "DevOps / Tools": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    <path d="m11 13-3.5 3.5" />
    <path d="m16 8 3.5-3.5" />
  </svg>

  ,
};

function SkillBar({ name, level, color, index }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.035, duration: 0.35 }}
      className="group"
    >
      <div className="mb-1.5 flex justify-between">
        <span
          className="text-sm font-medium transition-colors group-hover:text-white"
          style={{ color: "var(--text-secondary)" }}
        >
          {name}
        </span>
        <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
          {level}%
        </span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full" style={{ background: "var(--track)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay: 0.2 + index * 0.035, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef();
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const categories = Object.keys(skills);
  const [active, setActive] = useState(categories[0]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_70%_60%,rgba(139,92,246,0.05),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="section-number mb-4">02 — Skills</span>
          <h2
            className="text-4xl font-black tracking-tight md:text-6xl"
            style={{ color: "var(--text-primary)" }}
          >
            The <span className="gradient-text">tech stack</span>
          </h2>
          <p className="mt-4 max-w-md text-sm" style={{ color: "var(--text-secondary)" }}>
            Tools I use daily to build production AI systems — from model to infrastructure.
          </p>
        </motion.div>


        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">


          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[420px] w-full overflow-hidden rounded-2xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >

            <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} gl={{ alpha: true }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} color="#818cf8" intensity={1.5} />
              <pointLight position={[-5, -5, 3]} color="#06b6d4" intensity={1.0} />
              <Suspense fallback={null}>
                <SkillGlobe skillList={skills[active]} />
              </Suspense>
            </Canvas>


            <div className="absolute bottom-5 left-0 right-0 flex justify-center">
              <span className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                {categoryIcons[active]} {active} · {skills[active].length} skills
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const { text, hex } = categoryColors[cat];
                const isActive = active === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all"
                    style={{
                      background: isActive ? `${hex}15` : "var(--bg-card)",
                      border: `1px solid ${isActive ? `${hex}35` : "var(--border)"}`,
                      color: isActive ? text : "var(--text-muted)",
                    }}
                  >
                    {categoryIcons[cat]} {cat}
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="glass-card rounded-2xl p-6 space-y-4"
              >
                {skills[active].map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={categoryColors[active].hex}
                    index={i}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-14 flex flex-wrap justify-center gap-2"
        >
          {["LangChain", "OpenAI", "Pinecone", "FastAPI", "PostgreSQL", "Redis",
            "Docker", "AWS", "React", "Next.js", "PyTorch", "CrewAI"].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.03 }}
                whileHover={{ scale: 1.08, y: -3 }}
                className="tech-badge cursor-default text-xs"
              >
                {tech}
              </motion.span>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
