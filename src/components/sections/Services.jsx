import React, { useState } from "react";
import { Plane, Compass, Star, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Services() {
  const [selectedImage, setSelectedImage] = useState(null);

  const packs = [
    {
      title: "PAQUETE EXPLORA",
      price: "70 €",
      image: "/paquetes/explora.png",
      icon: <Plane size={32} className="text-brand-sage" />,
      features: ["Búsqueda de vuelos", "Alojamiento"],
      details: [
        "Presupuesto aproximado",
        "Lugares de interés",
        "Gastronomía típica",
        "Apps esenciales para el destino",
      ],
      idealFor:
        "Viajeros independientes que quieren una guía clara sin perder tiempo buscando.",
      highlight: false,
      color: "border-stone-200 bg-white",
    },
    {
      title: "PAQUETE VIVE",
      price: "100 €",
      image: "/paquetes/vive.png",
      icon: <Compass size={32} className="text-brand-cream" />,
      features: ["Búsqueda de vuelos", "Alojamiento", "Todo lo anterior"],
      details: [
        "Actividades recomendadas con enlaces",
        "Mapa guía visual en Google",
        "Transportes internos explicados (cómo moverse fácil y barato)",
      ],
      idealFor:
        "Viajeros que quieren una experiencia más cuidada y sentir que tienen un 'asistente de viaje'.",
      highlight: true,
      color: "border-stone-800 bg-stone-800 text-white",
    },
    {
      title: "PAQUETE CONECTA",
      price: "150 €",
      image: "/paquetes/conecta.png",
      icon: <Star size={32} className="text-brand-sage" />,
      features: ["Búsqueda de vuelos", "Alojamiento", "Todo lo anterior"],
      details: [
        "Búsqueda mejor seguro de viaje + SIM + visado (si es necesario)",
        "Recomendaciones de tarjetas bancarias sin comisión",
        "Itinerario optimizado",
        "Presupuesto detallado por categorías (por rangos y comparativas)",
      ],
      idealFor:
        "Para ti si quieres un viaje completo, organizado y lleno de detalles únicos. Tú solo reservas, yo te lo diseño todo.",
      highlight: false,
      color: "border-stone-200 bg-white",
    },
  ];

  return (
    <section id="services" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl font-serif font-bold text-stone-800 mt-2">
            Elige tu Experiencia
          </h2>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            Desde una guía esencial hasta un diseño completo de tu aventura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packs.map((pack, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-3xl p-8 border hover:shadow-xl transition-all duration-300 flex flex-col ${
                pack.color
              } ${pack.highlight ? "shadow-2xl scale-105 z-10" : "shadow-sm"}`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  pack.highlight ? "bg-white/10" : "bg-stone-100"
                }`}
              >
                {pack.icon}
              </div>

              <h3
                className={`text-2xl font-serif font-bold mb-1 ${
                  pack.highlight ? "text-white" : "text-stone-800"
                }`}
              >
                {pack.title}
              </h3>

              <div
                className={`text-xl font-medium mb-6 ${
                  pack.highlight ? "text-brand-sand" : "text-brand-sage"
                }`}
              >
                {pack.price}
              </div>

              <div className="space-y-6 flex-grow">
                {/* Main Features */}
                <div className="space-y-2">
                  {pack.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check
                        size={18}
                        className={
                          pack.highlight ? "text-brand-sage" : "text-stone-400"
                        }
                      />
                      <span
                        className={`font-medium ${
                          pack.highlight ? "text-stone-200" : "text-stone-700"
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Details List */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <p
                    className={`text-xs uppercase tracking-wider mb-2 opacity-70 ${
                      pack.highlight ? "text-white" : "text-stone-500"
                    }`}
                  >
                    Incluye:
                  </p>
                  {pack.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          pack.highlight ? "bg-brand-sage" : "bg-stone-300"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          pack.highlight ? "text-stone-300" : "text-stone-600"
                        }`}
                      >
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Ideal For */}
                <div
                  className={`p-4 rounded-xl text-sm italic ${
                    pack.highlight
                      ? "bg-white/10 text-stone-200"
                      : "bg-stone-100 text-stone-600"
                  }`}
                >
                  <span className="font-semibold not-italic block mb-1">
                    Ideal para:
                  </span>
                  "{pack.idealFor}"
                </div>
              </div>

              <button
                onClick={() => setSelectedImage(pack.image)}
                className={`w-full mt-8 py-3 rounded-xl font-medium text-center transition-all ${
                  pack.highlight
                    ? "bg-brand-sage text-stone-900 hover:bg-[#8dc9db]"
                    : "bg-stone-100 text-stone-800 hover:bg-stone-200"
                }`}
              >
                Ver Detalles
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-stone-600 max-w-3xl mx-auto font-medium">
          Tarifas válidas para grupos de hasta 6 personas. Para grupos más
          grandes, consulta nuestro suplemento de logística grupal enviándonos
          un mensaje!
        </p>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage}
                alt="Detalle del paquete"
                loading="lazy"
                className="w-full h-full object-contain max-h-[90vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
