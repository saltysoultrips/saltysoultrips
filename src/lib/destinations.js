import { useEffect, useState } from "react";
import { client } from "./sanity";
import { getPackageCountries } from "../data/countryMap";
import { postPath, hasEnglishPost, isLiveDestination } from "./routes";

export const DESTINATION_FIELDS = `_id, _updatedAt, showOnWeb, slug, slug_en, name, name_en,
  title, title_en, heroImage, matchTerms, region, continent, intro, intro_en, about, about_en,
  highlights, tips, tips_en, bestTime, idealDays, idealDays_en, budget, budget_en,
  routes, faqs, seoTitle, seoTitle_en, metaDescription, metaDescription_en, heroSubtitle`;

// Spanish place names that take the article ("viajes al País Vasco").
const WITH_ARTICLE = new Set(["País Vasco"]);
/** "a" + name → "a Japón" / "al País Vasco"; "en" + name → "en el País Vasco". */
export const esPrep = (prep, name) =>
  WITH_ARTICLE.has(name)
    ? prep === "a"
      ? `al ${name}`
      : prep === "de"
        ? `del ${name}`
        : `${prep} el ${name}`
    : `${prep} ${name}`;

/** Bilingual field picker with Spanish fallback. */
export const pickLang = (obj, field, en) =>
  (en && obj?.[`${field}_en`]) || obj?.[field];

const words = (s) =>
  ` ${String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()} `;

export const destinationTerms = (d) =>
  [...(d.matchTerms || []), d.name, d.name_en]
    .map(words)
    .filter((t) => t.trim().length >= 3);

const mentions = (text, terms) => {
  const haystack = words(text);
  return terms.some((t) => haystack.includes(t));
};

let liveDestinationsPromise;
/** Published destinations (cached for the session). */
export function fetchLiveDestinations() {
  liveDestinationsPromise ??= client
    .fetch(`*[_type == "destination" && showOnWeb == true]{${DESTINATION_FIELDS}}`)
    .then((list) => list.filter(isLiveDestination))
    .catch(() => {
      liveDestinationsPromise = undefined;
      return [];
    });
  return liveDestinationsPromise;
}

/** Destinations whose terms appear in the given text (package title, post title…). */
export async function findDestinationsFor(text) {
  const list = await fetchLiveDestinations();
  return list.filter((d) => mentions(text, destinationTerms(d)));
}

/** React hook: live destinations, or null while loading. */
export function useLiveDestinations() {
  const [list, setList] = useState(null);
  useEffect(() => {
    let active = true;
    fetchLiveDestinations().then((l) => active && setList(l));
    return () => {
      active = false;
    };
  }, []);
  return list;
}

/** Packages and blog posts that mention the destination (for internal links). */
export async function fetchDestinationLinks(d, lang) {
  const en = lang === "en";
  const terms = destinationTerms(d);
  const { packages, posts } = await client.fetch(`{
    "packages": *[_type == "package" && defined(slug.current)]{
      _id, "id": slug.current, title, title_en, country, country_en, countries,
      countries_en, priceInfo, priceInfo_en, shortDescription, shortDescription_en, image
    },
    "posts": *[_type == "post" && defined(slug.current)] | order(date desc){
      _id, slug, slug_en, title, title_en, content_en, excerpt, excerpt_en, coverImage
    }
  }`);
  return {
    packages: packages.filter((p) =>
      mentions(
        [
          p.title,
          p.title_en,
          ...getPackageCountries(p, false),
          ...getPackageCountries(p, true),
        ].join(" "),
        terms,
      ),
    ),
    posts: posts
      .filter((p) => (en ? hasEnglishPost(p) : true))
      .filter((p) => mentions(`${p.title} ${p.title_en || ""}`, terms))
      .map((p) => ({
        id: p._id,
        title: pickLang(p, "title", en),
        excerpt: pickLang(p, "excerpt", en),
        coverImage: p.coverImage,
        path: postPath(p, lang),
      })),
  };
}
