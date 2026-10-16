import { useRef, useState } from 'react'
import CategoryCards from './CategoryCards.jsx'
import SpecSheet from './SpecSheet.jsx'
import ProductCard from './ProductCard.jsx'
import { PRODUCTS } from '../data/vehicolor.js'

export default function Products() {
  const [cat, setCat] = useState('todos')
  const [active, setActive] = useState(null)
  const dialogRef = useRef(null)
  const list = cat === 'todos' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat)

  const openSpecs = (p) => {
    setActive(p)
    dialogRef.current.showModal()
  }
  const closeSpecs = () => dialogRef.current.close()

  return (
    <section id="productos" className="section section--dark">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow"><span className="eyebrow__bar" aria-hidden="true" />Catálogo</p>
          <h2 className="section__title">Todo para el proceso de repintado</h2>
        </header>

        <CategoryCards value={cat} onChange={setCat} />

        <p className="products__count" aria-live="polite">
          {list.length} productos
          {cat !== 'todos' && (
            <button type="button" className="link-btn" onClick={() => setCat('todos')}>Ver todos</button>
          )}
        </p>

        <div className="products">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} onSpecs={openSpecs} />
          ))}
        </div>

        <dialog
          ref={dialogRef}
          className="specs-dialog specs-dialog--sheet"
          aria-labelledby="specs-title"
          onClose={() => setActive(null)}
          onClick={(e) => e.target === e.currentTarget && closeSpecs()}
        >
          {active && <SpecSheet product={active} onClose={closeSpecs} />}
        </dialog>

        <p className="products__note">
          La línea completa también incluye toners 2K, catalizadores, thinners y accesorios. Pregunta por disponibilidad.
        </p>
      </div>
    </section>
  )
}
