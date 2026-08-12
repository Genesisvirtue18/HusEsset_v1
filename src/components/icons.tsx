type IconProps = { className?: string };

const paths: Record<string, string[]> = {
  flex: ["M4 7h7M4 12h16M4 17h11", "M17 4l3 3-3 3"],
  chat: ["M21 12a8 8 0 1 1-3.2-6.4", "M4 20l1.6-3.6", "M8 11h8M8 15h5"],
  shield: ["M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z", "M9 12l2 2 4-4"],
  leaf: ["M5 19c0-8 6-13 14-13 0 8-5 14-13 14", "M5 19c3-3 6-5 9-6"],
  ruler: ["M3 15l12-12 6 6-12 12z", "M8 8l2 2M11 5l2 2M5 11l2 2"],
  truck: ["M3 7h11v8H3z", "M14 10h4l3 3v2h-7z", "M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  star: ["M12 3l2.7 5.6 6.3.9-4.5 4.3 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.5l6.3-.9z"],
  house: ["M4 11l8-7 8 7", "M6 10v10h12V10", "M10 20v-6h4v6"],
  hammer: ["M14 4l6 6-3 3-6-6z", "M11 7L4 14l3 3 7-7", "M3 21h8"],
  phone: ["M4 5c0 9 6 15 15 15l1-4-4-2-2 2a12 12 0 0 1-6-6l2-2-2-4z"],
  mail: ["M3 6h18v12H3z", "M3 7l9 6 9-6"],
  pin: ["M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z", "M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"],
  clock: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M12 7v5l3 2"],
  check: ["M4 12l5 5L20 6"],
  arrow: ["M5 12h14", "M13 6l6 6-6 6"],
};

export function Icon({ name, className = "h-6 w-6" }: IconProps & { name: string }) {
  const d = paths[name] ?? paths.star;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}

export const iconNames = Object.keys(paths);
