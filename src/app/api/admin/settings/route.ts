import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const rows = await db
    .select()
    .from(settings)
    .orderBy(asc(settings.group), asc(settings.sort));
  return NextResponse.json({ items: rows });
}

export async function PUT(req: Request) {
  if (!(await isAuthed()))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as {
    values?: Record<string, string>;
  };
  const values = body.values ?? {};
  for (const [key, value] of Object.entries(values)) {
    await db
      .update(settings)
      .set({ value: String(value ?? "") })
      .where(eq(settings.key, key));
  }
  return NextResponse.json({ ok: true });
}
