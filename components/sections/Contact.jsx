"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, Mail, Send, CheckCircle, ArrowRight } from "lucide-react";
import GithubIcon from "@/components/ui/GithubIcon";
import { personalInfo } from "@/lib/data";

export default function Contact() {
  const sectionRef = useRef();
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  };

  const socials = [
    { icon: <Mail size={18} />,         label: "Email",    value: personalInfo.email,    href: `mailto:${personalInfo.email}`, color: "#6366f1" },
    { icon: <GithubIcon size={18} />,   label: "GitHub",   value: "@syamreddy",          href: personalInfo.github,            color: "#8b5cf6" },
    { icon: <Linkedin size={18} />,     label: "LinkedIn", value: "in/syamprasadreddy",  href: personalInfo.linkedin,          color: "#06b6d4" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_50%_80%,rgba(99,102,241,0.07),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="section-number mb-4">07 — Contact</span>
          <h2
            className="text-4xl font-black tracking-tight md:text-6xl"
            style={{ color: "var(--text-primary)" }}
          >
            Let's build something{" "}
            <span className="gradient-text">remarkable</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Have an interesting AI problem, a startup idea, or just want to talk shop? I'm always open to the right conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -18 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 6, scale: 1.01 }}
                className="group flex items-center gap-5 glass-card rounded-2xl p-5 hover-glow"
              >
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}28` }}
                >
                  <span style={{ color: s.color }}>{s.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-0.5 text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                  <p className="truncate text-sm font-medium" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                </div>
                <ArrowRight
                  size={14}
                  className="flex-shrink-0 transition-all group-hover:translate-x-1"
                  style={{ color: "var(--text-muted)" }}
                />
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="glass-card rounded-2xl p-5"
              style={{ border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3 flex-shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Open to opportunities</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    Full-time roles, consulting, or interesting collaborations
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card flex h-full flex-col items-center justify-center gap-4 rounded-2xl p-10 text-center"
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                  <CheckCircle size={48} className="text-emerald-400" />
                </motion.div>
                <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Message sent!</h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Thanks for reaching out — I'll reply within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {[
                    { key: "name",  label: "Name",  type: "text",  placeholder: "Your name" },
                    { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="mb-2 block text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                        {label}
                      </label>
                      <input
                        type={type}
                        required
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                        style={{
                          background: "var(--bg-card)",
                          borderColor: "var(--border)",
                          color: "var(--text-primary)",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project, role, or idea..."
                    className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "var(--border)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(99,102,241,0.35)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      Send Message
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
