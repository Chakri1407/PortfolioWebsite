"use client";

import { useEffect, useRef } from "react";

type Cell = {
  col: number;
  row: number;
  life: number; // 0 → 1 → 0
  speed: number;
};

const CELL = 34;
/** Share of cells lit at once — keeps density identical on phone and desktop. */
const ACTIVE_DENSITY = 0.02;
const FPS = 30;

/**
 * Faint grid of "blocks" that light up and fade, suggesting block production.
 * Capped at 30fps, pauses off-screen, and renders nothing under reduced motion.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let rafId = 0;
    let running = true;
    let last = 0;
    let maxActive = 8;

    const cells: Cell[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      maxActive = Math.max(4, Math.round(cols * rows * ACTIVE_DENSITY));
    };

    const spawn = () => {
      if (cells.length >= maxActive) return;
      cells.push({
        col: Math.floor(Math.random() * cols),
        row: Math.floor(Math.random() * rows),
        life: 0,
        speed: 0.004 + Math.random() * 0.01,
      });
    };

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw);
      if (!running) return;
      if (now - last < 1000 / FPS) return;
      last = now;

      ctx.clearRect(0, 0, width, height);

      // Hairline grid
      ctx.strokeStyle = "rgba(255,255,255,0.028)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let c = 0; c <= cols; c++) {
        const x = Math.floor(c * CELL) + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let r = 0; r <= rows; r++) {
        const y = Math.floor(r * CELL) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Active blocks
      if (Math.random() < 0.3) spawn();

      for (let i = cells.length - 1; i >= 0; i--) {
        const cell = cells[i];
        cell.life += cell.speed;

        if (cell.life >= 1) {
          cells.splice(i, 1);
          continue;
        }

        // Ease in, then out
        const t = cell.life;
        const alpha = Math.sin(t * Math.PI) * 0.5;
        const x = cell.col * CELL;
        const y = cell.row * CELL;

        ctx.fillStyle = `rgba(198, 242, 78, ${alpha * 0.10})`;
        ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);

        ctx.strokeStyle = `rgba(198, 242, 78, ${alpha * 0.32})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, CELL - 1, CELL - 1);
      }
    };

    resize();
    rafId = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const onVisibility = () => {
      running = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 size-full"
    />
  );
}
