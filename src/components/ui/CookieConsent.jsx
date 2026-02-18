import React, { useState, useEffect } from "react";

import X from "lucide-react/dist/esm/icons/x";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import ChevronUp from "lucide-react/dist/esm/icons/chevron-up";
import Check from "lucide-react/dist/esm/icons/check";
import Shield from "lucide-react/dist/esm/icons/shield";
import Globe from "lucide-react/dist/esm/icons/globe";
import Info from "lucide-react/dist/esm/icons/info";

const COOKIE_STORAGE_KEY = "saltysoultrips_cookie_consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!storedConsent) {
      // Small delay to not overwhelm the user immediately
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // If consent exists, we can load it to state if needed,
      // but we don't need to show the banner.
      try {
        setPreferences(JSON.parse(storedConsent));
      } catch (e) {
        console.error("Error parsing cookie preferences", e);
      }
    }
  }, []);

  const savePreferences = (newPreferences) => {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setIsVisible(false);

    // Here you would trigger any callbacks to initialize scripts based on consent
    // e.g. initializeAnalytics(newPreferences.analytics);
  };

  const handleAcceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleRejectNonEssential = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const togglePreference = (key) => {
    if (key === "necessary") return; // Cannot toggle necessary
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white/95 backdrop-blur-sm border-t border-brand-sand shadow-2xl transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-serif text-stone-800 font-medium flex items-center gap-2">
                <span className="text-xl">🍪</span> Valoramos tu privacidad
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
                Utilizamos cookies propias y de terceros para mejorar tu
                experiencia, analizar el tráfico y mostrarte contenido
                personalizado. Puedes aceptar todas las cookies, rechazarlas o
                configurarlas a tu gusto.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto min-w-fit">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap"
              >
                Configurar
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-4 py-2 text-sm font-medium text-brand-sage border border-brand-sage hover:bg-brand-sage/10 rounded-lg transition-colors whitespace-nowrap"
              >
                Rechazar no esenciales
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-sage hover:bg-[#A9C2AD] rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between border-b border-brand-sand pb-4">
              <h3 className="text-lg font-serif text-stone-800 font-medium">
                Configuración de Cookies
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Necessary */}
              <div className="p-4 rounded-xl border border-brand-sage/30 bg-brand-sage/5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-stone-800 font-medium">
                    <Shield className="w-4 h-4 text-brand-sage" />
                    Necesarias
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-brand-sage bg-white px-2 py-0.5 rounded-full border border-brand-sage/20">
                    <Check className="w-3 h-3" /> Siempre activas
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Estas cookies son esenciales para que el sitio web funcione
                  correctamente. No se pueden desactivar.
                </p>
              </div>

              {/* Analytics */}
              <div
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  preferences.analytics
                    ? "border-brand-sage bg-brand-sage/5"
                    : "border-stone-200 hover:border-brand-sage/50"
                }`}
                onClick={() => togglePreference("analytics")}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-stone-800 font-medium">
                    <Globe className="w-4 h-4 text-stone-600" />
                    Analíticas
                  </div>
                  <div
                    className={`w-10 h-5 rounded-full relative transition-colors ${
                      preferences.analytics ? "bg-brand-sage" : "bg-stone-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all transform ${
                        preferences.analytics ? "left-6" : "left-1"
                      }`}
                    />
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Nos ayudan a entender cómo interactúas con la web para mejorar
                  la experiencia de usuario.
                </p>
              </div>

              {/* Marketing */}
              <div
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  preferences.marketing
                    ? "border-brand-sage bg-brand-sage/5"
                    : "border-stone-200 hover:border-brand-sage/50"
                }`}
                onClick={() => togglePreference("marketing")}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-stone-800 font-medium">
                    <Info className="w-4 h-4 text-stone-600" />
                    Marketing
                  </div>
                  <div
                    className={`w-10 h-5 rounded-full relative transition-colors ${
                      preferences.marketing ? "bg-brand-sage" : "bg-stone-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all transform ${
                        preferences.marketing ? "left-6" : "left-1"
                      }`}
                    />
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Se utilizan para mostrarte publicidad relevante según tus
                  intereses y navegación.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-brand-sand">
              <button
                onClick={handleRejectNonEssential}
                className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors"
              >
                Rechazar no esenciales
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 text-sm font-medium text-white bg-brand-sage hover:bg-[#A9C2AD] rounded-lg shadow-sm transition-colors"
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
