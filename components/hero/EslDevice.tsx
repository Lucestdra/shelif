"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useInView,
} from "motion/react";
import { PriceRoll } from "./PriceRoll";

export function EslDevice({
  productLabel,
  price,
  syncing = false,
  scrollLinked = false,
}: {
  productLabel: string;
  price: number;
  syncing?: boolean;
  scrollLinked?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [4, -4]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-6, 6]), { stiffness: 80, damping: 20 });
  const tx = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 80, damping: 20 });
  const ty = useSpring(useTransform(my, [-1, 1], [-8, 8]), { stiffness: 80, damping: 20 });

  const { scrollY } = useScroll();
  const scrollScale = useTransform(scrollY, [0, 800], scrollLinked ? [1, 0.88] : [1, 1]);
  const scrollX = useTransform(scrollY, [0, 800], scrollLinked ? [0, 60] : [0, 0]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hover = window.matchMedia("(hover: hover)").matches;
    if (!hover) return;
    function onMove(e: MouseEvent) {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      mx.set(Math.max(-1.2, Math.min(1.2, dx)));
      my.set(Math.max(-1.2, Math.min(1.2, dy)));
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scrollScale,
        x: scrollX,
        rotateX: rx,
        rotateY: ry,
        translateX: tx,
        translateY: ty,
        transformPerspective: 1200,
      }}
      className="relative will-change-transform"
      aria-hidden
    >
      {/* reveal layer (one-shot) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
      {/* idle float wrapper (continuous) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* contact shadow */}
        <div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-12 rounded-[50%] blur-3xl bg-[var(--color-ink)]/35"
          aria-hidden
        />

        {/* Plastic frame */}
        <div
          className="relative rounded-[28px] p-3 md:p-4 shadow-[0_30px_80px_-30px_rgba(10,10,11,0.45),0_8px_24px_-12px_rgba(10,10,11,0.25)]"
          style={{
            background:
              "linear-gradient(155deg, #ffffff 0%, #f7f6f1 55%, #e9e7e0 100%)",
            border: "1px solid rgba(10,10,11,0.06)",
            width: "min(560px, 92vw)",
            aspectRatio: "16 / 9.6",
          }}
        >
          <div
            className="absolute inset-3 md:inset-4 rounded-[14px] overflow-hidden flex flex-col"
            style={{
              background: "#fefefe",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,1), inset 0 0 0 1px rgba(10,10,11,0.06)",
            }}
          >
            {/* Header bar (black) */}
            <div className="bg-[var(--color-ink)] text-white flex items-center justify-between px-4 md:px-5 py-2.5 md:py-3">
              <div className="font-display font-medium text-[clamp(11px,1.6vw,16px)] leading-tight max-w-[78%] line-clamp-2">
                {productLabel}
              </div>
              <NfcIcon />
            </div>

            {/* Body */}
            <div className="flex-1 grid grid-cols-[1fr_1.4fr] gap-3 md:gap-4 p-3 md:p-4">
              {/* QR */}
              <div className="relative flex items-center justify-center">
                <QrBlock />
                <ShimmerSweep />
              </div>

              {/* Right side */}
              <div className="relative flex flex-col justify-between">
                <div className="flex items-center gap-1 self-end pr-1">
                  <Stars play={inView} />
                  <span className="ml-2 font-mono text-[clamp(10px,1.3vw,13px)] text-[var(--color-signal)]">
                    4.5 (899)
                  </span>
                </div>

                <div className="self-end flex items-baseline gap-0.5 pr-1">
                  <span className="font-display text-[clamp(28px,5.2vw,52px)] leading-none">£</span>
                  <PriceRoll
                    value={price}
                    className="font-display text-[clamp(40px,8vw,96px)] leading-none tracking-tight"
                  />
                </div>

                <div className="self-end font-mono text-[clamp(9px,1.2vw,12px)] text-[var(--color-ink)]/70 pr-1">
                  £{(price / 2.5).toFixed(2)} / 100 ml
                </div>
              </div>
            </div>

            {/* sync overlay */}
            {syncing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: "100%" }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                  className="absolute inset-x-0 h-1/3"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, rgba(225,10,23,0.18), transparent)",
                  }}
                />
              </motion.div>
            )}
          </div>

          {/* Glossy highlight */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{
              background:
                "linear-gradient(155deg, rgba(255,255,255,0.45), rgba(255,255,255,0) 35%)",
            }}
            aria-hidden
          />
        </div>
      </motion.div>
      </motion.div>
    </motion.div>
  );
}

function NfcIcon() {
  return (
    <div className="relative shrink-0">
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-md ring-2 ring-white/60"
        aria-hidden
      />
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="rounded-md p-[3px] bg-white text-[var(--color-ink)]"
      >
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M8 7c2 0 4 1.5 4 5s-2 5-4 5" />
        <path d="M11 7c3 0 5 1.5 5 5s-2 5-5 5" />
      </svg>
    </div>
  );
}

function Stars({ play }: { play: boolean }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={play ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4 + i * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="var(--color-signal)"
          className="drop-shadow-sm"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21.02 7 14.14 2 9.27l6.91-1.01L12 2z" />
        </motion.svg>
      ))}
    </div>
  );
}

function QrBlock() {
  return (
    <div
      className="relative aspect-square w-full max-w-[140px] bg-white"
      style={{
        backgroundImage:
          "linear-gradient(0deg, transparent 50%, var(--color-ink) 50%), linear-gradient(90deg, transparent 50%, var(--color-ink) 50%)",
        backgroundSize: "8% 8%, 8% 8%",
        maskImage:
          "radial-gradient(circle at 12% 12%, transparent 0 22%, black 22%), radial-gradient(circle at 88% 12%, transparent 0 22%, black 22%), radial-gradient(circle at 12% 88%, transparent 0 22%, black 22%), linear-gradient(black, black)",
        WebkitMaskComposite: "source-over",
      }}
      aria-hidden
    >
      {/* simulated QR finder squares */}
      <FinderSquare className="top-0 left-0" />
      <FinderSquare className="top-0 right-0" />
      <FinderSquare className="bottom-0 left-0" />
    </div>
  );
}

function FinderSquare({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute size-[28%] bg-white p-[6%] ${className}`}>
      <div className="size-full bg-[var(--color-ink)] p-[18%]">
        <div className="size-full bg-white" />
        <div className="absolute inset-[28%] bg-[var(--color-ink)]" />
      </div>
    </div>
  );
}

function ShimmerSweep() {
  return (
    <motion.div
      aria-hidden
      initial={{ x: "-150%", opacity: 0 }}
      animate={{ x: "150%", opacity: [0, 0.6, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
      className="absolute inset-0 pointer-events-none mix-blend-overlay"
      style={{
        background:
          "linear-gradient(115deg, transparent 30%, rgba(225,10,23,0.18) 50%, transparent 70%)",
      }}
    />
  );
}
