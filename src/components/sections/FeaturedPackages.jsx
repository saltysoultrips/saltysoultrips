import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import { client, urlFor } from "../../lib/sanity";
import { packageTypes } from "../../data/constants";
import { getPackageCountries } from "../../data/countryMap";

export default function FeaturedPackages() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const query = `*[_type == "package"] | order(_createdAt asc) {
          _id,
          "id": slug.current,
          title,
          title_en,
          continent,
          country,
          country_en,
          countries,
          countries_en,
          type,
          shortDescription,
          shortDescription_en,
          priceInfo,
          priceInfo_en,
          image,
          flyerImage
        }`;
        const allPackages = await client.fetch(query);
        if (allPackages && allPackages.length > 0) {
          // Prioritize flagship dream destinations if present
          const prioritySlugs = [
            "japon-bali",
            "nueva-york-maldivas",
            "tanzania",
            "laponia-en-familia",
            "vietnam-bali-14-dias",
            "ruta-66-de-chicago-a-los-angeles",
          ];

          const prioritized = [...allPackages].sort((a, b) => {
            const indexA = prioritySlugs.indexOf(a.id);
            const indexB = prioritySlugs.indexOf(b.id);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return 0;
          });

          // Show top 3 packages on home
          setFeaturedPackages(prioritized.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching featured packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const getPackageText = (pkg, field) => {
    if (field === "title")
      return isEn && pkg.title_en ? pkg.title_en : pkg.title || "";
    if (field === "shortDescription")
      return isEn && pkg.shortDescription_en
        ? pkg.shortDescription_en
        : pkg.shortDescription || "";
    if (field === "priceInfo")
      return isEn && pkg.priceInfo_en ? pkg.priceInfo_en : pkg.priceInfo || "";
    return pkg[field] || "";
  };

  const getTypeLabel = (typeIdOrArray) => {
    if (!typeIdOrArray) return "";
    const primaryId = Array.isArray(typeIdOrArray) ? typeIdOrArray[0] : typeIdOrArray;
    const found = packageTypes.find((item) => item.id === primaryId);
    return found ? (isEn ? found.label.en : found.label.es) : "";
  };

  if (!loading && featuredPackages.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-sand-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-sand-600 font-semibold tracking-wider uppercase text-sm block mb-3">
              {t("packages.featured.label", "Inspiración Viajera")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-dark leading-tight">
              {t("packages.featured.title", "Paquetes Destacados")}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-dark/70 font-light leading-relaxed">
              {t(
                "packages.featured.subtitle",
                "Una selección de nuestros itinerarios más solicitados. Listos para viajar o 100% adaptables a tus gustos.",
              )}
            </p>
          </div>

          <Link
            to={isEn ? "/packages" : "/paquetes"}
            className="inline-flex items-center gap-2 text-brand-dark font-medium hover:text-sand-700 transition-colors group self-start md:self-end text-sm sm:text-base whitespace-nowrap"
          >
            <span>{t("packages.featured.exploreAll", "Ver todos los paquetes")}</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl overflow-hidden border border-sand-200 animate-pulse h-96"
              >
                <div className="bg-sand-200 h-52 w-full"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-sand-200 rounded w-1/3"></div>
                  <div className="h-6 bg-sand-200 rounded w-3/4"></div>
                  <div className="h-4 bg-sand-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Packages Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {featuredPackages.map((pkg, idx) => {
              const countriesList = getPackageCountries(pkg, isEn);
              const typeLabel = getTypeLabel(pkg.type);

              const imageUrl =
                pkg.image?.asset
                  ? urlFor(pkg.image).width(800).height(500).quality(85).auto("format").url()
                  : pkg.flyerImage?.asset
                  ? urlFor(pkg.flyerImage).width(800).height(500).quality(85).auto("format").url()
                  : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";

              return (
                <motion.div
                  key={pkg._id || pkg.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="h-full flex"
                >
                  <Link
                    to={`/${isEn ? "packages" : "paquetes"}/${pkg.id}`}
                    className="group flex flex-col w-full bg-white rounded-3xl overflow-hidden border border-sand-200 hover:border-sand-300 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Panoramic Image with Country Badge */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-sand-200">
                      <img
                        src={imageUrl}
                        alt={getPackageText(pkg, "title")}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Top-left Country Pill */}
                      {countriesList.length > 0 && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-brand-dark shadow-sm">
                            {countriesList.join(" · ")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        {/* Type Tag */}
                        {typeLabel && (
                          <div className="mb-2.5">
                            <span className="text-[11px] font-semibold text-sand-700 bg-sand-200/80 px-2.5 py-0.5 rounded-full inline-block">
                              {typeLabel}
                            </span>
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-serif text-brand-dark group-hover:text-sand-700 transition-colors leading-snug line-clamp-2 mb-2">
                          {getPackageText(pkg, "title")}
                        </h3>

                        {/* Short Description */}
                        {getPackageText(pkg, "shortDescription") && (
                          <p className="text-sm font-sans text-brand-dark/70 line-clamp-2 leading-relaxed mb-4">
                            {getPackageText(pkg, "shortDescription")}
                          </p>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-sand-200/70 flex items-center justify-between mt-auto">
                        <div>
                          <span className="block text-[10px] uppercase tracking-widest font-bold text-brand-dark/50">
                            {isEn ? "Estimated price" : "Precio estimado"}
                          </span>
                          <span className="text-base sm:text-lg font-serif font-bold text-brand-dark">
                            {getPackageText(pkg, "priceInfo") ||
                              (isEn ? "On request" : "A consultar")}
                          </span>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-sand-100 group-hover:bg-[#2c2c2c] text-brand-dark group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
