import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@sanity/client";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITEMAP_PATH = path.join(__dirname, "../public/sitemap.xml");
const DOMAIN = "https://www.saltysoultrips.com";

// Sanity Client Setup
// We use a public read-only token or just projectId/dataset for public data
const client = createClient({
  projectId: "wzn5s2a9",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-02-18",
});

const staticRoutes = [
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/blog", changefreq: "weekly", priority: 0.8 },
];

async function generateSitemap() {
  console.log("🗺️  Generating Sitemap...");
  const currentDate = new Date().toISOString().split("T")[0];

  let destinations = [];

  try {
    // Fetch slugs from Sanity
    console.log("🔌 Fetching destinations from Sanity...");
    const query = '*[_type == "destination"]{ "slug": slug.current }';
    destinations = await client.fetch(query);
    console.log(`✅ Found ${destinations.length} destinations in Sanity.`);
  } catch (error) {
    console.error("❌ Error fetching from Sanity:", error.message);

    try {
      console.log("⚠️  Falling back to local data...");
      // Dynamic import to avoid issues if file is missing in future
      const { destinationsData } =
        await import("../src/data/destinationsData.js");
      destinations = destinationsData;
    } catch (localError) {
      console.error("❌ Could not load local data either.");
      destinations = [];
    }
  }

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
${destinations
  .filter((d) => d.slug) // Ensure slug exists
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
  console.log(`✅ Sitemap created successfully at ${SITEMAP_PATH}`);
}

generateSitemap();
