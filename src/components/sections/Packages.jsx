import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { continents, packageTypes } from "../../data/constants";
import { getPackageCountry, getPackageCountries } from "../../data/countryMap";
import { client, urlFor } from "../../lib/sanity";
import Globe from "lucide-react/dist/esm/icons/globe";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Compass from "lucide-react/dist/esm/icons/compass";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Search from "lucide-react/dist/esm/icons/search";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";

const MotionLink = motion.create(Link);

export default function Packages() {
  const { t, i18n } = useTranslation();

  const isEn = i18n.language === "en";

  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedContinent, setSelectedContinent] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenContinent, setIsOpenContinent] = useState(false);
  const [isOpenCountry, setIsOpenCountry] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);

  const filtersRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setIsOpenContinent(false);
        setIsOpenCountry(false);
        setIsOpenType(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
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
          longDescription,
          longDescription_en,
          priceInfo,
          priceInfo_en,
          image,
          flyerImage
        }`;
        const sanityPackages = await client.fetch(query);
        setPackagesData(sanityPackages || []);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const getLabel = (item) => (isEn ? item.label.en : item.label.es);
  const getPackageText = (pkg, field) => {
    if (field === "title")
      return isEn && pkg.title_en ? pkg.title_en : pkg.title || "";
    if (field === "shortDescription")
      return isEn && pkg.shortDescription_en
        ? pkg.shortDescription_en
        : pkg.shortDescription || "";
    if (field === "longDescription")
      return isEn && pkg.longDescription_en
        ? pkg.longDescription_en
        : pkg.longDescription || "";
    if (field === "priceInfo")
      return isEn && pkg.priceInfo_en ? pkg.priceInfo_en : pkg.priceInfo || "";
    return pkg[field] || "";
  };
  const getPackageImage = (pkg) =>
    pkg.image ? urlFor(pkg.image).width(1200).quality(90).auto("format").url() : "";

  const getPackageTypes = (pkg) => {
    if (!pkg || !pkg.type) return [];
    const types = Array.isArray(pkg.type) ? pkg.type : [pkg.type];
    return types
      .map((t) => {
        const typeObj = packageTypes.find((pt) => pt.id === t);
        return typeObj ? getLabel(typeObj) : t;
      })
      .filter(Boolean);
  };

  // Dynamic available countries based on selected continent
  const availableCountries = useMemo(() => {
    const relevant =
      selectedContinent === "all"
        ? packagesData
        : packagesData.filter((pkg) => pkg.continent === selectedContinent);

    const set = new Set();
    relevant.forEach((pkg) => {
      const countries = getPackageCountries(pkg, isEn);
      countries.forEach((c) => set.add(c));
    });

    return Array.from(set).sort((a, b) =>
      a.localeCompare(b, isEn ? "en" : "es")
    );
  }, [packagesData, selectedContinent, isEn]);

  const filteredPackages = packagesData.filter((pkg) => {
    const pkgCountries = getPackageCountries(pkg, isEn);
    const matchContinent =
      selectedContinent === "all" || pkg.continent === selectedContinent;
    const matchCountry =
      selectedCountry === "all" ||
      pkgCountries.some(
        (c) => c.toLowerCase() === selectedCountry.toLowerCase()
      );
    const matchType =
      selectedType === "all" ||
      (Array.isArray(pkg.type)
        ? pkg.type.includes(selectedType)
        : pkg.type === selectedType);

    const searchLower = searchQuery.toLowerCase();
    const title = getPackageText(pkg, "title").toLowerCase();
    const shortDesc = getPackageText(pkg, "shortDescription").toLowerCase();
    const longDesc = getPackageText(pkg, "longDescription").toLowerCase();
    const matchSearch =
      searchQuery === "" ||
      title.includes(searchLower) ||
      shortDesc.includes(searchLower) ||
      longDesc.includes(searchLower) ||
      pkgCountries.some((c) => c.toLowerCase().includes(searchLower));

    return matchContinent && matchCountry && matchType && matchSearch;
  });

  const packagesByContinent = continents
    .map((continent) => ({
      ...continent,
      packages: filteredPackages.filter(
        (pkg) => pkg.continent === continent.id,
      ),
    }))
    .filter((group) => group.packages.length > 0);

  return (
    <section className="py-20 bg-sand-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-brand-dark mb-6"
          >
            {t("packages.title", "Nuestros Paquetes")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-dark/80"
          >
            {t(
              "packages.subtitle",
              "Descubre nuestros paquetes diseñados al detalle. Filtra por continente, país o tipo de viaje para encontrar tu experiencia ideal.",
            )}
          </motion.p>
        </div>

        {/* Filters - VECI style dropdowns */}
        <div
          ref={filtersRef}
          className="mb-12 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-sand-200 p-6 md:p-8 relative z-30"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Search Input */}
            <div className="relative">
              <label className="flex items-center text-xs font-bold text-brand-dark/60 mb-2 uppercase tracking-widest">
                <Search size={14} className="mr-1.5" />
                {t("packages.filters.search", "Buscar destino")}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t(
                    "packages.filters.searchPlaceholder",
                    "Ej: Japón, Safari...",
                  )}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-sand-100 hover:bg-sand-200 focus:bg-white text-brand-dark px-4 py-3.5 pl-11 rounded-xl text-left font-medium transition-all outline-none focus:ring-2 focus:ring-brand-dark/20 border border-transparent focus:border-sand-200 placeholder:text-brand-dark/40"
                />
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40"
                />
              </div>
            </div>

            {/* Continent Dropdown */}
            <div className="relative">
              <label className="flex items-center text-xs font-bold text-brand-dark/60 mb-2 uppercase tracking-widest">
                <Globe size={14} className="mr-1.5" />
                {t("packages.filters.continent", "Continente")}
              </label>
              <button
                onClick={() => {
                  setIsOpenContinent(!isOpenContinent);
                  setIsOpenCountry(false);
                  setIsOpenType(false);
                }}
                className="w-full flex items-center justify-between bg-sand-100 hover:bg-sand-200 text-brand-dark px-4 py-3.5 rounded-xl text-left font-medium transition-colors"
              >
                <span className="truncate">
                  {getLabel(
                    continents.find((c) => c.id === selectedContinent) ||
                      continents[0],
                  )}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 shrink-0 ml-2 ${isOpenContinent ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isOpenContinent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-sand-200 overflow-hidden z-50 max-h-64 overflow-y-auto"
                  >
                    {continents.map((cont) => (
                      <button
                        key={cont.id}
                        onClick={() => {
                          setSelectedContinent(cont.id);
                          setSelectedCountry("all");
                          setIsOpenContinent(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-sand-100 transition-colors ${selectedContinent === cont.id ? "bg-sand-100 font-bold text-brand-dark" : "text-brand-dark/80"}`}
                      >
                        {getLabel(cont)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Country Dropdown */}
            <div className="relative">
              <label className="flex items-center text-xs font-bold text-brand-dark/60 mb-2 uppercase tracking-widest">
                <MapPin size={14} className="mr-1.5" />
                {t("packages.filters.country", "País")}
              </label>
              <button
                onClick={() => {
                  setIsOpenCountry(!isOpenCountry);
                  setIsOpenContinent(false);
                  setIsOpenType(false);
                }}
                className="w-full flex items-center justify-between bg-sand-100 hover:bg-sand-200 text-brand-dark px-4 py-3.5 rounded-xl text-left font-medium transition-colors"
              >
                <span className="truncate">
                  {selectedCountry === "all"
                    ? isEn
                      ? "All countries"
                      : "Todos los países"
                    : selectedCountry}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 shrink-0 ml-2 ${isOpenCountry ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isOpenCountry && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-sand-200 overflow-hidden z-50 max-h-64 overflow-y-auto"
                  >
                    <button
                      onClick={() => {
                        setSelectedCountry("all");
                        setIsOpenCountry(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-sand-100 transition-colors ${selectedCountry === "all" ? "bg-sand-100 font-bold text-brand-dark" : "text-brand-dark/80"}`}
                    >
                      {isEn ? "All countries" : "Todos los países"}
                    </button>
                    {availableCountries.map((countryName) => (
                      <button
                        key={countryName}
                        onClick={() => {
                          setSelectedCountry(countryName);
                          setIsOpenCountry(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-sand-100 transition-colors ${selectedCountry === countryName ? "bg-sand-100 font-bold text-brand-dark" : "text-brand-dark/80"}`}
                      >
                        {countryName}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Type Dropdown */}
            <div className="relative">
              <label className="flex items-center text-xs font-bold text-brand-dark/60 mb-2 uppercase tracking-widest">
                <Compass size={14} className="mr-1.5" />
                {t("packages.filters.type", "Tipo de Viaje")}
              </label>
              <button
                onClick={() => {
                  setIsOpenType(!isOpenType);
                  setIsOpenContinent(false);
                  setIsOpenCountry(false);
                }}
                className="w-full flex items-center justify-between bg-sand-100 hover:bg-sand-200 text-brand-dark px-4 py-3.5 rounded-xl text-left font-medium transition-colors"
              >
                <span className="truncate">
                  {getLabel(
                    packageTypes.find((t) => t.id === selectedType) ||
                      packageTypes[0],
                  )}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 shrink-0 ml-2 ${isOpenType ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isOpenType && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-sand-200 overflow-hidden z-50 max-h-64 overflow-y-auto"
                  >
                    {packageTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => {
                          setSelectedType(type.id);
                          setIsOpenType(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-sand-100 transition-colors ${selectedType === type.id ? "bg-sand-100 font-bold text-brand-dark" : "text-brand-dark/80"}`}
                      >
                        {getLabel(type)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-brand-dark animate-spin mb-4" />
          <p className="text-brand-dark/60 font-serif text-lg">
            {isEn ? "Loading packages..." : "Cargando paquetes..."}
          </p>
        </div>
      ) : (
        <div className="w-full mt-8 md:mt-12 pb-12">
          {packagesByContinent.map((group, index) => (
            <div
              key={group.id}
              className={`w-full ${index > 0 ? "mt-12 md:mt-16" : ""}`}
            >
              {/* Continent Title */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <h3 className="text-2xl md:text-3xl font-serif text-brand-dark flex items-center gap-3">
                  <span className="w-8 h-px bg-sand-400"></span>
                  {getLabel(group)}
                </h3>
              </div>

              {/* Slider */}
              <div className="relative group/slider w-full">
                <div
                  id={`packages-slider-${group.id}`}
                  className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full pl-[max(1rem,calc(50vw-40rem+1rem))] sm:pl-[max(1.5rem,calc(50vw-40rem+1.5rem))] lg:pl-[max(2rem,calc(50vw-40rem+2rem))] scroll-pl-[max(1rem,calc(50vw-40rem+1rem))] sm:scroll-pl-[max(1.5rem,calc(50vw-40rem+1.5rem))] lg:scroll-pl-[max(2rem,calc(50vw-40rem+2rem))]"
                >
                    {group.packages.map((pkg) => {
                      const countryName = getPackageCountry(pkg, isEn);
                      const types = getPackageTypes(pkg);
                      return (
                        <Link
                          key={pkg.id}
                          to={`/${isEn ? "packages" : "paquetes"}/${pkg.id}`}
                          className="snap-start shrink-0 w-[82vw] sm:w-[330px] md:w-[370px] cursor-pointer bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 border border-sand-200 flex flex-col group"
                        >
                          {/* Image Block */}
                          <div className="relative h-60 sm:h-64 md:h-72 w-full overflow-hidden bg-sand-200">
                            <img
                              src={getPackageImage(pkg)}
                              loading="lazy"
                              alt={getPackageText(pkg, "title")}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-60 group-hover:opacity-30 transition-opacity"></div>

                            {/* Floating Top Badge */}
                            {countryName && (
                              <div className="absolute top-4 left-4 pointer-events-none">
                                <span className="bg-white/95 backdrop-blur-md text-brand-dark px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-white/60">
                                  <MapPin size={12} className="text-sand-600" />
                                  {countryName}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Editorial Content Block */}
                          <div className="p-6 md:p-7 flex flex-col flex-grow justify-between bg-white">
                            <div>
                              {/* Trip Types: Always shown for every trip */}
                              {types.length > 0 && (
                                <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                                  {types.slice(0, 3).map((typeLabel, idx) => (
                                    <span
                                      key={typeLabel}
                                      className="text-[11px] font-bold tracking-widest text-sand-600 uppercase"
                                    >
                                      {idx > 0 && (
                                        <span className="text-sand-400 mr-1.5">
                                          •
                                        </span>
                                      )}
                                      {typeLabel}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Title */}
                              <h3 className="text-2xl font-serif text-brand-dark group-hover:text-sand-700 transition-colors leading-snug line-clamp-2 mb-3">
                                {getPackageText(pkg, "title")}
                              </h3>

                              {/* Short Description */}
                              {getPackageText(pkg, "shortDescription") && (
                                <p className="text-sm font-sans text-brand-dark/65 line-clamp-2 leading-relaxed mb-6">
                                  {getPackageText(pkg, "shortDescription")}
                                </p>
                              )}
                            </div>

                            {/* Card Footer */}
                            <div className="pt-4 border-t border-sand-200/70 flex items-center justify-between mt-auto">
                              <div>
                                <span className="block text-[10px] uppercase tracking-widest font-bold text-brand-dark/45">
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
                      );
                    })}

                  {/* Right Spacer */}
                  <div className="shrink-0 w-[max(1rem,calc(50vw-40rem+1rem))] sm:w-[max(1.5rem,calc(50vw-40rem+1.5rem))] lg:w-[max(2rem,calc(50vw-40rem+2rem))]"></div>
                </div>

                {/* Navigation Arrows for Desktop */}
                {group.packages.length > 0 && (
                  <>
                    <button
                      onClick={() =>
                        document
                          .getElementById(`packages-slider-${group.id}`)
                          .scrollBy({ left: -400, behavior: "smooth" })
                      }
                      className="hidden md:flex absolute top-[45%] left-4 lg:left-8 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-sand-200 text-brand-dark hover:bg-white hover:scale-110 transition-all z-20 opacity-0 group-hover/slider:opacity-100 focus:opacity-100"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button
                      onClick={() =>
                        document
                          .getElementById(`packages-slider-${group.id}`)
                          .scrollBy({ left: 400, behavior: "smooth" })
                      }
                      className="hidden md:flex absolute top-[45%] right-4 lg:right-8 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-sand-200 text-brand-dark hover:bg-white hover:scale-110 transition-all z-20 opacity-0 group-hover/slider:opacity-100 focus:opacity-100"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {packagesByContinent.length === 0 && (
            <div className="text-center py-20 max-w-7xl mx-auto px-4">
              <p className="text-xl text-brand-dark/60 font-serif">
                {isEn
                  ? "No packages found for these filters."
                  : "No se han encontrado paquetes con estos filtros."}
              </p>
              <button
                onClick={() => {
                  setSelectedContinent("all");
                  setSelectedCountry("all");
                  setSelectedType("all");
                  setSearchQuery("");
                }}
                className="mt-4 text-sand-600 hover:text-brand-dark font-medium underline underline-offset-4"
              >
                {isEn ? "Clear filters" : "Limpiar filtros"}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
