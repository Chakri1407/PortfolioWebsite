"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Pulls its contents slightly toward the cursor.
 *
 * Deliberately a plain <div> that renders identically on the server: the effect
 * is applied imperatively after mount, so the wrapped call-to-action is never
 * dependent on hydration to be visible. Disables itself for reduced motion and
 * for coarse pointers, where there is no cursor to follow.
 */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;
    let settled = true;

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      const done =
        Math.abs(targetX - currentX) < 0.1 && Math.abs(targetY - currentY) < 0.1;

      if (done && targetX === 0 && targetY === 0) {
        el.style.transform = "";
        settled = true;
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!settled) return;
      settled = false;
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = (e.clientX - (rect.left + rect.width / 2)) * strength;
      targetY = (e.clientY - (rect.top + rect.height / 2)) * strength;
      start();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      start();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
