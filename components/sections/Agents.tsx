"use client";

import { motion } from "motion/react";
import { Bot, Radar, Activity } from "lucide-react";
import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const AGENT_ICONS = [Bot, Radar];

export function Agents() {
  const { t } = useT();

  return (
    <section
      id="agents"
      className="relative py-28 md:py-40 bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden noise"
    >
      {/* Grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-paper) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1), transparent 75%)",
        }}
      />
      {/* Red glow */}
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] size-[60vh] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(225,10,23,0.4), transparent 60%)",
          opacity: 0.3,
        }}
      />

      <Container>
        <SectionHeader
          eyebrow={t.agents.eyebrow}
          title={<span className="text-[var(--color-paper)]">{t.agents.title}</span>}
          accent={
            <span style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}>
              {t.agents.titleAccent}
            </span>
          }
          sub={<span className="text-[var(--color-paper)]/60">{t.agents.sub}</span>}
        />

        <div className="mt-16 md:mt-20 flex flex-col gap-6">
          {t.agents.cards.map((card, i) => {
            const Icon = AGENT_ICONS[i] ?? Bot;
            return (
              <AgentCard
                key={card.code}
                icon={Icon}
                code={card.code}
                name={card.name}
                tagline={card.tagline}
                inputs={card.inputs as readonly string[]}
                capabilities={card.capabilities as readonly string[]}
                output={card.output}
                inputsLabel={t.agents.inputsLabel}
                outputsLabel={t.agents.outputsLabel}
                capabilitiesLabel={t.agents.capabilitiesLabel}
                activeBadge={t.agents.activeBadge}
                index={i}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function AgentCard({
  icon: Icon,
  code,
  name,
  tagline,
  inputs,
  capabilities,
  output,
  inputsLabel,
  outputsLabel,
  capabilitiesLabel,
  activeBadge,
  index,
}: {
  icon: typeof Bot;
  code: string;
  name: string;
  tagline: string;
  inputs: readonly string[];
  capabilities: readonly string[];
  output: string;
  inputsLabel: string;
  outputsLabel: string;
  capabilitiesLabel: string;
  activeBadge: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl border border-[var(--color-paper)]/10 bg-[var(--color-paper)]/[0.03] backdrop-blur-sm p-7 md:p-10 overflow-hidden"
    >
      {/* sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.04), rgba(255,255,255,0) 35%)",
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-2xl border border-[var(--color-signal)]/40"
                animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
              />
              <div
                className="size-14 rounded-2xl grid place-items-center text-[var(--color-paper)]"
                style={{
                  background:
                    "linear-gradient(155deg, rgba(225,10,23,0.9), rgba(166,8,16,1))",
                  boxShadow: "0 16px 36px -16px rgba(225,10,23,0.7)",
                }}
              >
                <Icon size={22} />
              </div>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-paper)]/50">
                {code}
              </span>
              <h3 className="font-display text-2xl md:text-3xl tracking-tight leading-tight">
                {name}
              </h3>
              <p className="mt-2 text-[var(--color-paper)]/65 italic max-w-md">
                "{tagline}"
              </p>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-3 py-1.5 text-[11px] font-medium text-emerald-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {activeBadge}
          </span>
        </div>

        {/* Architecture diagram */}
        <div className="mt-9 md:mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_1fr] gap-5 md:gap-3 items-center">
          {/* Inputs */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-paper)]/40 mb-1">
              {inputsLabel}
            </span>
            {inputs.map((input, i) => (
              <motion.div
                key={input}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                className="rounded-lg border border-[var(--color-paper)]/10 bg-[var(--color-paper)]/[0.04] px-3 py-2 text-sm font-mono text-[var(--color-paper)]/85"
              >
                {input}
              </motion.div>
            ))}
          </div>

          <Connector index={index} />

          {/* Agent core */}
          <div className="grid place-items-center my-4 md:my-0">
            <AgentCore />
          </div>

          <Connector index={index} delay={0.4} />

          {/* Output */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-paper)]/40 mb-1">
              {outputsLabel}
            </span>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-lg border border-[var(--color-signal)]/40 bg-[var(--color-signal)]/10 px-3 py-2.5 text-sm font-mono text-[var(--color-paper)]"
              style={{ boxShadow: "0 0 30px -10px rgba(225,10,23,0.5)" }}
            >
              {output}
            </motion.div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--color-paper)]/40 mt-1">
              <Activity size={10} />
              <span>last fired · 0.4s ago</span>
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="mt-10 pt-6 border-t border-[var(--color-paper)]/10">
          <span className="block text-[10px] uppercase tracking-[0.22em] text-[var(--color-paper)]/40 mb-3">
            {capabilitiesLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {capabilities.map((cap, i) => (
              <motion.span
                key={cap}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                className="rounded-full border border-[var(--color-paper)]/12 bg-[var(--color-paper)]/[0.04] px-3 py-1.5 text-xs text-[var(--color-paper)]/80"
              >
                {cap}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Connector({ index, delay = 0 }: { index: number; delay?: number }) {
  return (
    <div className="hidden md:block relative w-16 h-px bg-[var(--color-paper)]/15 overflow-visible">
      {/* travelling pulse */}
      <motion.span
        aria-hidden
        className="absolute top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-[var(--color-signal)]"
        style={{ boxShadow: "0 0 12px rgba(225,10,23,0.9)" }}
        animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          repeatDelay: 1.2,
          delay: index * 0.4 + delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </div>
  );
}

function AgentCore() {
  return (
    <div className="relative size-28 md:size-32 grid place-items-center">
      {/* Outer dashed ring (rotating CW) */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-[var(--color-signal)]/35"
      />
      {/* Inner ring (rotating CCW) */}
      <motion.div
        aria-hidden
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-3 rounded-full border border-[var(--color-paper)]/10"
      >
        <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-[var(--color-signal)]" />
        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-[var(--color-paper)]/40" />
      </motion.div>
      {/* Pulse aura */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0, 0.45] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-5 rounded-full border border-[var(--color-signal)]/30"
      />
      {/* Core */}
      <div
        className="relative size-14 rounded-full grid place-items-center text-[var(--color-paper)]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #2a2a2c 0%, #0a0a0b 70%)",
          boxShadow:
            "inset 0 0 0 1px rgba(225,10,23,0.4), 0 0 30px -8px rgba(225,10,23,0.5)",
        }}
      >
        <motion.span
          aria-hidden
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="size-2 rounded-full bg-[var(--color-signal)]"
          style={{ boxShadow: "0 0 12px rgba(225,10,23,0.9)" }}
        />
      </div>
    </div>
  );
}
