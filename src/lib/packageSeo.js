export function parseEuroPrice(value) {
  const match = String(value || "").match(/\d[\d.,\s]*\d|\d/);
  if (!match) return null;
  let number = match[0].replace(/\s/g, "");
  if (number.includes(",") && number.includes(".")) {
    number =
      number.lastIndexOf(",") > number.lastIndexOf(".")
        ? number.replace(/\./g, "").replace(",", ".")
        : number.replace(/,/g, "");
  } else if (/^[0-9]{1,3}([.,][0-9]{3})+$/.test(number)) {
    number = number.replace(/[.,]/g, "");
  } else {
    number = number.replace(",", ".");
  }
  const result = Number(number);
  return Number.isFinite(result) && result > 0 ? result : null;
}

const BRAND = "SaltySoulTrips";

// Cut text at a word boundary so Google does not truncate it mid-word.
export function clampText(text, max) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:\-–—]+$/, "")}…`;
}

const normalize = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

function buildTitle(cmsTitle, title, en) {
  // Use the CMS title only when it adds information beyond the package name
  // (e.g. "Japón Semana Santa 2027: 13 días"); otherwise keep the
  // keyword-bearing template ("Viaje a Japón + Bali").
  const cmsCore = String(cmsTitle || "").replace(/\s*\|\s*SaltySoulTrips\s*$/i, "").trim();
  if (cmsCore && normalize(cmsCore) !== normalize(title)) {
    const full = `${cmsCore} | ${BRAND}`;
    return full.length <= 65 ? full : clampText(cmsCore, 65);
  }
  const templated = `${en ? "Trip to" : "Viaje a"} ${title} | ${BRAND}`;
  if (templated.length <= 65) return templated;
  const short = `${title} | ${BRAND}`;
  return short.length <= 65 ? short : clampText(title, 65);
}

export function packageSeo(pkg, language = "es") {
  const en = language === "en";
  const title = en && pkg.title_en ? pkg.title_en : pkg.title;
  const displayPrice = (en && pkg.priceInfo_en ? pkg.priceInfo_en : pkg.priceInfo) || "";
  const price =
    typeof pkg.priceAmount === "number" && pkg.priceAmount > 0
      ? pkg.priceAmount
      : parseEuroPrice(pkg.priceInfo);
  const pricePart = displayPrice
    ? ` ${displayPrice.charAt(0).toUpperCase()}${displayPrice.slice(1).replace(/\.\s*$/, "")}.`
    : "";
  // Descriptions are built from the visible price only: the CMS seoDescription
  // fields contain stale prices/durations and are not used until reviewed.
  // Do not infer duration or inclusions from free-text itineraries.
  const description = clampText(
    en
      ? `Trip to ${title}.${pricePart} Tailor-made proposal with dates, availability and what's included. Free quote.`
      : `Viaje a ${title}.${pricePart} Propuesta a medida con fechas, disponibilidad y qué incluye. Presupuesto gratis.`,
    158,
  );
  // Some seoTitle_en values were left in Spanish: ignore them.
  const cmsTitle = en
    ? pkg.seoTitle_en && pkg.seoTitle_en !== pkg.seoTitle
      ? pkg.seoTitle_en
      : ""
    : pkg.seoTitle;
  return {
    title: buildTitle(cmsTitle, title, en),
    description,
    price,
  };
}
