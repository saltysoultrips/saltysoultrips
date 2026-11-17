// Builds Sanity "destination" documents from the compact files in ./destinations/.
// Usage (from studio-saltysoultrips/):
//   node content/build-destinations.mjs            -> writes content/destinations.ndjson and content/destinations.json
//   npx sanity documents create content/destinations.json --replace
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "destinations");
const key = (prefix, i) => `${prefix}${i + 1}`;

// Keep SEO titles within ~65 characters: drop the brand suffix when needed.
const fitTitle = (title) => {
  if (title.length <= 65) return title;
  const short = title.replace(/\s*\|\s*SaltySoulTrips$/, "");
  if (short.length > 65) throw new Error(`SEO title too long: ${short}`);
  return short;
};

export function toDocument(d) {
  d = { ...d, seo: [fitTitle(d.seo[0]), d.seo[1], fitTitle(d.seo[2]), d.seo[3]] };
  return {
    _id: d.id,
    _type: "destination",
    showOnWeb: true,
    name: d.name,
    name_en: d.name_en,
    slug: { _type: "slug", current: d.slug },
    slug_en: { _type: "slug", current: d.slug_en },
    title: d.title,
    title_en: d.title_en,
    region: d.region,
    matchTerms: d.terms,
    heroImage: {
      _type: "image",
      asset: { _type: "reference", _ref: d.img },
      alt: d.alt,
    },
    intro: d.intro,
    intro_en: d.intro_en,
    about: d.about,
    about_en: d.about_en,
    highlights: d.hl.map(([icon, title, desc, title_en, desc_en], i) => ({
      _key: key("h", i), icon, title, desc, title_en, desc_en,
    })),
    tips: d.tips,
    tips_en: d.tips_en,
    bestTime: {
      months: d.months, reason: d.reason, months_en: d.months_en, reason_en: d.reason_en,
    },
    idealDays: d.days,
    idealDays_en: d.days_en,
    budget: d.budget,
    budget_en: d.budget_en,
    routes: d.routes.map(([title, description, title_en, description_en], i) => ({
      _key: key("r", i), title, description, title_en, description_en,
    })),
    faqs: d.faqs.map(([question, answer, question_en, answer_en], i) => ({
      _key: key("f", i), question, answer, question_en, answer_en,
    })),
    seoTitle: d.seo[0],
    metaDescription: d.seo[1],
    seoTitle_en: d.seo[2],
    metaDescription_en: d.seo[3],
  };
}

export async function loadAll() {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mjs")).sort();
  const all = [];
  for (const f of files) {
    const mod = await import(`./destinations/${f}`);
    all.push(...mod.default);
  }
  return all;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const docs = (await loadAll()).map(toDocument);
  const out = path.join(path.dirname(dir), "destinations.ndjson");
  fs.writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
  fs.writeFileSync(out.replace(/\.ndjson$/, ".json"), JSON.stringify(docs, null, 1));
  console.log(`${docs.length} destinations -> ${out}`);
}
