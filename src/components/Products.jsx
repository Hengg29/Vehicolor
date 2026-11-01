import { useRef, useState } from 'react'
import CategoryCards from './CategoryCards.jsx'
import SpecSheet from './SpecSheet.jsx'
import ProductCard from './ProductCard.jsx'
import { useMedia } from '../hooks/useMedia.js'
import { useGridColumns } from '../hooks/useGridColumns.js'
import { CATEGORIES, PRODUCTS } from '../data/vehicolor.js'

// Sin filtro, el catálogo abre con una muestra que llena filas completas;
// "Ver los 24 productos" muestra el resto. Al escoger categoría se ven todos los suyos.
const PREVIEW_ROWS = { phone: 4, other: 2 }

// La muestra toma un producto de cada categoría por turnos:
// base 1K, masilla poliéster, primario para plásticos, barniz alto desempeño, thinner, plata 1K…
const BY_TURNS = (() => {
  const groups = CATEGORIES.map((c) => PRODUCTS.filter((p) => p.cat === c.id))
  const longest = Math.max(...groups.map((g) => g.length))
  return Array.from({ length: longest }, (_, i) => groups.map((g) => g[i]).filter(Boolean)).flat()
})()

export default function Products() {
  const [cat, setCat] = useState('todos')
  const [showAll, setShowAll] = useState(false)
  const [active, setActive] = useState(null)
  const dialogRef = useRef(null)
  const countRef = useRef(null)
  const phone = useMedia('(max-width: 600px)')
  const [gridRef, cols] = useGridColumns()

  const all = cat === 'todos'
  const list = all ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat)
  const previewSize = (cols || (phone ? 1 : 3)) * (phone ? PREVIEW_ROWS.phone : PREVIEW_ROWS.other)
  const visible = all && !showAll ? BY_TURNS.slice(0, previewSize) : list

  const openSpecs = (p) => {
    setActive(p)
    dialogRef.current.showModal()
  }
  const closeSpecs = () => dialogRef.current.close()
  const showEverything = () => {
    setCat('todos')
    setShowAll(true)
  }
  // El botón desaparece al abrir la lista: el foco pasa al inicio de la lista sin mover la pantalla
  const expand = () => {
    setShowAll(true)
    requestAnimationFrame(() => countRef.current?.focus({ preventScroll: true }))
  }

  return (
    <section id="productos" className="section section--dark">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow"><span className="eyebrow__bar" aria-hidden="true" />Catálogo</p>
          <h2 className="section__title section__title--caps">Todo para el proceso de <span className="title-mark">repintado</span></h2>
        </header>

        <CategoryCards value={cat} onChange={setCat} />

        <p ref={countRef} className="products__count" tabIndex={-1} aria-live="polite">
          {visible.length < list.length ? `${visible.length} de ${list.length} productos` : `${list.length} productos`}
          {!all && (
            <button type="button" className="link-btn" onClick={showEverything}>Ver todos</button>
          )}
        </p>

        <div ref={gridRef} className="products">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} onSpecs={openSpecs} />
          ))}
        </div>

        {visible.length < list.length && (
          <button type="button" className="btn btn--ghost products__more" onClick={expand}>
            Ver los {list.length} productos
          </button>
        )}

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
          ¿Buscas un color? Abajo está la <a href="#colores">carta de tintes 1K y 2K</a>, o pide una igualación con el código de color de tu auto.
        </p>
      </div>
    </section>
  )
}
