import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Smartphone from "lucide-react/dist/esm/icons/smartphone";
import LinkId from "lucide-react/dist/esm/icons/link";
import Map from "lucide-react/dist/esm/icons/map";
import Calculator from "lucide-react/dist/esm/icons/calculator";

export default function Deliverables() {
  const { t } = useTranslation();

  const deliverableItems = [
    {
      icon: <Smartphone size={32} />,
      title: t("deliverables.item1Title"),
      description: t("deliverables.item1Desc"),
      color: "text-brand-sage",
      bgColor: "bg-brand-sage/10",
    },
    {
      icon: <LinkId size={32} />,
      title: t("deliverables.item2Title"),
      description: t("deliverables.item2Desc"),
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Map size={32} />,
      title: t("deliverables.item3Title"),
      description: t("deliverables.item3Desc"),
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      icon: <Calculator size={32} />,
      title: t("deliverables.item4Title"),
      description: t("deliverables.item4Desc"),
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm block mb-3">
            {t("deliverables.label")}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-6 leading-tight">
            {t("deliverables.title")} <br />
            <span className="text-brand-sage">{t("deliverables.titleHighlight")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-stone-600 font-light">
            {t("deliverables.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Deliverable Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {deliverableItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-100 flex flex-col items-center text-center h-full"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${item.bgColor} ${item.color} flex items-center justify-center mb-5`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-stone-800 mb-3 font-serif leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Digital Guide Image */}
          <div className="relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative max-w-md mx-auto"
            >
              <div className="absolute inset-0 bg-brand-sage/20 blur-3xl rounded-full transform -translate-y-4 scale-90 -z-10"></div>
              <img
                src="/resto/guiadigital.png"
                alt="Vista previa de la guía digital Salty Soul Trips"
                className="rounded-3xl shadow-2xl border-4 border-white mx-auto w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500"
              />
            </motion.div>
            <p className="text-sm text-stone-400 italic mt-8 text-center max-w-xs mx-auto">
              {t("deliverables.disclaimer")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
