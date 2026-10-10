"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%&*<>/\\";

/**
 * Cycles through `phrases`, scrambling characters on each transition.
 * Falls back to the first phrase, static, when reduced motion is requested.
 */
export function TextScramble({
  phrases,
  className,
  interval = 3200,
}: {
  phrases: readonly string[];
  className?: string;
  interval?: number;
}) {
  const [text, setText] = useState(phrases[0] ?? "");
  const indexRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || phrases.length < 2) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const scrambleTo = (target: string) => {
      const from = phrases[indexRef.current] ?? "";
      const length = Math.max(from.length, target.length);
      let frame = 0;
      const totalFrames = 28;

      const tick = () => {
        const progress = frame / totalFrames;
        let output = "";

        for (let i = 0; i < length; i++) {
          const charProgress = progress * 1.6 - i / length;

          if (charProgress >= 1) {
            output += target[i] ?? "";
          } else if (charProgress > 0) {
            output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          } else {
            output += from[i] ?? "";
          }
        }

        setText(output);
        frame++;

        if (frame <= totalFrames) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          setText(target);
          timeoutId = setTimeout(cycle, interval);
        }
      };

      tick();
    };

    const cycle = () => {
      const next = (indexRef.current + 1) % phrases.length;
      const target = phrases[next] ?? "";
      scrambleTo(target);
      indexRef.current = next;
    };

    timeoutId = setTimeout(cycle, interval);

    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [phrases, interval]);

  return (
    <span className={className} suppressHydrationWarning>
      {text}
    </span>
  );
}
