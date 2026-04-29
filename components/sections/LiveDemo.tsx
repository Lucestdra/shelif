"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, RefreshCw, Check, Receipt, Terminal } from "lucide-react";
import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EslDevice } from "@/components/hero/EslDevice";
import { PhoneMock } from "@/components/demo/PhoneMock";

type LogEntry = { time: string; message: string };

function nowHHMMSS() {
  const d = new Date();
  return [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

export function LiveDemo() {
  const { t } = useT();
  const presets = t.demo.presets;

  const [presetIdx, setPresetIdx] = useState(0);
  const preset = presets[presetIdx];
  const [draft, setDraft] = useState(preset.price.toFixed(2));
  const [committed, setCommitted] = useState(preset.price);
  const [syncing, setSyncing] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([
    { time: nowHHMMSS(), message: `boot · ${preset.label}` },
  ]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When preset changes, reset draft + committed
  useEffect(() => {
    setDraft(preset.price.toFixed(2));
    setCommitted(preset.price);
    setLog((l) => [
      { time: nowHHMMSS(), message: `product.switch → ${preset.label}` },
      ...l,
    ].slice(0, 6));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetIdx]);

  useEffect(() => {
    const num = parseFloat(draft.replace(",", "."));
    if (Number.isNaN(num)) return;
    if (Math.abs(num - committed) < 0.001) return;

    setSyncing(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setCommitted(num);
      setSyncing(false);
      setLog((l) =>
        [
          { time: nowHHMMSS(), message: `price.update → £${num.toFixed(2)} · ESL+POS sync OK` },
          ...l,
        ].slice(0, 6),
      );
    }, 700);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [draft, committed]);

  return (
    <section id="demo" className="relative py-28 md:py-40 bg-[var(--color-paper)] overflow-hidden">
      {/* Soft red glow */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 size-[60vw] rounded-full blur-[160px] opacity-[0.10]"
        style={{ background: "radial-gradient(circle, var(--color-signal), transparent 65%)" }}
      />
      <Container>
        <SectionHeader eyebrow={t.demo.eyebrow} title={t.demo.title} sub={t.demo.sub} />

        {/* Preset chips */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-mute)] mr-2">
            {t.demo.pickProduct}
          </span>
          {presets.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setPresetIdx(i)}
              className={`rounded-full text-xs px-3.5 py-1.5 border transition-colors ${
                presetIdx === i
                  ? "bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]"
                  : "bg-[var(--color-paper)] text-[var(--color-ink)] border-[var(--color-ink)]/15 hover:border-[var(--color-ink)]/40"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Stage */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[280px_1fr_240px] gap-6 lg:gap-8 items-center">
          {/* Phone */}
          <div className="flex justify-center lg:justify-start">
            <PhoneMock>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-7 rounded-lg bg-[var(--color-ink)] text-[var(--color-paper)] grid place-items-center">
                  <Smartphone size={14} />
                </div>
                <span className="text-[11px] font-medium">Shelif Panel</span>
              </div>
              <div className="rounded-xl border border-[var(--color-ink)]/10 p-3">
                <p className="text-[10px] text-[var(--color-mute)] mb-2 truncate">
                  {preset.label}
                </p>
                <label className="block text-[9px] uppercase tracking-wider text-[var(--color-mute)] mb-1">
                  {t.demo.inputLabel}
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-2xl leading-none">£</span>
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    inputMode="decimal"
                    className="w-full bg-transparent font-mono text-2xl outline-none border-b border-[var(--color-ink)]/15 focus:border-[var(--color-signal)] py-1 transition-colors"
                  />
                </div>
              </div>
              <div className="mt-auto pt-4 flex items-center justify-between text-[11px]">
                <span className="text-[var(--color-mute)]">Status</span>
                <AnimatePresence mode="wait">
                  {syncing ? (
                    <motion.span
                      key="sync"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-1.5 text-[var(--color-signal)]"
                    >
                      <RefreshCw size={11} className="animate-spin" />
                      {t.demo.syncing}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="ok"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-flex items-center gap-1.5 text-emerald-600"
                    >
                      <Check size={11} />
                      {t.demo.synced}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {/* Home indicator */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-24 rounded-full bg-[var(--color-ink)]/40" />
            </PhoneMock>
          </div>

          {/* ESL center */}
          <div className="flex flex-col items-center gap-5">
            <EslDevice productLabel={preset.label} price={committed} syncing={syncing} />
            <AnimatePresence>
              <motion.div
                key={committed}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-600/30 text-emerald-700 px-3 py-1.5 text-xs font-medium"
              >
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-ping" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                {t.demo.posUpdated} · £{committed.toFixed(2)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Receipt */}
          <div className="flex justify-center lg:justify-end">
            <ReceiptCard
              label={t.demo.receipt}
              productLabel={preset.label}
              price={committed}
              syncing={syncing}
            />
          </div>
        </div>

        {/* Event log */}
        <div className="mt-10 rounded-2xl bg-[var(--color-ink)] text-[var(--color-paper)] p-4 md:p-5 font-mono text-xs">
          <div className="flex items-center gap-2 text-[var(--color-paper)]/60 mb-3">
            <Terminal size={12} />
            <span className="uppercase tracking-[0.18em]">{t.demo.log}</span>
            <span className="ml-auto text-[var(--color-paper)]/30">tail -f shelif.log</span>
          </div>
          <div className="space-y-1.5 min-h-[7.5rem]">
            <AnimatePresence initial={false}>
              {log.slice(0, 5).map((entry, i) => (
                <motion.div
                  key={`${entry.time}-${i}-${entry.message}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1 - i * 0.18, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-[var(--color-paper)]/40 shrink-0">{entry.time}</span>
                  <span className="text-[var(--color-signal)] shrink-0">›</span>
                  <span className="truncate">{entry.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ReceiptCard({
  label,
  productLabel,
  price,
  syncing,
}: {
  label: string;
  productLabel: string;
  price: number;
  syncing: boolean;
}) {
  return (
    <div className="relative">
      <div
        className="relative rounded-md bg-white shadow-[0_30px_60px_-30px_rgba(10,10,11,0.35)] p-4 font-mono text-[11px] leading-snug"
        style={{ width: 220 }}
      >
        <div className="flex items-center gap-2 text-[var(--color-mute)] mb-2 pb-2 border-b border-dashed border-[var(--color-ink)]/15">
          <Receipt size={12} />
          <span className="uppercase tracking-[0.14em] text-[10px]">{label}</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span>Bakkal Yıldız</span>
            <span className="text-[var(--color-mute)]">POS#23</span>
          </div>
          <div className="border-t border-dashed border-[var(--color-ink)]/15 my-1.5" />
          <div className="flex justify-between gap-3">
            <span className="truncate">{productLabel}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={price}
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -6, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-[var(--color-signal)] font-medium"
              >
                £{price.toFixed(2)}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="border-t border-dashed border-[var(--color-ink)]/15 my-1.5" />
          <div className="flex justify-between text-[var(--color-mute)]">
            <span>VAT</span>
            <span>£{(price * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium pt-1">
            <span>TOTAL</span>
            <span>£{price.toFixed(2)}</span>
          </div>
          <div className="border-t border-dashed border-[var(--color-ink)]/15 my-1.5" />
          <div className="flex justify-between text-[10px] text-[var(--color-mute)]">
            <span>SYNC</span>
            <span className={syncing ? "text-[var(--color-signal)]" : "text-emerald-600"}>
              {syncing ? "…" : "OK"}
            </span>
          </div>
        </div>
        {/* Bottom torn-paper edge */}
        <div
          className="absolute -bottom-1.5 inset-x-0 h-3"
          style={{
            background:
              "radial-gradient(circle at 6px 0px, white 5px, transparent 5px) 0 0 / 12px 12px repeat-x",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
