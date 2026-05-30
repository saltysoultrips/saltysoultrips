import React from "react";
import { motion } from "framer-motion";
import Compass from "lucide-react/dist/esm/icons/compass";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-24 bg-sand-200 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sand-300 rounded-bl-full opacity-50 -z-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-sage rounded-tr-full opacity-30 -z-10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Visuals Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=600&auto=format&fit=crop"
                  alt="Destino premium"
                  className="rounded-2xl shadow-xl w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop"
                  alt="Playa tropical"
                  className="rounded-2xl shadow-xl w-full h-64 object-cover"
                />
              </div>
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop"
                  alt="Aventura en la montaña"
                  className="rounded-2xl shadow-xl w-full h-64 object-cover"
                />
                <div className="glass rounded-2xl p-6 shadow-xl flex items-center justify-center h-48">
                  <div className="text-center">
                    <p className="text-4xl font-serif font-bold text-sand-800">100%</p>
                    <p className="text-sm font-medium text-sand-600 uppercase tracking-widest mt-2">{t('about.customLabel')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-10"
          >
            <div>
              <span className="text-sand-600 font-semibold tracking-wider uppercase text-sm block mb-3">
                {t('about.label')}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6 leading-tight">
                {t('about.title')} <br />
                <span className="text-sand-600 italic">{t('about.titleItalic')}</span>
              </h2>
              <div className="space-y-6 text-lg text-brand-dark font-light leading-relaxed text-balance">
                <p>
                  {t('about.description')}
                </p>
                <div className="glass p-8 rounded-3xl border border-white/40">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <span className="text-sand-600 bg-sand-200 p-1 rounded-full"><Compass size={20} /></span>
                      <span className="text-brand-dark">
                        <strong>{t('about.point1')}</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-sand-600 bg-sand-200 p-1 rounded-full"><Compass size={20} /></span>
                      <span className="text-brand-dark">
                        <strong>{t('about.point2')}</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-sand-600 bg-sand-200 p-1 rounded-full"><Compass size={20} /></span>
                      <span className="text-brand-dark">
                        <strong>{t('about.point3')}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-sand-300 pt-8">
              <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">
                {t('about.tagline')}
              </h3>
              <div className="space-y-4 text-brand-dark font-light leading-relaxed">
                <p className="text-xl font-medium text-sand-800">
                  {t('about.taglineText1')}
                </p>
                <p>{t('about.taglineText2')}</p>
                <p>
                  {t('about.taglineText3')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
