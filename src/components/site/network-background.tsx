"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface NetworkBackgroundProps {
  className?: string;
  density?: number;
  colors?: [string, string];
}

/**
 * Animated particle network — a reusable "blockchain nodes" canvas backdrop
 * used behind the hero, section dividers, and auth panels.
 */
export function NetworkBackground({
  className,
  density = 60,
  colors = ["rgba(217,178,76,0.55)", "rgba(23,201,131,0.55)"],
}: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let animationFrame = 0;

    type Node = { x: number; y: number; vx: number; vy: number; gold: boolean };
    let nodes: Node[] = [];

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.scale(dpr, dpr);

      const count = Math.round((width * height) / (14000 / (density / 60)));
      nodes = Array.from({ length: Math.max(20, Math.min(count, 140)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        gold: Math.random() > 0.6,
      }));
    }

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 130;
          if (dist < maxDist) {
            ctx.strokeStyle = a.gold
              ? colors[0].replace(/[\d.]+\)$/, `${0.18 * (1 - dist / maxDist)})`)
              : colors[1].replace(/[\d.]+\)$/, `${0.18 * (1 - dist / maxDist)})`);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx.beginPath();
        ctx.fillStyle = node.gold ? colors[0] : colors[1];
        ctx.arc(node.x, node.y, node.gold ? 1.6 : 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(tick);
      }
    }

    resize();
    tick();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(animationFrame);
      ro.disconnect();
    };
  }, [density, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
    />
  );
}
