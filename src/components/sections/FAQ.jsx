import React, { useState, useEffect } from "react";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import HelpCircle from "lucide-react/dist/esm/icons/help-circle";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "../../lib/sanity";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const query =
          '*[_type == "faq"] | order(order asc){ question, answer }';
        const sanityFaqs = await client.fetch(query);

        if (sanityFaqs && sanityFaqs.length > 0) {
          setFaqs(sanityFaqs);
        }
      } catch (error) {
        console.error("Error fetching FAQs from Sanity:", error);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-sage/10 rounded-full mb-4">
            <HelpCircle className="text-brand-sage" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800">
            Preguntas Frecuentes
          </h2>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            Resolvemos todas tus dudas para que empieces tu viaje con total
            confianza
          </p>
          <div className="w-16 h-1 bg-brand-sage mx-auto mt-4 rounded-full"></div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 hover:border-brand-sage/30 transition-all duration-300"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none group"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-stone-800 font-medium text-base md:text-lg group-hover:text-brand-sage transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown
                    className={`transition-colors ${
                      openIndex === index
                        ? "text-brand-sage"
                        : "text-stone-400 group-hover:text-brand-sage"
                    }`}
                    size={24}
                  />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-stone-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-stone-800 rounded-2xl p-8 md:p-10"
        >
          <h3 className="text-2xl font-serif font-bold text-white mb-3">
            ¿Tienes alguna otra pregunta?
          </h3>
          <p className="text-stone-300 mb-6 max-w-lg mx-auto">
            Estamos aquí para ayudarte. No dudes en contactarnos y te
            responderemos lo antes posible.
          </p>
          <a
            href="https://wa.me/34611794842"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-sage text-white px-6 py-3 rounded-full font-medium hover:bg-brand-sage/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Contáctanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
