import {
  BASE_URL,
  staticPairs,
  hasEnglishPost,
  postPath,
  postRedirects,
} from "../src/lib/routes.js";
export async function buildManifest() {
  const query =
    '{"packages": *[_type == "package" && defined(slug.current)]{slug,title_en,longDescription_en,_updatedAt}, "posts": *[_type == "post" && defined(slug.current)]{slug,slug_en,title_en,content_en,_updatedAt}}';
  const response = await fetch(
    `https://wzn5s2a9.api.sanity.io/v2024-02-18/data/query/production?query=${encodeURIComponent(query)}`,
  );
  if (!response.ok) throw new Error(`CMS unavailable: ${response.status}`);
  const { result, error } = await response.json();
  if (error || !result?.packages || !result?.posts)
    throw new Error("Invalid CMS response: refusing incomplete sitemap");
  const entries = staticPairs.map(([es, en]) => ({ es, en }));
  for (const p of result.packages)
    entries.push({
      es: `/paquetes/${p.slug.current}`,
      en:
        p.title_en && p.longDescription_en
          ? `/packages/${p.slug.current}`
          : null,
      lastmod: p._updatedAt,
    });
  for (const p of result.posts)
    entries.push({
      es: postPath(p, "es"),
      en: hasEnglishPost(p) ? postPath(p, "en") : null,
      lastmod: p._updatedAt,
    });
  for (const e of entries)
    for (const route of [e.es, e.en].filter(Boolean)) {
      if (!/^\/[a-z0-9/-]*$/.test(route) || route.includes(".."))
        throw new Error(`Unsafe route: ${route}`);
    }
  return {
    entries,
    redirects: postRedirects(result.posts),
    routes: [...new Set(entries.flatMap((e) => [e.es, e.en].filter(Boolean)))],
    base: BASE_URL,
  };
}
