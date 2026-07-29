"use client";

import { useRef, useEffect, useState, Suspense, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, Icosahedron, Torus } from "@react-three/drei";
import * as THREE from "three";
import { ArrowRight, Linkedin, Mail, Cpu } from "lucide-react";
import GithubIcon from "@/components/ui/GithubIcon";
import { personalInfo } from "@/lib/data";

/* ─── Neural Network Nodes ─── */
function NeuralNetwork() {
  const groupRef = useRef();
  const linesRef = useRef();

  const { nodes, connections } = useMemo(() => {
    const nodeCount = 60;
    const nodes = Array.from({ length: nodeCount }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      ),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.003
      ),
    }));

    const connections = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].pos.distanceTo(nodes[j].pos);
        if (dist < 3.2) {
          connections.push([i, j, dist]);
        }
      }
    }
    return { nodes, connections };
  }, []);

  const positionsArray = useMemo(
    () => new Float32Array(nodes.length * 3),
    [nodes]
  );
  const linePositions = useMemo(
    () => new Float32Array(connections.length * 6),
    [connections]
  );

  useFrame(() => {
    nodes.forEach((node, i) => {
      node.pos.x += node.vel.x;
      node.pos.y += node.vel.y;
      node.pos.z += node.vel.z;
      if (Math.abs(node.pos.x) > 6) node.vel.x *= -1;
      if (Math.abs(node.pos.y) > 4) node.vel.y *= -1;
      if (Math.abs(node.pos.z) > 3) node.vel.z *= -1;
      positionsArray[i * 3] = node.pos.x;
      positionsArray[i * 3 + 1] = node.pos.y;
      positionsArray[i * 3 + 2] = node.pos.z;
    });

    connections.forEach(([a, b], i) => {
      linePositions[i * 6 + 0] = nodes[a].pos.x;
      linePositions[i * 6 + 1] = nodes[a].pos.y;
      linePositions[i * 6 + 2] = nodes[a].pos.z;
      linePositions[i * 6 + 3] = nodes[b].pos.x;
      linePositions[i * 6 + 4] = nodes[b].pos.y;
      linePositions[i * 6 + 5] = nodes[b].pos.z;
    });

    if (groupRef.current?.geometry?.attributes?.position) {
      groupRef.current.geometry.attributes.position.array = positionsArray.slice();
      groupRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (linesRef.current?.geometry?.attributes?.position) {
      linesRef.current.geometry.attributes.position.array = linePositions.slice();
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Node points */}
      <points ref={groupRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodes.length}
            array={positionsArray}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#818cf8"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.15}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

/* ─── Outer Particle Field ─── */
function ParticleField() {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent color="#a78bfa" size={0.025}
        sizeAttenuation depthWrite={false} opacity={0.45}
      />
    </Points>
  );
}

/* ─── Floating Icosahedron ─── */
function FloatingIco() {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    meshRef.current.rotation.x = elapsed * 0.2;
    meshRef.current.rotation.y = elapsed * 0.3;
    meshRef.current.position.y = Math.sin(elapsed * 0.7) * 0.3;
  });
  return (
    <Float speed={1.5} floatIntensity={0.4}>
      <group position={[3.5, 0.5, -1]}>
        {/* Wire frame */}
        <Icosahedron ref={meshRef} args={[1.2, 0]} scale={1}>
          <meshStandardMaterial
            color="#8b5cf6" wireframe transparent opacity={0.5}
            roughness={0.1} metalness={0.9}
          />
        </Icosahedron>
        {/* Solid inner */}
        <Icosahedron args={[1.0, 0]} scale={1}>
          <meshStandardMaterial
            color="#6366f1" transparent opacity={0.08}
            roughness={0} metalness={1}
          />
        </Icosahedron>
      </group>
    </Float>
  );
}

/* ─── Orbiting Ring ─── */
function OrbitRing() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.25;
    ref.current.rotation.x = 1.1;
  });
  return (
    <group position={[3.5, 0.5, -1]}>
      <Torus ref={ref} args={[2.2, 0.01, 2, 120]}>
        <meshStandardMaterial
          color="#06b6d4" transparent opacity={0.4}
          roughness={0} metalness={1}
        />
      </Torus>
    </group>
  );
}

