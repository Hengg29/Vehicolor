import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Icon from './Icon.jsx'
import { SITE, waLink } from '../data/vehicolor.js'

const VIDEOS = {
  horizontal: '/videos/hero-horizontal.mp4',
  vertical: '/videos/hero-vertical.mp4',
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

export default function Hero() {
  const videoRef = useRef(null)
  const vertical = useMedia('(max-width: 768px) and (orientation: portrait)')
  const reduceMotion = useMedia('(prefers-reduced-motion: reduce)')
  const [paused, setPaused] = useState(reduceMotion)
  const src = vertical ? VIDEOS.vertical : VIDEOS.horizontal

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
        src={src}
        autoPlay={!paused}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
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
          <a className="btn btn--red btn--lg" href={waLink()} target="_blank" rel="noreferrer">
            <Icon name="chat" size={20} /> Cotiza por WhatsApp
          </a>
          <a className="btn btn--ghost btn--lg" href="#productos">
            Ver productos <Icon name="arrow" size={20} />
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
