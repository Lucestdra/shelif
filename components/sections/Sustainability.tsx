"use client";

import { motion } from "motion/react";
import { Leaf } from "lucide-react";
import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const GREEN = "#1f8f5a";

type Stat = { value: number; suffix?: string; label: string };

export function Sustainability() {
  const { t, locale } = useT();
  const stats = t.sustainability.stats as readonly Stat[];

  return (
    <section className="relative py-20 md:py-28 bg-[var(--color-paper)]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[rgba(31,143,90,0.18)] bg-gradient-to-br from-[rgba(31,143,90,0.05)] to-[rgba(31,143,90,0.01)] p-8 md:p-12"
        >
          {/* Decorative leaves */}
          <FloatingLeaves />

          <div className="relative grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(31,143,90,0.12)] text-[#1f8f5a] px-3 py-1 text-xs font-medium tracking-tight mb-5">
                <Leaf size={12} />
                {t.sustainability.eyebrow}
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] text-balance">
                {t.sustainability.title}
              </h2>
              <p className="mt-4 text-[var(--color-mute)] text-pretty max-w-md">
                {t.sustainability.sub}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                  className="flex flex-col gap-2"
                >
                  <div
                    className="font-display text-4xl md:text-5xl tracking-tight"
                    style={{ color: GREEN }}
                  >
                    <AnimatedCounter value={s.value} suffix={s.suffix} locale={locale} />
                  </div>
                  <div
                    className="h-px w-8"
                    style={{ background: GREEN, opacity: 0.4 }}
                  />
                  <p className="text-xs md:text-sm text-[var(--color-mute)] text-pretty">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function FloatingLeaves() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {[
        { x: "8%", y: "20%", size: 22, delay: 0, dur: 7 },
        { x: "82%", y: "12%", size: 16, delay: 1.4, dur: 9 },
        { x: "70%", y: "70%", size: 18, delay: 2.8, dur: 8 },
        { x: "20%", y: "78%", size: 14, delay: 0.7, dur: 10 },
      ].map((l, i) => (
        <motion.div
          key={i}
          style={{ left: l.x, top: l.y, color: GREEN }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 8, 0],
            opacity: [0.18, 0.32, 0.18],
          }}
          transition={{
            duration: l.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: l.delay,
          }}
          className="absolute"
        >
          <Leaf size={l.size} />
        </motion.div>
      ))}
    </div>
  );
}
