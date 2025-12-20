import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-sage/20 rounded-full blur-[100px] opacity-70"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-brand-sky/30 rounded-full blur-[100px] opacity-70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6 flex justify-center">
            <img
              src="/logoHorizontal.png"
              alt="Saltysoultrips"
              className="h-16 w-auto object-contain"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-800 mb-6 leading-tight">
            Consultoría de viajes sin comisiones.{" "}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-stone-500 italic">
              Pagas por mi tiempo, no por tus reservas.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-stone-600 mb-10 font-light">
            No somos una agencia de viajes. Somos consultoras de optimización:
            hacemos "ingeniería inversa" de tu presupuesto para conseguir
            experiencias de lujo a precio de coste. Diseñamos tu itinerario 100%
            a medida para que viajes con libertad, estilo y control total.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="#contact"
              className="group relative px-8 py-4 bg-brand-sage text-stone-800 text-lg font-medium rounded-full shadow-lg hover:shadow-xl hover:bg-[#8dc9db] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Empieza a planear <MousePointerClick size={18} />
              </span>
            </a>
            <a
              href="#services"
              className="px-8 py-4 bg-transparent border border-stone-300 text-stone-600 text-lg font-medium rounded-full hover:bg-stone-50 hover:border-stone-400 transition-all duration-300"
            >
              Ver nuestros packs
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-stone-300 to-transparent"></div>
      </motion.div>
    </section>
  );
}
