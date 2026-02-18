import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import destinations data
// Note: We need to import the data file. Since it's a module, allow importing it.
// If direct import fails due to environment, we might need a workaround,
// but for now we try standard import assuming Node 18+ and "type": "module" in package.json
import { destinationsData } from "../src/data/destinationsData.js";

const SITEMAP_PATH = path.join(__dirname, "../public/sitemap.xml");
const DOMAIN = "https://www.saltysoultrips.com";

const staticRoutes = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/blog", changefreq: "weekly", priority: 0.8 },
  // Add other static routes if they exist and are important
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Routes -->
${staticRoutes
  .map(
    (route) => `  <url>
    <loc>${DOMAIN}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}

  <!-- Dynamic Destination Routes -->
${destinationsData
  .map(
    (dest) => `  <url>
    <loc>${DOMAIN}/destinos/${dest.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, xml);
  console.log(`✅ Sitemap created at ${SITEMAP_PATH}`);
}

generateSitemap();
