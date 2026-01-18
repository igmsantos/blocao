import { useState } from 'react'
import { useApp } from '../context'
import type { Professional } from '../types'

export function ProfessionalsPage() {
  const { professionals, addProfessional } = useApp()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('todos')
  const [filterCity, setFilterCity] = useState<string>('todos')
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [form, setForm] = useState({
    name: '',
    responsibleName: '',
    category: 'Veterinário',
    email: '',
    whatsapp: '',
    district: '',
    city: '',
    state: '',
    services: '',
    schedule: '',
    benefits: '',
    couponCode: '',
    emergency24h: false,
  })

  const approved = professionals.filter((p) => p.approved)
  const categories = [...new Set(approved.map((p) => p.category))]
  const cities = [...new Set(approved.map((p) => p.city).filter(Boolean))]

  const filtered = approved.filter((pro) => {
    if (filterCategory !== 'todos' && pro.category !== filterCategory) return false
    if (filterCity !== 'todos' && pro.city !== filterCity) return false
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      return (
        pro.name.toLowerCase().includes(search) ||
        pro.services?.toLowerCase().includes(search) ||
        pro.district?.toLowerCase().includes(search)
      )
    }
    return true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const professional: Professional = {
      id: `pro-${Date.now()}`,
      name: form.name,
      responsibleName: form.responsibleName,
      category: form.category,
      email: form.email,
      whatsapp: form.whatsapp,
      district: form.district,
      city: form.city,
      state: form.state,
      services: form.services,
      schedule: form.schedule,
      benefits: form.benefits,
      couponCode: form.couponCode,
      emergency24h: form.emergency24h,
      approved: false,
      createdAt: new Date().toISOString(),
    }
    addProfessional(professional)
    setForm({
      name: '',
      responsibleName: '',
      category: 'Veterinário',
      email: '',
      whatsapp: '',
      district: '',
      city: '',
      state: '',
      services: '',
      schedule: '',
      benefits: '',
      couponCode: '',
      emergency24h: false,
    })
    setShowForm(false)
    alert('Cadastro enviado para aprovação. Entraremos em contato!')
  }

  return (
    <div className="stack gap-lg">
      <header className="page-header">
        <div>
          <p className="eyebrow">Profissionais</p>
          <h1>Diretório da comunidade pet</h1>
          <p className="muted">
            Encontre veterinários, pet shops e parceiros com benefícios exclusivos.
          </p>
        </div>
        <button className="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Fechar formulário' : 'Quero me cadastrar'}
        </button>
      </header>

      {/* Formulário de cadastro */}
      {showForm && (
        <div className="panel">
          <h3>Cadastro de Profissional/Estabelecimento</h3>
          <p className="muted">
            Preencha os dados abaixo. Após aprovação, seu perfil aparecerá no catálogo.
          </p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="grid two">
              <label>
                Nome do estabelecimento *
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </label>
              <label>
                Nome do responsável
                <input
                  value={form.responsibleName}
                  onChange={(e) => setForm((f) => ({ ...f, responsibleName: e.target.value }))}
                />
              </label>
              <label>
                Categoria *
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                >
                  <option>Veterinário</option>
                  <option>Banho e Tosa</option>
                  <option>Pet Shop</option>
                  <option>Adestramento</option>
                  <option>Hotel</option>
                  <option>Transporte</option>
                  <option>Outro</option>
                </select>
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </label>
              <label>
                WhatsApp *
                <input
                  value={form.whatsapp}
                  onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
                  required
                />
              </label>
              <label>
                Bairro
                <input
                  value={form.district}
                  onChange={(e) => setForm((f) => ({ ...f, district: e.target.value }))}
                />
              </label>
              <label>
                Cidade
                <input
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                />
              </label>
              <label>
                UF
                <input
                  value={form.state}
                  onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                />
              </label>
            </div>
            <label>
              Serviços oferecidos
              <textarea
                value={form.services}
                onChange={(e) => setForm((f) => ({ ...f, services: e.target.value }))}
                placeholder="Ex: Consultas, vacinas, cirurgias..."
              />
            </label>
            <label>
              Horário de funcionamento
              <input
                value={form.schedule}
                onChange={(e) => setForm((f) => ({ ...f, schedule: e.target.value }))}
                placeholder="Ex: Seg-Sex 8h-18h"
              />
            </label>
            <label>
              Benefício para participantes do Blocão (opcional)
              <input
                value={form.benefits}
                onChange={(e) => setForm((f) => ({ ...f, benefits: e.target.value }))}
                placeholder="Ex: 10% de desconto"
              />
            </label>
            <label>
              Código do cupom (se houver)
              <input
                value={form.couponCode}
                onChange={(e) => setForm((f) => ({ ...f, couponCode: e.target.value }))}
                placeholder="Ex: BLOCAO10"
              />
            </label>
            <label className="radio">
              <input
                type="checkbox"
                checked={form.emergency24h}
                onChange={(e) => setForm((f) => ({ ...f, emergency24h: e.target.checked }))}
              />
              Atende emergência 24h
            </label>
            <button className="primary" type="submit">
              Enviar para aprovação
            </button>
          </form>
        </div>
      )}

      {/* Filtros */}
      <div className="row">
        <input
          type="search"
          placeholder="Buscar por nome, serviço ou bairro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="todos">Todas categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
          <option value="todos">Todas cidades</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Lista de profissionais */}
      <div className="grid two">
        {filtered.map((pro) => (
          <div key={pro.id} className="panel professional-card">
            <div className="row between">
              <div>
                <h3>{pro.name}</h3>
                <p className="eyebrow">{pro.category}</p>
              </div>
              {pro.featured && <span className="badge">Destaque</span>}
              {pro.emergency24h && <span className="badge">24h</span>}
            </div>
            
            {pro.responsibleName && (
              <p className="muted">Responsável: {pro.responsibleName}</p>
            )}
            
            <p className="muted">
              📍 {pro.district && `${pro.district}, `}{pro.city}{pro.state && `/${pro.state}`}
            </p>
            
            {pro.schedule && <p className="muted">🕐 {pro.schedule}</p>}
            
            {pro.services && (
              <p><strong>Serviços:</strong> {pro.services}</p>
            )}
            
            {pro.benefits && (
              <div className="benefit-box">
                <p className="eyebrow">Benefício Blocão</p>
                <p>{pro.benefits}</p>
                {pro.couponCode && (
                  <span className="coupon-code">{pro.couponCode}</span>
                )}
              </div>
            )}
            
            <div className="row" style={{ marginTop: '1rem' }}>
              <a
                className="primary"
                href={`https://wa.me/${pro.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
              >
                Falar no WhatsApp
              </a>
              {pro.email && (
                <a className="ghost" href={`mailto:${pro.email}`}>
                  Email
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {!filtered.length && (
        <div className="panel">
          <p className="muted">Nenhum profissional encontrado com os filtros selecionados.</p>
        </div>
      )}
    </div>
  )
}
