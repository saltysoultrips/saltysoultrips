import React from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Photos & Visuals Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 relative top-0 lg:sticky lg:top-32"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/resto/angela.jpeg"
                alt="Angela - Founder SaltySoulTrips"
                loading="lazy"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"></div>

              <div className="absolute bottom-8 left-8 text-white">
                <p className="font-serif text-3xl font-bold">Angela</p>
                <div className="h-1 w-12 bg-lime-200 mt-2 mb-1"></div>
                <p className="text-sm tracking-widest uppercase opacity-90">
                  SaltySoulTrips Founder
                </p>
              </div>
            </div>

            {/* Simple decorative element instead of Quote Card */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-sage/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-7/12 space-y-16"
          >
            {/* Part 1: Who Am I */}
            <div>
              <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm block mb-3">
                Conóceme
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-6 leading-tight">
                Hola, soy Angela. <br />
                <span className="text-stone-400 text-3xl md:text-4xl block mt-2">
                  20 años. Pasaporte en mano.
                </span>
              </h2>

              <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed">
                <p>
                  Soy Ángela, tengo 20 años y estudio Marketing y Publicidad en
                  Barcelona.
                </p>
                <p>
                  A lo largo de estos años he tenido la suerte de viajar
                  bastante, gracias a mi esfuerzo, trabajo y el de mi familia.
                  Cada viaje ha sido una oportunidad para aprender, descubrir y
                  conectar.
                </p>
                <p>
                  Después de recibir tantas preguntas sobre cómo conseguía
                  buenos precios, qué lugares recomendaba o cómo organizaba
                  todo, decidí crear SaltySoulTrips. Este proyecto nace de mi
                  pasión por viajar y de las ganas de ayudar a otros sin
                  quedarse sin ahorros ni pasar horas navegando para encontrar
                  los mejores destinos, fechas y precios.
                </p>
                <div className="bg-stone-50 p-8 rounded-2xl border-l-4 border-brand-sage my-8 shadow-sm text-center">
                  <p className="text-stone-800 font-medium italic text-xl leading-relaxed">
                    SaltySoulTrips nace de una ilusión genuina y quiere mostrar
                    que
                  </p>
                  <p className="text-stone-800 font-semibold text-xl mt-4 leading-relaxed">
                    "Las mejores empresas no venden productos más baratos.
                    <br />
                    Venden transparencia en mercados opacos."
                  </p>
                  <p className="text-stone-800 font-medium italic text-xl mt-4 leading-relaxed">
                    Nosotros no inventamos los viajes. Mostramos el precio real
                    de viajar.
                  </p>
                </div>
              </div>
            </div>

            {/* Part 2: Philosophy */}
            <div className="border-t border-stone-200 pt-10">
              <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm block mb-3">
                La Filosofía
              </span>
              <h3 className="text-3xl font-serif font-bold text-stone-800 mb-6">
                SIN FILTROS, SIN COMISIONES
              </h3>

              <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed">
                <p className="text-xl font-medium text-stone-800">
                  El cliente no solo viaja, APRENDE a viajar mejor.
                </p>
                <p>No queremos que vuelvas porque no sabes hacerlo.</p>
                <p>
                  Queremos que vuelvas porque valoras nuestro conocimiento y
                  trato.
                </p>
                <p className="text-xl font-medium text-brand-sage mt-6">
                  Viajar con propósito, viajar con alma.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
