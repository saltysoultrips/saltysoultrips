import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Discounts from "../components/sections/Discounts";
import SEOHead from "../components/SEOHead";

export default function DiscountsPage() {
  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100">
      <SEOHead
        title="Descuentos de Viaje | SaltySoulTrips"
        description="Aprovecha nuestros descuentos y promociones en seguros, eSIMs y actividades."
        canonicalUrl="https://www.saltysoultrips.com/descuentos"
      />
      <Header />
      <main className="pt-20">
        <Discounts />
      </main>
      <Footer />
    </div>
  );
}
