"use client";

import { motion } from "motion/react";
import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { EslDevice } from "@/components/hero/EslDevice";
import { StatusChip } from "@/components/hero/StatusChip";

export function Hero() {
  const { t } = useT();

  return (
    <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
      {/* Subtle grid bg */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      {/* Soft red glow behind device */}
      <div
        aria-hidden
        className="absolute right-[-10%] top-[20%] h-[70vh] w-[70vh] rounded-full blur-[140px] opacity-[0.18]"
        style={{ background: "radial-gradient(circle, var(--color-signal), transparent 60%)" }}
      />

      <Container>
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--color-mute)] mb-6"
            >
              <span className="size-1.5 rounded-full bg-[var(--color-signal)]" />
              {t.hero.eyebrow}
            </motion.span>

            <h1 className="text-balance font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.96] tracking-[-0.025em]">
              {[t.hero.headlineA, t.hero.headlineB, t.hero.headlineC].map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block"
                >
                  {i === 1 ? (
                    <em
                      className="not-italic"
                      style={{
                        fontVariationSettings: "'opsz' 144, 'SOFT' 100",
                      }}
                    >
                      {line}
                    </em>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-lg md:text-xl text-[var(--color-mute)] max-w-xl text-pretty leading-relaxed"
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-10"
            >
              <StatusChip messages={t.hero.chips} />
            </motion.div>
          </div>

          {/* Device */}
          <div className="relative flex justify-center lg:justify-end">
            <EslDevice
              productLabel="Emerge Zero Sugar Energy Drink 250ml"
              price={2.0}
              scrollLinked
            />
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
        aria-hidden
      >
        <div
          className="relative h-9 w-[22px] rounded-full border border-[var(--color-ink)]/30"
        >
          <motion.div
            animate={{ y: [4, 14, 4], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 -translate-x-1/2 h-1.5 w-[3px] rounded-full bg-[var(--color-ink)]/70"
          />
        </div>
        <motion.svg
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--color-mute)]"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
