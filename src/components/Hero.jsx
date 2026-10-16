import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Icon from './Icon.jsx'
import { SITE, waLink } from '../data/vehicolor.js'

// WebM (VP9) es más ligero; el MP4 queda de respaldo para Safari viejito
// El poster (primer cuadro) se ve mientras el video termina de cargar
const VIDEOS = {
  horizontal: '/videos/hero-horizontal',
  vertical: '/videos/hero-vertical',
}

function useMedia(query) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
  )
}

export default function Hero({ onReady }) {
  const videoRef = useRef(null)
  const vertical = useMedia('(max-width: 768px) and (orientation: portrait)')
  const reduceMotion = useMedia('(prefers-reduced-motion: reduce)')
  const [paused, setPaused] = useState(reduceMotion)
  const src = vertical ? VIDEOS.vertical : VIDEOS.horizontal

  // Si el video ya venía de caché, puede estar listo antes de que React escuche el evento
  useEffect(() => {
    if (videoRef.current?.readyState >= 3) onReady?.()
  }, [src, onReady])

  // Pausa el video cuando el hero sale de pantalla para no gastar datos ni batería
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !paused) video.play().catch(() => {})
      else video.pause()
    })
    io.observe(video)
    return () => io.disconnect()
  }, [paused, src])

  const togglePlay = () => {
    const video = videoRef.current
    if (paused) video.play().catch(() => {})
    else video.pause()
    setPaused(!paused)
  }

  return (
    <section id="inicio" className="hero">
      <video
        key={src}
        ref={videoRef}
        className="hero__video"
        autoPlay={!paused}
        muted
        loop
        playsInline
        preload="auto"
        poster={`${src}-poster.webp`}
        onCanPlayThrough={onReady}
        onLoadedData={paused ? onReady : undefined}
        aria-hidden="true"
      >
        <source src={`${src}.webm`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container hero__content">
        <p className="eyebrow">
          <span className="eyebrow__bar" aria-hidden="true" />
          Distribuidor autorizado · {SITE.city}
        </p>
        <h1 className="hero__title">
          Sistema profesional de <span className="text-yellow">repintado</span> automotriz
        </h1>
        <p className="hero__lead">
          Bases, barnices, primarios y masillas Vehicolor para talleres de hojalatería y pintura,
          con fichas técnicas y asesoría local.
        </p>
        <div className="hero__actions">
          <a className="btn btn--red btn--lg" href="#productos">
            Arma tu cotización <Icon name="arrow" size={20} />
          </a>
          <a className="btn btn--ghost btn--lg" href={waLink()} target="_blank" rel="noreferrer">
            <Icon name="chat" size={20} /> WhatsApp directo
          </a>
        </div>
      </div>

      <button
        type="button"
        className="hero__play"
        onClick={togglePlay}
        aria-label={paused ? 'Reproducir video de fondo' : 'Pausar video de fondo'}
      >
        <Icon name={paused ? 'play' : 'pause'} size={18} />
      </button>

      <div className="hero__stripe" aria-hidden="true" />
    </section>
  )
}
