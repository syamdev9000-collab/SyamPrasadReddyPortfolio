"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, CheckCircle2, Calendar, MapPin } from "lucide-react";
import { experience } from "@/lib/data";

function TimelineCard({ item }) {
  return (
    <div className="glass-card rounded-2xl p-6 hover-glow group">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3
            className="font-bold text-sm transition-colors group-hover:text-indigo-400"
            style={{ color: "var(--text-primary)" }}
          >
            {item.role}
          </h3>
          <p className="mt-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>{item.company}</p>
        </div>
        <span
          className="flex-shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-semibold"
          style={{ background: `${item.accent}12`, color: item.accent, border: `1px solid ${item.accent}28` }}
        >
          {item.type}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}>
          <Calendar size={10} /> {item.duration}
        </div>
        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}>
          <MapPin size={10} /> {item.location}
        </div>
      </div>

      <p className="mb-4 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {item.description}
      </p>

      <ul className="space-y-2">
        {item.achievements.map((ach, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs" style={{ color: "var(--text-secondary)" }}>
            <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: item.accent }} />
            <span className="leading-relaxed">{ach}</span>
          </li>
        ))}
      </ul>

      <div
        className="mt-4 flex flex-wrap gap-1.5 border-t pt-4"
        style={{ borderColor: "var(--border)" }}
      >
        {item.tech.map((t) => (
          <span
            key={t}
            className="rounded-md px-2 py-0.5 text-[10px] font-medium"
            style={{ background: `${item.accent}0e`, color: item.accent, border: `1px solid ${item.accent}1f` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ item, index, total }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -36 : 36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.14, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative grid grid-cols-1 items-start gap-4 md:grid-cols-[1fr_auto_1fr] ${index < total - 1 ? "pb-10" : ""}`}
    >
      <div className="order-2 md:order-none">
        {isLeft ? <TimelineCard item={item} /> : <div className="hidden md:block" />}
      </div>

      <div className="relative order-1 flex flex-col items-center md:order-none">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.14 + 0.18, type: "spring" }}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border-2"
          style={{
            borderColor: item.accent,
            background: `${item.accent}12`,
            boxShadow: `0 0 18px ${item.accent}22`,
          }}
        >
          {item.type === "Education" ? (
            <GraduationCap size={16} style={{ color: item.accent }} />
          ) : (
            <span className="text-sm font-bold" style={{ color: item.accent }}>{item.logo}</span>
          )}
        </motion.div>

        {index < total - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.9, delay: index * 0.14 + 0.35 }}
            className="mt-2 w-px flex-1 origin-top timeline-connector"
            style={{ minHeight: 56 }}
          />
        )}
      </div>

      <div className="order-2 md:order-none">
        {!isLeft ? <TimelineCard item={item} /> : <div className="hidden md:block" />}
      </div>

      <div className="order-3 col-span-full md:hidden">
        <TimelineCard item={item} />
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef();
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_60%_at_30%_50%,rgba(99,102,241,0.04),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="section-number mb-4">04 — Experience</span>
          <h2 className="text-4xl font-black tracking-tight md:text-6xl" style={{ color: "var(--text-primary)" }}>
            The <span className="gradient-text">journey</span>
          </h2>
          <p className="mt-4 max-w-md text-sm" style={{ color: "var(--text-secondary)" }}>
            From ECE classrooms to production AI systems — every step shaped how I think about scale.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {experience.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} total={experience.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
