import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Discounts from "../components/sections/Discounts";
import SEOHead from "../components/SEOHead";

export default function DiscountsPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100">
      <SEOHead
        title={t("seo.discounts.title", "Descuentos de Viaje | SaltySoulTrips")}
        description={t("seo.discounts.description", "Aprovecha nuestros descuentos y promociones en seguros, eSIMs y actividades.")}
        canonicalUrl={`https://www.saltysoultrips.com/${isEn ? 'discounts' : 'descuentos'}`}
        esUrl="https://www.saltysoultrips.com/descuentos"
        enUrl="https://www.saltysoultrips.com/discounts"
      />
      <Header />
      <main className="pt-20">
        <Discounts />
      </main>
      <Footer />
    </div>
  );
}
