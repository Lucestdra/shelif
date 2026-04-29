import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/types";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Problem } from "@/components/sections/Problem";
import { Sustainability } from "@/components/sections/Sustainability";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { Agents } from "@/components/sections/Agents";
import { Pillars } from "@/components/sections/Pillars";
import { Comparison } from "@/components/sections/Comparison";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Problem />
        <Sustainability />
        <HowItWorks />
        <LiveDemo />
        <Agents />
        <Pillars />
        <Comparison />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
