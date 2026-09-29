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
export const postPath = (post, language) =>
  `${language === "en" && hasEnglishPost(post) ? "/en" : ""}/blog/${post.slug.current}`;
