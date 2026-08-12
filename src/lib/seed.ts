import { sql } from "drizzle-orm";
import { db } from "@/db";
import {
  faqs,
  features,
  houses,
  leads,
  navLinks,
  processSteps,
  settings,
  team,
  testimonials,
} from "@/db/schema";

const IMG = {
  hero: "https://images.pexels.com/photos/7598374/pexels-photo-7598374.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  forest:
    "https://images.pexels.com/photos/16270705/pexels-photo-16270705.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  red: "https://images.pexels.com/photos/37064612/pexels-photo-37064612.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  timber:
    "https://images.pexels.com/photos/34807332/pexels-photo-34807332.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  winter:
    "https://images.pexels.com/photos/34899110/pexels-photo-34899110.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  cottage:
    "https://images.pexels.com/photos/35302342/pexels-photo-35302342.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  yellow:
    "https://images.pexels.com/photos/36366931/pexels-photo-36366931.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  frame:
    "https://images.pexels.com/photos/33404353/pexels-photo-33404353.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  work: "https://images.pexels.com/photos/37499254/pexels-photo-37499254.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  saw: "https://images.pexels.com/photos/37499255/pexels-photo-37499255.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
};

type SettingSeed = {
  key: string;
  value: string;
  label: string;
  group: string;
  type?: string;
  sort?: number;
};

