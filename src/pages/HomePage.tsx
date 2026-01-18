import { Link } from 'react-router-dom'
import { useApp } from '../context'
import { HeroCarousel, HighlightCard, Countdown } from '../components/ui'
import { formatCurrency } from '../utils'

export function HomePage() {
  const { banners, eventInfo, albums, products, professionals, sponsors, articles } = useApp()

  const approvedProfessionals = professionals.filter((p) => p.approved)
  const activeSponsors = sponsors.filter((s) => s.active)
  const publishedArticles = articles.filter((a) => a.published).slice(0, 3)
  const publishedProducts = products.filter((p) => p.published !== false).slice(0, 4)

  return (
    <div className="stack gap-lg">
      <HeroCarousel banners={banners} />

      {/* Chamadas rápidas */}
      <section className="grid three">
        <Link to="/loja" className="panel quick-link">
          <span className="quick-icon">🎽</span>
          <h3>Comprar Abadá</h3>
          <p className="muted">Garanta o seu e do seu pet</p>
        </Link>
        <Link to="/inscricao" className="panel quick-link">
          <span className="quick-icon">📝</span>
          <h3>Inscrever no Desfile</h3>
          <p className="muted">Cadastre seus dados e pets</p>
        </Link>
        <Link to="/galeria" className="panel quick-link">
          <span className="quick-icon">📷</span>
          <h3>Ver Galeria</h3>
          <p className="muted">Fotos dos eventos anteriores</p>
        </Link>
        <Link to="/doacoes" className="panel quick-link">
          <span className="quick-icon">💝</span>
          <h3>Doar</h3>
          <p className="muted">Apoie a causa animal</p>
        </Link>
        <Link to="/profissionais" className="panel quick-link">
          <span className="quick-icon">🏥</span>
          <h3>Catálogo Profissional</h3>
          <p className="muted">Veterinários e parceiros</p>
        </Link>
        <Link to="/patrocinadores" className="panel quick-link">
          <span className="quick-icon">🤝</span>
          <h3>Seja Patrocinador</h3>
          <p className="muted">Apoie o Blocão</p>
        </Link>
      </section>

      {/* Próximo evento */}
      <section className="grid two">
        <div className="panel">
          <p className="eyebrow">Próximo Evento</p>
          <h2>{eventInfo.name}</h2>
          <p className="muted">{eventInfo.date}</p>
          <p className="muted">📍 {eventInfo.location}</p>
          <span className="badge">{eventInfo.statusLabel}</span>
          <div className="row" style={{ marginTop: '1rem' }}>
            <Link className="primary" to="/inscricao">
              Inscreva-se agora
            </Link>
            <Link className="ghost" to="/sobre">
              Ver detalhes
            </Link>
          </div>
        </div>
        <div className="panel">
          <Countdown targetDate={eventInfo.targetDate} title="Contagem regressiva" />
        </div>
      </section>

      {/* Destaques ONG */}
      <section className="grid three">
        <HighlightCard
          icon="🐕"
          title="750+ animais castrados"
          description="Em 2025, realizamos mais de 750 castrações gratuitas."
          badge="Impacto"
        />
        <HighlightCard
          icon="💊"
          title="Atendimento veterinário"
          description="Clínica móvel e parcerias para cuidar de animais em vulnerabilidade."
          badge="Saúde"
        />
        <HighlightCard
          icon="📊"
          title="Transparência total"
          description="Prestação de contas pública. Veja como os recursos são aplicados."
          badge="Confiança"
        />
      </section>

      {/* Produtos destaque */}
      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Loja</p>
            <h2>Produtos em destaque</h2>
          </div>
          <Link className="ghost" to="/loja">
            Ver todos
          </Link>
        </div>
        <div className="grid three">
          {publishedProducts.map((p) => (
            <div key={p.id} className="row between">
              <div>
                <strong>{p.name}</strong>
                <p className="muted">{p.category}</p>
              </div>
              <span>{formatCurrency(p.promoPrice || p.price)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Galeria preview */}
      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Galeria</p>
            <h2>Momentos dos últimos anos</h2>
          </div>
          <Link className="ghost" to="/galeria">
            Ver tudo
          </Link>
        </div>
        <div className="gallery-strip">
          {albums.slice(0, 4).map((album) => (
            <Link
              key={album.id}
              to={`/galeria/${album.year}`}
              className="thumb"
              style={{ backgroundImage: `url(${album.cover})` }}
            >
              <div className="thumb-overlay">
                <strong>{album.title}</strong>
                <span>{album.photos.length} fotos</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Patrocinadores preview */}
      {activeSponsors.length > 0 && (
        <section className="panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Patrocinadores</p>
              <h2>Quem apoia o Blocão</h2>
            </div>
            <Link className="ghost" to="/patrocinadores">
              Ver todos
            </Link>
          </div>
          <div className="sponsors-strip">
            {activeSponsors.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.website}
                target="_blank"
                rel="noreferrer"
                className="sponsor-logo"
                title={sponsor.name}
              >
                <img src={sponsor.logo} alt={sponsor.name} />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Profissionais preview */}
      {approvedProfessionals.length > 0 && (
        <section className="panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Profissionais</p>
              <h2>Parceiros da comunidade pet</h2>
            </div>
            <Link className="ghost" to="/profissionais">
              Ver catálogo
            </Link>
          </div>
          <div className="professionals">
            {approvedProfessionals.slice(0, 6).map((pro) => (
              <div key={pro.id} className="chip">
                <strong>{pro.name}</strong>
                <span>{pro.category}</span>
                <span>{pro.city}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Notícias preview */}
      {publishedArticles.length > 0 && (
        <section className="panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Notícias</p>
              <h2>Dicas e novidades</h2>
            </div>
            <Link className="ghost" to="/noticias">
              Ver todas
            </Link>
          </div>
          <div className="grid three">
            {publishedArticles.map((article) => (
              <Link key={article.id} to={`/noticias/${article.slug}`} className="article-card">
                <div
                  className="article-cover"
                  style={{ backgroundImage: `url(${article.cover})` }}
                />
                <div className="article-body">
                  <p className="eyebrow">{article.category}</p>
                  <h4>{article.title}</h4>
                  <p className="muted">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
