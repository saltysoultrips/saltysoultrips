// Datos completos de destinos para SEO y páginas individuales
export const destinationsData = [
  // --- EUROPA ---
  {
    id: "eu-londres",
    region: "Europa",
    country: "Londres",
    title: "Tradición y Vanguardia",
    slug: "viajes-a-londres",
    img_src:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    description_larga: "Big Ben, el Támesis y barrios con personalidad única.",
    metaDescription: "Escapada a Londres. Cultura, compras y realeza.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Londres",
      tagline: "Cosmopolita por excelencia",
    },
    intro:
      "Londres siempre tiene algo nuevo. Mercados vintage, museos increíbles, pubs históricos y rascacielos futuristas.",
    highlights: [
      { icon: "🎡", title: "London Eye", desc: "Vistas panorámicas" },
      { icon: "👑", title: "Buckingham", desc: "Cambio de guardia" },
      { icon: "🛍️", title: "Camden Town", desc: "Mercado alternativo" },
      { icon: "🖼️", title: "British Museum", desc: "Historia de la humanidad" },
    ],
    bestTime: { months: "Mayo-Septiembre", reason: "Días largos." },
    about: [
      "Londres es una ciudad de contrastes fascinantes. La pompa real de Buckingham Palace convive con el arte callejero de Shoreditch. Los pubs centenarios están a pasos de restaurantes con estrellas Michelin.",
      "Sus museos gratuitos son de los mejores del mundo: el British Museum, la National Gallery, la Tate Modern y el Museo de Historia Natural. Podrías pasar semanas sin repetir.",
      "Cada barrio tiene personalidad propia: Notting Hill y sus casas de colores, Camden y su espíritu alternativo, Greenwich y su meridiano cero, Hampstead y su encanto de pueblo.",
    ],
    color: "from-indigo-800/80",
  },
  {
    id: "eu-milan",
    region: "Europa",
    country: "Milán",
    title: "Moda y Diseño",
    slug: "viajes-a-milan",
    img_src:
      "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?auto=format&fit=crop&w=800&q=80",
    description_larga: "El Duomo, galerías de arte y la elegancia italiana.",
    metaDescription: "Viaje a Milán. Moda, ópera y aperitivos.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Milán",
      tagline: "Elegancia en cada calle",
    },
    intro:
      "Capital de la moda y el diseño. Pero también hogar de La Última Cena de Da Vinci y una catedral gótica impresionante.",
    highlights: [
      { icon: "⛪", title: "Duomo", desc: "Catedral gótica espectacular" },
      { icon: "🛍️", title: "Galleria", desc: "Vittorio Emanuele II" },
      { icon: "🎨", title: "Última Cena", desc: "Obra maestra de Da Vinci" },
      { icon: "🍹", title: "Aperitivo", desc: "Tradición milanesa en Navigli" },
    ],
    bestTime: { months: "Abril-Junio", reason: "Primavera." },
    about: [
      "Milán es la capital italiana del estilo y el diseño, pero también esconde tesoros artísticos extraordinarios. El Duomo, con sus miles de estatuas y agujas góticas, es una de las catedrales más impresionantes de Europa.",
      "La Última Cena de Leonardo da Vinci, en el refectorio de Santa Maria delle Grazie, es una experiencia que pone los pelos de punta. Las entradas se agotan meses antes: reserva con antelación.",
      "La tradición del aperitivo milanese es sagrada: por el precio de un spritz o negroni, accedes a buffets generosos en los bares de los Navigli. Es la forma perfecta de cerrar el día.",
    ],
    color: "from-stone-600/80",
  },
  {
    id: "eu-madrid",
    region: "Europa",
    country: "Madrid",
    title: "Vida y Arte",
    slug: "viajes-a-madrid",
    img_src:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80",
    description_larga: "Museos de clase mundial, tapas y noches interminables.",
    metaDescription: "Descubre Madrid. Arte, comida y vida nocturna.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Madrid",
      tagline: "La ciudad que abraza",
    },
    intro:
      "Madrid es pura energía. Arte en el Prado, relax en el Retiro y la mejor vida nocturna de Europa.",
    highlights: [
      { icon: "🖼️", title: "Museo del Prado", desc: "Goya, Velázquez y más" },
      { icon: "🌳", title: "El Retiro", desc: "Desconexión verde" },
      { icon: "🥘", title: "Mercado San Miguel", desc: "Tapas gourmet" },
      { icon: "👑", title: "Palacio Real", desc: "Residencia histórica" },
    ],
    bestTime: { months: "Primavera/Otoño", reason: "Clima perfecto." },
    about: [
      "Madrid es una ciudad que vive en la calle. Las terrazas de la Plaza Mayor, los bares de Malasaña y los tablaos flamencos de La Latina crean un ambiente irresistible a cualquier hora del día.",
      "El triángulo del arte (Prado, Reina Sofía, Thyssen) concentra una de las mayores colecciones de pintura del mundo: Velázquez, Goya, Picasso, Dalí... todo en pocas manzanas.",
      "El Parque del Retiro es el pulmón verde de la ciudad: paseos en barca, el Palacio de Cristal y conciertos al aire libre. Y cuando cae la noche, Madrid demuestra por qué nunca duerme.",
    ],
    color: "from-red-600/80",
  },
  {
    id: "eu-portugal",
    region: "Europa",
    country: "Portugal",
    title: "Encanto Atlántico",
    slug: "viajes-a-portugal",
    img_src:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80",
    description_larga: "Azulejos, fado, vinos y costas espectaculares.",
    metaDescription: "Ruta por Portugal. Lisboa, Oporto y Algarve.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Portugal",
      tagline: "Melancolía y belleza",
    },
    intro:
      "Un país volcado al mar. Ciudades decadentes con encanto, pasteles de nata y acantilados dramáticos.",
    highlights: [
      { icon: "🚋", title: "Tranvía 28", desc: "Icono de Lisboa" },
      { icon: "🍷", title: "Oporto", desc: "Bodegas y río Duero" },
      { icon: "🏰", title: "Sintra", desc: "Palacios de cuento" },
      { icon: "🏖️", title: "Algarve", desc: "Playas doradas" },
    ],
    bestTime: { months: "Mayo-Octubre", reason: "Sol y playa." },
    about: [
      "Portugal es un país que enamora desde el primer momento. Lisboa hechiza con sus barrios históricos (Alfama, Belém, Bairro Alto), sus tranvías amarillos y sus miradores con vistas al Tajo.",
      "Oporto rivaliza en encanto: las bodegas de vino de Porto, la librería Lello (inspiración para Harry Potter) y las fachadas cubiertas de azulejos crean una estética única en el mundo.",
      "El Algarve, al sur, ofrece acantilados dorados, cuevas marinas y algunas de las mejores playas de Europa. Y Sintra, a 30 minutos de Lisboa, es un cuento de hadas con palacios de colores.",
    ],
    color: "from-green-700/80",
  },
  {
    id: "eu-francia",
    region: "Europa",
    country: "Francia",
    title: "Art de Vivre",
    slug: "viajes-a-francia",
    img_src:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    description_larga: "París, la Provenza, los Alpes y gastronomía exquisita.",
    metaDescription: "Viaje a Francia. París romántico y viñedos.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Francia",
      tagline: "Romance y sabor",
    },
    intro:
      "El destino más visitado por una razón. Estilo, historia y una gastronomía que es Patrimonio de la Humanidad.",
    highlights: [
      { icon: "🗼", title: "Torre Eiffel", desc: "Símbolo de París" },
      { icon: "🍇", title: "Viñedos", desc: "Rutas de vino en Burdeos" },
      { icon: "🏰", title: "Loira", desc: "Castillos renacentistas" },
      { icon: "🥐", title: "Boulangerie", desc: "El arte del pan" },
    ],
    bestTime: { months: "Todo el año", reason: "Siempre es buen momento." },
    about: [
      "Francia es el país más visitado del mundo por buenas razones. París deslumbra con la Torre Eiffel, el Louvre y Montmartre, pero el verdadero tesoro está fuera de la capital.",
      "La Provenza embriaga con sus campos de lavanda y pueblos medievales. Burdeos y Borgoña invitan a rutas de vino inolvidables. La Costa Azul mezcla glamour y calas escondidas.",
      "Su gastronomía es Patrimonio Inmaterial de la Humanidad: desde los croissants y quesos artesanos hasta la alta cocina con más estrellas Michelin que ningún otro país.",
    ],
    color: "from-blue-600/80",
  },
  {
    id: "eu-luxemburgo",
    region: "Europa",
    country: "Luxemburgo",
    title: "Corazón de Europa",
    slug: "viajes-a-luxemburgo",
    img_src:
      "https://images.unsplash.com/photo-1534313314376-a72289b6181e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description_larga: "Castillos de cuento, valles verdes y fortificaciones.",
    metaDescription: "Descubre Luxemburgo. Naturaleza y patrimonio.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1534313314376-a72289b6181e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      subtitle: "Luxemburgo",
      tagline: "Pequeño pero grandioso",
    },
    intro:
      "Un ducado lleno de sorpresas. Naturaleza exuberante, castillos medievales y una capital cosmopolita construida sobre barrancos.",
    highlights: [
      { icon: "🏰", title: "Vianden", desc: "Castillo espectacular" },
      {
        icon: "🏞️",
        title: "Mullerthal",
        desc: "La pequeña Suiza luxemburguesa",
      },
      { icon: "🌉", title: "Adolphe Bridge", desc: "Icono de la ciudad" },
      { icon: "🥂", title: "Mosela", desc: "Región vinícola" },
    ],
    bestTime: { months: "Verano", reason: "Clima suave." },
    about: [
      "Luxemburgo es una sorpresa constante. Este pequeño gran ducado esconde barrancos espectaculares, castillos medievales sacados de una película y una capital cosmopolita que mezcla lo histórico con lo ultramoderno.",
      "La ciudad de Luxemburgo impresiona con sus casamatas (Patrimonio UNESCO), el barrio del Grund en el fondo del valle y el centro financiero de Kirchberg con su arquitectura vanguardista.",
      "El Mullerthal Trail, conocido como la Pequeña Suiza, ofrece rutas de senderismo entre formaciones rocosas de arenisca. Y dato único: el transporte público es completamente gratuito en todo el país.",
    ],
    color: "from-sky-700/80",
  },
  {
    id: "eu-barcelona",
    region: "Europa",
    country: "Barcelona",
    title: "Modernismo y Mar",
    slug: "viajes-a-barcelona",
    img_src:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
    description_larga: "Gaudí, playas urbanas y una arquitectura única.",
    metaDescription: "Viaje a Barcelona. Sagrada Familia y tapas.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Barcelona",
      tagline: "Vanguardia mediterránea",
    },
    intro:
      "Barcelona inspira a cada paso. La genialidad de Gaudí, el ambiente del Barrio Gótico y la brisa del mar Mediterráneo.",
    highlights: [
      {
        icon: "⛪",
        title: "Sagrada Familia",
        desc: "La obra maestra inacabada",
      },
      { icon: "🦎", title: "Park Güell", desc: "Fantasía modernista" },
      { icon: "🏖️", title: "Barceloneta", desc: "Playa y chiringuitos" },
      { icon: "🏘️", title: "Barrio Gótico", desc: "Laberinto medieval" },
    ],
    bestTime: { months: "Mayo-Junio", reason: "Primavera junto al mar." },
    about: [
      "Barcelona es un museo al aire libre. La genialidad de Gaudí salpica toda la ciudad: la Sagrada Familia, el Park Güell, la Casa Batlló y La Pedrera son obras únicas en el mundo.",
      "El Barrio Gótico esconde plazas medievales, tiendas vintage y bares de tapas entre callejones que cuentan siglos de historia. La Barceloneta ofrece chiringuitos y paseo marítimo.",
      "La escena gastronómica combina cocina catalana tradicional (pa amb tomàquet, escalivada, crema catalana) con propuestas de vanguardia. El Mercat de la Boqueria es un festín para los sentidos.",
    ],
    color: "from-purple-700/80",
  },

  // --- ASIA & ORIENTE ---
  {
    id: "asia-tailandia",
    region: "Asia & Oriente",
    country: "Tailandia",
    title: "El Reino de las Sonrisas",
    slug: "viajes-a-tailandia",
    img_src:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
    description_larga:
      "Playas paradisíacas, templos dorados y una gastronomía vibrante.",
    metaDescription:
      "Viaje a Tailandia a medida. Bangkok, Chiang Mai y playas. Sin comisiones.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Tailandia",
      tagline: "Donde la espiritualidad se encuentra con el paraíso",
    },
    intro:
      "Tailandia es un festín para los sentidos. Desde el caos fascinante de Bangkok hasta la calma de las islas del sur, cada rincón es una postal.",
    highlights: [
      { icon: "🏯", title: "Gran Palacio", desc: "El corazón de Bangkok" },
      {
        icon: "🐘",
        title: "Santuarios",
        desc: "Elefantes en libertad en Chiang Mai",
      },
      {
        icon: "🏝️",
        title: "Islas Phi Phi",
        desc: "Aguas turquesas y acantilados",
      },
      { icon: "🍜", title: "Street Food", desc: "El mejor Pad Thai del mundo" },
    ],
    bestTime: { months: "Noviembre-Febrero", reason: "Clima fresco y seco." },
    about: [
      "Tailandia es el destino perfecto para quienes buscan una mezcla de cultura milenaria, naturaleza exuberante y gastronomía explosiva. Desde los templos dorados de Bangkok hasta las playas de ensueño de las islas del sur.",
      "El norte ofrece experiencias completamente diferentes: Chiang Mai es la capital cultural, con mercados nocturnos, templos en las montañas y santuarios éticos de elefantes. Chiang Rai sorprende con el Templo Blanco.",
      "La comida tailandesa es una experiencia en sí misma. Cada región tiene su especialidad: desde el khao soi del norte hasta el massaman curry del sur. Los mercados flotantes y los puestos callejeros son el alma del país.",
    ],
    color: "from-amber-500/80",
  },
  {
    id: "asia-bali",
    region: "Asia & Oriente",
    country: "Indonesia (Bali)",
    title: "La Isla de los Dioses",
    slug: "viajes-a-bali",
    img_src:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description_larga: "Arrozales, yoga, surf y una cultura espiritual única.",
    metaDescription:
      "Tu viaje a Bali diseñado a medida. Templos, arrozales, yoga, playas y espiritualidad. Itinerarios únicos sin comisiones. ⭐ 5 estrellas.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      subtitle: "Espiritualidad",
      tagline: "La isla de los dioses donde el alma encuentra paz",
    },
    intro:
      "Bali es mucho más que playas paradisíacas. Es espiritualidad en cada templo, paz en cada arrozal y energía en cada atardecer. Desde retiros de yoga en Ubud hasta fiestas en Seminyak y surf en Uluwatu, diseñamos tu Bali según tu vibra.",
    highlights: [
      { icon: "🛕", title: "Templos", desc: "Tanah Lot, Uluwatu, Tirta Empul" },
      { icon: "🌾", title: "Arrozales", desc: "Tegallalang y paisajes verdes" },
      {
        icon: "🧘",
        title: "Yoga & Wellness",
        desc: "Retiros espirituales en Ubud",
      },
      { icon: "🏄", title: "Surf", desc: "Olas perfectas en Uluwatu" },
      { icon: "🐒", title: "Monkey Forest", desc: "Bosque sagrado de macacos" },
      { icon: "🌺", title: "Ceremonias", desc: "Rituales hindúes diarios" },
    ],
    bestTime: {
      months: "Abril-Octubre",
      reason:
        "Estación seca. Noviembre-marzo es monzón (lluvias por la tarde, pero menos turistas).",
    },
    about: [
      "Bali es mucho más que la 'isla de los dioses'. Es un universo de arrozales esmeralda, templos ancestrales envueltos en incienso y acantilados sobre el océano Índico que quitan el aliento.",
      "Ubud es el corazón espiritual: yoga, meditación, talleres de artesanía y el famoso Monkey Forest. Seminyak y Canggu atraen a surfistas y nómadas digitales con sus beach clubs y cafés hipster.",
      "Los templos de Tanah Lot, Uluwatu y Besakih son imprescindibles. Y no te pierdas las cascadas escondidas en la jungla (Sekumpul, Tukad Cepung) ni el amanecer desde el Monte Batur.",
    ],
    color: "from-emerald-900/70",
  },
  {
    id: "asia-qatar",
    region: "Asia & Oriente",
    country: "Qatar",
    title: "Lujo en el Desierto",
    slug: "viajes-a-qatar",
    img_src:
      "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=800&q=80",
    description_larga:
      "Arquitectura futurista, zocos tradicionales y dunas infinitas.",
    metaDescription: "Descubre Qatar. Doha, desierto y cultura árabe moderna.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Qatar",
      tagline: "El corazón moderno de Oriente Medio",
    },
    intro:
      "Una joya emergente que combina tradición y futuro. Desde el zoco Souq Waqif hasta la isla artificial The Pearl.",
    highlights: [
      { icon: "🏙️", title: "Doha Skyline", desc: "Arquitectura de vanguardia" },
      {
        icon: "🏺",
        title: "Museo Islámico",
        desc: "Arte y diseño de I.M. Pei",
      },
      { icon: "🏜️", title: "Safari 4x4", desc: "Dunas que llegan al mar" },
      {
        icon: "🛍️",
        title: "Souq Waqif",
        desc: "El mercado tradicional vibrante",
      },
    ],
    bestTime: { months: "Noviembre-Marzo", reason: "Clima agradable." },
    about: [
      "Qatar ha pasado de ser un pequeño emirato del desierto a convertirse en un centro cultural de primer nivel. Doha deslumbra con su skyline futurista y museos diseñados por los mejores arquitectos del mundo.",
      "El Museo de Arte Islámico, obra de I.M. Pei, alberga la colección más importante del mundo. La Biblioteca Nacional y el Museo Nacional completan una oferta cultural impresionante.",
      "Fuera de la ciudad, el Mar Interior (Khor Al Adaid) es un fenómeno natural único: dunas gigantes que se funden directamente con el mar, perfecto para safaris en 4x4 y acampadas bajo las estrellas.",
    ],
    color: "from-rose-900/80",
  },
  {
    id: "asia-abudhabi",
    region: "Asia & Oriente",
    country: "Abu Dhabi",
    title: "Cultura y Esplendor",
    slug: "viajes-a-abu-dhabi",
    img_src:
      "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800&q=80",
    description_larga:
      "La Gran Mezquita Sheikh Zayed y el Louvre en el desierto.",
    metaDescription: "Viaje a Abu Dhabi. Cultura, lujo y desierto.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Abu Dhabi",
      tagline: "Majestuosidad en cada rincón",
    },
    intro:
      "Más allá de los rascacielos, Abu Dhabi es un centro cultural emergente con museos de clase mundial y arquitectura imposible.",
    highlights: [
      {
        icon: "🕌",
        title: "Gran Mezquita",
        desc: "Una obra maestra de mármol blanco",
      },
      {
        icon: "🖼️",
        title: "Louvre Abu Dhabi",
        desc: "Arte bajo una cúpula de lluvia de luz",
      },
      { icon: "🏎️", title: "Ferrari World", desc: "Adrenalina y lujo" },
      {
        icon: "🏝️",
        title: "Isla Saadiyat",
        desc: "Playas de arena blanca y museos",
      },
    ],
    bestTime: { months: "Invierno", reason: "Evita el calor extremo." },
    about: [
      "Abu Dhabi combina tradición árabe con visión futurista. La Gran Mezquita Sheikh Zayed, con sus 82 cúpulas y mármoles blancos, es una de las maravillas arquitectónicas del siglo XXI.",
      "El Louvre Abu Dhabi, diseñado por Jean Nouvel, trae el arte universal al desierto bajo una cúpula que filtra la luz como lluvia de estrellas. El Qasr Al Watan abre las puertas del palacio presidencial.",
      "Más allá de la cultura, la isla de Saadiyat ofrece playas vírgenes, mientras que Yas Island concentra el circuito de Fórmula 1, Ferrari World y parques acuáticos de última generación.",
    ],
    color: "from-yellow-600/80",
  },
  {
    id: "asia-maldivas",
    region: "Asia & Oriente",
    country: "Maldivas",
    title: "El Paraíso en la Tierra",
    slug: "viajes-a-maldivas",
    img_src:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description_larga: "Villas sobre el agua y atolones de coral cristalino.",
    metaDescription: "Luna de miel en Maldivas. Resort de lujo y buceo.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      subtitle: "Maldivas",
      tagline: "Maldivas no es solo un destino, es una sensación.",
    },
    intro:
      "El destino definitivo de relax. Despierta sobre el océano Índico y sumérgete en un acuario natural.",
    highlights: [
      {
        icon: "🏝️",
        title: "Villas Overwater",
        desc: "Alojamientos sobre el agua cristalina",
      },
      {
        icon: "🦈",
        title: "Tiburones Ballena",
        desc: "Snorkel con los gigantes gentiles",
      },
      {
        icon: "🐢",
        title: "Tortugas Marinas",
        desc: "Encuentros en cada inmersión",
      },
      { icon: "️", title: "Cenas Privadas", desc: "Gastronomía en la playa" },
    ],
    bestTime: {
      months: "Diciembre-Abril",
      reason: "Monzón seco.",
    },
    about: [
      "Maldivas es un mundo bajo el agua. Es sinónimo de fauna marina libre: tiburones nodriza, tiburón ballena, mantarrayas y miles de peces que convierten cada snorkel en un espectáculo natural. ",
    ],
    color: "from-cyan-500/80",
  },

  // --- ESTADOS UNIDOS ---
  {
    id: "usa-ny",
    region: "Estados Unidos",
    country: "Nueva York",
    title: "La Ciudad Que Nunca Duerme",
    slug: "viajes-a-nueva-york",
    img_src:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    description_larga: "Times Square, Central Park y rascacielos icónicos.",
    metaDescription: "Viaje a NYC a medida. Manhattan, Brooklyn y más.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Nueva York",
      tagline: "Energía inagotable",
    },
    intro:
      "La capital del mundo te espera. Un escenario de película en cada esquina, desde Broadway hasta el Village.",
    highlights: [
      { icon: "🗽", title: "Estatua Libertad", desc: "Símbolo de esperanza" },
      {
        icon: "🌳",
        title: "Central Park",
        desc: "El pulmón verde de la ciudad",
      },
      {
        icon: "🎭",
        title: "Broadway",
        desc: "Los mejores musicales del mundo",
      },
      {
        icon: "🌉",
        title: "Brooklyn Bridge",
        desc: "Cruzarlo al amanecer es mágico",
      },
    ],
    bestTime: { months: "Otoño/Primavera", reason: "Clima ideal." },
    about: [
      "Nueva York es una ciudad que no necesita presentación. Cada barrio es un mundo: Manhattan deslumbra con sus rascacielos, Brooklyn enamora con su creatividad y Queens sorprende con su diversidad gastronómica.",
      "Más allá de los clásicos (Estatua de la Libertad, Times Square, Central Park), descubre el High Line, el mercado de Chelsea, los murales de Bushwick y las vistas desde DUMBO.",
      "La escena cultural es inigualable: Broadway, el MET, el MoMA, el Guggenheim... Y cuando cae la noche, los bares de cócteles de Greenwich Village y los clubs de jazz de Harlem cobran vida.",
    ],
    color: "from-blue-800/80",
  },
  {
    id: "usa-boston",
    region: "Estados Unidos",
    country: "Boston",
    title: "Historia y Academia",
    slug: "viajes-a-boston",
    img_src:
      "https://images.unsplash.com/photo-1501979376754-2ff867a4f659?auto=format&fit=crop&w=800&q=80",
    description_larga:
      "Encanto colonial, Harvard y la costa de Nueva Inglaterra.",
    metaDescription: "Descubre Boston. Historia americana y marisco.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1501979376754-2ff867a4f659?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Boston",
      tagline: "Donde nació la nación",
    },
    intro:
      "Un paseo por la historia de EEUU. Calles empedradas, ambiente universitario y la mejor sopa de almejas.",
    highlights: [
      { icon: "👣", title: "Freedom Trail", desc: "Ruta histórica de 4km" },
      { icon: "🎓", title: "Harvard y MIT", desc: "El cerebro de América" },
      {
        icon: "⚾",
        title: "Fenway Park",
        desc: "El estadio más antiguo de la MLB",
      },
      {
        icon: "🦞",
        title: "Lobster Roll",
        desc: "Gastronomía local imprescindible",
      },
    ],
    bestTime: { months: "Junio-Octubre", reason: "Verano y otoño." },
    about: [
      "Boston es la cuna de la revolución americana y una de las ciudades más elegantes de la costa este. Su casco histórico de ladrillos rojos y calles empedradas transporta al siglo XVIII.",
      "La ciudad alberga las universidades más prestigiosas del mundo: Harvard y MIT. El campus de Harvard Yard es visitable y su ambiente académico contagioso.",
      "La gastronomía de Nueva Inglaterra brilla aquí: lobster rolls en el puerto, clam chowder y ostras frescas. Fenway Park, el estadio de béisbol más antiguo de la MLB, es otra parada obligatoria.",
    ],
    color: "from-red-800/80",
  },
  {
    id: "usa-dc",
    region: "Estados Unidos",
    country: "Washington D.C.",
    title: "El Poder de la Historia",
    slug: "viajes-a-washington",
    img_src:
      "https://images.unsplash.com/photo-1617581629397-a72507c3de9e?auto=format&fit=crop&w=800&q=80",
    description_larga: "Monumentos, museos Smithsonianos y el Capitolio.",
    metaDescription: "Viaje a Washington DC. Política y cultura.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1617581629397-a72507c3de9e?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Washington D.C.",
      tagline: "Monumental y solemne",
    },
    intro:
      "Más que política, es historia viva. Museos gratuitos de clase mundial y monumentos que inspiran respeto.",
    highlights: [
      {
        icon: "🏛️",
        title: "El Capitolio",
        desc: "El corazón de la democracia",
      },
      { icon: "🚀", title: "Museo del Aire", desc: "Historia de la aviación" },
      {
        icon: "🇺🇸",
        title: "Lincoln Memorial",
        desc: "Mirando al National Mall",
      },
      { icon: "🏠", title: "Casa Blanca", desc: "Icono mundial" },
    ],
    bestTime: { months: "Marzo-Junio", reason: "Cerezos en flor." },
    about: [
      "Washington D.C. es mucho más que política. El National Mall concentra algunos de los museos más impresionantes del mundo, todos gratuitos, desde historia natural hasta exploración espacial.",
      "Los monumentos al atardecer son sobrecogedores: el Lincoln Memorial reflejado en el Reflecting Pool, el Washington Monument iluminado y el Jefferson Memorial rodeado de cerezos en primavera.",
      "Georgetown ofrece boutiques y restaurantes encantadores, mientras que el barrio de Adams Morgan late con la mejor vida nocturna y comida internacional de la capital.",
    ],
    color: "from-slate-700/80",
  },

  // --- ISLAS Y PARAÍSOS ---
  {
    id: "islas-fuerteventura",
    region: "Islas y Paraísos",
    country: "Fuerteventura",
    title: "Playas Infinitas",
    slug: "viajes-a-fuerteventura",
    img_src:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description_larga: "Dunas, volcanes y las mejores playas de Canarias.",
    metaDescription: "Viaje a Fuerteventura. Surf, dunas de Corralejo y relax.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Fuerteventura",
      tagline: "El Caribe europeo",
    },
    intro:
      "Fuerteventura es sinónimo de libertad. Kilómetros de playas vírgenes, paisajes volcánicos que parecen de Marte y un ritmo de vida pausado.",
    highlights: [
      {
        icon: "🏖️",
        title: "Dunas de Corralejo",
        desc: "Desierto junto al mar turquesa",
      },
      {
        icon: "🌋",
        title: "Calderón Hondo",
        desc: "Caminata al borde de un volcán",
      },
      {
        icon: "🐐",
        title: "Betancuria",
        desc: "Pueblo histórico y quesos majoreros",
      },
      {
        icon: "🏄",
        title: "Surf",
        desc: "Olas de clase mundial en El Cotillo",
      },
    ],
    bestTime: { months: "Todo el año", reason: "Eterna primavera." },
    about: [
      "Fuerteventura es la isla más antigua del archipiélago canario y una Reserva de la Biosfera declarada por la UNESCO. Sus paisajes desérticos y lunares contrastan con kilómetros de playas de arena blanca y aguas cristalinas.",
      "El Parque Natural de las Dunas de Corralejo es su joya natural: un desierto que se funde con el mar turquesa. Más al sur, la remota playa de Cofete ofrece una experiencia salvaje e inolvidable bajo los acantilados de Jandía.",
      "La gastronomía local gira en torno al queso majorero (DOP), las papas arrugadas con mojo y el pescado fresco. Una isla para desconectar de verdad.",
    ],
    color: "from-orange-500/80",
  },
  {
    id: "islas-menorca",
    region: "Islas y Paraísos",
    country: "Menorca",
    title: "Calma Mediterránea",
    slug: "viajes-a-menorca",
    img_src:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    description_larga:
      "Calas turquesas, senderos históricos y atardeceres mágicos.",
    metaDescription: "Viaje a Menorca. Camí de Cavalls, Ciutadella y relax.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Menorca",
      tagline: "La joya tranquila de Baleares",
    },
    intro:
      "Menorca es la isla de la calma. Reserva de la Biosfera, sus calas vírgenes y pueblos blancos te invitan a desconectar del mundo.",
    highlights: [
      {
        icon: "🌊",
        title: "Macarella & Macarelleta",
        desc: "Las calas más famosas",
      },
      {
        icon: "🏰",
        title: "Ciutadella",
        desc: "Casco antiguo señorial y puerto",
      },
      {
        icon: "🥾",
        title: "Camí de Cavalls",
        desc: "Senderismo rodeando la isla",
      },
      {
        icon: "🌅",
        title: "Cova d'en Xoroi",
        desc: "Atardecer en un acantilado",
      },
    ],
    bestTime: {
      months: "Junio/Septiembre",
      reason: "Menos gente que en agosto.",
    },
    about: [
      "Menorca es la isla tranquila de las Baleares, declarada Reserva de la Biosfera por la UNESCO. Sus calas de aguas turquesas entre acantilados de piedra caliza son las más fotogénicas del Mediterráneo.",
      "Ciutadella, la antigua capital, enamora con su casco histórico de calles empedradas y palacios señoriales. El puerto al atardecer es simplemente mágico. Monte Toro, el punto más alto, ofrece vistas panorámicas de toda la isla.",
      "La isla alberga monumentos prehistóricos únicos: las taulas y navetas talayóticas son anteriores a las pirámides de Egipto. Y su gastronomía incluye la caldereta de langosta, plato estrella de Fornells.",
    ],
    color: "from-teal-600/80",
  },
  {
    id: "islas-mallorca",
    region: "Islas y Paraísos",
    country: "Mallorca",
    title: "Contrastes y Belleza",
    slug: "viajes-a-mallorca",
    img_src:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80",
    description_larga:
      "Sierra de Tramuntana, calas escondidas y vida cosmopolita.",
    metaDescription: "Viaje a Mallorca. Palma, montañas y playas de ensueño.",
    hero: {
      image:
        "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1920&q=80",
      subtitle: "Mallorca",
      tagline: "Lo tiene todo",
    },
    intro:
      "Mallorca sorprende por su diversidad. Desde la majestuosa Sierra de Tramuntana hasta las aguas cristalinas del sureste y la vibrante Palma.",
    highlights: [
      { icon: "⛰️", title: "Tramuntana", desc: "Patrimonio de la Humanidad" },
      { icon: "⛪", title: "Catedral de Palma", desc: "Gótico frente al mar" },
      {
        icon: "🚆",
        title: "Tren de Sóller",
        desc: "Viaje en el tiempo entre montañas",
      },
      { icon: "🏖️", title: "Caló des Moro", desc: "Una piscina natural" },
    ],
    bestTime: {
      months: "Primavera/Otoño",
      reason: "Ideal para senderismo y playa.",
    },
    about: [
      "Mallorca es mucho más que sol y playa. La Sierra de Tramuntana, Patrimonio de la Humanidad, ofrece rutas de senderismo espectaculares entre pueblos de piedra como Valldemossa, Deià y Sóller.",
      "Palma, la capital, combina una catedral gótica impresionante (La Seu), galerías de arte contemporáneo y una escena gastronómica en auge. El barrio de Santa Catalina es perfecto para tapas y cócteles.",
      "Las calas del este (Mondragó, Varques, Llombards) rivalizan con las del Caribe, mientras que la zona norte alberga la espectacular carretera de Sa Calobra, una de las más bellas del mundo.",
    ],
    color: "from-blue-500/80",
  },
];

// Helper para encontrar destino por slug
export const getDestinationBySlug = (slug) => {
  return destinationsData.find((d) => d.slug === slug);
};

// Lista de slugs para generar rutas
export const destinationSlugs = destinationsData.map((d) => d.slug);
