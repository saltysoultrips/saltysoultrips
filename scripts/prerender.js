import { publicCmsResponse } from "./cms-render-data.mjs";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";
import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
const dist = path.resolve("dist");
const shell = fs.readFileSync(path.join(dist, "index.html"));
const { routes, base } = JSON.parse(
  fs.readFileSync(".cache/seo-routes.json", "utf8"),
);
const mime = {
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webmanifest": "application/manifest+json",
};
const server = createServer((req, res) => {
  const pathname = decodeURIComponent(
    new URL(req.url, "http://localhost").pathname,
  );
  const file = path.resolve(dist, "." + pathname);
  if (!file.startsWith(dist + path.sep) && file !== dist) {
    res.writeHead(403);
    return res.end();
  }
  if (fs.existsSync(file) && fs.statSync(file).isFile()) {
    res.writeHead(200, {
      "Content-Type": mime[path.extname(file)] || "text/html",
    });
    res.end(fs.readFileSync(file));
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(shell);
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
let browser;
try {
  browser = await puppeteer.launch(
    process.env.VERCEL
      ? {
          args: chromium.args,
          executablePath: await chromium.executablePath(),
          headless: true,
        }
      : { headless: true },
  );
  for (const route of process.env.PRERENDER_ROUTES
    ? process.env.PRERENDER_ROUTES.split(",")
    : [...routes, "/404"]) {
    const page = await browser.newPage();
    try {
      const cmsErrors = [];
      await page.setRequestInterception(true);
      page.on("request", async (req) => {
        try {
          const data = await publicCmsResponse(req.url());
          if (data) await req.respond(data);
          else await req.continue();
        } catch (error) {
          cmsErrors.push(error.message);
          await req.abort();
        }
      });
      page.on("pageerror", (error) =>
        console.error(`${route}: ${error.message}`),
      );
      page.on("console", (msg) => {
        if (msg.type() === "error") console.error(route, msg.text());
      });
      await page.evaluateOnNewDocument(() => {
        window.__PRERENDER__ = true;
      });
      await page.goto(`http://127.0.0.1:${server.address().port}${route}`, {
        waitUntil: "networkidle0",
        timeout: 45000,
      });
      await page.waitForFunction(
        (expected) =>
          document.querySelector('link[rel="canonical"]')?.href === expected &&
          document.querySelector("#root h1") &&
          !document.querySelector('[data-loading="true"]'),
        { timeout: 20000 },
        base + route,
      );
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 35));
        }
        window.scrollTo(0, 0);
      });
      await new Promise((r) => setTimeout(r, 400));
      if (cmsErrors.length) throw new Error(cmsErrors.join("; "));
      const html = await page.content();
      const file =
        route === "/404"
          ? path.join(dist, "404.html")
          : path.join(dist, route, "index.html");
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, html);
      console.log(`Rendered ${route}`);
    } catch (error) {
      console.error(
        "Failed route:",
        route,
        await page.evaluate(() => ({
          url: location.href,
          title: document.title,
          canonical: document.querySelector("link[rel=canonical]")?.href,
          text: document.querySelector("#root")?.innerText.slice(0, 400),
        })),
      );
      throw error;
    } finally {
      await page.close();
    }
  }
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
