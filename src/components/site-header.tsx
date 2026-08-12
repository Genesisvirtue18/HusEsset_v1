"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Icon } from "@/components/icons";

export type NavItem = { id: number; label: string; href: string };

export function SiteHeader({
  nav,
  phone,
  siteName,
}: {
  nav: NavItem[];
  phone: string;
  siteName: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div
        className={`mx-auto flex max-w-7xl items-center gap-4 rounded-[22px] border px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-ink-900/10 bg-white/85 shadow-[0_18px_40px_-30px_rgba(23,24,22,0.6)] backdrop-blur-xl"
            : "border-transparent bg-white/60 backdrop-blur-md"
        }`}
      >
        <Link href="/" className="shrink-0" aria-label={siteName}>
          <Logo name={siteName} className="h-9 w-auto sm:h-10" />
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("#")[0]) &&
                  item.href !== "/";
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                  active
                    ? "bg-ink-900/5 text-ink-900"
                    : "text-ink-600 hover:bg-ink-900/5 hover:text-ink-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <a
            href={`tel:${phone.replace(/\s|-/g, "")}`}
            className="hidden items-center gap-2 rounded-full border border-ink-900/10 px-4 py-2 text-sm font-semibold text-ink-800 transition-colors hover:border-brand-600/40 hover:text-brand-700 md:flex"
          >
            <Icon name="phone" className="h-4 w-4" />
            {phone}
          </a>
          <Link
            href="/kontakt"
            className="group hidden items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_-12px_rgba(220,33,23,0.9)] transition-all hover:bg-brand-700 sm:flex"
          >
            Begär offert
            <Icon
              name="arrow"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Meny"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-800 lg:hidden"
          >
            <span className="relative block h-3.5 w-4.5">
              <span
                className={`absolute left-0 block h-0.5 w-4 rounded bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-4 rounded bg-current transition-all ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-4 rounded bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-[22px] border border-ink-900/10 bg-white/95 p-3 shadow-xl backdrop-blur-xl lg:hidden">
          <div className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="rounded-xl px-4 py-3 text-base font-medium text-ink-800 hover:bg-sand-100"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              className="mt-2 rounded-xl bg-brand-600 px-4 py-3 text-center text-base font-semibold text-white"
            >
              Begär offert
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
