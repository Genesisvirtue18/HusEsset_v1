import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { isAuthed } from "@/lib/auth";
import { RESOURCES, coerce } from "@/lib/admin-resources";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  if (!(await isAuthed()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { resource } = await params;
  const def = RESOURCES[resource];
  if (!def) return NextResponse.json({ error: "not found" }, { status: 404 });

  const rows = await db.select().from(def.table).orderBy(asc(def.table.id));
  return NextResponse.json({ items: rows });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ resource: string }> },
) {
  if (!(await isAuthed()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { resource } = await params;
  const def = RESOURCES[resource];
  if (!def || def.readOnly)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const values = { ...def.defaults, ...coerce(def, body) };
  const rows = (await db
    .insert(def.table)
    .values(values)
    .returning()) as unknown as Record<string, unknown>[];
  return NextResponse.json({ item: rows[0] });
}
