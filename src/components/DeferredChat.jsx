import { lazy, Suspense, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
const ChatWidget = lazy(() => import("./ChatWidget"));
export default function DeferredChat() {
  const [active, setActive] = useState(false);
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  if (active)
    return (
      <Suspense
        fallback={
          <span
            role="status"
            className="fixed bottom-6 right-6 z-[60] rounded-xl bg-white p-4"
          >
            {i18n.language === "en" ? "Opening chat…" : "Abriendo chat…"}
          </span>
        }
      >
        <ChatWidget initiallyOpen />
      </Suspense>
    );
  return (
    <button
      type="button"
      aria-label={
        i18n.language === "en"
          ? "Open travel assistant"
          : "Abrir asistente de viajes"
      }
      onClick={() => setActive(true)}
      className={`fixed ${/^\/(packages|paquetes)\//.test(pathname) ? "bottom-28" : "bottom-6"} right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-[#8A7356] text-white rounded-full shadow-lg flex items-center justify-center z-40`}
    >
      <MessageCircle size={24} />
    </button>
  );
}
