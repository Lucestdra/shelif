"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils/cn";

export function Marquee({
  children,
  duration = 28,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap will-change-transform"
      >
        <div className="flex gap-10 shrink-0">{children}</div>
        <div className="flex gap-10 shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
