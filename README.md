# Vehicolor · Distribuidor autorizado en San Luis Potosí

Página web para **cotizar productos Vehicolor** con un distribuidor oficial de la marca. No es una tienda en línea y no muestra precios. El cliente revisa el catálogo, consulta la ficha técnica de cada producto y manda su cotización por WhatsApp.

Vehicolor® es marca de Vehicolor Limited, fabricante de pintura automotriz para repintado. Este sitio pertenece al distribuidor, no a la marca.

## Qué tiene la página

- **Hero con video:** horizontal en computadora y vertical en celular, con botón para pausarlo.
- **Catálogo de 12 productos:** bases 1K, acabado 2K, masilla, primarios y barnices, con filtro por categoría.
- **Ficha técnica por producto:** se abre en una ventana flotante con mezcla, boquilla, manos, secado y lijado, más los enlaces a TDS y MSDS.
- **Botones de cotizar:** cada uno abre WhatsApp con un mensaje ya escrito que incluye el nombre del producto.
- **Secciones de la marca:** igualación de color, beneficios y datos de la marca.

## Cómo correrla

```bash
npm install
npm run dev      # servidor local
npm run build    # versión para publicar (carpeta dist/)
```

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| WhatsApp, correo y ciudad del distribuidor | `src/data/vehicolor.js` → `SITE` |
| Productos, fichas técnicas y PDFs | `src/data/vehicolor.js` → `PRODUCTS` |
| Videos del hero | `public/videos/hero-horizontal.mp4` y `hero-vertical.mp4` |
| Colores y tipografías | `src/index.css` |
| Estilos de las secciones | `src/App.css` |

**Paleta:** negro `#0A0A0B`, rojo `#D81818`, amarillo `#FFC20E` y gris `#8B9098` para detalles.
**Tipografías:** Montserrat para títulos y Roboto para texto.

## Pendiente antes de publicar

1. Poner el número real de WhatsApp y el correo en `SITE`. Ahorita son datos de prueba.
2. Tener por escrito la autorización de Vehicolor como distribuidor y para usar su logo y sus fotos.
3. Descargar las fotos de producto a `public/`. Ahorita se cargan directo de vehicolor-carpaint.com.
4. Pedir a Vehicolor las TDS y MSDS de los primarios. Mientras tanto, esas tarjetas muestran el enlace "Solicitar fichas" por WhatsApp.
