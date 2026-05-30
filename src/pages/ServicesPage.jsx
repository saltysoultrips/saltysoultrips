import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Services from "../components/sections/Services";
import SEOHead from "../components/SEOHead";

export default function ServicesPage() {
  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100">
      <SEOHead
        title="Packs y Servicios | SaltySoulTrips"
        description="Descubre nuestros packs de diseño de viajes a medida. Elige la opción que mejor se adapte a tu estilo de viaje."
        canonicalUrl="https://www.saltysoultrips.com/servicios"
      />
      <Header />
      <main className="pt-20">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
