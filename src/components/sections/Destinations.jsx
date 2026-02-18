import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import Star from "lucide-react/dist/esm/icons/star";

import { client, urlFor } from "../../lib/sanity";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const query = '*[_type == "destination"]';
        const sanityDestinations = await client.fetch(query);

        if (sanityDestinations && sanityDestinations.length > 0) {
          const mappedDestinations = sanityDestinations.map((d) => ({
            ...d,
            slug: d.slug?.current || "", // Fix: Sanity slug is an object
            img_src: d.heroImage ? urlFor(d.heroImage).url() : d.img_src,
            hero: {
              ...d.hero,
              image: d.heroImage ? urlFor(d.heroImage).url() : d.hero?.image,
              subtitle: d.heroSubtitle || d.hero?.subtitle,
              tagline: d.heroTagline || d.hero?.tagline,
            },
          }));
          setDestinations(mappedDestinations);
        }
      } catch (error) {
        console.error("Error fetching destinations from Sanity:", error);
      }
    };

    fetchDestinations();
  }, []);

  // Group destinations by region
  const destinationsByRegion = destinations.reduce((acc, dest) => {
    const region = dest.region || "Otros";
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(dest);
    return acc;
  }, {});

  // Order of regions to display - Updated to user preference
  const regionOrder = [
    "Europa",
    "Asia & Oriente",
    "Estados Unidos",
    "Islas y Paraísos",
  ];

  // State for collapsible sections - Default first one open
  const [openRegions, setOpenRegions] = useState({
    Europa: true,
    "Asia & Oriente": false,
    "Estados Unidos": false,
    "Islas y Paraísos": false,
  });

  const toggleRegion = (region) => {
    setOpenRegions((prev) => ({
      ...prev,
      [region]: !prev[region],
    }));
  };

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 text-center md:text-left">
          <div>
            <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm block mb-2">
              Inspiración viajera
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 leading-tight">
              Explora el Mundo
            </h2>
            <p className="mt-4 text-stone-600 max-w-2xl font-light text-lg">
              Descubre destinos únicos diseñados para conectar contigo. Desde
              rascacielos infinitos hasta playas desiertas.
            </p>
          </div>
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 text-stone-500 hover:text-brand-sage transition-colors font-medium group"
          >
            Diseñar mi viaje a medida{" "}
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        {regionOrder.map((region) => {
          const destinations = destinationsByRegion[region];
          if (!destinations) return null;
          const isOpen = openRegions[region];

          return (
            <div
              key={region}
              className="mb-12 last:mb-0 border-b border-stone-200 pb-8 last:border-0"
            >
              <button
                onClick={() => toggleRegion(region)}
                className="w-full flex items-center justify-between group focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <h3
                    className={`text-3xl font-serif font-bold transition-colors duration-300 ${isOpen ? "text-brand-sage" : "text-stone-800 group-hover:text-brand-sage"}`}
                  >
                    {region}
                  </h3>
                  <span className="text-sm bg-stone-100 text-stone-500 py-1 px-3 rounded-full font-medium">
                    {destinations.length} destinos
                  </span>
                </div>
                <div
                  className={`p-2 rounded-full bg-white shadow-sm border border-stone-100 transition-transform duration-300 ${isOpen ? "rotate-180 bg-brand-sage text-white border-brand-sage" : "text-stone-400"}`}
                >
                  <ChevronDown size={24} />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-10 pb-4">
                      {destinations.map((dest, index) => (
                        <Link
                          key={dest.id || index}
                          to={`/destinos/${dest.slug}`}
                          className="block group"
                          aria-label={`Ver detalles de viaje a ${dest.country}`}
                        >
                          <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="relative h-[480px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
                          >
                            <img
                              src={`${dest.img_src || dest.hero?.image}${
                                (dest.img_src || dest.hero?.image)?.includes(
                                  "?",
                                )
                                  ? "&"
                                  : "?"
                              }w=800&q=80`}
                              srcSet={`
                                ${dest.img_src || dest.hero?.image}${
                                  (dest.img_src || dest.hero?.image)?.includes(
                                    "?",
                                  )
                                    ? "&"
                                    : "?"
                                }w=400&q=80 400w,
                                ${dest.img_src || dest.hero?.image}${
                                  (dest.img_src || dest.hero?.image)?.includes(
                                    "?",
                                  )
                                    ? "&"
                                    : "?"
                                }w=800&q=80 800w,
                                ${dest.img_src || dest.hero?.image}${
                                  (dest.img_src || dest.hero?.image)?.includes(
                                    "?",
                                  )
                                    ? "&"
                                    : "?"
                                }w=1200&q=80 1200w
                              `}
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              alt={`Viaje a ${dest.country} - ${dest.title}`}
                              loading="lazy"
                              width="400"
                              height="480"
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-300"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                              <div className="flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-widest mb-2">
                                <MapPin size={12} /> {dest.country}
                              </div>
                              <h4 className="text-2xl font-serif font-bold text-white mb-3 leading-tight">
                                {dest.title}
                              </h4>

                              {/* Highlights on Hover - "Lo mejor del destino" */}
                              <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <div className="mb-4 space-y-1">
                                  <p className="text-xs text-brand-sage font-bold uppercase tracking-wider mb-2">
                                    Lo mejor:
                                  </p>
                                  {dest.highlights &&
                                    dest.highlights.slice(0, 3).map((h, i) => (
                                      <div
                                        key={i}
                                        className="flex items-center gap-2 text-white/90 text-sm"
                                      >
                                        <Star
                                          size={12}
                                          className="text-brand-sage fill-brand-sage"
                                        />
                                        <span className="truncate">
                                          {h.title}
                                        </span>
                                      </div>
                                    ))}
                                </div>
                                <span className="inline-flex items-center gap-2 text-white text-sm font-medium hover:underline">
                                  Ver itinerario completo{" "}
                                  <ArrowUpRight size={14} />
                                </span>
                              </div>
                            </div>
                          </motion.article>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        <div className="mt-16 text-center md:hidden">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-brand-sage font-bold border-b border-brand-sage pb-1"
          >
            ¿No encuentras tu destino? Escríbeme <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
