"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      setError("Fel lösenord");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-4">
      <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-white p-8 shadow-2xl">
        <Logo className="h-10 w-auto" />
        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-ink-900">
          Adminpanel
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          Logga in för att redigera innehållet på webbplatsen.
        </p>
        <form onSubmit={submit} className="mt-6">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
            Lösenord
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-ink-900/10 px-4 py-3 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/12"
            placeholder="••••••••"
            autoFocus
          />
          {error && <p className="mt-3 text-sm text-brand-600">{error}</p>}
          <button
            disabled={loading}
            className="mt-5 w-full rounded-full bg-brand-600 py-3.5 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? "Loggar in…" : "Logga in"}
          </button>
        </form>
        <p className="mt-5 text-center text-xs text-ink-400">
          Standardlösenord: <code className="font-semibold">husesset</code> (sätt
          ADMIN_PASSWORD i miljövariabler)
        </p>
      </div>
    </div>
  );
}
