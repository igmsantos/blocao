import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useApp } from '../context'
import { Lightbox } from '../components/ui'

export function GalleryPage() {
  const { year } = useParams<{ year: string }>()
  const { albums } = useApp()
  const [filterYear, setFilterYear] = useState<string>('todos')
  const [filterCategory, setFilterCategory] = useState<string>('todos')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxPhotos, setLightboxPhotos] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const publishedAlbums = albums.filter((a) => a.published !== false)
  const years = [...new Set(publishedAlbums.map((a) => a.year))].sort((a, b) => b - a)
  const categories = [...new Set(publishedAlbums.map((a) => a.category).filter(Boolean))]

  const filtered = publishedAlbums.filter((album) => {
    if (filterYear !== 'todos' && album.year !== Number(filterYear)) return false
    if (filterCategory !== 'todos' && album.category !== filterCategory) return false
    return true
  })

  // Se tiver parâmetro de ano, mostra o álbum específico
  const selectedAlbum = year
    ? publishedAlbums.find((a) => a.year === Number(year))
    : null

  const openLightbox = (photos: string[], index: number) => {
    setLightboxPhotos(photos)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  if (selectedAlbum) {
    return (
      <div className="stack gap-lg">
        <header className="page-header">
          <div>
            <Link to="/galeria" className="ghost" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
              ← Voltar
            </Link>
            <p className="eyebrow">{selectedAlbum.year}</p>
            <h1>{selectedAlbum.title}</h1>
            <p className="muted">{selectedAlbum.photos.length} fotos</p>
          </div>
        </header>

        <div className="gallery-grid">
          {selectedAlbum.photos.map((photo, index) => (
            <div
              key={index}
              className="gallery-photo"
              style={{ backgroundImage: `url(${photo})` }}
              onClick={() => openLightbox(selectedAlbum.photos, index)}
              role="button"
              tabIndex={0}
              aria-label={`Ver foto ${index + 1}`}
            />
          ))}
        </div>

        {lightboxOpen && (
          <Lightbox
            images={lightboxPhotos}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </div>
    )
  }

  return (
    <div className="stack gap-lg">
      <header className="page-header">
        <div>
          <p className="eyebrow">Galeria</p>
          <h1>Momentos do Blocão</h1>
          <p className="muted">Fotos organizadas por ano e categoria.</p>
        </div>
        <div className="row">
          <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
            <option value="todos">Todos os anos</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {categories.length > 0 && (
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="todos">Todas categorias</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
        </div>
      </header>

      <div className="gallery-grid">
        {filtered.map((album) => (
          <Link key={album.id} to={`/galeria/${album.year}`} className="card">
            <div className="card-cover" style={{ backgroundImage: `url(${album.cover})` }} />
            <div className="card-body">
              <p className="eyebrow">{album.year}</p>
              <h3>{album.title}</h3>
              <p className="muted">{album.photos.length} fotos</p>
              {album.category && <span className="badge">{album.category}</span>}
            </div>
          </Link>
        ))}
      </div>

      {!filtered.length && (
        <div className="panel">
          <p className="muted">Nenhum álbum encontrado com os filtros selecionados.</p>
        </div>
      )}
    </div>
  )
}
