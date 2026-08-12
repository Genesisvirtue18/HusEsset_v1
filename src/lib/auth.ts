import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const COOKIE = "husesset_admin";

function password() {
  return process.env.ADMIN_PASSWORD || "husesset";
}

function secret() {
  return process.env.ADMIN_SECRET || `husesset-secret-${password()}`;
}

export function makeToken() {
  return createHmac("sha256", secret()).update("admin").digest("hex");
}

export function checkPassword(input: string) {
  const a = Buffer.from(input);
  const b = Buffer.from(password());
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  return Boolean(token) && token === makeToken();
}
