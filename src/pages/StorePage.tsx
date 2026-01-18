import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context'
import { ProductCard } from '../components/ui'
import { formatCurrency } from '../utils'
import type { Address } from '../types'

export function StorePage() {
  const {
    products,
    cartWithProduct,
    cartTotal,
    cartDiscount,
    appliedCoupon,
    addToCart,
    updateCartQuantity,
    removeCartItem,
    applyCoupon,
    removeCoupon,
    createOrder,
    pickupPoints,
  } = useApp()

  const [category, setCategory] = useState<string>('todos')
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')

  // Checkout form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cpf, setCpf] = useState('')
  const [delivery, setDelivery] = useState<'Entrega' | 'Retirada'>('Entrega')
  const [pickupPoint, setPickupPoint] = useState(pickupPoints[0]?.id || '')
  const [address, setAddress] = useState<Address>({})

  const publishedProducts = products.filter((p) => p.published !== false)
  const filtered = category === 'todos'
    ? publishedProducts
    : publishedProducts.filter((p) => p.category === category)

  const handleApplyCoupon = () => {
    setCouponError('')
    const success = applyCoupon(couponInput)
    if (!success) {
      setCouponError('Cupom inválido ou expirado')
    } else {
      setCouponInput('')
    }
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    const order = createOrder({
      name,
      email,
      phone,
      cpf,
      delivery,
      address: delivery === 'Entrega' ? address : undefined,
      pickupPoint: delivery === 'Retirada' ? pickupPoint : undefined,
    })
    if (order) {
      alert(`Pedido gerado com sucesso! ID: ${order.id}\nEnviamos confirmação por email/WhatsApp.`)
      // Reset form
      setName('')
      setEmail('')
      setPhone('')
      setCpf('')
      setAddress({})
    }
  }

  return (
    <div className="stack gap-lg">
      <header className="page-header">
        <div>
          <p className="eyebrow">Loja</p>
          <h1>Abadás, rastreadores e acessórios</h1>
          <p className="muted">Checkout simples com entrega ou retirada.</p>
        </div>
        <div className="row">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="Abadás">Abadás</option>
            <option value="Rastreadores">Rastreadores</option>
            <option value="Acessórios">Acessórios</option>
          </select>
          <Link className="ghost" to="/inscricao">
            Inscrever no desfile
          </Link>
        </div>
      </header>

      <div className="grid three">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={(options) => addToCart(product.id, options)}
          />
        ))}
      </div>

      {!filtered.length && (
        <div className="panel">
          <p className="muted">Nenhum produto encontrado nesta categoria.</p>
        </div>
      )}

      <div className="grid two">
        {/* Carrinho */}
        <div className="panel">
          <div className="section-header">
            <h3>🛒 Carrinho</h3>
            <span className="muted">{cartWithProduct.length} itens</span>
          </div>
          
          {!cartWithProduct.length && (
            <p className="muted">Adicione produtos para finalizar.</p>
          )}
          
          <div className="list">
            {cartWithProduct.map((item, index) => (
              <div key={`${item.productId}-${index}`} className="cart-row">
                <div>
                  <strong>{item.product?.name}</strong>
                  <p className="muted">
                    {item.size && `Tam ${item.size} · `}
                    {item.petSize && `Pet ${item.petSize} · `}
                    {item.color && `${item.color} · `}
                    {formatCurrency(item.product?.promoPrice || item.product?.price || 0)}
                  </p>
                </div>
                <div className="row">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateCartQuantity(index, Number(e.target.value))}
                  />
                  <button className="ghost" onClick={() => removeCartItem(index)}>
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cupom */}
          <div className="coupon-section">
            {appliedCoupon ? (
              <div className="row between">
                <span>Cupom <strong>{appliedCoupon.code}</strong> aplicado!</span>
                <button className="ghost" onClick={removeCoupon}>
                  Remover
                </button>
              </div>
            ) : (
              <div className="row">
                <input
                  placeholder="Cupom de desconto"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button className="ghost" onClick={handleApplyCoupon}>
                  Aplicar
                </button>
              </div>
            )}
            {couponError && <p className="error">{couponError}</p>}
          </div>

          <div className="section-footer">
            <div>
              {cartDiscount > 0 && (
                <p className="muted">
                  Desconto: -{formatCurrency(cartDiscount)}
                </p>
              )}
              <strong>Total: {formatCurrency(cartTotal)}</strong>
            </div>
          </div>
        </div>

        {/* Checkout */}
        <div className="panel">
          <h3>Checkout</h3>
          <form className="form" onSubmit={handleCheckout}>
            <label>
              Nome completo
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <div className="grid two">
              <label>
                Telefone / WhatsApp
                <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </label>
              <label>
                CPF (opcional)
                <input value={cpf} onChange={(e) => setCpf(e.target.value)} />
              </label>
            </div>

            <div className="row">
              <label className="radio">
                <input
                  type="radio"
                  checked={delivery === 'Entrega'}
                  onChange={() => setDelivery('Entrega')}
                />
                Entrega
              </label>
              <label className="radio">
                <input
                  type="radio"
                  checked={delivery === 'Retirada'}
                  onChange={() => setDelivery('Retirada')}
                />
                Retirada
              </label>
            </div>

            {delivery === 'Entrega' ? (
              <div className="grid two">
                <label>
                  CEP
                  <input
                    value={address.cep || ''}
                    onChange={(e) => setAddress((a) => ({ ...a, cep: e.target.value }))}
                  />
                </label>
                <label>
                  Rua
                  <input
                    value={address.street || ''}
                    onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                    required
                  />
                </label>
                <label>
                  Número
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
                    required
                  />
                </label>
                <label>
                  Cidade
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
                    required
                  />
                </label>
              </div>
            ) : (
              <div>
                <label>
                  Ponto de retirada
                  <select value={pickupPoint} onChange={(e) => setPickupPoint(e.target.value)}>
                    {pickupPoints.filter((p) => p.active).map((point) => (
                      <option key={point.id} value={point.id}>
                        {point.name} - {point.address}
                      </option>
                    ))}
                  </select>
                </label>
                {pickupPoints.find((p) => p.id === pickupPoint) && (
                  <p className="muted">
                    Horário: {pickupPoints.find((p) => p.id === pickupPoint)?.schedule}
                  </p>
                )}
              </div>
            )}

            <button className="primary" type="submit" disabled={!cartWithProduct.length}>
              Finalizar pedido
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
