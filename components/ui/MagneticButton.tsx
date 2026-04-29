"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils/cn";

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 18,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    if (!ref.current) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = ((e.clientX - rect.left) / rect.width - 0.5) * strength * 2;
    const dy = ((e.clientY - rect.top) / rect.height - 0.5) * strength * 2;
    x.set(dx);
    y.set(dy);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className="inline-flex items-center justify-center"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={cn("inline-block", className)}
      >
        <motion.div ref={ref}>{inner}</motion.div>
      </a>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={cn("inline-block cursor-pointer", className)}
    >
      {inner}
    </motion.div>
  );
}
