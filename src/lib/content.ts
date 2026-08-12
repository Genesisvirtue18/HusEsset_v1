import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  faqs,
  features,
  houses,
  navLinks,
  processSteps,
  settings,
  team,
  testimonials,
} from "@/db/schema";
import {
  ensureSeed,
  FAQS as FALLBACK_FAQS,
  FEATURES as FALLBACK_FEATURES,
  HOUSES as FALLBACK_HOUSES,
  NAV as FALLBACK_NAV,
  PROCESS as FALLBACK_PROCESS,
  SETTINGS as FALLBACK_SETTINGS,
  TEAM as FALLBACK_TEAM,
  TESTIMONIALS as FALLBACK_TESTIMONIALS,
} from "@/lib/seed";

export type SettingsMap = Record<string, string>;

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function getSettings(): Promise<SettingsMap> {
  await ensureSeed();
  const rows =
    (await safe(() => db.select().from(settings), null)) ??
    FALLBACK_SETTINGS.map((s) => ({
      key: s.key,
      value: s.value,
    }));
  const map: SettingsMap = {};
  for (const row of rows) map[row.key] = row.value;
  return map;
}

export function s(map: SettingsMap, key: string, fallback = ""): string {
  const v = map[key];
  return v === undefined || v === "" ? fallback : v;
}

export async function getNav() {
  await ensureSeed();
  return safe(
    () =>
      db
        .select()
        .from(navLinks)
        .where(eq(navLinks.visible, true))
        .orderBy(asc(navLinks.sort), asc(navLinks.id)),
    FALLBACK_NAV.map((item, index) => ({
      id: index + 1,
      ...item,
      visible: true,
    })),
  );
}

export async function getFeatures() {
  return safe(
    () =>
      db
        .select()
        .from(features)
        .where(eq(features.visible, true))
        .orderBy(asc(features.sort), asc(features.id)),
    FALLBACK_FEATURES.map((item, index) => ({
      id: index + 1,
      ...item,
      visible: true,
    })),
  );
}

export async function getHouses() {
  return safe(
    () =>
      db
        .select()
        .from(houses)
        .where(eq(houses.visible, true))
        .orderBy(asc(houses.sort), asc(houses.id)),
    FALLBACK_HOUSES.map((item, index) => ({
      id: index + 1,
      ...item,
      visible: true,
    })),
  );
}

export async function getHouse(slug: string) {
  const rows = await safe(
    () => db.select().from(houses).where(eq(houses.slug, slug)).limit(1),
    FALLBACK_HOUSES.filter((h) => h.slug === slug).slice(0, 1).map((item, index) => ({
      id: index + 1,
      ...item,
      visible: true,
    })),
  );
  return rows[0] ?? null;
}

export async function getProcess() {
  return safe(
    () =>
      db
        .select()
        .from(processSteps)
        .where(eq(processSteps.visible, true))
        .orderBy(asc(processSteps.sort), asc(processSteps.id)),
    FALLBACK_PROCESS.map((item, index) => ({
      id: index + 1,
      ...item,
      visible: true,
    })),
  );
}

export async function getTestimonials() {
  return safe(
    () =>
      db
        .select()
        .from(testimonials)
        .where(eq(testimonials.visible, true))
        .orderBy(asc(testimonials.sort), asc(testimonials.id)),
    FALLBACK_TESTIMONIALS.map((item, index) => ({
      id: index + 1,
      ...item,
      rating: 5,
      visible: true,
    })),
  );
}

export async function getFaqs() {
  return safe(
    () =>
      db
        .select()
        .from(faqs)
        .where(eq(faqs.visible, true))
        .orderBy(asc(faqs.sort), asc(faqs.id)),
    FALLBACK_FAQS.map((item, index) => ({
      id: index + 1,
      ...item,
      visible: true,
    })),
  );
}

export async function getTeam() {
  return safe(
    () =>
      db
        .select()
        .from(team)
        .where(eq(team.visible, true))
        .orderBy(asc(team.sort), asc(team.id)),
    FALLBACK_TEAM.map((item, index) => ({
      id: index + 1,
      ...item,
      visible: true,
    })),
  );
}

export function splitLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}
