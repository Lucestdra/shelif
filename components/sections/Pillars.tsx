"use client";

import { motion } from "motion/react";
import { ArrowLeftRight, Bot, TrendingUp } from "lucide-react";
import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/utils/cn";

const ICONS = [ArrowLeftRight, Bot, TrendingUp];

export function Pillars() {
  const { t } = useT();
  const items = t.pillars.items;

  return (
    <section className="relative py-28 md:py-40 bg-[var(--color-paper)]">
      <Container>
        <SectionHeader
          eyebrow={t.pillars.eyebrow}
          title={t.pillars.title}
          sub={t.pillars.sub}
        />

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          <Tile index={0} icon={ICONS[0]} title={items[0].title} body={items[0].body}>
            <SyncIllustration />
          </Tile>

          <Tile
            index={1}
            icon={ICONS[1]}
            title={items[1].title}
            body={items[1].body}
            featured
          >
            <OrderingChart />
          </Tile>

          <Tile index={2} icon={ICONS[2]} title={items[2].title} body={items[2].body}>
            <TrendsMarquee />
          </Tile>
        </div>
      </Container>
    </section>
  );
}

function Tile({
  icon: Icon,
  title,
  body,
  children,
  index,
  featured = false,
}: {
  icon: typeof ArrowLeftRight;
  title: string;
  body: string;
  children?: React.ReactNode;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl p-7 md:p-8 transition-all border min-h-[340px] flex flex-col",
        featured
          ? "bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]"
          : "bg-[var(--color-paper-2)] border-[var(--color-ink)]/5",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-[radial-gradient(circle_at_70%_-10%,rgba(225,10,23,0.18),transparent_55%)]",
        )}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={cn(
              "size-10 grid place-items-center rounded-xl",
              featured
                ? "bg-[var(--color-paper)]/10 text-[var(--color-paper)]"
                : "bg-[var(--color-ink)] text-[var(--color-paper)]",
            )}
          >
            <Icon size={18} />
          </div>
          <h3 className="font-display text-xl md:text-2xl tracking-tight">
            {title}
          </h3>
        </div>
        <p
          className={cn(
            "text-sm md:text-base text-pretty",
            featured ? "text-[var(--color-paper)]/70" : "text-[var(--color-mute)]",
          )}
        >
          {body}
        </p>

        <div className="mt-auto pt-6">{children}</div>
      </div>
    </motion.div>
  );
}

function SyncIllustration() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="rounded-xl border border-[var(--color-ink)]/10 bg-[var(--color-paper)] px-4 py-3 font-mono text-sm">
        ₺2,00
      </div>
      <motion.div
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="text-[var(--color-signal)]"
      >
        ⇄
      </motion.div>
      <div className="rounded-xl border border-[var(--color-ink)]/10 bg-[var(--color-paper)] px-4 py-3 font-mono text-sm">
        ₺2,00
      </div>
    </div>
  );
}

function OrderingChart() {
  const points = [60, 52, 48, 38, 30, 22, 18, 12, 8, 28, 42, 50];
  const max = 70;
  const w = 260;
  const h = 110;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${i * step},${h - (p / max) * h}`)
    .join(" ");
  const triggerIndex = 8;
  const triggerX = triggerIndex * step;
  const triggerY = h - (points[triggerIndex] / max) * h;

  return (
    <div className="relative w-full">
      <div className="text-xs text-[var(--color-paper)]/50 mb-2 flex items-center gap-3">
        <span>min</span>
        <div className="flex-1 h-px bg-[var(--color-paper)]/15" />
        <span>stok</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h + 20}`} className="w-full h-auto" aria-hidden>
        <line
          x1="0"
          y1={h - (15 / max) * h}
          x2={w}
          y2={h - (15 / max) * h}
          strokeDasharray="3 4"
          stroke="rgba(250,250,247,0.18)"
        />
        <motion.path
          d={path}
          fill="none"
          stroke="var(--color-paper)"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.circle
          cx={triggerX}
          cy={triggerY}
          r={4}
          fill="var(--color-signal)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 1.4, duration: 0.4 }}
        />
      </svg>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 1.7, duration: 0.5 }}
        className="absolute right-0 -top-1 inline-flex items-center gap-2 rounded-full bg-[var(--color-signal)] text-[var(--color-paper)] px-3 py-1 text-[10px] font-mono"
      >
        ↻ Order placed · 48
      </motion.div>
    </div>
  );
}

function TrendsMarquee() {
  const items = [
    "#kahvaltılık",
    "Vusion 4.99 ₺",
    "↑ Enerji içeceği",
    "Pricer 5.20 ₺",
    "#kışmenüsü",
    "Hanshow 3.80 ₺",
    "↑ Şarküteri",
    "#bayram",
  ];
  return (
    <Marquee duration={32} className="text-sm text-[var(--color-mute)]">
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          <span className="size-1 rounded-full bg-[var(--color-signal)]" />
          {it}
        </span>
      ))}
    </Marquee>
  );
}
