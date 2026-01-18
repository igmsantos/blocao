import { useState } from 'react'
import { useApp } from '../context'
import type { Address, Pet } from '../types'

export function InscriptionPage() {
  const { createInscription, pickupPoints, eventInfo } = useApp()
  
  const [step, setStep] = useState(1)
  
  // Step 1 - Responsável
  const [responsible, setResponsible] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cpf, setCpf] = useState('')
  
  // Step 2 - Entrega
  const [delivery, setDelivery] = useState<'Entrega' | 'Retirada'>('Retirada')
  const [pickupPoint, setPickupPoint] = useState(pickupPoints[0]?.id || '')
  const [address, setAddress] = useState<Address>({})
  
  // Step 3 - Pets
  const [pets, setPets] = useState<Pet[]>([
    { name: '', species: 'cão', size: 'M', notes: '' }
  ])
  
  // Step 4 - Confirmação
  const [submitted, setSubmitted] = useState(false)
  const [protocol, setProtocol] = useState('')

  const handlePetChange = (index: number, field: keyof Pet, value: string) => {
    setPets((prev) =>
      prev.map((pet, i) => (i === index ? { ...pet, [field]: value } : pet))
    )
  }

  const addPet = () => {
    setPets((prev) => [...prev, { name: '', species: 'cão', size: 'M', notes: '' }])
  }

  const removePet = (index: number) => {
    if (pets.length > 1) {
      setPets((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return !!responsible && !!email && !!phone
      case 2:
        if (delivery === 'Entrega') {
          return !!address.street && !!address.number && !!address.city
        }
        return !!pickupPoint
      case 3:
        return pets.every((pet) => pet.name.trim() !== '')
      default:
        return true
    }
  }

  const handleSubmit = () => {
    const inscription = createInscription({
      responsible,
      email,
      phone,
      cpf,
      delivery,
      address: delivery === 'Entrega' ? address : undefined,
      pickupPoint: delivery === 'Retirada' ? pickupPoint : undefined,
      pets,
    })
    setProtocol(inscription.id)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="stack gap-lg">
        <div className="panel success-panel">
          <div className="success-icon">✅</div>
          <h2>Inscrição confirmada!</h2>
          <p className="muted">Seu protocolo é:</p>
          <p className="protocol">{protocol}</p>
          <p className="muted">
            Enviamos os detalhes para <strong>{email}</strong> e pelo WhatsApp.
          </p>
          <div className="row" style={{ marginTop: '1.5rem' }}>
            <a className="primary" href="/loja">
              Ir para a loja
            </a>
            <button
              className="ghost"
              onClick={() => {
                navigator.share?.({
                  title: 'Minha inscrição no Blocão',
                  text: `Inscrição confirmada! Protocolo: ${protocol}`,
                  url: window.location.href,
                })
              }}
            >
              Compartilhar
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
          <p className="eyebrow">Inscrição</p>
          <h1>Cadastre-se no {eventInfo.name}</h1>
          <p className="muted">
            Preencha seus dados, adicione seus pets e escolha como receber o abadá.
          </p>
        </div>
      </header>

      {/* Progress */}
      <div className="wizard-progress">
        {['Responsável', 'Entrega', 'Pets', 'Confirmação'].map((label, i) => (
          <div
            key={i}
            className={`wizard-step ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'completed' : ''}`}
          >
            <span className="wizard-number">{i + 1}</span>
            <span className="wizard-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="panel wizard-content">
        {/* Step 1 - Responsável */}
        {step === 1 && (
          <div className="stack gap">
            <h3>Dados do responsável</h3>
            <div className="grid two">
              <label>
                Nome completo *
                <input
                  value={responsible}
                  onChange={(e) => setResponsible(e.target.value)}
                  required
                />
              </label>
              <label>
                Email *
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Telefone / WhatsApp *
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </label>
              <label>
                CPF (opcional)
                <input
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </label>
            </div>
          </div>
        )}

        {/* Step 2 - Entrega */}
        {step === 2 && (
          <div className="stack gap">
            <h3>Como deseja receber?</h3>
            <div className="row">
              <label className="radio">
                <input
                  type="radio"
                  checked={delivery === 'Retirada'}
                  onChange={() => setDelivery('Retirada')}
                />
                Vou retirar
              </label>
              <label className="radio">
                <input
                  type="radio"
                  checked={delivery === 'Entrega'}
                  onChange={() => setDelivery('Entrega')}
                />
                Quero entrega
              </label>
            </div>

            {delivery === 'Retirada' ? (
              <div>
                <label>
                  Ponto de retirada
                  <select value={pickupPoint} onChange={(e) => setPickupPoint(e.target.value)}>
                    {pickupPoints.filter((p) => p.active).map((point) => (
                      <option key={point.id} value={point.id}>
                        {point.name}
                      </option>
                    ))}
                  </select>
                </label>
                {pickupPoints.find((p) => p.id === pickupPoint) && (
                  <div className="pickup-info">
                    <p><strong>Endereço:</strong> {pickupPoints.find((p) => p.id === pickupPoint)?.address}</p>
                    <p><strong>Horário:</strong> {pickupPoints.find((p) => p.id === pickupPoint)?.schedule}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid three">
                <label>
                  CEP
                  <input
                    value={address.cep || ''}
                    onChange={(e) => setAddress((a) => ({ ...a, cep: e.target.value }))}
                  />
                </label>
                <label>
                  Rua *
                  <input
                    value={address.street || ''}
                    onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                    required
                  />
                </label>
                <label>
                  Número *
                  <input
                    value={address.number || ''}
                    onChange={(e) => setAddress((a) => ({ ...a, number: e.target.value }))}
                    required
                  />
                </label>
                <label>
                  Complemento
                  <input
                    value={address.complement || ''}
                    onChange={(e) => setAddress((a) => ({ ...a, complement: e.target.value }))}
                  />
                </label>
                <label>
                  Bairro
                  <input
                    value={address.district || ''}
                    onChange={(e) => setAddress((a) => ({ ...a, district: e.target.value }))}
                  />
                </label>
                <label>
                  Cidade *
                  <input
                    value={address.city || ''}
                    onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                    required
                  />
                </label>
                <label>
                  UF
                  <input
                    value={address.state || ''}
                    onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value }))}
                  />
                </label>
              </div>
            )}
          </div>
        )}

        {/* Step 3 - Pets */}
        {step === 3 && (
          <div className="stack gap">
            <div className="section-header">
              <h3>Seus pets</h3>
              <button type="button" className="ghost" onClick={addPet}>
                + Adicionar pet
              </button>
            </div>
            {pets.map((pet, index) => (
              <div key={index} className="pet-card">
                <div className="grid three">
                  <label>
                    Nome do pet *
                    <input
                      value={pet.name}
                      onChange={(e) => handlePetChange(index, 'name', e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Espécie
                    <select
                      value={pet.species}
                      onChange={(e) => handlePetChange(index, 'species', e.target.value)}
                    >
                      <option value="cão">Cão</option>
                      <option value="gato">Gato</option>
                      <option value="outro">Outro</option>
                    </select>
                  </label>
                  <label>
                    Tamanho do abadá
                    <select
                      value={pet.size}
                      onChange={(e) => handlePetChange(index, 'size', e.target.value)}
                    >
                      <option value="PP">PP</option>
                      <option value="P">P</option>
                      <option value="M">M</option>
                      <option value="G">G</option>
                      <option value="GG">GG</option>
                    </select>
                  </label>
                </div>
                <div className="row between">
                  <label style={{ flex: 1 }}>
                    Observações (alergias, etc)
                    <input
                      value={pet.notes || ''}
                      onChange={(e) => handlePetChange(index, 'notes', e.target.value)}
                    />
                  </label>
                  {pets.length > 1 && (
                    <button
                      type="button"
                      className="ghost"
                      onClick={() => removePet(index)}
                      style={{ alignSelf: 'flex-end' }}
                    >
                      Remover
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 4 - Confirmação */}
        {step === 4 && (
          <div className="stack gap">
            <h3>Confirme seus dados</h3>
            
            <div className="summary-section">
              <h4>Responsável</h4>
              <p><strong>Nome:</strong> {responsible}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Telefone:</strong> {phone}</p>
              {cpf && <p><strong>CPF:</strong> {cpf}</p>}
            </div>

            <div className="summary-section">
              <h4>{delivery}</h4>
              {delivery === 'Retirada' ? (
                <p>{pickupPoints.find((p) => p.id === pickupPoint)?.name}</p>
              ) : (
                <p>
                  {address.street}, {address.number}
                  {address.complement && `, ${address.complement}`}
                  {address.district && ` - ${address.district}`}
                  {address.city && `, ${address.city}`}
                  {address.state && `/${address.state}`}
                </p>
              )}
            </div>

            <div className="summary-section">
              <h4>Pets ({pets.length})</h4>
              {pets.map((pet, i) => (
                <p key={i}>
                  <strong>{pet.name}</strong> - {pet.species}, tamanho {pet.size}
                  {pet.notes && ` (${pet.notes})`}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="wizard-nav">
          {step > 1 && (
            <button className="ghost" onClick={() => setStep(step - 1)}>
              ← Voltar
            </button>
          )}
          <div style={{ flex: 1 }} />
          {step < 4 ? (
            <button
              className="primary"
              onClick={() => setStep(step + 1)}
              disabled={!validateStep(step)}
            >
              Próximo →
            </button>
          ) : (
            <button className="primary" onClick={handleSubmit}>
              Confirmar inscrição
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
