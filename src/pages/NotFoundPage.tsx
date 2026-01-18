import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="panel" style={{ textAlign: 'center', padding: '3rem' }}>
      <h1 style={{ fontSize: '4rem', margin: 0 }}>🐕</h1>
      <h2>Página não encontrada</h2>
      <p className="muted">
        Ops! O link que você tentou acessar não existe ou foi removido.
      </p>
      <div className="row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
        <Link className="primary" to="/">
          Voltar para a Home
        </Link>
        <Link className="ghost" to="/loja">
          Ir para a Loja
        </Link>
      </div>
    </div>
  )
}
