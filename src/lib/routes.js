export const BASE_URL = "https://www.saltysoultrips.com";
export const staticPairs = [
  ["/", "/en"],
  ["/paquetes", "/packages"],
  ["/contacto", "/contact"],
  ["/experiencias", "/experiences"],
  ["/descuentos", "/discounts"],
  ["/blog", "/en/blog"],
];
// Listing pages that only exist when at least one destination is published.
export const destinationListPair = ["/destinos", "/destinations"];
export function languageForPath(path) {
  return /^\/(en|packages|contact|experiences|discounts|destinations)(\/|$)/.test(
    path,
  )
    ? "en"
    : "es";
}
export function translatedPath(path, language) {
  const normalized = path.replace(/\/$/, "") || "/";
  const pair = [...staticPairs, destinationListPair].find((p) =>
    p.includes(normalized),
  );
  if (pair) return pair[language === "en" ? 1 : 0];
  if (/^\/(packages|paquetes)\//.test(path))
    return path.replace(
      /^\/(packages|paquetes)/,
      language === "en" ? "/packages" : "/paquetes",
    );
  // Destination slugs differ per language: DestinationPage resolves either
  // slug and redirects to the canonical one.
  if (/^\/(destinos|destinations)\//.test(path))
    return path.replace(
      /^\/(destinos|destinations)/,
      language === "en" ? "/destinations" : "/destinos",
    );
  if (/^\/(en\/)?blog\//.test(path))
    return path.replace(
      /^\/(en\/)?blog/,
      language === "en" ? "/en/blog" : "/blog",
    );
  return language === "en" ? "/en" : "/";
}
export const hasEnglishPost = (post) =>
  Boolean(post.title_en?.trim() && post.content_en?.length);
export const englishPostSlug = (post) => (post.slug_en?.current || post.slug.current)
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const postPath = (post, language) => {
  const english = language === "en" && hasEnglishPost(post);
  const slug = english ? englishPostSlug(post) : post.slug.current;
  return `${english ? "/en" : ""}/blog/${slug}`;
};
export function postRedirects(posts) {
  return posts.filter(hasEnglishPost).flatMap((post) => {
    const target = postPath(post, "en");
    return [...new Set([
      `/en/blog/${post.slug.current}`,
      post.slug_en?.current && /^[a-z0-9-]+$/.test(post.slug_en.current) && post.slug_en.current !== post.slug.current
        ? `/blog/${post.slug_en.current}` : null,
    ])].filter((source) => source && source !== target)
      .map((source) => ({ source, target }));
  });
}

// ---- Destinations -------------------------------------------------------
const filled = (v) =>
  Array.isArray(v)
    ? v.some((x) => String(x || "").trim())
    : Boolean(String(v || "").trim());
export const isLiveDestination = (d) =>
  Boolean(d?.showOnWeb && d.slug?.current && filled(d.name) && filled(d.intro));
export const hasEnglishDestination = (d) =>
  isLiveDestination(d) && filled(d.name_en) && filled(d.intro_en) && filled(d.about_en);
export const englishDestinationSlug = (d) =>
  (d.slug_en?.current || d.slug.current)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const destinationPath = (d, language) =>
  language === "en" && hasEnglishDestination(d)
    ? `/destinations/${englishDestinationSlug(d)}`
    : `/destinos/${d.slug.current}`;
