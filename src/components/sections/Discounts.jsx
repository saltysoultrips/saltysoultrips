import React from "react";
import Shield from "lucide-react/dist/esm/icons/shield";
import Wifi from "lucide-react/dist/esm/icons/wifi";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Plane from "lucide-react/dist/esm/icons/plane";
import Car from "lucide-react/dist/esm/icons/car";

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
  {
    name: "AirHelp",
    logo: "/resto/airhelp.png",
    title: "¿Vuelo retrasado o cancelado?",
    description: "¡Obtén hasta 600 €!",
    buttonText: "Reclamar compensación",
    url: "https://static.airhelp.com/affiliate/affiliate_form_es_air21965.html?utm_source=pap&utm_medium=affiliate&utm_campaign=aff-6952a80eaa308&a_aid=6952a80eaa308&a_bid=588e3a14&partner_id=6952a80eaa308",
    icon: Plane,
  },
];

export default function Discounts() {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-stone-50 relative overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

          {/* Custom DiscoverCars Banner - Now part of the grid and spanning all columns */}
          <div className="md:col-span-2 lg:col-span-4 mt-4">
            <div className="bg-white rounded-[2.5rem] border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="flex flex-col lg:flex-row items-stretch min-h-[180px]">
                {/* Logo Side */}
                <div className="w-full lg:w-1/3 p-10 flex items-center justify-center bg-stone-50/50 border-b lg:border-b-0 lg:border-r border-stone-100 group-hover:bg-white transition-colors duration-500">
                  <img
                    src="/resto/discovercars.png"
                    alt="DiscoverCars"
                    className="max-h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Content Side */}
                <div className="w-full lg:w-2/3 p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left relative">
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-sage/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-brand-sage/10 transition-colors duration-500"></div>
                  
                  <div className="max-w-xl relative z-10">
                    <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                      <div className="w-8 h-8 rounded-full bg-brand-sage/10 flex items-center justify-center">
                        <Car className="text-brand-sage" size={18} />
                      </div>
                      <span className="text-brand-sage font-bold uppercase tracking-[0.2em] text-[10px]">Recomendado por SaltySoulTrips</span>
                    </div>
                    <p className="text-2xl text-stone-700 font-serif font-medium leading-tight">
                      Para moverte por tu cuenta, siempre reservamos nuestro vehículo a través de <span className="text-brand-sage font-bold italic">DiscoverCars</span>.
                    </p>
                  </div>
                  
                  <a
                    href="https://www.discovercars.com?a_aid=saltysoultrips&a_bid=f29909e9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 whitespace-nowrap px-12 py-5 bg-stone-800 hover:bg-brand-sage text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-brand-sage/30 hover:-translate-y-1 active:scale-95"
                  >
                    Alquilar coche ahora
                  </a>
                </div>
              </div>
              
              {/* Tracking Pixel (hidden) */}
              <img 
                style={{ border: 0, display: 'none' }} 
                src="https://discover-car-hire.postaffiliatepro.com/scripts/iunyh71e?a_aid=saltysoultrips&amp;a_bid=f29909e9" 
                width="1" 
                height="1" 
                alt="" 
              />
            </div>
          </div>
        </div>

        {/* Partner Tecnológico Section */}
        <div className="mt-20 pt-12 border-t border-stone-200">
          <div className="text-center">
            <span className="text-brand-sage font-semibold tracking-wider uppercase text-xs">
              Nuestro Partner Tecnológico
            </span>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
              <img
                src="/resto/siteminder.png"
                alt="Siteminder logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
              <div className="h-px w-12 bg-stone-300 hidden md:block"></div>
              <p className="text-stone-600 font-medium text-lg">
                <span className="font-bold uppercase tracking-tight">Siteminder</span> | El mayor
                proveedor del mundo de tecnología para hoteles
              </p>
            </div>
          </div>
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

