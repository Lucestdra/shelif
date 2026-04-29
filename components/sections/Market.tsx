"use client";

import { motion } from "motion/react";
import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

type Big = { value: number; suffix?: string; label: string };

export function Market() {
  const { t, locale } = useT();
  const big = t.market.big as readonly Big[];

  return (
    <section
      id="market"
      className="relative py-28 md:py-40 bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden noise"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-paper) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1), transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 size-[60vw] rounded-full blur-[140px] opacity-30"
        style={{ background: "radial-gradient(circle, var(--color-signal), transparent 65%)" }}
      />

      <Container>
        <SectionHeader
          eyebrow={t.market.eyebrow}
          title={<span className="text-[var(--color-paper)]">{t.market.title}</span>}
          sub={<span className="text-[var(--color-paper)]/60">{t.market.sub}</span>}
        />

        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {big.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-none tracking-tight">
                <AnimatedCounter
                  value={b.value}
                  suffix={b.suffix}
                  locale={locale}
                  duration={2200}
                />
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
                className="mt-4 h-px w-full bg-[var(--color-paper)]/20"
              >
                <div className="h-full w-12 bg-[var(--color-signal)]" />
              </motion.div>
              <p className="mt-4 text-sm md:text-base text-[var(--color-paper)]/60 max-w-xs">
                {b.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-sm md:text-base text-[var(--color-paper)]/40 max-w-2xl"
        >
          {t.market.footnote}
        </motion.p>
      </Container>
    </section>
  );
}
