export function Logo({
  className = "",
  variant = "dark",
  name = "HusEsset",
}: {
  className?: string;
  variant?: "dark" | "light";
  name?: string;
}) {
  const outline = variant === "light" ? "#ffffff" : "#171816";
  const line = variant === "light" ? "#ffffff" : "#2a2b28";
  return (
    <svg
      viewBox="0 0 320 92"
      className={className}
      role="img"
      aria-label={`${name} logotyp`}
    >
      <defs>
        <linearGradient id="hs-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0473a" />
          <stop offset="55%" stopColor="#dc2117" />
          <stop offset="100%" stopColor="#a8140f" />
        </linearGradient>
      </defs>

      {/* mountain ridge */}
      <path
        d="M4 34 L34 34 L58 34 L96 6 L120 26 L140 26"
        fill="none"
        stroke={line}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="150"
        y="31"
        fill={line}
        fontSize="15"
        letterSpacing="2.4"
        fontWeight={700}
        fontFamily="var(--font-display), system-ui, sans-serif"
      >
        PREFABHUS
      </text>
      <path
        d="M262 26 L306 26"
        stroke="#dc2117"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M296 17 L308 26 L296 35"
        fill="none"
        stroke="#dc2117"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text
        x="2"
        y="84"
        fontSize="62"
        fontWeight={800}
        fontStyle="italic"
        letterSpacing="-1"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fill="url(#hs-red)"
        stroke={outline}
        strokeWidth="2.4"
        paintOrder="stroke"
      >
        {name}
      </text>
    </svg>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="14" fill="#dc2117" />
      <path
        d="M9 31 L24 13 L39 31"
        fill="none"
        stroke="#fff"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17 35 h14" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" />
    </svg>
  );
}
