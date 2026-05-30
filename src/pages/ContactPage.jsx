import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ContactForm from "../components/forms/ContactForm";
import FAQ from "../components/sections/FAQ";
import SEOHead from "../components/SEOHead";

export default function ContactPage() {
  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100">
      <SEOHead
        title="Contacto y FAQ | SaltySoulTrips"
        description="Ponte en contacto con nosotros para empezar a diseñar tu próximo viaje. Resuelve tus dudas en nuestra sección de preguntas frecuentes."
        canonicalUrl="https://www.saltysoultrips.com/contacto"
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
