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
          <Deliverables />
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
          path="/:slug"
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
