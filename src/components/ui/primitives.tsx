import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small monospace tag — used for tech chips and chain labels. */
export function Chip({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none tracking-tight whitespace-nowrap",
        tone === "accent"
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-line bg-surface-2 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Section eyebrow + heading pair. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-accent" aria-hidden />
        <span className="label-mono text-accent">{eyebrow}</span>
      </div>
      <h2 className="mt-5 text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}

/** Primary / secondary call-to-action. */
export function Cta({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const base = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200",
    variant === "primary"
      ? "bg-accent text-bg hover:bg-accent-dim"
      : "border border-line-strong text-ink hover:border-accent hover:text-accent",
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={base}>
      {children}
    </Link>
  );
}

/** Thin horizontal rule that matches the grid lines. */
export function Rule({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-line", className)} aria-hidden />;
}
