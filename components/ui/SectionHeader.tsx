import { cn } from "@/lib/utils/cn";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "left",
  accent,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  sub?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 max-w-3xl",
        align === "center" && "mx-auto text-center items-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--color-mute)]">
            <span className="size-1 rounded-full bg-[var(--color-signal)]" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
          {title}
          {accent && (
            <>
              {" "}
              <span className="text-[var(--color-signal)]">{accent}</span>
            </>
          )}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="text-pretty text-base md:text-lg text-[var(--color-mute)] max-w-2xl">
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
