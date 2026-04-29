"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

export function StatusChip({ messages }: { messages: readonly string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % messages.length), 2500);
    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink)]/10 bg-[var(--color-paper)]/80 backdrop-blur-md px-3 py-1.5 text-xs shadow-sm">
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-signal)]/60 animate-ping" />
        <span className="relative inline-flex size-2 rounded-full bg-[var(--color-signal)]" />
      </span>
      <span className="overflow-hidden inline-block w-[8.5rem]">
        <AnimatePresence mode="wait">
          <motion.span
            key={messages[i]}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="block whitespace-nowrap font-medium"
          >
            <Check size={11} className="inline mr-1 -mt-0.5" />
            {messages[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
