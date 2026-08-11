import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import Globe from "lucide-react/dist/esm/icons/globe";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isEn = i18n.language === 'en';

  const navLinks = [
    { name: t("header.nav.paquetes"), href: isEn ? "/packages" : "/paquetes" },
    { name: t("header.nav.experiencias"), href: isEn ? "/experiences" : "/experiencias" },
    { name: t("header.nav.descuentos"), href: isEn ? "/discounts" : "/descuentos" },
    { name: t("header.nav.blog"), href: "/blog" },
    { name: t("header.nav.contacto"), href: isEn ? "/contact" : "/contacto" },
  ];

  const handleNavigation = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            const headerOffset = 85;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }, 500);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 85;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);

    // Auto-redirect to the translated URL path for static pages
    const currentPath = location.pathname;
    
    const esToEn = {
      '/paquetes': '/packages',
      '/servicios': '/services',
      '/experiencias': '/experiences',
      '/descuentos': '/discounts',
      '/contacto': '/contact'
    };
    
    const enToEs = {
      '/packages': '/paquetes',
      '/services': '/servicios',
      '/experiences': '/experiencias',
      '/discounts': '/descuentos',
      '/contact': '/contacto'
    };
    
    if (newLang === 'en' && esToEn[currentPath]) {
      navigate(esToEn[currentPath], { replace: true });
    } else if (newLang === 'es' && enToEs[currentPath]) {
      navigate(enToEs[currentPath], { replace: true });
    }
  };

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !isScrolled;

  const headerBgClass = isTransparent
    ? "bg-transparent border-transparent"
    : "bg-sand-100/95 backdrop-blur-md border-b border-sand-200 shadow-sm";

  const textColorClass = isTransparent
    ? "text-white hover:text-sand-200 drop-shadow-md"
    : "text-brand-dark hover:text-sand-600";

  const logoClass = isTransparent
    ? "filter brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
    : "filter drop-shadow-sm sepia-[.2] hue-rotate-[-10deg]";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img
              src="/resto/logoHorizontal.png"
              alt="SaltySoulTrips"
              className={`h-12 w-auto transition-all duration-300 ${logoClass}`}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-5 xl:space-x-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className={`${textColorClass} transition-colors text-sm uppercase tracking-wide font-medium transform hover:scale-105 duration-200`}
              >
                {link.name}
              </a>
            ))}
            
            {/* Desktop Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`${textColorClass} flex items-center gap-1.5 ml-2 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all`}
              aria-label="Change language"
            >
              <Globe size={16} />
              <span className="text-sm font-bold">{t("header.langSwitcher")}</span>
            </button>
          </div>

          {/* Mobile Menu Button & Lang Switcher */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className={`${textColorClass} flex items-center gap-1 p-2`}
              aria-label="Change language"
            >
              <Globe size={20} />
              <span className="text-sm font-bold">{t("header.langSwitcher")}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${textColorClass} transition-colors p-2`}
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
            className="lg:hidden bg-sand-100 border-t border-sand-200 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="block px-4 py-3 text-brand-dark text-lg font-medium hover:bg-sand-200 hover:shadow-sm rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={isEn ? "/contact" : "/contacto"}
                onClick={(e) => handleNavigation(e, isEn ? "/contact" : "/contacto")}
                className="block mt-6 text-center bg-brand-dark text-sand-100 px-3 py-4 rounded-xl font-medium shadow-md active:scale-95 transition-transform"
              >
                {t("header.empiezaViaje")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
