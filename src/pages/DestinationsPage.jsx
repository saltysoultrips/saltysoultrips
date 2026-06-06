import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Destinations from "../components/sections/Destinations";
import SEOHead from "../components/SEOHead";

export default function DestinationsPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100">
      <SEOHead
        title={t("seo.destinations.title", "Destinos de Viaje | SaltySoulTrips")}
        description={t("seo.destinations.description", "Descubre todos nuestros destinos disponibles para diseñar tu viaje a medida.")}
        canonicalUrl={`https://www.saltysoultrips.com/${isEn ? 'destinations' : 'destinos'}`}
        esUrl="https://www.saltysoultrips.com/destinos"
        enUrl="https://www.saltysoultrips.com/destinations"
      />
      <Header />
      <main className="pt-20">
        <Destinations />
      </main>
      <Footer />
    </div>
  );
}
