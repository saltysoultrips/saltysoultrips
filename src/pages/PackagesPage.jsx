import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Packages from "../components/sections/Packages";
import SEOHead from "../components/SEOHead";

export default function PackagesPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100">
      <SEOHead
        title={t("seo.packages.title", "Paquetes de Viaje | SaltySoulTrips")}
        description={t("seo.packages.description", "Explora todos nuestros paquetes de viaje y empieza a diseñar tu viaje a medida.")}
        canonicalUrl={`https://www.saltysoultrips.com/${isEn ? 'packages' : 'paquetes'}`}
        esUrl="https://www.saltysoultrips.com/paquetes"
        enUrl="https://www.saltysoultrips.com/packages"
      />
      <Header />
      <main className="pt-20">
        <Packages />
      </main>
      <Footer />
    </div>
  );
}
