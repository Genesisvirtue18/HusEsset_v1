"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

const TYPES = [
  "Villa",
  "Attefallshus / friggebod",
  "Fritidshus",
  "Flerfamiljshus",
  "Tillbyggnad",
  "Annat",
];

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? "Något gick fel");
      }
      form.reset();
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Något gick fel");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="outframe flex flex-col items-center gap-4 p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <Icon name="check" className="h-7 w-7" />
        </div>
        <h3 className="text-2xl font-bold text-ink-900">Tack för din förfrågan!</h3>
        <p className="max-w-sm text-ink-500">
          Vi hör av oss inom kort för ett förutsättningslöst samtal om ditt
          projekt.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-full border border-ink-900/10 px-5 py-2 text-sm font-semibold text-ink-700 hover:border-brand-600/40 hover:text-brand-700"
        >
          Skicka en till
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-2xl border border-ink-900/10 bg-white px-4 py-3 text-[15px] text-ink-900 outline-none transition-all placeholder:text-ink-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/12";

  return (
    <form onSubmit={onSubmit} className={compact ? "" : "outframe p-6 sm:p-8"}>
      {!compact && (
        <>
          <h3 className="text-2xl font-bold tracking-tight text-ink-900">
            Berätta om ditt projekt
          </h3>
          <p className="mt-2 text-sm text-ink-500">
            Fyll i formuläret så återkommer vi med förslag och prisbild. Inga
            förpliktelser.
          </p>
        </>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
            Namn *
          </label>
          <input name="name" required className={field} placeholder="För- och efternamn" />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
            Telefon
          </label>
          <input name="phone" className={field} placeholder="070-000 00 00" />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
            E-post *
          </label>
          <input
            name="email"
            type="email"
            required
            className={field}
            placeholder="du@exempel.se"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
            Typ av projekt
          </label>
          <select name="projectType" className={field} defaultValue={TYPES[0]}>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
            Meddelande
          </label>
          <textarea
            name="message"
            rows={5}
            className={field}
            placeholder="Tomt, önskad boarea, tidsplan, har du ritning?"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_16px_34px_-18px_rgba(220,33,23,0.95)] transition-all hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "loading" ? "Skickar…" : "Skicka förfrågan"}
        <Icon
          name="arrow"
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
        />
      </button>
      <p className="mt-3 text-center text-xs text-ink-400">
        Vi svarar normalt inom en arbetsdag.
      </p>
    </form>
  );
}
