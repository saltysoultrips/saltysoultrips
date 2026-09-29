import assert from "node:assert/strict";
import { parseEuroPrice, packageSeo } from "../src/lib/packageSeo.js";
import {
  languageForPath,
  translatedPath,
  postPath,
  hasEnglishPost,
} from "../src/lib/routes.js";
for (const [input, expected] of [
  ["Desde 1.847,50€ / pers.", 1847.5],
  ["3.999€ total (5 pers)", 3999],
  ["Desde 4.800€", 4800],
  ["From 1,847.50 EUR", 1847.5],
  ["879,22€", 879.22],
  ["3.000 €", 3000],
  ["Consultar", null],
  ["0 €", null],
])
  assert.equal(parseEuroPrice(input), expected, input);
assert.equal(languageForPath("/packages/disneyland-paris"), "en");
assert.equal(languageForPath("/paquetes/disneyland-paris"), "es");
assert.equal(languageForPath("/en/blog/test"), "en");
assert.equal(translatedPath("/", "en"), "/en");
assert.equal(
  translatedPath("/packages/disneyland-paris", "es"),
  "/paquetes/disneyland-paris",
);
assert.equal(translatedPath("/blog/test", "en"), "/en/blog/test");
const p = { slug: { current: "test" }, title_en: "Test", content_en: [{}] };
assert.equal(postPath(p, "en"), "/en/blog/test");
assert.ok(hasEnglishPost(p));
assert.equal(postPath({ ...p, content_en: [] }, "en"), "/blog/test");
const seo = packageSeo({
  title: "Laponia",
  priceInfo: "3.999€ total (5 pers)",
  seoDescription: "3999 por persona",
  longDescription: "4 noches",
});
assert.equal(seo.price, 3999);
assert.match(seo.description, /total \(5 pers\)/);
assert.ok(!seo.description.includes("por persona"));
assert.ok(!seo.description.includes("noches"));
console.log(
  "SEO checks passed: prices, price basis, language routes and translation availability.",
);
