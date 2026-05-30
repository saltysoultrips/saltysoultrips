import React, { lazy, Suspense } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import SEOHead from "./components/SEOHead";

// Lazy load new pages
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const DestinationsPage = lazy(() => import("./pages/DestinationsPage"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const DiscountsPage = lazy(() => import("./pages/DiscountsPage"));
const DestinationPage = lazy(() => import("./pages/DestinationPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BlogList = lazy(() => import("./pages/blog/BlogList"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));

// Cookie Consent
import CookieConsent from "./components/ui/CookieConsent";

// Simple loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-12 h-12 border-4 border-sand-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Disable browser automatic scroll restoration
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// Wrapper that scrolls to top instantly before rendering children
function ScrollToTopWrapper({ children }) {
  const location = useLocation();
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);
  return children;
}

// Keep track if it's the very first load of the application
let isInitialLoad = true;

// Home page component with all sections
function HomePage() {
  const { hash } = useLocation();
  const navType = useNavigationType(); // "POP", "PUSH", "REPLACE"

  React.useEffect(() => {
    // Check if it's a browser reload
    const navEntry = performance.getEntriesByType("navigation")[0];
    const isBrowserReload = navEntry?.type === "reload";

    // Only block scroll if it's the initial load AND a reload AND a POP event
    if (isInitialLoad) {
      isInitialLoad = false;
      if (isBrowserReload && navType === "POP" && hash) {
        window.history.replaceState(null, "", window.location.pathname);
        window.scrollTo(0, 0);
        return;
      }
    }

    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // Clear hash from URL after scrolling to keep it clean
          setTimeout(() => {
            window.history.replaceState(null, "", window.location.pathname);
          }, 1000);
        }
      }, 100);
    }
  }, [hash, navType]);

  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "SaltySoulTrips",
    image: "https://www.saltysoultrips.com/resto/logo.png",
    "@id": "https://www.saltysoultrips.com",
    url: "https://www.saltysoultrips.com",
    telephone: "+34611794842",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barcelona",
      addressRegion: "Barcelona",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.3851,
      longitude: 2.1734,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      "https://www.instagram.com/saltysoultrips/",
      "https://www.tiktok.com/@saltysoultrips",
    ],
    priceRange: "$$",
  };

  const productSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Paquete Explora - Itinerario de Viaje Personalizado",
      description:
        "Itinerario digital completo con transporte, alojamiento y actividades recomendadas.",
      brand: {
        "@type": "Brand",
        name: "SaltySoulTrips",
      },
      offers: {
        "@type": "Offer",
        url: "https://www.saltysoultrips.com/servicios",
        priceCurrency: "EUR",
        price: "50",
        availability: "https://schema.org/InStock",
      },
    },
  ];

  const homeSchema = [travelAgencySchema, ...productSchema];

  return (
    <div className="font-sans antialiased text-brand-dark bg-sand-100 selection:bg-sand-400 selection:text-white">
      <SEOHead
        title="Viajes Personalizados a Medida | SaltySoulTrips - Itinerarios Únicos"
        description="Viajes personalizados a cualquier destino: Japón, Italia, Tailandia, Maldivas, Grecia, Tanzania y más. Itinerarios 100% a medida a precios asequibles. ⭐ 5 estrellas. ¡Diseñamos tu viaje soñado!"
        canonicalUrl="https://www.saltysoultrips.com/"
        schemaData={homeSchema}
      />
      <Header />
      <main>
        <Hero />
        <div id="filosofia">
          <About />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* New Multi-page Routes */}
        <Route path="/servicios" element={<ScrollToTopWrapper><ServicesPage /></ScrollToTopWrapper>} />
        <Route path="/services" element={<ScrollToTopWrapper><ServicesPage /></ScrollToTopWrapper>} />
        
        <Route path="/descuentos" element={<ScrollToTopWrapper><DiscountsPage /></ScrollToTopWrapper>} />
        <Route path="/discounts" element={<ScrollToTopWrapper><DiscountsPage /></ScrollToTopWrapper>} />
        
        <Route path="/contacto" element={<ScrollToTopWrapper><ContactPage /></ScrollToTopWrapper>} />
        <Route path="/contact" element={<ScrollToTopWrapper><ContactPage /></ScrollToTopWrapper>} />
        
        <Route path="/destinos" element={<ScrollToTopWrapper><DestinationsPage /></ScrollToTopWrapper>} />
        <Route path="/destinations" element={<ScrollToTopWrapper><DestinationsPage /></ScrollToTopWrapper>} />
        
        <Route path="/como-funciona" element={<ScrollToTopWrapper><HowItWorksPage /></ScrollToTopWrapper>} />
        <Route path="/how-it-works" element={<ScrollToTopWrapper><HowItWorksPage /></ScrollToTopWrapper>} />
        
        <Route path="/experiencias" element={<ScrollToTopWrapper><TestimonialsPage /></ScrollToTopWrapper>} />
        <Route path="/experiences" element={<ScrollToTopWrapper><TestimonialsPage /></ScrollToTopWrapper>} />

        {/* Blog Routes */}
        <Route
          path="/blog"
          element={
            <ScrollToTopWrapper>
              <div className="font-sans antialiased text-brand-dark bg-sand-100 selection:bg-sand-400 selection:text-white">
                <Header />
                <BlogList />
                <Footer />
              </div>
            </ScrollToTopWrapper>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <ScrollToTopWrapper>
              <div className="font-sans antialiased text-brand-dark bg-sand-100 selection:bg-sand-400 selection:text-white">
                <Header />
                <BlogPost />
                <Footer />
              </div>
            </ScrollToTopWrapper>
          }
        />

        {/* Dynamic Destination Pages */}
        <Route
          path="/destinos/:slug"
          element={
            <ScrollToTopWrapper>
              <DestinationPage />
            </ScrollToTopWrapper>
          }
        />
        <Route
          path="/destinations/:slug"
          element={
            <ScrollToTopWrapper>
              <DestinationPage />
            </ScrollToTopWrapper>
          }
        />

        {/* 404 Catch-all */}
        <Route
          path="*"
          element={
            <ScrollToTopWrapper>
              <div className="font-sans antialiased text-brand-dark bg-sand-100 selection:bg-sand-400 selection:text-white">
                <Header />
                <NotFound />
                <Footer />
              </div>
            </ScrollToTopWrapper>
          }
        />
      </Routes>
      <CookieConsent />
    </Suspense>
  );
}

export default App;
