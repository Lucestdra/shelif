"use client";

import { motion } from "motion/react";
import { Activity, Cpu, MapPin, Boxes } from "lucide-react";
import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const FACET_ICONS = [Activity, Cpu, MapPin, Boxes];

export function About() {
  const { t } = useT();

  return (
    <section id="about" className="relative py-28 md:py-40 bg-[var(--color-paper)]">
      <Container>
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--color-mute)]">
            <span className="size-1 rounded-full bg-[var(--color-signal)]" />
            {t.about.eyebrow}
          </span>
        </Reveal>

        <div className="mt-8 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Title + paragraphs */}
          <div>
            <Reveal delay={0.05}>
              <h2 className="font-display text-balance text-4xl md:text-5xl lg:text-6xl leading-[1.04] tracking-[-0.02em]">
                {t.about.title}{" "}
                <em
                  className="not-italic text-[var(--color-signal)]"
                  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
                >
                  {t.about.titleAccent}
                </em>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 text-[var(--color-mute)] text-base md:text-lg leading-relaxed text-pretty max-w-xl">
                {t.about.p1}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 text-[var(--color-mute)] text-base md:text-lg leading-relaxed text-pretty max-w-xl">
                {t.about.p2}
              </p>
            </Reveal>
          </div>

          {/* Facets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:mt-3">
            {t.about.facets.map((f, i) => {
              const Icon = FACET_ICONS[i];
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -3 }}
                  className="group relative rounded-2xl border border-[var(--color-ink)]/8 bg-[var(--color-paper-2)] p-5 md:p-6 overflow-hidden"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(circle at 80% -10%, rgba(225,10,23,0.16), transparent 55%)",
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="size-9 grid place-items-center rounded-xl bg-[var(--color-ink)] text-[var(--color-paper)]">
                        <Icon size={16} />
                      </span>
                      <span className="font-mono text-[10px] text-[var(--color-mute)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display text-lg tracking-tight">{f.label}</h3>
                    <p className="mt-1.5 text-sm text-[var(--color-mute)] text-pretty leading-relaxed">
                      {f.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
