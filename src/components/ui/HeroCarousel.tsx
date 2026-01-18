import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { Banner } from '../../types'

interface HeroCarouselProps {
  banners: Banner[]
  autoPlayInterval?: number
}

export function HeroCarousel({ banners, autoPlayInterval = 5000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const activeBanners = banners.filter((b) => b.active !== false)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length)
  }, [activeBanners.length])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length)
  }, [activeBanners.length])

  useEffect(() => {
    if (activeBanners.length <= 1) return
    const interval = setInterval(next, autoPlayInterval)
    return () => clearInterval(interval)
  }, [activeBanners.length, autoPlayInterval, next])

  if (!activeBanners.length) return null

  const currentBanner = activeBanners[currentIndex]

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${currentBanner.image})` }}
    >
      <div className="hero-content">
        <p className="eyebrow">Blocão 2026</p>
        <h1>{currentBanner.title}</h1>
        <p className="muted">{currentBanner.subtitle}</p>
        <div className="row">
          <Link className="primary" to={currentBanner.ctaLink}>
            {currentBanner.ctaLabel}
          </Link>
          <Link className="ghost" to="/inscricao">
            Inscrever meu pet
          </Link>
        </div>
      </div>
      {activeBanners.length > 1 && (
        <div className="carousel-controls">
          <button className="carousel-btn" onClick={prev} aria-label="Anterior">
            ◀
          </button>
          <div className="carousel-dots">
            {activeBanners.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Ir para slide ${i + 1}`}
              />
            ))}
          </div>
          <button className="carousel-btn" onClick={next} aria-label="Próximo">
            ▶
          </button>
        </div>
      )}
    </section>
  )
}
