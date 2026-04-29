"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Preloader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        const id = setTimeout(() => setDone(true), 350);
        return () => clearTimeout(id);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: "-101%" }}
          transition={{ duration: 0.95, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[100] bg-[var(--color-ink)] text-[var(--color-paper)] grid grid-rows-[auto_1fr_auto] noise"
        >
          {/* Soft red glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[60vh] rounded-full blur-[140px]"
            style={{
              background:
                "radial-gradient(circle, rgba(225,10,23,0.35), transparent 65%)",
            }}
          />

          {/* Top row */}
          <div className="relative flex items-start justify-between p-6 md:p-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-paper)]/45">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="size-1.5 rounded-full bg-[var(--color-signal)] animate-pulse" />
              Shelif · Loading
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {String(pct).padStart(3, "0")} <span className="text-[var(--color-signal)]">%</span>
            </motion.span>
          </div>

          {/* Center */}
          <div className="relative flex flex-col items-center justify-center gap-9 px-6">
            {/* Wordmark, large */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-baseline font-display font-medium leading-none tracking-[-0.02em] select-none text-[clamp(3.5rem,12vw,7rem)] text-[var(--color-paper)]"
            >
              shel
              <span className="relative inline-block">
                <span className="opacity-0">i</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-[0.18em] mx-auto h-[0.55em] w-[0.18em] bg-current"
                />
                <motion.span
                  aria-hidden
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-[0.05em] -translate-x-1/2 size-[0.32em] rounded-full bg-[var(--color-signal)]"
                />
              </span>
              f
            </motion.span>

            {/* Progress hairline */}
            <div className="relative w-56 md:w-72 h-px bg-[var(--color-paper)]/15 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[var(--color-signal)]"
                style={{ width: `${pct}%` }}
              />
              <motion.div
                aria-hidden
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-[var(--color-signal)] to-transparent opacity-50"
              />
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-paper)]/45 -mt-3"
            >
              Initializing shelves
            </motion.span>
          </div>

          {/* Bottom row */}
          <div className="relative flex items-end justify-between p-6 md:p-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-paper)]/45">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              İzmir · 2026
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-right max-w-[14ch] leading-relaxed"
            >
              Etiketi değil — mağazanın tamamı
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
