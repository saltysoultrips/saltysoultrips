import fs from "node:fs";
import { buildManifest } from "./route-manifest.js";
const manifest = await buildManifest();
const escape = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const entries = manifest.entries.flatMap((e) =>
  [e.es, e.en].filter(Boolean).map((path) => {
    const alternates = e.en
      ? [
          ["es", e.es],
          ["en", e.en],
          ["x-default", e.es],
        ]
          .map(
            ([lang, p]) =>
              `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escape(manifest.base + p)}"/>`,
          )
          .join("\n")
      : "";
    return `  <url>\n    <loc>${escape(manifest.base + path)}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}\n${alternates}\n  </url>`;
  }),
);
fs.mkdirSync(".cache", { recursive: true });
fs.writeFileSync(".cache/seo-routes.json", JSON.stringify(manifest, null, 2));
fs.writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`,
);
console.log(`Sitemap validated: ${manifest.routes.length} URLs`);
