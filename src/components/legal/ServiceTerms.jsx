import React from "react";
export default function ServiceTerms({ en = false }) {
  const sections = en
    ? [
        [
          "Our service",
          "SaltySoulTrips designs custom-made trips. After receiving your request via our form, we will contact you to design an itinerary tailored to your preferences and approximate budget, adding anything you desire or that we see fit to enhance your experience. We take care of managing bookings on your behalf for flights, accommodations, activities, transfers, insurance, eSIMs, and any other necessary services.",
        ],
        [
          "Proposal and confirmation",
          "We will provide a detailed proposal. Before confirming, you must review the itinerary and included services. Final bookings are made only after your approval and payment confirmation. Once all the services for the planned trip have been booked, you must sign a service agreement contract that we will provide.",
        ],
        [
          "Optional orientation pack",
          "In addition to trip management, we offer an optional 'Orientation Pack' for an extra €100. This pack provides a clear, beautiful, and highly visual day-by-day itinerary of all the services the client has booked.",
        ],
        [
          "Payments",
          "Trip payments can be made as a single full payment or divided into multiple installments on agreed-upon dates. All payment terms, amounts, and deadlines will be clearly detailed in your proposal before formalizing the booking.",
        ],
        [
          "Changes and modifications",
          "If you wish to make any modifications to your itinerary after the trip has already been paid for or booked, we will take care of managing these changes for you. Please note that any modifications are subject to availability and may incur additional costs established by the suppliers.",
        ],
        [
          "Cancellations and refunds",
          "If you decide to cancel a trip that has already been paid for, we cannot guarantee or assure that the money will be refunded. Any potential refund depends strictly and exclusively on the terms, conditions, and cancellation policies of the third-party providers (airlines, hotels, activities, etc.) used to acquire the services for your trip.",
        ],
        [
          "Contact",
          "For any inquiries about a proposal or booking, please email saltysoultrips@gmail.com or call +34 611 79 48 42.",
        ],
      ]
    : [
        [
          "Nuestro servicio",
          "SaltySoulTrips diseña viajes a medida. Tras recibir tu solicitud mediante nuestro formulario, contactaremos contigo para diseñar un itinerario adaptado a tus gustos y presupuesto aproximado, añadiendo lo que desees o lo que veamos conveniente para el mejor disfrute de tu viaje. Nos encargamos de gestionar por ti las reservas de vuelos, alojamientos, actividades, traslados, seguros, eSIM y cualquier otro servicio necesario.",
        ],
        [
          "Propuesta y confirmación",
          "Te presentaremos una propuesta detallada. Antes de confirmar, deberás revisar el itinerario y los servicios incluidos. Las reservas definitivas se realizarán únicamente tras tu aprobación y confirmación de pago. Una vez reservados todos los servicios del viaje que se va a realizar, el cliente deberá firmar un contrato de conformidad y prestación de servicios que le proporcionaremos.",
        ],
        [
          "Pack de orientación (opcional)",
          "De forma adicional a la gestión del viaje, ofrecemos un 'Pack de orientación' por 100 € extra. Este pack incluye un itinerario de viaje detallado de forma muy visual, clara y bonita, reflejando el día a día de todos los servicios que ha reservado el cliente.",
        ],
        [
          "Pagos",
          "Los pagos del viaje pueden realizarse en un pago único o de forma fraccionada en diferentes plazos, confirmando las fechas acordadas para cada uno de ellos. Todas las condiciones de pago se detallarán en la propuesta antes de formalizar la reserva.",
        ],
        [
          "Cambios y modificaciones",
          "Si deseas realizar alguna modificación una vez el viaje ya esté pagado o reservado, nos haremos cargo de gestionarla por ti. Ten en cuenta que cualquier cambio está sujeto a disponibilidad y puede conllevar costes adicionales por parte de los proveedores.",
        ],
        [
          "Cancelaciones y reembolsos",
          "En caso de que decidas cancelar un viaje ya pagado, no podemos asegurar ni garantizar la devolución del dinero abonado. Cualquier posible reembolso dependerá exclusiva y estrictamente de los términos, condiciones y políticas de cancelación de los proveedores (aerolíneas, hoteles, actividades, etc.) utilizados para adquirir cada servicio.",
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
      <p className="leading-relaxed mb-6">
        <strong>{en ? "Website owner" : "Titular del sitio"}:</strong> Ángela Jiménez Galván (SaltySoulTrips)<br />
        <strong>{en ? "ID/NIF" : "NIF/DNI"}:</strong> 49649365R<br />
        <strong>{en ? "Registered address" : "Domicilio fiscal"}:</strong> Calle la Figuera n2, La Papiola, Albinyana<br />
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
