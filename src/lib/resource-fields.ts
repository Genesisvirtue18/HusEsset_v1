export type FieldType = "text" | "textarea" | "number" | "boolean" | "image";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
};

export type ResourceConfig = {
  key: string;
  label: string;
  singular: string;
  icon: string;
  fields: FieldDef[];
  defaults: Record<string, unknown>;
  readOnly?: boolean;
  titleField: string;
  subtitleField?: string;
};

const sortField: FieldDef = { name: "sort", label: "Ordning", type: "number" };
const visibleField: FieldDef = { name: "visible", label: "Synlig", type: "boolean" };

export const RESOURCE_CONFIG: Record<string, ResourceConfig> = {
  houses: {
    key: "houses",
    label: "Hus & modeller",
    singular: "Husmodell",
    icon: "house",
    titleField: "title",
    subtitleField: "category",
    fields: [
      { name: "title", label: "Namn", type: "text" },
      { name: "slug", label: "URL-slug", type: "text", placeholder: "villa-are" },
      {
        name: "category",
        label: "Kategori",
        type: "text",
        options: ["Villa", "Attefallshus", "Fritidshus", "Flerfamiljshus", "Övrigt"],
      },
      { name: "location", label: "Ort", type: "text" },
      { name: "area", label: "Boarea", type: "text" },
      { name: "rooms", label: "Rum", type: "text" },
      { name: "price", label: "Pris", type: "text" },
      { name: "summary", label: "Kort beskrivning", type: "textarea" },
      { name: "description", label: "Lång beskrivning", type: "textarea" },
      { name: "imageUrl", label: "Huvudbild (URL)", type: "image" },
      { name: "gallery", label: "Galleri (en URL per rad)", type: "textarea" },
      { name: "featured", label: "Utvald på startsidan", type: "boolean" },
      sortField,
      visibleField,
    ],
    defaults: {
      title: "Ny husmodell",
      slug: "ny-husmodell",
      category: "Villa",
      location: "",
      area: "",
      rooms: "",
      price: "",
      summary: "",
      description: "",
      imageUrl: "",
      gallery: "",
      featured: false,
      sort: 99,
      visible: true,
    },
  },
  features: {
    key: "features",
    label: "Fördelar",
    singular: "Fördel",
    icon: "star",
    titleField: "title",
    fields: [
      {
        name: "icon",
        label: "Ikon",
        type: "text",
        options: [
          "flex",
          "chat",
          "shield",
          "leaf",
          "ruler",
          "truck",
          "star",
          "house",
          "hammer",
        ],
      },
      { name: "title", label: "Rubrik", type: "text" },
      { name: "body", label: "Text", type: "textarea" },
      sortField,
      visibleField,
    ],
    defaults: { icon: "star", title: "Ny fördel", body: "", sort: 99, visible: true },
  },
  processSteps: {
    key: "processSteps",
    label: "Processteg",
    singular: "Steg",
    icon: "ruler",
    titleField: "title",
    subtitleField: "step",
    fields: [
      { name: "step", label: "Nummer", type: "text" },
      { name: "title", label: "Rubrik", type: "text" },
      { name: "body", label: "Text", type: "textarea" },
      sortField,
      visibleField,
    ],
    defaults: { step: "07", title: "Nytt steg", body: "", sort: 99, visible: true },
  },
  testimonials: {
    key: "testimonials",
    label: "Omdömen",
    singular: "Omdöme",
    icon: "chat",
    titleField: "name",
    subtitleField: "role",
    fields: [
      { name: "name", label: "Namn", type: "text" },
      { name: "role", label: "Projekt/roll", type: "text" },
      { name: "quote", label: "Citat", type: "textarea" },
      { name: "rating", label: "Betyg (1-5)", type: "number" },
      sortField,
      visibleField,
    ],
    defaults: { name: "Ny kund", role: "", quote: "", rating: 5, sort: 99, visible: true },
  },
  faqs: {
    key: "faqs",
    label: "Frågor & svar",
    singular: "Fråga",
    icon: "shield",
    titleField: "question",
    fields: [
      { name: "question", label: "Fråga", type: "text" },
      { name: "answer", label: "Svar", type: "textarea" },
      sortField,
      visibleField,
    ],
    defaults: { question: "Ny fråga", answer: "", sort: 99, visible: true },
  },
  team: {
    key: "team",
    label: "Medarbetare",
    singular: "Medarbetare",
    icon: "chat",
    titleField: "name",
    subtitleField: "role",
    fields: [
      { name: "name", label: "Namn", type: "text" },
      { name: "role", label: "Roll", type: "text" },
      { name: "phone", label: "Telefon", type: "text" },
      { name: "email", label: "E-post", type: "text" },
      { name: "imageUrl", label: "Bild (URL)", type: "image" },
      sortField,
      visibleField,
    ],
    defaults: {
      name: "Ny medarbetare",
      role: "",
      phone: "",
      email: "",
      imageUrl: "",
      sort: 99,
      visible: true,
    },
  },
  navLinks: {
    key: "navLinks",
    label: "Meny",
    singular: "Menylänk",
    icon: "arrow",
    titleField: "label",
    subtitleField: "href",
    fields: [
      { name: "label", label: "Text", type: "text" },
      { name: "href", label: "Länk", type: "text" },
      sortField,
      visibleField,
    ],
    defaults: { label: "Ny länk", href: "/", sort: 99, visible: true },
  },
  leads: {
    key: "leads",
    label: "Förfrågningar",
    singular: "Förfrågan",
    icon: "mail",
    readOnly: true,
    titleField: "name",
    subtitleField: "email",
    fields: [
      { name: "name", label: "Namn", type: "text" },
      { name: "email", label: "E-post", type: "text" },
      { name: "phone", label: "Telefon", type: "text" },
      { name: "projectType", label: "Projekttyp", type: "text" },
      { name: "message", label: "Meddelande", type: "textarea" },
      {
        name: "status",
        label: "Status",
        type: "text",
        options: ["ny", "kontaktad", "offert skickad", "vunnen", "avslutad"],
      },
    ],
    defaults: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
      status: "ny",
    },
  },
};

export const RESOURCE_ORDER = [
  "houses",
  "features",
  "processSteps",
  "testimonials",
  "faqs",
  "team",
  "navLinks",
  "leads",
];
