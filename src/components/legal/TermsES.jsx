import React from 'react';

export default function TermsES() {
  return (
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
  );
}
