import React from "react";
import { Shield, Wifi, MapPin } from "lucide-react";

const discountOffers = [
  {
    name: "Heymondo",
    logo: "/resto/heymondo.png",
    title: "Tu seguro de viaje",
    description: "Viaja protegido con el mejor seguro de viajes",
    buttonText: "5% de descuento",
    url: "https://heymondo.es/?utm_medium=Afiliado&utm_source=SALTYSOULTRIPS&utm_campaign=PRINCIPAL&cod_descuento=SALTYSOULTRIPS&ag_campaign=WEB&agencia=ABWmUCzTeUoAOchm5JnRMQLaoEQzCpUNGrl5Ty4s",
    icon: Shield,
  },
  {
    name: "Holafly",
    logo: "/resto/holafly.png",
    title: "Internet en tus viajes",
    description: "Mantente conectado en cualquier parte del mundo",
    buttonText: "5% de descuento",
    url: "https://holafly.sjv.io/YROPnq",
    icon: Wifi,
  },
  {
    name: "GetYourGuide",
    logo: "/resto/getyourguide.png",
    title: "Tours y actividades",
    description: "Las mejores experiencias para tu viaje",
    buttonText: "Reservar",
    url: "https://www.getyourguide.es?partner_id=QLUQS6L&cmp=share_to_earn",
    icon: MapPin,
  },
];

export default function Discounts() {
  return (
    <section
      id="discounts"
      className="py-24 bg-gradient-to-br from-white to-stone-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-sky/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-sage/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm">
            Descuentos Exclusivos
          </span>
          <h2 className="text-4xl font-serif font-bold text-stone-800 mt-2 mb-4">
            Nuestros Aliados para tu Viaje
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Aprovecha estos descuentos y servicios especiales para hacer tu
            viaje aún más increíble
          </p>
        </div>

        {/* Discount Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {discountOffers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl border border-stone-200 hover:border-brand-sage hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8 flex flex-col items-center text-center h-full">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-sage to-brand-sky flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} />
                  </div>

                  {/* Logo */}
                  <div className="mb-6 h-20 flex items-center justify-center">
                    <img
                      src={offer.logo}
                      alt={`${offer.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-stone-800 mb-3">
                    {offer.title}
                  </h3>

                  {/* Description */}
                  <p className="text-stone-600 mb-6 flex-grow">
                    {offer.description}
                  </p>

                  {/* CTA Button */}
                  <a
                    href={offer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-medium text-center transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {offer.buttonText}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-stone-500 italic">
            * Al utilizar estos enlaces, nos ayudas a seguir ofreciendo el mejor
            servicio sin coste adicional para ti
          </p>
        </div>
      </div>
    </section>
  );
}
