import { Link } from 'react-router-dom'
import { useApp } from '../context'

export function AboutPage() {
  const { eventInfo, settings } = useApp()

  return (
    <div className="stack gap-lg">
      <header className="page-header">
        <div>
          <p className="eyebrow">Sobre</p>
          <h1>Blocão Caraguatatuba</h1>
          <p className="muted">
            O bloco mais fofinho do Carnaval do Litoral Norte — onde a folia encontra o amor pelos animais.
          </p>
        </div>
      </header>

      {/* Nossa história */}
      <section className="panel">
        <h2>🐾 Nossa História</h2>
        <p>
          O <strong>Blocão</strong> é o bloco mais fofinho do Carnaval de Caraguatatuba: um encontro 
          feito para quem acredita que alegria também se passeia na coleira. Aqui, tutores e pets 
          entram no clima juntos — com fantasias, sorrisos, respeito e muita energia boa — 
          celebrando a amizade que transforma qualquer caminhada em festa.
        </p>
      </section>

      {/* Propósito */}
      <section className="panel">
        <h2>🎯 Nosso Propósito</h2>
        <p>
          Nosso propósito é simples: criar um momento seguro e acolhedor para famílias, amantes de 
          animais e toda a comunidade curtirem o Carnaval de um jeito leve, divertido e responsável.
        </p>
        <p>
          Promovemos a convivência, incentivamos a guarda responsável e reforçamos que bem-estar 
          vem sempre em primeiro lugar — tanto para os bichinhos quanto para as pessoas.
        </p>
      </section>

      {/* Como funciona */}
      <section className="panel">
        <h2>🎪 Como funciona o evento</h2>
        <div className="grid two" style={{ marginTop: '1rem' }}>
          <div>
            <h4>1. Inscrição</h4>
            <p className="muted">
              Cadastre seus dados e de seus pets. Escolha a camiseta oficial e prepare a fantasia!
            </p>
          </div>
          <div>
            <h4>2. Camiseta do Blocão</h4>
            <p className="muted">
              Adquira a camiseta oficial e acessórios para você e seu pet desfilarem juntos.
            </p>
          </div>
          <div>
            <h4>3. Desfile</h4>
            <p className="muted">
              No dia do evento, venha fantasiado com seu pet para uma caminhada alegre e segura.
            </p>
          </div>
          <div>
            <h4>4. Memórias</h4>
            <p className="muted">
              Celebre a amizade com seu pet e faça parte das memórias do Blocão Caraguatatuba.
            </p>
          </div>
        </div>
      </section>

      {/* Transparência */}
      <section className="panel">
        <h2>� Edições Anteriores</h2>
        <p>
          Confira as fotos e memórias das edições anteriores do Blocão na nossa galeria.
        </p>
        <div className="grid three" style={{ marginTop: '1rem' }}>
          <div className="stat-card">
            <span className="stat-value">200+</span>
            <span className="stat-label">Pets em 2025</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">500+</span>
            <span className="stat-label">Participantes</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">3</span>
            <span className="stat-label">Anos de folia pet</span>
          </div>
        </div>
        <Link className="ghost" to="/galeria" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Ver galeria de fotos →
        </Link>
      </section>

      {/* Próximo evento */}
      <section className="panel">
        <h2>📅 Próximo Evento</h2>
        <p>
          <strong>{eventInfo.name}</strong>
        </p>
        <p className="muted">{eventInfo.date}</p>
        <p className="muted">📍 {eventInfo.location}</p>
        <span className="badge">{eventInfo.statusLabel}</span>
        <div className="row" style={{ marginTop: '1rem' }}>
          <Link className="primary" to="/inscricao">
            Inscreva-se agora
          </Link>
          <Link className="ghost" to="/loja">
            Comprar abadá
          </Link>
        </div>
      </section>

      {/* Como participar */}
      <section className="panel">
        <h2>🤝 Como participar</h2>
        <div className="grid three" style={{ marginTop: '1rem' }}>
          <Link to="/loja" className="help-card">
            <span className="help-icon">🎽</span>
            <h4>Compre a camiseta</h4>
            <p className="muted">Vista a camisa do Blocão e desfila com a gente.</p>
          </Link>
          <Link to="/inscricao" className="help-card">
            <span className="help-icon">�</span>
            <h4>Faça sua inscrição</h4>
            <p className="muted">Cadastre você e seu pet para participar.</p>
          </Link>
          <Link to="/patrocinadores" className="help-card">
            <span className="help-icon">🏢</span>
            <h4>Seja patrocinador</h4>
            <p className="muted">Associe sua marca ao evento mais fofo da cidade.</p>
          </Link>
          <Link to="/profissionais" className="help-card">
            <span className="help-icon">🏥</span>
            <h4>Seja parceiro</h4>
            <p className="muted">Cadastre-se no catálogo de profissionais pet.</p>
          </Link>
          <a
            href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=Quero ser voluntário no Blocão!`}
            target="_blank"
            rel="noreferrer"
            className="help-card"
          >
            <span className="help-icon">🙋</span>
            <h4>Seja voluntário</h4>
            <p className="muted">Ajude na organização do evento.</p>
          </a>
          <a
            href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=Quero saber mais sobre o Blocão!`}
            target="_blank"
            rel="noreferrer"
            className="help-card"
          >
            <span className="help-icon">�</span>
            <h4>Fale conosco</h4>
            <p className="muted">Tire suas dúvidas pelo WhatsApp.</p>
          </a>
        </div>
      </section>

      {/* Contato */}
      <section className="panel">
        <h2>📞 Contato</h2>
        <p>
          <strong>WhatsApp:</strong>{' '}
          <a
            href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noreferrer"
          >
            {settings.whatsapp}
          </a>
        </p>
        <p>
          <strong>Email:</strong> {settings.email}
        </p>
        {settings.instagram && (
          <p>
            <strong>Instagram:</strong>{' '}
            <a
              href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
            >
              {settings.instagram}
            </a>
          </p>
        )}
        <p>
          <strong>Cidade:</strong> {settings.city}/{settings.state}
        </p>
      </section>
    </div>
  )
}
