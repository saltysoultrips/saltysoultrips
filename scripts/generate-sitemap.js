import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ID = 'wzn5s2a9';
const DATASET = 'production';
const API_VERSION = '2024-02-18';
const BASE_URL = 'https://www.saltysoultrips.com';

async function fetchSanityData(query) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json.result;
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    return [];
  }
}

async function generateSitemap() {
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  
  // Static routes map (es -> en)
  const staticRoutes = {
    '/': '/',
    '/servicios': '/services',
    '/descuentos': '/discounts',
    '/contacto': '/contact',
    '/destinos': '/destinations',
    '/como-funciona': '/how-it-works',
    '/experiencias': '/experiences',
    '/blog': '/blog'
  };

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  // Helper to add URL to sitemap with hreflang
  const addUrl = (esPath, enPath) => {
    sitemapXml += `  <url>\n`;
    sitemapXml += `    <loc>${BASE_URL}${esPath}</loc>\n`;
    sitemapXml += `    <xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}${esPath}"/>\n`;
    sitemapXml += `    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${enPath}"/>\n`;
    sitemapXml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${esPath}"/>\n`;
    sitemapXml += `  </url>\n`;
    
    // If EN path is different, add an entry for it too
    if (esPath !== enPath) {
      sitemapXml += `  <url>\n`;
      sitemapXml += `    <loc>${BASE_URL}${enPath}</loc>\n`;
      sitemapXml += `    <xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}${esPath}"/>\n`;
      sitemapXml += `    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${enPath}"/>\n`;
      sitemapXml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${esPath}"/>\n`;
      sitemapXml += `  </url>\n`;
    }
  };

  // 1. Add Static Routes
  for (const [esPath, enPath] of Object.entries(staticRoutes)) {
    addUrl(esPath, enPath);
  }

  // 2. Fetch and add Destinations
  const destinations = await fetchSanityData('*[_type == "destination"]{slug, slug_en}');
  if (destinations) {
    destinations.forEach(dest => {
      if (dest.slug?.current) {
        const esPath = `/destinos/${dest.slug.current}`;
        const enPath = `/destinations/${dest.slug_en?.current || dest.slug.current}`;
        addUrl(esPath, enPath);
      }
    });
  }

  // 3. Fetch and add Blog Posts
  const posts = await fetchSanityData('*[_type == "post"]{slug, slug_en}');
  if (posts) {
    posts.forEach(post => {
      if (post.slug?.current) {
        const esPath = `/blog/${post.slug.current}`;
        const enPath = `/blog/${post.slug_en?.current || post.slug.current}`;
        addUrl(esPath, enPath);
      }
    });
  }

  sitemapXml += `</urlset>`;

  fs.writeFileSync(sitemapPath, sitemapXml);
  console.log(`Sitemap generated successfully with ${Object.keys(staticRoutes).length + (destinations?.length || 0) + (posts?.length || 0)} main entries.`);
}

generateSitemap();
