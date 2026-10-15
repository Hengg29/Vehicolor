import { useEffect, useRef, useState } from 'react'
import { STATS } from '../data/vehicolor.js'

const fmt = new Intl.NumberFormat('es-MX')

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const [n, setN] = useState(() => (reduceMotion() ? value : 0))

  useEffect(() => {
    const el = ref.current
    if (reduceMotion()) return
    let raf
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const p = Math.min((t - start) / 1200, 1)
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value])

  return (
    <span ref={ref} className="stat__value">
      {fmt.format(n)}
      <span className="text-yellow">{suffix}</span>
    </span>
  )
}

export default function Stats() {
  return (
    <section className="stats" aria-label="La marca en números">
      <div className="container stats__grid">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <Counter value={s.value} suffix={s.suffix} />
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
