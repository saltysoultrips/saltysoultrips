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
export function packageSeo(pkg, language = "es") {
  const en = language === "en";
  const title = en && pkg.title_en ? pkg.title_en : pkg.title;
  const displayPrice =
    en && pkg.priceInfo_en ? pkg.priceInfo_en : pkg.priceInfo;
  const price =
    typeof pkg.priceAmount === "number" && pkg.priceAmount > 0
      ? pkg.priceAmount
      : parseEuroPrice(pkg.priceInfo);
  // Do not infer duration or inclusions from free-text itineraries.
  const description = en
    ? `Plan your trip to ${title} with SaltySoulTrips. ${displayPrice || ""} Ask for a personalised quote and check dates, availability and what is included.`
    : `Organiza tu viaje a ${title} con SaltySoulTrips. ${displayPrice || ""} Solicita una propuesta a medida y consulta fechas, disponibilidad y qué incluye.`;
  return {
    title: en
      ? `Trip to ${title} | SaltySoulTrips`
      : `Viaje a ${title} | SaltySoulTrips`,
    description,
    price,
  };
}
