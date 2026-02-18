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
import SEOHead from "./components/SEOHead";
import LazySection from "./components/utils/LazySection";

// Lazy load components that aren't immediately visible
const About = lazy(() => import("./components/sections/About"));
const Destinations = lazy(() => import("./components/sections/Destinations"));
const HowItWorks = lazy(() => import("./components/sections/HowItWorks"));
const Services = lazy(() => import("./components/sections/Services"));
const Testimonials = lazy(() => import("./components/sections/Testimonials"));
const ContactForm = lazy(() => import("./components/forms/ContactForm"));
const FAQ = lazy(() => import("./components/sections/FAQ"));
const Discounts = lazy(() => import("./components/sections/Discounts"));
const Deliverables = lazy(() => import("./components/sections/Deliverables"));

// Lazy load destination page
const DestinationPage = lazy(() => import("./pages/DestinationPage"));

// Lazy load new pages
const NotFound = lazy(() => import("./pages/NotFound"));
const BlogList = lazy(() => import("./pages/blog/BlogList"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));

// Cookie Consent
import CookieConsent from "./components/ui/CookieConsent";

// Simple loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-12 h-12 border-4 border-brand-sage border-t-transparent rounded-full animate-spin"></div>
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

  return (
    <div className="font-sans antialiased text-stone-800 bg-stone-50 selection:bg-brand-sage selection:text-white">
      <SEOHead
        title="Viajes Personalizados a Medida | SaltySoulTrips - Itinerarios Únicos"
        description="Viajes personalizados a cualquier destino: Japón, Italia, Tailandia, Maldivas, Grecia, Tanzania y más. Itinerarios 100% a medida a precios asequibles. ⭐ 5 estrellas. ¡Diseñamos tu viaje soñado!"
        canonicalUrl="https://www.saltysoultrips.com/"
      />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <LazySection id="destinations" minHeight="800px">
            <Destinations />
          </LazySection>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <LazySection id="how-it-works" minHeight="600px">
            <HowItWorks />
          </LazySection>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <LazySection id="services" minHeight="600px">
            <Services />
          </LazySection>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <LazySection minHeight="400px">
            <Deliverables />
          </LazySection>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <LazySection id="testimonials" minHeight="400px">
            <Testimonials />
          </LazySection>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <LazySection id="contact" minHeight="600px">
            <ContactForm />
          </LazySection>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <LazySection id="faq" minHeight="500px">
            <FAQ />
          </LazySection>
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <LazySection id="discounts" minHeight="300px">
            <Discounts />
          </LazySection>
        </Suspense>
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

        {/* Blog Routes */}
        <Route
          path="/blog"
          element={
            <ScrollToTopWrapper>
              <div className="font-sans antialiased text-stone-800 bg-stone-50 selection:bg-brand-sage selection:text-white">
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
              <div className="font-sans antialiased text-stone-800 bg-stone-50 selection:bg-brand-sage selection:text-white">
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

        {/* 404 Catch-all */}
        <Route
          path="*"
          element={
            <ScrollToTopWrapper>
              <div className="font-sans antialiased text-stone-800 bg-stone-50 selection:bg-brand-sage selection:text-white">
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
