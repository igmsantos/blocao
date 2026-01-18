import { useState } from 'react'
import type { Product } from '../../types'
import { formatCurrency } from '../../utils'

interface ProductCardProps {
  product: Product
  onAdd: (options: { size?: string; petSize?: string; color?: string }) => void
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const [size, setSize] = useState(product.sizes?.[0])
  const [petSize, setPetSize] = useState(product.petSizes?.[0])
  const [color, setColor] = useState(product.colors?.[0])

  const currentPrice = product.promoPrice || product.price
  const hasPromo = product.promoPrice && product.promoPrice < product.price

  return (
    <div className="card">
      <div
        className="card-cover"
        style={{ backgroundImage: `url(${product.image})` }}
      />
      <div className="card-body">
        <div className="card-header">
          <div>
            <p className="eyebrow">{product.category}</p>
            <h3>{product.name}</h3>
          </div>
          {product.badge && <span className="badge">{product.badge}</span>}
        </div>
        <p className="muted">{product.description}</p>
        <div className="options">
          {product.sizes && (
            <label>
              Tamanho
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                {product.sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          )}
          {product.petSizes && (
            <label>
              Tamanho Pet
              <select value={petSize} onChange={(e) => setPetSize(e.target.value)}>
                {product.petSizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          )}
          {product.colors && (
            <label>
              Cor
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                {product.colors.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          )}
        </div>
        <div className="card-footer">
          <div>
            {hasPromo && (
              <span className="muted" style={{ textDecoration: 'line-through', marginRight: '0.5rem' }}>
                {formatCurrency(product.price)}
              </span>
            )}
            <strong>{formatCurrency(currentPrice)}</strong>
          </div>
          <button className="primary" onClick={() => onAdd({ size, petSize, color })}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}
