import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";

// Lazy load components that aren't immediately visible
const About = lazy(() => import("./components/sections/About"));
const Destinations = lazy(() => import("./components/sections/Destinations"));
const HowItWorks = lazy(() => import("./components/sections/HowItWorks"));
const Services = lazy(() => import("./components/sections/Services"));
const Testimonials = lazy(() => import("./components/sections/Testimonials"));
const ContactForm = lazy(() => import("./components/forms/ContactForm"));
const FAQ = lazy(() => import("./components/sections/FAQ"));
const Discounts = lazy(() => import("./components/sections/Discounts"));

// Lazy load destination page
const DestinationPage = lazy(() => import("./pages/DestinationPage"));

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

// Home page component with all sections
function HomePage() {
  const { hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Small delay to ensure lazy loaded components are mounted
    }
  }, [hash]);

  return (
    <div className="font-sans antialiased text-stone-800 bg-stone-50 selection:bg-brand-sage selection:text-white">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Destinations />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <ContactForm />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Discounts />
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
        <Route
          path="/:slug"
          element={
            <ScrollToTopWrapper>
              <Suspense fallback={<LoadingFallback />}>
                <DestinationPage />
              </Suspense>
            </ScrollToTopWrapper>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
