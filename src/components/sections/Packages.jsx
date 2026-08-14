import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { continents, packageTypes } from "../../data/constants";
import { client, urlFor } from "../../lib/sanity";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Compass from "lucide-react/dist/esm/icons/compass";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import Search from "lucide-react/dist/esm/icons/search";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";

export default function Packages() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';
  
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenContinent, setIsOpenContinent] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const query = `*[_type == "package"] | order(_createdAt asc) {
          _id,
          "id": slug.current,
          title,
          title_en,
          continent,
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

  const getLabel = (item) => isEn ? item.label.en : item.label.es;
  const getPackageText = (pkg, field) => {
    if (field === 'title') return isEn && pkg.title_en ? pkg.title_en : pkg.title || "";
    if (field === 'shortDescription') return isEn && pkg.shortDescription_en ? pkg.shortDescription_en : pkg.shortDescription || "";
    if (field === 'longDescription') return isEn && pkg.longDescription_en ? pkg.longDescription_en : pkg.longDescription || "";
    if (field === 'priceInfo') return isEn && pkg.priceInfo_en ? pkg.priceInfo_en : pkg.priceInfo || "";
    return pkg[field] || "";
  };
  const getPackageImage = (pkg) => pkg.image ? urlFor(pkg.image).url() : "";

  const filteredPackages = packagesData.filter((pkg) => {
    const matchContinent = selectedContinent === "all" || pkg.continent === selectedContinent;
    const matchType = selectedType === "all" || (Array.isArray(pkg.type) ? pkg.type.includes(selectedType) : pkg.type === selectedType);
    
    const searchLower = searchQuery.toLowerCase();
    const title = getPackageText(pkg, 'title').toLowerCase();
    const shortDesc = getPackageText(pkg, 'shortDescription').toLowerCase();
    const longDesc = getPackageText(pkg, 'longDescription').toLowerCase();
    const matchSearch = searchQuery === "" || title.includes(searchLower) || shortDesc.includes(searchLower) || longDesc.includes(searchLower);

    return matchContinent && matchType && matchSearch;
  });

  const packagesByContinent = continents.map(continent => ({
    ...continent,
    packages: filteredPackages.filter(pkg => pkg.continent === continent.id)
  })).filter(group => group.packages.length > 0);

  return (
    <section className="py-20 bg-sand-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-brand-dark mb-6"
          >
            {t("packages.title", "Nuestros Paquetes")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-dark/80"
          >
            {t("packages.subtitle", "Descubre nuestros paquetes diseñados al detalle. Filtra por continente o tipo de viaje para encontrar tu experiencia ideal.")}
          </motion.p>
        </div>

        {/* Filters - VECI style dropdowns */}
        <div className="mb-12 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-sand-200 p-6 md:p-8 relative z-30">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search Input */}
            <div className="flex-[1.5] relative">
              <label className="flex items-center text-xs font-bold text-brand-dark/60 mb-2 uppercase tracking-widest">
                <Search size={14} className="mr-1.5" />
                {t("packages.filters.search", "Buscar destino")}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("packages.filters.searchPlaceholder", "Ej: Japón, Safari...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-sand-100 hover:bg-sand-200 focus:bg-white text-brand-dark px-5 py-4 pl-12 rounded-xl text-left font-medium transition-all outline-none focus:ring-2 focus:ring-brand-dark/20 border border-transparent focus:border-sand-200 placeholder:text-brand-dark/40"
                />
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/40" />
              </div>
            </div>

            {/* Continent Dropdown */}
            <div className="flex-1 relative">
              <label className="flex items-center text-xs font-bold text-brand-dark/60 mb-2 uppercase tracking-widest">
                <MapPin size={14} className="mr-1.5" />
                {t("packages.filters.continent", "Continente")}
              </label>
              <button
                onClick={() => {
                  setIsOpenContinent(!isOpenContinent);
                  setIsOpenType(false);
                }}
                className="w-full flex items-center justify-between bg-sand-100 hover:bg-sand-200 text-brand-dark px-5 py-4 rounded-xl text-left font-medium transition-colors"
              >
                {getLabel(continents.find(c => c.id === selectedContinent) || continents[0])}
                <ChevronDown size={20} className={`transition-transform duration-300 ${isOpenContinent ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isOpenContinent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-sand-200 overflow-hidden z-50"
                  >
                    {continents.map((cont) => (
                      <button
                        key={cont.id}
                        onClick={() => {
                          setSelectedContinent(cont.id);
                          setIsOpenContinent(false);
                        }}
                        className={`w-full text-left px-5 py-3 hover:bg-sand-100 transition-colors ${selectedContinent === cont.id ? 'bg-sand-100 font-bold text-brand-dark' : 'text-brand-dark/80'}`}
                      >
                        {getLabel(cont)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Type Dropdown */}
            <div className="flex-1 relative">
              <label className="flex items-center text-xs font-bold text-brand-dark/60 mb-2 uppercase tracking-widest">
                <Compass size={14} className="mr-1.5" />
                {t("packages.filters.type", "Tipo de Viaje")}
              </label>
              <button
                onClick={() => {
                  setIsOpenType(!isOpenType);
                  setIsOpenContinent(false);
                }}
                className="w-full flex items-center justify-between bg-sand-100 hover:bg-sand-200 text-brand-dark px-5 py-4 rounded-xl text-left font-medium transition-colors"
              >
                {getLabel(packageTypes.find(t => t.id === selectedType) || packageTypes[0])}
                <ChevronDown size={20} className={`transition-transform duration-300 ${isOpenType ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isOpenType && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-sand-200 overflow-hidden z-50"
                  >
                    {packageTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => {
                          setSelectedType(type.id);
                          setIsOpenType(false);
                        }}
                        className={`w-full text-left px-5 py-3 hover:bg-sand-100 transition-colors ${selectedType === type.id ? 'bg-sand-100 font-bold text-brand-dark' : 'text-brand-dark/80'}`}
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
            <div key={group.id} className={`w-full ${index > 0 ? 'mt-12 md:mt-16' : ''}`}>
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

                  <AnimatePresence mode="popLayout">
                    {group.packages.map((pkg) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        key={pkg.id}
                        onClick={() => navigate(`/${isEn ? 'packages' : 'paquetes'}/${pkg.id}`)}
                        className="snap-start shrink-0 w-[80vw] sm:w-[320px] md:w-[380px] cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-sand-200 flex flex-col group"
                      >
                        <div className="relative h-[420px] md:h-[480px] overflow-hidden">
                          <img
                            src={getPackageImage(pkg)}
                            alt={getPackageText(pkg, 'title')}
                            className="w-full h-full object-cover transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                          
                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {pkg.type && (Array.isArray(pkg.type) ? pkg.type : [pkg.type]).map(t => {
                              const typeObj = packageTypes.find(pt => pt.id === t);
                              return typeObj ? (
                                <span key={t} className="bg-white/90 backdrop-blur-sm text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                  {getLabel(typeObj)}
                                </span>
                              ) : null;
                            })}
                          </div>
                          
                          <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 flex flex-col items-start gap-3 md:gap-4">
                            <h3 className="text-3xl md:text-4xl font-serif text-white drop-shadow-md leading-tight">
                              {getPackageText(pkg, 'title')}
                            </h3>
                            {pkg.priceInfo && (
                              <div className="flex-shrink-0">
                                <span className="text-[13px] md:text-sm font-bold bg-white text-brand-dark px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-lg whitespace-nowrap">
                                  {getPackageText(pkg, 'priceInfo')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Right Spacer */}
                  <div className="shrink-0 w-[max(1rem,calc(50vw-40rem+1rem))] sm:w-[max(1.5rem,calc(50vw-40rem+1.5rem))] lg:w-[max(2rem,calc(50vw-40rem+2rem))]"></div>
                </div>

                {/* Navigation Arrows for Desktop */}
                {group.packages.length > 0 && (
                  <>
                    <button 
                      onClick={() => document.getElementById(`packages-slider-${group.id}`).scrollBy({left: -400, behavior: 'smooth'})}
                      className="hidden md:flex absolute top-[45%] left-4 lg:left-8 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-sand-200 text-brand-dark hover:bg-white hover:scale-110 transition-all z-20 opacity-0 group-hover/slider:opacity-100 focus:opacity-100"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button 
                      onClick={() => document.getElementById(`packages-slider-${group.id}`).scrollBy({left: 400, behavior: 'smooth'})}
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
                {isEn ? "No packages found for these filters." : "No se han encontrado paquetes con estos filtros."}
              </p>
              <button
                onClick={() => {
                  setSelectedContinent("all");
                  setSelectedType("all");
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
