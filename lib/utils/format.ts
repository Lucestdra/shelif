import type { Locale } from "@/lib/i18n/types";

export function formatNumber(n: number, locale: Locale): string {
  const tag = locale === "tr" ? "tr-TR" : "en-US";
  return new Intl.NumberFormat(tag, {
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n);
}
