"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Zap, ArrowRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus } from "@react-three/drei";
import { stats } from "@/lib/data";

/* ─── 3D decoration ─── */
function FloatingGeo() {
  const icoRef = useRef();
  const torusRef = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (icoRef.current) {
      icoRef.current.rotation.x = elapsed * 0.18;
      icoRef.current.rotation.y = elapsed * 0.26;
    }
    if (torusRef.current) {
      torusRef.current.rotation.z = elapsed * 0.22;
      torusRef.current.rotation.x = elapsed * 0.14;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]}   color="#818cf8" intensity={2} />
      <pointLight position={[-3, -2, 2]} color="#06b6d4" intensity={1.5} />

      <Float speed={1.8} floatIntensity={0.5}>
        <Icosahedron ref={icoRef} args={[1, 0]}>
          <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.6} roughness={0.1} metalness={0.9} />
        </Icosahedron>
      </Float>

      <Float speed={1.2} floatIntensity={0.3}>
        <Torus ref={torusRef} args={[1.6, 0.03, 2, 80]}>
          <meshStandardMaterial color="#06b6d4" transparent opacity={0.5} roughness={0} metalness={1} />
        </Torus>
      </Float>
    </>
  );
}

/* ─── Animated counter ─── */
function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(parseFloat(current.toFixed(1)));
    }, 1400 / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef();
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.04),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <span className="section-number mb-4">01 — About</span>
          <h2
            className="text-4xl font-black tracking-tight md:text-6xl"
            style={{ color: "var(--text-primary)" }}
          >
            The mind behind{" "}
            <span className="gradient-text">the machines</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm" style={{ color: "var(--text-secondary)" }}>
            From designing circuits to training neural networks — driven by one obsession: building things that work at scale.
          </p>
        </motion.div>

        {/* Two-col layout */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20 items-start">

          {/* LEFT — Story */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-6"
          >
            {/* Avatar */}
            <div className="inline-flex items-center gap-4">
              <div className="relative h-20 w-20">
                <div className="absolute inset-0 rounded-2xl animated-border opacity-70" />
                <div
                  className="absolute inset-[2px] flex items-center justify-center rounded-[14px] text-3xl font-black text-white"
                  style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))" }}
                >
                  S
                </div>
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}> Syam Prasad Reddy</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Senior AI Engineer</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-500">Available for hire</span>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-5 text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <p>
                I started with <span className="font-semibold" style={{ color: "var(--text-primary)" }}>ECE circuits and signal processing</span> — spending late nights debugging hardware that refused to cooperate. That systematic, first-principles thinking never left me, even when I switched lanes.
              </p>
              <p>
                As an <span className="font-semibold" style={{ color: "var(--text-primary)" }}>SDE-1</span>, I shipped backend systems handling 500K+ daily requests. Then AI changed everything. I started building with LLMs on weekends, replaced entire workflows with a few thousand tokens, and never looked back.
              </p>
              <p>
                Today as a <span className="gradient-text font-semibold">Senior AI Engineer</span>, I architect systems where agents think, tools execute, and results scale — while obsessing over sub-second latency and single-digit error rates.
              </p>

              <blockquote
                className="border-l-2 border-indigo-500 pl-4 text-base italic"
                style={{ color: "var(--text-primary)" }}
              >
                "Good AI engineering isn't about the model — it's about the system around it."
              </blockquote>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span
                className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                <MapPin size={11} /> India
              </span>
              {["Multi-Agent Systems", "RAG at Scale", "LLM Fine-Tuning"].map((tag) => (
                <span key={tag} className="tech-badge text-xs">{tag}</span>
              ))}
            </div>

            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              See what I've built
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

          {/* RIGHT — Stats + 3D + card */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-4"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="glass-card rounded-2xl p-5 hover-glow"
                >
                  <p className="text-3xl font-black gradient-text tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs leading-tight" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* 3D canvas card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65 }}
              className="glass-card rounded-2xl overflow-hidden"
              style={{ height: 200 }}
            >
              <Canvas camera={{ position: [0, 0, 4], fov: 52 }} gl={{ alpha: true }}>
                <Suspense fallback={null}>
                  <FloatingGeo />
                </Suspense>
              </Canvas>
            </motion.div>

            {/* Skill bars */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className="mb-4 flex items-center gap-2">
                <Zap size={13} className="text-indigo-400" />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Core Expertise
                </span>
              </div>
              {[
                { label: "AI / LLM Engineering",     pct: 95 },
                { label: "Backend & System Design",  pct: 88 },
                { label: "MLOps & AI Infrastructure", pct: 82 },
              ].map(({ label, pct }) => (
                <div key={label} className="mb-3 last:mb-0">
                  <div className="mb-1.5 flex justify-between">
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{label}</span>
                    <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{pct}%</span>
                  </div>
                  <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.85, ease: "easeOut" }}
                      className="h-full rounded-full animated-border"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
