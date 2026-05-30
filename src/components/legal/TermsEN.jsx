import React from 'react';

export default function TermsEN() {
  return (
    <>
      <div className="mb-8">
        <h4 className="text-xl font-bold text-stone-800 mb-4">
          📋 Legal Notice
        </h4>
        <p className="text-stone-600 leading-relaxed mb-4">
          In compliance with the duty of information set out in Article 10 of Law 34/2002, of July 11, on Information Society Services and Electronic Commerce (LSSICE), the following information regarding the owner of this website is provided:
        </p>
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
          <ul className="space-y-2 text-stone-700">
            <li>
              <strong className="text-stone-800">Owner:</strong> Ángela
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
              <strong className="text-stone-800">Website:</strong>{" "}
              <a
                href="https://www.saltysoultrips.com/"
                className="text-brand-sage hover:underline"
              >
                https://www.saltysoultrips.com/
              </a>
            </li>
            <li>
              <strong className="text-stone-800">Location:</strong>{" "}
              Barcelona, Spain
            </li>
          </ul>
        </div>
        <p className="text-stone-600 leading-relaxed mt-4">
          The purpose of this website is to offer personalized travel itineraries.
        </p>
        <p className="text-stone-600 leading-relaxed mt-3">
          Access and use of this website imply the acceptance of these general conditions. The user agrees to make appropriate use of the contents and services, avoiding illegal activities or those contrary to good faith.
        </p>
      </div>

      <hr className="my-8 border-stone-200" />

      <div className="mb-6">
        <h4 className="text-2xl font-bold text-stone-800 mb-6">
          ✨ Terms and Conditions of Service
        </h4>

        {/* Sección 1 */}
        <div className="mb-6 bg-gradient-to-r from-brand-sage/5 to-transparent rounded-xl p-5 border-l-4 border-brand-sage">
          <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">🎯</span> 1. Description of Service
          </h5>
          <p className="text-stone-600 leading-relaxed">
            Saltysoultrips offers{" "}
            <strong>personalized travel advice and planning services</strong>
            . We are not a traditional travel agency and{" "}
            <strong>we do not make bookings on behalf of the client</strong>.
          </p>
        </div>

        {/* Sección 2 */}
        <div className="mb-6 bg-white rounded-xl p-5 border border-stone-200">
          <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">✅</span> 2. What the Service Includes
          </h5>
          <ul className="space-y-2 text-stone-600">
            <li className="flex items-start gap-2">
              <span className="text-brand-sage mt-1">•</span>
              <span>
                Complete and personalized digital itinerary in PDF format
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-sage mt-1">•</span>
              <span>
                Detailed recommendations according to the contracted package (Explore, Live or Connect)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-sage mt-1">•</span>
              <span>
                Direct links for all recommended bookings
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-sage mt-1">•</span>
              <span>Email support during the planning phase</span>
            </li>
          </ul>
        </div>

        {/* Sección 3 */}
        <div className="mb-6 bg-red-50 rounded-xl p-5 border border-red-200">
          <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">❌</span> 3. What the Service DOES NOT Include
          </h5>
          <ul className="space-y-2 text-stone-600">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>
                Making flight, hotel, or activity bookings on behalf of the client
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>
                Management of payments to third parties (airlines, hotels, activity providers)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>
                Travel insurance (although we provide recommendations)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>24/7 support during the trip</span>
            </li>
          </ul>
        </div>

        {/* Sección 4 */}
        <div className="mb-6 bg-white rounded-xl p-5 border border-stone-200">
          <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">💳</span> 4. Payment Method
          </h5>
          <ul className="space-y-2 text-stone-600">
            <li className="flex items-start gap-2">
              <span className="text-brand-sage mt-1">•</span>
              <span>Full payment of the package upon placing the order</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-sage mt-1">•</span>
              <span>
                <strong>Accepted methods:</strong> Bank transfer, Bizum, or PayPal
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-sage mt-1">•</span>
              <span>
                The itinerary is delivered once full payment is confirmed
              </span>
            </li>
          </ul>
        </div>

        {/* Sección 5 */}
        <div className="mb-6 bg-blue-50 rounded-xl p-5 border border-blue-200">
          <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">⏱️</span> 5. Delivery Times
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-stone-600">
            <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
              <div className="font-bold text-stone-800 mb-1">
                Explore Package
              </div>
              <div className="text-sm">5-7 business days</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
              <div className="font-bold text-stone-800 mb-1">
                Live Package
              </div>
              <div className="text-sm">7-10 business days</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
              <div className="font-bold text-stone-800 mb-1">
                Connect Package
              </div>
              <div className="text-sm">10-14 business days</div>
            </div>
          </div>
          <p className="text-sm text-stone-600 mt-3 text-center">
            ⚡ <strong>Express Service</strong> available for a 30% supplement (delivery in 2-3 days)
          </p>
        </div>

        {/* Sección 6 */}
        <div className="mb-6 bg-amber-50 rounded-xl p-5 border border-amber-200">
          <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">🔄</span> 6. Cancellation and Refund Policy
          </h5>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 border-l-4 border-red-500">
              <div className="font-bold text-red-700 mb-1">
                ✗ No refund
              </div>
              <div className="text-sm text-stone-600">
                Once payment is confirmed, no refunds are issued
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border-l-4 border-brand-sage">
              <div className="font-bold text-brand-sage mb-1">
                ✎ Free minor modifications
              </div>
              <div className="text-sm text-stone-600">
                Within 7 days after delivery
              </div>
            </div>
          </div>
        </div>

        {/* Sección 7 */}
        <div className="mb-6 bg-white rounded-xl p-5 border border-stone-200">
          <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">✏️</span> 7. Changes and Modifications
          </h5>
          <ul className="space-y-2 text-stone-600">
            <li className="flex items-start gap-2">
              <span className="text-brand-sage mt-1">•</span>
              <span>
                <strong className="text-green-600">
                  First revision included
                </strong>{" "}
                at no additional cost
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-sage mt-1">•</span>
              <span>
                Major changes (change of destination, dates, or trip duration) have an <strong>additional cost of 30%</strong> of the original package
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-sage mt-1">•</span>
              <span>
                Price updates: we will notify you if there are significant changes in flight/hotel prices within 7 days after delivery
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-sage mt-1">•</span>
              <span>
                Modifications requested after 7 days of delivery are charged as a new service
              </span>
            </li>
          </ul>
        </div>

        {/* Sección 8 */}
        <div className="mb-6 bg-gradient-to-r from-orange-50 to-transparent rounded-xl p-5 border-l-4 border-orange-400">
          <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">⚠️</span> 8. Responsibilities and Limitations
          </h5>
          <ul className="space-y-2 text-stone-600">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">→</span>
              <span>
                Saltysoultrips acts exclusively as a{" "}
                <strong>travel advisor</strong>, not as a travel agency
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">→</span>
              <span>
                We are not responsible for changes in prices, availability, or conditions of services offered by third parties (airlines, hotels, etc.)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">→</span>
              <span>
                It is the <strong>traveler's responsibility</strong> to verify and comply with the visa, vaccine, and documentation requirements for each destination
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">→</span>
              <span>
                We highly recommend purchasing travel insurance before making any booking
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">→</span>
              <span>
                As the client makes their own bookings, any change or cancellation management must be done directly with the corresponding provider
              </span>
            </li>
          </ul>
        </div>

        {/* Sección 9 */}
        <div className="mb-6 bg-white rounded-xl p-5 border border-stone-200">
          <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">©️</span> 9. Intellectual Property
          </h5>
          <p className="text-stone-600 leading-relaxed">
            The itineraries and documents delivered are for the{" "}
            <strong>client's personal use</strong>. Their reproduction, distribution, or commercial use without the express authorization of Saltysoultrips is prohibited.
          </p>
        </div>

        {/* Sección 10 */}
        <div className="bg-gradient-to-r from-brand-sage/10 to-brand-sky/10 rounded-xl p-5 border border-brand-sage/30">
          <h5 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">📧</span> 10. Contact
          </h5>
          <p className="text-stone-600 leading-relaxed">
            For any questions about these terms and conditions, you can contact us at:{" "}
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
