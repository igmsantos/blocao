import { Link, useParams } from 'react-router-dom'
import { useApp } from '../context'
import { formatDate } from '../utils'
import type { ArticleCategory } from '../types'

const categoryLabels: Record<ArticleCategory, string> = {
  blocao: 'Blocão',
  ong: 'ONG',
  cuidados: 'Cuidados',
  adocao: 'Adoção',
  noticias: 'Notícias',
  evento: 'Evento',
}

export function NewsPage() {
  const { slug } = useParams<{ slug: string }>()
  const { articles } = useApp()

  const publishedArticles = articles
    .filter((a) => a.published)
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())

  // Se tiver slug, mostra o artigo
  if (slug) {
    const article = publishedArticles.find((a) => a.slug === slug)
    
    if (!article) {
      return (
        <div className="panel">
          <h2>Artigo não encontrado</h2>
          <p className="muted">O artigo que você procura não existe ou foi removido.</p>
          <Link className="ghost" to="/noticias">
            ← Voltar para notícias
          </Link>
        </div>
      )
    }

    return (
      <article className="stack gap-lg article-page">
        <Link to="/noticias" className="ghost" style={{ alignSelf: 'flex-start' }}>
          ← Voltar para notícias
        </Link>
        
        <header>
          <p className="eyebrow">{categoryLabels[article.category]}</p>
          <h1>{article.title}</h1>
          <p className="muted">
            {article.author && `Por ${article.author} · `}
            {formatDate(article.publishedAt || article.createdAt)}
          </p>
        </header>

        <div
          className="article-cover-large"
          style={{ backgroundImage: `url(${article.cover})` }}
        />

        <div className="article-content">
          {article.content.split('\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={i}>{paragraph.replace('## ', '')}</h2>
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={i}>{paragraph.replace('### ', '')}</h3>
            }
            if (paragraph.startsWith('- ')) {
              return <li key={i}>{paragraph.replace('- ', '')}</li>
            }
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return <p key={i}><strong>{paragraph.replace(/\*\*/g, '')}</strong></p>
            }
            if (paragraph.trim()) {
              return <p key={i}>{paragraph}</p>
            }
            return null
          })}
        </div>

        <div className="article-footer">
          <button
            className="ghost"
            onClick={() => {
              navigator.share?.({
                title: article.title,
                text: article.excerpt,
                url: window.location.href,
              })
            }}
          >
            Compartilhar
          </button>
          <Link className="ghost" to="/noticias">
            Ver mais artigos
          </Link>
        </div>
      </article>
    )
  }

  // Lista de artigos
  const categories = [...new Set(publishedArticles.map((a) => a.category))]

  return (
    <div className="stack gap-lg">
      <header className="page-header">
        <div>
          <p className="eyebrow">Notícias</p>
          <h1>Notícias e Dicas</h1>
          <p className="muted">
            Fique por dentro das novidades do Blocão, dicas de cuidados e histórias de adoção.
          </p>
        </div>
      </header>

      {/* Categorias */}
      <div className="row">
        {categories.map((cat) => (
          <Link key={cat} to={`/noticias?categoria=${cat}`} className="chip">
            {categoryLabels[cat]}
          </Link>
        ))}
      </div>

      {/* Lista de artigos */}
      <div className="grid three">
        {publishedArticles.map((article) => (
          <Link key={article.id} to={`/noticias/${article.slug}`} className="article-card">
            <div
              className="article-cover"
              style={{ backgroundImage: `url(${article.cover})` }}
            />
            <div className="article-body">
              <p className="eyebrow">{categoryLabels[article.category]}</p>
              <h4>{article.title}</h4>
              <p className="muted">{article.excerpt}</p>
              <p className="muted" style={{ fontSize: '0.75rem' }}>
                {formatDate(article.publishedAt || article.createdAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {!publishedArticles.length && (
        <div className="panel">
          <p className="muted">Nenhum artigo publicado ainda.</p>
        </div>
      )}
    </div>
  )
}
