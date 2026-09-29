export const BASE_URL = "https://www.saltysoultrips.com";
export const staticPairs = [
  ["/", "/en"],
  ["/paquetes", "/packages"],
  ["/contacto", "/contact"],
  ["/experiencias", "/experiences"],
  ["/descuentos", "/discounts"],
  ["/blog", "/en/blog"],
];
export function languageForPath(path) {
  return /^\/(en|packages|contact|experiences|discounts)(\/|$)/.test(
    path,
  )
    ? "en"
    : "es";
}
export function translatedPath(path, language) {
  const normalized = path.replace(/\/$/, "") || "/";
  const pair = staticPairs.find((p) => p.includes(normalized));
  if (pair) return pair[language === "en" ? 1 : 0];
  if (/^\/(packages|paquetes)\//.test(path))
    return path.replace(
      /^\/(packages|paquetes)/,
      language === "en" ? "/packages" : "/paquetes",
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
