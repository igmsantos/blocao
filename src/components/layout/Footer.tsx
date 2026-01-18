import { Link } from 'react-router-dom'
import { useApp } from '../../context'

export function Footer() {
  const { settings } = useApp()

  return (
    <footer className="footer">
      <div>
        <h4>🐕 {settings.siteName}</h4>
        <p>Desfile pet solidário. Transparência e cuidado o ano todo.</p>
        <p>{settings.city}/{settings.state}</p>
      </div>
      <div>
        <h4>Contato</h4>
        <p>
          WhatsApp:{' '}
          <a
            href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noreferrer"
          >
            {settings.whatsapp}
          </a>
        </p>
        <p>Email: {settings.email}</p>
        {settings.instagram && (
          <p>
            Instagram:{' '}
            <a
              href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
            >
              {settings.instagram}
            </a>
          </p>
        )}
      </div>
      <div>
        <h4>Links</h4>
        <p><Link to="/sobre">Sobre a ONG</Link></p>
        <p><Link to="/patrocinadores">Patrocinadores</Link></p>
        <p><Link to="/doacoes">Apoie a causa</Link></p>
        <p><Link to="/profissionais">Catálogo de profissionais</Link></p>
      </div>
      <div>
        <h4>Navegação</h4>
        <p><Link to="/galeria">Galeria</Link></p>
        <p><Link to="/loja">Loja</Link></p>
        <p><Link to="/inscricao">Inscrição</Link></p>
        <p><Link to="/noticias">Notícias</Link></p>
      </div>
    </footer>
  )
}
