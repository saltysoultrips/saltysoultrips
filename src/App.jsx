import React, { lazy, Suspense } from "react";
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

// Simple loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-12 h-12 border-4 border-brand-sage border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
