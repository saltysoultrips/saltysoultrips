import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  analyticsAllowed,
  applyAnalyticsConsent,
  trackEvent,
  trackPageView,
} from "../lib/analytics";
export default function Analytics() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  useEffect(() => {
    applyAnalyticsConsent(analyticsAllowed());
    const handleClick = (event) => {
      const href = event.target.closest?.("a")?.getAttribute("href") || "";
      if (href.startsWith("tel:"))
        trackEvent("contact_click", { method: "phone" });
      if (href.startsWith("mailto:"))
        trackEvent("contact_click", { method: "email" });
      if (href.startsWith("https://wa.me/"))
        trackEvent("contact_click", { method: "whatsapp" });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  useEffect(() => {
    if (previousPath.current !== pathname) {
      trackPageView();
      previousPath.current = pathname;
    }
  }, [pathname]);
  return null;
}
