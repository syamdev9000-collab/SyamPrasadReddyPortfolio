"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { navLinks } from "@/lib/data";

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
        className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(3,3,8,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-3"
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
          <ul className="hidden items-center gap-1 md:flex">
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
          <div className="flex items-center gap-2">
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
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 right-4 top-[72px] z-40 rounded-2xl border p-4 shadow-glass backdrop-blur-2xl md:hidden"
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
