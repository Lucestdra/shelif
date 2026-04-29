import type { Dict, Locale } from "./types";

const dictionaries = {
  tr: () => import("./tr").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
};

export const getDictionary = async (locale: Locale): Promise<Dict> =>
  dictionaries[locale]() as Promise<Dict>;
