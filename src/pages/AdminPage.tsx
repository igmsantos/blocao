import { useState } from 'react'
import { useApp } from '../context'
import { formatCurrency, formatShortDate } from '../utils'
import { downloadCsv } from '../utils'
import type { Album, Banner, EventInfo } from '../types'

type AdminTab = 'dashboard' | 'banners' | 'galeria' | 'loja' | 'inscricoes' | 'pedidos' | 'profissionais' | 'patrocinadores' | 'artigos' | 'doacoes' | 'config'

export function AdminPage() {
  const {
    banners,
    eventInfo,
    albums,
    products,
    orders,
    inscriptions,
    professionals,
    sponsors,
    articles,
    donations,
    coupons,
    settings,
    addBanner,
    updateEventInfo,
    addAlbum,
    updateOrderStatus,
    updateInscriptionStatus,
    approveProfessional,
    updateSettings,
  } = useApp()

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')

  // Forms
  const [eventForm, setEventForm] = useState(eventInfo)
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    ctaLabel: 'Saiba mais',
    ctaLink: '/',
    image: '',
  })
  const [albumForm, setAlbumForm] = useState({
    year: new Date().getFullYear(),
    title: '',
    cover: '',
    category: 'desfile',
    photos: '',
  })

  const pendingProfessionals = professionals.filter((p) => !p.approved)
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0)
  const totalDonations = donations.filter((d) => d.status === 'confirmada').reduce((sum, d) => sum + d.amount, 0)

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateEventInfo(eventForm)
    alert('Evento atualizado!')
  }

  const handleBannerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const banner: Banner = {
      id: `banner-${Date.now()}`,
      ...bannerForm,
      image: bannerForm.image || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
      active: true,
    }
    addBanner(banner)
    setBannerForm({ title: '', subtitle: '', ctaLabel: 'Saiba mais', ctaLink: '/', image: '' })
    alert('Banner adicionado!')
  }

  const handleAlbumSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const album: Album = {
      id: `alb-${Date.now()}`,
      year: albumForm.year,
      title: albumForm.title || `Blocão ${albumForm.year}`,
      cover: albumForm.cover || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80',
      category: albumForm.category,
      photos: albumForm.photos.split('\n').map((p) => p.trim()).filter(Boolean),
      published: true,
    }
    addAlbum(album)
    setAlbumForm({ year: new Date().getFullYear(), title: '', cover: '', category: 'desfile', photos: '' })
    alert('Álbum criado!')
  }

  const exportOrders = () => {
    downloadCsv('pedidos', orders.map((o) => ({
      id: o.id,
      cliente: o.customerName,
      email: o.email,
      telefone: o.phone,
      entrega: o.deliveryMethod,
      total: o.total,
      desconto: o.discount || 0,
      cupom: o.couponCode || '',
      status: o.status,
      criadoEm: formatShortDate(o.createdAt),
    })))
  }

  const exportInscriptions = () => {
    downloadCsv('inscricoes', inscriptions.map((i) => ({
      id: i.id,
      responsavel: i.responsible,
      email: i.email,
      telefone: i.phone,
      entrega: i.deliveryMethod,
      pets: i.pets.map((p) => `${p.name}(${p.size})`).join(' | '),
      status: i.status,
      criadoEm: formatShortDate(i.createdAt),
    })))
  }

  const tabs: { key: AdminTab; label: string; icon: string }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'banners', label: 'Banners', icon: '🖼️' },
    { key: 'galeria', label: 'Galeria', icon: '📷' },
    { key: 'loja', label: 'Loja', icon: '🛒' },
    { key: 'inscricoes', label: 'Inscrições', icon: '📝' },
    { key: 'pedidos', label: 'Pedidos', icon: '📦' },
    { key: 'profissionais', label: 'Profissionais', icon: '🏥' },
    { key: 'patrocinadores', label: 'Patrocinadores', icon: '🤝' },
    { key: 'artigos', label: 'Artigos', icon: '📰' },
    { key: 'doacoes', label: 'Doações', icon: '💝' },
    { key: 'config', label: 'Configurações', icon: '⚙️' },
  ]

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h3>🐕 Blocão Admin</h3>
        <nav>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`admin-nav-item ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="admin-content">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="stack gap-lg">
            <h2>📊 Dashboard</h2>
            
            <div className="grid three">
              <div className="stat-card">
                <span className="stat-value">{formatCurrency(totalSales)}</span>
                <span className="stat-label">Vendas totais</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{orders.length}</span>
                <span className="stat-label">Pedidos</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{inscriptions.length}</span>
                <span className="stat-label">Inscrições</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{formatCurrency(totalDonations)}</span>
                <span className="stat-label">Doações</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{professionals.filter((p) => p.approved).length}</span>
                <span className="stat-label">Profissionais aprovados</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{pendingProfessionals.length}</span>
                <span className="stat-label">Pendentes de aprovação</span>
              </div>
            </div>

            <div className="panel">
              <h3>Ações rápidas</h3>
              <div className="row">
                <button className="ghost" onClick={exportOrders}>
                  Exportar pedidos CSV
                </button>
                <button className="ghost" onClick={exportInscriptions}>
                  Exportar inscrições CSV
                </button>
              </div>
            </div>

            {/* Evento */}
            <div className="panel">
              <h3>Configurar evento</h3>
              <form className="form" onSubmit={handleEventSubmit}>
                <div className="grid two">
                  <label>
                    Nome do evento
                    <input
                      value={eventForm.name}
                      onChange={(e) => setEventForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </label>
                  <label>
                    Data (texto)
                    <input
                      value={eventForm.date}
                      onChange={(e) => setEventForm((f) => ({ ...f, date: e.target.value }))}
                    />
                  </label>
                  <label>
                    Data alvo (YYYY-MM-DD)
                    <input
                      type="datetime-local"
                      value={eventForm.targetDate.slice(0, 16)}
                      onChange={(e) => setEventForm((f) => ({ ...f, targetDate: e.target.value }))}
                    />
                  </label>
                  <label>
                    Local
                    <input
                      value={eventForm.location}
                      onChange={(e) => setEventForm((f) => ({ ...f, location: e.target.value }))}
                    />
                  </label>
                  <label>
                    Status
                    <select
                      value={eventForm.status}
                      onChange={(e) => setEventForm((f) => ({ ...f, status: e.target.value as EventInfo['status'] }))}
                    >
                      <option value="preparacao">Em preparação</option>
                      <option value="inscricoes-abertas">Inscrições abertas</option>
                      <option value="encerrado">Encerrado</option>
                    </select>
                  </label>
                  <label>
                    Label do status
                    <input
                      value={eventForm.statusLabel}
                      onChange={(e) => setEventForm((f) => ({ ...f, statusLabel: e.target.value }))}
                    />
                  </label>
                </div>
                <button className="primary" type="submit">
                  Salvar evento
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Banners */}
        {activeTab === 'banners' && (
          <div className="stack gap-lg">
            <h2>🖼️ Banners</h2>
            
            <div className="grid two">
              <div className="panel">
                <h3>Banners ativos ({banners.length})</h3>
                <div className="list">
                  {banners.map((banner) => (
                    <div key={banner.id} className="row between">
                      <div>
                        <strong>{banner.title}</strong>
                        <p className="muted">{banner.subtitle}</p>
                      </div>
                      <span className={`badge ${banner.active ? '' : 'inactive'}`}>
                        {banner.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="panel">
                <h3>Novo banner</h3>
                <form className="form" onSubmit={handleBannerSubmit}>
                  <label>
                    Título *
                    <input
                      value={bannerForm.title}
                      onChange={(e) => setBannerForm((f) => ({ ...f, title: e.target.value }))}
                      required
                    />
                  </label>
                  <label>
                    Subtítulo
                    <input
                      value={bannerForm.subtitle}
                      onChange={(e) => setBannerForm((f) => ({ ...f, subtitle: e.target.value }))}
                    />
                  </label>
                  <div className="grid two">
                    <label>
                      Texto do botão
                      <input
                        value={bannerForm.ctaLabel}
                        onChange={(e) => setBannerForm((f) => ({ ...f, ctaLabel: e.target.value }))}
                      />
                    </label>
                    <label>
                      Link do botão
                      <input
                        value={bannerForm.ctaLink}
                        onChange={(e) => setBannerForm((f) => ({ ...f, ctaLink: e.target.value }))}
                      />
                    </label>
                  </div>
                  <label>
                    Imagem (URL)
                    <input
                      value={bannerForm.image}
                      onChange={(e) => setBannerForm((f) => ({ ...f, image: e.target.value }))}
                    />
                  </label>
                  <button className="primary" type="submit">
                    Adicionar banner
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Galeria */}
        {activeTab === 'galeria' && (
          <div className="stack gap-lg">
            <h2>📷 Galeria</h2>
            
            <div className="grid two">
              <div className="panel">
                <h3>Álbuns ({albums.length})</h3>
                <div className="list">
                  {albums.map((album) => (
                    <div key={album.id} className="row between">
                      <div>
                        <strong>{album.title}</strong>
                        <p className="muted">{album.year} · {album.photos.length} fotos</p>
                      </div>
                      <span className={`badge ${album.published ? '' : 'inactive'}`}>
                        {album.published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="panel">
                <h3>Novo álbum</h3>
                <form className="form" onSubmit={handleAlbumSubmit}>
                  <div className="grid two">
                    <label>
                      Ano
                      <input
                        type="number"
                        value={albumForm.year}
                        onChange={(e) => setAlbumForm((f) => ({ ...f, year: Number(e.target.value) }))}
                      />
                    </label>
                    <label>
                      Categoria
                      <select
                        value={albumForm.category}
                        onChange={(e) => setAlbumForm((f) => ({ ...f, category: e.target.value }))}
                      >
                        <option value="desfile">Desfile</option>
                        <option value="bastidores">Bastidores</option>
                        <option value="pets">Pets</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    Título
                    <input
                      value={albumForm.title}
                      onChange={(e) => setAlbumForm((f) => ({ ...f, title: e.target.value }))}
                    />
                  </label>
                  <label>
                    Capa (URL)
                    <input
                      value={albumForm.cover}
                      onChange={(e) => setAlbumForm((f) => ({ ...f, cover: e.target.value }))}
                    />
                  </label>
                  <label>
                    Fotos (uma URL por linha)
                    <textarea
                      value={albumForm.photos}
                      onChange={(e) => setAlbumForm((f) => ({ ...f, photos: e.target.value }))}
                      rows={6}
                    />
                  </label>
                  <button className="primary" type="submit">
                    Criar álbum
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Loja */}
        {activeTab === 'loja' && (
          <div className="stack gap-lg">
            <h2>🛒 Loja</h2>
            
            <div className="grid two">
              <div className="panel">
                <h3>Produtos ({products.length})</h3>
                <div className="list">
                  {products.map((product) => (
                    <div key={product.id} className="row between">
                      <div>
                        <strong>{product.name}</strong>
                        <p className="muted">{product.category}</p>
                      </div>
                      <span>{formatCurrency(product.promoPrice || product.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="panel">
                <h3>Cupons ativos ({coupons.filter((c) => c.active).length})</h3>
                <div className="list">
                  {coupons.map((coupon) => (
                    <div key={coupon.id} className="row between">
                      <div>
                        <strong>{coupon.code}</strong>
                        <p className="muted">
                          {coupon.type === 'percentual' ? `${coupon.value}%` : formatCurrency(coupon.value)}
                          {' · '}{coupon.usedCount} usos
                        </p>
                      </div>
                      <span className={`badge ${coupon.active ? '' : 'inactive'}`}>
                        {coupon.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inscrições */}
        {activeTab === 'inscricoes' && (
          <div className="stack gap-lg">
            <div className="row between">
              <h2>📝 Inscrições ({inscriptions.length})</h2>
              <button className="ghost" onClick={exportInscriptions}>
                Exportar CSV
              </button>
            </div>
            
            <div className="list">
              {inscriptions.map((inscription) => (
                <div key={inscription.id} className="panel">
                  <div className="row between">
                    <div>
                      <strong>{inscription.id}</strong>
                      <p>{inscription.responsible}</p>
                      <p className="muted">{inscription.email} · {inscription.phone}</p>
                      <p className="muted">{inscription.pets.length} pet(s): {inscription.pets.map((p) => p.name).join(', ')}</p>
                    </div>
                    <div>
                      <select
                        value={inscription.status}
                        onChange={(e) => updateInscriptionStatus(inscription.id, e.target.value as 'nova' | 'aprovada' | 'pendente-info' | 'cancelada')}
                      >
                        <option value="nova">Nova</option>
                        <option value="aprovada">Aprovada</option>
                        <option value="pendente-info">Pendente info</option>
                        <option value="cancelada">Cancelada</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pedidos */}
        {activeTab === 'pedidos' && (
          <div className="stack gap-lg">
            <div className="row between">
              <h2>📦 Pedidos ({orders.length})</h2>
              <button className="ghost" onClick={exportOrders}>
                Exportar CSV
              </button>
            </div>
            
            <div className="list">
              {orders.map((order) => (
                <div key={order.id} className="panel">
                  <div className="row between">
                    <div>
                      <strong>{order.id}</strong>
                      <p>{order.customerName}</p>
                      <p className="muted">{order.email} · {order.phone}</p>
                      <p className="muted">{order.items.length} item(s) · {formatCurrency(order.total)}</p>
                    </div>
                    <div>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as 'pendente' | 'pago' | 'separando' | 'enviado' | 'concluido' | 'cancelado')}
                      >
                        <option value="pendente">Pendente</option>
                        <option value="pago">Pago</option>
                        <option value="separando">Separando</option>
                        <option value="enviado">Enviado</option>
                        <option value="concluido">Concluído</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profissionais */}
        {activeTab === 'profissionais' && (
          <div className="stack gap-lg">
            <h2>🏥 Profissionais</h2>
            
            {pendingProfessionals.length > 0 && (
              <div className="panel">
                <h3>Pendentes de aprovação ({pendingProfessionals.length})</h3>
                <div className="list">
                  {pendingProfessionals.map((pro) => (
                    <div key={pro.id} className="row between">
                      <div>
                        <strong>{pro.name}</strong>
                        <p className="muted">{pro.category} · {pro.city}</p>
                      </div>
                      <div className="row gap-sm">
                        <button className="primary" onClick={() => approveProfessional(pro.id, true)}>
                          Aprovar
                        </button>
                        <button className="ghost" onClick={() => approveProfessional(pro.id, false)}>
                          Reprovar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="panel">
              <h3>Aprovados ({professionals.filter((p) => p.approved).length})</h3>
              <div className="list">
                {professionals.filter((p) => p.approved).map((pro) => (
                  <div key={pro.id} className="row between">
                    <div>
                      <strong>{pro.name}</strong>
                      <p className="muted">{pro.category} · {pro.city}</p>
                    </div>
                    <span className="badge">Aprovado</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Patrocinadores */}
        {activeTab === 'patrocinadores' && (
          <div className="stack gap-lg">
            <h2>🤝 Patrocinadores ({sponsors.length})</h2>
            <div className="list">
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="panel">
                  <div className="row between">
                    <div>
                      <strong>{sponsor.name}</strong>
                      <p className="muted">Cota: {sponsor.tier}</p>
                    </div>
                    <span className={`badge ${sponsor.active ? '' : 'inactive'}`}>
                      {sponsor.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Artigos */}
        {activeTab === 'artigos' && (
          <div className="stack gap-lg">
            <h2>📰 Artigos ({articles.length})</h2>
            <div className="list">
              {articles.map((article) => (
                <div key={article.id} className="panel">
                  <div className="row between">
                    <div>
                      <strong>{article.title}</strong>
                      <p className="muted">{article.category} · {formatShortDate(article.createdAt)}</p>
                    </div>
                    <span className={`badge ${article.published ? '' : 'inactive'}`}>
                      {article.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Doações */}
        {activeTab === 'doacoes' && (
          <div className="stack gap-lg">
            <h2>💝 Doações ({donations.length})</h2>
            <div className="stat-card" style={{ maxWidth: '200px' }}>
              <span className="stat-value">{formatCurrency(totalDonations)}</span>
              <span className="stat-label">Total arrecadado</span>
            </div>
            <div className="list">
              {donations.map((donation) => (
                <div key={donation.id} className="panel">
                  <div className="row between">
                    <div>
                      <strong>{donation.donorName}</strong>
                      <p className="muted">{donation.email}</p>
                      <p>{formatCurrency(donation.amount)} · {donation.frequency}</p>
                    </div>
                    <span className={`badge ${donation.status === 'confirmada' ? '' : 'inactive'}`}>
                      {donation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Configurações */}
        {activeTab === 'config' && (
          <div className="stack gap-lg">
            <h2>⚙️ Configurações</h2>
            <div className="panel">
              <form className="form" onSubmit={(e) => {
                e.preventDefault()
                alert('Configurações salvas!')
              }}>
                <div className="grid two">
                  <label>
                    Nome do site
                    <input
                      value={settings.siteName}
                      onChange={(e) => updateSettings({ siteName: e.target.value })}
                    />
                  </label>
                  <label>
                    Email
                    <input
                      value={settings.email}
                      onChange={(e) => updateSettings({ email: e.target.value })}
                    />
                  </label>
                  <label>
                    WhatsApp
                    <input
                      value={settings.whatsapp}
                      onChange={(e) => updateSettings({ whatsapp: e.target.value })}
                    />
                  </label>
                  <label>
                    Instagram
                    <input
                      value={settings.instagram || ''}
                      onChange={(e) => updateSettings({ instagram: e.target.value })}
                    />
                  </label>
                  <label>
                    Cidade
                    <input
                      value={settings.city}
                      onChange={(e) => updateSettings({ city: e.target.value })}
                    />
                  </label>
                  <label>
                    Estado
                    <input
                      value={settings.state}
                      onChange={(e) => updateSettings({ state: e.target.value })}
                    />
                  </label>
                </div>
                <button className="primary" type="submit">
                  Salvar configurações
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