export const SETTINGS: SettingSeed[] = [
  // Företag
  { key: "site.name", value: "HusEsset", label: "Företagsnamn", group: "foretag", sort: 1 },
  { key: "site.legalName", value: "Husesset i Hökerum AB", label: "Juridiskt namn", group: "foretag", sort: 2 },
  { key: "site.tagline", value: "Prefabhus i trä, byggda efter dina idéer", label: "Tagline", group: "foretag", sort: 3 },
  { key: "site.orgnr", value: "556987-1234", label: "Organisationsnummer", group: "foretag", sort: 4 },
  { key: "contact.phone", value: "0321-51 00 00", label: "Telefon", group: "foretag", sort: 5 },
  { key: "contact.email", value: "info@husesset.com", label: "E-post", group: "foretag", sort: 6 },
  { key: "contact.address", value: "Hökerumsvägen 12", label: "Adress", group: "foretag", sort: 7 },
  { key: "contact.city", value: "523 61 Hökerum, Ulricehamn", label: "Postort", group: "foretag", sort: 8 },
  { key: "contact.hours", value: "Mån–Fre 07:00–16:00", label: "Öppettider", group: "foretag", sort: 9 },
  { key: "social.facebook", value: "https://www.facebook.com/", label: "Facebook", group: "foretag", sort: 10 },
  { key: "social.instagram", value: "https://www.instagram.com/", label: "Instagram", group: "foretag", sort: 11 },
  { key: "brochure.url", value: "https://www.sebroschyr.se/Husesset-Hokerum/MailView/", label: "Broschyr-länk", group: "foretag", sort: 12 },

  // Hero
  { key: "hero.eyebrow", value: "Prefabhus • Villastommar • Trä", label: "Hero: etikett", group: "hero", sort: 1 },
  { key: "hero.title", value: "Få en anpassad villastomme —", label: "Hero: rubrik", group: "hero", sort: 2 },
  { key: "hero.titleAccent", value: "börja bygga ditt drömhus idag", label: "Hero: rubrik (röd del)", group: "hero", sort: 3 },
  {
    key: "hero.body",
    value:
      "Vi levererar unika prefabhus, villor och småhus i trä. Oavsett om du har en färdig ritning eller bara en idé hjälper vi dig hela vägen – från friggebod till flerfamiljshus. Alltid med kvalitet, personlig kontakt och prisvärda lösningar.",
    label: "Hero: text",
    group: "hero",
    type: "textarea",
    sort: 4,
  },
  { key: "hero.image", value: IMG.hero, label: "Hero: bild-URL", group: "hero", type: "image", sort: 5 },
  { key: "hero.ctaPrimary", value: "Begär offert", label: "Hero: knapp 1", group: "hero", sort: 6 },
  { key: "hero.ctaPrimaryHref", value: "/kontakt", label: "Hero: knapp 1 länk", group: "hero", sort: 7 },
  { key: "hero.ctaSecondary", value: "Se våra hus", label: "Hero: knapp 2", group: "hero", sort: 8 },
  { key: "hero.ctaSecondaryHref", value: "/hus", label: "Hero: knapp 2 länk", group: "hero", sort: 9 },
  { key: "hero.stat1Value", value: "25+", label: "Statistik 1: värde", group: "hero", sort: 10 },
  { key: "hero.stat1Label", value: "år i branschen", label: "Statistik 1: text", group: "hero", sort: 11 },
  { key: "hero.stat2Value", value: "400+", label: "Statistik 2: värde", group: "hero", sort: 12 },
  { key: "hero.stat2Label", value: "levererade stommar", label: "Statistik 2: text", group: "hero", sort: 13 },
  { key: "hero.stat3Value", value: "100%", label: "Statistik 3: värde", group: "hero", sort: 14 },
  { key: "hero.stat3Label", value: "svensktillverkat trä", label: "Statistik 3: text", group: "hero", sort: 15 },
  {
    key: "hero.marquee",
    value:
      "Villastommar • Friggebodar • Attefallshus • Fritidshus • Flerfamiljshus • Garage • Tillbyggnader • Takstolar • Lösvirke",
    label: "Löpande text",
    group: "hero",
    type: "textarea",
    sort: 16,
  },

  // Sektioner
  { key: "features.title", value: "Varför välja HusEsset som din husleverantör?", label: "Fördelar: rubrik", group: "sektioner", sort: 1 },
  {
    key: "features.body",
    value:
      "Vi bygger prefabhus i trä med fokus på flexibilitet, personlig kontakt och kvalitet i varje detalj. Hos oss får du en trygg partner som följer dig hela vägen – från idé till färdig stomme, utan mellanhänder.",
    label: "Fördelar: text",
    group: "sektioner",
    type: "textarea",
    sort: 2,
  },
  { key: "houses.title", value: "Prefab som du vill ha det", label: "Hus: rubrik", group: "sektioner", sort: 3 },
  {
    key: "houses.body",
    value:
      "Gediget och rejält utförande. Välj en av våra utgångsmodeller eller skicka in din egen ritning – vi projekterar och tillverkar därefter.",
    label: "Hus: text",
    group: "sektioner",
    type: "textarea",
    sort: 4,
  },
  { key: "process.title", value: "Från första skiss till rest stomme", label: "Process: rubrik", group: "sektioner", sort: 5 },
  {
    key: "process.body",
    value: "En tydlig process där du vet exakt vad som händer i varje steg – och vem du pratar med.",
    label: "Process: text",
    group: "sektioner",
    type: "textarea",
    sort: 6,
  },
  { key: "about.title", value: "Vi värdesätter en personlig kontakt", label: "Om oss: rubrik", group: "sektioner", sort: 7 },
  {
    key: "about.body",
    value:
      "Det finns en uppsjö av små och stora husleverantörer – varför ska du välja just HusEsset? Hos oss pratar du direkt med dem som projekterar och bygger ditt hus. Inga mellanhänder, inga överraskningar. Vi bygger diffusionsöppet och fuktsäkert med naturliga material för en sund boendemiljö som håller i generationer.",
    label: "Om oss: text",
    group: "sektioner",
    type: "textarea",
    sort: 8,
  },
  { key: "about.image", value: IMG.timber, label: "Om oss: bild-URL", group: "sektioner", type: "image", sort: 9 },
  {
    key: "about.points",
    value:
      "Egen projektering och konstruktion\nDiffusionsöppna och fuktsäkra konstruktioner\nTillverkning i egen fabrik i Hökerum\nMontage och resning av stomme på plats",
    label: "Om oss: punktlista (en per rad)",
    group: "sektioner",
    type: "textarea",
    sort: 10,
  },
  { key: "cta.title", value: "Ta första steget mot ditt nya hus", label: "CTA: rubrik", group: "sektioner", sort: 11 },
  {
    key: "cta.body",
    value:
      "HusEsset tillverkar prefabhus efter era önskemål. Vi tycker att det är roligt att bygga hus – och vi har många nöjda kunder. Hör av dig för ett förutsättningslöst samtal om ditt projekt.",
    label: "CTA: text",
    group: "sektioner",
    type: "textarea",
    sort: 12,
  },
  { key: "footer.text", value: "Prefabhus, villastommar och småhus i trä sedan 1998. Tillverkat i Hökerum, levererat i hela Sverige.", label: "Footer: text", group: "sektioner", type: "textarea", sort: 13 },
];

