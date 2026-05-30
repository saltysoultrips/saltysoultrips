import React from "react";
import { useTranslation } from "react-i18next";
import MessageSquare from "lucide-react/dist/esm/icons/message-square";
import FileText from "lucide-react/dist/esm/icons/file-text";
import CreditCard from "lucide-react/dist/esm/icons/credit-card";
import HeartHandshake from "lucide-react/dist/esm/icons/heart-handshake";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <MessageSquare size={32} className="text-stone-50" />,
      title: t("howItWorks.step1Title"),
      description: t("howItWorks.step1Desc"),
      detail: t("howItWorks.step1Detail"),
      bg: "bg-brand-sage",
    },
    {
      icon: <FileText size={32} className="text-stone-50" />,
      title: t("howItWorks.step2Title"),
      description: t("howItWorks.step2Desc"),
      detail: t("howItWorks.step2Detail"),
      bg: "bg-stone-400",
    },
    {
      icon: <CreditCard size={32} className="text-stone-50" />,
      title: t("howItWorks.step3Title"),
      description: t("howItWorks.step3Desc"),
      bg: "bg-brand-sand",
    },
    {
      icon: <HeartHandshake size={32} className="text-stone-50" />,
      title: t("howItWorks.step4Title"),
      description: t("howItWorks.step4Desc"),
      detail: t("howItWorks.step4Detail"),
      bg: "bg-stone-500",
    },
    {
      icon: <MapPin size={32} className="text-stone-50" />,
      title: t("howItWorks.step5Title"),
      description: t("howItWorks.step5Desc"),
      detail: t("howItWorks.step5Detail"),
      bg: "bg-brand-sage",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 bg-white">
        {/* Soft Blue/Teal Glow - Center */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(141, 201, 219, 0.4) 0%, transparent 70%)",
            opacity: 0.6,
          }}
        />
        {/* Soft Sky Blue Glow - Top Right */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at top right, rgba(186, 230, 253, 0.5), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-stone-800">
            {t("howItWorks.title")}
          </h2>
          <div className="w-16 h-1 bg-brand-sage mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row items-start gap-6 bg-stone-50 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md ${step.bg} ring-4 ring-white`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-stone-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-stone-700 leading-relaxed mb-2">
                    {step.description}
                  </p>
                  {step.detail && (
                    <p className="text-stone-600 leading-relaxed text-sm">
                      {step.detail}
                    </p>
                  )}
                </div>
              </div>

              {/* Connecting line for mobile */}
              {index < steps.length - 1 && (
                <div className="h-8 w-0.5 bg-stone-200 mx-8 my-0"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
