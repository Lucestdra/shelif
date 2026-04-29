"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Smartphone, Cloud, Tag, Receipt, Wifi, BatteryFull } from "lucide-react";
import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HowItWorks() {
  const { t } = useT();
  const [tick, setTick] = useState(0);
  const prices = ["1,90", "2,00", "2,15", "1,75"];
  const price = prices[tick % prices.length];

  return (
    <section id="how" className="relative py-28 md:py-40 bg-[var(--color-paper-2)] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1), rgba(0,0,0,0) 70%)",
        }}
      />
      <Container>
        <SectionHeader eyebrow={t.how.eyebrow} title={t.how.title} sub={t.how.sub} />

        {/* Step labels */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {t.how.steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-4"
            >
              <span className="font-mono text-xs text-[var(--color-signal)] mt-1">{s.tag}</span>
              <div>
                <h3 className="font-display text-xl tracking-tight">{s.title}</h3>
                <p className="text-sm text-[var(--color-mute)] mt-1 text-pretty">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stage */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-center">
          {/* connector layer (md+) */}
          <FlowSVG tick={tick} />

          <PhonePanel price={price} tick={tick} />
          <CloudPanel tick={tick} />
          <DevicesPanel price={price} tick={tick} />
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-xs text-[var(--color-mute)]">
            <span className="size-1.5 rounded-full bg-[var(--color-signal)] animate-pulse" />
            <span className="font-mono">
              {t.how.latency} <span className="text-[var(--color-ink)] ml-2">{t.how.latencyValue}</span>
            </span>
          </div>
          <button
            onClick={() => setTick((v) => v + 1)}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] px-6 py-3.5 text-sm hover:bg-[var(--color-signal)] transition-colors"
          >
            {t.how.cta}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </Container>
    </section>
  );
}

function FlowSVG({ tick }: { tick: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 320"
      preserveAspectRatio="none"
      className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
    >
      <defs>
        <linearGradient id="flow-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="rgba(10,10,11,0.18)" />
          <stop offset="1" stopColor="rgba(10,10,11,0.05)" />
        </linearGradient>
        <linearGradient id="flow-pulse" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="rgba(225,10,23,0)" />
          <stop offset="0.5" stopColor="rgba(225,10,23,1)" />
          <stop offset="1" stopColor="rgba(225,10,23,0)" />
        </linearGradient>
      </defs>
      {/* Phone -> Cloud */}
      <path
        d="M 280 160 C 380 160, 460 160, 600 160"
        stroke="url(#flow-line)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 5"
      />
      {/* Cloud -> Devices (split) */}
      <path
        d="M 600 160 C 760 160, 820 110, 940 110"
        stroke="url(#flow-line)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 5"
      />
      <path
        d="M 600 160 C 760 160, 820 210, 940 210"
        stroke="url(#flow-line)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 5"
      />

      {/* Pulse particle on click */}
      <motion.circle
        key={`pulse-1-${tick}`}
        r="4"
        fill="var(--color-signal)"
        initial={{ offsetDistance: "0%", opacity: 1 }}
        animate={{ offsetDistance: "100%", opacity: [1, 1, 0] }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          offsetPath: "path('M 280 160 C 380 160, 460 160, 600 160')",
        }}
      />
      <motion.circle
        key={`pulse-2-${tick}`}
        r="4"
        fill="var(--color-signal)"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          offsetPath: "path('M 600 160 C 760 160, 820 110, 940 110')",
        }}
      />
      <motion.circle
        key={`pulse-3-${tick}`}
        r="4"
        fill="var(--color-signal)"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          offsetPath: "path('M 600 160 C 760 160, 820 210, 940 210')",
        }}
      />
    </svg>
  );
}

function StagePanel({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col items-center gap-3"
    >
      {children}
      <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-mute)]">{label}</span>
    </motion.div>
  );
}

