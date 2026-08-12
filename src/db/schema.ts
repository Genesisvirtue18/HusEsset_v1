import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/** Global key/value content store (hero texts, contact info, SEO, etc.) */
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default(""),
  label: text("label").notNull().default(""),
  group: text("group").notNull().default("general"),
  type: text("type").notNull().default("text"), // text | textarea | image | color
  sort: integer("sort").notNull().default(0),
});

export const navLinks = pgTable("nav_links", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

export const features = pgTable("features", {
  id: serial("id").primaryKey(),
  icon: text("icon").notNull().default("star"),
  title: text("title").notNull(),
  body: text("body").notNull().default(""),
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

export const houses = pgTable("houses", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull().default("Villa"),
  location: text("location").notNull().default(""),
  area: text("area").notNull().default(""),
  rooms: text("rooms").notNull().default(""),
  price: text("price").notNull().default(""),
  summary: text("summary").notNull().default(""),
  description: text("description").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  gallery: text("gallery").notNull().default(""), // comma/newline separated urls
  featured: boolean("featured").notNull().default(false),
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

export const processSteps = pgTable("process_steps", {
  id: serial("id").primaryKey(),
  step: text("step").notNull().default("01"),
  title: text("title").notNull(),
  body: text("body").notNull().default(""),
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull().default(""),
  quote: text("quote").notNull().default(""),
  rating: integer("rating").notNull().default(5),
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull().default(""),
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

export const team = pgTable("team", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull().default(""),
  phone: text("phone").notNull().default(""),
  email: text("email").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  projectType: text("project_type").notNull().default(""),
  message: text("message").notNull().default(""),
  status: text("status").notNull().default("ny"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Setting = typeof settings.$inferSelect;
export type NavLink = typeof navLinks.$inferSelect;
export type Feature = typeof features.$inferSelect;
export type House = typeof houses.$inferSelect;
export type ProcessStep = typeof processSteps.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
export type TeamMember = typeof team.$inferSelect;
export type Lead = typeof leads.$inferSelect;
