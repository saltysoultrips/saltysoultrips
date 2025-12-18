import React from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import HowItWorks from "./components/sections/HowItWorks";
import Services from "./components/sections/Services";
import ContactForm from "./components/forms/ContactForm";
import About from "./components/sections/About";
import Destinations from "./components/sections/Destinations";
import Testimonials from "./components/sections/Testimonials";

function App() {
  return (
    <div className="font-sans antialiased text-stone-800 bg-stone-50 selection:bg-brand-sage selection:text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Destinations />
        <HowItWorks />
        <Services />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
