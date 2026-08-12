"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus } from "@react-three/drei";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { navLinks } from "@/lib/data";

/* ─── 3D decoration for the header ─── */
function Header3D() {
  const icoRef = useRef();

  useFrame((state) => {
    if (!icoRef.current) return;
    const t = state.clock.getElapsedTime();
    icoRef.current.rotation.x = t * 0.35;
    icoRef.current.rotation.y = t * 0.45;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 3]} color="#818cf8" intensity={1.5} />
      <pointLight position={[-2, -2, 2]} color="#06b6d4" intensity={1} />

      <Float speed={1.4} floatIntensity={0.7}>
        <group ref={icoRef}>
          <Icosahedron args={[0.85, 0]}>
            <meshStandardMaterial
              color="#8b5cf6"
              wireframe
              transparent
              opacity={0.55}
              roughness={0.1}
              metalness={0.9}
            />
          </Icosahedron>
        </group>
      </Float>

      <Torus args={[1.5, 0.008, 2, 72]} rotation={[Math.PI / 2.3, 0.4, 0]}>
        <meshStandardMaterial
          color="#22d3ee"
          transparent
          opacity={0.4}
          metalness={1}
          roughness={0}
        />
      </Torus>
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [activeSection, setActive]    = useState("");
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [mounted, setMounted]         = useState(false);
  const { theme, setTheme }           = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const ids = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(`#${ids[i]}`); break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="fixed left-0 right-0 top-0 z-50"
      >
        {/* Top gradient accent line */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] transition-opacity duration-300"
          style={{ opacity: scrolled ? 1 : 0 }}
        >
          <div className="h-full w-full animated-border" />
        </div>

        {/* Floating pill */}
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <div
            className="relative mt-3 flex items-center justify-between rounded-2xl px-3 py-2 transition-colors duration-300 sm:px-5"
            style={{
              border: "1px solid",
              borderColor: scrolled ? "var(--border)" : "transparent",
              boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.25)" : "none",
              backdropFilter: scrolled ? "blur(20px)" : "none",
              WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
              style={{ background: "var(--nav-bg)", opacity: scrolled ? 1 : 0 }}
            />

            {/* 3D decoration — desktop, scrolled */}
            {scrolled && (
              <div className="pointer-events-none absolute right-44 top-1/2 hidden h-20 w-56 -translate-y-1/2 xl:block">
                <Canvas
                  camera={{ position: [0, 0, 4.4], fov: 45 }}
                  dpr={[1, 1.5]}
                  gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                >
                  <Suspense fallback={null}>
                    <Header3D />
                  </Suspense>
                </Canvas>
              </div>
            )}

            {/* Logo */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("#hero")}
              className="relative z-10 flex items-center gap-3"
            >
              <div className="relative flex h-9 w-9 items-center justify-center">
                <div className="absolute inset-0 rounded-lg animated-border opacity-80" />
                <div
                  className="relative flex h-[calc(100%-2px)] w-[calc(100%-2px)] items-center justify-center rounded-lg"
                  style={{ background: "var(--bg-primary)" }}
                >
                  <span className="gradient-text text-sm font-black">SP</span>
                </div>
              </div>
              <span className="hidden text-sm font-semibold tracking-tight sm:block" style={{ color: "var(--text-secondary)" }}>
                 Syam Prasad Reddy
              </span>
            </motion.button>

            {/* Desktop nav */}
            <ul className="relative z-10 hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="relative rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                    style={{ color: activeSection === link.href ? "#818cf8" : "var(--text-secondary)" }}
                  >
                    {activeSection === link.href && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-indigo-500/10"
                        transition={{ type: "spring", bounce: 0.25 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="relative z-10 flex items-center gap-2">
              {mounted && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 sm:flex"
              >
                <Download size={13} /> Resume
              </motion.button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors md:hidden"
                style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 right-4 top-[80px] z-40 rounded-2xl border p-4 shadow-glass backdrop-blur-2xl md:hidden"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors"
                    style={{
                      background: activeSection === link.href ? "rgba(99,102,241,0.1)" : "transparent",
                      color: activeSection === link.href ? "#818cf8" : "var(--text-secondary)",
                    }}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
