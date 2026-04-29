"use client";

import { createContext, useContext } from "react";
import type { Dict, Locale } from "@/lib/i18n/types";

type Ctx = { t: Dict; locale: Locale };
const DictCtx = createContext<Ctx | null>(null);

export function DictProvider({
  dict,
  locale,
  children,
}: {
  dict: Dict;
  locale: Locale;
  children: React.ReactNode;
}) {
  return <DictCtx.Provider value={{ t: dict, locale }}>{children}</DictCtx.Provider>;
}

export function useT(): Ctx {
  const ctx = useContext(DictCtx);
  if (!ctx) throw new Error("useT must be used inside <DictProvider>");
  return ctx;
}
