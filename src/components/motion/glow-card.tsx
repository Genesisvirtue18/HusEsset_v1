"use client";

import { useRef, type ReactNode } from "react";

export function GlowCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  }

  return (
    <div
      ref={ref}
      className={`glow-card ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
