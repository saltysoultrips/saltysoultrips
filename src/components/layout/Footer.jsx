import React, { useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../../lib/sanity";
import Instagram from "lucide-react/dist/esm/icons/instagram";
import Facebook from "lucide-react/dist/esm/icons/facebook";
import Mail from "lucide-react/dist/esm/icons/mail";
import LegalModal from "../modals/LegalModal";
import { useTranslation } from "react-i18next";
import TermsES from "../legal/TermsES";
import TermsEN from "../legal/TermsEN";
import PrivacyES from "../legal/PrivacyES";
import PrivacyEN from "../legal/PrivacyEN";

// Custom TikTok Icon
const TikTokIcon = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);
  const [footerPackages, setFooterPackages] = useState([]);
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    const fetchFooterPackages = async () => {
      try {
        const query = `*[_type == "package"] | order(_createdAt asc) [0...8] {
          "id": slug.current,
          title,
          title_en
        }`;
        const sanityPackages = await client.fetch(query);
        setFooterPackages(sanityPackages || []);
      } catch (error) {
        console.error("Error fetching footer packages:", error);
      }
    };
    fetchFooterPackages();
  }, []);

  const isEn = i18n.language === 'en';
  
  const legalContent = {
    terms: isEn ? <TermsEN /> : <TermsES />,
    privacy: isEn ? <PrivacyEN /> : <PrivacyES />,
  };

  return (
    <>
      <footer
        id="footer"
        className="bg-sand-200 py-12 border-t border-sand-300 relative overflow-hidden"
      >
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-sand-300 rounded-tl-full opacity-50 -z-10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass p-8 rounded-3xl shadow-sm border border-white/50">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <h3 className="text-2xl font-serif font-bold text-brand-dark">
                  Saltysoultrips
                </h3>
                <p className="text-sand-700 mt-2 text-sm max-w-xs font-medium">
                  {t("footer.tagline")}
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-brand-dark text-sm font-medium">
                    <a
                      href="tel:+34611794842"
                      className="hover:text-sand-600 transition-colors"
                    >
                      📞 611 79 48 42
                    </a>
                  </p>
                  <p className="text-brand-dark text-sm font-medium">
                    <a
                      href="mailto:saltysoultrips@gmail.com"
                      className="hover:text-sand-600 transition-colors"
                    >
                      ✉️ saltysoultrips@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="mb-8 md:mb-0 text-center md:text-left">
                <h4 className="text-sm font-bold text-brand-dark uppercase tracking-widest mb-4">
                  {t("footer.featuredDestinations")}
                </h4>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sand-800 text-sm font-medium">
                  {footerPackages.map((pkg) => (
                    <li key={pkg.id}>
                      <Link
                        to={`/${isEn ? 'packages' : 'paquetes'}/${pkg.id}`}
                        className="hover:text-sand-600 transition-colors"
                      >
                        {isEn && pkg.title_en ? pkg.title_en : pkg.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-6">
                <a
                  href="https://www.instagram.com/saltysoultrips/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-dark hover:text-sand-600 transition-colors bg-sand-200 p-3 rounded-full shadow-sm hover:shadow-md"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.tiktok.com/@saltysoultrips"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-dark hover:text-sand-600 transition-colors bg-sand-200 p-3 rounded-full shadow-sm hover:shadow-md"
                  aria-label="TikTok"
                >
                  <TikTokIcon size={24} />
                </a>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-sand-300 text-center">
              <h4 className="text-lg font-semibold text-brand-dark mb-6">
                {t("footer.collaborators")}
              </h4>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                <a
                  href="https://holafly.sjv.io/YROPnq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
                >
                  <img
                    src="/resto/holafly.png"
                    alt="Holafly"
                    className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    width="120"
                    height="40"
                  />
                </a>
                <a
                  href="https://heymondo.es/?utm_medium=Afiliado&utm_source=SALTYSOULTRIPS&utm_campaign=PRINCIPAL&cod_descuento=SALTYSOULTRIPS&ag_campaign=WEB&agencia=ABWmUCzTeUoAOchm5JnRMQLaoEQzCpUNGrl5Ty4s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
                >
                  <img
                    src="/resto/heymondo.png"
                    alt="Heymondo"
                    className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    width="120"
                    height="40"
                  />
                </a>
                <a
                  href="https://www.getyourguide.es?partner_id=QLUQS6L&cmp=share_to_earn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
                >
                  <img
                    src="/resto/getyourguide.png"
                    alt="GetYourGuide"
                    className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    width="120"
                    height="40"
                  />
                </a>
                <a
                  href="https://static.airhelp.com/affiliate/affiliate_form_es_air21965.html?utm_source=pap&utm_medium=affiliate&utm_campaign=aff-6952a80eaa308&a_aid=6952a80eaa308&a_bid=588e3a14&partner_id=6952a80eaa308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
                >
                  <img
                    src="/resto/airhelp.png"
                    alt="AirHelp"
                    className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    width="120"
                    height="40"
                  />
                </a>
                <a
                  href="https://www.tkqlhce.com/click-101693924-12119568"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
                >
                  <img
                    src="/resto/iberia.png"
                    alt="Iberia"
                    className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    width="120"
                    height="40"
                  />
                </a>
                <a
                  href="https://www.discovercars.com/?a_aid=saltysoultrips"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
                >
                  <img
                    src="/resto/discovercars.png"
                    alt="DiscoverCars"
                    className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    width="120"
                    height="40"
                  />
                </a>
                <a
                  href="https://www.agoda.com/partners/partnersearch.aspx?pcs=10&cid=1966059&hid=567167"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
                >
                  <img
                    src="/resto/agoda.png"
                    alt="Agoda"
                    className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    width="120"
                    height="40"
                  />
                </a>
                <a
                  href="https://www.expedia.es/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
                >
                  <img
                    src="/resto/expedia.png"
                    alt="Expedia"
                    className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    width="120"
                    height="40"
                  />
                </a>
                <a
                  href="https://www.siteminder.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
                >
                  <img
                    src="/resto/siteminder.png"
                    alt="SiteMinder"
                    className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    width="120"
                    height="40"
                  />
                </a>
                <a
                  href="https://www.awin1.com/cread.php?s=4784603&v=126733&q=605539&r=2815824"
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
                >
                  <img
                    src="/resto/turbopass.png"
                    alt="Turbopass"
                    className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    width="120"
                    height="40"
                  />
                  {/* Tracking Pixel */}
                  <img 
                    src="https://www.awin1.com/cshow.php?s=4784603&v=126733&q=605539&r=2815824" 
                    className="hidden" 
                    alt="" 
                    aria-hidden="true" 
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-sand-800 font-medium">
            <p>
              &copy; {new Date().getFullYear()} {t("footer.rights")}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button
                onClick={() => setActiveModal("privacy")}
                className="hover:text-brand-dark transition-colors"
              >
                {t("footer.privacyPolicy")}
              </button>
              <button
                onClick={() => setActiveModal("terms")}
                className="hover:text-brand-dark transition-colors"
              >
                {t("footer.termsOfService")}
              </button>
            </div>
          </div>
        </div>
      </footer>

      <LegalModal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title={t("footer.privacyModalTitle")}
        content={legalContent.privacy}
      />
      <LegalModal
        isOpen={activeModal === "terms"}
        onClose={() => setActiveModal(null)}
        title={t("footer.termsModalTitle")}
        content={legalContent.terms}
      />
    </>
  );
}
