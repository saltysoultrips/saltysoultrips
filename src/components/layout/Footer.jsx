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
        <div className="mb-8">
          <h4 className="text-xl font-bold text-stone-800 mb-4">
            📋 Aviso Legal
          </h4>
          <p className="text-stone-600 leading-relaxed mb-4">
            En cumplimiento con el deber de información recogido en el artículo
            10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de
            la Información y de Comercio Electrónico (LSSICE), se facilitan a
            continuación los datos del titular de este sitio web:
          </p>
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
            <ul className="space-y-2 text-stone-700">
              <li>
                <strong className="text-stone-800">Titular:</strong> Ángela
                Jiménez Galván
              </li>
              <li>
                <strong className="text-stone-800">Email:</strong>{" "}
                <a
                  href="mailto:saltysoultrips@gmail.com"
                  className="text-brand-sage hover:underline"
                >
                  saltysoultrips@gmail.com
                </a>
              </li>
              <li>
                <strong className="text-stone-800">Sitio web:</strong>{" "}
                <a
                  href="https://www.saltysoultrips.com/"
                  className="text-brand-sage hover:underline"
                >
                  https://www.saltysoultrips.com/
                </a>
              </li>
              <li>
                <strong className="text-stone-800">Localización:</strong>{" "}
                Barcelona, España
              </li>
            </ul>
          </div>
          <p className="text-stone-600 leading-relaxed mt-4">
            El presente sitio web tiene como finalidad ofrecer itinerarios de
            viaje personalizados.
          </p>
          <p className="text-stone-600 leading-relaxed mt-3">
            El acceso y uso de este sitio web implica la aceptación de las
            presentes condiciones generales. El usuario se compromete a hacer un
            uso adecuado de los contenidos y servicios, evitando actividades
            ilícitas o contrarias a la buena fe.
          </p>
        </div>

        <hr className="my-8 border-stone-200" />

        <div className="mb-6">
          <h4 className="text-2xl font-bold text-stone-800 mb-6">
            ✨ Términos y Condiciones del Servicio
          </h4>

          {/* Sección 1 */}
          <div className="mb-6 bg-gradient-to-r from-brand-sage/5 to-transparent rounded-xl p-5 border-l-4 border-brand-sage">
            <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎯</span> 1. Descripción del Servicio
            </h5>
            <p className="text-stone-600 leading-relaxed">
              Saltysoultrips ofrece servicios de{" "}
              <strong>asesoría y planificación de viajes personalizados</strong>
              . No somos una agencia de viajes tradicional y{" "}
              <strong>no realizamos reservas en nombre del cliente</strong>.
            </p>
          </div>

          {/* Sección 2 */}
          <div className="mb-6 bg-white rounded-xl p-5 border border-stone-200">
            <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">✅</span> 2. Qué Incluye el Servicio
            </h5>
            <ul className="space-y-2 text-stone-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-sage mt-1">•</span>
                <span>
                  Itinerario digital completo y personalizado en formato PDF
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-sage mt-1">•</span>
                <span>
                  Recomendaciones detalladas según el paquete contratado
                  (Explora, Vive o Conecta)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-sage mt-1">•</span>
                <span>
                  Enlaces directos para todas las reservas recomendadas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-sage mt-1">•</span>
                <span>Soporte vía email durante la fase de planificación</span>
              </li>
            </ul>
          </div>

          {/* Sección 3 */}
          <div className="mb-6 bg-red-50 rounded-xl p-5 border border-red-200">
            <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">❌</span> 3. Qué NO Incluye el Servicio
            </h5>
            <ul className="space-y-2 text-stone-600">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>
                  Realización de reservas de vuelos, hoteles o actividades en
                  nombre del cliente
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>
                  Gestión de pagos a terceros (aerolíneas, hoteles, proveedores
                  de actividades)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>
                  Seguro de viaje (aunque proporcionamos recomendaciones)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Asistencia 24/7 durante el viaje</span>
              </li>
            </ul>
          </div>

          {/* Sección 4 */}
          <div className="mb-6 bg-white rounded-xl p-5 border border-stone-200">
            <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">💳</span> 4. Forma de Pago
            </h5>
            <ul className="space-y-2 text-stone-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-sage mt-1">•</span>
                <span>Pago íntegro del paquete al realizar el pedido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-sage mt-1">•</span>
                <span>
                  <strong>Métodos aceptados:</strong> Transferencia bancaria,
                  Bizum o PayPal
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-sage mt-1">•</span>
                <span>
                  El itinerario se entrega una vez confirmado el pago completo
                </span>
              </li>
            </ul>
          </div>

          {/* Sección 5 */}
          <div className="mb-6 bg-blue-50 rounded-xl p-5 border border-blue-200">
            <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">⏱️</span> 5. Plazos de Entrega
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-stone-600">
              <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
                <div className="font-bold text-stone-800 mb-1">
                  Paquete Explora
                </div>
                <div className="text-sm">5-7 días hábiles</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
                <div className="font-bold text-stone-800 mb-1">
                  Paquete Vive
                </div>
                <div className="text-sm">7-10 días hábiles</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
                <div className="font-bold text-stone-800 mb-1">
                  Paquete Conecta
                </div>
                <div className="text-sm">10-14 días hábiles</div>
              </div>
            </div>
            <p className="text-sm text-stone-600 mt-3 text-center">
              ⚡ <strong>Servicio Express</strong> disponible con un suplemento
              del 30% (entrega en 2-3 días)
            </p>
          </div>

          {/* Sección 6 */}
          <div className="mb-6 bg-amber-50 rounded-xl p-5 border border-amber-200">
            <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🔄</span> 6. Política de Cancelación y
              Reembolsos
            </h5>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border-l-4 border-red-500">
                <div className="font-bold text-red-700 mb-1">
                  ✗ Sin reembolso
                </div>
                <div className="text-sm text-stone-600">
                  Una vez confirmado el pago, no se realizan reembolsos
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border-l-4 border-brand-sage">
                <div className="font-bold text-brand-sage mb-1">
                  ✎ Modificaciones menores gratis
                </div>
                <div className="text-sm text-stone-600">
                  Dentro de los 7 días posteriores a la entrega
                </div>
              </div>
            </div>
          </div>

          {/* Sección 7 */}
          <div className="mb-6 bg-white rounded-xl p-5 border border-stone-200">
            <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">✏️</span> 7. Cambios y Modificaciones
            </h5>
            <ul className="space-y-2 text-stone-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-sage mt-1">•</span>
                <span>
                  <strong className="text-green-600">
                    Primera revisión incluida
                  </strong>{" "}
                  sin coste adicional
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-sage mt-1">•</span>
                <span>
                  Cambios mayores (cambio de destino, fechas o duración del
                  viaje) tienen un <strong>coste adicional del 30%</strong> del
                  paquete original
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-sage mt-1">•</span>
                <span>
                  Actualizaciones de precios: te avisamos si hay cambios
                  significativos en precios de vuelos/hoteles en los 7 días
                  posteriores a la entrega
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-sage mt-1">•</span>
                <span>
                  Modificaciones solicitadas después de 7 días de la entrega se
                  cobran como un nuevo servicio
                </span>
              </li>
            </ul>
          </div>

          {/* Sección 8 */}
          <div className="mb-6 bg-gradient-to-r from-orange-50 to-transparent rounded-xl p-5 border-l-4 border-orange-400">
            <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span> 8. Responsabilidades y
              Limitaciones
            </h5>
            <ul className="space-y-2 text-stone-600">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">→</span>
                <span>
                  Saltysoultrips actúa únicamente como{" "}
                  <strong>asesor de viaje</strong>, no como agencia de viajes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">→</span>
                <span>
                  No nos hacemos responsables de cambios en precios,
                  disponibilidad o condiciones de servicios ofrecidos por
                  terceros (aerolíneas, hoteles, etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">→</span>
                <span>
                  Es <strong>responsabilidad del viajero</strong> verificar y
                  cumplir con los requisitos de visado, vacunas y documentación
                  necesaria para cada destino
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">→</span>
                <span>
                  Recomendamos encarecidamente contratar un seguro de viaje
                  antes de realizar cualquier reserva
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">→</span>
                <span>
                  Como el cliente realiza sus propias reservas, cualquier
                  gestión de cambios o cancelaciones debe hacerse directamente
                  con el proveedor correspondiente
                </span>
              </li>
            </ul>
          </div>

          {/* Sección 9 */}
          <div className="mb-6 bg-white rounded-xl p-5 border border-stone-200">
            <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">©️</span> 9. Propiedad Intelectual
            </h5>
            <p className="text-stone-600 leading-relaxed">
              Los itinerarios y documentos entregados son para{" "}
              <strong>uso personal del cliente</strong>. Queda prohibida su
              reproducción, distribución o uso comercial sin autorización
              expresa de Saltysoultrips.
            </p>
          </div>

          {/* Sección 10 */}
          <div className="bg-gradient-to-r from-brand-sage/10 to-brand-sky/10 rounded-xl p-5 border border-brand-sage/30">
            <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">📧</span> 10. Contacto
            </h5>
            <p className="text-stone-600 leading-relaxed">
              Para cualquier consulta sobre estos términos y condiciones, puedes
              contactarnos en:{" "}
              <a
                href="mailto:saltysoultrips@gmail.com"
                className="font-bold text-brand-sage hover:underline"
              >
                saltysoultrips@gmail.com
              </a>
            </p>
          </div>
        </div>
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
                <a
                  href="https://static.airhelp.com/affiliate/affiliate_form_es_air21965.html?utm_source=pap&utm_medium=affiliate&utm_campaign=aff-6952a80eaa308&a_aid=6952a80eaa308&a_bid=588e3a14&partner_id=6952a80eaa308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <img
                    src="/resto/airhelp.png"
                    alt="AirHelp"
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
        title="Aviso Legal y Términos de Servicio"
        content={legalContent.terms}
      />
    </>
  );
}
