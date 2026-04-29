"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils/cn";

function formatPrice(value: number): string {
  return value.toFixed(2);
}

export function PriceRoll({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const text = formatPrice(value);
  const chars = text.split("");

  return (
    <span className={cn("inline-flex items-baseline font-mono", className)} aria-label={text}>
      {chars.map((ch, idx) => {
        if (ch === ".") {
          return (
            <span key={idx} className="inline-block">
              .
            </span>
          );
        }
        return (
          <Digit key={`${idx}-${ch}`} ch={ch} animate={mounted} delay={idx * 0.05} />
        );
      })}
    </span>
  );
}

function Digit({ ch, animate, delay }: { ch: string; animate: boolean; delay: number }) {
  return (
    <span className="relative inline-block overflow-hidden align-baseline" style={{ width: "0.62em" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ch}
          initial={animate ? { y: "100%", opacity: 0 } : false}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {ch}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
