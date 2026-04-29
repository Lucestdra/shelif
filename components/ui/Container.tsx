import { cn } from "@/lib/utils/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("container-x", className)}>{children}</div>;
}
