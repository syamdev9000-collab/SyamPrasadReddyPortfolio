"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#030305]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12 flex flex-col items-center gap-4"
          >
            {/* SP monogram */}
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-xl animated-border opacity-70" />
              <div className="relative flex h-[calc(100%-2px)] w-[calc(100%-2px)] items-center justify-center rounded-xl bg-[#030305]">
                <span className="gradient-text text-2xl font-bold tracking-tight">
                  SPR
                </span>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm font-medium tracking-[0.2em] text-slate-500 uppercase"
            >
               Syam Prasad Reddy
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 200 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="relative h-[2px] overflow-hidden rounded-full bg-slate-800"
          >
            <motion.div
              className="absolute inset-y-0 left-0 animated-border"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-xs font-mono text-slate-600"
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
