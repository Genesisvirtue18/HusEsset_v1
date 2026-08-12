"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import {
  RESOURCE_CONFIG,
  RESOURCE_ORDER,
  type FieldDef,
} from "@/lib/resource-fields";

type Row = Record<string, unknown> & { id: number };
type SettingRow = {
  key: string;
  value: string;
  label: string;
  group: string;
  type: string;
  sort: number;
};

const GROUP_LABELS: Record<string, string> = {
  foretag: "Företag & kontakt",
  hero: "Startsidans hero",
  sektioner: "Sektionstexter",
  general: "Övrigt",
};

const inputCls =
  "w-full rounded-xl border border-ink-900/12 bg-white px-3.5 py-2.5 text-[14.5px] text-ink-900 outline-none transition-all placeholder:text-ink-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10";

export function AdminApp() {
  const router = useRouter();
  const [tab, setTab] = useState<string>("content");
  const [toast, setToast] = useState("");

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }, []);

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="sticky top-0 z-40 border-b border-ink-900/8 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3.5">
          <Logo className="h-9 w-auto" />
          <span className="hidden rounded-full bg-ink-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white sm:inline">
            CMS
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="rounded-full border border-ink-900/12 px-4 py-2 text-sm font-semibold text-ink-700 hover:border-brand-600/40 hover:text-brand-700"
            >
              Visa webbplats
            </Link>
            <button
              onClick={logout}
              className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white hover:bg-ink-800"
            >
              Logga ut
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0">
          <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-ink-900/8 bg-white p-2 lg:flex-col lg:overflow-visible">
            <SideBtn
              active={tab === "content"}
              onClick={() => setTab("content")}
              icon="ruler"
              label="Sidinnehåll"
            />
            {RESOURCE_ORDER.map((key) => (
              <SideBtn
                key={key}
                active={tab === key}
                onClick={() => setTab(key)}
                icon={RESOURCE_CONFIG[key].icon}
                label={RESOURCE_CONFIG[key].label}
              />
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          {tab === "content" ? (
            <SettingsPanel onSaved={() => showToast("Innehåll sparat")} />
          ) : (
            <ResourcePanel
              key={tab}
              resource={tab}
              onSaved={(m) => showToast(m)}
            />
          )}
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white shadow-2xl">
          {toast}
        </div>
      )}
    </div>
  );
}

function SideBtn({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-[14.5px] font-semibold transition-colors ${
        active
          ? "bg-brand-600 text-white"
          : "text-ink-600 hover:bg-sand-100 hover:text-ink-900"
      }`}
    >
      <Icon name={icon} className="h-4.5 w-4.5" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

/* ---------------- Settings ---------------- */

function SettingsPanel({ onSaved }: { onSaved: () => void }) {
  const [rows, setRows] = useState<SettingRow[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d: { items: SettingRow[] }) => {
        setRows(d.items ?? []);
        const v: Record<string, string> = {};
        for (const it of d.items ?? []) v[it.key] = it.value;
        setValues(v);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const groups = useMemo(() => {
    const g: Record<string, SettingRow[]> = {};
    for (const r of rows) {
      (g[r.group] ??= []).push(r);
    }
    return g;
  }, [rows]);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values }),
    });
    setSaving(false);
    onSaved();
  }

  if (loading) return <Skeleton />;

  return (
    <div className="space-y-6">
      <PanelHeader
        title="Sidinnehåll"
        description="Alla texter, bilder och kontaktuppgifter på webbplatsen."
        action={
          <button
            onClick={save}
            disabled={saving}
            className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {saving ? "Sparar…" : "Spara ändringar"}
          </button>
        }
      />

      {Object.entries(groups).map(([group, items]) => (
        <section
          key={group}
          className="rounded-[24px] border border-ink-900/8 bg-white p-6"
        >
          <h2 className="text-lg font-extrabold tracking-tight text-ink-900">
            {GROUP_LABELS[group] ?? group}
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {items.map((it) => (
              <div
                key={it.key}
                className={it.type === "textarea" ? "md:col-span-2" : ""}
              >
                <label className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink-500">
                  {it.label || it.key}
                  <code className="text-[10px] font-normal normal-case text-ink-300">
                    {it.key}
                  </code>
                </label>
                {it.type === "textarea" ? (
                  <textarea
                    rows={4}
                    className={inputCls}
                    value={values[it.key] ?? ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [it.key]: e.target.value }))
                    }
                  />
                ) : (
                  <input
                    className={inputCls}
                    value={values[it.key] ?? ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [it.key]: e.target.value }))
                    }
                  />
                )}
                {it.type === "image" && values[it.key] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={values[it.key]}
                    alt=""
                    className="mt-2 h-28 w-full rounded-xl object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {saving ? "Sparar…" : "Spara ändringar"}
        </button>
      </div>
    </div>
  );
}

/* ---------------- Resources ---------------- */

function ResourcePanel({
  resource,
  onSaved,
}: {
  resource: string;
  onSaved: (msg: string) => void;
}) {
  const cfg = RESOURCE_CONFIG[resource];
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(null);

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/${resource}`);
    const d = (await res.json()) as { items?: Row[] };
    setRows(d.items ?? []);
    setLoading(false);
  }, [resource]);

  useEffect(() => {
    setLoading(true);
    load();
  }, [load]);

  async function create() {
    const res = await fetch(`/api/admin/${resource}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const d = (await res.json()) as { item?: Row };
    await load();
    if (d.item) setOpenId(d.item.id);
    onSaved(`${cfg.singular} skapad`);
  }

  async function saveRow(id: number, values: Record<string, unknown>) {
    await fetch(`/api/admin/${resource}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...values } : r)));
    onSaved("Sparat");
  }

  async function removeRow(id: number) {
    if (!confirm("Ta bort posten?")) return;
    await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
    setRows((rs) => rs.filter((r) => r.id !== id));
    onSaved("Borttagen");
  }

  if (loading) return <Skeleton />;

  return (
    <div className="space-y-4">
      <PanelHeader
        title={cfg.label}
        description={
          cfg.readOnly
            ? "Inkomna förfrågningar från webbplatsens formulär."
            : `Lägg till, redigera och ordna ${cfg.label.toLowerCase()}.`
        }
        action={
          !cfg.readOnly ? (
            <button
              onClick={create}
              className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              + Ny {cfg.singular.toLowerCase()}
            </button>
          ) : (
            <span className="rounded-full bg-sand-100 px-4 py-2 text-sm font-semibold text-ink-600">
              {rows.length} st
            </span>
          )
        }
      />

      {rows.length === 0 && (
        <div className="rounded-[24px] border border-dashed border-ink-900/15 bg-white p-12 text-center text-ink-500">
          Inget innehåll ännu.
        </div>
      )}

      {rows.map((row) => (
        <RowCard
          key={row.id}
          row={row}
          fields={cfg.fields}
          titleField={cfg.titleField}
          subtitleField={cfg.subtitleField}
          open={openId === row.id}
          onToggle={() => setOpenId(openId === row.id ? null : row.id)}
          onSave={(v) => saveRow(row.id, v)}
          onDelete={() => removeRow(row.id)}
        />
      ))}
    </div>
  );
}

