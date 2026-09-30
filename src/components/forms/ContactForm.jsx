import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { trackEvent } from "../../lib/analytics";
import Send from "lucide-react/dist/esm/icons/send";
import CheckCircle from "lucide-react/dist/esm/icons/check-circle";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import Users from "lucide-react/dist/esm/icons/users";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Euro from "lucide-react/dist/esm/icons/euro";
import Briefcase from "lucide-react/dist/esm/icons/briefcase";
import Package from "lucide-react/dist/esm/icons/package";
import User from "lucide-react/dist/esm/icons/user";
import Baby from "lucide-react/dist/esm/icons/baby";
import Plus from "lucide-react/dist/esm/icons/plus";
import Minus from "lucide-react/dist/esm/icons/minus";
import PawPrint from "lucide-react/dist/esm/icons/paw-print";
import { motion, AnimatePresence } from "framer-motion";

const COUNTRY_CODES = [
  { code: "+93", flag: "🇦🇫", name: "Afganistán" },
  { code: "+355", flag: "🇦🇱", name: "Albania" },
  { code: "+49", flag: "🇩🇪", name: "Alemania" },
  { code: "+376", flag: "🇦🇩", name: "Andorra" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "+32", flag: "🇧🇪", name: "Bélgica" },
  { code: "+591", flag: "🇧🇴", name: "Bolivia" },
  { code: "+55", flag: "🇧🇷", name: "Brasil" },
  { code: "+359", flag: "🇧🇬", name: "Bulgaria" },
  { code: "+1", flag: "🇨🇦", name: "Canadá" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "+506", flag: "🇨🇷", name: "Costa Rica" },
  { code: "+385", flag: "🇭🇷", name: "Croacia" },
  { code: "+53", flag: "🇨🇺", name: "Cuba" },
  { code: "+45", flag: "🇩🇰", name: "Dinamarca" },
  { code: "+593", flag: "🇪🇨", name: "Ecuador" },
  { code: "+20", flag: "🇪🇬", name: "Egipto" },
  { code: "+503", flag: "🇸🇻", name: "El Salvador" },
  { code: "+971", flag: "🇦🇪", name: "Emiratos Árabes Unidos" },
  { code: "+421", flag: "🇸🇰", name: "Eslovaquia" },
  { code: "+386", flag: "🇸🇮", name: "Eslovenia" },
  { code: "+34", flag: "🇪🇸", name: "España" },
  { code: "+1", flag: "🇺🇸", name: "Estados Unidos" },
  { code: "+372", flag: "🇪🇪", name: "Estonia" },
  { code: "+63", flag: "🇵🇭", name: "Filipinas" },
  { code: "+358", flag: "🇫🇮", name: "Finlandia" },
  { code: "+33", flag: "🇫🇷", name: "Francia" },
  { code: "+30", flag: "🇬🇷", name: "Grecia" },
  { code: "+502", flag: "🇬🇹", name: "Guatemala" },
  { code: "+504", flag: "🇭🇳", name: "Honduras" },
  { code: "+36", flag: "🇭🇺", name: "Hungría" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+353", flag: "🇮🇪", name: "Irlanda" },
  { code: "+354", flag: "🇮🇸", name: "Islandia" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+39", flag: "🇮🇹", name: "Italia" },
  { code: "+81", flag: "🇯🇵", name: "Japón" },
  { code: "+52", flag: "🇲🇽", name: "México" },
  { code: "+505", flag: "🇳🇮", name: "Nicaragua" },
  { code: "+47", flag: "🇳🇴", name: "Noruega" },
  { code: "+64", flag: "🇳🇿", name: "Nueva Zelanda" },
  { code: "+31", flag: "🇳🇱", name: "Países Bajos" },
  { code: "+507", flag: "🇵🇦", name: "Panamá" },
  { code: "+595", flag: "🇵🇾", name: "Paraguay" },
  { code: "+51", flag: "🇵🇪", name: "Perú" },
  { code: "+48", flag: "🇵🇱", name: "Polonia" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+1", flag: "🇵🇷", name: "Puerto Rico" },
  { code: "+44", flag: "🇬🇧", name: "Reino Unido" },
  { code: "+420", flag: "🇨🇿", name: "República Checa" },
  { code: "+1", flag: "🇩🇴", name: "República Dominicana" },
  { code: "+40", flag: "🇷🇴", name: "Rumanía" },
  { code: "+7", flag: "🇷🇺", name: "Rusia" },
  { code: "+46", flag: "🇸🇪", name: "Suecia" },
  { code: "+41", flag: "🇨🇭", name: "Suiza" },
  { code: "+66", flag: "🇹🇭", name: "Tailandia" },
  { code: "+90", flag: "🇹🇷", name: "Turquía" },
  { code: "+380", flag: "🇺🇦", name: "Ucrania" },
  { code: "+598", flag: "🇺🇾", name: "Uruguay" },
  { code: "+58", flag: "🇻🇪", name: "Venezuela" },
];

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [searchParams] = useSearchParams();
  const selectedPackage = searchParams.get("package") || "";
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      destination: searchParams.get("destination") || "",
      travelers:
        lang === "en"
          ? "Adults: 1, Children: 0, Babies: 0"
          : "Adultos: 1, Niños: 0, Bebés: 0",
      hasPets: "no",
      orientationPack: false,
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flexibleDates, setFlexibleDates] = useState(false);

  // Traveler state
  const [counts, setCounts] = useState({
    adults: 1,
    children: 0,
    babies: 0,
  });

  const watchDateStart = watch("dateStart");
  const watchHasPets = watch("hasPets");

  const [childrenAges, setChildrenAges] = useState([]);

  // Update hidden form field whenever counts, childrenAges, or lang change
  useEffect(() => {
    const agesStr =
      childrenAges.length > 0
        ? ` (${lang === "en" ? "Ages" : "Edades"}: ${childrenAges.filter((a) => a).join(", ")})`
        : "";

    if (lang === "en") {
      setValue(
        "travelers",
        `Adults: ${counts.adults}, Children: ${counts.children}${agesStr}, Babies: ${counts.babies}`,
      );
    } else {
      setValue(
        "travelers",
        `Adultos: ${counts.adults}, Niños: ${counts.children}${agesStr}, Bebés: ${counts.babies}`,
      );
    }
  }, [counts, childrenAges, setValue, lang]);

  const updateCount = (type, operation) => {
    if (type === "children") {
      if (operation === "add") {
        setChildrenAges((prevAges) => [...prevAges, ""]);
      } else if (counts.children > 0) {
        setChildrenAges((prevAges) => prevAges.slice(0, -1));
      }
    }

    setCounts((prev) => {
      const current = prev[type];
      let newValue = current;

      if (operation === "add") {
        newValue = current + 1;
      } else {
        if (type === "adults" && current > 1) newValue = current - 1;
        if (type !== "adults" && current > 0) {
          newValue = current - 1;
        }
      }

      return { ...prev, [type]: newValue };
    });
  };

  const handleAgeChange = (index, value) => {
    setChildrenAges((prev) => {
      const newAges = [...prev];
      newAges[index] = value;
      return newAges;
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      ...data,
      selectedPackage,
      phone: `${data.phoneCode || "+34"} ${data.phone}`,
      flexibleDates: flexibleDates ? "Sí" : "No", // O true/false según prefieras
    };
    delete payload.phoneCode;

    try {
      const response = await fetch(
        "https://hook.eu1.make.com/w3ouj1sbg9pv5pre39e2mvmz4ardzpr7",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok)
        throw new Error(`Submission failed: ${response.status}`);
      setIsSubmitted(true);
      trackEvent("generate_lead", { method: "form" });
      reset();
      setCounts({ adults: 1, children: 0, babies: 0 });
      setChildrenAges([]);
      setFlexibleDates(false);
    } catch (error) {
      console.error("Error submitting", error);
      setSubmitError(
        lang === "en"
          ? "Your request could not be sent. Your details are still here: please try again or contact us by WhatsApp."
          : "No hemos podido enviar tu solicitud. Conservamos tus datos: vuelve a intentarlo o contáctanos por WhatsApp.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-stone-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm">
            {t("contact.label")}
          </span>
          <h1 className="text-4xl font-serif font-bold text-stone-800 mt-2">
            {t("contact.title")}
          </h1>
          <p className="mt-4 text-lg text-stone-600">{t("contact.subtitle")}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 text-green-600">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-3xl font-serif font-bold text-stone-800 mb-4">
                {t("contact.successTitle")}
              </h3>
              <p className="text-stone-600 text-lg mb-8">
                {t("contact.successText")}
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-stone-500 hover:text-stone-800 font-medium underline underline-offset-4"
                aria-label={t("contact.sendAnother")}
              >
                {t("contact.sendAnother")}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {submitError && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 p-4 text-red-800"
                >
                  {submitError}
                </p>
              )}
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {t("contact.fullName")}
                  </label>
                  <input
                    {...register("name", {
                      required: t("contact.fullNameRequired"),
                    })}
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none transition-all"
                    placeholder={t("contact.fullNamePlaceholder")}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {t("contact.email")}
                  </label>
                  <input
                    {...register("email", {
                      required: t("contact.emailRequired"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("contact.emailInvalid"),
                      },
                    })}
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none transition-all"
                    placeholder="tucorreo@ejemplo.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {t("contact.phone")}
                  </label>
                  <div className="flex gap-2">
                    <select
                      {...register("phoneCode")}
                      className="w-1/3 px-2 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none transition-all cursor-pointer text-sm"
                      defaultValue="+34"
                    >
                      {COUNTRY_CODES.map((country, idx) => (
                        <option key={idx} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      {...register("phone", {
                        required: t("contact.phoneRequired"),
                      })}
                      type="tel"
                      className="w-2/3 px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none transition-all"
                      placeholder="600..."
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Trip Details */}
              <div className="space-y-6 pt-6 border-t border-stone-100">
                <h3 className="text-lg font-serif font-semibold text-stone-800">
                  {t("contact.tripDetails")}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {t("contact.origin")}
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-4 top-3.5 text-stone-400"
                        size={18}
                      />
                      <input
                        {...register("origin", {
                          required: t("contact.originRequired"),
                        })}
                        type="text"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none"
                        placeholder={t("contact.originPlaceholder")}
                      />
                      {errors.origin && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.origin.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {t("contact.dreamDestination")}
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-4 top-3.5 text-stone-400"
                        size={18}
                      />
                      <input
                        {...register("destination", {
                          required: t("contact.dreamDestinationRequired"),
                        })}
                        type="text"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none"
                        placeholder={t("contact.dreamDestinationPlaceholder")}
                      />
                      {errors.destination && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.destination.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="flexibleDates"
                      checked={flexibleDates}
                      onChange={(e) => {
                        setFlexibleDates(e.target.checked);
                        if (e.target.checked) {
                          setValue("dateStart", "");
                          setValue("dateEnd", "");
                        }
                      }}
                      className="w-4 h-4 text-brand-sage border-stone-300 rounded focus:ring-brand-sage cursor-pointer"
                    />
                    <label
                      htmlFor="flexibleDates"
                      className="text-sm font-medium text-stone-700 cursor-pointer"
                    >
                      {t("contact.flexibleDates")}
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        {t("contact.departureDate")}
                      </label>
                      <div className="relative">
                        <Calendar
                          className="absolute left-4 top-3.5 text-stone-400"
                          size={18}
                        />
                        <input
                          {...register("dateStart", {
                            required:
                              !flexibleDates &&
                              t("contact.departureDateRequired"),
                          })}
                          type="date"
                          disabled={flexibleDates}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none text-stone-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        {errors.dateStart && (
                          <span className="text-red-500 text-sm mt-1">
                            {errors.dateStart.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        {t("contact.returnDate")}
                      </label>
                      <div className="relative">
                        <Calendar
                          className="absolute left-4 top-3.5 text-stone-400"
                          size={18}
                        />
                        <input
                          {...register("dateEnd", {
                            required:
                              !flexibleDates && t("contact.returnDateRequired"),
                            validate: (value) => {
                              if (flexibleDates || !watchDateStart) return true;
                              return (
                                new Date(value) >= new Date(watchDateStart) ||
                                t("contact.returnDateInvalid")
                              );
                            },
                          })}
                          type="date"
                          disabled={flexibleDates}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none text-stone-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        {errors.dateEnd && (
                          <span className="text-red-500 text-sm mt-1">
                            {errors.dateEnd.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Travelers & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Custom Traveler Counter */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {t("contact.travelers")}
                    </label>
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-stone-800">
                            {t("contact.adults")}
                          </p>
                          <p className="text-xs text-stone-500">
                            {t("contact.adultsAge")}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateCount("adults", "minus")}
                            className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-50"
                            disabled={counts.adults <= 1}
                            aria-label="Decrease adults"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center font-medium text-stone-800">
                            {counts.adults}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCount("adults", "add")}
                            className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                            aria-label="Increase adults"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between border-t border-stone-200 pt-3">
                        <div>
                          <p className="font-medium text-stone-800">
                            {t("contact.children")}
                          </p>
                          <p className="text-xs text-stone-500">
                            {t("contact.childrenAge")}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateCount("children", "minus")}
                            className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-50"
                            disabled={counts.children <= 0}
                            aria-label="Decrease children"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center font-medium text-stone-800">
                            {counts.children}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCount("children", "add")}
                            className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                            aria-label="Increase children"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <AnimatePresence>
                        {counts.children > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 pb-1 space-y-3 border-t border-stone-100 mt-2">
                              <p className="text-sm font-medium text-stone-700">
                                {lang === "en"
                                  ? "Ages of the children:"
                                  : "Edades de los niños:"}
                              </p>
                              <div className="grid grid-cols-2 gap-3">
                                {childrenAges.map((age, i) => (
                                  <input
                                    key={`child-age-${i}`}
                                    type="number"
                                    min="2"
                                    max="15"
                                    placeholder={`${lang === "en" ? "Child" : "Niño"} ${i + 1}`}
                                    value={age}
                                    onChange={(e) =>
                                      handleAgeChange(i, e.target.value)
                                    }
                                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none transition-all"
                                    required
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Babies */}
                      <div className="flex items-center justify-between border-t border-stone-200 pt-3">
                        <div>
                          <p className="font-medium text-stone-800">
                            {t("contact.babies")}
                          </p>
                          <p className="text-xs text-stone-500">
                            {t("contact.babiesAge")}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateCount("babies", "minus")}
                            className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-50"
                            disabled={counts.babies <= 0}
                            aria-label="Decrease babies"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center font-medium text-stone-800">
                            {counts.babies}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCount("babies", "add")}
                            className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100"
                            aria-label="Increase babies"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Hidden Input for Form Submission */}
                      <input type="hidden" {...register("travelers")} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {t("contact.budget")}
                    </label>
                    <div className="relative">
                      <Euro
                        className="absolute left-4 top-3.5 text-stone-400"
                        size={18}
                      />
                      <input
                        {...register("budget", {
                          required: t("contact.budgetRequired"),
                        })}
                        type="text"
                        placeholder={t("contact.budgetPlaceholder")}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none"
                      />
                      {errors.budget && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.budget.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Trip Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {t("contact.tripType")}
                    </label>
                    <div className="relative">
                      <Briefcase
                        className="absolute left-4 top-3.5 text-stone-400"
                        size={18}
                      />
                      <select
                        {...register("tripType", {
                          required: t("contact.tripTypeRequired"),
                        })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none appearance-none"
                      >
                        <option value="">{t("contact.tripTypeSelect")}</option>
                        <option value="luna_miel">
                          {t("contact.tripTypeHoneymoon")}
                        </option>
                        <option value="aventura">
                          {t("contact.tripTypeAdventure")}
                        </option>
                        <option value="relax">
                          {t("contact.tripTypeRelax")}
                        </option>
                        <option value="cultural">
                          {t("contact.tripTypeCultural")}
                        </option>
                        <option value="familia">
                          {t("contact.tripTypeFamily")}
                        </option>
                        <option value="sorpresa">
                          {t("contact.tripTypeSurprise")}
                        </option>
                      </select>
                      {errors.tripType && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.tripType.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      {t("contact.hasPets")}
                    </label>
                    <div className="relative">
                      <PawPrint
                        className="absolute left-4 top-3.5 text-stone-400"
                        size={18}
                      />
                      <select
                        {...register("hasPets")}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none appearance-none"
                      >
                        <option value="no">{t("contact.hasPetsNo")}</option>
                        <option value="yes">{t("contact.hasPetsYes")}</option>
                      </select>
                    </div>
                  </div>
                  <AnimatePresence>
                    {watchHasPets === "yes" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          {t("contact.petsDetails")}
                        </label>
                        <input
                          {...register("petsDetails", {
                            required:
                              watchHasPets === "yes"
                                ? t("contact.petsDetailsRequired")
                                : false,
                          })}
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none"
                          placeholder={t("contact.petsDetailsPlaceholder")}
                        />
                        {errors.petsDetails && (
                          <span className="text-red-500 text-sm mt-1">
                            {errors.petsDetails.message}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Extras & Message */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {t("contact.extras")}
                  </label>
                  <textarea
                    {...register("message")}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none transition-all"
                    placeholder={t("contact.extrasPlaceholder")}
                  ></textarea>
                </div>

                {/* Orientation Pack Checkbox */}
                <div className="flex items-start gap-3 mt-4">
                  <div className="flex items-center h-5">
                    <input
                      {...register("orientationPack")}
                      id="orientationPack"
                      type="checkbox"
                      className="w-4 h-4 text-brand-sage border-stone-300 rounded focus:ring-brand-sage cursor-pointer"
                    />
                  </div>
                  <div className="text-sm">
                    <label
                      htmlFor="orientationPack"
                      className="font-medium text-stone-700 cursor-pointer"
                    >
                      {t("contact.orientationPack")}
                    </label>
                  </div>
                </div>
              </div>

              {/* RGPD & Consent */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5">
                    <input
                      {...register("privacyPolicy", {
                        required: t("contact.privacyRequired"),
                      })}
                      id="privacyPolicy"
                      type="checkbox"
                      className="w-4 h-4 text-brand-sage border-stone-300 rounded focus:ring-brand-sage cursor-pointer"
                    />
                  </div>
                  <div className="text-sm">
                    <label
                      htmlFor="privacyPolicy"
                      className="font-medium text-stone-700 cursor-pointer"
                    >
                      {t("contact.privacyLabel")}{" "}
                      <button
                        type="button"
                        className="text-brand-sage hover:underline"
                        onClick={() =>
                          window.dispatchEvent(new Event("open-privacy-policy"))
                        }
                        aria-label={t("contact.privacyLink")}
                      >
                        {t("contact.privacyLink")}
                      </button>{" "}
                      {t("contact.privacyLabel2")}
                    </label>
                    {errors.privacyPolicy && (
                      <p className="text-red-500 mt-1">
                        {errors.privacyPolicy.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5">
                    <input
                      {...register("marketingConsent")}
                      id="marketingConsent"
                      type="checkbox"
                      className="w-4 h-4 text-brand-sage border-stone-300 rounded focus:ring-brand-sage cursor-pointer"
                    />
                  </div>
                  <div className="text-sm">
                    <label
                      htmlFor="marketingConsent"
                      className="text-stone-600 cursor-pointer"
                    >
                      {t("contact.marketingConsent")}
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    t("contact.submitting")
                  ) : (
                    <>
                      {t("contact.submit")} <Send size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
