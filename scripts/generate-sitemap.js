import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ID = 'wzn5s2a9';
const DATASET = 'production';
const API_VERSION = '2024-02-18';
const BASE_URL = 'https://www.saltysoultrips.com';

const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

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
  
  // Static routes map (es -> en) with priority and changefreq
  const staticRoutes = [
    { es: '/',             en: '/',              priority: '1.0', changefreq: 'weekly'  },
    { es: '/paquetes',     en: '/packages',      priority: '0.9', changefreq: 'weekly'  },
    { es: '/servicios',    en: '/services',      priority: '0.8', changefreq: 'monthly' },
    { es: '/contacto',     en: '/contact',       priority: '0.7', changefreq: 'monthly' },
    { es: '/experiencias', en: '/experiences',   priority: '0.7', changefreq: 'monthly' },
    { es: '/descuentos',   en: '/discounts',     priority: '0.6', changefreq: 'monthly' },
    { es: '/blog',         en: '/blog',          priority: '0.8', changefreq: 'weekly'  },
  ];

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  // Helper to add URL to sitemap with hreflang, lastmod, priority
  const addUrl = (esPath, enPath, lastmod = today, priority = '0.7', changefreq = 'monthly') => {
    sitemapXml += `  <url>\n`;
    sitemapXml += `    <loc>${BASE_URL}${esPath}</loc>\n`;
    sitemapXml += `    <lastmod>${lastmod}</lastmod>\n`;
    sitemapXml += `    <changefreq>${changefreq}</changefreq>\n`;
    sitemapXml += `    <priority>${priority}</priority>\n`;
    sitemapXml += `    <xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}${esPath}"/>\n`;
    sitemapXml += `    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${enPath}"/>\n`;
    sitemapXml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${esPath}"/>\n`;
    sitemapXml += `  </url>\n`;
    
    // If EN path is different, add an entry for it too
    if (esPath !== enPath) {
      sitemapXml += `  <url>\n`;
      sitemapXml += `    <loc>${BASE_URL}${enPath}</loc>\n`;
      sitemapXml += `    <lastmod>${lastmod}</lastmod>\n`;
      sitemapXml += `    <changefreq>${changefreq}</changefreq>\n`;
      sitemapXml += `    <priority>${priority}</priority>\n`;
      sitemapXml += `    <xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}${esPath}"/>\n`;
      sitemapXml += `    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${enPath}"/>\n`;
      sitemapXml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${esPath}"/>\n`;
      sitemapXml += `  </url>\n`;
    }
  };

  // 1. Add Static Routes
  for (const route of staticRoutes) {
    addUrl(route.es, route.en, today, route.priority, route.changefreq);
  }

  // 2. Add Packages (from local data)
  const { packagesData } = await import('../src/data/packagesData.js');
  if (packagesData) {
    packagesData.forEach(pkg => {
      if (pkg.id) {
        const esPath = `/paquetes/${pkg.id}`;
        const enPath = `/packages/${pkg.id}`;
        addUrl(esPath, enPath, today, '0.8', 'monthly');
      }
    });
  }

  // 3. Fetch and add Blog Posts (with _updatedAt for lastmod)
  const posts = await fetchSanityData('*[_type == "post"]{slug, slug_en, _updatedAt}');
  if (posts) {
    posts.forEach(post => {
      if (post.slug?.current) {
        const esPath = `/blog/${post.slug.current}`;
        const enPath = `/blog/${post.slug_en?.current || post.slug.current}`;
        const lastmod = post._updatedAt ? post._updatedAt.split('T')[0] : today;
        addUrl(esPath, enPath, lastmod, '0.7', 'monthly');
      }
    });
  }

  sitemapXml += `</urlset>`;

  fs.writeFileSync(sitemapPath, sitemapXml);
  const totalEntries = staticRoutes.length + (packagesData?.length || 0) + (posts?.length || 0);
  console.log(`Sitemap generated successfully with ${totalEntries} main entries.`);
}

generateSitemap();
