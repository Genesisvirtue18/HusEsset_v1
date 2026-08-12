import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { getHouses, getSettings, s } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Våra hus & modeller – HusEsset",
};

export default async function HousesPage() {
  const [houses, set] = await Promise.all([getHouses(), getSettings()]);
  const categories = Array.from(new Set(houses.map((h) => h.category)));

  return (
    <div className="px-3 pt-8 sm:px-5">
      <div className="mx-auto max-w-7xl">
        <div className="grid-lines relative overflow-hidden rounded-[34px] border border-ink-900/8 bg-white px-6 py-14 sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl" />
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/25 bg-brand-50 px-4 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand-700">
              Modeller & referenser
            </span>
            <h1 className="mt-6 max-w-3xl text-balance text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-[52px]">
              {s(set, "houses.title", "Prefab som du vill ha det")}
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-500">
              {s(set, "houses.body")}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-ink-900/10 bg-sand-50 px-4 py-2 text-[13px] font-semibold text-ink-700"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {houses.map((h, i) => (
            <Reveal key={h.id} delay={(i % 3) * 70}>
              <Link
                href={`/hus/${h.slug}`}
                className="outframe outframe-hover group flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {h.imageUrl && (
                    <Image
                      src={h.imageUrl}
                      alt={h.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider text-ink-800 backdrop-blur">
                    {h.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-bold tracking-tight text-ink-900">
                    {h.title}
                  </h2>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-500">
                    {h.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-ink-900/8 pt-4 text-[12.5px] font-semibold text-ink-600">
                    {[h.area, h.rooms, h.location].filter(Boolean).map((t) => (
                      <span key={t} className="rounded-full bg-sand-100 px-3 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-600">
                    {h.price || "Läs mer"}
                    <Icon
                      name="arrow"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-[32px] bg-ink-950 px-8 py-12 text-center text-white sm:px-14">
          <h2 className="text-balance text-[26px] font-extrabold tracking-tight sm:text-[34px]">
            Hittar du inte det du söker? Vi bygger efter din ritning.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] text-ink-300">
            Skicka in din skiss eller ritning så återkommer vi med förslag på
            konstruktion, leveransomfattning och pris.
          </p>
          <Link
            href="/kontakt"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Skicka din ritning
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
