import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-0 w-[500px] h-[500px] bg-brand-sage/20 rounded-full blur-[100px] opacity-70"></div>
        <div className="absolute bottom-[10%] right-0 w-[400px] h-[400px] bg-brand-sky/30 rounded-full blur-[100px] opacity-70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6 flex justify-center">
            <img
              src="/resto/logo.png"
              alt="Saltysoultrips"
              className="h-40 w-auto object-contain"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-800 mb-6 leading-tight">
            Viajes personalizados <br className="hidden md:block" />
          </h1>

          <p className="mt-4 text-base sm:text-lg text-brand-sage font-medium max-w-2xl mx-auto leading-relaxed">
            "Yo hago todo el trabajo pesado: busco los mejores vuelos, hoteles y
            rutas. Tú solo tienes que hacer clic y reservar con los enlaces que
            te enviaré."
          </p>
          <br></br>
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
    </section>
  );
}
