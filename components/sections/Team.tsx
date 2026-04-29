"use client";

import { motion } from "motion/react";
import { Linkedin } from "lucide-react";
import { useT } from "@/components/providers/DictProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Team() {
  const { t } = useT();

  return (
    <section id="team" className="relative py-28 md:py-40 bg-[var(--color-paper)]">
      <Container>
        <SectionHeader
          eyebrow={t.team.eyebrow}
          title={t.team.title}
          sub={t.team.sub}
        />

        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {t.team.members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col gap-4"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--color-paper-2)] border border-[var(--color-ink)]/8">
                <Avatar name={m.name} />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                  <span className="rounded-full bg-[var(--color-paper)]/80 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium">
                    {m.role.split("·")[0].trim()}
                  </span>
                  <a
                    href="#"
                    aria-label={`${m.name} LinkedIn`}
                    className="size-7 rounded-full bg-[var(--color-paper)]/80 backdrop-blur-sm grid place-items-center hover:bg-[var(--color-signal)] hover:text-[var(--color-paper)] transition-colors"
                  >
                    <Linkedin size={12} />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg leading-tight">{m.name}</h3>
                <p className="text-xs text-[var(--color-signal)] font-medium uppercase tracking-wider mt-1">
                  {m.role}
                </p>
                <p className="text-xs text-[var(--color-mute)] mt-2 text-pretty leading-relaxed">
                  {m.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter((p) => !p.match(/^(Dr|Prof|Dr\.|Prof\.)$/i))
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  // deterministic hash for hue rotation
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const hue = h % 60;

  return (
    <div
      className="absolute inset-0 grid place-items-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        background: `linear-gradient(155deg, hsl(${hue} 12% 92%), hsl(${
          hue + 20
        } 8% 84%))`,
      }}
    >
      <span className="font-display text-7xl text-[var(--color-ink)]/15 select-none">
        {initials}
      </span>
      {/* subtle vertical bar accent */}
      <span className="absolute left-0 top-0 h-full w-1 bg-[var(--color-signal)]/0 group-hover:bg-[var(--color-signal)] transition-colors duration-500" />
    </div>
  );
}
