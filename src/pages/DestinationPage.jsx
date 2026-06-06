import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import { useTranslation } from "react-i18next";
import { client, urlFor } from "../lib/sanity";
import SEOHead from "../components/SEOHead";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import NotFound from "./NotFound";

export default function DestinationPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { slug } = useParams();
  const [destination, setDestination] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDestination = async () => {
      try {
        // Query tries to find the destination where either slug matches (Spanish) or slug_en matches (English)
        const query = `*[_type == "destination" && (slug.current == $slug || slug_en.current == $slug)][0]`;
        const sanityDest = await client.fetch(query, { slug });

        if (sanityDest) {
          // Helper: pick bilingual field, fallback to ES
          const pick = (field) => lang === 'en' && sanityDest[`${field}_en`]
            ? sanityDest[`${field}_en`]
            : sanityDest[field];

          const mappedDest = {
            ...sanityDest,
            slug: sanityDest.slug?.current || "",
            slug_en: sanityDest.slug_en?.current || sanityDest.slug?.current || "",
            title: pick('title'),
            intro: pick('intro'),
            metaDescription: pick('metaDescription'),
            img_src: sanityDest.heroImage
              ? urlFor(sanityDest.heroImage).url()
              : null,
            hero: {
              image: sanityDest.heroImage
                ? urlFor(sanityDest.heroImage).url()
                : null,
              subtitle: pick('heroSubtitle'),
              tagline: pick('heroTagline'),
            },
            highlights: (sanityDest.highlights || []).map(h => ({
              ...h,
              title: lang === 'en' && h.title_en ? h.title_en : h.title,
              desc: lang === 'en' && h.desc_en ? h.desc_en : h.desc,
            })),
            about: lang === 'en' && sanityDest.about_en && sanityDest.about_en.length > 0
              ? sanityDest.about_en
              : (sanityDest.about || []),
            bestTime: {
              months: lang === 'en' && sanityDest.bestTime?.months_en
                ? sanityDest.bestTime.months_en
                : sanityDest.bestTime?.months,
              reason: lang === 'en' && sanityDest.bestTime?.reason_en
                ? sanityDest.bestTime.reason_en
                : sanityDest.bestTime?.reason,
            },
          };
          setDestination(mappedDest);
        }
      } catch (error) {
        console.error("Error fetching destination from Sanity:", error);
        // Fallback to local data (already set in initial state)
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [slug, lang]);

  // Si no se encuentra el destino (ni en local ni en Sanity), mostrar 404
  if (!destination && !loading) {
    return <NotFound />;
  }

  // Show loading state while fetching if no local data exists (optional, depends on UX preference)
  // For now, we render with local data immediately if available (stale-while-revalidate strategy)
  if (!destination) return <div className="h-screen bg-stone-50"></div>;

  const canonicalUrl = `https://www.saltysoultrips.com/destinos/${destination.slug}`;
  const whatsappMessage = `Hola! Me interesa un viaje personalizado a ${destination.country}. ¿Podrían ayudarme?`;
  const whatsappUrl = `https://wa.me/34611794842?text=${encodeURIComponent(whatsappMessage)}`;

  // Schema.org para Breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://www.saltysoultrips.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Destinos",
        item: "https://www.saltysoultrips.com/#destinations",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: destination.country,
        item: canonicalUrl,
      },
    ],
  };

  // Schema.org para TouristDestination
  const destinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `Viajes Personalizados a ${destination.country}`,
    description: destination.metaDescription,
    url: canonicalUrl,
    image: [destination.hero.image],
    touristType: [
      "Adventure travelers",
      "Luxury travelers",
      "Cultural tourists",
    ],
    includesAttraction: destination.highlights.map((h) => ({
      "@type": "TouristAttraction",
      name: h.title,
      description: h.desc,
    })),
    isAccessibleForFree: false,
    publicAccess: true,
  };

  const schemaData = [destinationSchema, breadcrumbSchema];

  const seoTitle = `Viajes a ${destination.country}: ${destination.title} | SaltySoulTrips`;
  const seoDescription =
    destination.metaDescription ||
    `Diseñamos tu viaje personalizado a ${destination.country} a medida. Descubre itinerarios únicos y sin comisiones ocultas para tu próxima aventura: ${destination.title}.`;

  return (
    <div className="font-sans antialiased text-stone-800 bg-stone-50 selection:bg-brand-sage selection:text-white">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={canonicalUrl}
        esUrl={`https://www.saltysoultrips.com/destinos/${destination.slug}`}
        enUrl={`https://www.saltysoultrips.com/destinations/${destination.slug_en || destination.slug}`}
        ogImage={destination.hero.image}
        schemaData={schemaData}
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <img
            src={`${destination.hero.image}${
              destination.hero.image?.includes("?") ? "&" : "?"
            }w=1920&q=95&auto=format`}
            srcSet={`
              ${destination.hero.image}${
                destination.hero.image?.includes("?") ? "&" : "?"
              }w=640&q=90&auto=format 640w,
              ${destination.hero.image}${
                destination.hero.image?.includes("?") ? "&" : "?"
              }w=1024&q=90&auto=format 1024w,
              ${destination.hero.image}${
                destination.hero.image?.includes("?") ? "&" : "?"
              }w=1600&q=95&auto=format 1600w,
              ${destination.hero.image}${
                destination.hero.image?.includes("?") ? "&" : "?"
              }w=2400&q=95&auto=format 2400w
            `}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            alt={`Paisaje representativo de ${destination.country}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${destination.color} via-black/30 to-transparent`}
          ></div>

          <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Link
              to="/#destinations"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors w-fit"
              aria-label="Volver a la lista de destinos"
            >
              <ArrowLeft size={18} />
              <span>{t('destinationPage.backToDestinations')}</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white/80 font-semibold tracking-wider uppercase text-sm mb-2 block">
                {destination.hero.subtitle}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
                {t('destinationPage.heroTitle', { country: destination.country })}
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                {destination.hero.tagline}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro & About Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="text-brand-sage" size={22} />
              <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm">
                {t('destinationPage.aboutDestination')}
              </span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-800 mb-6">
              {t('destinationPage.discover', { country: destination.country })}
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-6">
              {destination.intro}
            </p>
            {destination.about &&
              destination.about.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base text-stone-600 leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
          </motion.div>
        </section>

        {/* Highlights Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm">
                {t('destinationPage.experiencesLabel')}
              </span>
              <h2 className="text-3xl font-serif font-bold text-stone-800 mt-2">
                {t('destinationPage.bestOf', { country: destination.country })}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-stone-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <span className="text-4xl mb-4 block">{highlight.icon}</span>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-stone-600 text-sm">{highlight.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Time Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-brand-sage/10 to-brand-sky/10 rounded-3xl p-8 text-center flex flex-col justify-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Calendar className="text-brand-sage" size={24} />
                <h3 className="text-xl font-semibold text-stone-800">
                  {t('destinationPage.bestTimeTitle')}
                </h3>
              </div>
              <p className="text-2xl font-serif font-bold text-brand-sage mb-3">
                {destination.bestTime.months}
              </p>
              <p className="text-stone-600 max-w-2xl mx-auto">
                {destination.bestTime.reason}
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-sky/20 border-t border-brand-sky/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-sky-800 mb-4">
                {t('destinationPage.ctaTitle', { country: destination.country })}
              </h2>
              <p className="text-sky-900/80 text-lg mb-8 max-w-2xl mx-auto">
                {t('destinationPage.ctaSubtitle')}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-sky-600 border border-sky-100 px-8 py-4 rounded-full font-semibold text-lg hover:bg-sky-50 transition-colors shadow-lg hover:shadow-xl"
                aria-label={`Contactar por WhatsApp para viaje a ${destination.country}`}
              >
                <MessageCircle size={24} />
                {t('destinationPage.ctaButton')}
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
