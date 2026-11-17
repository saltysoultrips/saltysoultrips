import React from "react";
import { useParams, useLocation, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import Clock from "lucide-react/dist/esm/icons/clock";
import Wallet from "lucide-react/dist/esm/icons/wallet";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SEOHead from "../components/SEOHead";
import { client, urlFor } from "../lib/sanity";
import { clampText } from "../lib/packageSeo";
import {
  destinationPath,
  hasEnglishDestination,
  isLiveDestination,
  englishDestinationSlug,
} from "../lib/routes";
import {
  DESTINATION_FIELDS,
  fetchDestinationLinks,
  pickLang,
  esPrep,
} from "../lib/destinations";
import {
  Breadcrumbs,
  breadcrumbSchema,
  homeCrumb,
  ORG_ID,
  SITE,
} from "../lib/schema";

const Section = ({ title, children, id }) => (
  <section id={id} className="mt-14">
    <h2 className="text-2xl md:text-3xl font-serif text-brand-dark mb-5">{title}</h2>
    {children}
  </section>
);

export default function DestinationPage() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const en = lang === "en";

  const [dest, setDest] = React.useState(undefined);
  const [links, setLinks] = React.useState(null);

  React.useEffect(() => {
    let active = true;
    setDest(undefined);
    (async () => {
      try {
        let data = await client.fetch(
          `*[_type == "destination" && (slug.current == $slug || slug_en.current == $slug)][0]{${DESTINATION_FIELDS}}`,
          { slug },
        );
        if (!data && en) {
          const all = await client.fetch(
            `*[_type == "destination" && showOnWeb == true]{${DESTINATION_FIELDS}}`,
          );
          data = all.find((d) => englishDestinationSlug(d) === slug);
        }
        if (active) setDest(data && isLiveDestination(data) ? data : null);
      } catch (error) {
        console.error("Error fetching destination:", error);
        if (active) setDest(null);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug, en]);

  React.useEffect(() => {
    if (!dest) return;
    let active = true;
    setLinks(null);
    fetchDestinationLinks(dest, lang)
      .then((result) => active && setLinks(result))
      .catch(() => active && setLinks({ packages: [], posts: [] }));
    return () => {
      active = false;
    };
  }, [dest, lang]);

  if (dest === undefined) {
    return (
      <div className="font-sans bg-sand-100 min-h-screen" data-loading="true">
        <Header />
        <div className="pt-40 text-center text-brand-dark/60 font-serif text-lg">
          {en ? "Loading destination..." : "Cargando destino..."}
        </div>
      </div>
    );
  }
  if (dest === null) return <Navigate to="/404" replace />;
  if (en && !hasEnglishDestination(dest))
    return <Navigate to={destinationPath(dest, "es")} replace />;
  if (pathname !== destinationPath(dest, lang))
    return <Navigate to={destinationPath(dest, lang)} replace />;

  const t = (field) => pickLang(dest, field, en);
  const name = t("name");
  const tagline = t("title");
  const intro = t("intro");
  const about = (en ? dest.about_en : dest.about) || [];
  const tips = (en ? dest.tips_en : dest.tips) || [];
  const bestMonths = pickLang(dest.bestTime, "months", en);
  const bestReason = pickLang(dest.bestTime, "reason", en);
  const idealDays = t("idealDays");
  const budget = t("budget");
  const highlights = (dest.highlights || []).filter((h) => h?.title);
  const routes = (dest.routes || []).filter((r) => r?.title && r?.description);
  const faqs = (dest.faqs || []).filter((f) => f?.question && f?.answer);

  const pageUrl = `${SITE}${destinationPath(dest, lang)}`;
  const heroUrl = (w) =>
    dest.heroImage?.asset ? urlFor(dest.heroImage).width(w).quality(80).auto("format").url() : "";
  const ogImage = heroUrl(1200);

  const brandTitle = en
    ? `Tailor-made trips to ${name} | SaltySoulTrips`
    : `Viajes ${esPrep("a", name)} a medida | SaltySoulTrips`;
  const seoTitle = t("seoTitle") || (brandTitle.length <= 65 ? brandTitle : `${en ? "Trips to" : "Viajes a"} ${name} | SaltySoulTrips`);
  const seoDesc = clampText(t("metaDescription") || intro, 158);

  const crumbs = [
    homeCrumb(lang),
    { name: en ? "Destinations" : "Destinos", path: en ? "/destinations" : "/destinos" },
    { name, path: destinationPath(dest, lang) },
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name,
      description: seoDesc,
      url: pageUrl,
      ...(ogImage ? { image: ogImage } : {}),
      ...(highlights.length
        ? {
            includesAttraction: highlights.map((h) => ({
              "@type": "TouristAttraction",
              name: pickLang(h, "title", en),
              ...(pickLang(h, "desc", en) ? { description: pickLang(h, "desc", en) } : {}),
            })),
          }
        : {}),
      provider: { "@id": ORG_ID },
    },
    breadcrumbSchema(crumbs),
    ...(faqs.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: pickLang(f, "question", en),
              acceptedAnswer: { "@type": "Answer", text: pickLang(f, "answer", en) },
            })),
          },
        ]
      : []),
  ];

  const contactHref = `/${en ? "contact" : "contacto"}?destination=${encodeURIComponent(name)}`;
  const facts = [
    bestMonths && { icon: Calendar, label: en ? "Best time" : "Mejor época", value: bestMonths },
    idealDays && { icon: Clock, label: en ? "Recommended days" : "Días recomendados", value: idealDays },
    budget && { icon: Wallet, label: en ? "Budget" : "Presupuesto", value: en ? "See guide below" : "Ver más abajo", href: "#presupuesto" },
  ].filter(Boolean);

  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100 min-h-screen flex flex-col">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonicalUrl={pageUrl}
        esUrl={`${SITE}${destinationPath(dest, "es")}`}
        enUrl={hasEnglishDestination(dest) ? `${SITE}${destinationPath(dest, "en")}` : undefined}
        ogImage={ogImage || undefined}
        schemaData={schema}
      />
      <Header />

      <main className="flex-grow pt-20">
        {/* Hero */}
        <div className="relative h-[45vh] md:h-[55vh] w-full bg-brand-dark overflow-hidden">
          {dest.heroImage?.asset && (
            <img
              src={heroUrl(1600)}
              srcSet={[640, 1024, 1600, 2400].map((w) => `${heroUrl(w)} ${w}w`).join(", ")}
              sizes="100vw"
              fetchPriority="high"
              alt={dest.heroImage?.alt || name}
              className="w-full h-full object-cover opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />
          <div className="absolute bottom-10 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-6 text-white">
            <h1 className="text-4xl md:text-6xl font-serif leading-tight drop-shadow">
              {en ? `Trips to ${name}` : `Viajes ${esPrep("a", name)}`}
            </h1>
            {tagline && <p className="mt-3 text-lg md:text-xl italic text-sand-200 drop-shadow">{tagline}</p>}
          </div>
        </div>

        <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <Breadcrumbs items={crumbs} className="mb-8" />

          <p className="text-xl md:text-2xl font-serif leading-relaxed text-brand-dark/90">{intro}</p>

          {facts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {facts.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="bg-white rounded-2xl border border-sand-200 p-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-dark/50 mb-1">
                    <Icon size={14} /> {label}
                  </div>
                  {href ? (
                    <a href={href} className="font-serif text-lg underline underline-offset-4">{value}</a>
                  ) : (
                    <p className="font-serif text-lg">{value}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {about.length > 0 && (
            <Section title={en ? `Why travel to ${name}` : `Por qué viajar ${esPrep("a", name)}`}>
              <div className="space-y-5 text-lg leading-relaxed text-brand-dark/80">
                {about.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </Section>
          )}

          {highlights.length > 0 && (
            <Section title={en ? `Must-sees in ${name}` : `Imprescindibles ${esPrep("en", name)}`}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((h, i) => (
                  <li key={i} className="bg-white rounded-2xl border border-sand-200 p-5 flex gap-4">
                    {h.icon && <span className="text-3xl" aria-hidden="true">{h.icon}</span>}
                    <div>
                      <h3 className="font-serif text-lg font-bold">{pickLang(h, "title", en)}</h3>
                      {pickLang(h, "desc", en) && <p className="text-brand-dark/70">{pickLang(h, "desc", en)}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {(bestMonths || bestReason) && (
            <Section title={en ? `Best time to visit ${name}` : `Mejor época para viajar ${esPrep("a", name)}`}>
              {bestMonths && <p className="text-lg font-semibold mb-2">{bestMonths}</p>}
              {bestReason && <p className="text-lg leading-relaxed text-brand-dark/80 whitespace-pre-line">{bestReason}</p>}
            </Section>
          )}

          {budget && (
            <Section id="presupuesto" title={en ? `How much does a trip to ${name} cost?` : `¿Cuánto cuesta un viaje ${esPrep("a", name)}?`}>
              <p className="text-lg leading-relaxed text-brand-dark/80 whitespace-pre-line">{budget}</p>
            </Section>
          )}

          {routes.length > 0 && (
            <Section title={en ? `Sample itineraries for ${name}` : `Rutas de ejemplo ${esPrep("por", name)}`}>
              <div className="space-y-6">
                {routes.map((r, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-sand-200 p-6">
                    <h3 className="font-serif text-xl font-bold mb-3">{pickLang(r, "title", en)}</h3>
                    <p className="leading-[1.8] text-brand-dark/80 whitespace-pre-line">{pickLang(r, "description", en)}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {tips.length > 0 && (
            <Section title={en ? "Ángela's tips" : "Consejos de Ángela"}>
              <ul className="list-disc pl-6 space-y-3 text-lg text-brand-dark/80">
                {tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </Section>
          )}

          {links === null && <div data-loading="true" className="mt-14 h-10" />}

          {links?.packages.length > 0 && (
            <Section title={en ? `Our trips to ${name}` : `Nuestros viajes ${esPrep("a", name)}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {links.packages.map((p) => (
                  <Link
                    key={p._id}
                    to={`/${en ? "packages" : "paquetes"}/${p.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-sand-200 shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="aspect-[16/10] bg-sand-200 overflow-hidden">
                      {p.image?.asset && (
                        <img
                          src={urlFor(p.image).width(640).height(400).quality(75).auto("format").url()}
                          alt={pickLang(p, "title", en)}
                          loading="lazy"
                          width="640"
                          height="400"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-serif group-hover:text-sand-700">{pickLang(p, "title", en)}</h3>
                      {pickLang(p, "priceInfo", en) && (
                        <p className="text-sm text-brand-dark/70 mt-1">{pickLang(p, "priceInfo", en)}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </Section>
          )}

          {links?.posts.length > 0 && (
            <Section title={en ? `Articles about ${name}` : `Artículos ${esPrep("sobre", name)}`}>
              <ul className="space-y-4">
                {links.posts.map((post) => (
                  <li key={post.id} className="bg-white rounded-2xl border border-sand-200 p-5">
                    <Link to={post.path} className="font-serif text-lg underline underline-offset-4 hover:text-sand-700">
                      {post.title}
                    </Link>
                    {post.excerpt && <p className="text-brand-dark/70 mt-1 line-clamp-2">{post.excerpt}</p>}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {faqs.length > 0 && (
            <Section title={en ? `Frequently asked questions about ${name}` : `Preguntas frecuentes ${esPrep("sobre", name)}`}>
              <div className="divide-y divide-sand-200 border-y border-sand-200">
                {faqs.map((f, i) => (
                  <details key={i} className="group py-4">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <h3 className="font-serif text-lg font-bold pr-4">{pickLang(f, "question", en)}</h3>
                      <ChevronDown size={20} className="shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 leading-relaxed text-brand-dark/80 whitespace-pre-line">{pickLang(f, "answer", en)}</p>
                  </details>
                ))}
              </div>
            </Section>
          )}

          <aside className="mt-16 bg-white rounded-3xl border border-sand-200 p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-3">
              {en ? `Shall we design your trip to ${name}?` : `¿Diseñamos tu viaje ${esPrep("a", name)}?`}
            </h2>
            <p className="text-brand-dark/70 mb-6 max-w-2xl mx-auto">
              {en
                ? "Tell us your dates, budget and travel style. We'll prepare a tailor-made proposal with no commitment."
                : "Cuéntanos tus fechas, presupuesto y forma de viajar. Te preparamos una propuesta a medida sin compromiso."}
            </p>
            <Link
              to={contactHref}
              className="inline-block bg-sand-600 hover:bg-sand-700 text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              {en ? "Request a free quote" : "Pedir presupuesto gratis"}
            </Link>
          </aside>
        </article>
      </main>
      <Footer />
    </div>
  );
}
