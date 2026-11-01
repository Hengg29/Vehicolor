# Vehicolor · Distribuidor autorizado en San Luis Potosí

Página web para **cotizar productos Vehicolor** con un distribuidor oficial de la marca. No es una tienda en línea y no muestra precios. El cliente revisa el catálogo, consulta la ficha técnica de cada producto y arma su cotización con **Vico**, el asistente virtual, que la manda por WhatsApp.

Vehicolor® es marca de Vehicolor Limited, fabricante de pintura automotriz para repintado. Este sitio pertenece al distribuidor, no a la marca.

## Qué tiene la página

- **Pantalla de carga:** muestra el logo hasta que el video del hero puede reproducirse, con un máximo de 3 segundos.
- **Hero con video:** horizontal en computadora y vertical en celular, con poster. Si el sistema tiene activado "reducir movimiento", el video no se reproduce y se queda el poster.
- **Números de la marca:** países con presencia, tintes de la carta de colores y productos con ficha técnica.
- **Catálogo de 24 productos:** pintura, masillas, primarios, barnices y thinner y aditivos, con tarjetas de categoría para filtrar. Sin filtro abre con dos filas (cuatro tarjetas en celular) que mezclan todas las categorías y el botón "Ver los 24 productos".
- **Ficha técnica por producto:** ventana con proporción de mezcla, datos de aplicación, secuencia de manos y enlaces a la TDS en español y a la MSDS.
- **Carta de colores:** los 137 tintes de las cartas oficiales 1K y 2K, con buscador por código o color y filtro por serie. Cada tinte abre una ficha con su color puro, cómo se ve en mezcla y el botón para cotizarlo. Al final están las cartas completas para verlas o descargar el PDF.
- **Vico, asistente de cotización:** se explica abajo.
- **Secciones de la marca:** pilares, igualación de color y datos de la marca.

## Cómo funciona la cotización con Vico

1. **"Cotizar" en una tarjeta:** el producto se agrega y Vico muestra un globito rojo con el número de productos por confirmar.
2. **Al abrir Vico:** cada producto aparece en una tarjeta con foto, cantidades rápidas (1, 2, 3, 5, 10), botón **Confirmar** y **Eliminar producto**. Mientras haya tarjetas pendientes, Vico no pregunta nada más.
3. **La plática:** nombre → teléfono → productos → dirección.
   - **Productos:** lista con casillas y cantidad, agrupada por categoría. Después vienen los **Tintes** que el cliente agregó desde la carta de colores (con un botón para ir a escoger más), **Servicios** (igualación de pintura, que se cuenta en colores) y **Otro**, para escribir algo que no esté en la lista.
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

### Rendimiento (Lighthouse)

Mide siempre la versión para publicar (`npm run build` y luego `npm run preview`), en una ventana de incógnito para que las extensiones no cuenten. `npm run dev` no está optimizado y da números más bajos.

Medición del 2026-11-01 con la versión para publicar:

| | Rendimiento | Accesibilidad | Mejores prácticas | SEO |
|---|---|---|---|---|
| Celular | 89 | 100 | 100 | 100 |
| Escritorio | 99 | 100 | 100 | 100 |

- Las tipografías de Google Fonts se cargan sin bloquear el primer dibujo (`index.html`).
- El hosting debe comprimir los archivos con gzip o brotli; sin compresión, Lighthouse marca unos 266 KB de más.

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| WhatsApp, correo y ciudad del distribuidor | `src/data/vehicolor.js` → `SITE` |
| Productos, fichas técnicas y PDFs | `src/data/vehicolor.js` → `PRODUCTS` |
| Fichas técnicas (TDS) en español | `public/fichas-tecnicas/` (las MSDS se enlazan al sitio oficial) |
| Tintes de la carta de colores | `src/data/tintes.js` (`TINT_SERIES` y `ROWS`: código, nombre, descripción y colores) |
| Cartas de color completas | `public/cartas-color/` → PDF original, `.webp` para verla en pantalla y `-mini.webp` para la miniatura |
| Servicios que se cotizan en Vico | `src/data/vehicolor.js` → `SERVICES` |
| Preguntas, pasos y mensaje de WhatsApp de Vico | `src/components/Vico.jsx` (`TEXT_STEPS`, `buildMessage`) |
| Cantidades guardadas y avisos de productos | `src/quote/QuoteProvider.jsx` |
| Tiempos de la pantalla de carga | `src/components/Splash.jsx` (`MAX_WAIT`, `MIN_SHOW`) |
| Videos del hero | `public/videos/` → `hero-horizontal` y `hero-vertical`, cada uno en `.webm`, `.mp4` y `-poster.webp` |
| Fotos de categorías, productos y secciones | `public/img/` en `.webp` (copiadas del sitio oficial de Vehicolor). Thinner, catalizador y aditivos no tienen foto oficial y usan `img/productos/lata-generica.webp` |
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
2. Pedir a Vehicolor las MSDS que no están publicadas: primario epóxico, barniz secado rápido, thinner, catalizador, desengrasante y aditivos. Esas tarjetas solo muestran la TDS.
3. Pedir fotos reales de thinner, catalizador, desengrasante y aditivos para reemplazar la lata genérica.

## Cómo optimizar videos nuevos

Si cambias un video del hero, genera las dos versiones sin audio y el poster con [ffmpeg](https://ffmpeg.org/):

```bash
ffmpeg -i original.mp4 -an -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 public/videos/hero-horizontal.webm
ffmpeg -i original.mp4 -an -c:v libx264 -crf 27 -preset slow -movflags +faststart public/videos/hero-horizontal.mp4
ffmpeg -i original.mp4 -frames:v 1 poster.png   # luego conviértelo a public/videos/hero-horizontal-poster.webp
```
