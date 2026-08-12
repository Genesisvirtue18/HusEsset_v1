"use client";

import { useEffect, useRef, useState } from "react";

function parse(val: string): { num: number; prefix: string; suffix: string } {
  const match = val.match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);
  if (!match) return { num: 0, prefix: "", suffix: val };
  return { num: parseInt(match[2], 10), prefix: match[1], suffix: match[3] };
}

export function CountUp({
  value,
  className = "",
  duration = 1800,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const { num, prefix, suffix } = parse(value);
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          function tick(now: number) {
            const t = Math.min((now - start) / duration, 1);
            // ease out expo
            const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            setCurrent(Math.round(eased * num));
            if (t < 1) requestAnimationFrame(tick);
            else setDone(true);
          }
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [num, duration]);

  return (
    <span ref={ref} className={`${className} ${done ? "count-up-done" : ""}`}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}
