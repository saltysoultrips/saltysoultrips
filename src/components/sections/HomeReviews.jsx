import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Star from "lucide-react/dist/esm/icons/star";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";

export default function HomeReviews() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const reviews = [
    {
      name: "Keyla",
      destination: "Le Barcarès",
      text: isEn
        ? "Honestly everything was a 10/10. So happy, we will definitely repeat soon."
        : "La verdad todo de 10. Muy contenta, sin duda volveremos a repetir pronto.",
      rating: 5,
      image: "/reseñas/keylareseña.jpg",
      date: isEn ? "July 2025" : "Julio 2025",
    },
    {
      name: "Lidia Martínez",
      destination: "Praga",
      text: isEn
        ? "I recommend them 1000%. Nothing to improve, very professional and close attention and work."
        : "La recomiendo 1000%. Nada que mejorar, atención y trabajo muy profesional y cercano.",
      rating: 5,
      image: "/reseñas/lidiareseña.jpg",
      date: isEn ? "November 2025" : "Noviembre 2025",
    },
    {
      name: "Marco Noria",
      destination: "Londres",
      text: isEn
        ? "Everything was completely perfect. Fast, attentive, and great peace of mind."
        : "Todo perfecto. Una experiencia impecable, rápida y con total tranquilidad.",
      rating: 5,
      image: "/reseñas/marcoreseña.jpeg",
      date: isEn ? "October 2025" : "Octubre 2025",
    },
  ];

  return (
    <section className="py-24 bg-sand-200/40 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-300/60 text-sand-800 text-xs font-semibold tracking-wider uppercase mb-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" stroke="none" />
                ))}
              </div>
              <span>5.0 / 5 · {isEn ? "Traveler Rating" : "Opiniones Reales"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-dark leading-tight">
              {isEn ? "What our travelers say" : "Lo que dicen nuestros viajeros"}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-dark/70 font-light leading-relaxed">
              {isEn
                ? "Real experiences from people who trusted SaltySoulTrips to organize their dream trip."
                : "Experiencias reales de personas que han confiado en SaltySoulTrips para organizar su viaje soñado."}
            </p>
          </div>

          <Link
            to={isEn ? "/experiences" : "/experiencias"}
            className="inline-flex items-center gap-2 text-brand-dark font-medium hover:text-sand-700 transition-colors group self-start md:self-end text-sm sm:text-base whitespace-nowrap"
          >
            <span>{isEn ? "View all reviews" : "Ver todas las experiencias"}</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="h-full flex"
            >
              <div className="flex flex-col justify-between w-full bg-white/90 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative group">
                {/* Decorative Giant Quote Mark */}
                <div className="absolute top-4 right-6 text-8xl text-brand-sky/20 font-serif leading-none select-none z-0 pointer-events-none">
                  «
                </div>

                <div className="p-8 relative z-10 flex flex-col flex-1">
                  {/* Author Header - Profile circle with initial from Experiencias */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-sage to-brand-sky flex items-center justify-center text-white font-bold text-xl shadow-sm border-2 border-white shrink-0">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800 text-lg leading-tight">
                        {rev.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs font-semibold text-brand-sage uppercase tracking-wider">
                          {rev.destination}
                        </p>
                        {rev.date && (
                          <>
                            <span className="text-stone-300">•</span>
                            <p className="text-xs text-stone-400">
                              {rev.date}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-stone-700 italic text-base leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
