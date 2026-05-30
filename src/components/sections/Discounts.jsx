import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  {
    name: "Iberia",
    logo: "/resto/iberia.png",
    title: "Encuentra tus vuelos",
    description: "Vuela a cualquier rincón del mundo al mejor precio.",
    buttonText: "Reservar",
    url: "https://www.tkqlhce.com/click-101693924-12119568",
    trackingPixel: "https://www.lduhtrp.net/image-101693924-12119568",
    icon: Plane,
  },
];

export default function Discounts() {
  const { t } = useTranslation();
  useEffect(() => {
    // 1. Inject Expedia official stylesheet
    const styleId = "expedia-affiliate-style";
    let link = document.getElementById(styleId);
    if (!link) {
      link = document.createElement("link");
      link.id = styleId;
      link.rel = "stylesheet";
      link.href = "https://creator.expediagroup.com/products/banners/assets/eg-affiliate-banners.css";
      link.className = "eg-affiliate-banners-style";
      document.head.appendChild(link);
    }

    // 2. Perform elements initialization matching the official script
    const elements = Array.from(document.querySelectorAll('.eg-affiliate-banners'));
    const bannerElements = {};

    elements.forEach((element) => {
      // If already has an iframe, skip to prevent duplicates
      if (element.querySelector('iframe')) return;

      const program = element.getAttribute('data-program') || "";
      const layout = element.getAttribute('data-layout') || "";
      const image = element.getAttribute('data-image') || "";
      const message = element.getAttribute('data-message') || "";
      const linkParam = element.getAttribute('data-link') || "";
      const networkId = element.getAttribute('data-network') || "";
      const mdpcid = element.getAttribute('data-mdpcid') || "";
      const camRef = element.getAttribute('data-camref') || "";
      const pubRef = element.getAttribute('data-pubref') || "";
      const adRef = element.getAttribute('data-adref') || "";

      // Generate instance ID
      const base = 36;
      const timestamp = Date.now().toString(base);
      const key = Math.random().toString(base).substring(2);
      const instance = timestamp + key;

      element.setAttribute('data-instance', instance);

      // Build query string matching getUrlSearch of official script
      const params = [
        ['program', program],
        ['layout', layout],
        ['image', image],
        ['message', message],
        ['link', linkParam],
        ['network', networkId],
        ['mdpcid', mdpcid],
        ['camref', camRef],
        ['pubref', pubRef],
        ['adref', adRef],
        ['instance', instance],
      ];

      const urlSearch = params
        .map(([k, v]) => (v ? `${k}=${encodeURIComponent(v)}` : ""))
        .filter(Boolean)
        .join('&');

      const frame = document.createElement('iframe');
      frame.className = 'eg-affiliate-banners-frame mx-auto';
      frame.src = `https://creator.expediagroup.com/products/banners?${urlSearch}`;
      frame.style.width = '300px'; // default layout width
      frame.style.height = '250px'; // default layout height
      frame.style.margin = 'auto';
      frame.style.border = 'none';
      frame.style.display = 'block';

      element.appendChild(frame);
      bannerElements[instance] = element;
    });

    // 3. Listen to messages for iframe resizing matching the official script
    const handleMessage = (event) => {
      const allowedOrigins = [
        'https://creator.expediagroup.com',
        'https://creatorexpediagroupcom.staging.exp-test.net',
        'https://creatorexpediacom.sandbox.exp-test.net:8443/',
        'https://localhost:8443',
      ];

      if (!allowedOrigins.includes(event.origin)) return;
      if (!event.data || event.data.type !== 'eg-affiliate-banners/resize') return;

      const { meta, payload } = event.data;
      const targetElement = bannerElements[meta.instance] || document.querySelector(`[data-instance="${meta.instance}"]`);
      if (targetElement) {
        const frame = targetElement.querySelector('.eg-affiliate-banners-frame');
        if (frame && payload?.frame?.style) {
          if (payload.frame.style.width) frame.style.width = payload.frame.style.width;
          if (payload.frame.style.height) frame.style.height = payload.frame.style.height;
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      // Cleanup iframes to avoid duplication on re-mount
      elements.forEach((element) => {
        const frame = element.querySelector('.eg-affiliate-banners-frame');
        if (frame) frame.remove();
      });
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-white to-stone-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-sky/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-sage/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-sage font-semibold tracking-wider uppercase text-sm">
            {t('discounts.label')}
          </span>
          <h2 className="text-4xl font-serif font-bold text-stone-800 mt-2 mb-4">
            {t('discounts.title')}
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            {t('discounts.subtitle')}
          </p>
        </div>

        {/* Discount Cards Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {discountOffers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <div
                key={index}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] xl:w-[calc(20%-1.6rem)] bg-white rounded-3xl border border-stone-200 hover:border-brand-sage hover:shadow-2xl transition-all duration-300 overflow-hidden group"
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

                  {/* Tracking Pixel */}
                  {offer.trackingPixel && (
                    <img
                      src={offer.trackingPixel}
                      width="1"
                      height="1"
                      style={{ border: 0, display: "none" }}
                      alt=""
                    />
                  )}
                </div>
              </div>
            );
          })}

          {/* Custom DiscoverCars Banner */}
          <div className="w-full mt-4">
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
                      <span className="text-brand-sage font-bold uppercase tracking-[0.2em] text-[10px]">
                        {t('discounts.recommendedBy')}
                      </span>
                    </div>
                    <p className="text-2xl text-stone-700 font-serif font-medium leading-tight">
                      {t('discounts.discoverCarsText')}{" "}
                      <span className="text-brand-sage font-bold italic">
                        DiscoverCars
                      </span>
                      .
                    </p>
                  </div>

                  <a
                    href="https://www.discovercars.com/?a_aid=saltysoultrips"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 whitespace-nowrap px-12 py-5 bg-stone-800 hover:bg-brand-sage text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-brand-sage/30 hover:-translate-y-1 active:scale-95"
                  >
                    {t('discounts.rentCarNow')}
                  </a>
                </div>
              </div>

              {/* Tracking Pixel (hidden) */}
              <img
                style={{ border: 0, display: "none" }}
                src="https://discover-car-hire.postaffiliatepro.com/scripts/iunyh71e?a_aid=saltysoultrips&amp;a_bid=f29909e9"
                width="1"
                height="1"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* Custom Hotel & Accommodation Affiliates */}
        <div className="w-full mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Agoda Card */}
            <div className="bg-white rounded-[2.5rem] border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group p-8 sm:p-10 flex flex-col items-center justify-between text-center min-h-[460px]">
              <div className="w-full flex flex-col items-center">
                {/* Logo */}
                <div className="mb-6 h-16 flex items-center justify-center">
                  <img
                    src="/resto/agoda.png"
                    alt="Agoda"
                    className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Title & Badge */}
                <div className="flex items-center gap-3 mb-2 justify-center">
                  <span className="text-brand-sage font-bold uppercase tracking-[0.2em] text-[10px]">
                    {t('discounts.agodaLabel')}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6">
                  {t('discounts.agodaTitle')}
                </h3>
                
                {/* Agoda Banner Container (matching Expedia style) */}
                <div className="flex justify-center items-center w-full max-w-[340px] min-h-[250px] p-2 bg-stone-50 rounded-2xl border border-stone-100 shadow-inner mx-auto">
                  <a 
                    href="https://www.agoda.com/partners/partnersearch.aspx?pcs=10&cid=1966059&hid=567167" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300 w-[300px] h-[230px] bg-white"
                  >
                    <img 
                      src="https://q-xx.bstatic.com/xdata/images/hotel/max300/86313137.jpg?k=7af9c812b6386d2ed2b7558eef9b0502a852c7c43267aaecda1d0f7cfb55c505&o=" 
                      srcSet="https://q-xx.bstatic.com/xdata/images/hotel/max300/86313137.jpg?k=7af9c812b6386d2ed2b7558eef9b0502a852c7c43267aaecda1d0f7cfb55c505&o= 1x, https://q-xx.bstatic.com/xdata/images/hotel/max500/86313137.jpg?k=7af9c812b6386d2ed2b7558eef9b0502a852c7c43267aaecda1d0f7cfb55c505&o= 2x" 
                      alt="Agoda Alojamientos"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Expedia Card */}
            <div className="bg-white rounded-[2.5rem] border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group p-8 sm:p-10 flex flex-col items-center justify-between text-center min-h-[460px]">
              <div className="w-full flex flex-col items-center">
                {/* Logo */}
                <div className="mb-6 h-16 flex items-center justify-center">
                  <img
                    src="/resto/expedia.png"
                    alt="Expedia"
                    className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Title & Badge */}
                <div className="flex items-center gap-3 mb-2 justify-center">
                  <span className="text-brand-sage font-bold uppercase tracking-[0.2em] text-[10px]">
                    {t('discounts.expediaLabel')}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6">
                  {t('discounts.expediaTitle')}
                </h3>
                
                {/* Dynamic Expedia Banner Container */}
                <div className="flex justify-center items-center w-full max-w-[340px] min-h-[250px] p-2 bg-stone-50 rounded-2xl border border-stone-100 shadow-inner mx-auto">
                  <div 
                    className="eg-affiliate-banners mx-auto" 
                    data-program="us-expedia" 
                    data-network="pz" 
                    data-layout="medium-rectangle" 
                    data-image="relaxing" 
                    data-message="find-perfect-getaway-package" 
                    data-camref="1110lGaeG" 
                    data-pubref="" 
                    data-link="stays"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Tecnológico Section */}
        <div className="mt-20 pt-12 border-t border-stone-200">
          <div className="text-center">
            <span className="text-brand-sage font-semibold tracking-wider uppercase text-xs">
              {t('discounts.techPartner')}
            </span>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
              <img
                src="/resto/siteminder.png"
                alt="Siteminder logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
              <div className="h-px w-12 bg-stone-300 hidden md:block"></div>
              <p className="text-stone-600 font-medium text-lg">
                <b>SiteMinder</b> | {t('discounts.techPartnerDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Optional Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-stone-500 italic">
            {t('discounts.affiliateNote')}
          </p>
        </div>
      </div>
    </section>
  );
}
