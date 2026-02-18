import { createClient } from "@sanity/client";
import { destinationsData } from "../src/data/destinationsData.js";

// Hardcoded testimonials from Testimonials.jsx
const testimonialsData = [
  {
    name: "Keyla",
    destination: "Le Barcarès",
    text: "La verdad todo de 10. Muy contenta, sin duda volveremos a repetir pronto.",
    rating: 5,
    date: "Julio 2025",
  },
  {
    name: "Marco Noria",
    destination: "Londres",
    text: "Todo perfecto.",
    rating: 5,
    date: "Octubre 2025",
  },
  {
    name: "Eduard Daniel",
    destination: "Cabo Verde",
    text: "Todo perfecto, la verdad.",
    rating: 5,
    date: "Agosto 2025",
  },
  {
    name: "Koraima Moreno",
    destination: "Londres",
    text: "Nada que mejorar, estoy encantada. Un trabajazo increíble y súper satisfecha.",
    rating: 5,
    date: "Agosto 2025",
  },
  {
    name: "Mario Iorga",
    destination: "Andorra",
    text: "Está muy bien, el hecho de tener los restaurantes a mano es de mucha ayuda porque muchas veces nos pasa que nos ponemos a dar vueltas buscando y con la tontería se pasan las horas.",
    rating: 5,
    date: "Julio 2025",
  },
  {
    name: "David Lobo",
    destination: "Viena y Praga",
    text: "Para mí ha sido todo de 10, las dudas que he tenido han sido solucionadas al instante. Sin ninguna duda volveré a contar con Ángela para todos mis viajes, ha sido mi gran descubrimiento este año.",
    rating: 5,
    date: "Septiembre 2025",
  },
  {
    name: "Modesta",
    destination: "Viena y Praga",
    text: "Que maravilla de viaje, y que bien montando Ángela, mil gracias de nuevo.",
    rating: 5,
    date: "Septiembre 2025",
  },
  {
    name: "Lidia Martínez",
    destination: "Praga",
    text: "La recomiendo 1000%. Nada que mejorar, atención y trabajo muy profesional y cercano.",
    rating: 5,
    date: "Noviembre 2025",
  },
  {
    name: "Iker Delgado",
    destination: "Bulgaria",
    text: "Experiencia de 10, el trato de Ángela ha sido perfecto en todo momento y me he sentido muy cómodo recibiendo su ayuda. Me facilitaron la vida en todo, desde el itinerario personalizado para mis días en Bulgaria y la búsqueda de vuelos según mi disponibilidad, hasta las actividades, los sitios qué ver, dónde comer, los alojamientos y el transporte.",
    rating: 5,
    date: "Diciembre 2025",
  },
  {
    name: "Beatrice",
    destination: "India y Sri Lanka",
    text: "Increible, 1 mes recorriendo la India y Srilanka, una experiencia cercana e increible. Además de organizada hasta el mínimo detalle y con amor. Pensaba que este viaje nos costaría mínimo el doble y Angela nos lo organizó con un precio increible. Mil gracias de corazón!",
    rating: 5,
    date: "Diciembre 2025",
  },
  {
    name: "Andrea Gimenez",
    destination: "Disneyland Paris",
    text: "Experiencia muy buena sin duda volvere a contactar",
    rating: 5,
    date: "Agosto 2025",
  },
];

const token = process.env.SANITY_TOKEN;
const projectId = "wzn5s2a9";
const dataset = "production";

if (!token) {
  console.error(
    "❌ Error: SANITY_TOKEN is missing. Please provide it as an environment variable.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-02-18",
  useCdn: false,
});

const migrateDestinations = async () => {
  console.log("🌍 Migrating Destinations...");

  for (const dest of destinationsData) {
    const doc = {
      _type: "destination",
      _id: `imported-${dest.slug}`, // Stable ID to avoid duplicates
      title: dest.title,
      slug: { _type: "slug", current: dest.slug },
      country: dest.country,
      region: dest.region || "Otros",
      heroSubtitle: dest.hero?.subtitle,
      heroTagline: dest.hero?.tagline,
      intro: dest.intro,
      description_larga: dest.description_larga,
      metaDescription: dest.metaDescription,
      highlights: dest.highlights?.map((h) => ({
        _key: h.title.replace(/\s+/g, "-").toLowerCase(),
        icon: h.icon,
        title: h.title,
        desc: h.desc,
      })),
      bestTime: dest.bestTime,
      about: dest.about,
      color: dest.color,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`✅ Imported: ${dest.country}`);
    } catch (err) {
      console.error(`❌ Failed to import ${dest.country}:`, err.message);
    }
  }
};

const migrateTestimonials = async () => {
  console.log("\n💬 Migrating Testimonials...");

  for (const t of testimonialsData) {
    const doc = {
      _type: "testimonial",
      name: t.name,
      destination: t.destination,
      text: t.text,
      rating: t.rating,
      date: t.date,
    };

    try {
      await client.create(doc);
      console.log(`✅ Imported testimonial from: ${t.name}`);
    } catch (err) {
      console.error(
        `❌ Failed to import testimonial from ${t.name}:`,
        err.message,
      );
    }
  }
};

const run = async () => {
  await migrateDestinations();
  await migrateTestimonials();
  console.log(
    "\n✨ Migration complete! Remember to upload images manually in Sanity Studio.",
  );
};

run();
