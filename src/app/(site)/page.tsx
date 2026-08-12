import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { FloatingOrbs, DarkOrbs } from "@/components/motion/floating-orbs";
import { CountUp } from "@/components/motion/count-up";
import { GlowCard } from "@/components/motion/glow-card";
import { TiltCard } from "@/components/motion/tilt-card";
import { SpinRing, ArcAccent, Beacon } from "@/components/motion/decorations";
import {
  getFaqs,
  getFeatures,
  getHouses,
  getProcess,
  getSettings,
  getTestimonials,
  s,
  splitLines,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [set, features, houses, process, testimonials, faqs] = await Promise.all([
    getSettings(),
    getFeatures(),
    getHouses(),
    getProcess(),
    getTestimonials(),
    getFaqs(),
  ]);

  const featured = houses.filter((h) => h.featured).slice(0, 3);
  const showcase = featured.length ? featured : houses.slice(0, 3);
  const marquee = s(set, "hero.marquee")
    .split("•")
    .map((x) => x.trim())
    .filter(Boolean);
  const points = splitLines(s(set, "about.points"));

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — layered mesh background + floating orbs
      ═══════════════════════════════════════════ */}
      <section className="relative px-3 pt-6 sm:px-5">
        <div className="mx-auto max-w-7xl">
          <div
            className="relative overflow-hidden rounded-[34px]"
            style={{
              background:
                "linear-gradient(145deg, #ffffff 0%, #fdf8f5 40%, #faf3ee 70%, #f7ede5 100%)",
              boxShadow:
                "0 2px 4px rgba(23,24,22,0.04), 0 32px 80px -40px rgba(23,24,22,0.22), inset 0 1px 0 rgba(255,255,255,0.9)",
              border: "1px solid rgba(23,24,22,0.07)",
            }}
          >
            {/* ── Grid texture overlay ── */}
            <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />

            {/* ── Animated floating orbs ── */}
            <FloatingOrbs />

            {/* ── Spinning decorative rings ── */}
            <SpinRing
              size={420}
              className="absolute -right-28 -top-28 opacity-50"
              color="rgba(220,33,23,0.12)"
              dashArray="4 20"
              speed="55s"
            />
            <SpinRing
              size={220}
              className="absolute -bottom-14 left-20 opacity-35"
              color="rgba(183,120,70,0.22)"
              dashArray="6 12"
              speed="35s"
              reverse
            />

            {/* ── Arc accent ── */}
            <ArcAccent className="absolute right-0 top-0 h-48 w-48 opacity-30" />

            {/* ── Main content grid ── */}
            <div className="relative grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:p-14">
              {/* LEFT: text */}
              <div>
                <Reveal>
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-600/20 bg-brand-50 px-4 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand-700 shadow-[0_2px_12px_-4px_rgba(220,33,23,0.2)]">
                    <Beacon />
                    {s(set, "hero.eyebrow")}
                  </span>
                </Reveal>

                <Reveal delay={80}>
                  <h1 className="mt-6 text-balance text-[38px] font-extrabold leading-[1.03] tracking-[-0.03em] text-ink-900 sm:text-[52px] lg:text-[60px]">
                    {s(set, "hero.title")}{" "}
                    <span className="relative inline-block text-brand-600">
                      {s(set, "hero.titleAccent")}
                      {/* animated underline */}
                      <svg
                        viewBox="0 0 380 14"
                        className="absolute -bottom-1 left-0 h-3 w-full"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 10 C80 4, 160 3, 240 6 S340 10 377 7"
                          fill="none"
                          stroke="rgba(220,33,23,0.4)"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                          strokeDasharray="380"
                          strokeDashoffset="0"
                          style={{
                            animation: "draw-underline 1.2s 0.6s cubic-bezier(0.22,1,0.36,1) both",
                          }}
                        />
                      </svg>
                      <style>{`
                        @keyframes draw-underline {
                          from { stroke-dashoffset: 380; }
                          to   { stroke-dashoffset: 0; }
                        }
                      `}</style>
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={160}>
                  <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink-500">
                    {s(set, "hero.body")}
                  </p>
                </Reveal>

                <Reveal delay={240}>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {/* Primary CTA with pulse beacon */}
                    <Link
                      href={s(set, "hero.ctaPrimaryHref", "/kontakt")}
                      className="btn-beacon group relative flex items-center gap-2.5 rounded-full bg-brand-600 px-7 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-brand-700 hover:shadow-[0_20px_40px_-12px_rgba(220,33,23,0.7)]"
                    >
                      {s(set, "hero.ctaPrimary")}
                      <Icon
                        name="arrow"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                      />
                    </Link>
                    <Link
                      href={s(set, "hero.ctaSecondaryHref", "/hus")}
                      className="group flex items-center gap-2.5 rounded-full border border-ink-900/12 bg-white/80 px-7 py-4 text-[15px] font-semibold text-ink-800 backdrop-blur-sm transition-all duration-300 hover:border-brand-500/30 hover:bg-white hover:shadow-[0_8px_24px_-8px_rgba(23,24,22,0.15)]"
                    >
                      {s(set, "hero.ctaSecondary")}
                      <Icon name="arrow" className="h-4 w-4 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </div>
                </Reveal>

                {/* Stat counters */}
                <Reveal delay={330}>
                  <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="group relative overflow-hidden rounded-2xl border border-ink-900/7 bg-white/70 px-4 py-4 backdrop-blur-sm transition-all duration-400 hover:border-brand-500/20 hover:shadow-[0_8px_32px_-12px_rgba(220,33,23,0.25)]"
                      >
                        {/* inner shimmer on hover */}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{ background: "radial-gradient(circle at 50% 0%, rgba(220,33,23,0.06) 0%, transparent 70%)" }}
                        />
                        <dt className="shimmer-text text-[26px] font-extrabold tracking-tight">
                          <CountUp value={s(set, `hero.stat${i}Value`)} />
                        </dt>
                        <dd className="mt-0.5 text-[12px] leading-snug text-ink-500">
                          {s(set, `hero.stat${i}Label`)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>

              {/* RIGHT: hero image with tilt */}
              <Reveal delay={200} direction="right">
                <div className="relative">
                  <TiltCard className="outframe outframe-offset relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]" intensity={5}>
                    {s(set, "hero.image") && (
                      <Image
                        src={s(set, "hero.image")}
                        alt="Hus i trä byggt av HusEsset"
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover transition-transform duration-700"
                        priority
                      />
                    )}
                    {/* image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                    {/* caption badge */}
                    <div className="absolute inset-x-0 bottom-0 p-6 pt-20">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-300">
                        Senaste projektet
                      </p>
                      <p className="mt-1.5 text-xl font-bold text-white">
                        {showcase[0]?.title ?? "Villa i trä"}
                      </p>
                      <p className="mt-0.5 text-sm text-white/65">
                        {showcase[0]?.location} · {showcase[0]?.area}
                      </p>
                    </div>
                    {/* floating badge top-right */}
                    <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 backdrop-blur-md">
                      <Beacon />
                      <span className="text-[11px] font-bold text-white">
                        Nytt projekt
                      </span>
                    </div>
                  </TiltCard>

                  {/* floating mini info card */}
                  <div
                    className="orb-slow absolute -bottom-6 -left-8 hidden rounded-2xl border border-ink-900/8 bg-white p-4 shadow-[0_16px_48px_-16px_rgba(23,24,22,0.4)] sm:block lg:block"
                    style={{ zIndex: 10 }}
                  >
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-400">
                      Boarea
                    </p>
                    <p className="mt-0.5 text-xl font-extrabold text-ink-900">
                      {showcase[0]?.area ?? "168 m²"}
                    </p>
                    <p className="text-xs text-ink-500">{showcase[0]?.rooms}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── Marquee strip ── */}
            <div className="relative overflow-hidden border-t border-ink-900/8 bg-ink-950 py-3.5">
              {/* subtle red gradient edge fade */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink-950 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink-950 to-transparent" />
              <div className="marquee-track">
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex shrink-0 items-center">
                    {marquee.map((word, i) => (
                      <span
                        key={`${dup}-${i}`}
                        className="flex items-center gap-6 whitespace-nowrap px-6 text-[12.5px] font-semibold uppercase tracking-[0.18em] text-ink-300"
                      >
                        {word}
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES — wood-grain textured bg + glow cards
      ═══════════════════════════════════════════ */}
      <section className="relative px-3 pt-28 sm:px-5">
        {/* section bg accent — positioned behind */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-full"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 15% 50%, rgba(183,120,70,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <SectionLabel>Fördelar</SectionLabel>
                <h2 className="mt-4 text-balance text-[30px] font-extrabold leading-tight tracking-[-0.025em] text-ink-900 sm:text-[42px]">
                  {s(set, "features.title")}
                </h2>
                <p className="mt-5 text-[17px] leading-relaxed text-ink-500">
                  {s(set, "features.body")}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.id} delay={i * 70} direction="up">
                <GlowCard className="outframe outframe-hover wood-stripe group h-full p-7 transition-all duration-400">
                  {/* Animated icon bg */}
                  <div className="relative flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 shadow-[0_4px_12px_-4px_rgba(220,33,23,0.25)] transition-all duration-400 group-hover:from-brand-600 group-hover:to-brand-700 group-hover:text-white group-hover:shadow-[0_8px_24px_-6px_rgba(220,33,23,0.55)]">
                    <Icon name={f.icon} className="h-6 w-6" />
                    {/* dot decoration */}
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-brand-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-ink-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                    {f.body}
                  </p>
                  {/* bottom accent line */}
                  <div className="mt-6 h-px w-0 bg-gradient-to-r from-brand-500 to-transparent transition-all duration-500 group-hover:w-full" />
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOUSES — cards on layered depth bg
      ═══════════════════════════════════════════ */}
      <section className="relative px-3 pt-28 sm:px-5">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-full"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 85% 30%, rgba(220,33,23,0.055) 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <SectionLabel>Våra hus</SectionLabel>
                <h2 className="mt-4 text-balance text-[30px] font-extrabold leading-tight tracking-[-0.025em] text-ink-900 sm:text-[42px]">
                  {s(set, "houses.title")}
                </h2>
                <p className="mt-5 text-[17px] leading-relaxed text-ink-500">
                  {s(set, "houses.body")}
                </p>
              </div>
              <Link
                href="/hus"
                className="group flex items-center gap-2 rounded-full border border-ink-900/12 bg-white px-6 py-3 text-sm font-semibold text-ink-800 shadow-sm transition-all duration-300 hover:border-brand-500/30 hover:text-brand-700 hover:shadow-[0_8px_24px_-8px_rgba(220,33,23,0.3)]"
              >
                Se alla modeller
                <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>

          {/* staggered house cards with perspective */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {showcase.map((h, i) => (
              <Reveal
                key={h.id}
                delay={i * 100}
                direction={i === 0 ? "left" : i === 2 ? "right" : "up"}
              >
                <TiltCard
                  intensity={4}
                  className="outframe outframe-hover group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {h.imageUrl && (
                      <Image
                        src={h.imageUrl}
                        alt={h.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                        style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                      />
                    )}
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider text-ink-800 shadow backdrop-blur-sm">
                      {h.category}
                    </span>
                    {/* price badge appears on hover */}
                    {h.price && (
                      <span className="absolute bottom-4 right-4 translate-y-2 rounded-full bg-brand-600 px-3 py-1.5 text-[12px] font-bold text-white opacity-0 shadow-lg transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                        {h.price}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold tracking-tight text-ink-900">
                      {h.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-500">
                      {h.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-ink-900/7 pt-4 text-[12.5px] font-semibold text-ink-600">
                      {[h.area, h.rooms, h.location].filter(Boolean).map((t) => (
                        <span key={t} className="rounded-full bg-sand-100 px-3 py-1 transition-colors duration-200 group-hover:bg-brand-50 group-hover:text-brand-700">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-600">
                      Läs mer
                      <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROCESS — dark aurora bg + animated steps
      ═══════════════════════════════════════════ */}
      <section id="process" className="scroll-mt-28 px-3 pt-28 sm:px-5">
        <div className="mx-auto max-w-7xl">
          <Reveal direction="scale">
            <div className="aurora-bg relative overflow-hidden rounded-[34px] px-6 py-16 text-white sm:px-12 lg:py-22">
              {/* light grid on dark */}
              <div className="grid-lines-light pointer-events-none absolute inset-0" />
              {/* animated orbs in dark context */}
              <DarkOrbs />
              {/* spinning rings */}
              <SpinRing
                size={500}
                className="absolute -right-36 -top-36 opacity-25"
                color="rgba(220,33,23,0.5)"
                dashArray="3 22"
                speed="65s"
              />
              <SpinRing
                size={260}
                className="absolute -bottom-20 left-16 opacity-20"
                color="rgba(255,255,255,0.4)"
                dashArray="5 18"
                speed="45s"
                reverse
              />

              <div className="relative">
                <Reveal>
                  <div className="max-w-2xl">
                    <SectionLabel dark>Så går det till</SectionLabel>
                    <h2 className="mt-4 text-balance text-[30px] font-extrabold leading-tight tracking-[-0.025em] sm:text-[42px]">
                      {s(set, "process.title")}
                    </h2>
                    <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-300">
                      {s(set, "process.body")}
                    </p>
                  </div>
                </Reveal>

                <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {process.map((p, i) => (
                    <Reveal key={p.id} delay={i * 80} direction="up">
                      <div className="group relative h-full overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-400 hover:-translate-y-2 hover:border-brand-500/40 hover:bg-white/[0.09] hover:shadow-[0_20px_60px_-20px_rgba(220,33,23,0.4)]">
                        {/* hover glow */}
                        <div className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                          style={{ background: "radial-gradient(circle at 50% 0%, rgba(220,33,23,0.12) 0%, transparent 65%)" }}
                        />
                        {/* step number — big faded behind */}
                        <span
                          className="pointer-events-none absolute right-4 top-2 select-none text-[72px] font-extrabold leading-none text-white/[0.04] transition-all duration-500 group-hover:text-white/[0.07]"
                          aria-hidden
                        >
                          {p.step}
                        </span>
                        <span className="text-[13px] font-extrabold tracking-[0.22em] text-brand-400">
                          {p.step}
                        </span>
                        <h3 className="mt-3 text-[18px] font-bold tracking-tight">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-[14.5px] leading-relaxed text-ink-300">
                          {p.body}
                        </p>
                        {/* animated bottom bar */}
                        <div className="mt-6 h-px w-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-800 transition-all duration-500 group-hover:w-full" />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT — parallax image + animated checklist
      ═══════════════════════════════════════════ */}
      <section className="relative px-3 pt-28 sm:px-5">
        {/* diagonal background stripe */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(175deg, transparent 0%, rgba(220,33,23,0.03) 40%, transparent 80%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="relative">
              <div className="outframe frame-ticks relative aspect-[4/3] overflow-hidden">
                {s(set, "about.image") && (
                  <Image
                    src={s(set, "about.image")}
                    alt="Om HusEsset"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                )}
                {/* subtle vignette */}
                <div className="absolute inset-0 rounded-[inherit]" style={{ boxShadow: "inset 0 0 60px rgba(23,24,22,0.15)" }} />
              </div>
              {/* floating accent badge */}
              <div className="absolute -right-5 -top-5 hidden rounded-[20px] border border-brand-600/15 bg-white p-4 shadow-[0_12px_40px_-12px_rgba(220,33,23,0.35)] sm:block">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400">Tillverkat i</p>
                <p className="mt-0.5 text-lg font-extrabold text-ink-900">Hökerum</p>
                <p className="mt-0.5 text-xs text-ink-500">sedan 1998</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} direction="right">
            <div>
              <SectionLabel>Om oss</SectionLabel>
              <h2 className="mt-4 text-balance text-[30px] font-extrabold leading-tight tracking-[-0.025em] text-ink-900 sm:text-[42px]">
                {s(set, "about.title")}
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-500">
                {s(set, "about.body")}
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {points.map((p, i) => (
                  <Reveal key={p} delay={i * 60} direction="up">
                    <li className="group flex items-start gap-3 rounded-2xl border border-ink-900/7 bg-white px-4 py-3.5 text-[14.5px] font-medium text-ink-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/20 hover:shadow-[0_8px_24px_-8px_rgba(220,33,23,0.2)]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-[0_2px_8px_rgba(220,33,23,0.4)] transition-transform duration-300 group-hover:scale-110">
                        <Icon name="check" className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  </Reveal>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/om-oss"
                  className="rounded-full bg-ink-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-ink-800 hover:shadow-[0_8px_24px_-8px_rgba(23,24,22,0.5)]"
                >
                  Läs mer om oss
                </Link>
                <a
                  href={s(set, "brochure.url", "#")}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-ink-900/12 bg-white px-6 py-3.5 text-sm font-semibold text-ink-800 transition-all duration-300 hover:border-brand-500/30 hover:text-brand-700"
                >
                  Kika på vår broschyr
                  <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS — layered depth bg + quote cards
      ═══════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className="relative px-3 pt-28 sm:px-5">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-full"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(220,33,23,0.05) 0%, transparent 65%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel>Kunder</SectionLabel>
              <h2 className="mt-4 max-w-2xl text-balance text-[30px] font-extrabold leading-tight tracking-[-0.025em] text-ink-900 sm:text-[42px]">
                Många nöjda husägare och byggherrar
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.id} delay={i * 90} direction="up">
                  <GlowCard className="outframe outframe-hover group relative h-full overflow-hidden p-7">
                    {/* big quote mark behind */}
                    <span
                      className="pointer-events-none absolute right-5 top-3 select-none text-[100px] font-extrabold leading-none text-brand-600/[0.06] transition-all duration-500 group-hover:text-brand-600/[0.1]"
                      aria-hidden
                    >
                      "
                    </span>
                    {/* stars */}
                    <div className="flex gap-1 text-brand-500">
                      {Array.from({ length: Math.max(1, Math.min(5, t.rating)) }).map((_, k) => (
                        <span
                          key={k}
                          style={{ transitionDelay: `${k * 40}ms` }}
                          className="transition-transform duration-200 group-hover:scale-110"
                        >
                          <Icon name="star" className="h-4 w-4 fill-current" />
                        </span>
                      ))}
                    </div>
                    <blockquote className="relative mt-5 text-[16px] leading-relaxed text-ink-700">
                      "{t.quote}"
                    </blockquote>
                    <figcaption className="mt-6 border-t border-ink-900/7 pt-4">
                      <span className="block text-[15px] font-bold text-ink-900">
                        {t.name}
                      </span>
                      <span className="text-sm text-ink-500">{t.role}</span>
                    </figcaption>
                  </GlowCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          FAQ + CTA — split layout with animated accordion
      ═══════════════════════════════════════════ */}
      <section className="px-3 pt-28 sm:px-5">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.05fr]">
          <Reveal direction="left">
            <div>
              <SectionLabel>Vanliga frågor</SectionLabel>
              <h2 className="mt-4 text-balance text-[30px] font-extrabold leading-tight tracking-[-0.025em] text-ink-900 sm:text-[38px]">
                Bra att veta innan du bygger
              </h2>
              <div className="mt-9 space-y-3">
                {faqs.map((f, i) => (
                  <Reveal key={f.id} delay={i * 55} direction="up">
                    <details className="group outframe overflow-hidden px-6 py-5 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden hover:border-brand-500/20 hover:shadow-[0_8px_32px_-12px_rgba(220,33,23,0.2)]">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 text-[16px] font-bold text-ink-900 transition-colors group-open:text-brand-700">
                        {f.question}
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-900/12 bg-sand-50 text-ink-500 transition-all duration-300 group-open:rotate-45 group-open:border-brand-500/30 group-open:bg-brand-50 group-open:text-brand-600">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
                        {f.answer}
                      </p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} direction="right">
            <div id="kontakt" className="scroll-mt-28">
              {/* CTA card with animated bg */}
              <div className="relative mb-6 overflow-hidden rounded-[28px] p-8 text-white"
                style={{
                  background: "linear-gradient(135deg, #dc2117 0%, #b81812 50%, #7d1a17 100%)",
                  boxShadow: "0 20px 60px -20px rgba(220,33,23,0.7)",
                }}
              >
                {/* animated shimmer overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)",
                    animation: "aurora 10s ease infinite",
                    backgroundSize: "200% 200%",
                  }}
                />
                <DarkOrbs />
                <div className="relative">
                  <h3 className="text-balance text-2xl font-extrabold tracking-tight sm:text-[28px]">
                    {s(set, "cta.title")}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/85">
                    {s(set, "cta.body")}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
                    <a
                      href={`tel:${s(set, "contact.phone").replace(/\s|-/g, "")}`}
                      className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-brand-700 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(255,255,255,0.3)]"
                    >
                      <Icon name="phone" className="h-4 w-4" />
                      {s(set, "contact.phone")}
                    </a>
                    <a
                      href={`mailto:${s(set, "contact.email")}`}
                      className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    >
                      <Icon name="mail" className="h-4 w-4" />
                      {s(set, "contact.email")}
                    </a>
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SectionLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.2em] ${
        dark ? "text-brand-400" : "text-brand-600"
      }`}
    >
      <span className="h-px w-8 bg-current opacity-60" />
      {children}
      <span className="h-px w-4 bg-current opacity-30" />
    </span>
  );
}
