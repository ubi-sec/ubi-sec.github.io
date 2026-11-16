import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HudCard({
  children,
  className,
  innerClassName,
  interactive = true,
  danger = false,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  interactive?: boolean;
  danger?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("hud", interactive && "hud-interactive", danger && "hud-danger", className)} {...rest}>
      <div className={cn("hud-inner p-4 sm:p-5", innerClassName)}>{children}</div>
    </div>
  );
}

export function CardHeader({ icon, title, action }: { icon: ReactNode; title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-foreground">
        <span className="text-primary [&_svg]:size-5">{icon}</span>
        {title}
      </h3>
      {action}
    </div>
  );
}

export function SectionHeading({ index, title, kicker }: { index: string; title: string; kicker?: string }) {
  return (
    <div className="mb-8" data-reveal>
      <p className="eyebrow">// {index}</p>
      <h2 className="section-title mt-2 text-3xl text-foreground sm:text-4xl">
        {title.split(" ").map((w, i, arr) =>
          i === arr.length - 1 ? (
            <span key={i} className="text-primary text-glow">{w}</span>
          ) : (
            <span key={i}>{w} </span>
          ),
        )}
      </h2>
      {kicker && <p className="mt-3 max-w-2xl text-muted-foreground">{kicker}</p>}
      <div className="mt-4 h-px w-40 bg-gradient-to-r from-primary to-transparent" />
    </div>
  );
}
