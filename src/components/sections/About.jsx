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
                src="/angela.jpeg"
                alt="Angela - Founder SaltySoulTrips"
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
            transition={{ duration: 0.8, delay: 0.2 }}
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
                  Viajar no es simplemente lo que hago, es la esencia de lo que
                  soy. Desde pequeña, mi maleta siempre ha estado lista para lo
                  inesperado. He aprendido que el mundo no se entiende mirándolo
                  desde una ventana, sino caminando sus calles, probando sus
                  sabores y escuchando a su gente.
                </p>
                <p>
                  Cada sello en mi pasaporte es una historia, un aprendizaje y
                  una razón más para seguir explorando.
                </p>
                <div className="bg-stone-50 p-8 rounded-2xl border-l-4 border-brand-sage my-8 shadow-sm">
                  <p className="text-stone-800 font-medium italic text-xl leading-relaxed">
                    "SaltySoulTrips nace de una ilusión genuina: unir mi pasión
                    por descubrir rincones auténticos con mis ganas de que tú
                    también vivas el viaje de tu vida. Sin agobios, solo
                    disfrute."
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
                Sin filtros. Sin guiones.
              </h3>

              <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed">
                <p>
                  <strong>¿Turista o viajero?</strong> En SaltySoulTrips
                  elegimos perdernos para encontrarnos. Preferimos los caminos
                  de tierra a las autopistas turísticas. Buscamos esa cafetería
                  escondida donde solo van los locales y esa playa virgen donde
                  el único ruido es el mar.
                </p>
                <p>
                  Olvídate de los catálogos estandarizados. Diseño experiencias
                  desde el corazón, cuidando cada detalle para que tu viaje no
                  solo sea bonito,
                  <span className="text-stone-800 font-medium">
                    {" "}
                    sino absolutamente inolvidable.
                  </span>
                </p>
                <p className="text-xl font-medium text-brand-sage mt-6">
                  Viajar con propósito. Viajar con alma.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
