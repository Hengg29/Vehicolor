// Datos tomados del kit de marca (vehicolor-assets.json, revisado 2026-10-14) y del sitio oficial (2026-11-01).
// Las fotos están copiadas en /public/img. Las fichas técnicas (TDS) en español están en
// /public/fichas-tecnicas; las hojas de seguridad (MSDS) siguen en el sitio oficial.
import { TINTS } from './tintes.js'

const VC = 'https://www.vehicolor-carpaint.com'

// TODO: reemplazar con los datos reales del distribuidor
export const SITE = {
  city: 'San Luis Potosí',
  whatsapp: '528334273968', // 833 427 3968 (número de ejemplo)
  whatsappText: 'Hola, quiero cotizar productos Vehicolor.',
  email: 'fer_tachuelita@yahoo.com',
}

export const waLink = (text = SITE.whatsappText) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`

// Sección "Igualación de color" (escáner con franjas de color)
export const COLOR_MATCH = {
  eyebrow: 'Igualación de color',
  title: 'El tono exacto,',
  titleMark: 'a la primera',
  lead: {
    before: 'Vehicolor trabaja con espectrofotómetro y una base de ',
    strong: 'más de 120,000 fórmulas',
    after: '. Trae el código de color o una pieza del vehículo y te ayudamos a encontrar la fórmula.',
  },
  points: [
    { visual: 'finishes', text: 'Colores sólidos, metálicos y perlados' },
    { visual: 'mixes', text: 'Bases 1K y acabados 2K' },
    { visual: 'pin', text: `Asesoría de aplicación en ${SITE.city}` },
  ],
  cta: 'Pedir igualación',
  waText: 'Hola, necesito igualar un color de auto.',
  note: 'Respuesta directa por WhatsApp',
  tape: 'Espectrofotómetro',
  hint: 'Arrastra para leer el color',
  image: {
    src: '/img/secciones/igualacion-color.webp',
    alt: 'Auto con franjas de colores de igualación',
    width: 700,
    height: 450,
  },
  colors: [
    { name: 'Rojo', hex: '#e2231a' },
    { name: 'Naranja', hex: '#f59a23' },
    { name: 'Amarillo', hex: '#f0e613' },
    { name: 'Verde', hex: '#7fc241' },
    { name: 'Azul', hex: '#36b9d9' },
  ],
}

export const BENEFITS = [
  { icon: 'shield', stat: 'TDS + MSDS', statLabel: 'Publicadas por producto', title: 'Calidad', text: 'Bases, barnices y primarios con fichas técnicas y hojas de seguridad publicadas.' },
  { icon: 'zap', stat: '1:1', statLabel: 'Mezcla en bases 1K', title: 'Eficiencia', text: 'Mezclas simples y tiempos de secado cortos para sacar más trabajos al día.' },
  { icon: 'palette', stat: '120,000+', statLabel: 'Fórmulas de color', title: 'Tecnología', text: 'Igualación de color con espectrofotómetro y más de 120,000 fórmulas.' },
  { icon: 'headset', stat: 'WhatsApp', statLabel: 'Cotización directa', title: 'Servicio', text: 'Atención local, asesoría de aplicación y cotización directa por WhatsApp.' },
]

export const CATEGORIES = [
  { id: 'pintura', name: 'Pintura automotriz', img: '/img/categorias/pintura.webp' },
  { id: 'masilla', name: 'Masillas', img: '/img/categorias/masilla.webp' },
  { id: 'primario', name: 'Primarios', img: '/img/categorias/primario.webp' },
  { id: 'barniz', name: 'Barnices', img: '/img/categorias/barniz.webp' },
  { id: 'complemento', name: 'Thinner y aditivos', img: '/img/categorias/complementos.webp' },
]

const SPECS_1K = {
  Mezcla: '1 base : 1 thinner',
  Boquilla: '1.2–1.3 mm',
  Presión: 'Convencional 3.0–3.5 bar · HVLP 2 bar',
  Manos: '2–3 manos, 15–25 µm',
  Oreo: '5–10 min entre manos; 10–15 min antes del barniz',
}

const SPECS_2K_CLEAR = {
  Mezcla: '2 barniz : 1 catalizador + 10–20% thinner',
  'Vida de mezcla': '3 h a 23 °C',
  Boquilla: '1.3 mm',
  Manos: '2–3 manos, 40–60 µm',
  Secado: '23 °C: libre de polvo 30–40 min, pulible 6–8 h',
}

const SPECS_FAST_CLEAR = {
  Mezcla: '2 barniz : 1 catalizador',
  'Vida de mezcla': '1 h a 23 °C',
  Boquilla: '1.3 mm',
  Presión: 'Convencional 3.0–3.5 bar · HVLP 2 bar',
  Manos: '2–3 manos, 40–60 µm',
  Oreo: '3–4 min entre manos',
}

const SPECS_BODY_FILLER = {
  Sustratos: 'Acero, galvanizado, hierro, aluminio y fibra de vidrio',
  Mezcla: '100 masilla : 2 catalizador (peso)',
  'Vida de mezcla': '2–4 min a 25 °C',
  'Espesor máx.': '5 mm en total, en capas delgadas',
  Secado: '20–30 min a 25 °C',
  Lijado: 'Desbaste P80–P120 · afinado P120–P320',
}

// Thinner y catalizador: qué versión usar según la temperatura del taller
const SPECS_BY_TEMP = {
  Versiones: 'Rápido, estándar y lento',
  'Menos de 15 °C': 'Rápido o estándar',
  '15–25 °C': 'Rápido o estándar',
  '25–30 °C': 'Estándar o lento',
  'Más de 30 °C': 'Lento',
}

// TDS y MSDS del sitio oficial (en inglés)
const pdf = (path) => `${VC}/static/upload/file/${path}.pdf`
// Fichas técnicas en español, copiadas en /public/fichas-tecnicas
const tds = (file) => `/fichas-tecnicas/${file}.pdf`

// Thinner, catalizador y aditivos no tienen foto oficial: usan la lata genérica de la marca
const GENERIC_CAN = '/img/productos/lata-generica.webp'

export const PRODUCTS = [
  {
    id: 'base-1k', cat: 'pintura', name: 'Base color 1K', en: '1K Basecoat',
    summary: 'Base solvente 1K en colores sólidos, metálicos y perlados; buen poder cubriente y adherencia.',
    img: '/img/productos/base-1k.webp',
    msds: pdf('20250915/1757890708562365'), tds: tds('06-1k-basecoat'),
    specs: SPECS_1K,
  },
  {
    id: 'plata-1k', cat: 'pintura', name: 'Serie Plata 1K', en: '1K Silver Series',
    summary: 'Base 1K de efecto metálico intenso para repintado.',
    img: '/img/productos/plata-1k.webp',
    msds: pdf('20250915/1757890754730821'), tds: pdf('20250915/1757890746970635'),
    specs: SPECS_1K,
  },
  {
    id: 'perla-1k', cat: 'pintura', name: 'Serie Perla 1K', en: '1K Pearl Series',
    summary: 'Base 1K de efecto perlado para repintado.',
    img: '/img/productos/perla-1k.webp',
    msds: pdf('20250915/1757890794655830'), tds: pdf('20250915/1757890785996248'),
    specs: SPECS_1K,
  },
  {
    id: 'solido-2k', cat: 'pintura', name: 'Acabado sólido 2K', en: '2K Solid Topcoat',
    summary: 'Acabado de dos componentes, alto brillo y buena resistencia química y a la intemperie.',
    img: '/img/productos/solido-2k.webp',
    msds: pdf('20250915/1757890807376725'), tds: tds('05-2k-solid-topcoat'),
    specs: {
      Mezcla: '2 acabado : 1 catalizador + 10–20% thinner',
      'Vida de mezcla': '3 h a 23 °C',
      Boquilla: '1.2–1.3 mm',
      Manos: '2–3 manos, 40–60 µm',
      Secado: '23 °C: libre de polvo 30–40 min, pulible 6–8 h',
    },
  },
  {
    id: 'masilla-poliester', cat: 'masilla', name: 'Masilla poliéster', en: 'Polyester Putty',
    summary: 'Masilla de dos componentes para reparar lámina; equilibrio entre dureza y flexibilidad, lijado suave.',
    img: '/img/productos/masilla-poliester.webp',
    msds: pdf('20250915/1757890329426959'), tds: pdf('20250915/1757890353423971'),
    specs: {
      Sustratos: 'Acero, hierro, aluminio, fibra de vidrio, madera',
      Mezcla: '100 masilla : 2 catalizador (peso)',
      'Vida de mezcla': '2–7 min a 25 °C',
      'Espesor máx.': '5 mm por capa',
      Lijado: 'Desbaste P80–P120 · afinado P120–P320',
    },
  },
  {
    id: 'masilla-bpo', cat: 'masilla', name: 'Masilla sistema BPO', en: 'BPO System Body Filler',
    summary: 'Masilla bicomponente de secado rápido: mínima contracción, lijado sencillo y no se agrieta con el calor ni el frío.',
    img: '/img/productos/masilla-bpo.webp',
    msds: pdf('20250915/1757890472286605'), tds: tds('19-bpo-system-body-filler'),
    specs: SPECS_BODY_FILLER,
  },
  {
    id: 'masilla-ligera', cat: 'masilla', name: 'Masilla ligera', en: 'Lightweight Body Filler',
    summary: 'Masilla poliéster ligera de dos componentes; se extiende fácil y se lija rápido.',
    img: '/img/productos/masilla-ligera.webp',
    msds: pdf('20250915/1757890508330320'), tds: pdf('20250915/1757890499783209'),
    specs: SPECS_BODY_FILLER,
  },
  {
    id: 'masilla-nc', cat: 'masilla', name: 'Masilla de detallado NC', en: 'NC Filling Putty',
    summary: 'Masilla nitro 1K de secado rápido para rayones, poros y detalles finos antes del acabado.',
    img: '/img/productos/masilla-nc.webp',
    msds: pdf('20250915/1757890459859204'), tds: tds('04-nc-filling-putty'),
    specs: {
      Sustratos: 'Masillas 2K, primarios y pintura vieja bien lijados',
      Mezcla: 'Lista para usar',
      Aplicación: 'Con espátula, en 1–2 capas delgadas',
      Oreo: '5–10 min entre capas',
      Secado: '25 min a 23 °C',
      Lijado: 'Máquina en seco P400–P500 · al agua P800–P1000',
    },
  },
  {
    id: 'primario-plasticos', cat: 'primario', name: 'Primario para plásticos', en: 'Plastic Primer',
    summary: 'Listo para usar sobre plásticos automotrices; no requiere lijado antes del acabado.',
    img: '/img/productos/primario-plasticos.webp',
    msds: pdf('20250915/1757890014593891'), tds: tds('21-plastic-primer'),
    specs: {
      Sustratos: 'AAS, PC/PET, PETP, PP-EP, PP+EPDM',
      Mezcla: 'Listo para usar',
      Boquilla: '1.2–1.3 mm',
      Manos: '1 mano uniforme',
      Secado: '15–20 min a 20 °C',
    },
  },
  {
    id: 'primario-relleno-2k', cat: 'primario', name: 'Primario relleno 2K', en: '2K Primer Surfacer',
    summary: 'Fondo relleno de dos componentes sobre masillas, epóxicos y acabados viejos lijados.',
    img: '/img/productos/primario-relleno-2k.webp',
    msds: pdf('20250915/1757890055357757'), tds: tds('03-2k-primer'),
    specs: {
      Mezcla: 'Vol. 3 : 1 catalizador : 1–1.5 thinner',
      'Vida de mezcla': '30 min a 23 °C',
      Boquilla: '1.7–1.8 mm',
      Manos: '2–3 manos, 40–60 µm',
      Lijado: 'Máquina P320–P500 · al agua P800–P1000',
    },
  },
  {
    id: 'primario-epoxico', cat: 'primario', name: 'Primario epóxico', en: 'Epoxy Primer',
    summary: 'Primario anticorrosivo para acero, galvanizado, inoxidable, aluminio y acabados 2K.',
    img: '/img/productos/primario-epoxico.webp',
    tds: tds('01-epoxy-primer'),
    specs: {
      Mezcla: 'Vol. 3 : 1 catalizador : 1–1.5 thinner',
      'Vida de mezcla': '4 h a 23 °C',
      Boquilla: '1.7–1.8 mm',
      Manos: '2–3 manos, 25–30 µm',
      Lijado: 'En seco P600–P800',
    },
  },
  {
    id: 'primario-relleno-1k', cat: 'primario', name: 'Primario relleno 1K', en: '1K Primer Surfacer',
    summary: 'Fondo relleno de un componente sobre acabados existentes y masilla poliéster.',
    img: '/img/productos/primario-relleno-1k.webp',
    msds: pdf('20250915/1757890194284069'), tds: tds('02-1k-primer'),
    specs: {
      Mezcla: '1 primario : 1 thinner (peso)',
      Boquilla: '1.7–1.8 mm',
      Manos: '2–3 manos, 35–40 µm',
      Secado: '30 min a 23 °C · 45 min a 15 °C',
      Lijado: 'Al agua P600–P800 · seco P400–P500',
    },
  },
  {
    id: 'barniz-alto-desempeno', cat: 'barniz', name: 'Barniz alto desempeño', en: 'High Performance Clearcoat',
    summary: 'Barniz 2K de altos sólidos, brillo profundo, resistencia química y protección UV.',
    img: '/img/productos/barniz-alto-desempeno.webp',
    msds: pdf('20250913/1757775414100152'), tds: tds('22-high-performance-clearcoat'),
    specs: SPECS_2K_CLEAR,
  },
  {
    id: 'barniz-hs', cat: 'barniz', name: 'Barniz HS', en: 'HS Clearcoat',
    summary: 'Barniz 2K altos sólidos para pintado completo o reparaciones parciales.',
    img: '/img/productos/barniz-hs.webp',
    msds: pdf('20250913/1757775487261678'), tds: tds('08-hs-clearcoat'),
    specs: SPECS_2K_CLEAR,
  },
  {
    id: 'barniz-ms', cat: 'barniz', name: 'Barniz MS', en: 'MS Clearcoat',
    summary: 'Barniz acrílico 2K de medios sólidos para aplicar sobre bases 1K; fácil de aplicar.',
    img: '/img/productos/barniz-ms.webp',
    msds: pdf('20250913/1757775232857309'), tds: tds('07-ms-clearcoat'),
    specs: { ...SPECS_2K_CLEAR, Mezcla: '2 barniz : 1 catalizador' },
  },
  {
    id: 'barniz-ultrarrapido', cat: 'barniz', name: 'Barniz secado ultrarrápido', en: 'Ultra-Fast Dry Clearcoat',
    summary: 'Barniz acrílico 2K de alto brillo que se pule en 45 minutos y libera la cabina antes.',
    img: '/img/productos/barniz-ultrarrapido.webp',
    msds: pdf('20250910/1757500029772818'), tds: tds('09-ultra-fast-dry-clearcoat'),
    specs: { ...SPECS_FAST_CLEAR, Secado: '23 °C: libre de polvo 8 min, pulible 45 min' },
  },
  {
    id: 'barniz-rapido', cat: 'barniz', name: 'Barniz secado rápido', en: 'Fast Dry Clearcoat',
    summary: 'Barniz acrílico 2K de alto brillo que se pule en 3 horas; menos tiempo de cabina y menos desperdicio.',
    img: '/img/productos/barniz-ultrarrapido.webp',
    tds: tds('23-fast-dry-clearcoat'),
    specs: { ...SPECS_FAST_CLEAR, Secado: '23 °C: libre de polvo 10 min, pulible 3 h' },
  },
  {
    id: 'thinner', cat: 'complemento', name: 'Thinner', en: 'Thinner',
    summary: 'Diluyente para primarios, bases y acabados, en versión rápida, estándar y lenta según la temperatura.',
    img: GENERIC_CAN,
    tds: tds('11-thinner'),
    specs: { Uso: 'Primarios, bases 1K y acabados 2K', ...SPECS_BY_TEMP },
  },
  {
    id: 'catalizador', cat: 'complemento', name: 'Catalizador', en: 'Hardener',
    summary: 'Endurecedor de poliisocianato para acabados 2K, barnices y primarios; versión rápida, estándar y lenta.',
    img: GENERIC_CAN,
    tds: tds('10-hardener'),
    specs: { Uso: 'Acabados 2K, barnices y primarios 2K', ...SPECS_BY_TEMP },
  },
  {
    id: 'desengrasante', cat: 'complemento', name: 'Desengrasante', en: 'Panel Wipe',
    summary: 'Quita grasa, cera y suciedad antes de pintar para mejorar la adherencia y el acabado.',
    img: GENERIC_CAN,
    tds: tds('12-panel-wipe'),
    specs: {
      Uso: 'Limpieza de la superficie antes de cada capa',
      Aplicación: 'Paño limpio y sin pelusa empapado; limpia también los paneles vecinos',
      Retiro: 'Seca el exceso con otro paño limpio y seco',
    },
  },
  {
    id: 'aglutinante-1k', cat: 'complemento', name: 'Aglutinante para base 1K', en: '1K Basecoat Binder',
    summary: 'Mejora cobertura, secado y resistencia química de la base 1K; para secado al aire o en horno.',
    img: GENERIC_CAN,
    tds: tds('13-1k-basecoat-binder'),
    specs: {
      'Se mezcla con': 'Base 1K, Plata 1K, Perla 1K y Perla cristal 1K',
      'Metálicos 1K': '10–20% del volumen total',
      'Perlados tricapa': '50–70% en la capa perlada',
      'Colores de poco cubriente': 'Máximo 15%',
    },
  },
  {
    id: 'aglutinante-2k', cat: 'complemento', name: 'Aglutinante de brillo 2K', en: '2K Gloss Binder',
    summary: 'Aditivo para sólidos 2K que sube el brillo y mejora el flujo y la nivelación.',
    img: GENERIC_CAN,
    tds: tds('14-2k-gloss-binder'),
    specs: {
      'Se mezcla con': 'Acabado sólido 2K',
      Dosis: '0–20% según el brillo que busques',
      Mezcla: '2 acabado con aglutinante : 1 catalizador',
    },
  },
  {
    id: 'controlador-flop', cat: 'complemento', name: 'Controlador de flop', en: 'Flip Controller',
    summary: 'Realza metálicos y perlados: lado más brillante y frente más profundo.',
    img: GENERIC_CAN,
    tds: tds('15-flip-controller'),
    specs: {
      'Se mezcla con': 'Plata 1K, Perla 1K y Perla cristal 1K',
      Dosis: 'Hasta 20%',
      Cuidado: 'En exceso afecta la adherencia entre base y barniz',
    },
  },
  {
    id: 'acelerador-secado', cat: 'complemento', name: 'Acelerador de secado', en: 'Dry Accelerator',
    summary: 'Aditivo que acorta el curado, el manejo y el enmascarado de acabados 2K y barnices.',
    img: GENERIC_CAN,
    tds: tds('16-dry-accelerator'),
    specs: {
      'Se mezcla con': 'Acabados 2K y barnices',
      '10–15 °C': '5–7 g por litro de pintura',
      '0–10 °C': '7–10 g por litro',
      'Bajo 0 °C': '10–15 g por litro',
      Máximo: '25 g por litro; más puede quitar brillo',
    },
  },
]

// Las 120,000+ fórmulas ya aparecen en Pilares e Igualación de color; aquí va la carta de tintes
export const STATS = [
  { value: 80, suffix: '+', label: 'países con presencia de la marca' },
  { value: TINTS.length, suffix: '', label: 'tintes en la carta de colores' },
  { value: PRODUCTS.length, suffix: '', label: 'productos con ficha técnica' },
]

// Servicios que se cotizan en Vico (no aparecen en el catálogo de productos)
export const SERVICES = [
  {
    id: 'igualacion',
    cat: 'servicio',
    tag: 'Servicio',
    name: 'Igualación de pintura',
    en: 'Color matching',
    summary: 'Encontramos la fórmula exacta de tu color con espectrofotómetro. Trae el código de color o una pieza del vehículo.',
    img: '/img/secciones/igualacion-color.webp',
    ask: '¿Cuántos colores necesitas igualar?',
    unit: ['color', 'colores'],
  },
]

// Todo lo que se puede agregar a la cotización: productos, servicios y tintes de la carta de colores
export const QUOTABLE = [...PRODUCTS, ...SERVICES, ...TINTS]

// "1 pieza", "3 piezas", "2 colores"…
export const unitLabel = (item, n) => {
  const [one, many] = item.unit || ['pieza', 'piezas']
  return `${n} ${n === 1 ? one : many}`
}
