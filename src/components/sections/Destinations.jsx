import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { destinationsData } from "../../data/destinationsData";

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm">
              Inspiración
            </span>
            <h2 className="text-4xl font-serif font-bold text-stone-800 mt-2">
              Destinos Favoritos
            </h2>
          </div>
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 text-stone-500 hover:text-brand-sage transition-colors font-medium"
          >
            Cualquier destino es posible. <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinationsData.map((dest, index) => (
            <Link key={index} to={`/${dest.slug}`} className="block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
              >
                <img
                  src={dest.hero.image.replace("w=1920", "w=800")}
                  alt={`Viajes personalizados a ${dest.name}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${dest.color} via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity`}
                ></div>

                <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2 block">
                    {dest.name}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">
                    {dest.hero.subtitle}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <span>Ver itinerario</span>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-sage transition-colors font-medium"
          >
            Cualquier destino es posible. <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
