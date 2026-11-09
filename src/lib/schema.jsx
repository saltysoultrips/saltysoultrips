import { Link } from "react-router-dom";

export const SITE = "https://www.saltysoultrips.com";
export const ORG_ID = `${SITE}/#organization`;

export const AUTHOR = {
  "@type": "Person",
  "@id": `${SITE}/#angela`,
  name: "Ángela",
  jobTitle: "Diseñadora de viajes",
  worksFor: { "@id": ORG_ID },
  url: SITE,
  sameAs: [
    "https://www.instagram.com/saltysoultrips/",
    "https://www.tiktok.com/@saltysoultrips",
  ],
};

export function organizationSchema(language = "es") {
  const en = language === "en";
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": ORG_ID,
    name: "SaltySoulTrips",
    url: SITE,
    logo: `${SITE}/resto/logo.png`,
    image: `${SITE}/resto/logoGoogle.png`,
    description: en
      ? "Tailor-made trips designed around you: personalised itineraries, accommodation and activities to any destination."
      : "Viajes a medida diseñados para ti: itinerarios personalizados, alojamientos y actividades a cualquier destino.",
    email: "saltysoultrips@gmail.com",
    telephone: "+34611794842",
    priceRange: "$$",
    knowsLanguage: ["es", "en"],
    founder: { "@id": AUTHOR["@id"], "@type": "Person", name: AUTHOR.name },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "saltysoultrips@gmail.com",
      telephone: "+34611794842",
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: AUTHOR.sameAs,
  };
}

export function websiteSchema(language = "es") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    name: "SaltySoulTrips",
    url: SITE,
    inLanguage: language === "en" ? "en" : "es",
    publisher: { "@id": ORG_ID },
  };
}

/** items: [{ name, path }] — the last item is the current page. */
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  };
}

export function homeCrumb(language) {
  return language === "en"
    ? { name: "Home", path: "/en" }
    : { name: "Inicio", path: "/" };
}

/** Visible breadcrumb trail matching breadcrumbSchema(items). */
export function Breadcrumbs({ items, className = "" }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm text-brand-dark/60 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-brand-dark/80 line-clamp-1">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link to={item.path} className="hover:text-brand-dark underline-offset-4 hover:underline">
                    {item.name}
                  </Link>
                  <span aria-hidden="true">›</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
