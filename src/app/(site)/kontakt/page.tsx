import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { getSettings, getTeam, s } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = { title: "Kontakta oss – HusEsset" };

export default async function ContactPage() {
  const [set, team] = await Promise.all([getSettings(), getTeam()]);

  const items = [
    { icon: "phone", label: "Telefon", value: s(set, "contact.phone"), href: `tel:${s(set, "contact.phone").replace(/\s|-/g, "")}` },
    { icon: "mail", label: "E-post", value: s(set, "contact.email"), href: `mailto:${s(set, "contact.email")}` },
    { icon: "pin", label: "Besöksadress", value: `${s(set, "contact.address")}, ${s(set, "contact.city")}` },
    { icon: "clock", label: "Öppettider", value: s(set, "contact.hours") },
  ];

  return (
    <div className="px-3 pt-8 sm:px-5">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/25 bg-brand-50 px-4 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand-700">
                Kontakt
              </span>
              <h1 className="mt-6 text-balance text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-[50px]">
                Kontakta oss för ett förutsättningslöst samtal om ditt projekt
              </h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-500">
                {s(set, "cta.body")}
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {items.map((it) => (
                  <div key={it.label} className="outframe outframe-hover p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon name={it.icon} className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-[11.5px] font-bold uppercase tracking-wider text-ink-400">
                      {it.label}
                    </p>
                    {it.href ? (
                      <a
                        href={it.href}
                        className="mt-1 block text-[15.5px] font-semibold text-ink-900 hover:text-brand-600"
                      >
                        {it.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-[15.5px] font-semibold text-ink-900">
                        {it.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {team.length > 0 && (
                <div className="mt-8 rounded-[28px] border border-ink-900/8 bg-white p-6">
                  <p className="text-[11.5px] font-bold uppercase tracking-wider text-ink-400">
                    Prata direkt med oss
                  </p>
                  <ul className="mt-4 divide-y divide-ink-900/8">
                    {team.map((m) => (
                      <li
                        key={m.id}
                        className="flex flex-wrap items-center justify-between gap-2 py-3"
                      >
                        <span>
                          <span className="block text-[15px] font-semibold text-ink-900">
                            {m.name}
                          </span>
                          <span className="text-sm text-ink-500">{m.role}</span>
                        </span>
                        <a
                          href={`tel:${m.phone.replace(/\s|-/g, "")}`}
                          className="text-sm font-semibold text-brand-600"
                        >
                          {m.phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
