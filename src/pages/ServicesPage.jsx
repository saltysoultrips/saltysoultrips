import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Services from "../components/sections/Services";
import SEOHead from "../components/SEOHead";

export default function ServicesPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100">
      <SEOHead
        title={t("seo.services.title", "Packs y Servicios | SaltySoulTrips")}
        description={t("seo.services.description", "Descubre nuestros packs de diseño de viajes a medida. Elige la opción que mejor se adapte a tu estilo de viaje.")}
        canonicalUrl={`https://www.saltysoultrips.com/${isEn ? 'services' : 'servicios'}`}
        esUrl="https://www.saltysoultrips.com/servicios"
        enUrl="https://www.saltysoultrips.com/services"
      />
      <Header />
      <main className="pt-20">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
