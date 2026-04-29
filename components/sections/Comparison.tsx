"use client";

import { motion } from "motion/react";
import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils/cn";

const COMPETITORS = ["Vusion", "Pricer", "Hanshow", "Displaydata"] as const;

const MATRIX: boolean[][] = [
  // [Vusion, Pricer, Hanshow, Displaydata, Shelif]
  [true, true, true, true, true],
  [false, false, false, false, true],
  [false, false, false, false, true],
  [false, false, false, false, true],
  [false, false, false, false, true],
  [false, false, false, false, true],
  [false, false, false, false, true],
];

export function Comparison() {
  const { t } = useT();

  return (
    <section className="relative py-28 md:py-40 bg-[var(--color-paper-2)]">
      <Container>
        <SectionHeader
          eyebrow={t.comparison.eyebrow}
          title={t.comparison.title}
          accent={t.comparison.titleAccent}
        />

        <div className="mt-16 md:mt-20 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
          <div className="min-w-[680px] rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-paper)] overflow-hidden">
            <div className="grid grid-cols-[1.6fr_repeat(5,1fr)] text-xs md:text-sm">
              {/* Header row */}
              <div className="p-4 md:p-5 border-b border-[var(--color-ink)]/10 text-[var(--color-mute)] font-medium">
                Capability
              </div>
              {COMPETITORS.map((c) => (
                <div
                  key={c}
                  className="p-4 md:p-5 border-b border-[var(--color-ink)]/10 text-center text-[var(--color-mute)] font-medium"
                >
                  {c}
                </div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 md:p-5 border-b border-[var(--color-signal)]/30 bg-[var(--color-signal)]/5 text-center font-display tracking-tight text-[var(--color-signal)]"
              >
                Shelif
              </motion.div>

              {/* Rows */}
              {t.comparison.rows.map((row, ri) => (
                <Row
                  key={ri}
                  row={row}
                  cells={MATRIX[ri]}
                  rowIndex={ri}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Row({
  row,
  cells,
  rowIndex,
}: {
  row: string;
  cells: boolean[];
  rowIndex: number;
}) {
  const isLast = rowIndex === 6;
  return (
    <>
      <div
        className={cn(
          "p-4 md:p-5 text-[var(--color-ink)]/85",
          !isLast && "border-b border-[var(--color-ink)]/8",
        )}
      >
        {row}
      </div>
      {cells.map((on, ci) => {
        const isShelifCol = ci === 4;
        return (
          <motion.div
            key={ci}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.05 * rowIndex + (isShelifCol ? 0.1 : 0) }}
            className={cn(
              "p-4 md:p-5 grid place-items-center",
              !isLast && "border-b border-[var(--color-ink)]/8",
              isShelifCol && "bg-[var(--color-signal)]/5",
            )}
          >
            {on ? (
              <CheckMark
                accent={isShelifCol}
                delay={0.15 * rowIndex + (isShelifCol ? 0.2 : 0)}
              />
            ) : (
              <span className="text-[var(--color-ink)]/25 select-none">—</span>
            )}
          </motion.div>
        );
      })}
    </>
  );
}

function CheckMark({ accent, delay }: { accent: boolean; delay: number }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={accent ? "var(--color-signal)" : "var(--color-ink)"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M5 12.5l4.5 4.5L19 7"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