function RowCard({
  row,
  fields,
  titleField,
  subtitleField,
  open,
  onToggle,
  onSave,
  onDelete,
}: {
  row: Row;
  fields: FieldDef[];
  titleField: string;
  subtitleField?: string;
  open: boolean;
  onToggle: () => void;
  onSave: (values: Record<string, unknown>) => void;
  onDelete: () => void;
}) {
  const [draft, setDraft] = useState<Record<string, unknown>>(row);

  useEffect(() => {
    setDraft(row);
  }, [row]);

  function set(name: string, value: unknown) {
    setDraft((d) => ({ ...d, [name]: value }));
  }

  const title = String(draft[titleField] ?? "(namnlös)");
  const subtitle = subtitleField ? String(draft[subtitleField] ?? "") : "";
  const visible = draft.visible;

  return (
    <div className="overflow-hidden rounded-[24px] border border-ink-900/8 bg-white">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-6 py-4 text-left hover:bg-sand-50"
      >
        {typeof draft.imageUrl === "string" && draft.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={draft.imageUrl}
            alt=""
            className="h-11 w-11 shrink-0 rounded-xl object-cover"
          />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-sm font-bold text-ink-500">
            #{row.id}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15.5px] font-bold text-ink-900">
            {title}
          </span>
          {subtitle && (
            <span className="block truncate text-sm text-ink-500">{subtitle}</span>
          )}
        </span>
        {visible === false && (
          <span className="rounded-full bg-sand-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-500">
            Dold
          </span>
        )}
        <span
          className={`text-ink-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="border-t border-ink-900/8 bg-sand-50/60 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((f) => (
              <div
                key={f.name}
                className={
                  f.type === "textarea" || f.type === "image"
                    ? "md:col-span-2"
                    : ""
                }
              >
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
                  {f.label}
                </label>
                {f.type === "boolean" ? (
                  <button
                    type="button"
                    onClick={() => set(f.name, !draft[f.name])}
                    className={`flex h-10 w-18 items-center rounded-full px-1 transition-colors ${
                      draft[f.name] ? "bg-brand-600" : "bg-ink-200"
                    }`}
                  >
                    <span
                      className={`h-8 w-8 rounded-full bg-white transition-transform ${
                        draft[f.name] ? "translate-x-8" : ""
                      }`}
                    />
                  </button>
                ) : f.type === "textarea" ? (
                  <textarea
                    rows={f.name === "description" ? 6 : 3}
                    className={inputCls}
                    value={String(draft[f.name] ?? "")}
                    onChange={(e) => set(f.name, e.target.value)}
                  />
                ) : f.options ? (
                  <select
                    className={inputCls}
                    value={String(draft[f.name] ?? "")}
                    onChange={(e) => set(f.name, e.target.value)}
                  >
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type === "number" ? "number" : "text"}
                    className={inputCls}
                    placeholder={f.placeholder}
                    value={String(draft[f.name] ?? "")}
                    onChange={(e) =>
                      set(
                        f.name,
                        f.type === "number" ? Number(e.target.value) : e.target.value,
                      )
                    }
                  />
                )}
                {f.type === "image" && typeof draft[f.name] === "string" && draft[f.name] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={String(draft[f.name])}
                    alt=""
                    className="mt-2 h-36 w-full rounded-xl object-cover"
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSave(draft)}
              className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Spara
            </button>
            <button
              onClick={onDelete}
              className="rounded-full border border-ink-900/12 px-5 py-2.5 text-sm font-semibold text-ink-600 hover:border-brand-600/40 hover:text-brand-700"
            >
              Ta bort
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PanelHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-ink-900/8 bg-white px-6 py-5">
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-ink-900">
          {title}
        </h1>
        <p className="mt-1 text-sm text-ink-500">{description}</p>
      </div>
      {action}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-[24px] border border-ink-900/8 bg-white"
        />
      ))}
    </div>
  );
}
