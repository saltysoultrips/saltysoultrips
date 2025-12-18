import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const destinations = [
  {
    country: "Japón",
    title: "Tradición y Futuro",
    desc: "Templos zen, sushi omasake y la energía de Tokio.",
    image:
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-red-900/60",
  },
  {
    country: "Maldivas",
    title: "Paraíso Turquesa",
    desc: "Sumérgete en aguas cristalinas nadando junto a tiburones ballena, tortugas y mantas gigantes. El paraíso bajo el agua te espera.",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-cyan-900/60",
  },
  {
    country: "Grecia",
    title: "Verano Eterno",
    desc: "Cúpulas azules, historia y gastronomía mediterránea.",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-blue-900/60",
  },
  {
    country: "Tanzania",
    title: "Espíritu Salvaje",
    desc: "Safaris y la majestuosidad del Kilimanjaro.",
    image:
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-yellow-900/60",
  },
  {
    country: "Islandia",
    title: "Fuego y Hielo",
    desc: "Auroras boreales, cascadas masivas y aguas termales.",
    image:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-indigo-900/60",
  },
  {
    country: "Perú",
    title: "Legado Inca",
    desc: "Machu Picchu, cultura andina y gastronomía mundial.",
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-amber-900/60",
  },
  {
    country: "Bali",
    title: "Espiritualidad",
    desc: "Templos, arrozales infinitos y retiros de bienestar.",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-emerald-900/60",
  },
  {
    country: "Marruecos",
    title: "Desierto Mágico",
    desc: "Zocos vibrantes, noches en el Sahara y riads auténticos.",
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-orange-900/60",
  },
];

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
            Ver todos los destinos <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
            >
              <img
                src={dest.image}
                alt={dest.country}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${dest.color} via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity`}
              ></div>

              <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2 block">
                  {dest.country}
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  {dest.title}
                </h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {dest.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-sage transition-colors font-medium"
          >
            Ver todos los destinos <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
