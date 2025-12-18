import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Send,
  CheckCircle,
  Calendar,
  Users,
  MapPin,
  Euro,
  Briefcase,
  Package,
  User,
  Baby,
  Plus,
  Minus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      travelers: "Adultos: 1, Niños: 0, Bebés: 0",
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Traveler state
  const [counts, setCounts] = useState({
    adults: 1,
    children: 0,
    babies: 0,
  });

  const watchDateStart = watch("dateStart");

  // Update hidden form field whenever counts change
  useEffect(() => {
    setValue(
      "travelers",
      `Adultos: ${counts.adults}, Niños: ${counts.children}, Bebés: ${counts.babies}`
    );
  }, [counts, setValue]);

  const updateCount = (type, operation) => {
    setCounts((prev) => {
      const current = prev[type];
      let newValue = current;

      if (operation === "add") {
        newValue = current + 1;
      } else {
        if (type === "adults" && current > 1) newValue = current - 1;
        if (type !== "adults" && current > 0) newValue = current - 1;
      }

      return { ...prev, [type]: newValue };
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mnneerkn", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsSubmitted(true);
      reset();
      setCounts({ adults: 1, children: 0, babies: 0 }); // Reset counters
    } catch (error) {
      console.error("Error submitting", error);
      setIsSubmitted(true); // Fallback for UI
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-stone-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm">
            Empieza tu aventura
          </span>
          <h2 className="text-4xl font-serif font-bold text-stone-800 mt-2">
            Diseña tu Viaje
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Cuéntanos tus sueños y nosotros nos encargamos del resto.
          </p>
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
                ¡Mensaje Recibido!
              </h3>
              <p className="text-stone-600 text-lg mb-8">
                Gracias por confiar en nosotros. Un diseñador de viajes se
                pondrá en contacto contigo muy pronto.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-stone-500 hover:text-stone-800 font-medium underline underline-offset-4"
              >
                Enviar otra solicitud
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    {...register("name", {
                      required: "El nombre es obligatorio",
                    })}
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none transition-all"
                    placeholder="Tu nombre"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "El email es obligatorio",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido",
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
                    Teléfono
                  </label>
                  <input
                    {...register("phone", {
                      required: "El teléfono es obligatorio",
                    })}
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none transition-all"
                    placeholder="+34 600..."
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Trip Origins & Destinations */}
              <div className="space-y-6 pt-6 border-t border-stone-100">
                <h3 className="text-lg font-serif font-semibold text-stone-800">
                  Detalles del Viaje
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Origen
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-4 top-3.5 text-stone-400"
                        size={18}
                      />
                      <input
                        {...register("origin", {
                          required: "Dinos desde dónde sales",
                        })}
                        type="text"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none"
                        placeholder="Madrid, Barcelona..."
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
                      Destino Soñado
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-4 top-3.5 text-stone-400"
                        size={18}
                      />
                      <input
                        {...register("destination", {
                          required: "Dinos dónde quieres ir",
                        })}
                        type="text"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none"
                        placeholder="Japón, Maldivas, Italia..."
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Fecha Ida
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-3.5 text-stone-400"
                        size={18}
                      />
                      <input
                        {...register("dateStart", {
                          required: "Fecha de ida requerida",
                        })}
                        type="date"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none text-stone-600"
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
                      Fecha Vuelta
                    </label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-3.5 text-stone-400"
                        size={18}
                      />
                      <input
                        {...register("dateEnd", {
                          required: "Fecha de vuelta requerida",
                          validate: (value) => {
                            if (!watchDateStart) return true;
                            return (
                              new Date(value) >= new Date(watchDateStart) ||
                              "La fecha de vuelta no puede ser anterior a la de ida"
                            );
                          },
                        })}
                        type="date"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none text-stone-600"
                      />
                      {errors.dateEnd && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.dateEnd.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Travelers & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Custom Traveler Counter */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Viajeros
                    </label>
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-stone-800">Adultos</p>
                          <p className="text-xs text-stone-500">
                            16 años o más
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateCount("adults", "minus")}
                            className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-50"
                            disabled={counts.adults <= 1}
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
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between border-t border-stone-200 pt-3">
                        <div>
                          <p className="font-medium text-stone-800">Niños</p>
                          <p className="text-xs text-stone-500">2 - 15 años</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateCount("children", "minus")}
                            className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-50"
                            disabled={counts.children <= 0}
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
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Babies */}
                      <div className="flex items-center justify-between border-t border-stone-200 pt-3">
                        <div>
                          <p className="font-medium text-stone-800">Bebés</p>
                          <p className="text-xs text-stone-500">Hasta 2 años</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateCount("babies", "minus")}
                            className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-50"
                            disabled={counts.babies <= 0}
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
                      Presupuesto (pp)
                    </label>
                    <div className="relative">
                      <Euro
                        className="absolute left-4 top-3.5 text-stone-400"
                        size={18}
                      />
                      <input
                        {...register("budget", {
                          required: "Presupuesto aproximado requerido",
                        })}
                        type="text"
                        placeholder="Ej: 1500-2000€"
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

                {/* Trip Type & Package */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Tipo de Viaje
                    </label>
                    <div className="relative">
                      <Briefcase
                        className="absolute left-4 top-3.5 text-stone-400"
                        size={18}
                      />
                      <select
                        {...register("tripType", {
                          required: "Selecciona un tipo",
                        })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none appearance-none"
                      >
                        <option value="">Selecciona...</option>
                        <option value="luna_miel">Luna de Miel</option>
                        <option value="aventura">Aventura</option>
                        <option value="relax">Relax / Playa</option>
                        <option value="cultural">Cultural</option>
                        <option value="familia">En Familia</option>
                        <option value="sorpresa">Sorpréndeme</option>
                      </select>
                      {errors.tripType && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.tripType.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Paquete Deseado
                    </label>
                    <div className="relative">
                      <Package
                        className="absolute left-4 top-3.5 text-stone-400"
                        size={18}
                      />
                      <select
                        {...register("package", {
                          required: "Selecciona un paquete",
                        })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none appearance-none uppercase"
                      >
                        <option value="">Selecciona...</option>
                        <option value="explora">Paquete Explora</option>
                        <option value="vive">Paquete Vive</option>
                        <option value="conecta">Paquete Conecta</option>
                      </select>
                      {errors.package && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.package.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Extras & Message */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Extras y Comentarios
                  </label>
                  <textarea
                    {...register("message")}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage outline-none transition-all"
                    placeholder="Cuéntanos cualquier detalle extra (alergias, intereses especiales, dudas...)"
                  ></textarea>
                </div>
              </div>

              {/* RGPD & Consent */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5">
                    <input
                      {...register("privacyPolicy", {
                        required: "Debes aceptar la política de privacidad",
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
                      He leído y acepto la{" "}
                      <button
                        type="button"
                        className="text-brand-sage hover:underline"
                        onClick={() =>
                          window.scrollTo(0, document.body.scrollHeight)
                        }
                      >
                        Política de Privacidad
                      </button>{" "}
                      y el uso de mis datos para gestionar esta solicitud.
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
                      Acepto recibir comunicaciones comerciales y novedades
                      sobre viajes e inspiración.
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
                    "Enviando..."
                  ) : (
                    <>
                      Enviar Solicitud <Send size={18} />
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
