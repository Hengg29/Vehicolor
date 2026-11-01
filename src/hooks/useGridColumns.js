import { useCallback, useRef, useState } from 'react'

// Cuántas columnas tiene una cuadrícula CSS ahorita (cambia con el ancho de la pantalla).
// Se usa para que las vistas previas llenen filas completas. Devuelve [ref, columnas];
// las columnas valen 0 hasta la primera medición.
export function useGridColumns() {
  const [cols, setCols] = useState(0)
  const observer = useRef(null)
  const ref = useCallback((el) => {
    observer.current?.disconnect()
    if (!el) return
    observer.current = new ResizeObserver(() => setCols(getComputedStyle(el).gridTemplateColumns.split(' ').length))
    observer.current.observe(el)
  }, [])
  return [ref, cols]
}
