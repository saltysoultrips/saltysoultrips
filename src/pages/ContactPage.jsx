import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ContactForm from "../components/forms/ContactForm";
import FAQ from "../components/sections/FAQ";
import SEOHead from "../components/SEOHead";

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100">
      <SEOHead
        title={t("seo.contact.title", "Contacto y FAQ | SaltySoulTrips")}
        description={t("seo.contact.description", "Ponte en contacto con nosotros para empezar a diseñar tu próximo viaje. Resuelve tus dudas en nuestra sección de preguntas frecuentes.")}
        canonicalUrl={`https://www.saltysoultrips.com/${isEn ? 'contact' : 'contacto'}`}
        esUrl="https://www.saltysoultrips.com/contacto"
        enUrl="https://www.saltysoultrips.com/contact"
      />
      <Header />
      <main className="pt-20">
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
