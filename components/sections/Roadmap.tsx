"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Roadmap() {
  const { t } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 40%"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="roadmap"
      ref={ref}
      className="relative py-28 md:py-40 bg-[var(--color-paper-2)]"
    >
      <Container>
        <SectionHeader eyebrow={t.roadmap.eyebrow} title={t.roadmap.title} />

        <div className="mt-20 md:mt-28 relative">
          {/* Track */}
          <div className="hidden md:block absolute left-0 right-0 top-[3.25rem] h-px bg-[var(--color-ink)]/12">
            <motion.div
              style={{ width: lineWidth }}
              className="h-px bg-[var(--color-signal)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4">
            {t.roadmap.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative flex flex-col"
              >
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-mute)] mb-3">
                  {item.quarter}
                </span>
                <div className="relative h-12 mb-3 flex items-center">
                  <span className="size-3 rounded-full bg-[var(--color-paper)] border-2 border-[var(--color-ink)]/30 z-10 relative">
                    <motion.span
                      className="absolute inset-0 rounded-full bg-[var(--color-signal)]"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                    />
                  </span>
                </div>
                <h3 className="font-display text-xl tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-mute)] mt-2 text-pretty">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
