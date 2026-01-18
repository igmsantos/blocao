import { Link } from 'react-router-dom'
import { useApp } from '../context'
import type { SponsorTier } from '../types'

const tierConfig: Record<SponsorTier, { label: string; color: string; benefits: string[] }> = {
  master: {
    label: 'Master',
    color: '#fbbf24',
    benefits: [
      'Logo no abadá oficial',
      'Banner principal no site',
      'Estande exclusivo no evento',
      'Divulgação em todas as redes',
      'Menção em entrevistas e mídia',
    ],
  },
  ouro: {
    label: 'Ouro',
    color: '#f59e0b',
    benefits: [
      'Logo no site (destaque)',
      'Banner rotativo',
      'Divulgação nas redes sociais',
      'Estande no evento',
    ],
  },
  prata: {
    label: 'Prata',
    color: '#9ca3af',
    benefits: [
      'Logo no site',
      'Menção nas redes sociais',
      'Presença no material impresso',
    ],
  },
  bronze: {
    label: 'Bronze',
    color: '#a16207',
    benefits: [
      'Logo no site',
      'Menção nas redes sociais',
    ],
  },
  apoiador: {
    label: 'Apoiador',
    color: '#6b7280',
    benefits: [
      'Logo no site',
    ],
  },
}

export function SponsorsPage() {
  const { sponsors, settings } = useApp()

  const activeSponsors = sponsors.filter((s) => s.active)
  const sponsorsByTier = (tier: SponsorTier) => activeSponsors.filter((s) => s.tier === tier)

  return (
    <div className="stack gap-lg">
      <header className="page-header">
        <div>
          <p className="eyebrow">Patrocinadores</p>
          <h1>Apoie o Blocão</h1>
          <p className="muted">
            Sua marca associada à maior festa pet solidária do Brasil.
          </p>
        </div>
      </header>

      {/* Benefícios de patrocinar */}
      <section className="panel">
        <h2>Por que patrocinar?</h2>
        <div className="grid three" style={{ marginTop: '1rem' }}>
          <div>
            <h4>📢 Visibilidade</h4>
            <p className="muted">
              Milhares de pessoas engajadas com a causa animal vão conhecer sua marca.
            </p>
          </div>
          <div>
            <h4>❤️ Responsabilidade Social</h4>
            <p className="muted">
              Associe sua marca a uma causa nobre e bem vista pela sociedade.
            </p>
          </div>
          <div>
            <h4>🎯 Público segmentado</h4>
            <p className="muted">
              Alcance diretamente donos de pets, um público altamente engajado.
            </p>
          </div>
        </div>
      </section>

      {/* Cotas */}
      <section>
        <h2>Cotas de patrocínio</h2>
        <div className="grid three" style={{ marginTop: '1rem' }}>
          {(Object.keys(tierConfig) as SponsorTier[]).map((tier) => (
            <div key={tier} className="panel sponsor-tier-card">
              <div
                className="tier-badge"
                style={{ backgroundColor: tierConfig[tier].color }}
              >
                {tierConfig[tier].label}
              </div>
              <h3>{tierConfig[tier].label}</h3>
              <ul>
                {tierConfig[tier].benefits.map((benefit, i) => (
                  <li key={i}>✓ {benefit}</li>
                ))}
              </ul>
              <a
                className="primary"
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=Olá! Tenho interesse na cota ${tierConfig[tier].label} de patrocínio do Blocão.`}
                target="_blank"
                rel="noreferrer"
              >
                Quero patrocinar
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Patrocinadores atuais */}
      {activeSponsors.length > 0 && (
        <section>
          <h2>Nossos patrocinadores</h2>
          
          {(Object.keys(tierConfig) as SponsorTier[]).map((tier) => {
            const tierSponsors = sponsorsByTier(tier)
            if (!tierSponsors.length) return null
            
            return (
              <div key={tier} style={{ marginTop: '1.5rem' }}>
                <h4 style={{ color: tierConfig[tier].color }}>
                  {tierConfig[tier].label}
                </h4>
                <div className="sponsors-grid">
                  {tierSponsors.map((sponsor) => (
                    <a
                      key={sponsor.id}
                      href={sponsor.website}
                      target="_blank"
                      rel="noreferrer"
                      className="sponsor-card"
                    >
                      <img src={sponsor.logo} alt={sponsor.name} />
                      <span>{sponsor.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </section>
      )}

      {/* CTA */}
      <section className="panel cta-section">
        <h2>Quer patrocinar o Blocão?</h2>
        <p className="muted">
          Entre em contato conosco e saiba como sua marca pode fazer parte dessa festa.
        </p>
        <div className="row" style={{ marginTop: '1rem' }}>
          <a
            className="primary"
            href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=Olá! Tenho interesse em patrocinar o Blocão.`}
            target="_blank"
            rel="noreferrer"
          >
            Falar pelo WhatsApp
          </a>
          <a className="ghost" href={`mailto:${settings.email}`}>
            Enviar email
          </a>
        </div>
      </section>

      <div className="row" style={{ justifyContent: 'center' }}>
        <Link className="ghost" to="/">
          ← Voltar para a Home
        </Link>
      </div>
    </div>
  )
}
