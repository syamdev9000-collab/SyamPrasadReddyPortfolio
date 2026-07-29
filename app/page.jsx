"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import AIWork from "@/components/sections/AIWork";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

/* CustomCursor only renders on desktop — client-side only */
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />

      <main className="relative">
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden />

        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <AIWork />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
