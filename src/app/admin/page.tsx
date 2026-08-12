import { AdminApp } from "@/components/admin/admin-app";
import { LoginForm } from "@/components/admin/login-form";
import { isAuthed } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";

export const dynamic = "force-dynamic";

export const metadata = { title: "Adminpanel – HusEsset" };

export default async function AdminPage() {
  await ensureSeed();
  const authed = await isAuthed();
  return authed ? <AdminApp /> : <LoginForm />;
}
