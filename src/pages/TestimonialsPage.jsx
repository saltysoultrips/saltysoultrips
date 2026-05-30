import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Testimonials from "../components/sections/Testimonials";
import SEOHead from "../components/SEOHead";

export default function TestimonialsPage() {
  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100">
      <SEOHead
        title="Experiencias y Reseñas | SaltySoulTrips"
        description="Lee las opiniones y experiencias de otros viajeros que han confiado en nosotros para diseñar su viaje."
        canonicalUrl="https://www.saltysoultrips.com/experiencias"
      />
      <Header />
      <main className="pt-20">
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
