import React from "react";
export default function ServiceTerms({ en = false }) {
  const sections = en
    ? [
        [
          "Our service",
          "SaltySoulTrips designs personalised trips and manages the agreed flight, accommodation and activity bookings on behalf of the client. The scope and total price are specified in the individual proposal before confirmation.",
        ],
        [
          "Your proposal and confirmation",
          "Before confirming, review dates, travellers, itinerary, inclusions, exclusions and the conditions applicable to each service. Bookings are made after your approval and remain subject to supplier availability.",
        ],
        [
          "Optional orientation pack",
          "The orientation pack costs €100 and complements the management of your trip with a day-by-day itinerary, a visual Google map and selected places of interest. Its inclusion must be agreed in the proposal.",
        ],
        [
          "Payments and documentation",
          "The proposal and booking documentation specify the payment amounts, deadlines and applicable conditions. Traveller details must match the documents required for the trip. Contact us to correct any errors before booking.",
        ],
        [
          "Changes and cancellations",
          "Contact SaltySoulTrips to request a change or cancellation. We will explain the applicable supplier conditions and any costs before processing it. Refunds, where applicable, depend on the contracted conditions and applicable rights.",
        ],
        [
          "Travel requirements and assistance",
          "Check the entry requirements for your nationality and the documentation needed for the itinerary. The proposal specifies any insurance or assistance included; do not assume that services not listed are included.",
        ],
        [
          "Contact",
          "For questions about a proposal or booking, email saltysoultrips@gmail.com or call +34 611 79 48 42.",
        ],
      ]
    : [
        [
          "Nuestro servicio",
          "SaltySoulTrips diseña viajes personalizados y gestiona en nombre del cliente las reservas de vuelos, alojamientos y actividades acordadas. El alcance y el precio total se concretan en la propuesta individual antes de confirmar.",
        ],
        [
          "Propuesta y confirmación",
          "Antes de confirmar, revisa las fechas, los viajeros, el itinerario, las inclusiones, las exclusiones y las condiciones de cada servicio. Las reservas se tramitan después de tu aprobación y están sujetas a disponibilidad de los proveedores.",
        ],
        [
          "Pack de orientación opcional",
          "El pack de orientación cuesta 100 € y complementa la gestión de tu viaje con un itinerario día a día, un mapa visual en Google y lugares de interés seleccionados. Su inclusión debe acordarse en la propuesta.",
        ],
        [
          "Pagos y documentación",
          "La propuesta y la documentación de reserva detallan los importes, los plazos de pago y las condiciones aplicables. Los datos de los viajeros deben coincidir con los documentos necesarios para el viaje. Contacta con nosotros para corregir cualquier error antes de reservar.",
        ],
        [
          "Cambios y cancelaciones",
          "Contacta con SaltySoulTrips para solicitar un cambio o una cancelación. Te explicaremos las condiciones del proveedor y los posibles costes antes de tramitarlo. Los reembolsos que correspondan dependen de las condiciones contratadas y de los derechos aplicables.",
        ],
        [
          "Requisitos y asistencia durante el viaje",
          "Comprueba los requisitos de entrada según tu nacionalidad y la documentación necesaria para el itinerario. La propuesta especifica el seguro o la asistencia incluidos; no se deben dar por incluidos servicios que no estén detallados.",
        ],
        [
          "Contacto",
          "Para consultar una propuesta o reserva, escribe a saltysoultrips@gmail.com o llama al +34 611 79 48 42.",
        ],
      ];
  return (
    <div className="space-y-7 text-stone-700">
      <h4 className="text-2xl font-serif">
        {en
          ? "Service information and conditions"
          : "Información y condiciones del servicio"}
      </h4>
      <p>
        {en ? "Website owner" : "Titular del sitio"}: Ángela Jiménez Galván ·
        SaltySoulTrips
      </p>
      {sections.map(([title, text]) => (
        <section key={title}>
          <h5 className="font-semibold text-lg mb-2">{title}</h5>
          <p className="leading-relaxed">{text}</p>
        </section>
      ))}
    </div>
  );
}
