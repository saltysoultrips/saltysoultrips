# 📖 Guía de Mantenimiento - SaltySoulTrips

Esta guía te ayudará a modificar el contenido visual de la web sin necesidad de saber programación. Aquí encontrarás instrucciones paso a paso sobre qué archivos modificar para cada tipo de cambio.

---

## 📋 Índice

1. [Herramientas Necesarias](#-herramientas-necesarias)
2. [Estructura de la Web](#-estructura-de-la-web)
3. [Cambiar Textos](#-cambiar-textos)
4. [Añadir o Modificar Reseñas](#-añadir-o-modificar-reseñas)
5. [Cambiar Imágenes](#-cambiar-imágenes)
6. [Modificar Packs/Servicios](#-modificar-packsservicios)
7. [Cambiar Información de Contacto](#-cambiar-información-de-contacto)
8. [Consejos Importantes](#-consejos-importantes)

---

## 🛠 Herramientas Necesarias

Para editar la web necesitarás:

1. **Editor de Código** (recomendado):

   - **Visual Studio Code** (gratis): [Descargar aquí](https://code.visualstudio.com/)
   - Es como el Word, pero para código
   - Es el mismo programa donde probablemente estés leyendo esto

2. **Acceso a la carpeta del proyecto**:
   - La ubicación actual es: `c:\Users\ikerd\Documents\saltysoultrips`

---

## 🏗 Estructura de la Web

La web está dividida en secciones. Cada sección tiene su propio archivo:

```
📁 saltysoultrips/
├── 📁 public/                    → Aquí van las IMÁGENES (organizadas)
│   ├── 📁 reseñas/              → Fotos de reseñas de clientes
│   │   ├── keylareseña.jpg
│   │   ├── marcoreseña.jpeg
│   │   └── ...
│   ├── 📁 paquetes/            → Imágenes de paquetes/servicios
│   │   ├── explora.png
│   │   ├── vive.png
│   │   └── conecta.png
│   ├── 📁 resto/               → Logos y otros recursos
│   │   ├── logo.png
│   │   ├── logoHorizontal.png
│   │   ├── angela.jpeg
│   │   └── vite.svg
│   └── robots.txt
│
├── 📁 src/
│   └── 📁 components/
│       └── 📁 sections/          → Aquí están las SECCIONES de la web
│           ├── Hero.jsx          → Sección principal (primer vistazo)
│           ├── Services.jsx      → Paquetes de servicios
│           ├── Testimonials.jsx  → Reseñas de clientes
│           ├── FAQ.jsx           → Preguntas frecuentes
│           └── ContactForm.jsx   → Formulario de contacto
```

---

## ✏ Cambiar Textos

### 🌟 Sección Principal (Hero)

**Archivo a modificar:** `src/components/sections/Hero.jsx`

1. Abre el archivo `Hero.jsx`
2. Busca las líneas que quieres cambiar:

```javascript
// TÍTULO PRINCIPAL
<h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-800 mb-6 leading-tight">
  Viajes a tu gusto <br className="hidden md:block" />
</h1>

// DESCRIPCIÓN
<p className="mt-4 max-w-2xl mx-auto text-xl text-stone-600 mb-10 font-light">
  No somos una agencia de viajes. Somos consultoras de optimización:
  hacemos "ingeniería inversa" de tu presupuesto para conseguir
  experiencias de lujo a precio de coste.
</p>

// BOTÓN PRINCIPAL
<a href="#contact">
  Empieza a planear <MousePointerClick size={18} />
</a>

// BOTÓN SECUNDARIO
<a href="#services">
  Ver nuestros packs
</a>
```

**Qué puedes cambiar:**

- El texto entre `>` y `<`
- Ejemplo: cambiar `Viajes a tu gusto` por `Aventuras a medida`

**⚠️ NO CAMBIES:**

- Las comillas `"` y `'`
- Las palabras como `className`, `href`, etc.

---

### 📦 Sección de Servicios/Packs

**Archivo a modificar:** `src/components/sections/Services.jsx`

1. Abre el archivo `Services.jsx`
2. Busca la sección `const packs = [` (aproximadamente línea 8)

Aquí verás 3 paquetes. Ejemplo del primero:

```javascript
{
  title: "PAQUETE EXPLORA",           // 👈 Nombre del paquete
  price: "70 €",                       // 👈 Precio
  image: "/paquetes/explora.png",     // 👈 Imagen del paquete
  features: [                          // 👈 Características principales
    "Búsqueda de vuelos",
    "Alojamiento"
  ],
  details: [                           // 👈 Detalles incluidos
    "Presupuesto aproximado",
    "Lugares de interés",
    "Gastronomía típica",
    "Apps esenciales para el destino",
  ],
  idealFor: "Viajeros independientes..." // 👈 Para quién es ideal
}
```

**Para cambiar el precio:**

```javascript
price: "70 €",  // Cambia solo el número o precio
```

**Para añadir más detalles:**

```javascript
details: [
  "Presupuesto aproximado",
  "Lugares de interés",
  "Gastronomía típica",
  "Apps esenciales para el destino",
  "Tu nuevo detalle aquí",  // 👈 Añade aquí
],
```

**⚠️ IMPORTANTE:**

- Mantén las comillas `"` alrededor del texto
- Mantén las comas `,` al final de cada línea
- Si es el último elemento de la lista, NO pongas coma

---

## 💬 Añadir o Modificar Reseñas

**Archivo a modificar:** `src/components/sections/Testimonials.jsx`

### Cómo añadir una nueva reseña:

1. Abre `Testimonials.jsx`
2. Busca `const experiences = [` (aproximadamente línea 4)
3. Verás reseñas como esta:

```javascript
{
  name: "Keyla",                    // 👈 Nombre del cliente
  text: "La verdad todo de 10...",  // 👈 Comentario
  rating: 5,                        // 👈 Calificación (1-5 estrellas)
  image: "/reseñas/keylareseña.jpg",  // 👈 Foto (opcional)
},
```

### Para añadir una reseña nueva:

1. Ve al final de la lista (después de la última reseña)
2. Antes del corchete de cierre `];` añade:

```javascript
{
  name: "Nombre del Cliente",
  text: "Aquí va el comentario completo del cliente.",
  rating: 5,
  image: "/reseñas/nombre-foto.jpg",  // o null si no hay foto
},
```

**Ejemplo completo:**

```javascript
const experiences = [
  {
    name: "Keyla",
    text: "La verdad todo de 10. Muy contenta.",
    rating: 5,
    image: "/reseñas/keylareseña.jpg",
  },
  // ... otras reseñas ...
  {
    name: "María García", // 👈 NUEVA RESEÑA
    text: "Excelente servicio.",
    rating: 5,
    image: "/reseñas/maria.jpg", // Ubicación de la foto
  },
];
```

### Para eliminar una reseña:

Simplemente borra todo el bloque `{ ... },` de la reseña que quieras eliminar.

**⚠️ NOTA sobre imágenes:**

- Si pones `image: null`, aparecerá solo una inicial del nombre
- Si quieres una foto, primero debes subirla a la carpeta `public/reseñas/` (ver siguiente sección)

---

## 🖼 Cambiar Imágenes

### Ubicación de las imágenes:

Todas las imágenes están organizadas en la carpeta **`public/`** en subcarpetas:

- **`public/reseñas/`** → Fotos de reseñas de clientes
- **`public/paquetes/`** → Imágenes de los paquetes de servicios
- **`public/resto/`** → Logos y otros recursos

### Para cambiar el logo:

1. Ve a la carpeta `public/resto/`
2. Busca:
   - `logo.png` → Logo cuadrado
   - `logoHorizontal.png` → Logo horizontal (usado en la página principal)
3. Reemplaza el archivo por tu nuevo logo con el **mismo nombre**

**💡 Consejo:** Si tu logo tiene otro nombre, puedes:

- Renombrarlo a `logoHorizontal.png` y reemplazar el existente, O
- Cambiar el nombre en el código:

```javascript
// En Hero.jsx
<img
  src="/resto/logoHorizontal.png" // 👈 Cambia el nombre aquí
  alt="Saltysoultrips"
/>
```

### Para añadir fotos de reseñas:

1. Guarda la foto en la carpeta `public/reseñas/`
2. Nómbrala de forma clara, por ejemplo: `maria-reseña.jpg`
3. En `Testimonials.jsx`, añade la referencia:

```javascript
{
  name: "María",
  text: "...",
  rating: 5,
  image: "/reseñas/maria-reseña.jpg",  // 👈 Nombre de tu foto
}
```

**⚠️ IMPORTANTE:**

- El nombre del archivo debe empezar con `/`
- Formatos recomendados: `.jpg`, `.jpeg`, `.png`
- Intenta que las fotos no pesen más de 500KB

### Para cambiar imágenes de paquetes:

Las imágenes de los paquetes están en `public/paquetes/`:

- `public/paquetes/explora.png`
- `public/paquetes/vive.png`
- `public/paquetes/conecta.png`

Puedes reemplazarlas con el mismo nombre o cambiar la referencia en `Services.jsx`:

```javascript
{
  title: "PAQUETE EXPLORA",
  image: "/paquetes/explora.png",  // 👈 Cambia el nombre aquí
  // ...
}
```

---

## 📋 Modificar Packs/Servicios

**Archivo:** `src/components/sections/Services.jsx`

### Cambiar el título de la sección:

Busca (aproximadamente línea 65-70):

```javascript
<h2 className="text-4xl font-serif font-bold text-stone-800 mt-2">
  Elige tu Experiencia  // 👈 Cambia aquí
</h2>
<p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
  Desde una guía esencial hasta un diseño completo de tu aventura.  // 👈 Y aquí
</p>
```

### Cambiar características de un paquete:

1. Busca el paquete que quieres modificar en el array `const packs = [`
2. Modifica cualquiera de estos campos:

```javascript
{
  title: "PAQUETE EXPLORA",      // Nombre
  price: "70 €",                  // Precio
  features: [                     // Características resumidas
    "Búsqueda de vuelos",
    "Alojamiento"
  ],
  details: [                      // Detalles incluidos
    "Presupuesto aproximado",
    "Lugares de interés",
    // Añade más aquí...
  ],
  idealFor: "Viajeros independientes..."  // Descripción
}
```

**Para añadir un nuevo paquete:**

Copia uno de los paquetes existentes y modifícalo:

```javascript
const packs = [
  {
    /* Paquete Explora */
  },
  {
    /* Paquete Vive */
  },
  {
    /* Paquete Conecta */
  },
  {
    // 👈 NUEVO PAQUETE
    title: "PAQUETE PREMIUM",
    price: "200 €",
    image: "/premium.png",
    icon: <Star size={32} className="text-brand-sage" />,
    features: ["Todo incluido"],
    details: ["Detalle 1", "Detalle 2"],
    idealFor: "Descripción...",
    highlight: false,
    color: "border-stone-200 bg-white",
  },
];
```

---

## 📞 Cambiar Información de Contacto

**Archivo:** `src/components/sections/ContactForm.jsx`

Si necesitas cambiar textos del formulario de contacto, busca:

```javascript
<h2 className="text-4xl font-serif font-bold text-stone-800 mt-2">
  ¿Listo para tu próxima aventura?  // 👈 Título
</h2>
<p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
  Cuéntanos tus planes y diseñamos tu viaje perfecto.  // 👈 Descripción
</p>
```

---

## ⚠️ Consejos Importantes

### ✅ DO (Sí hacer):

1. **Haz una copia de seguridad** antes de modificar:

   - Copia la carpeta completa `saltysoultrips` a otro lugar
   - O copia el archivo que vas a modificar

2. **Modifica solo los textos entre comillas**:

   ```javascript
   title: "PAQUETE EXPLORA",  // ✅ Solo cambia esto
   ```

3. **Mantén las comas** al final de las líneas:

   ```javascript
   name: "María",    // ✅ Coma al final
   text: "...",      // ✅ Coma al final
   rating: 5,        // ✅ Coma al final (excepto el último)
   image: null       // ✅ Sin coma si es el último
   ```

4. **Guarda los archivos** después de cada cambio (Ctrl + S)

5. **Mantén la misma estructura** al añadir elementos nuevos

### ❌ DON'T (No hacer):

1. **NO cambies las palabras clave**:

   - `const`, `function`, `export`, `default`, `className`, `href`, etc.

2. **NO elimines las comillas** `"` o `'`:

   ```javascript
   title: PAQUETE EXPLORA,  // ❌ INCORRECTO (falta "")
   title: "PAQUETE EXPLORA", // ✅ CORRECTO
   ```

3. **NO elimines las comas** de las listas:

   ```javascript
   details: [
     "Detalle 1"   // ❌ INCORRECTO (falta coma)
     "Detalle 2",
   ],
   ```

4. **NO modifiques los nombres de archivos** sin actualizar las referencias en el código

5. **NO elimines corchetes** `{ }` o paréntesis `( )` del código

---

## 🔄 Después de Hacer Cambios

### Para ver tus cambios:

1. **Si la web está corriendo localmente:**

   - Simplemente guarda el archivo (Ctrl + S)
   - La web se actualizará automáticamente en el navegador

2. **Si la web NO está corriendo:**

   - Abre la terminal en Visual Studio Code (Ctrl + `)
   - Escribe: `npm run dev`
   - Presiona Enter
   - Se abrirá la web en tu navegador

3. **Para publicar los cambios:**
   - Contacta con el desarrollador o la persona encargada de subir la web

---

## 📞 ¿Necesitas Ayuda?

Si tienes dudas o algo no funciona:

1. **Revisa esta guía** otra vez
2. **Verifica que no hayas eliminado** comillas, comas o corchetes
3. **Restaura la copia de seguridad** si algo salió mal
4. **Contacta con el desarrollador** original

---

## 📝 Resumen Rápido

| Quiero cambiar...     | Archivo                                        | Ubicación aproximada |
| --------------------- | ---------------------------------------------- | -------------------- |
| Título principal      | `Hero.jsx`                                     | Línea 27             |
| Descripción principal | `Hero.jsx`                                     | Línea 30             |
| Paquetes/Servicios    | `Services.jsx`                                 | Línea 8-59           |
| Reseñas               | `Testimonials.jsx`                             | Línea 4-48           |
| Imágenes/Fotos        | Carpeta `public/` (organizadas en subcarpetas) | Raíz del proyecto    |
| Logos                 | `public/resto/logo.png` y `logoHorizontal.png` | Carpeta public/resto |

---

**¡Última actualización:** Diciembre 2024  
**Versión:** 1.0

---

✨ **¡Buena suerte con el mantenimiento de la web!** ✨
