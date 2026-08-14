import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SEOHead from "../components/SEOHead";
import { continents, packageTypes } from "../data/constants";
import { client, urlFor } from "../lib/sanity";
import { motion, AnimatePresence } from "framer-motion";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Compass from "lucide-react/dist/esm/icons/compass";
import X from "lucide-react/dist/esm/icons/x";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";

export default function PackageDetailPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = i18n.language === 'en';
  const [isImageOpen, setIsImageOpen] = useState(false);
  
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const query = `*[_type == "package" && slug.current == $slug][0]`;
        const sanityPkg = await client.fetch(query, { slug });
        if (sanityPkg) {
          setPkg(sanityPkg);
        } else {
          navigate('/404', { replace: true });
        }
      } catch (error) {
        console.error("Error fetching package:", error);
        navigate('/404', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [slug, navigate]);

  const getPackageText = (field) => {
    if (!pkg) return "";
    if (field === 'title') return isEn && pkg.title_en ? pkg.title_en : pkg.title || "";
    if (field === 'shortDescription') return isEn && pkg.shortDescription_en ? pkg.shortDescription_en : pkg.shortDescription || "";
    if (field === 'longDescription') return isEn && pkg.longDescription_en ? pkg.longDescription_en : pkg.longDescription || "";
    if (field === 'priceInfo') return isEn && pkg.priceInfo_en ? pkg.priceInfo_en : pkg.priceInfo || "";
    if (field === 'seoTitle') return isEn && pkg.seoTitle_en ? pkg.seoTitle_en : pkg.seoTitle || "";
    if (field === 'seoDescription') return isEn && pkg.seoDescription_en ? pkg.seoDescription_en : pkg.seoDescription || "";
    return pkg[field] || "";
  };
  
  const getPackageImage = () => pkg?.image ? urlFor(pkg.image).url() : "";
  const getFlyerImage = () => pkg?.flyerImage ? urlFor(pkg.flyerImage).url() : "";

  // Helper to parse bold markdown (**text**)
  const formatText = (text) => {
    if (!text) return null;
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-semibold text-brand-dark">{part}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const getLabel = (collection, idOrArray) => {
    if (Array.isArray(idOrArray)) {
       if (idOrArray.length === 0) return "";
       return idOrArray.map(id => {
         const item = collection.find(i => i.id === id);
         return item ? (isEn ? item.label.en : item.label.es) : "";
       }).filter(Boolean).join(" & ");
    }
    const item = collection.find(i => i.id === idOrArray);
    if (!item) return "";
    return isEn ? item.label.en : item.label.es;
  };

  const handleQuoteClick = () => {
    navigate(`/${isEn ? 'contact' : 'contacto'}`);
  };

  if (loading) {
    return (
      <div className="font-sans antialiased text-brand-dark bg-sand-100 min-h-screen flex flex-col items-center justify-center">
        <Header />
        <Loader2 className="w-12 h-12 text-brand-dark animate-spin mb-4 mt-20" />
        <p className="text-brand-dark/60 font-serif text-lg">
          {isEn ? "Loading package details..." : "Cargando detalles del paquete..."}
        </p>
        <Footer />
      </div>
    );
  }

  if (!pkg) return null;

  const continentLabel = getLabel(continents, pkg.continent);
  const typeLabel = getLabel(packageTypes, pkg.type);

  const seoTitle = getPackageText('seoTitle') || `${getPackageText('title')} | SaltySoulTrips`;
  const seoDesc = getPackageText('seoDescription') || getPackageText('shortDescription');
  const ogImage = getPackageImage();

  const priceString = getPackageText('priceInfo');
  const priceMatch = priceString ? priceString.match(/\d+([.,]\d+)?/) : null;
  const priceValue = priceMatch ? priceMatch[0].replace(',', '.') : "0";

  const heroImageAlt = pkg.image?.alt || getPackageText('title');
  const flyerImageAlt = pkg.flyerImage?.alt || `Flyer de ${getPackageText('title')}`;

  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": getPackageText('title'),
    "image": ogImage,
    "description": seoDesc,
    "brand": {
      "@type": "Brand",
      "name": "SaltySoulTrips"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.saltysoultrips.com/${isEn ? 'packages' : 'paquetes'}/${slug}`,
      "priceCurrency": "EUR",
      "price": priceValue,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100 min-h-screen flex flex-col">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonicalUrl={`https://www.saltysoultrips.com/${isEn ? 'packages' : 'paquetes'}/${slug}`}
        esUrl={`https://www.saltysoultrips.com/paquetes/${slug}`}
        enUrl={`https://www.saltysoultrips.com/packages/${slug}`}
        ogImage={ogImage}
        schemaData={schemaData}
      />
      
      <Header />
      
      <main className="flex-grow pt-20">
        <article>
          {/* Hero Image Section */}
          <div className="relative h-[50vh] md:h-[60vh] w-full bg-brand-dark overflow-hidden">
            <img 
              src={getPackageImage()} 
              alt={heroImageAlt}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sand-100 via-transparent to-black/30"></div>
            
            <div className="absolute top-8 left-4 md:left-8 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/${isEn ? 'packages' : 'paquetes'}`);
                }}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-4 py-2 rounded-full transition-all text-sm font-medium"
              >
                <ArrowLeft size={16} />
                {t("packages.back", "Volver a Paquetes")}
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-20 md:-mt-32 relative z-10 pb-32 md:pb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-sand-200"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="flex items-center gap-1.5 bg-sand-100 text-brand-dark px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                  <MapPin size={14} />
                  {continentLabel}
                </span>
                <span className="flex items-center gap-1.5 bg-sand-100 text-brand-dark px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                  <Compass size={14} />
                  {typeLabel}
                </span>
              </div>

              {/* Title & Price */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8 pb-8 border-b border-sand-200">
                <h1 className="text-4xl md:text-5xl font-serif text-brand-dark leading-tight">
                  {getPackageText('title')}
                </h1>
                {pkg.priceInfo && (
                  <div className="flex-shrink-0 bg-sand-200 px-4 py-2.5 rounded-xl">
                    <p className="text-[10px] sm:text-xs text-brand-dark/70 uppercase tracking-widest mb-0.5 font-bold">{isEn ? "Estimated Price" : "Precio Estimado"}</p>
                    <p className="text-lg sm:text-xl font-serif text-brand-dark font-bold">{getPackageText('priceInfo')}</p>
                  </div>
                )}
              </div>

              {/* Grid Layout for Content and Flyer */}
              <div className={`grid grid-cols-1 ${pkg.flyerImage ? 'lg:grid-cols-2 gap-12 items-start' : ''} mb-12`}>
                {/* Description & Inline CTA */}
                <div className="order-2 lg:order-1 text-brand-dark/80 font-sans flex flex-col h-full">
                  <div className="whitespace-pre-line leading-[1.8] text-[15px] mb-8">
                    {formatText(getPackageText('longDescription'))}
                  </div>
                  
                  {/* Inline Call to Action */}
                  <div className="hidden md:block mt-auto pt-8 border-t border-sand-200">
                    <button 
                      onClick={handleQuoteClick}
                      className="w-full sm:w-auto bg-sand-200 hover:bg-sand-300 text-brand-dark px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-xl active:scale-95 flex items-center justify-center gap-3 group"
                    >
                      {isEn ? "Book Now" : "Reservar Paquete"}
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                    <p className="text-xs text-brand-dark/50 mt-4 font-medium tracking-wide text-center sm:text-left">
                      {isEn ? "No commitment required. We customize this package to your liking." : "Sin compromiso. Personalizaremos este paquete a tu gusto."}
                    </p>
                  </div>
                </div>

                {/* Flyer Image (if available) */}
                {pkg.flyerImage && (
                  <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                    <div 
                      className="relative max-w-md w-full rounded-2xl overflow-hidden shadow-lg border border-sand-200 cursor-zoom-in group"
                      onClick={() => setIsImageOpen(true)}
                    >
                      <img 
                        src={getFlyerImage()} 
                        alt={flyerImageAlt} 
                        className="w-full h-auto object-cover transition-transform duration-700"
                      />
                      {/* Click instruction overlay */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                        <span className="bg-black/60 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                          {isEn ? "Click to enlarge flyer" : "Clic para ampliar detalle"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </article>
      </main>
      
      <Footer />

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-sand-200 p-4 z-40 flex justify-between items-center shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-xs text-brand-dark/70 uppercase tracking-widest font-medium">{isEn ? "Price" : "Precio"}</p>
          <p className="text-lg font-serif text-brand-dark font-bold">{getPackageText('priceInfo')}</p>
        </div>
        <button
          onClick={handleQuoteClick}
          className="bg-sand-200 text-brand-dark px-6 py-3 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-transform"
        >
          {isEn ? "Book" : "Reservar"}
        </button>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isImageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageOpen(false)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <button 
              onClick={() => setIsImageOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-sand-300 transition-colors bg-black/50 rounded-full p-2"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={getFlyerImage() || getPackageImage()}
              alt={getPackageText('title')}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
