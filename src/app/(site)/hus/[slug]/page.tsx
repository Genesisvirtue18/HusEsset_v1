import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { getHouse, getHouses, splitLines } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HousePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const house = await getHouse(slug);
  if (!house) notFound();

  const all = await getHouses();
  const others = all.filter((h) => h.id !== house.id).slice(0, 3);
  const gallery = splitLines(house.gallery);

  const specs = [
    { label: "Kategori", value: house.category },
    { label: "Boarea", value: house.area },
    { label: "Rum", value: house.rooms },
    { label: "Ort", value: house.location },
    { label: "Pris", value: house.price },
  ].filter((x) => x.value);

  return (
    <div className="px-3 pt-8 sm:px-5">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-5 flex items-center gap-2 text-sm text-ink-500">
          <Link href="/" className="hover:text-brand-600">
            Hem
          </Link>
          <span>/</span>
          <Link href="/hus" className="hover:text-brand-600">
            Våra hus
          </Link>
          <span>/</span>
          <span className="text-ink-800">{house.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <div className="outframe relative aspect-[4/3] overflow-hidden">
              {house.imageUrl && (
                <Image
                  src={house.imageUrl}
                  alt={house.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="outframe flex h-full flex-col p-7 sm:p-9">
              <span className="inline-flex w-fit rounded-full bg-brand-50 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-brand-700">
                {house.category}
              </span>
              <h1 className="mt-5 text-balance text-[34px] font-extrabold leading-tight tracking-[-0.03em] text-ink-900 sm:text-[42px]">
                {house.title}
              </h1>
              <p className="mt-4 text-[16.5px] leading-relaxed text-ink-500">
                {house.summary}
              </p>
              <dl className="mt-7 grid grid-cols-2 gap-3">
                {specs.map((sp) => (
                  <div
                    key={sp.label}
                    className="rounded-2xl border border-ink-900/8 bg-sand-50 px-4 py-3"
                  >
                    <dt className="text-[11.5px] font-bold uppercase tracking-wider text-ink-400">
                      {sp.label}
                    </dt>
                    <dd className="mt-0.5 text-[15px] font-semibold text-ink-900">
                      {sp.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href="#offert"
                className="group mt-auto flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Begär offert på {house.title}
                <Icon
                  name="arrow"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <div className="outframe p-7 sm:p-10">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
                Om modellen
              </h2>
              <p className="mt-4 whitespace-pre-line text-[16.5px] leading-relaxed text-ink-600">
                {house.description}
              </p>

              {gallery.length > 0 && (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {gallery.map((g) => (
                    <div
                      key={g}
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-900/8"
                    >
                      <Image
                        src={g}
                        alt={house.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div id="offert" className="scroll-mt-28">
              <ContactForm />
            </div>
          </Reveal>
        </div>

        {others.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
              Fler modeller
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {others.map((h) => (
                <Link
                  key={h.id}
                  href={`/hus/${h.slug}`}
                  className="outframe outframe-hover group overflow-hidden"
                >
                  <div className="relative aspect-[4/3]">
                    {h.imageUrl && (
                      <Image
                        src={h.imageUrl}
                        alt={h.title}
                        fill
                        sizes="33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-ink-900">{h.title}</h3>
                    <p className="mt-1 text-sm text-ink-500">
                      {h.area} · {h.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
