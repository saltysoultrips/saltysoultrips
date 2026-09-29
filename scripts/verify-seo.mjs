import { publicCmsResponse } from "./cms-render-data.mjs";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";
import { previewServer } from "./preview-seo.mjs";
import { languageForPath } from "../src/lib/routes.js";
const { routes, base } = JSON.parse(fs.readFileSync(".cache/seo-routes.json"));
for (const route of routes) {
  const html = fs.readFileSync(path.join("dist", route, "index.html"), "utf8");
  const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)];
  assert.equal(canonicals.length, 1, route + " canonical count");
  assert.ok(
    canonicals[0][0].includes(`href="${base + route}"`),
    route + " canonical",
  );
  assert.ok(
    html.includes(`lang="${languageForPath(route)}"`),
    route + " language",
  );
  const root = html.split("<noscript>")[0];
  assert.equal((root.match(/<h1\b/g) || []).length, 1, route + " h1 count");
  assert.ok(
    !/<meta[^>]*name="robots"[^>]*content="noindex/.test(html),
    route + " indexable",
  );
  assert.ok(
    !html.includes("googletagmanager.com/gtag/js"),
    route + " no analytics before consent",
  );
  for (const [, json] of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/g,
  )) {
    const schema = JSON.parse(json);
    if (schema.offers)
      assert.ok(
        typeof schema.offers.price === "number" && schema.offers.price > 10,
        route + " price",
      );
  }
}
console.log(
  `Static HTML verified: ${routes.length} pages, canonical, language, heading, robots and prices.`,
);
const { server, url } = await previewServer();
let browser;
try {
  for (const route of ["/destinos", "/destinos/japon", "/destinations/japan", "/servicios", "/services", "/como-funciona"]) {
    const r = await fetch(url + route);
    assert.equal(r.status, 410);
    assert.match(await r.text(), /noindex/);
  }
  assert.equal((await fetch(url + "/missing-page")).status, 404);
  assert.equal((await fetch(url + "/como-funciona")).status, 410);
  browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const outgoing = [];
  let webhookMode = "fail";
  let webhookCalls = 0;
  await page.setRequestInterception(true);
  page.on("request", async (req) => {
    const u = req.url();
    outgoing.push(u);
    if (u.includes("hook.eu1.make.com")) {
      if(req.method()==='OPTIONS')return req.respond({status:204,headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}});
      webhookCalls++;
      return req.respond({
        status: webhookMode === "fail" ? 500 : 200,
        contentType: "text/plain",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: webhookMode === "fail" ? "Error" : "Accepted",
      });
    }
    if (/googletagmanager|google-analytics|awin1.com\/cshow/.test(u))
      return req.respond({
        status: 200,
        contentType: "application/javascript",
        body: "",
      });
    try {
      const cms = await publicCmsResponse(u);
      if (cms) return req.respond(cms);
    } catch {
      return req.abort();
    }
    req.continue();
  });
  await page.goto(url + "/packages/disneyland-paris", {
    waitUntil: "networkidle0",
  });
  await page.waitForFunction(
    () =>
      document.documentElement.lang === "en" &&
      document.querySelector("h1")?.textContent.includes("Disney"),
  );
  assert.ok((await page.title()).startsWith("Trip to"));
  assert.equal(
    await page.$eval("link[rel=canonical]", (el) => el.href),
    base + "/packages/disneyland-paris",
  );
  assert.equal(
    outgoing.filter((u) => /googletagmanager|google-analytics/.test(u)).length,
    0,
  );
  await page.evaluate(() => {
    [...document.querySelectorAll("button")]
      .find((b) => b.textContent.trim() === "Reject non-essential")
      ?.click();
  });
  await page.goto(url + "/paquetes", { waitUntil: "networkidle0" });
  const packageLinks = await page.$$eval('main a[href^="/paquetes/"]', (a) =>
    a.map((x) => x.getAttribute("href")),
  );
  assert.equal(new Set(packageLinks).size, 20);
  await page.goto(
    url + "/contacto?package=disneyland-paris&destination=Disneyland%20Paris",
    { waitUntil: "networkidle0" },
  );
  await page.waitForSelector("input[name=destination]");
  assert.equal(
    await page.$eval("input[name=destination]", (e) => e.value),
    "Disneyland Paris",
  );
  await page.evaluate(() => {
    [...document.querySelectorAll("button")]
      .find((b) => b.textContent.trim() === "Rechazar no esenciales")
      ?.click();
  });
  for (const [name, value] of Object.entries({
    name: "Prueba local SEO",
    email: "test@example.com",
    phone: "600000000",
    origin: "Barcelona",
    budget: "2000",
  }))
    await page.type(`[name="${name}"]`, value);
  const dateFields = await page.$$eval("input[type=date]", (els) =>
    els.map((e) => e.name),
  );
  for (const [i, name] of dateFields.entries())
    await page.$eval(
      `[name="${name}"]`,
      (el, v) => {
        const setter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value",
        ).set;
        setter.call(el, v);
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      },
      i ? "2027-02-15" : "2027-02-01",
    );
  await page.select(
    "[name=tripType]",
    await page.$eval(
      "[name=tripType]",
      (el) => [...el.options].find((o) => o.value)?.value,
    ),
  );
  await page.click("[name=privacyPolicy]");
  await page.click("button[type=submit]");
  await page.waitForSelector("[role=alert]", { timeout: 8000 });
  assert.equal(webhookCalls, 1);
  assert.equal(
    await page.$eval("[name=email]", (el) => el.value),
    "test@example.com",
  );
  webhookMode = "success";
  await page.click("button[type=submit]");
  await page.waitForFunction(() => !document.querySelector("form"));
  assert.equal(webhookCalls, 2);
  assert.equal(
    outgoing.filter((u) => /googletagmanager|google-analytics/.test(u)).length,
    0,
  );
  await page.evaluate(() =>
    window.dispatchEvent(new Event("open-cookie-settings")),
  );
  await page.evaluate((label) => {
    [...document.querySelectorAll('div')].find(el=>el.textContent.trim()===label)?.closest('.cursor-pointer')?.click();
  },JSON.parse(fs.readFileSync('src/locales/es.json')).cookies.analytics);
  await page.evaluate((label)=>{[...document.querySelectorAll('button')].find(b=>b.textContent.trim()===label)?.click();},JSON.parse(fs.readFileSync('src/locales/es.json')).cookies.save);
  await page.waitForFunction(() => typeof window.gtag === "function");
  assert.ok(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("saltysoultrips_cookie_consent"))
          .analytics,
    ),
  );
  await page.goto(url + "/en", { waitUntil: "networkidle0" });
  assert.equal(await page.$eval("html", (e) => e.lang), "en");
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  fs.mkdirSync("audit-seo/after", { recursive: true });
  await page.screenshot({
    path: "audit-seo/after/home-mobile.png",
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  console.log(
    "Browser checks passed: English entry, catalogue links, prefilled destination, mocked failed/successful submissions, consent, 410/404/301 routing and mobile overflow. No real forms sent.",
  );
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
