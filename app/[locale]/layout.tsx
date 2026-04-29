import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { DictProvider } from "@/components/providers/DictProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Preloader } from "@/components/ui/Preloader";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
    alternates: {
      languages: {
        tr: "/tr",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <DictProvider dict={dict} locale={locale as Locale}>
      <Preloader />
      <LenisProvider>{children}</LenisProvider>
    </DictProvider>
  );
}
