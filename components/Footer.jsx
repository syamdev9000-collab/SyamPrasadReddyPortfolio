"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, ArrowUp } from "lucide-react";
import GithubIcon from "@/components/ui/GithubIcon";
import { personalInfo, navLinks } from "@/lib/data";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative border-t"
      style={{ borderColor: "var(--border)", background: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center gap-10">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <div className="absolute inset-0 rounded-xl animated-border opacity-60" />
              <div
                className="relative flex h-[calc(100%-2px)] w-[calc(100%-2px)] items-center justify-center rounded-xl"
                style={{ background: "var(--bg-primary)" }}
              >
                <span className="gradient-text text-lg font-black">SP</span>
              </div>
            </div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
               Reddy
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Senior AI Engineer</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })}
                className="text-xs transition-colors hover:text-indigo-400"
                style={{ color: "var(--text-muted)" }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { href: personalInfo.github,            el: <GithubIcon size={14} /> },
              { href: personalInfo.linkedin,          el: <Linkedin size={14} /> },
              { href: `mailto:${personalInfo.email}`, el: <Mail size={14} /> },
            ].map(({ href, el }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl border transition-colors hover:border-indigo-500/40 hover:text-indigo-400"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                {el}
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          {/* Bottom row */}
          <div
            className="flex w-full items-center justify-between text-[11px]"
            style={{ color: "var(--text-muted)" }}
          >
            <p>© {new Date().getFullYear()}  Reddy. All rights reserved.</p>
            <p className="hidden sm:block">Built with Next.js · Three.js · Framer Motion</p>
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              onClick={scrollTop}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
              style={{ color: "var(--text-muted)" }}
            >
              <ArrowUp size={12} /> Top
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
