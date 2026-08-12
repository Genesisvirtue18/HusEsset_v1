import Link from "next/link";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { getNav, getSettings, s } from "@/lib/content";

export async function SiteFooter() {
  const [set, nav] = await Promise.all([getSettings(), getNav()]);
  const name = s(set, "site.name", "HusEsset");

  return (
    <footer className="mt-24 px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink-950 text-ink-100">
        <div className="grid-lines grid gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo name={name} variant="light" className="h-11 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">
              {s(set, "footer.text")}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={s(set, "social.facebook", "#")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ink-200 transition-colors hover:border-brand-500 hover:text-white"
                aria-label="Facebook"
              >
                <span className="text-sm font-bold">f</span>
              </a>
              <a
                href={s(set, "social.instagram", "#")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ink-200 transition-colors hover:border-brand-500 hover:text-white"
                aria-label="Instagram"
              >
                <span className="text-sm font-bold">ig</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
              Navigering
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.id}>
                  <Link
                    href={n.href}
                    className="text-ink-200 transition-colors hover:text-brand-400"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="text-ink-500 transition-colors hover:text-brand-400"
                >
                  Adminpanel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
              Tjänster
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-200">
              <li>Villastommar</li>
              <li>Attefallshus</li>
              <li>Fritidshus</li>
              <li>Flerfamiljshus</li>
              <li>Takstolar & lösvirke</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
              Kontakt
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-ink-200">
              <li className="flex items-start gap-3">
                <Icon name="pin" className="mt-0.5 h-4 w-4 text-brand-500" />
                <span>
                  {s(set, "contact.address")}
                  <br />
                  {s(set, "contact.city")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="phone" className="h-4 w-4 text-brand-500" />
                <a href={`tel:${s(set, "contact.phone").replace(/\s|-/g, "")}`}>
                  {s(set, "contact.phone")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="mail" className="h-4 w-4 text-brand-500" />
                <a href={`mailto:${s(set, "contact.email")}`}>
                  {s(set, "contact.email")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="clock" className="h-4 w-4 text-brand-500" />
                {s(set, "contact.hours")}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>
            © {new Date().getFullYear()} {s(set, "site.legalName", name)} · Org.nr{" "}
            {s(set, "site.orgnr")}
          </p>
          <p>{s(set, "site.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
