"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function format(n: number, fractionDigits: number, locale: "tr" | "en") {
  const tag = locale === "tr" ? "tr-TR" : "en-US";
  return new Intl.NumberFormat(tag, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(n);
}

export function AnimatedCounter({
  value,
  duration = 1800,
  prefix = "",
  suffix = "",
  fractionDigits,
  locale = "tr",
  className,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  fractionDigits?: number;
  locale?: "tr" | "en";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);
  const fd = fractionDigits ?? (value % 1 === 0 ? 0 : 1);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = easeOutQuart(p);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {prefix}
      <span className="font-tabular">{format(display, fd, locale)}</span>
      {suffix}
    </span>
  );
}
