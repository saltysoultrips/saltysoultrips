import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HowItWorks from "../components/sections/HowItWorks";
import Deliverables from "../components/sections/Deliverables";
import SEOHead from "../components/SEOHead";

export default function HowItWorksPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100">
      <SEOHead
        title={t("seo.howItWorks.title", "Cómo Funciona | SaltySoulTrips")}
        description={t("seo.howItWorks.description", "Descubre cómo diseñamos tu viaje a medida paso a paso.")}
        canonicalUrl={`https://www.saltysoultrips.com/${isEn ? 'how-it-works' : 'como-funciona'}`}
        esUrl="https://www.saltysoultrips.com/como-funciona"
        enUrl="https://www.saltysoultrips.com/how-it-works"
      />
      <Header />
      <main className="pt-20">
        <HowItWorks />
        <Deliverables />
      </main>
      <Footer />
    </div>
  );
}
