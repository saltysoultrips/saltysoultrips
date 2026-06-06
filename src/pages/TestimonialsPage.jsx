import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Testimonials from "../components/sections/Testimonials";
import SEOHead from "../components/SEOHead";

export default function TestimonialsPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100">
      <SEOHead
        title={t("seo.testimonials.title", "Experiencias y Reseñas | SaltySoulTrips")}
        description={t("seo.testimonials.description", "Lee las opiniones y experiencias de otros viajeros que han confiado en nosotros para diseñar su viaje.")}
        canonicalUrl={`https://www.saltysoultrips.com/${isEn ? 'experiences' : 'experiencias'}`}
        esUrl="https://www.saltysoultrips.com/experiencias"
        enUrl="https://www.saltysoultrips.com/experiences"
      />
      <Header />
      <main className="pt-20">
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
