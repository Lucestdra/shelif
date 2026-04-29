"use client";

import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  const { t } = useT();
  return (
    <footer className="relative bg-[var(--color-ink)] text-[var(--color-paper)] py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12">
          <div>
            <Wordmark dark />
            <p className="mt-4 text-sm text-[var(--color-paper)]/60 max-w-xs text-pretty">
              {t.footer.manifesto}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-paper)]/40 mb-1">
              {t.footer.location.split("·")[0].trim()}
            </span>
            <span className="text-[var(--color-paper)]/80">{t.footer.location}</span>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-paper)]/40 mb-1">
              Contact
            </span>
            <a
              href="mailto:halim@shelif.com"
              className="text-[var(--color-paper)]/80 hover:text-[var(--color-signal)] transition-colors"
            >
              halim@shelif.com
            </a>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-[var(--color-paper)]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[var(--color-paper)]/50">
          <span>{t.footer.copyright} · {t.footer.rights}</span>
          <span className="font-mono">v0.1 · concept · BIGG / TÜBİTAK 1812</span>
        </div>
      </Container>
    </footer>
  );
}
