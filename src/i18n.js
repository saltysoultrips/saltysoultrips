import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import esTranslation from "./locales/es.json";
import { languageForPath } from "./lib/routes";

const resources = {
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: languageForPath(window.location.pathname),
  fallbackLng: "es",
  interpolation: {
    escapeValue: false, // React ya protege contra XSS
  },
});

export default i18n;
