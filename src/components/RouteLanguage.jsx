import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { languageForPath } from "../lib/routes";
export default function RouteLanguage({ children }) {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const language = languageForPath(pathname);
  useLayoutEffect(() => {
    if (i18n.language !== language) i18n.changeLanguage(language);
  }, [language, i18n]);
  return i18n.language === language ? children : null;
}
