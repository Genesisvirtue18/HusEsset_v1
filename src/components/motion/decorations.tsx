"use client";

/** Slowly spinning dashed ring — purely decorative */
export function SpinRing({
  size = 320,
  className = "",
  color = "rgba(220,33,23,0.18)",
  dashArray = "6 14",
  speed = "40s",
  reverse = false,
}: {
  size?: number;
  className?: string;
  color?: string;
  dashArray?: string;
  speed?: string;
  reverse?: boolean;
}) {
  const r = size / 2 - 4;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`pointer-events-none select-none ${className}`}
      style={{
        animation: `spin-slow ${speed} linear infinite${reverse ? " reverse" : ""}`,
      }}
      aria-hidden
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray={dashArray}
      />
    </svg>
  );
}

/** Animated gradient arc accent */
export function ArcAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc2117" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#dc2117" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M10 190 Q100 10 190 80"
        fill="none"
        stroke="url(#arc-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small animated red dot beacon */
export function Beacon({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex h-3 w-3 ${className}`} aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-600" />
    </span>
  );
}
