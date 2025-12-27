import React, { useRef, useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const experiences = [
  {
    name: "Keyla",
    destination: "Le Barcarès",
    text: "La verdad todo de 10. Muy contenta, sin duda volveremos a repetir pronto.",
    rating: 5,
    image: "/reseñas/keylareseña.jpg",
    date: "Julio 2025",
  },
  {
    name: "Marco Noria",
    destination: "Londres",
    text: "Todo perfecto.",
    rating: 5,
    image: "/reseñas/marcoreseña.jpeg",
    date: "Octubre 2025",
  },
  {
    name: "Eduard Daniel",
    destination: "Cabo Verde",
    text: "Todo perfecto, la verdad.",
    rating: 5,
    image: null,
    date: "Agosto 2025",
  },
  {
    name: "Koraima Moreno",
    destination: "Londres",
    text: "Nada que mejorar, estoy encantada. Un trabajazo increíble y súper satisfecha.",
    rating: 5,
    image: null,
    date: "Agosto 2025",
  },
  {
    name: "Mario Iorga",
    destination: "Andorra",
    text: "Está muy bien, el hecho de tener los restaurantes a mano es de mucha ayuda porque muchas veces nos pasa que nos ponemos a dar vueltas buscando y con la tontería se pasan las horas.",
    rating: 5,
    image: "/reseñas/marioreseña.jpg",
    date: "Julio 2025",
  },
  {
    name: "David Lobo",
    destination: "Viena y Praga",
    text: "Para mí ha sido todo de 10, las dudas que he tenido han sido solucionadas al instante. Sin ninguna duda volveré a contar con Ángela para todos mis viajes, ha sido mi gran descubrimiento este año.",
    rating: 5,
    image: "/reseñas/davidreseña.jpg",
    date: "Septiembre 2025",
  },
  {
    name: "Modesta",
    destination: "Viena y Praga",
    text: "Que maravilla de viaje, y que bien montando Ángela, mil gracias de nuevo.",
    rating: 5,
    image: null,
    date: "Septiembre 2025",
  },
  {
    name: "Lidia Martínez",
    destination: "Praga",
    text: "La recomiendo 1000%. Nada que mejorar, atención y trabajo muy profesional y cercano.",
    rating: 5,
    image: "/reseñas/lidiareseña.jpg",
    date: "Noviembre 2025",
  },
  {
    name: "Iker Delgado",
    destination: "Bulgaria",
    text: "Experiencia de 10, el trato de Ángela ha sido perfecto en todo momento y me he sentido muy cómodo recibiendo su ayuda. Me facilitaron la vida en todo, desde el itinerario personalizado para mis días en Bulgaria y la búsqueda de vuelos según mi disponibilidad, hasta las actividades, los sitios qué ver, dónde comer, los alojamientos y el transporte.",
    rating: 5,
    image: "/reseñas/ikerreseña.jpeg",
    date: "Diciembre 2025",
  },
  {
    name: "Beatrice",
    destination: "India y Sri Lanka",
    text: "Increible, 1 mes recorriendo la India y Srilanka, una experiencia cercana e increible. Además de organizada hasta el mínimo detalle y con amor. Pensaba que este viaje nos costaría mínimo el doble y Angela nos lo organizó con un precio increible. Mil gracias de corazón!",
    rating: 5,
    image: "/reseñas/beatricereseña.jpeg",
    date: "Diciembre 2025",
  },
  {
    name: "Andrea Gimenez",
    destination: "Viajera",
    text: "Experiencia muy buena sin duda volvere a contactar",
    rating: 5,
    image: null,
    date: "Agosto 2025",
  },
];

export default function Testimonials() {
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        // If we're at the end, scroll back to the beginning
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          // Otherwise, scroll to the next item
          scroll("right");
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-br from-stone-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-sage/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm">
            Experiencias
          </span>
          <h2 className="text-4xl font-serif font-bold text-stone-800 mt-2 mb-4">
            Lo que dicen nuestros viajeros
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Testimonios reales de personas que han confiado en SaltySoulTrips
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Navigation Buttons - Desktop */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-brand-sage transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft className="text-stone-700" size={24} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl hover:bg-brand-sage transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Siguiente"
          >
            <ChevronRight className="text-stone-700" size={24} />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[350px] md:w-[400px] snap-center"
              >
                <div className="bg-white rounded-3xl border border-stone-200 hover:border-brand-sage hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="p-8 flex flex-col flex-grow">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(experience.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-stone-700 mb-6 italic text-lg leading-relaxed flex-grow">
                      «{experience.text}»
                    </p>

                    {/* Optional Image between text and author */}
                    {experience.image && (
                      <div className="mb-6 rounded-lg overflow-hidden">
                        <img
                          src={experience.image}
                          alt={`Experiencia de ${experience.name}`}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-stone-100">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-sage to-brand-sky flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {experience.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-800">
                          {experience.name}
                        </h4>
                        <p className="text-xs text-stone-500">
                          {experience.destination}
                        </p>
                        {experience.date && (
                          <p className="text-xs text-stone-400 mt-0.5">
                            {experience.date}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile scroll indicator */}
          <div className="md:hidden text-center mt-6">
            <p className="text-sm text-stone-500 italic">
              ← Desliza para ver más →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
