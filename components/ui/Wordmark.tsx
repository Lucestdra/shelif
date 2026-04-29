import { cn } from "@/lib/utils/cn";

export function Wordmark({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display font-medium tracking-tight text-[1.35rem] leading-none select-none",
        dark ? "text-[var(--color-paper)]" : "text-[var(--color-ink)]",
        className,
      )}
    >
      shel
      <span className="relative inline-block">
        <span className="opacity-0">i</span>
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-[0.18em] mx-auto h-[0.55em] w-[0.18em] bg-current"
        />
        <span
          aria-hidden
          className="absolute left-1/2 top-[0.05em] -translate-x-1/2 size-[0.32em] rounded-full bg-[var(--color-signal)]"
        />
      </span>
      f
    </span>
  );
}
