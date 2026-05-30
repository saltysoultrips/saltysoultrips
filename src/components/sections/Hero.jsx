import React from "react";
import { motion } from "framer-motion";
import MousePointerClick from "lucide-react/dist/esm/icons/mouse-pointer-click";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Dynamic Background Image - Using a cleaner coastal/ocean landscape */}
      <div className="absolute inset-0 z-0 bg-sand-900">
        <img
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop"
          alt="Paisaje costa premium"
          className="w-full h-full object-cover scale-105 animate-[float_20s_ease-in-out_infinite] opacity-80"
        />
        {/* Stronger overlay for perfect white text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="p-8 md:p-12 max-w-3xl w-full mx-auto"
        >
          <div className="mb-8 flex justify-center">
            {/* Logo */}
            <img
              src="/resto/logo.png"
              alt="Saltysoultrips"
              className="h-32 md:h-48 w-auto object-contain filter brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              width="600"
              height="320"
              fetchPriority="high"
            />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {t('hero.title')} <br/>
            <span className="text-sand-300 italic font-light">{t('hero.titleItalic')}</span>
          </h1>
          <p className="text-white text-lg md:text-xl font-medium mb-10 text-balance max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => {
                navigate("/contacto");
                window.scrollTo(0, 0);
              }}
              className="group relative px-8 py-4 bg-sand-600 text-white text-lg font-medium rounded-full shadow-[0_0_15px_rgba(206,150,94,0.3)] hover:shadow-[0_0_25px_rgba(206,150,94,0.5)] hover:bg-sand-700 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t('hero.startTrip')} <MousePointerClick size={18} className="group-hover:rotate-12 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => {
                navigate("/experiencias");
                window.scrollTo(0, 0);
              }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white text-lg font-medium rounded-full hover:bg-white/20 transition-all duration-300 w-full sm:w-auto shadow-sm"
            >
              {t('hero.seeExperiences')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
