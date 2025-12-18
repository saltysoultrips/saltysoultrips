import React from "react";
import { MessageCircleHeart, PenTool, PlaneTakeoff } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <MessageCircleHeart size={32} className="text-stone-50" />,
    title: "1. Cuéntanos tu idea",
    description:
      "Rellena nuestro formulario o agenda una llamada. Entenderemos tus gustos, ritmo y sueños.",
    bg: "bg-brand-sage",
  },
  {
    icon: <PenTool size={32} className="text-stone-50" />,
    title: "2. Diseñamos tu propuesta",
    description:
      "Creamos un itinerario a medida con alojamientos y experiencias exclusivas para ti.",
    bg: "bg-stone-400",
  },
  {
    icon: <PlaneTakeoff size={32} className="text-stone-50" />,
    title: "3. ¡Viaja sin preocupaciones!",
    description:
      "Recibe tu documentación, app de viaje y disfruta. Nosotros cuidamos de los detalles.",
    bg: "bg-brand-sand",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative text-center">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-stone-100 -z-10"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-md ${step.bg} ring-4 ring-white`}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">
                {step.title}
              </h3>
              <p className="text-stone-600 leading-relaxed px-4">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
