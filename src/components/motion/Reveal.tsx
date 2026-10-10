"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveals, CSS-first and fail-safe.
 *
 * Content renders visible by default. The hidden starting state is scoped to
 * `.js` on <html>, which is only set by an inline script in the document — so
 * if JavaScript is blocked, slow, errors, or lacks IntersectionObserver, every
 * section still paints. Reduced motion is handled in CSS, not by swapping
 * element types.
 */

function useRevealed<T extends HTMLElement>(rootMargin = "-60px") {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed, rootMargin]);

  return { ref, revealed };
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, revealed } = useRevealed<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("reveal", revealed && "is-visible", className)}
      style={
        {
          "--reveal-delay": `${Math.round(delay * 1000)}ms`,
          "--reveal-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/** Staggers its direct children once the group scrolls into view. */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, revealed } = useRevealed<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("reveal-group", revealed && "is-visible", className)}
    >
      {children}
    </div>
  );
}

/** A direct child of RevealGroup. Staggering is handled by CSS. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
