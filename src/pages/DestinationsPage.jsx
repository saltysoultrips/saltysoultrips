import React from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { continents } from "../data/constants";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SEOHead from "../components/SEOHead";
import { client, urlFor } from "../lib/sanity";
import {
  destinationPath,
  isLiveDestination,
  hasEnglishDestination,
} from "../lib/routes";
import { DESTINATION_FIELDS, pickLang, esPrep } from "../lib/destinations";
import { Breadcrumbs, breadcrumbSchema, homeCrumb, SITE } from "../lib/schema";

export default function DestinationsPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const en = lang === "en";
  const [destinations, setDestinations] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const continentParam = searchParams.get("continente") || searchParams.get("continent");

  React.useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "destination" && showOnWeb == true] | order(name asc){${DESTINATION_FIELDS}}`)
      .then((data) => active && setDestinations(data.filter(isLiveDestination)))
      .catch(() => active && setDestinations([]));
    return () => {
      active = false;
    };
  }, []);

  if (destinations === null)
    return (
      <div className="font-sans bg-sand-100 min-h-screen" data-loading="true">
        <Header />
      </div>
    );
  // The listing only exists once there is at least one published destination;
  // the English listing only shows (and exists for) translated destinations.
  const anyEnglish = destinations.some(hasEnglishDestination);
  if (destinations.length === 0) return <Navigate to="/404" replace />;
  if (en && !anyEnglish) return <Navigate to="/destinos" replace />;
  const visible = en ? destinations.filter(hasEnglishDestination) : destinations;
  const byName = (a, b) =>
    pickLang(a, "name", en).localeCompare(pickLang(b, "name", en), lang);
  const groups = continents
    .filter((c) => c.id !== "all")
    .map((c) => ({ ...c, items: visible.filter((d) => d.continent === c.id).sort(byName) }))
    .filter((g) => g.items.length);
  const others = visible.filter((d) => !groups.some((g) => g.items.includes(d)));
  if (others.length)
    groups.push({ id: "otros", label: { es: "Otros", en: "Other" }, items: others.sort(byName) });
  const selected = groups.some((g) => g.id === continentParam) ? continentParam : "all";
  const shownGroups = selected === "all" ? groups : groups.filter((g) => g.id === selected);
  const selectContinent = (id) =>
    setSearchParams(id === "all" ? {} : { [en ? "continent" : "continente"]: id }, {
      replace: true,
      preventScrollReset: true,
    });

  const path = en ? "/destinations" : "/destinos";
  const crumbs = [homeCrumb(lang), { name: en ? "Destinations" : "Destinos", path }];

  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100 min-h-screen flex flex-col">
      <SEOHead
        title={en ? "Travel Destinations & Guides | SaltySoulTrips" : "Destinos de viaje y guías | SaltySoulTrips"}
        description={
          en
            ? "Destination guides by Ángela: best time to go, budget, sample itineraries and tailor-made trips to each place."
            : "Guías de destinos de Ángela: mejor época, presupuesto, rutas de ejemplo y viajes a medida a cada lugar."
        }
        canonicalUrl={`${SITE}${path}`}
        esUrl={`${SITE}/destinos`}
        enUrl={anyEnglish ? `${SITE}/destinations` : undefined}
        schemaData={breadcrumbSchema(crumbs)}
      />
      <Header />
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={crumbs} className="mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif mb-4">{en ? "Destinations" : "Destinos"}</h1>
          <p className="text-lg text-brand-dark/70 max-w-3xl mb-12">
            {en
              ? "Practical guides to the places we know best: when to go, how much it costs and sample routes to start planning your trip."
              : "Guías prácticas de los lugares que mejor conocemos: cuándo ir, cuánto cuesta y rutas de ejemplo para empezar a planear tu viaje."}
          </p>
          {/* Continent filter (client-side; every guide stays linked in the HTML) */}
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label={en ? "Filter by continent" : "Filtrar por continente"}>
            {[{ id: "all", label: { es: "Todos", en: "All" } }, ...groups].map((g) => {
              const active = selected === g.id;
              const count = g.id === "all" ? visible.length : g.items.length;
              return (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectContinent(g.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    active
                      ? "bg-brand-dark text-white border-brand-dark"
                      : "bg-white text-brand-dark border-sand-200 hover:bg-sand-200"
                  }`}
                >
                  {g.label[lang]} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {shownGroups.map((g) => (
            <section key={g.id} className="mb-14">
              <h2 className="text-3xl font-serif mb-6">{g.label[lang]}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {g.items.map((d) => {
              const name = pickLang(d, "name", en);
              return (
                <Link
                  key={d._id}
                  to={destinationPath(d, lang)}
                  className="group bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="aspect-[16/10] bg-sand-200 overflow-hidden">
                    {d.heroImage?.asset && (
                      <img
                        src={urlFor(d.heroImage).width(800).height(500).quality(75).auto("format").url()}
                        alt={d.heroImage?.alt || name}
                        loading="lazy"
                        width="800"
                        height="500"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif group-hover:text-sand-700">
                      {en ? `Trips to ${name}` : `Viajes ${esPrep("a", name)}`}
                    </h3>
                    {pickLang(d, "title", en) && (
                      <p className="text-brand-dark/70 mt-1">{pickLang(d, "title", en)}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
