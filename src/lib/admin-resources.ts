import {
  faqs,
  features,
  houses,
  leads,
  navLinks,
  processSteps,
  team,
  testimonials,
} from "@/db/schema";
import { RESOURCE_CONFIG, type ResourceConfig } from "@/lib/resource-fields";

/* eslint-disable @typescript-eslint/no-explicit-any */
const TABLES: Record<string, any> = {
  houses,
  features,
  processSteps,
  testimonials,
  faqs,
  team,
  navLinks,
  leads,
};

export type ResourceDef = ResourceConfig & { table: any };

export const RESOURCES: Record<string, ResourceDef> = Object.fromEntries(
  Object.entries(RESOURCE_CONFIG).map(([key, cfg]) => [
    key,
    { ...cfg, table: TABLES[key] },
  ]),
);

export function coerce(def: ResourceDef, input: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const f of def.fields) {
    if (!(f.name in input)) continue;
    const raw = input[f.name];
    if (f.type === "number") out[f.name] = Number(raw) || 0;
    else if (f.type === "boolean") out[f.name] = Boolean(raw);
    else out[f.name] = raw === null || raw === undefined ? "" : String(raw);
  }
  return out;
}