/* ─── Mouse-Driven Camera ─── */
function CameraRig({ mouseX, mouseY }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouseX.get() * 0.5 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY.get() * 0.3 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ─── Scene ─── */
function HeroScene({ mouseX, mouseY }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[8, 6, 4]}   intensity={1.5} color="#818cf8" />
      <pointLight position={[-8, -4, 2]} intensity={1.0} color="#06b6d4" />
      <pointLight position={[0, 8, -4]}  intensity={0.8} color="#a78bfa" />

      <CameraRig mouseX={mouseX} mouseY={mouseY} />
      <NeuralNetwork />
      <ParticleField />
      <FloatingIco />
      <OrbitRing />
    </>
  );
}

/* ─── Typewriter Hook ─── */
function useTypewriter(words, speed = 75, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : speed;
    const id = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx((c) => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setCharIdx(0);
          setWordIdx((w) => (w + 1) % words.length);
        } else setCharIdx((c) => c - 1);
      }
    }, delay);
    return () => clearTimeout(id);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const floatingTech = ["Python", "LangChain", "FastAPI", "React", "AWS", "OpenAI", "Docker", "PostgreSQL", "CrewAI", "Pinecone"];

export default function Hero() {
  const role = useTypewriter(personalInfo.roles);

  /* mouse parallax values */
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 80, damping: 30 });
  const mouseY = useSpring(rawMouseY, { stiffness: 80, damping: 30 });

  const handleMouseMove = (e) => {
    const hw = window.innerWidth / 2;
    const hh = window.innerHeight / 2;
    rawMouseX.set((e.clientX - hw) / hw);
    rawMouseY.set((e.clientY - hh) / hh);
  };

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      onMouseMove={handleMouseMove}
    >
      {/* Base bg */}
      <div className="absolute inset-0 section-bg" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Radial fade over grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_-10%,rgba(99,102,241,0.14),transparent)]" />

      {/* CSS orbs */}
      <div className="absolute -left-48 top-1/4 h-[700px] w-[700px] rounded-full bg-indigo-600/10 blur-[130px] orb-1" />
      <div className="absolute -right-48 bottom-1/4 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[110px] orb-2" />
      <div className="absolute left-1/3 top-2/3 h-[400px] w-[400px] rounded-full bg-cyan-600/8 blur-[90px] orb-3" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 52 }}
          gl={{ antialias: true, alpha: true }}
          className="h-full w-full"
        >
          <Suspense fallback={null}>
            <HeroScene mouseX={mouseX} mouseY={mouseY} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-36 pb-24">
        <div className="max-w-2xl xl:max-w-3xl">

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-indigo-500/25 bg-indigo-500/8 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-indigo-300">
              Available for opportunities
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-[clamp(3rem,8.5vw,7rem)] font-black leading-[0.97] tracking-[-0.03em]"
            style={{ color: 'var(--text-primary)' }}
          >
            Building
            <br />
            <span className="gradient-text">Intelligent</span>
            <br />
            Systems.
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-6 flex items-center gap-2.5"
          >
            <Cpu size={14} className="text-indigo-400 flex-shrink-0" />
            <span className="font-mono text-sm font-medium text-indigo-300">
              {role}
              <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-indigo-400 align-middle" />
            </span>
          </motion.div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-6 max-w-lg text-[15px] leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {personalInfo.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(99,102,241,0.45)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("#projects")}
              className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              View My Work
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all"
              style={{
                borderColor: 'var(--border)',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--text-primary)'
              }}
            >
              Get in Touch
            </motion.button>
          </motion.div>

          {/* Social row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-10 flex items-center gap-3"
          >
            {[
              { href: personalInfo.github,            el: <GithubIcon size={15} />, label: "GitHub" },
              { href: personalInfo.linkedin,          el: <Linkedin size={15} />,   label: "LinkedIn" },
              { href: `mailto:${personalInfo.email}`, el: <Mail size={15} />,       label: "Email" },
            ].map(({ href, el, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.93 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              >
                {el}
              </motion.a>
            ))}
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right, var(--border), transparent)' }} />
            <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              {personalInfo.email}
            </span>
          </motion.div>

          {/* Floating tech badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25 }}
            className="mt-12 flex flex-wrap gap-2"
          >
            {floatingTech.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.25 + i * 0.055 }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="tech-badge cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'var(--text-muted)' }}>
          Scroll
        </span>
        <div className="relative flex h-10 w-6 justify-center rounded-full border pt-1.5" style={{ borderColor: 'var(--border)' }}>
          <motion.div
            animate={{ y: [0, 13, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-indigo-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
