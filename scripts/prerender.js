// Skip pre-rendering on Vercel (Puppeteer can't run there)
if (process.env.VERCEL) {
  console.log("⏭️  Skipping pre-rendering on Vercel (CI environment)");
  process.exit(0);
}

import puppeteer from "puppeteer";
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@sanity/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIST_DIR = join(__dirname, "../dist");

// Sanity client for fetching destination slugs
const sanityClient = createClient({
  projectId: "wzn5s2a9",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-02-18",
});

// Blog post slugs (from local data)
const blogSlugs = [
  "mejor-epoca-viajar-japon",
  "consejos-viaje-maldivas-barato",
  "imprescindibles-tanzania-safari",
];

// Simple static file server for the dist directory
function startServer(port) {
  return new Promise((resolve) => {
    const mimeTypes = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".woff2": "font/woff2",
      ".woff": "font/woff",
      ".webmanifest": "application/manifest+json",
    };

    const server = createServer((req, res) => {
      let filePath = join(DIST_DIR, req.url === "/" ? "/index.html" : req.url);
      const ext = filePath.match(/\.[^.]+$/)?.[0] || "";

      // For SPA: if file doesn't exist and no extension, serve index.html
      if (!existsSync(filePath) || (!ext && !existsSync(filePath))) {
        filePath = join(DIST_DIR, "index.html");
      }

      try {
        const content = readFileSync(filePath);
        const contentType = mimeTypes[ext] || "text/html";
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      } catch {
        // Fallback to index.html for SPA routing
        try {
          const content = readFileSync(join(DIST_DIR, "index.html"));
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content);
        } catch {
          res.writeHead(404);
          res.end("Not Found");
        }
      }
    });

    server.listen(port, () => {
      console.log(`📡 Preview server running on http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function getRoutes() {
  const routes = ["/", "/blog"];

  // Add blog posts
  for (const slug of blogSlugs) {
    routes.push(`/blog/${slug}`);
  }

  // Fetch destination slugs from Sanity
  try {
    console.log("🔌 Fetching destination slugs from Sanity...");
    const query = '*[_type == "destination"]{ "slug": slug.current }';
    const destinations = await sanityClient.fetch(query);
    console.log(`✅ Found ${destinations.length} destinations`);

    for (const dest of destinations) {
      if (dest.slug) {
        routes.push(`/destinos/${dest.slug}`);
      }
    }
  } catch (error) {
    console.error("❌ Error fetching destinations from Sanity:", error.message);
  }

  return routes;
}

async function prerender() {
  console.log("🚀 Starting pre-rendering...\n");

  // 1. Start local server
  const PORT = 4173;
  const server = await startServer(PORT);

  // 2. Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
    ],
  });

  // 3. Get all routes to pre-render
  const routes = await getRoutes();
  console.log(`\n📋 Pre-rendering ${routes.length} routes:\n`);

  let success = 0;
  let failed = 0;

  for (const route of routes) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;

    // Capture browser console errors for debugging
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });
    page.on("requestfailed", (req) => {
      consoleErrors.push(
        `REQUEST FAILED: ${req.url()} - ${req.failure()?.errorText}`,
      );
    });

    try {
      // Navigate and wait for React to render
      await page.goto(url, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // Wait for actual meaningful content to render (h1 tag appears after data loads)
      // This is critical for destination pages that fetch from Sanity
      await page.waitForFunction(
        () => {
          const root = document.querySelector("#root");
          const h1 = root?.querySelector("h1");
          return h1 && h1.textContent.trim().length > 0;
        },
        { timeout: 15000 },
      );

      // Wait for react-helmet-async to update the <head> meta tags
      await page
        .waitForFunction(
          (defaultTitle) => {
            const title = document.title;
            // For the homepage, the default title IS the correct title
            if (window.location.pathname === "/") return true;
            // For other pages, wait until title changes from default
            return title !== defaultTitle;
          },
          { timeout: 10000 },
          "Viajes Personalizados a Medida | SaltySoulTrips - Itinerarios Únicos",
        )
        .catch(() => {
          // If title doesn't change in time, continue anyway (content is still pre-rendered)
          console.log(`     ⚠️  Title may not have updated for ${route}`);
        });

      // Small extra delay for any remaining async updates
      await new Promise((r) => setTimeout(r, 800));

      // Get the full rendered HTML
      const html = await page.content();

      // Determine the output file path
      let outputPath;
      if (route === "/") {
        outputPath = join(DIST_DIR, "index.html");
      } else {
        outputPath = join(DIST_DIR, route, "index.html");
      }

      // Create directory if it doesn't exist
      const dir = dirname(outputPath);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      // Write the pre-rendered HTML
      writeFileSync(outputPath, html);

      // Verify the title was set correctly
      const title = await page.title();
      console.log(`  ✅ ${route}`);
      console.log(`     → title: "${title}"`);
      if (consoleErrors.length > 0) {
        console.log(`     ⚠️  Console errors:`);
        consoleErrors.forEach((e) => console.log(`        - ${e}`));
      }
      success++;
    } catch (error) {
      console.error(`  ❌ ${route} — ${error.message}`);
      failed++;
    } finally {
      await page.close();
    }
  }

  // 4. Cleanup
  await browser.close();
  server.close();

  console.log(`\n${"=".repeat(50)}`);
  console.log(`📊 Pre-rendering complete!`);
  console.log(`   ✅ Success: ${success}/${routes.length}`);
  if (failed > 0) {
    console.log(`   ❌ Failed:  ${failed}/${routes.length}`);
  }
  console.log(`${"=".repeat(50)}\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

prerender().catch((error) => {
  console.error("❌ Pre-rendering failed:", error);
  process.exit(1);
});
