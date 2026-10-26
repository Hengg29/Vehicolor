# Vehicolor · Distribuidor autorizado en San Luis Potosí

Página web para **cotizar productos Vehicolor** con un distribuidor oficial de la marca. No es una tienda en línea y no muestra precios. El cliente revisa el catálogo, consulta la ficha técnica de cada producto y arma su cotización con **Vico**, el asistente virtual, que la manda por WhatsApp.

Vehicolor® es marca de Vehicolor Limited, fabricante de pintura automotriz para repintado. Este sitio pertenece al distribuidor, no a la marca.

## Qué tiene la página

- **Pantalla de carga:** muestra el logo hasta que el video del hero puede reproducirse, con un máximo de 3 segundos.
- **Hero con video:** horizontal en computadora y vertical en celular, con poster y botón para pausarlo.
- **Catálogo de 12 productos:** bases 1K, acabado 2K, masilla, primarios y barnices, con tarjetas de categoría para filtrar.
- **Ficha técnica por producto:** ventana con proporción de mezcla, datos de aplicación, secuencia de manos y enlaces a TDS y MSDS.
- **Vico, asistente de cotización:** se explica abajo.
- **Secciones de la marca:** pilares, igualación de color y datos de la marca.

## Cómo funciona la cotización con Vico

1. **"Cotizar" en una tarjeta:** el producto se agrega y Vico muestra un globito rojo con el número de productos por confirmar.
2. **Al abrir Vico:** cada producto aparece en una tarjeta con foto, cantidades rápidas (1, 2, 3, 5, 10), botón **Confirmar** y **Eliminar producto**. Mientras haya tarjetas pendientes, Vico no pregunta nada más.
3. **La plática:** nombre → teléfono → productos → dirección.
   - **Productos:** lista con casillas y cantidad, agrupada por categoría. Al final están **Servicios** (igualación de pintura, que se cuenta en colores) y **Otro**, para escribir algo que no esté en la lista.
   - **Dirección:** se puede escribir o usar la **ubicación actual**, que agrega un enlace de Google Maps.
4. **Resumen:** muestra la orden completa con **Confirmar y enviar por WhatsApp**, **Cambiar productos** y **Eliminar cotización** (pide un segundo toque).

Si el cliente llega por "Cotizar", primero confirma sus productos y después Vico lo saluda y le pregunta el nombre.

### Qué se guarda en el navegador

| Llave de `localStorage` | Contenido | Caduca |
|---|---|---|
| `vehicolor-cotizacion` | Productos y cantidades | No |
| `vehicolor-avisos` | Productos por confirmar (globito rojo) | No |
| `vico-chat` | Conversación, paso actual y datos del cliente | 7 días sin usarse |

Nada se manda a un servidor. El distribuidor solo recibe la orden cuando el cliente la envía por WhatsApp.

## Cómo correrla

```bash
npm install
npm run dev      # servidor local
npm run build    # versión para publicar (carpeta dist/)
```

La ubicación en tiempo real solo funciona con **HTTPS** o en `localhost`. Si abres el servidor local desde el celular con la IP de tu computadora (`http://192.168…`), el navegador la bloquea.

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| WhatsApp, correo y ciudad del distribuidor | `src/data/vehicolor.js` → `SITE` |
| Productos, fichas técnicas y PDFs | `src/data/vehicolor.js` → `PRODUCTS` |
| Servicios que se cotizan en Vico | `src/data/vehicolor.js` → `SERVICES` |
| Preguntas, pasos y mensaje de WhatsApp de Vico | `src/components/Vico.jsx` (`TEXT_STEPS`, `buildMessage`) |
| Cantidades guardadas y avisos de productos | `src/quote/QuoteProvider.jsx` |
| Tiempos de la pantalla de carga | `src/components/Splash.jsx` (`MAX_WAIT`, `MIN_SHOW`) |
| Videos del hero | `public/videos/` → `hero-horizontal` y `hero-vertical`, cada uno en `.webm`, `.mp4` y `-poster.webp` |
| Fotos de categorías, productos y secciones | `public/img/` en `.webp` (copiadas del sitio oficial de Vehicolor) |
| Imagen de Vico | `public/img/vico.webp` |
| Colores y tipografías | `src/index.css` |
| Estilos de las secciones | `src/App.css` |

**Paleta:** negro `#0A0A0B`, rojo `#D81818`, amarillo `#FFC20E` y gris `#8B9098` para detalles. Los botones de cotizar van en rojo, igual que Vico.
**Tipografías:** Montserrat para títulos y Roboto para texto.

### Tamaños de pantalla

Los ajustes de cada tamaño están en `src/App.css`:

| Tamaño | Rango |
|---|---|
| Celular chico | ≤ 360 px |
| Celular | ≤ 600 px |
| Tablet | 601–1023 px |
| Laptop | 1024–1439 px (más un ajuste para alturas ≤ 800 px) |
| Monitor mediano | 1440–1919 px |
| Monitor grande | ≥ 1920 px |

Hay ajustes aparte para celular acostado. Pilares y Ficha técnica tienen sus propios rangos.

## Pendiente antes de publicar

1. Poner el número real de WhatsApp en `SITE`. Ahorita está uno de ejemplo (833 427 3968).
2. Pedir a Vehicolor las TDS y MSDS de los primarios. Mientras tanto, esas tarjetas muestran el enlace "Solicitar fichas" por WhatsApp.

## Cómo optimizar videos nuevos

Si cambias un video del hero, genera las dos versiones sin audio y el poster con [ffmpeg](https://ffmpeg.org/):

```bash
ffmpeg -i original.mp4 -an -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 public/videos/hero-horizontal.webm
ffmpeg -i original.mp4 -an -c:v libx264 -crf 27 -preset slow -movflags +faststart public/videos/hero-horizontal.mp4
ffmpeg -i original.mp4 -frames:v 1 poster.png   # luego conviértelo a public/videos/hero-horizontal-poster.webp
```
