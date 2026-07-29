"use client";

import { useRef, useState, useMemo, Suspense } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Sphere } from "@react-three/drei";
import { skills } from "@/lib/data";

/* ─── 3D Skill Globe ─── */
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

  return (
    <group ref={groupRef}>
      {/* Ghost sphere */}
      <Sphere args={[2.2, 32, 32]}>
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.04}
        />
      </Sphere>
      {/* Inner glow sphere */}
      <Sphere args={[0.6, 32, 32]}>
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.18}
          roughness={0}
          metalness={0.9}
        />
      </Sphere>

      {/* Skill labels */}
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

/* ─── Skill Bar ─── */
const categoryColors = {
  "AI / ML":       { text: "#818cf8", hex: "#6366f1" },
  "Backend":       { text: "#a78bfa", hex: "#8b5cf6" },
  "Frontend":      { text: "#22d3ee", hex: "#06b6d4" },
  "DevOps / Tools":{ text: "#34d399", hex: "#10b981" },
};

const categoryIcons = {
  "AI / ML": "🧠",
  "Backend": "⚙️",
  "Frontend": "🎨",
  "DevOps / Tools": "🛠️",
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
      <div className="h-[3px] w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
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
      {/* subtle radial */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_70%_60%,rgba(139,92,246,0.05),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
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

        {/* Main grid: 3D globe + skill bars */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">

          {/* Left — 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[420px] w-full overflow-hidden rounded-2xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            {/* Canvas */}
            <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} gl={{ alpha: true }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]}   color="#818cf8" intensity={1.5} />
              <pointLight position={[-5, -5, 3]} color="#06b6d4" intensity={1.0} />
              <Suspense fallback={null}>
                <SkillGlobe skillList={skills[active]} />
              </Suspense>
            </Canvas>

            {/* Overlay label */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center">
              <span className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                {categoryIcons[active]} {active} · {skills[active].length} skills
              </span>
            </div>
          </motion.div>

          {/* Right — Tabs + bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-5"
          >
            {/* Category tabs */}
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

            {/* Skill bars */}
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

        {/* Tech cloud */}
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