export const NAV = [
  { label: "Hem", href: "/", sort: 1 },
  { label: "Våra hus", href: "/hus", sort: 2 },
  { label: "Så går det till", href: "/#process", sort: 3 },
  { label: "Om oss", href: "/om-oss", sort: 4 },
  { label: "Kontakt", href: "/kontakt", sort: 5 },
];

export const FEATURES = [
  { icon: "flex", title: "Flexibel leverantör", body: "Vi bygger prefabhus efter dina idéer och önskemål – inte efter en katalog.", sort: 1 },
  { icon: "chat", title: "Personlig kontakt", body: "Direkt dialog med oss som projekterar, konstruerar och bygger ditt hus.", sort: 2 },
  { icon: "shield", title: "Kvalitet & helhet", body: "Noggrannhet och helhetstänk från start till mål, i varje detalj.", sort: 3 },
  { icon: "leaf", title: "Hållbara material", body: "Diffusionsöppet, fuktsäkert och naturligt för en sund boendemiljö.", sort: 4 },
  { icon: "ruler", title: "Egen projektering", body: "Vi ritar, beräknar och tar fram bygghandlingar tillsammans med dig.", sort: 5 },
  { icon: "truck", title: "Leverans i hela Sverige", body: "Färdiga element som reses snabbt och väderskyddat på din tomt.", sort: 6 },
];

export const PROCESS = [
  { step: "01", title: "Idé & förutsättningar", body: "Vi tar ett förutsättningslöst samtal om tomt, budget och dina önskemål.", sort: 1 },
  { step: "02", title: "Ritning & offert", body: "Din skiss eller vår – vi projekterar och tar fram en tydlig, transparent offert.", sort: 2 },
  { step: "03", title: "Konstruktion", body: "Bygghandlingar, konstruktionsberäkningar och materialval fastställs.", sort: 3 },
  { step: "04", title: "Tillverkning", body: "Väggar, bjälklag och takstolar tillverkas i vår fabrik i Hökerum.", sort: 4 },
  { step: "05", title: "Leverans & resning", body: "Elementen levereras och stommen reses – ofta tätt hus på några dagar.", sort: 5 },
  { step: "06", title: "Uppföljning", body: "Vi finns kvar efter leverans och svarar på frågor genom hela bygget.", sort: 6 },
];