function PhonePanel({ price, tick }: { price: string; tick: number }) {
  const { t } = useT();
  return (
    <StagePanel label={t.how.nodes.panel}>
      <div
        className="rounded-[28px] p-2 bg-[var(--color-ink)] shadow-[0_24px_60px_-30px_rgba(10,10,11,0.45)]"
        style={{ width: 180 }}
      >
        <div className="rounded-[20px] overflow-hidden bg-[var(--color-ink)] aspect-[9/14] flex flex-col p-3">
          <div className="flex items-center justify-between text-[8px] text-white/60 mb-2">
            <span className="font-mono">9:41</span>
            <span className="flex items-center gap-1">
              <Wifi size={8} /> <BatteryFull size={9} />
            </span>
          </div>
          <div className="bg-[var(--color-paper)] rounded-xl flex-1 p-2.5 flex flex-col">
            <div className="flex items-center gap-1.5 mb-2">
              <Smartphone size={10} className="text-[var(--color-signal)]" />
              <span className="text-[9px] font-medium">Shelif Panel</span>
            </div>
            <div className="text-[8px] text-[var(--color-mute)]">Yeni fiyat</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${tick}-${price}`}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-2xl mt-0.5"
              >
                ₺{price}
              </motion.div>
            </AnimatePresence>
            <div className="mt-auto flex items-center gap-1 text-[8px] text-emerald-600">
              <span className="size-1 rounded-full bg-emerald-500" />
              kaydedildi
            </div>
          </div>
        </div>
      </div>
    </StagePanel>
  );
}

function CloudPanel({ tick }: { tick: number }) {
  const { t } = useT();
  return (
    <StagePanel label={t.how.nodes.cloud}>
      <div className="relative size-32 md:size-36 grid place-items-center">
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border border-[var(--color-signal)]/30"
        />
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          className="absolute inset-0 rounded-full border border-[var(--color-signal)]/20"
        />
        <motion.div
          key={tick}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative size-20 md:size-24 grid place-items-center rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] shadow-[0_20px_40px_-20px_rgba(10,10,11,0.5)]"
        >
          <Cloud size={28} />
        </motion.div>
      </div>
      <div className="font-mono text-[10px] text-[var(--color-mute)]">
        80 ms · TLS 1.3
      </div>
    </StagePanel>
  );
}

function DevicesPanel({ price, tick }: { price: string; tick: number }) {
  const { t } = useT();
  return (
    <StagePanel label={`${t.how.nodes.esl} · ${t.how.nodes.pos}`}>
      <div className="flex flex-col gap-3">
        {/* Mini ESL */}
        <div
          className="rounded-2xl p-2 shadow-[0_18px_40px_-20px_rgba(10,10,11,0.35)]"
          style={{
            background: "linear-gradient(155deg, #ffffff 0%, #f7f6f1 60%, #e9e7e0 100%)",
            width: 220,
          }}
        >
          <div className="rounded-md overflow-hidden bg-white">
            <div className="bg-[var(--color-ink)] text-white px-2 py-1 text-[8px] font-display">
              Emerge Zero Sugar 250ml
            </div>
            <div className="flex items-center justify-end px-2 py-2.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`esl-${tick}-${price}`}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-2xl tracking-tight"
                >
                  ₺{price}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
        {/* Mini receipt */}
        <div
          className="rounded-md bg-white p-3 shadow-[0_12px_24px_-12px_rgba(10,10,11,0.25)] font-mono text-[10px] leading-tight"
          style={{ width: 220, fontFamily: "var(--font-mono)" }}
        >
          <div className="flex items-center justify-between text-[var(--color-mute)] mb-1">
            <span className="flex items-center gap-1">
              <Tag size={8} />
              <Receipt size={8} />
              POS#23
            </span>
            <span>14:23</span>
          </div>
          <div className="border-t border-dashed border-[var(--color-ink)]/15 pt-1.5 flex items-center justify-between">
            <span className="truncate">Emerge Zero · 250ml</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={`pos-${tick}-${price}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[var(--color-signal)] font-medium"
              >
                ₺{price}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="border-t border-dashed border-[var(--color-ink)]/15 mt-1.5 pt-1.5 flex justify-between text-[var(--color-mute)]">
            <span>SYNC</span>
            <span>OK · {tick + 1}</span>
          </div>
        </div>
      </div>
    </StagePanel>
  );
}
