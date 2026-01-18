import { useState } from 'react'
import { useApp } from '../context'
import { formatCurrency } from '../utils'

export function DonationsPage() {
  const { createDonation, settings } = useApp()

  const [donorName, setDonorName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState<'unica' | 'mensal'>('unica')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const presetAmounts = [25, 50, 100, 200, 500]
  const selectedAmount = amount || Number(customAmount) || 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAmount <= 0) {
      alert('Por favor, selecione ou informe um valor.')
      return
    }
    createDonation({
      donorName,
      email,
      phone,
      amount: selectedAmount,
      frequency,
      message,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="stack gap-lg">
        <div className="panel success-panel">
          <div className="success-icon">💝</div>
          <h2>Obrigado pela sua doação!</h2>
          <p className="muted">
            Sua contribuição de <strong>{formatCurrency(selectedAmount)}</strong>{' '}
            {frequency === 'mensal' ? '(mensal)' : ''} faz toda a diferença para os animais.
          </p>
          <p className="muted">
            Enviamos as instruções de pagamento para <strong>{email}</strong>.
          </p>
          <div className="row" style={{ marginTop: '1.5rem' }}>
            <a className="primary" href="/">
              Voltar para a Home
            </a>
            <button
              className="ghost"
              onClick={() => {
                setSubmitted(false)
                setDonorName('')
                setEmail('')
                setPhone('')
                setAmount(null)
                setCustomAmount('')
                setMessage('')
              }}
            >
              Fazer outra doação
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="stack gap-lg">
      <header className="page-header">
        <div>
          <p className="eyebrow">Doações</p>
          <h1>Apoie a causa animal</h1>
          <p className="muted">
            Sua doação ajuda a custear castrações, atendimentos veterinários e ações da ONG.
          </p>
        </div>
      </header>

      <div className="grid two">
        {/* Formulário de doação */}
        <div className="panel">
          <h3>Faça sua doação</h3>
          <form className="form" onSubmit={handleSubmit}>
            {/* Valor */}
            <div>
              <label>Escolha um valor</label>
              <div className="amount-grid">
                {presetAmounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`amount-btn ${amount === value ? 'selected' : ''}`}
                    onClick={() => {
                      setAmount(value)
                      setCustomAmount('')
                    }}
                  >
                    {formatCurrency(value)}
                  </button>
                ))}
              </div>
              <label style={{ marginTop: '1rem' }}>
                Ou informe outro valor
                <input
                  type="number"
                  placeholder="R$ 0,00"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setAmount(null)
                  }}
                />
              </label>
            </div>

            {/* Frequência */}
            <div>
              <label>Frequência</label>
              <div className="row">
                <label className="radio">
                  <input
                    type="radio"
                    checked={frequency === 'unica'}
                    onChange={() => setFrequency('unica')}
                  />
                  Doação única
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    checked={frequency === 'mensal'}
                    onChange={() => setFrequency('mensal')}
                  />
                  Doação mensal
                </label>
              </div>
            </div>

            {/* Dados do doador */}
            <label>
              Seu nome
              <input
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Telefone / WhatsApp (opcional)
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label>
              Mensagem (opcional)
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Deixe uma mensagem de apoio..."
              />
            </label>

            <div className="section-footer">
              <strong>Total: {formatCurrency(selectedAmount)}</strong>
              <button className="primary" type="submit">
                Doar agora
              </button>
            </div>
          </form>
        </div>

        {/* Informações sobre doação */}
        <div className="stack gap">
          <div className="panel">
            <h3>🐕 O que sua doação ajuda</h3>
            <ul className="benefit-list">
              <li>
                <strong>R$ 25</strong> - Ração para 1 animal por 1 semana
              </li>
              <li>
                <strong>R$ 50</strong> - Vacina e vermífugo para 1 animal
              </li>
              <li>
                <strong>R$ 100</strong> - Consulta veterinária completa
              </li>
              <li>
                <strong>R$ 200</strong> - Castração de 1 animal
              </li>
              <li>
                <strong>R$ 500</strong> - Kit completo de resgate e tratamento
              </li>
            </ul>
          </div>

          <div className="panel">
            <h3>📊 Transparência</h3>
            <p className="muted">
              Publicamos regularmente a prestação de contas de todos os recursos.
              Você pode acompanhar exatamente como sua doação é utilizada.
            </p>
            <a className="ghost" href="/noticias/prestacao-contas-2025">
              Ver prestação de contas →
            </a>
          </div>

          <div className="panel">
            <h3>📞 Dúvidas?</h3>
            <p className="muted">
              Entre em contato pelo WhatsApp ou email.
            </p>
            <div className="row">
              <a
                className="ghost"
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a className="ghost" href={`mailto:${settings.email}`}>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
