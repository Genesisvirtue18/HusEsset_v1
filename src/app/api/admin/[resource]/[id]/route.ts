import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { isAuthed } from "@/lib/auth";
import { RESOURCES, coerce } from "@/lib/admin-resources";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  if (!(await isAuthed()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { resource, id } = await params;
  const def = RESOURCES[resource];
  if (!def) return NextResponse.json({ error: "not found" }, { status: 404 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const values = coerce(def, body);
  if (Object.keys(values).length === 0)
    return NextResponse.json({ ok: true });

  const rows = (await db
    .update(def.table)
    .set(values)
    .where(eq(def.table.id, Number(id)))
    .returning()) as unknown as Record<string, unknown>[];
  return NextResponse.json({ item: rows[0] });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  if (!(await isAuthed()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { resource, id } = await params;
  const def = RESOURCES[resource];
  if (!def) return NextResponse.json({ error: "not found" }, { status: 404 });

  await db.delete(def.table).where(eq(def.table.id, Number(id)));
  return NextResponse.json({ ok: true });
}
