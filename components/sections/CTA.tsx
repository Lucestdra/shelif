"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check } from "lucide-react";
import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(1),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

export function CTA() {
  const { t, locale } = useT();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: t.cta.roles[0] },
  });

  async function onSubmit(data: FormData) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative py-28 md:py-44 bg-[var(--color-graphite)] text-[var(--color-paper)] overflow-hidden noise"
    >
      {/* Animated grid */}
      <motion.div
        aria-hidden
        className="absolute inset-0 grid-bg"
        animate={{ backgroundPosition: ["0px 0px", "56px 56px"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-[var(--color-paper)]/10"
      />
      {/* Glowing orb */}
      <motion.div
        aria-hidden
        className="absolute -top-32 right-[-15%] size-[60vh] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(225,10,23,0.55), transparent 60%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-15%] left-[-10%] size-[45vh] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(225,10,23,0.35), transparent 60%)",
        }}
        animate={{ scale: [1.05, 0.95, 1.05], opacity: [0.12, 0.24, 0.12] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container>
        <div className="relative">
          <SectionHeader
            eyebrow={t.cta.eyebrow}
            title={<span className="text-[var(--color-paper)]">{t.cta.title}</span>}
            sub={<span className="text-[var(--color-paper)]/65">{t.cta.sub}</span>}
            align="center"
          />
        </div>

        <div className="relative mt-16 md:mt-20 max-w-2xl mx-auto">
          {/* Form card */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit(onSubmit)}
            className="relative rounded-3xl bg-[var(--color-paper)]/[0.04] backdrop-blur-md border border-[var(--color-paper)]/10 p-7 md:p-9 overflow-hidden"
          >
            {/* Inner sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background:
                  "linear-gradient(155deg, rgba(255,255,255,0.06), rgba(255,255,255,0) 40%)",
              }}
            />

            {status === "success" ? (
              <div className="relative flex flex-col items-center justify-center text-center py-12 gap-5">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="size-14 rounded-full bg-[var(--color-signal)] grid place-items-center shadow-[0_0_60px_rgba(225,10,23,0.45)]"
                >
                  <Check size={26} />
                </motion.div>
                <p className="font-display text-2xl text-pretty max-w-xs">{t.cta.success}</p>
              </div>
            ) : (
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label={t.cta.name} error={errors.name?.message}>
                  <input
                    {...register("name")}
                    className="w-full bg-transparent border-b border-[var(--color-paper)]/20 focus:border-[var(--color-signal)] py-2 outline-none text-[var(--color-paper)] transition-colors"
                  />
                </Field>
                <Field label={t.cta.email} error={errors.email?.message}>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full bg-transparent border-b border-[var(--color-paper)]/20 focus:border-[var(--color-signal)] py-2 outline-none text-[var(--color-paper)] transition-colors"
                  />
                </Field>
                <Field
                  label={t.cta.role}
                  error={errors.role?.message}
                  className="sm:col-span-2"
                >
                  <select
                    {...register("role")}
                    className="w-full bg-transparent border-b border-[var(--color-paper)]/20 focus:border-[var(--color-signal)] py-2 outline-none text-[var(--color-paper)] transition-colors"
                  >
                    {t.cta.roles.map((r) => (
                      <option key={r} value={r} className="bg-[var(--color-graphite)]">
                        {r}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label={t.cta.message}
                  error={errors.message?.message}
                  className="sm:col-span-2"
                >
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="w-full bg-transparent border-b border-[var(--color-paper)]/20 focus:border-[var(--color-signal)] py-2 outline-none text-[var(--color-paper)] transition-colors resize-none"
                  />
                </Field>
                <div className="sm:col-span-2 flex items-center justify-between mt-2">
                  {status === "error" && (
                    <span className="text-sm text-[var(--color-signal)]">
                      {t.cta.error}
                    </span>
                  )}
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === "sending"}
                    className="ml-auto inline-flex items-center gap-2 rounded-full bg-[var(--color-signal)] hover:bg-[var(--color-signal-deep)] disabled:opacity-60 px-6 py-3.5 text-sm font-medium transition-colors shadow-[0_10px_30px_-10px_rgba(225,10,23,0.7)]"
                  >
                    {status === "sending" ? t.cta.sending : t.cta.submit}
                    <Send size={14} />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={className}>
      <span className="block text-[10px] uppercase tracking-[0.18em] text-[var(--color-paper)]/50 mb-1">
        {label}
      </span>
      {children}
      {error && (
        <span className="text-[11px] text-[var(--color-signal)]/90 mt-1 block">
          {error}
        </span>
      )}
    </label>
  );
}
