"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ArrowRight, Star, TrendingUp } from "lucide-react";
import GithubIcon from "@/components/ui/GithubIcon";
import { projects } from "@/lib/data";


function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX   = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY   = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`perspective-wrapper ${className}`}
    >

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(99,102,241,0.12) 0%, transparent 65%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

function ProjectCard({ project, index, featured = false }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={featured ? "md:col-span-2" : ""}
    >
      <TiltCard className="group relative glass-card rounded-2xl overflow-hidden h-full">
        <div
          className={`relative overflow-hidden ${featured ? "h-52" : "h-40"} bg-gradient-to-br ${project.color}`}
        >
          
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 0)`,
              backgroundSize: "28px 28px",
            }}
          />

          <motion.div
            className="absolute right-8 top-7"
            animate={{ rotateY: [0, 360], rotateX: [0, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ perspective: 500 }}
          >
            <div
              className="h-20 w-20 rounded-2xl opacity-45"
              style={{
                background: `linear-gradient(135deg, ${project.accent}, transparent)`,
                transform: "perspective(300px) rotateX(20deg) rotateY(-20deg)",
                boxShadow: `0 8px 32px ${project.accent}40`,
              }}
            />
          </motion.div>

          <motion.div
            className="absolute right-20 bottom-6"
            animate={{ rotateZ: [0, -360] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="h-10 w-10 rounded-xl opacity-35"
              style={{
                background: `linear-gradient(135deg, transparent, ${project.accent})`,
                transform: "perspective(300px) rotateX(-10deg) rotateY(25deg)",
              }}
            />
          </motion.div>

          {project.featured && (
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3 py-1 backdrop-blur-sm">
              <Star size={9} className="fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] font-semibold text-white/85">Featured</span>
            </div>
          )}

          <div className="absolute bottom-4 right-5 select-none text-5xl font-black text-white/8">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <div className={`flex flex-col gap-4 ${featured ? "p-7" : "p-6"}`}>
          <div>
            <h3
              className="font-bold transition-colors group-hover:text-indigo-400"
              style={{
                fontSize: featured ? "1.05rem" : "0.95rem",
                color: "var(--text-primary)",
              }}
            >
              {project.title}
            </h3>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
              {project.subtitle}
            </p>
          </div>

          <p
            className={`text-sm leading-relaxed ${featured ? "" : "line-clamp-3"}`}
            style={{ color: "var(--text-secondary)" }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="flex items-center gap-1 rounded-lg border px-2.5 py-1 font-mono text-[11px] text-emerald-400"
                style={{ background: "rgba(16,185,129,0.07)", borderColor: "rgba(16,185,129,0.18)" }}
              >
                <TrendingUp size={9} />
                {m}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, featured ? 7 : 5).map((t) => (
              <span key={t} className="tech-badge text-[11px]">{t}</span>
            ))}
            {project.tech.length > (featured ? 7 : 5) && (
              <span className="tech-badge text-[11px]">+{project.tech.length - (featured ? 7 : 5)}</span>
            )}
          </div>

          <div
            className="flex items-center justify-between border-t pt-4"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.06 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <GithubIcon size={13} /> Code
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.06 }}
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-indigo-400 transition-colors hover:text-indigo-300"
              >
                <ExternalLink size={13} /> Demo
              </motion.a>
            </div>
            <motion.span
              whileHover={{ x: 3 }}
              className="flex items-center gap-1 text-xs font-medium text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100"
            >
              Details <ArrowRight size={11} />
            </motion.span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef();
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [featured, ...rest] = projects;
  const [second, third, ...remaining] = rest;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(99,102,241,0.05),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="section-number mb-4">03 — Projects</span>
          <h2
            className="text-4xl font-black tracking-tight md:text-6xl"
            style={{ color: "var(--text-primary)" }}
          >
            Things I've <span className="gradient-text">shipped</span>
          </h2>
          <p className="mt-4 max-w-md text-sm" style={{ color: "var(--text-secondary)" }}>
            Production systems, not prototypes. Each project solved a real problem at real scale.
          </p>
        </motion.div>

        
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard project={featured} index={0} featured />

          <ProjectCard project={second} index={1} />
          <ProjectCard project={third}  index={2} />

          {remaining.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 3} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-14 flex justify-center"
        >
          <motion.a
            href="https://github.com/syamdev9000-collab"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-medium transition-all"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
            }}
          >
            <GithubIcon size={14} />
            More on GitHub
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
