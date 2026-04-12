import React from "react";
import { motion } from "framer-motion";
import MousePointerClick from "lucide-react/dist/esm/icons/mouse-pointer-click";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 bg-white">
        {/* Soft Blue/Teal Glow - Center */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(141, 201, 219, 0.4) 0%, transparent 70%)",
            opacity: 0.6,
          }}
        />
        {/* Soft Sky Blue Glow - Top Right */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at top right, rgba(186, 230, 253, 0.5), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
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
              className="h-56 md:h-80 w-auto object-contain"
              width="600"
              height="320"
              fetchPriority="high"
            />
          </div>
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
