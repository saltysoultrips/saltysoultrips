import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Destinations from "../components/sections/Destinations";
import SEOHead from "../components/SEOHead";

export default function DestinationsPage() {
  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100">
      <SEOHead
        title="Destinos de Viaje | SaltySoulTrips"
        description="Descubre todos nuestros destinos disponibles para diseñar tu viaje a medida."
        canonicalUrl="https://www.saltysoultrips.com/destinos"
      />
      <Header />
      <main className="pt-20">
        <Destinations />
      </main>
      <Footer />
    </div>
  );
}
