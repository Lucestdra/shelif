"use client";

import { Wifi, BatteryFull } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function PhoneMock({
  children,
  className,
  width = 280,
}: {
  children: React.ReactNode;
  className?: string;
  width?: number;
}) {
  return (
    <div
      className={cn("relative", className)}
      style={{ width: `min(${width}px, 80vw)` }}
    >
      {/* Side buttons — left edge */}
      <span
        aria-hidden
        className="absolute top-[14%] -left-[2px] w-[3px] h-9 rounded-l-sm"
        style={{ background: "linear-gradient(90deg, #6e6e73, #2a2a2c 60%)" }}
      />
      <span
        aria-hidden
        className="absolute top-[24%] -left-[2px] w-[3px] h-14 rounded-l-sm"
        style={{ background: "linear-gradient(90deg, #6e6e73, #2a2a2c 60%)" }}
      />
      <span
        aria-hidden
        className="absolute top-[37%] -left-[2px] w-[3px] h-14 rounded-l-sm"
        style={{ background: "linear-gradient(90deg, #6e6e73, #2a2a2c 60%)" }}
      />
      {/* Power button — right edge */}
      <span
        aria-hidden
        className="absolute top-[28%] -right-[2px] w-[3px] h-20 rounded-r-sm"
        style={{ background: "linear-gradient(270deg, #6e6e73, #2a2a2c 60%)" }}
      />

      {/* Outer titanium frame */}
      <div
        className="relative rounded-[44px] p-[2px]"
        style={{
          background:
            "linear-gradient(155deg, #6e6e73 0%, #2a2a2c 22%, #1a1a1c 50%, #2a2a2c 78%, #6e6e73 100%)",
          boxShadow:
            "0 35px 80px -30px rgba(10,10,11,0.55), inset 0 0 0 0.5px rgba(255,255,255,0.1)",
        }}
      >
        {/* Inner bezel */}
        <div
          className="relative rounded-[42px] p-[8px] bg-[#0a0a0b]"
          style={{ aspectRatio: "9 / 19.5" }}
        >
          {/* Display */}
          <div className="relative h-full w-full rounded-[34px] overflow-hidden bg-[var(--color-paper)]">
            {/* Status bar — time on the left */}
            <div className="absolute top-2 left-5 z-20 font-mono text-[10px] text-[var(--color-ink)]/75">
              9:41
            </div>
            {/* Status bar — wifi/battery on the right */}
            <div className="absolute top-[7px] right-5 z-20 flex items-center gap-1 text-[var(--color-ink)]/75">
              <Wifi size={10} strokeWidth={2.4} />
              <BatteryFull size={11} strokeWidth={2} />
            </div>

            {/* Dynamic Island */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-30 h-[26px] w-[100px] bg-[var(--color-ink)] rounded-full">
              <span
                aria-hidden
                className="absolute top-1/2 right-3 -translate-y-1/2 size-[6px] rounded-full"
                style={{ background: "radial-gradient(circle, #1a1a1c 0%, #0a0a0b 70%)" }}
              />
              <span
                aria-hidden
                className="absolute top-1/2 right-[14px] -translate-y-1/2 size-[3px] rounded-full bg-[#3a3a3c]/40"
              />
            </div>

            {/* App content */}
            <div className="absolute inset-0 pt-9 pb-3 px-3.5 flex flex-col">
              {children}
            </div>
          </div>
        </div>

        {/* Sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[44px]"
          style={{
            background:
              "linear-gradient(155deg, rgba(255,255,255,0.18), rgba(255,255,255,0) 30%)",
          }}
        />
      </div>
    </div>
  );
}
