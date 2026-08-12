import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    if (!name) {
      return NextResponse.json({ error: "Namn krävs" }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Giltig e-post krävs" }, { status: 400 });
    }
    const [row] = await db
      .insert(leads)
      .values({
        name,
        email,
        phone: String(body.phone ?? "").trim(),
        projectType: String(body.projectType ?? "").trim(),
        message: String(body.message ?? "").trim(),
      })
      .returning();
    return NextResponse.json({ ok: true, id: row.id });
  } catch {
    return NextResponse.json(
      { error: "Kunde inte skicka förfrågan just nu" },
      { status: 500 },
    );
  }
}

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt));
  return NextResponse.json({ items: rows });
}
