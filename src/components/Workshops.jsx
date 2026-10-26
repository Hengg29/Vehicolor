// Galería "Vehicolor en los talleres": fotos reales publicadas por la marca (copiadas a /public/img/talleres)
const PHOTOS = [
  { src: 'linea-completa', alt: 'Línea completa de latas Vehicolor AutoPaint y espectrofotómetro', caption: 'La línea completa', w: 1000, h: 749 },
  { src: 'mezclando-taller', alt: 'Pintores mezclando pintura Vehicolor frente al exhibidor de la marca', caption: 'Mezcla en mostrador', w: 1000, h: 750 },
  { src: 'latas-cofre', alt: 'Latas Vehicolor AutoPaint sobre un cofre negro recién pintado', caption: 'Brillo de acabado', w: 1000, h: 750 },
  { src: 'regla-mezcla', alt: 'Técnico midiendo pintura con la regla de mezcla Vehicolor', caption: 'Proporción exacta', w: 1000, h: 750 },
  { src: 'ford-explorer', alt: 'Lata Vehicolor sobre el cofre de una Ford Explorer', caption: 'Resultado final', w: 825, h: 619 },
]

export default function Workshops() {
  return (
    <section id="talleres" className="section section--dark workshops">
      <div className="container">
        <header className="section__head workshops__head">
          <p className="eyebrow"><span className="eyebrow__bar" aria-hidden="true" />En el día a día</p>
          <h2 className="section__title section__title--caps">
            Vehicolor en los <span className="title-mark">talleres</span>
          </h2>
          <p className="workshops__lead">
            Pintores y talleres de más de 80 países trabajan con Vehicolor. Así se ve en el mostrador y en el acabado.
          </p>
        </header>

        <ul className="workshops__grid">
          {PHOTOS.map((p, i) => (
            <li key={p.src} className={`workshops__item workshops__item--${i + 1}`}>
              <figure>
                <img src={`/img/talleres/${p.src}.webp`} alt={p.alt} loading="lazy" width={p.w} height={p.h} />
                <figcaption>{p.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
