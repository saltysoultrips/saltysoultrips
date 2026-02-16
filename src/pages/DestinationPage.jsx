import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MessageCircle } from "lucide-react";
import { getDestinationBySlug } from "../data/destinationsData";
import SEOHead from "../components/SEOHead";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import NotFound from "./NotFound";

export default function DestinationPage() {
  const { slug } = useParams();
  const destination = getDestinationBySlug(slug);

  // Si no se encuentra el destino, mostrar la página 404 personalizada
  if (!destination) {
    return <NotFound />;
  }

  // Schema.org para TouristDestination
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `Viajes Personalizados a ${destination.name}`,
    description: destination.metaDescription,
    url: `https://www.saltysoultrips.com/${destination.slug}`,
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

  const canonicalUrl = `https://www.saltysoultrips.com/${destination.slug}`;
  const whatsappMessage = `Hola! Me interesa un viaje personalizado a ${destination.name}. ¿Podrían ayudarme?`;
  const whatsappUrl = `https://wa.me/34611794842?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="font-sans antialiased text-stone-800 bg-stone-50 selection:bg-brand-sage selection:text-white">
      <SEOHead
        title={destination.title}
        description={destination.metaDescription}
        canonicalUrl={canonicalUrl}
        schemaData={schemaData}
      />

      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={destination.hero.image}
          alt={`Viajes personalizados a ${destination.name}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${destination.color} via-black/30 to-transparent`}
        ></div>

        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link
            to="/#destinations"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors w-fit"
          >
            <ArrowLeft size={18} />
            <span>Volver a destinos</span>
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
              Viajes Personalizados a {destination.name}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {destination.hero.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-stone-600 leading-relaxed"
        >
          {destination.intro}
        </motion.p>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm">
              Experiencias
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-800 mt-2">
              Lo mejor de {destination.name}
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

      {/* Best Time & Tips Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto">
          {/* Best Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-sage/10 to-brand-sea/10 rounded-3xl p-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="text-brand-sage" size={24} />
              <h3 className="text-xl font-semibold text-stone-800">
                Mejor época para viajar
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
      <section className="py-20 bg-gradient-to-r from-brand-sage to-brand-sea">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              ¿Listo para tu viaje a {destination.name}?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Diseñamos un itinerario 100% a tu medida, sin comisiones ocultas.
              Cuéntanos tu viaje soñado y lo hacemos realidad.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-brand-sage px-8 py-4 rounded-full font-semibold text-lg hover:bg-stone-100 transition-colors shadow-lg hover:shadow-xl"
            >
              <MessageCircle size={24} />
              Contáctanos por WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
