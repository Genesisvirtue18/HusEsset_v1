import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getNav, getSettings, s } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [set, nav] = await Promise.all([getSettings(), getNav()]);

  return (
    <div className="flex min-h-screen flex-col bg-sand-50">
      <SiteHeader
        nav={nav.map((n) => ({ id: n.id, label: n.label, href: n.href }))}
        phone={s(set, "contact.phone")}
        siteName={s(set, "site.name", "HusEsset")}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
