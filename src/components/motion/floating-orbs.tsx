"use client";

export function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* large red bloom – top right */}
      <div
        className="orb-slow absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(220,33,23,0.18) 0%, rgba(220,33,23,0.06) 45%, transparent 70%)",
        }}
      />
      {/* medium amber – centre left */}
      <div
        className="orb-medium absolute -left-16 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full opacity-50"
        style={{
          animation: "float-medium 9s ease-in-out infinite 1.5s",
          background:
            "radial-gradient(circle, rgba(183,120,70,0.14) 0%, rgba(183,120,70,0.04) 50%, transparent 70%)",
        }}
      />
      {/* small red – bottom centre */}
      <div
        className="orb-fast absolute bottom-10 left-1/2 h-[220px] w-[220px] -translate-x-1/2 rounded-full opacity-40"
        style={{
          animation: "float-fast 6s ease-in-out infinite 0.8s",
          background:
            "radial-gradient(circle, rgba(220,33,23,0.12) 0%, transparent 65%)",
        }}
      />
      {/* tiny bright spark – top left */}
      <div
        className="orb-fast absolute left-1/4 top-16 h-[100px] w-[100px] rounded-full opacity-30"
        style={{
          animation: "float-fast 4s ease-in-out infinite 2s",
          background:
            "radial-gradient(circle, rgba(250,102,89,0.35) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export function DarkOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* sweeping red aurora – right */}
      <div
        className="orb-slow absolute -right-40 top-0 h-[600px] w-[600px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(220,33,23,0.30) 0%, rgba(220,33,23,0.08) 45%, transparent 68%)",
        }}
      />
      {/* deep warm – left bottom */}
      <div
        className="orb-medium absolute -bottom-20 -left-20 h-[420px] w-[420px] rounded-full opacity-55"
        style={{
          animation: "float-medium 11s ease-in-out infinite 2s",
          background:
            "radial-gradient(circle, rgba(151,24,20,0.22) 0%, transparent 65%)",
        }}
      />
      {/* subtle centre */}
      <div
        className="orb-slow absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
        style={{
          animation: "float-slow 14s ease-in-out infinite 3s",
          background:
            "radial-gradient(circle, rgba(220,33,23,0.14) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
