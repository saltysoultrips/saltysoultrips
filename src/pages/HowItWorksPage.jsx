import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HowItWorks from "../components/sections/HowItWorks";
import Deliverables from "../components/sections/Deliverables";
import SEOHead from "../components/SEOHead";

export default function HowItWorksPage() {
  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100">
      <SEOHead
        title="Cómo Funciona | SaltySoulTrips"
        description="Descubre cómo diseñamos tu viaje a medida paso a paso."
        canonicalUrl="https://www.saltysoultrips.com/como-funciona"
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
