import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Shield from "lucide-react/dist/esm/icons/shield";
import Wifi from "lucide-react/dist/esm/icons/wifi";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Plane from "lucide-react/dist/esm/icons/plane";
import Car from "lucide-react/dist/esm/icons/car";
import Ticket from "lucide-react/dist/esm/icons/ticket";

const discountOffers = [
  {
    name: "Heymondo",
    id: "heymondo",
    logo: "/resto/heymondo.png",
    url: "https://heymondo.es/?utm_medium=Afiliado&utm_source=SALTYSOULTRIPS&utm_campaign=PRINCIPAL&cod_descuento=SALTYSOULTRIPS&ag_campaign=WEB&agencia=ABWmUCzTeUoAOchm5JnRMQLaoEQzCpUNGrl5Ty4s",
    icon: Shield,
  },
  {
    name: "Holafly",
    id: "holafly",
    logo: "/resto/holafly.png",
    url: "https://holafly.sjv.io/YROPnq",
    icon: Wifi,
  },
  {
    name: "GetYourGuide",
    id: "gyg",
    logo: "/resto/getyourguide.png",
    url: "https://www.getyourguide.es?partner_id=QLUQS6L&cmp=share_to_earn",
    icon: MapPin,
  },
  {
    name: "AirHelp",
    id: "airhelp",
    logo: "/resto/airhelp.png",
    url: "https://static.airhelp.com/affiliate/affiliate_form_es_air21965.html?utm_source=pap&utm_medium=affiliate&utm_campaign=aff-6952a80eaa308&a_aid=6952a80eaa308&a_bid=588e3a14&partner_id=6952a80eaa308",
    icon: Plane,
  },
  {
    name: "Iberia",
    id: "iberia",
    logo: "/resto/iberia.png",
    url: "https://www.tkqlhce.com/click-101693924-12119568",
    trackingPixel: "https://www.lduhtrp.net/image-101693924-12119568",
    icon: Plane,
  },
  {
    name: "DiscoverCars",
    id: "discovercars",
    logo: "/resto/discovercars.png",
    url: "https://www.discovercars.com/?a_aid=saltysoultrips",
    trackingPixel: "https://discover-car-hire.postaffiliatepro.com/scripts/iunyh71e?a_aid=saltysoultrips&a_bid=f29909e9",
    icon: Car,
  },
  {
    name: "Turbopass",
    id: "turbopass",
    logo: "/resto/turbopass.png",
    url: "https://www.awin1.com/cread.php?s=4784603&v=126733&q=605539&r=2815824",
    trackingPixel: "https://www.awin1.com/cshow.php?s=4784603&v=126733&q=605539&r=2815824",
    icon: Ticket,
  },
  {
    name: "Agoda",
    id: "agoda",
    logo: "/resto/agoda.png",
    url: "https://www.agoda.com/partners/partnersearch.aspx?pcs=10&cid=1966059&hid=567167",
    icon: MapPin,
  },
  {
    name: "Expedia",
    id: "expedia",
    logo: "/resto/expedia.png",
    url: "https://www.expedia.es/",
    icon: MapPin,
  },
];

export default function Discounts() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

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
  }, [lang]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {discountOffers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl border border-stone-200 hover:border-brand-sage hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
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
                    {t(`discounts.${offer.id}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-stone-600 mb-6 flex-grow">
                    {t(`discounts.${offer.id}.desc`)}
                  </p>

                  {/* CTA Button */}
                  <a
                    href={offer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-medium text-center transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {t(`discounts.${offer.id}.btn`)}
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
