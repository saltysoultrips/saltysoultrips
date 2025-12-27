import React, { useState } from "react";
import { Instagram, Facebook, Mail } from "lucide-react";
import LegalModal from "../modals/LegalModal";

// Custom TikTok Icon since it might not be in the lucide version used or for specific styling
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

  const legalContent = {
    terms: (
      <>
        <h4>Aviso Legal</h4>
        <p>
          En cumplimiento con el deber de información recogido en el artículo 10
          de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
          Información y de Comercio Electrónico (LSSICE), se facilitan a
          continuación los datos del titular de este sitio web:
        </p>
        <ul>
          <li>
            <strong>Titular:</strong> Ángela Jiménez Galván
          </li>
          <li>
            <strong>Email:</strong> saltysoultrips@gmail.com
          </li>
          <li>
            <strong>Sitio web:</strong> https://saltysoultrips.vercel.app/
          </li>
          <li>
            <strong>Localización:</strong> Barcelona, España
          </li>
        </ul>
        <p>
          El presente sitio web tiene como finalidad ofrecer itinerarios de
          viaje personalizados.
        </p>
        <p>
          El acceso y uso de este sitio web implica la aceptación de las
          presentes condiciones generales. El usuario se compromete a hacer un
          uso adecuado de los contenidos y servicios, evitando actividades
          ilícitas o contrarias a la buena fe.
        </p>
      </>
    ),
    privacy: (
      <>
        <h4>Política de Privacidad</h4>
        <p>
          En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y
          del Consejo, de 27 de abril de 2016 (RGPD), informamos a los usuarios
          de este sitio web de lo siguiente:
        </p>
        <p>
          <strong>Responsable del tratamiento:</strong> Ángela Jiménez Galván
          <br />
          <strong>Email de contacto:</strong> saltysoultrips@gmail.com
        </p>
        <h5>Finalidad del tratamiento</h5>
        <p>
          Los datos personales que el usuario proporciona a través del
          formulario de contacto se utilizarán únicamente para responder a su
          consulta o petición de información sobre itinerarios personalizados.
        </p>
        <h5>Legitimación</h5>
        <p>
          La base legal para el tratamiento de sus datos es el consentimiento
          expreso otorgado al marcar la casilla correspondiente en el formulario
          de contacto.
        </p>
        <h5>Conservación de los datos</h5>
        <p>
          Los datos se conservarán el tiempo necesario para responder a la
          consulta o hasta que el usuario solicite su supresión.
        </p>
        <h5>Destinatarios</h5>
        <p>No se cederán datos a terceros, salvo obligación legal.</p>
        <h5>Derechos</h5>
        <p>
          El usuario puede ejercer sus derechos de acceso, rectificación,
          supresión, limitación y oposición al tratamiento de sus datos enviando
          un correo electrónico a saltysoultrips@gmail.com con el asunto
          «Protección de Datos».
        </p>

        <hr className="my-6 border-stone-200" />

        <h4>Política de Cookies</h4>
        <p>
          Este sitio web utiliza cookies propias y de terceros para mejorar la
          experiencia del usuario y analizar el tráfico web.
        </p>
        <h5>¿Qué son las cookies?</h5>
        <p>
          Las cookies son pequeños archivos que se almacenan en el navegador del
          usuario y permiten recordar información sobre su visita.
        </p>
        <h5>Tipos de cookies que utilizamos</h5>
        <ul>
          <li>
            <strong>Cookies técnicas:</strong> necesarias para el funcionamiento
            de la web.
          </li>
          <li>
            <strong>Cookies de análisis:</strong> para recopilar datos
            estadísticos anónimos del uso de la web.
          </li>
        </ul>
        <h5>Configuración o desactivación de cookies</h5>
        <p>
          El usuario puede permitir, bloquear o eliminar las cookies instaladas
          en su equipo mediante la configuración de las opciones de su
          navegador.
        </p>
        <p>
          Para más información sobre el uso de cookies, puedes escribirnos a
          saltysoultrips@gmail.com.
        </p>
      </>
    ),
  };

  return (
    <>
      <footer
        id="footer"
        className="bg-stone-100 py-12 border-t border-stone-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            {/* Main Footer Content */}
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <h3 className="text-2xl font-serif font-bold text-stone-800">
                  Saltysoultrips
                </h3>
                <p className="text-stone-500 mt-2 text-sm max-w-xs">
                  Diseñando recuerdos inolvidables en cada rincón del mundo.
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-stone-600 text-sm">
                    <a
                      href="tel:+34611794842"
                      className="hover:text-brand-sage transition-colors"
                    >
                      📞 611 79 48 42
                    </a>
                  </p>
                  <p className="text-stone-600 text-sm">
                    <a
                      href="mailto:saltysoultrips@gmail.com"
                      className="hover:text-brand-sage transition-colors"
                    >
                      ✉️ saltysoultrips@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex space-x-6">
                <a
                  href="https://www.instagram.com/saltysoultrips/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-brand-sage transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.tiktok.com/@saltysoultrips"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-brand-sage transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon size={24} />
                </a>
              </div>
            </div>

            {/* Colaboradores Section - Now inside the white box */}
            <div className="mt-10 pt-8 border-t border-stone-200 text-center">
              <h4 className="text-lg font-semibold text-stone-700 mb-6">
                Colaboradores
              </h4>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                <a
                  href="https://holafly.sjv.io/YROPnq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <img
                    src="/resto/holafly.png"
                    alt="Holafly"
                    className="h-8 md:h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
                <a
                  href="https://heymondo.es/?utm_medium=Afiliado&utm_source=SALTYSOULTRIPS&utm_campaign=PRINCIPAL&cod_descuento=SALTYSOULTRIPS&ag_campaign=WEB&agencia=ABWmUCzTeUoAOchm5JnRMQLaoEQzCpUNGrl5Ty4s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <img
                    src="/resto/heymondo.png"
                    alt="Heymondo"
                    className="h-8 md:h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
                <a
                  href="https://www.getyourguide.es?partner_id=QLUQS6L&cmp=share_to_earn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <img
                    src="/resto/getyourguide.png"
                    alt="GetYourGuide"
                    className="h-8 md:h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-stone-400">
            <p>
              &copy; {new Date().getFullYear()} Saltysoultrips. Todos los
              derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button
                onClick={() => setActiveModal("privacy")}
                className="hover:text-stone-600 transition-colors"
              >
                Política de Privacidad
              </button>
              <button
                onClick={() => setActiveModal("terms")}
                className="hover:text-stone-600 transition-colors"
              >
                Términos de Servicio
              </button>
            </div>
          </div>
        </div>
      </footer>

      <LegalModal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="Política de Privacidad y Cookies"
        content={legalContent.privacy}
      />
      <LegalModal
        isOpen={activeModal === "terms"}
        onClose={() => setActiveModal(null)}
        title="Aviso Legal"
        content={legalContent.terms}
      />
    </>
  );
}
