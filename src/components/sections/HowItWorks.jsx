import React from "react";
import {
  MessageSquare,
  FileText,
  CreditCard,
  HeartHandshake,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <MessageSquare size={32} className="text-stone-50" />,
    title: "1. Cuéntame tu viaje",
    description:
      "Rellena el formulario con tus datos, fechas, presupuesto aproximado y tipo de viaje que te apetece.",
    detail:
      "Con esta información analizo tus gustos, necesidades y viabilidad del presupuesto para proponerte las mejores opciones.",
    bg: "bg-brand-sage",
  },
  {
    icon: <FileText size={32} className="text-stone-50" />,
    title: "2. Recibe tu propuesta gratuita",
    description:
      "Preparo un documento con una propuesta personalizada de destinos, ejemplos de vuelos y alojamientos ajustados a tu presupuesto.",
    detail:
      "Revisas la propuesta con calma y, si hace falta, ajustamos detalles hasta que encaje contigo.",
    bg: "bg-stone-400",
  },
  {
    icon: <CreditCard size={32} className="text-stone-50" />,
    title: "3. Elige y realiza el pago del paquete",
    description:
      'Una vez des el "Ok", eliges el paquete que más te guste y realizas el pago de mis servicios de consultoría, ya que pagas por mi tiempo y horas de trabajo no por comisiones ocultas.',
    bg: "bg-brand-sand",
  },
  {
    icon: <HeartHandshake size={32} className="text-stone-50" />,
    title: "4. Te acompaño en el proceso de reservas",
    description:
      "No gestiono pagos, reservas ni datos personales en tu nombre; tú realizas las reservas directamente con las aerolíneas, alojamientos y proveedores.",
    detail:
      "Actúo como intermediaria y te asesoro: te indico links, opciones recomendadas y los mejores tips para que reserves de forma segura, sencilla y lo más económica posible.",
    bg: "bg-stone-500",
  },
  {
    icon: <MapPin size={32} className="text-stone-50" />,
    title: "5. Tu itinerario visual y… ¡a viajar!",
    description:
      "Cuando tengas todo reservado, en un plazo aproximado de 5 a 7 días laborables preparo tu viaje en formato visual, con el itinerario día a día, mapas, recomendaciones y extras según el paquete elegido.",
    detail:
      "Una vez recibido tu viaje final, empieza la aventura: seguirás contando con mi apoyo y consejos para que disfrutes al máximo de tu experiencia antes, durante y después del viaje.",
    bg: "bg-brand-sage",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-stone-800">
            Cómo Funciona
          </h2>
          <div className="w-16 h-1 bg-brand-sage mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row items-start gap-6 bg-stone-50 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md ${step.bg} ring-4 ring-white`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-stone-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-stone-700 leading-relaxed mb-2">
                    {step.description}
                  </p>
                  {step.detail && (
                    <p className="text-stone-600 leading-relaxed text-sm">
                      {step.detail}
                    </p>
                  )}
                </div>
              </div>

              {/* Connecting line for mobile */}
              {index < steps.length - 1 && (
                <div className="h-8 w-0.5 bg-stone-200 mx-8 my-0"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
