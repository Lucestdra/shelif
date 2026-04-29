"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useT } from "@/components/providers/DictProvider";
import { locales } from "@/lib/i18n/types";
import { cn } from "@/lib/utils/cn";

export function LocaleToggle() {
  const { locale } = useT();
  const pathname = usePathname() || "/";

  function pathFor(loc: string) {
    if (pathname === "/") return `/${loc}`;
    return pathname.replace(/^\/(tr|en)(?=\/|$)/, `/${loc}`);
  }

  return (
    <div className="relative inline-flex rounded-full border border-[var(--color-ink)]/15 p-0.5 bg-[var(--color-paper)]/60 backdrop-blur-sm">
      {locales.map((l) => {
        const active = locale === l;
        return (
          <Link
            key={l}
            href={pathFor(l)}
            className={cn(
              "relative px-3 py-1 text-xs uppercase tracking-[0.12em] rounded-full transition-colors",
              active ? "text-[var(--color-paper)]" : "text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]",
            )}
          >
            {active && (
              <motion.span
                layoutId="locale-pill"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="absolute inset-0 rounded-full bg-[var(--color-ink)]"
              />
            )}
            <span className="relative">{l}</span>
          </Link>
        );
      })}
    </div>
  );
}
