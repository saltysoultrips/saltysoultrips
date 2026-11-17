import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ClipboardEdit from "lucide-react/dist/esm/icons/clipboard-edit";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import Luggage from "lucide-react/dist/esm/icons/luggage";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";

export default function HowItWorks() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const steps = [
    {
      number: "01",
      icon: <ClipboardEdit className="w-7 h-7 text-sand-700" />,
      title: t("howItWorks.step1Title", "1. Cuéntanos tu viaje"),
      description: t(
        "howItWorks.step1Desc",
        "Rellena el formulario con tus fechas, destino soñado, viajeros y presupuesto. En solo 2 minutos tenemos la base para empezar.",
      ),
      highlight: isEn ? "2-minute form" : "Formulario en 2 min",
    },
    {
      number: "02",
      icon: <Sparkles className="w-7 h-7 text-sand-700" />,
      title: t("howItWorks.step2Title", "2. Recibe tu propuesta gratuita"),
      description: t(
        "howItWorks.step2Desc",
        "Diseñamos una propuesta personalizada con vuelos, hoteles y actividades. La revisamos juntos y la adaptamos sin compromiso hasta que sea perfecta para ti.",
      ),
      highlight: isEn ? "100% tailored" : "100% a medida",
    },
    {
      number: "03",
      icon: <Luggage className="w-7 h-7 text-sand-700" />,
      title: t("howItWorks.step3Title", "3. Viaja sin preocupaciones"),
      description: t(
        "howItWorks.step3Desc",
        "Gestionamos todas las reservas directamente en tu nombre. Recibes toda la documentación clara y organizada en tu móvil. ¡Tú solo prepara las maletas!",
      ),
      highlight: isEn ? "Zero stress" : "Cero preocupaciones",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-sand-600 font-semibold tracking-wider uppercase text-sm block mb-3">
            {t("howItWorks.label", "Cómo Trabajamos")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-dark leading-tight">
            {t("howItWorks.title", "Tu viaje a medida en 3 sencillos pasos")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-dark/70 font-light leading-relaxed">
            {t(
              "howItWorks.subtitle",
              "Nos encargamos de toda la complejidad para que tú solo tengas que ilusionarte con tu próxima aventura.",
            )}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative flex flex-col bg-sand-100/70 border border-sand-200 rounded-3xl p-8 hover:bg-sand-100 hover:border-sand-300 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Header row: Number + Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white border border-sand-200/80 flex items-center justify-center shadow-xs">
                  {step.icon}
                </div>
                <span className="text-3xl font-serif font-bold text-sand-300">
                  {step.number}
                </span>
              </div>

              {/* Tag / pill */}
              <div className="mb-3">
                <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-sand-700 bg-sand-200/80 px-3 py-1 rounded-full">
                  {step.highlight}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl font-serif font-bold text-brand-dark mb-3">
                {step.title}
              </h3>
              <p className="text-sm font-sans text-brand-dark/75 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reassurance Bar & CTA */}
        <div className="mt-16 bg-sand-100 rounded-3xl p-8 sm:p-10 border border-sand-200 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-brand-dark/80 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isEn ? "100% Free quote & no commitment" : "Presupuesto 100% gratuito y sin compromiso"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isEn ? "Save dozens of search hours" : "Ahorra decenas de horas de búsqueda"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isEn ? "Dedicated team by your side" : "Equipo dedicado a tu lado"}</span>
            </div>
          </div>

          <Link
            to={isEn ? "/contact" : "/contacto"}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#2c2c2c] hover:bg-black text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base group whitespace-nowrap active:scale-95"
          >
            <span>{isEn ? "Request Free Quote" : "Pedir Presupuesto Gratis"}</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
