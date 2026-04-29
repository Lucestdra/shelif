"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils/cn";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
  amount?: number;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  amount = 0.3,
  once = true,
  className,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
