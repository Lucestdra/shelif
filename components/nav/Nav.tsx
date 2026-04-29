"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useT } from "@/components/providers/DictProvider";
import { Wordmark } from "@/components/ui/Wordmark";
import { LocaleToggle } from "./LocaleToggle";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils/cn";

export function Nav() {
  const { t, locale } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#how", label: t.nav.how },
    { href: "#demo", label: t.nav.demo },
    { href: "#agents", label: t.nav.agents },
  ];

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-[rgba(250,250,247,0.72)] backdrop-blur-xl border-b border-[var(--color-ink)]/8"
          : "bg-transparent",
      )}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-18">
        <Link href={`/${locale}`} className="flex items-center" aria-label="Shelif">
          <Wordmark />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-[var(--color-ink)]/75 hover:text-[var(--color-ink)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LocaleToggle />
          <MagneticButton href="#contact">
            <span className="inline-flex items-center rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--color-signal)] transition-colors">
              {t.nav.contact}
            </span>
          </MagneticButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2"
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[var(--color-paper)] border-t border-[var(--color-ink)]/8"
          >
            <div className="container-x py-6 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-lg border-b border-[var(--color-ink)]/8"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center justify-between pt-5">
                <LocaleToggle />
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] px-5 py-2.5 text-sm"
                >
                  {t.nav.contact}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
