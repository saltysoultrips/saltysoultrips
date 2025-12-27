import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Historia", href: "#about" },
    { name: "Destinos", href: "#destinations" },
    { name: "Cómo funciona", href: "#how-it-works" },
    { name: "Packs", href: "#services" },
    { name: "Experiencias", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Descuentos", href: "#discounts" },
    { name: "Contacto", href: "#footer" },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();

    // 1. Cerramos el menú primero
    setIsOpen(false);

    // 2. Pequeño delay para que el menú se cierre antes del scroll
    setTimeout(() => {
      // 3. Extraemos el ID quitando el '#'
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        // 4. Altura del header (80px) + un poco de aire (5px)
        const headerOffset = 85;

        // 5. Calculamos la posición exacta
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        // 6. Scroll manual suave
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100); // 100ms delay para que la animación del menú termine
  };

  return (
    <nav className="fixed w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            {/* Asegúrate de que la ruta a tu logo sea correcta */}
            <img
              src="/resto/logoHorizontal.png"
              alt="SaltySoulTrips"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-stone-600 hover:text-stone-900 transition-colors text-sm uppercase tracking-wide font-medium transform hover:scale-105 duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "#contact")}
              className="bg-stone-800 text-stone-50 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Diseñar Viaje
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-800 hover:text-stone-600 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-stone-50 border-t border-stone-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="block px-4 py-3 text-stone-600 text-lg font-medium hover:bg-white hover:shadow-sm rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="block mt-6 text-center bg-stone-800 text-stone-50 px-3 py-4 rounded-xl font-medium shadow-md active:scale-95 transition-transform"
              >
                Empieza tu Viaje
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
