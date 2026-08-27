"use client";

import { useEffect, useRef } from "react";
import { BondType } from "./engine";
import { FONT_FAMILY, FONT_WEIGHT, GREEN } from "./params";

export function BondTypeCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let engine: BondType | null = null;
    let onScreen = false;
    let hidden = false;

    const sync = () => {
      if (!engine || reduced) return;
      if (onScreen && !hidden) engine.start();
      else engine.stop();
    };

    const raf = requestAnimationFrame(() => {
      if (!canvasRef.current) return;
      engine = new BondType(canvas, FONT_FAMILY);
      if (!engine.ok) return;
      if (reduced) {
        engine.renderStill();
        return;
      }
      document.fonts
        .load(`${FONT_WEIGHT} 1em "Press Start 2P"`)
        .then(
          () => { engine?.setFont(FONT_FAMILY); sync(); },
          () => sync(),
        );
    });

    const io = new IntersectionObserver(
      (es) => { onScreen = es[0]?.isIntersecting ?? false; sync(); },
      { threshold: 0.2 },
    );
    io.observe(canvas);

    const onVis = () => { hidden = document.hidden; sync(); };
    document.addEventListener("visibilitychange", onVis);

    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => engine?.resize(), 120);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(rt);
      engine?.destroy();
    };
  }, []);

  return (
    <div
      role="img"
      aria-label="Sanjana Design — pixel letters on red that drift apart into a molecule then fold back"
      style={{ backgroundColor: GREEN, aspectRatio: "1344/620" }}
      className="relative mx-auto w-full select-none overflow-hidden rounded-2xl"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
