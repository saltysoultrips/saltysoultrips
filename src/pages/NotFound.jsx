import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import SEOHead from "../components/SEOHead";

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="404 - Vuelo Cancelado | SaltySoulTrips"
        description="Ups.. Este vuelo no ha despegado. La página que buscas se ha cancelado por turbulencias."
        canonicalUrl="https://www.saltysoultrips.com/404"
      />
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 text-center bg-sky-50 overflow-hidden relative">
        {/* Background Clouds */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: "120vw", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-0 text-white/40 pointer-events-none"
        >
          <CloudIcon size={120} />
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: "120vw", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 10,
          }}
          className="absolute top-40 left-0 text-white/30 pointer-events-none"
        >
          <CloudIcon size={80} />
        </motion.div>

        {/* Animated Plane */}
        <motion.div
          initial={{ x: -200, y: 100, rotate: 15 }}
          animate={{
            x: [null, 200, 0],
            y: [null, -50, 0],
            rotate: [15, -10, 0, 180, 360], // Loop-the-loop animation attempt
          }}
          transition={{
            duration: 2,
            ease: "circOut",
            times: [0, 0.6, 1],
          }}
          className="mb-8 text-brand-salmon relative z-10"
        >
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0], // Turbulence shake
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Plane size={120} strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold text-brand-sage mb-2">
            Ups...
          </h1>
          <h2 className="text-2xl md:text-3xl font-display text-stone-700 mb-6 font-semibold">
            Este vuelo no ha despegado
          </h2>
          <p className="text-lg text-stone-600 mb-10 max-w-lg mx-auto leading-relaxed">
            La página que buscas se ha cancelado por turbulencias. <br />
            Mejor volvamos a tierra firme.
          </p>

          <Link
            to="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-brand-sage text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:bg-brand-sage-dark hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-sage focus:ring-offset-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Plane className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-45" />
              Reprogramar viaje
            </span>
          </Link>
        </motion.div>
      </div>
    </>
  );
}

function CloudIcon({ size }) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.132 20.177 10.244 17.819 10.034C17.497 6.619 14.631 4 11 4C7.68629 4 5 6.68629 5 10C2.23858 10 0 12.2386 0 15C0 17.7614 2.23858 20 5 20H17.5V19Z" />
    </svg>
  );
}
