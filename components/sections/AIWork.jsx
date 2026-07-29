"use client";

import { useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, MeshDistortMaterial, Float } from "@react-three/drei";
import { aiWork } from "@/lib/data";

function TorusRing() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });
  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <Torus ref={ref} args={[1, 0.25, 32, 100]}>
        <MeshDistortMaterial
          color="#6366f1"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </Torus>
    </Float>
  );
}

function AIWorkCard({ item, index }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative glass-card rounded-2xl p-7 hover-glow overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      {/* Background glow */}
      <div
        className="absolute -top-20 -right-20 h-40 w-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: item.accent }}
      />

      {/* Icon */}
      <div className="mb-5 flex items-center gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl relative"
          style={{
            background: `${item.accent}15`,
            border: `1px solid ${item.accent}30`,
            boxShadow: `0 0 20px ${item.accent}15`,
          }}
        >
          {item.icon}
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">{item.title}</h3>
          <div
            className="mt-1 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-16"
            style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed mb-5">{item.description}</p>

      {/* Capabilities */}
      <ul className="space-y-2">
        {item.capabilities.map((cap, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.12 + 0.3 + i * 0.06 }}
            className="flex items-center gap-2.5 text-xs text-slate-500"
          >
            <div
              className="h-1 w-1 rounded-full flex-shrink-0"
              style={{ background: item.accent }}
            />
            {cap}
          </motion.li>
        ))}
      </ul>

      {/* Bottom gradient bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
      />
    </motion.div>
  );
}

export default function AIWork() {
  const sectionRef = useRef();
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="ai-work"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#07071a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(99,102,241,0.08),transparent)]" />

      {/* 3D element — positioned in background */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-30 pointer-events-none hidden lg:block">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} color="#6366f1" intensity={2} />
          <pointLight position={[-5, -5, 5]} color="#06b6d4" intensity={1.5} />
          <Suspense fallback={null}>
            <TorusRing />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="section-number">05 — AI Work</span>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              Where AI meets{" "}
              <span className="gradient-text">engineering</span>
            </h2>
            <p className="mt-4 text-slate-500 text-sm max-w-md leading-relaxed">
              My core differentiation — I don't just use AI models, I build the infrastructure and orchestration layers that make them reliable, fast, and cost-efficient in production.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 lg:justify-end"
          >
            {[
              { label: "LLM Calls / Day", value: "500K+" },
              { label: "Avg Latency", value: "<800ms" },
              { label: "Cost Saved", value: "60%" },
            ].map((m) => (
              <div
                key={m.label}
                className="glass-card rounded-xl px-5 py-4 text-center"
              >
                <p className="text-xl font-black gradient-text">{m.value}</p>
                <p className="text-[10px] text-slate-600 mt-0.5">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* AI Work cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {aiWork.map((item, i) => (
            <AIWorkCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Tech pipeline visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-16 glass-card rounded-2xl p-8 overflow-x-auto"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-600 mb-6">
            Typical AI System Architecture
          </p>
          <div className="flex items-center gap-2 min-w-max">
            {[
              { label: "User Input", icon: "👤", color: "#6366f1" },
              { label: "→", icon: null, color: null },
              { label: "LLM Router", icon: "🧭", color: "#8b5cf6" },
              { label: "→", icon: null, color: null },
              { label: "Vector Store", icon: "🗃️", color: "#a78bfa" },
              { label: "→", icon: null, color: null },
              { label: "Agent Layer", icon: "🤖", color: "#6366f1" },
              { label: "→", icon: null, color: null },
              { label: "Tool Calls", icon: "⚡", color: "#06b6d4" },
              { label: "→", icon: null, color: null },
              { label: "Response", icon: "✅", color: "#10b981" },
            ].map((step, i) =>
              step.icon ? (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 rounded-xl px-4 py-3 text-xs font-medium"
                  style={{
                    background: `${step.color}10`,
                    border: `1px solid ${step.color}20`,
                    color: step.color,
                  }}
                >
                  <span className="text-lg">{step.icon}</span>
                  <span>{step.label}</span>
                </div>
              ) : (
                <span key={i} className="text-slate-700 text-lg font-light">
                  →
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
