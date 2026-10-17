// Mapa de países por defecto para los paquetes existentes antes de asignarles el campo en Sanity
export const fallbackCountryMap = {
  "dubai-5-dias": { es: ["Emiratos Árabes"], en: ["United Arab Emirates"], continent: "asia" },
  "malaga-diciembre-2026": { es: ["España"], en: ["Spain"], continent: "europa" },
  "euskadi-8-dias": { es: ["España"], en: ["Spain"], continent: "europa" },
  "el-salvador-11-dias": { es: ["El Salvador"], en: ["El Salvador"], continent: "america" },
  "galicia-rias-baixas-8-dias": { es: ["España"], en: ["Spain"], continent: "europa" },
  "ruta-66-de-chicago-a-los-angeles": { es: ["Estados Unidos"], en: ["United States"], continent: "america" },
  "jordania-ven-y-vivelo-8-dias": { es: ["Jordania"], en: ["Jordan"], continent: "asia" },
  "polinesia-francesa-11-dias": { es: ["Polinesia Francesa"], en: ["French Polynesia"], continent: "oceania" },
  "argentina-imprescindible-12-dias": { es: ["Argentina"], en: ["Argentina"], continent: "america" },
  "vietnam-esencial-11-dias": { es: ["Vietnam"], en: ["Vietnam"], continent: "asia" },
  "sensaciones-de-india-12-dias": { es: ["India"], en: ["India"], continent: "asia" },
  "cataluna-7-dias": { es: ["España"], en: ["Spain"], continent: "europa" },
  "japon-semana-santa-2027": { es: ["Japón"], en: ["Japan"], continent: "asia" },
  "escapada-paris-7-dias-desde-madrid": { es: ["Francia"], en: ["France"], continent: "europa" },
  "valencia-barcelona-4-dias": { es: ["España"], en: ["Spain"], continent: "europa" },
  "vietnam-bali-14-dias": { es: ["Vietnam", "Indonesia"], en: ["Vietnam", "Indonesia"], continent: "asia" },
  "atenas-grecia-5-dias": { es: ["Grecia"], en: ["Greece"], continent: "europa" },
  "andalucia-7-dias-desde-canarias": { es: ["España"], en: ["Spain"], continent: "europa" },
  "colombia-esencial-12-dias": { es: ["Colombia"], en: ["Colombia"], continent: "america" },
  "riviera-mexicana-los-angeles-en-crucero": { es: ["México", "Estados Unidos"], en: ["Mexico", "United States"], continent: "america" },
  "brasil": { es: ["Brasil"], en: ["Brazil"], continent: "america" },
  "disneyland-paris": { es: ["Francia"], en: ["France"], continent: "europa" },
  "dubai-mauricio": { es: ["Emiratos Árabes", "Mauricio"], en: ["United Arab Emirates", "Mauritius"], continent: "africa" },
  "estambul": { es: ["Turquía"], en: ["Turkey"], continent: "europa" },
  "este-canadiense": { es: ["Canadá"], en: ["Canada"], continent: "america" },
  "estrasburgo-alsacia": { es: ["Francia"], en: ["France"], continent: "europa" },
  "india-triangulo": { es: ["India"], en: ["India"], continent: "asia" },
  "japon-bali": { es: ["Japón", "Indonesia"], en: ["Japan", "Indonesia"], continent: "asia" },
  "laponia-en-familia": { es: ["Finlandia"], en: ["Finland"], continent: "europa" },
  "madeira": { es: ["Portugal"], en: ["Portugal"], continent: "europa" },
  "nueva-york-maldivas": { es: ["Estados Unidos", "Maldivas"], en: ["United States", "Maldives"], continent: "america" },
  "nueva-york-navidad": { es: ["Estados Unidos"], en: ["United States"], continent: "america" },
  "new-york-and-disney": { es: ["Estados Unidos"], en: ["United States"], continent: "america" },
  "paris": { es: ["Francia"], en: ["France"], continent: "europa" },
  "praga": { es: ["República Checa"], en: ["Czech Republic"], continent: "europa" },
  "praga-viena": { es: ["República Checa", "Austria"], en: ["Czech Republic", "Austria"], continent: "europa" },
  "shanghai-magia-oriente": { es: ["China"], en: ["China"], continent: "asia" },
  "tanzania": { es: ["Tanzania"], en: ["Tanzania"], continent: "africa" }
};

export function getPackageCountries(pkg, isEn) {
  if (!pkg) return [];

  // Check array from Sanity (countries / countries_en)
  const list =
    isEn && pkg.countries_en && pkg.countries_en.length > 0
      ? pkg.countries_en
      : pkg.countries && pkg.countries.length > 0
        ? pkg.countries
        : null;

  if (list && Array.isArray(list)) {
    return list.map((c) => String(c).trim()).filter(Boolean);
  }

  // Check string from Sanity (country / country_en) - supports comma, slash, +, or &
  const str = isEn && pkg.country_en ? pkg.country_en : pkg.country;
  if (str && typeof str === "string") {
    return str
      .split(/[,/&+]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // Fallback map
  const slug = pkg.id || (pkg.slug && pkg.slug.current) || pkg.slug;
  const fallback = fallbackCountryMap[slug];
  if (fallback) {
    const raw = isEn ? fallback.en : fallback.es;
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "string") {
      return raw
        .split(/[,/&+]/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  return [];
}

export function getPackageCountry(pkg, isEn) {
  const countries = getPackageCountries(pkg, isEn);
  return countries.join(" · ");
}
