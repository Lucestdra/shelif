"use client";

import { motion } from "motion/react";
import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";

type Stat = { value: number; prefix?: string; suffix?: string; label: string };

export function Problem() {
  const { t, locale } = useT();
  const stats = t.problem.stats as readonly Stat[];

  return (
    <section id="product" className="relative py-28 md:py-40 bg-[var(--color-paper)]">
      <Container>
        <SectionHeader
          eyebrow={t.problem.eyebrow}
          title={t.problem.title}
          sub={t.problem.sub}
        />

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-ink)]/10 border border-[var(--color-ink)]/10 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[var(--color-paper)] p-8 md:p-10 flex flex-col gap-3"
            >
              <div className="font-display text-5xl md:text-6xl tracking-tight text-[var(--color-ink)]">
                <AnimatedCounter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  locale={locale}
                />
              </div>
              <p className="text-[var(--color-mute)] text-sm md:text-base text-pretty">
                {s.label}
              </p>
              <Reveal delay={0.3 + i * 0.1}>
                <div className="mt-4 h-px w-12 bg-[var(--color-signal)]" />
              </Reveal>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
