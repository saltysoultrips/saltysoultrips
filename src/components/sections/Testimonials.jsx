import React, { useRef, useEffect, useState } from "react";
import Star from "lucide-react/dist/esm/icons/star";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import { useTranslation } from "react-i18next";

const fallbackExperiences = [
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
    destination: "Disneyland Paris",
    text: "Experiencia muy buena sin duda volvere a contactar",
    rating: 5,
    image: null,
    date: "Agosto 2025",
  },
];

import { client, urlFor } from "../../lib/sanity";

export default function Testimonials() {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [experiences, setExperiences] = useState(fallbackExperiences);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const query = '*[_type == "testimonial"]';
        const sanityTestimonials = await client.fetch(query);

        if (sanityTestimonials && sanityTestimonials.length > 0) {
          const mappedTestimonials = sanityTestimonials.map((t) => ({
            ...t,
            image: t.image ? urlFor(t.image).url() : null,
          }));
          setExperiences(mappedTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials from Sanity:", error);
        // Fallback is already set in initial state
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 bg-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(141, 201, 219, 0.4) 0%, transparent 70%)",
            opacity: 0.6,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at top right, rgba(186, 230, 253, 0.5), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm">
            {t('testimonials.label')}
          </span>
          <h2 className="text-4xl font-serif font-bold text-stone-800 mt-2 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="break-inside-avoid inline-block w-full"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-[2rem] border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative group">
                
                {/* Decorative Giant Quote Mark */}
                <div className="absolute top-4 right-6 text-9xl text-brand-sky/10 font-serif leading-none select-none z-0">
                  «
                </div>

                <div className="p-8 relative z-10">
                  {/* Author Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-sage to-brand-sky flex items-center justify-center text-white font-bold text-xl shadow-sm border-2 border-white">
                      {experience.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800 text-lg leading-tight">
                        {experience.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs font-semibold text-brand-sage uppercase tracking-wider">
                          {experience.destination}
                        </p>
                        {experience.date && (
                          <>
                            <span className="text-stone-300">•</span>
                            <p className="text-xs text-stone-400">
                              {experience.date}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(experience.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-stone-700 italic text-base leading-relaxed">
                    "{experience.text}"
                  </p>
                </div>

                {/* Optional Image Perfectly Integrated at the Bottom */}
                {experience.image && (
                  <div className="w-full h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    <img
                      src={experience.image}
                      alt={`Viaje de ${experience.name} a ${experience.destination}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
