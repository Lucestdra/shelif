"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "ghost" | "ghost-dark";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-tight transition-colors will-change-transform select-none";

    const variants: Record<Variant, string> = {
      primary:
        "bg-[var(--color-signal)] text-[var(--color-paper)] hover:bg-[var(--color-signal-deep)]",
      ghost:
        "bg-transparent text-[var(--color-ink)] border border-[var(--color-ink)]/15 hover:bg-[var(--color-ink)]/5",
      "ghost-dark":
        "bg-transparent text-[var(--color-paper)] border border-[var(--color-paper)]/20 hover:bg-[var(--color-paper)]/10",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className={cn(base, variants[variant], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);
Button.displayName = "Button";
