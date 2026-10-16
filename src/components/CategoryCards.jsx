import Icon from './Icon.jsx'
import { CATEGORIES, PRODUCTS } from '../data/vehicolor.js'

// Tarjetas numeradas para filtrar el catálogo por categoría.
// Controlado: recibe la categoría activa y avisa al cambiarla ('todos' = sin filtro).
export default function CategoryCards({ value, onChange }) {
  return (
    <div className="cat-cards">
      {CATEGORIES.map((c, i) => {
        const active = value === c.id
        const total = PRODUCTS.filter((p) => p.cat === c.id).length
        return (
          <button
            key={c.id}
            type="button"
            className={`cat-card${active ? ' is-active' : ''}`}
            aria-pressed={active}
            onClick={() => onChange(active ? 'todos' : c.id)}
          >
            <img className="cat-card__bg" src={c.img} alt="" loading="lazy" width="479" height="210" />
            <span className="cat-card__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span className="cat-card__count">{total} productos</span>
            <span className="cat-card__name">{c.name}</span>
            <span className="cat-card__arrow" aria-hidden="true"><Icon name="arrow" size={20} /></span>
          </button>
        )
      })}
    </div>
  )
}
