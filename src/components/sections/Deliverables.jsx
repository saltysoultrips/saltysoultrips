import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Link, Map, Calculator } from "lucide-react";

export default function Deliverables() {
  const deliverableItems = [
    {
      icon: <Smartphone size={32} />,
      title: "Guía PDF Interactiva",
      description:
        "Toda tu ruta diseñada paso a paso, lista para llevar en tu móvil.",
      color: "text-brand-sage",
      bgColor: "bg-brand-sage/10",
    },
    {
      icon: <Link size={32} />,
      title: "Acceso Directo a Reservas",
      description:
        "Enlaces listos para que reserves vuelos, alojamientos y transportes en un clic, sin vueltas.",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Map size={32} />,
      title: "Tu Mapa Personalizado",
      description:
        "Un mapa de Google Maps con todos los puntos clave (visitas, restaurantes, secretos locales) para que no te pierdas nada.",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      icon: <Calculator size={32} />,
      title: "Control de Gastos",
      description:
        "Un desglose detallado del presupuesto total para que sepas cuánto podrías gastar.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm block mb-3">
            El entregable
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-6 leading-tight">
            ¿Qué recibirás en tu <br />
            <span className="text-brand-sage">bandeja de entrada?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-stone-600 font-light">
            Al contratar cualquier pack, te enviaré un dossier digital completo
            para que solo te preocupes de disfrutar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deliverableItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-100 flex flex-col items-center text-center"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${item.bgColor} ${item.color} flex items-center justify-center mb-6`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-4 font-serif">
                {item.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Mockup / Visual Representation Hint */}
        {/* You could add an image here if you have one, for now we use a nice subtle background element */}
        <div className="mt-12 text-center">
          <p className="text-sm text-stone-400 italic">
            * El contenido específico puede variar ligeramente según el paquete
            elegido.
          </p>
        </div>
      </div>
    </section>
  );
}
