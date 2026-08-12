import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import {
  getFeatures,
  getProcess,
  getSettings,
  getTeam,
  s,
  splitLines,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = { title: "Om oss – HusEsset" };

export default async function AboutPage() {
  const [set, team, features, process] = await Promise.all([
    getSettings(),
    getTeam(),
    getFeatures(),
    getProcess(),
  ]);
  const points = splitLines(s(set, "about.points"));

  return (
    <div className="px-3 pt-8 sm:px-5">
      <div className="mx-auto max-w-7xl">
        <div className="grid-lines relative overflow-hidden rounded-[34px] border border-ink-900/8 bg-white">
          <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="relative grid items-center gap-10 p-6 sm:p-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/25 bg-brand-50 px-4 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand-700">
                  Om HusEsset
                </span>
                <h1 className="mt-6 text-balance text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-[50px]">
                  {s(set, "about.title")}
                </h1>
                <p className="mt-5 text-[17px] leading-relaxed text-ink-500">
                  {s(set, "about.body")}
                </p>
                <ul className="mt-7 space-y-2.5">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[15.5px] text-ink-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                        <Icon name="check" className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="outframe outframe-offset relative aspect-[4/3] overflow-hidden">
                {s(set, "about.image") && (
                  <Image
                    src={s(set, "about.image")}
                    alt="HusEsset"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="outframe p-7">
              <p className="text-4xl font-extrabold tracking-tight text-brand-600">
                {s(set, `hero.stat${i}Value`)}
              </p>
              <p className="mt-1 text-[15px] text-ink-500">
                {s(set, `hero.stat${i}Label`)}
              </p>
            </div>
          ))}
          <div className="outframe bg-ink-950 p-7 text-white">
            <p className="text-4xl font-extrabold tracking-tight text-brand-400">
              1:1
            </p>
            <p className="mt-1 text-[15px] text-ink-300">
              personlig kontakt – inga mellanhänder
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-balance text-[28px] font-extrabold tracking-[-0.025em] text-ink-900 sm:text-[38px]">
            Det här står vi för
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.id} delay={i * 50}>
                <div className="outframe outframe-hover group h-full p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink-900">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {team.length > 0 && (
          <div className="mt-20">
            <h2 className="text-balance text-[28px] font-extrabold tracking-[-0.025em] text-ink-900 sm:text-[38px]">
              Personerna du pratar med
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m, i) => (
                <Reveal key={m.id} delay={i * 60}>
                  <div className="outframe outframe-hover overflow-hidden">
                    <div className="relative aspect-[4/3]">
                      {m.imageUrl && (
                        <Image
                          src={m.imageUrl}
                          alt={m.name}
                          fill
                          sizes="33vw"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-ink-900">{m.name}</h3>
                      <p className="text-sm text-brand-600">{m.role}</p>
                      <div className="mt-4 space-y-1.5 text-sm text-ink-600">
                        {m.phone && (
                          <p className="flex items-center gap-2">
                            <Icon name="phone" className="h-4 w-4 text-ink-400" />
                            {m.phone}
                          </p>
                        )}
                        {m.email && (
                          <p className="flex items-center gap-2">
                            <Icon name="mail" className="h-4 w-4 text-ink-400" />
                            {m.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <div className="mt-20 overflow-hidden rounded-[32px] bg-ink-950 px-8 py-14 sm:px-14">
          <h2 className="max-w-2xl text-balance text-[26px] font-extrabold tracking-tight text-white sm:text-[36px]">
            {s(set, "process.title")}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((p) => (
              <div
                key={p.id}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6"
              >
                <span className="text-[13px] font-extrabold tracking-[0.2em] text-brand-400">
                  {p.step}
                </span>
                <h3 className="mt-2 text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-300">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/kontakt"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Kontakta oss
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
