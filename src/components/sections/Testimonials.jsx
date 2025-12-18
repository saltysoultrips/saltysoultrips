import React from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sofia & Marc",
    trip: "Luna de Miel en Bali",
    text: "Angela entendió perfectamente lo que buscábamos. Hoteles boutique preciosos lejos de las multitudes. Fue el viaje de nuestras vidas.",
    rating: 5,
  },
  {
    name: "Elena R.",
    trip: "Escapada a Nueva York",
    text: "Tener la guía digital con recomendaciones de restaurantes locales fue un salvavidas. Comimos increíble gracias a sus tips.",
    rating: 5,
  },
  {
    name: "Familia García",
    trip: "Costa Rica Aventura",
    text: "Viajar con niños puede ser estresante, pero todo estaba tan bien organizado que solo tuvimos que preocuparnos de disfrutar.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Decorative quotes background */}
      <Quote className="absolute top-10 left-10 text-stone-100 w-64 h-64 -rotate-12 -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm">
            Reseñas
          </span>
          <h2 className="text-4xl font-serif font-bold text-stone-800 mt-2">
            Lo que dicen nuestros viajeros
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-stone-50 p-8 rounded-3xl relative border border-stone-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-brand-sage fill-brand-sage"
                  />
                ))}
              </div>
              <p className="text-stone-600 mb-6 italic text-lg leading-relaxed">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-stone-200 pt-6">
                <div className="w-10 h-10 rounded-full bg-brand-sand/50 flex items-center justify-center text-stone-700 font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 text-sm">
                    {review.name}
                  </h4>
                  <p className="text-xs text-stone-500 uppercase tracking-wide">
                    {review.trip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