export const HOUSES = [
  {
    slug: "villa-are",
    title: "Villa Åre",
    category: "Villa",
    location: "Åre",
    area: "168 m²",
    rooms: "5 rum och kök",
    price: "Från 1 690 000 kr",
    summary: "Fjällnära villa med stora glaspartier, hög nock och robust träfasad.",
    description:
      "Villa Åre är ritad för det nordiska klimatet med en välisolerad, diffusionsöppen stomme och rejäla takstolar som klarar tung snölast. Den öppna planlösningen samlar kök, matplats och vardagsrum mot söder, medan sovrummen ligger avskilt i husets norra del.",
    imageUrl: IMG.hero,
    gallery: [IMG.forest, IMG.timber].join("\n"),
    featured: true,
    sort: 1,
  },
  {
    slug: "hus-herrljunga",
    title: "Hus Herrljunga",
    category: "Villa",
    location: "Herrljunga",
    area: "142 m²",
    rooms: "4 rum och kök",
    price: "Från 1 340 000 kr",
    summary: "Klassisk 1,5-planare med brun träfasad och generös altan.",
    description:
      "En tidlös svensk villa i 1,5 plan. Stommen levereras som färdiga väggelement med isolering, vindskydd och fönster monterade – tätt hus på kort tid oavsett årstid.",
    imageUrl: IMG.forest,
    gallery: [IMG.red, IMG.frame].join("\n"),
    featured: true,
    sort: 2,
  },
  {
    slug: "faluvillan",
    title: "Faluvillan",
    category: "Villa",
    location: "Ulricehamn",
    area: "126 m²",
    rooms: "4 rum och kök",
    price: "Från 1 180 000 kr",
    summary: "Falurött enplanshus med vita knutar och traditionell profil.",
    description:
      "För dig som vill ha det klassiska svenska huset med moderna prestanda. Faluvillan kombinerar traditionell arkitektur med en energieffektiv, fuktsäker konstruktion.",
    imageUrl: IMG.red,
    gallery: [IMG.cottage].join("\n"),
    featured: true,
    sort: 3,
  },
  {
    slug: "attefall-30",
    title: "Attefall 30",
    category: "Attefallshus",
    location: "Levereras i hela Sverige",
    area: "30 m²",
    rooms: "1 rum och kokvrå",
    price: "Från 289 000 kr",
    summary: "Komplett attefallshus med badrum, pentry och sovloft.",
    description:
      "Attefall 30 levereras som färdig stomme med fönster och dörrar. Perfekt som gäststuga, kontor eller uthyrningsdel – bygglovsbefriat inom gällande regler.",
    imageUrl: IMG.cottage,
    gallery: "",
    featured: false,
    sort: 4,
  },
  {
    slug: "fritidshus-tiveden",
    title: "Fritidshus Tiveden",
    category: "Fritidshus",
    location: "Tiveden",
    area: "74 m²",
    rooms: "3 rum och kök",
    price: "Från 720 000 kr",
    summary: "Lågmält fritidshus i skogsmiljö med stor takutsprång.",
    description:
      "Ett fritidshus som smälter in i naturen. Obehandlad furupanel som får grånas vackert, och en stomme dimensionerad för året-runt-boende.",
    imageUrl: IMG.winter,
    gallery: "",
    featured: false,
    sort: 5,
  },
  {
    slug: "flerfamiljshus-parhus",
    title: "Parhus Boråsvägen",
    category: "Flerfamiljshus",
    location: "Borås",
    area: "2 × 108 m²",
    rooms: "2 × 4 rum och kök",
    price: "Offereras per projekt",
    summary: "Parhus i två plan för exploatörer och byggherrar.",
    description:
      "Vi levererar även större volymer till byggherrar och exploatörer. Parhuset levereras som prefabricerade väggelement med ljud- och brandkrav enligt gällande regler.",
    imageUrl: IMG.yellow,
    gallery: "",
    featured: false,
    sort: 6,
  },
];

export const TESTIMONIALS = [
  { name: "Anna & Petter L.", role: "Villa i Åre", quote: "Vi kom med en egen skiss och fick tillbaka en genomtänkt konstruktion. Stommen restes på tre dagar och allt stämde på millimetern.", sort: 1 },
  { name: "Mikael S.", role: "Byggherre, Borås", quote: "Rak kommunikation, hållna tider och en kvalitet på elementen som gör montaget enkelt. Vi återkommer med fler projekt.", sort: 2 },
  { name: "Familjen Nyberg", role: "Attefallshus, Ulricehamn", quote: "Personlig kontakt hela vägen. Man känner att de bryr sig om att det blir rätt, inte bara att det blir sålt.", sort: 3 },
];

