// Datos tomados del kit de marca (vehicolor-assets.json, revisado 2026-10-14).
// Las fotos están copiadas en /public/img; los PDFs siguen en el sitio oficial.

const VC = 'https://www.vehicolor-carpaint.com'

// TODO: reemplazar con los datos reales del distribuidor
export const SITE = {
  city: 'San Luis Potosí',
  whatsapp: '520000000000',
  whatsappText: 'Hola, quiero cotizar productos Vehicolor.',
  email: 'ventas@ejemplo.com',
}

export const waLink = (text = SITE.whatsappText) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`

export const STATS = [
  { value: 80, suffix: '+', label: 'países con presencia de la marca' },
  { value: 120000, suffix: '+', label: 'fórmulas de color en su base' },
  { value: 12, suffix: '', label: 'productos con ficha técnica' },
]

export const BENEFITS = [
  { icon: 'shield', title: 'Calidad', text: 'Bases, barnices y primarios con fichas técnicas y hojas de seguridad publicadas.' },
  { icon: 'zap', title: 'Eficiencia', text: 'Mezclas simples y tiempos de secado cortos para sacar más trabajos al día.' },
  { icon: 'palette', title: 'Tecnología', text: 'Igualación de color con espectrofotómetro y más de 120,000 fórmulas.' },
  { icon: 'headset', title: 'Servicio', text: 'Atención local, asesoría de aplicación y cotización directa por WhatsApp.' },
]

export const CATEGORIES = [
  { id: 'pintura', name: 'Pintura automotriz', img: '/img/categorias/pintura.jpg' },
  { id: 'masilla', name: 'Masillas', img: '/img/categorias/masilla.jpg' },
  { id: 'primario', name: 'Primarios', img: '/img/categorias/primario.jpg' },
  { id: 'barniz', name: 'Barnices', img: '/img/categorias/barniz.jpg' },
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

const pdf = (path) => `${VC}/static/upload/file/${path}.pdf`

export const PRODUCTS = [
  {
    id: 'base-1k', cat: 'pintura', name: 'Base color 1K', en: '1K Basecoat',
    summary: 'Base solvente 1K en colores sólidos, metálicos y perlados; buen poder cubriente y adherencia.',
    img: '/img/productos/base-1k.jpg',
    msds: pdf('20250915/1757890708562365'), tds: pdf('20250915/1757890729872179'),
    specs: SPECS_1K,
  },
  {
    id: 'plata-1k', cat: 'pintura', name: 'Serie Plata 1K', en: '1K Silver Series',
    summary: 'Base 1K de efecto metálico intenso para repintado.',
    img: '/img/productos/plata-1k.jpg',
    msds: pdf('20250915/1757890754730821'), tds: pdf('20250915/1757890746970635'),
    specs: SPECS_1K,
  },
  {
    id: 'perla-1k', cat: 'pintura', name: 'Serie Perla 1K', en: '1K Pearl Series',
    summary: 'Base 1K de efecto perlado para repintado.',
    img: '/img/productos/perla-1k.jpg',
    msds: pdf('20250915/1757890794655830'), tds: pdf('20250915/1757890785996248'),
    specs: SPECS_1K,
  },
  {
    id: 'solido-2k', cat: 'pintura', name: 'Acabado sólido 2K', en: '2K Solid Topcoat',
    summary: 'Acabado de dos componentes, alto brillo y buena resistencia química y a la intemperie.',
    img: '/img/productos/solido-2k.jpg',
    msds: pdf('20250915/1757890807376725'), tds: pdf('20250915/1757890822486857'),
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
    img: '/img/productos/masilla-poliester.jpg',
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
    id: 'primario-plasticos', cat: 'primario', name: 'Primario para plásticos', en: 'Plastic Primer',
    summary: 'Listo para usar sobre plásticos automotrices; no requiere lijado antes del acabado.',
    img: '/img/productos/primario-plasticos.jpg',
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
    img: '/img/productos/primario-relleno-2k.jpg',
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
    img: '/img/productos/primario-epoxico.jpg',
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
    img: '/img/productos/primario-relleno-1k.jpg',
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
    img: '/img/productos/barniz-alto-desempeno.jpg',
    msds: pdf('20250913/1757775414100152'), tds: pdf('20250913/1757775404627997'),
    specs: SPECS_2K_CLEAR,
  },
  {
    id: 'barniz-hs', cat: 'barniz', name: 'Barniz HS', en: 'HS Clearcoat',
    summary: 'Barniz 2K altos sólidos para pintado completo o reparaciones parciales.',
    img: '/img/productos/barniz-hs.jpg',
    msds: pdf('20250913/1757775487261678'), tds: pdf('20250913/1757775478742168'),
    specs: SPECS_2K_CLEAR,
  },
  {
    id: 'barniz-ms', cat: 'barniz', name: 'Barniz MS', en: 'MS Clearcoat',
    summary: 'Barniz acrílico 2K de medios sólidos para aplicar sobre bases 1K; fácil de aplicar.',
    img: '/img/productos/barniz-ms.jpg',
    msds: pdf('20250913/1757775232857309'), tds: pdf('20250913/1757775260939355'),
    specs: { ...SPECS_2K_CLEAR, Mezcla: '2 barniz : 1 catalizador' },
  },
]
