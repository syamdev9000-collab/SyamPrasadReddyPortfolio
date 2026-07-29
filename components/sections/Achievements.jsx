"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "@/lib/data";

export default function Achievements() {
  const sectionRef = useRef();
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(139,92,246,0.05),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="section-number mb-4">06 — Recognition</span>
          <h2 className="text-4xl font-black tracking-tight md:text-6xl" style={{ color: "var(--text-primary)" }}>
            Milestones &amp; <span className="gradient-text">wins</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {achievements.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 36, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ scale: 1.025, y: -4 }}
              className="glass-card rounded-2xl p-6 hover-glow group cursor-default"
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="text-3xl">{item.icon}</span>
                <span
                  className="rounded-md px-2 py-1 font-mono text-[10px]"
                  style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-muted)" }}
                >
                  {item.year}
                </span>
              </div>
              <h3
                className="mb-1 font-bold text-sm transition-colors group-hover:text-indigo-400"
                style={{ color: "var(--text-primary)" }}
              >
                {item.title}
              </h3>
              <p className="mb-2 text-[10px] text-indigo-400">{item.org}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
          className="relative mt-12 glass-card overflow-hidden rounded-2xl p-10 text-center"
        >
          <div className="absolute left-0 right-0 top-0 h-0.5 animated-border" />
          <span
            className="absolute left-8 top-3 font-serif text-6xl leading-none"
            style={{ color: "rgba(99,102,241,0.15)" }}
          >
            "
          </span>
          <p className="relative mx-auto max-w-2xl text-lg font-medium leading-relaxed md:text-xl" style={{ color: "var(--text-secondary)" }}>
            From debugging circuit boards at 2am to architecting AI systems that handle half a million
            requests daily — the obsession with building things that{" "}
            <span className="gradient-text font-bold">actually work</span> never changed.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white">
              S
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}> Syam Prasad Reddy</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Senior AI Engineer</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