export const FAQS = [
  { question: "Kan ni bygga efter min egen ritning?", answer: "Absolut. De flesta av våra projekt utgår från kundens egen ritning eller skiss. Vi tar fram konstruktionshandlingar och anpassar stommen efter dina förutsättningar.", sort: 1 },
  { question: "Vad ingår i en villastomme från HusEsset?", answer: "Normalt ingår ytterväggselement med isolering och vindskydd, innerväggar, bjälklag, takstolar och råspont. Fönster, dörrar och montage kan läggas till – vi skräddarsyr leveransomfattningen.", sort: 2 },
  { question: "Hur lång är leveranstiden?", answer: "Från beställd konstruktion till leverans är det normalt 8–16 veckor beroende på projektets storlek och säsong.", sort: 3 },
  { question: "Levererar ni i hela Sverige?", answer: "Ja. Vi tillverkar i Hökerum utanför Ulricehamn och levererar till hela Sverige, med resning av stomme på plats.", sort: 4 },
  { question: "Vad betyder diffusionsöppen konstruktion?", answer: "Det innebär att väggen kan torka ut åt båda håll. Det ger en robust, fuktsäker konstruktion och ett behagligt inomhusklimat utan plastfolie som fuktspärr.", sort: 5 },
];

export const TEAM = [
  { name: "Jonas Andersson", role: "VD & projektering", phone: "0321-51 00 01", email: "jonas@husesset.com", imageUrl: IMG.work, sort: 1 },
  { name: "Sara Lund", role: "Konstruktör", phone: "0321-51 00 02", email: "sara@husesset.com", imageUrl: IMG.saw, sort: 2 },
  { name: "Erik Holm", role: "Produktionsansvarig", phone: "0321-51 00 03", email: "erik@husesset.com", imageUrl: IMG.frame, sort: 3 },
];

let seedPromise: Promise<void> | null = null;

async function runSeed() {
  await db
    .insert(settings)
    .values(
      SETTINGS.map((s) => ({
        key: s.key,
        value: s.value,
        label: s.label,
        group: s.group,
        type: s.type ?? "text",
        sort: s.sort ?? 0,
      })),
    )
    .onConflictDoNothing();

  const existing = await db.select({ id: navLinks.id }).from(navLinks).limit(1);
  if (existing.length === 0) {
    await db.insert(navLinks).values(NAV);
  }

  const f = await db.select({ id: features.id }).from(features).limit(1);
  if (f.length === 0) await db.insert(features).values(FEATURES);

  const p = await db.select({ id: processSteps.id }).from(processSteps).limit(1);
  if (p.length === 0) await db.insert(processSteps).values(PROCESS);

  const h = await db.select({ id: houses.id }).from(houses).limit(1);
  if (h.length === 0) await db.insert(houses).values(HOUSES);

  const t = await db.select({ id: testimonials.id }).from(testimonials).limit(1);
  if (t.length === 0) await db.insert(testimonials).values(TESTIMONIALS);

  const q = await db.select({ id: faqs.id }).from(faqs).limit(1);
  if (q.length === 0) await db.insert(faqs).values(FAQS);

  const tm = await db.select({ id: team.id }).from(team).limit(1);
  if (tm.length === 0) await db.insert(team).values(TEAM);

  const l = await db.select({ id: leads.id }).from(leads).limit(1);
  if (l.length === 0) {
    await db.insert(leads).values([
      {
        name: "Karin Fransson",
        email: "karin@example.se",
        phone: "070-123 45 67",
        projectType: "Villa",
        message: "Hej! Vi har en tomt i Ulricehamn och funderar på en 1,5-planare på ca 140 m². Kan vi boka ett möte?",
        status: "ny",
      },
    ]);
  }
}

export async function ensureSeed() {
  if (!seedPromise) {
    seedPromise = (async () => {
      try {
        await db.execute(sql`select 1 from settings limit 1`);
        await runSeed();
      } catch {
        seedPromise = null;
      }
    })();
  }
  return seedPromise;
}
