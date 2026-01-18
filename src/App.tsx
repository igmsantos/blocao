import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import {
  initialAlbums,
  initialBanners,
  initialEvent,
  initialProfessionals,
  initialProducts,
} from './mockData'
import type {
  Album,
  Address,
  Banner,
  CartItem,
  EventInfo,
  Inscription,
  Order,
  Pet,
  Product,
  Professional,
} from './types'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/galeria', label: 'Galeria' },
  { to: '/loja', label: 'Loja' },
  { to: '/inscricao', label: 'Inscrição' },
  { to: '/profissionais', label: 'Profissionais' },
  { to: '/admin', label: 'Admin' },
]

function usePersistentState<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const saved = localStorage.getItem(key)
    return saved ? (JSON.parse(saved) as T) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function csvFromObjects(rows: Record<string, string | number | undefined>[]) {
  if (!rows.length) return ''
  const headers = Object.keys(rows[0])
  const body = rows
    .map((row) => headers.map((key) => `"${(row[key] ?? '').toString().replaceAll('"', '""')}"`).join(','))
    .join('\n')
  return `${headers.join(',')}\n${body}`
}

function downloadCsv(name: string, rows: Record<string, string | number | undefined>[]) {
  const csv = csvFromObjects(rows)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${name}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

type LayoutProps = {
  cartCount: number
  children: ReactNode
}

function Layout({ cartCount, children }: LayoutProps) {
  return (
    <div className="page">
      <header className="topbar">
        <Link className="logo" to="/">
          BloCÃO
        </Link>
        <nav>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active nav' : 'nav')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/loja" className="pill">
          🛒 Carrinho ({cartCount})
        </Link>
      </header>
      <main className="content">{children}</main>
      <footer className="footer">
        <div>
          <h4>BloCÃO</h4>
          <p>Desfile pet solidário. Transparência e cuidado o ano todo.</p>
        </div>
        <div>
          <h4>Contato</h4>
          <p>WhatsApp: <a href="https://wa.me/5571999999999">(71) 99999-9999</a></p>
          <p>Email: contato@blocao.com</p>
        </div>
        <div>
          <h4>Links</h4>
          <p>
            <Link to="/sobre">Sobre</Link>
          </p>
          <p>
            <Link to="/patrocinadores">Patrocinadores</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}

type ProductCardProps = {
  product: Product
  onAdd: (payload: { size?: string; color?: string }) => void
}

function ProductCard({ product, onAdd }: ProductCardProps) {
  const [size, setSize] = useState(product.sizes?.[0])
  const [color, setColor] = useState(product.colors?.[0])

  return (
    <div className="card">
      <div className="card-cover" style={{ backgroundImage: `url(${product.image})` }} />
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
          <strong>{formatCurrency(product.price)}</strong>
          <button className="primary" onClick={() => onAdd({ size, color })}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}

type AlbumGridProps = {
  albums: Album[]
  onAdd: (album: Album) => void
}

function AlbumGrid({ albums, onAdd }: AlbumGridProps) {
  const [form, setForm] = useState({ year: new Date().getFullYear(), title: '', cover: '', photos: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const album: Album = {
      id: `alb-${Date.now()}`,
      year: Number(form.year),
      title: form.title || `Álbum ${form.year}`,
      cover:
        form.cover ||
        'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1200&q=80',
      photos: form.photos
        .split('\n')
        .map((p) => p.trim())
        .filter(Boolean),
    }
    onAdd(album)
    setForm({ year: new Date().getFullYear(), title: '', cover: '', photos: '' })
  }

  return (
    <div className="grid two">
      <div className="stack gap">
        <h2>Álbuns</h2>
        <div className="gallery-grid">
          {albums.map((album) => (
            <div key={album.id} className="card">
              <div className="card-cover" style={{ backgroundImage: `url(${album.cover})` }} />
              <div className="card-body">
                <p className="eyebrow">{album.year}</p>
                <h3>{album.title}</h3>
                <p className="muted">{album.photos.length} fotos</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="panel">
        <h3>Novo álbum</h3>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Ano
            <input
              type="number"
              value={form.year}
              onChange={(e) => setForm((f) => ({ ...f, year: Number(e.target.value) }))}
              required
            />
          </label>
          <label>
            Título
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </label>
          <label>
            Capa (URL)
            <input value={form.cover} onChange={(e) => setForm((f) => ({ ...f, cover: e.target.value }))} />
          </label>
          <label>
            Fotos (uma URL por linha)
            <textarea
              value={form.photos}
              onChange={(e) => setForm((f) => ({ ...f, photos: e.target.value }))}
              rows={6}
            />
          </label>
          <button type="submit" className="primary">
            Criar álbum
          </button>
        </form>
      </div>
    </div>
  )
}

type CheckoutFormProps = {
  disabled: boolean
  total: number
  onSubmit: (payload: {
    name: string
    email: string
    phone: string
    delivery: 'Entrega' | 'Retirada'
    address: Address
  }) => void
}

function CheckoutForm({ disabled, total, onSubmit }: CheckoutFormProps) {
  const [delivery, setDelivery] = useState<'Entrega' | 'Retirada'>('Entrega')
  const [address, setAddress] = useState<Address>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, email, phone, delivery, address })
    setName('')
    setEmail('')
    setPhone('')
    setAddress({})
  }

  return (
    <div className="panel">
      <h3>Checkout</h3>
      <p className="muted">Total: {formatCurrency(total)}</p>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nome completo
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>
        <label>
          Telefone / WhatsApp
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <div className="row">
          <label className="radio">
            <input type="radio" checked={delivery === 'Entrega'} onChange={() => setDelivery('Entrega')} /> Entrega
          </label>
          <label className="radio">
            <input type="radio" checked={delivery === 'Retirada'} onChange={() => setDelivery('Retirada')} /> Retirada
          </label>
        </div>
        {delivery === 'Entrega' ? (
          <div className="grid two">
            <label>
              CEP
              <input value={address.cep || ''} onChange={(e) => setAddress((a) => ({ ...a, cep: e.target.value }))} />
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
          <p className="muted">Retirada no ponto oficial: Praça Central, Salvador/BA</p>
        )}
        <button className="primary" type="submit" disabled={disabled}>
          Finalizar pedido
        </button>
      </form>
    </div>
  )
}

function App() {
  const [banners, setBanners] = usePersistentState<Banner[]>('banners', initialBanners)
  const [eventInfo, setEventInfo] = usePersistentState<EventInfo>('event', initialEvent)
  const [albums, setAlbums] = usePersistentState<Album[]>('albums', initialAlbums)
  const [products] = usePersistentState<Product[]>('products', initialProducts)
  const [cart, setCart] = usePersistentState<CartItem[]>('cart', [])
  const [orders, setOrders] = usePersistentState<Order[]>('orders', [])
  const [inscriptions, setInscriptions] = usePersistentState<Inscription[]>('inscriptions', [])
  const [professionals, setProfessionals] = usePersistentState<Professional[]>(
    'professionals',
    initialProfessionals,
  )

  const cartWithProduct = useMemo(() => {
    return cart
      .map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }))
      .filter((c) => c.product)
  }, [cart, products])

  const cartTotal = useMemo(
    () => cartWithProduct.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0),
    [cartWithProduct],
  )

  const addToCart = (productId: string, payload: { size?: string; color?: string }) => {
    setCart((prev: CartItem[]) => {
      const existing = prev.find(
        (item) =>
          item.productId === productId &&
          (payload.size ? item.size === payload.size : true) &&
          (payload.color ? item.color === payload.color : true),
      )
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { productId, quantity: 1, ...payload }]
    })
  }

  const updateCartQuantity = (index: number, qty: number) => {
    setCart((prev: CartItem[]) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: Math.max(1, qty) } : item)),
    )
  }

  const removeCartItem = (index: number) => {
    setCart((prev: CartItem[]) => prev.filter((_, i) => i !== index))
  }

  const handleCheckout = (payload: {
    name: string
    email: string
    phone: string
    delivery: 'Entrega' | 'Retirada'
    address: Address
  }) => {
    if (!cartWithProduct.length) return
    const order: Order = {
      id: `PED-${Date.now()}`,
      items: cart,
      customerName: payload.name,
      email: payload.email,
      phone: payload.phone,
      deliveryMethod: payload.delivery,
      address: payload.address,
      total: cartTotal,
      status: 'pendente',
      createdAt: new Date().toISOString(),
    }
  setOrders((prev: Order[]) => [order, ...prev])
    setCart([])
    alert(`Pedido gerado! Enviamos confirmação por WhatsApp/email. ID: ${order.id}`)
  }

  const handleInscription = (payload: {
    responsible: string
    email: string
    phone: string
    delivery: 'Entrega' | 'Retirada'
    address: Address
    pets: Pet[]
  }) => {
    const inscription: Inscription = {
      id: `BLO-${Date.now()}`,
      responsible: payload.responsible,
      email: payload.email,
      phone: payload.phone,
      deliveryMethod: payload.delivery,
      address: payload.address,
      pets: payload.pets,
      createdAt: new Date().toISOString(),
    }
  setInscriptions((prev: Inscription[]) => [inscription, ...prev])
    alert(`Inscrição recebida! Protocolo: ${inscription.id}`)
  }

  const approvedProfessionals = professionals.filter((p) => p.approved)

  return (
    <Layout cartCount={cart.length}>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              banners={banners}
              eventInfo={eventInfo}
              albums={albums}
              products={products}
              professionals={approvedProfessionals}
              onAddBanner={(banner) => setBanners((prev: Banner[]) => [...prev, banner])}
            />
          }
        />
        <Route
          path="/galeria"
          element={<GalleryPage albums={albums} onAddAlbum={(album) => setAlbums((prev: Album[]) => [album, ...prev])} />}
        />
        <Route
          path="/loja"
          element={
            <StorePage
              products={products}
              cart={cartWithProduct}
              onAddToCart={addToCart}
              onUpdateQty={updateCartQuantity}
              onRemoveItem={removeCartItem}
              onCheckout={handleCheckout}
              total={cartTotal}
            />
          }
        />
        <Route path="/inscricao" element={<InscriptionPage onSubmit={handleInscription} />} />
        <Route
          path="/profissionais"
          element={
            <ProfessionalsPage
              approved={approvedProfessionals}
              onSubmit={(professional) => setProfessionals((prev: Professional[]) => [professional, ...prev])}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <AdminPage
              banners={banners}
              eventInfo={eventInfo}
              albums={albums}
              orders={orders}
              inscriptions={inscriptions}
              professionals={professionals}
              onUpdateEvent={setEventInfo}
              onAddBanner={(banner) => setBanners((prev: Banner[]) => [...prev, banner])}
              onAddAlbum={(album) => setAlbums((prev: Album[]) => [album, ...prev])}
              onApproveProfessional={(id, approved) =>
                setProfessionals((prev: Professional[]) => prev.map((p) => (p.id === id ? { ...p, approved } : p)))
              }
              onExportOrders={() =>
                downloadCsv('pedidos',
                  orders.map((o) => ({
                    id: o.id,
                    cliente: o.customerName,
                    email: o.email,
                    telefone: o.phone,
                    entrega: o.deliveryMethod,
                    total: o.total,
                    status: o.status,
                    criadoEm: o.createdAt,
                  })),
                )
              }
              onExportInscriptions={() =>
                downloadCsv('inscricoes',
                  inscriptions.map((i) => ({
                    id: i.id,
                    responsavel: i.responsible,
                    email: i.email,
                    telefone: i.phone,
                    entrega: i.deliveryMethod,
                    pets: i.pets.map((p) => `${p.name}(${p.size})`).join(' | '),
                    criadoEm: i.createdAt,
                  })),
                )
              }
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

function HomePage({
  banners,
  eventInfo,
  albums,
  products,
  professionals,
  onAddBanner,
}: {
  banners: Banner[]
  eventInfo: EventInfo
  albums: Album[]
  products: Product[]
  professionals: Professional[]
  onAddBanner: (banner: Banner) => void
}) {
  const [bannerForm, setBannerForm] = useState({ title: '', subtitle: '', ctaLabel: '', ctaLink: '', image: '' })

  const handleBanner = (e: React.FormEvent) => {
    e.preventDefault()
    const banner: Banner = {
      id: `banner-${Date.now()}`,
      title: bannerForm.title,
      subtitle: bannerForm.subtitle,
      ctaLabel: bannerForm.ctaLabel || 'Saiba mais',
      ctaLink: bannerForm.ctaLink || '/',
      image:
        bannerForm.image ||
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    }
    onAddBanner(banner)
    setBannerForm({ title: '', subtitle: '', ctaLabel: '', ctaLink: '', image: '' })
  }

  return (
    <div className="stack gap-lg">
      <section className="hero" style={{ backgroundImage: `url(${banners[0]?.image})` }}>
        <div className="hero-content">
          <p className="eyebrow">BloCÃO 2026</p>
          <h1>{banners[0]?.title || 'Carnaval pet solidário'}</h1>
          <p className="muted">{banners[0]?.subtitle || 'Inscreva-se, compre o abadá e apoie a causa.'}</p>
          <div className="row">
            <Link className="primary" to={banners[0]?.ctaLink || '/loja'}>
              {banners[0]?.ctaLabel || 'Quero participar'}
            </Link>
            <Link className="ghost" to="/inscricao">
              Inscrever meu pet
            </Link>
          </div>
        </div>
      </section>

      <section className="grid three">
        <HighlightCard title="Próximo BloCÃO" description={`${eventInfo.date} · ${eventInfo.location}`} badge={eventInfo.status} />
        <HighlightCard title="Loja aberta" description="Abadás e rastreadores com entrega ou retirada." badge="E-commerce" />
        <HighlightCard title="Comunidade pet" description="Profissionais parceiros o ano todo." badge="Diretório" />
      </section>

      <section className="grid two">
        <div className="panel">
          <h2>Patrocinadores & destaques</h2>
          <div className="banner-grid">
            {banners.map((banner) => (
              <div key={banner.id} className="mini-card" style={{ backgroundImage: `url(${banner.image})` }}>
                <div>
                  <p className="eyebrow">Chamada</p>
                  <strong>{banner.title}</strong>
                  <p className="muted">{banner.subtitle}</p>
                  <Link className="ghost" to={banner.ctaLink}>
                    {banner.ctaLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <h3>Adicionar chamada rápida</h3>
          <form className="form" onSubmit={handleBanner}>
            <label>
              Título
              <input
                value={bannerForm.title}
                onChange={(e) => setBannerForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
            </label>
            <label>
              Subtítulo
              <input value={bannerForm.subtitle} onChange={(e) => setBannerForm((f) => ({ ...f, subtitle: e.target.value }))} />
            </label>
            <label>
              Rótulo do CTA
              <input value={bannerForm.ctaLabel} onChange={(e) => setBannerForm((f) => ({ ...f, ctaLabel: e.target.value }))} />
            </label>
            <label>
              Link do CTA
              <input value={bannerForm.ctaLink} onChange={(e) => setBannerForm((f) => ({ ...f, ctaLink: e.target.value }))} />
            </label>
            <label>
              Imagem (URL)
              <input value={bannerForm.image} onChange={(e) => setBannerForm((f) => ({ ...f, image: e.target.value }))} />
            </label>
            <button className="primary" type="submit">
              Salvar
            </button>
          </form>
        </div>
      </section>

      <section className="grid two">
        <div className="panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Galeria</p>
              <h2>Destaques dos últimos anos</h2>
            </div>
            <Link className="ghost" to="/galeria">
              Ver tudo
            </Link>
          </div>
          <div className="gallery-strip">
            {albums.map((album) => (
              <div key={album.id} className="thumb" style={{ backgroundImage: `url(${album.cover})` }}>
                <div className="thumb-overlay">
                  <strong>{album.title}</strong>
                  <span>{album.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Loja</p>
              <h2>Produtos do MVP</h2>
            </div>
            <Link className="ghost" to="/loja">
              Abrir loja
            </Link>
          </div>
          <div className="list">
            {products.map((p) => (
              <div key={p.id} className="row between">
                <div>
                  <strong>{p.name}</strong>
                  <p className="muted">{p.category}</p>
                </div>
                <span>{formatCurrency(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Profissionais</p>
            <h2>Parceiros aprovados</h2>
          </div>
          <Link className="ghost" to="/profissionais">
            Ver catálogo
          </Link>
        </div>
        <div className="professionals">
          {professionals.map((pro) => (
            <div key={pro.id} className="chip">
              <strong>{pro.name}</strong>
              <span>{pro.category}</span>
              <span>{pro.city}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function GalleryPage({ albums, onAddAlbum }: { albums: Album[]; onAddAlbum: (album: Album) => void }) {
  return (
    <div className="stack gap-lg">
      <header className="page-header">
        <div>
          <p className="eyebrow">Galeria</p>
          <h1>Momentos do BloCÃO</h1>
          <p className="muted">Organize fotos por ano e mantenha o histórico vivo.</p>
        </div>
      </header>
      <AlbumGrid albums={albums} onAdd={onAddAlbum} />
    </div>
  )
}

function StorePage({
  products,
  cart,
  onAddToCart,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  total,
}: {
  products: Product[]
  cart: (CartItem & { product?: Product })[]
  onAddToCart: (productId: string, payload: { size?: string; color?: string }) => void
  onUpdateQty: (index: number, qty: number) => void
  onRemoveItem: (index: number) => void
  onCheckout: (payload: {
    name: string
    email: string
    phone: string
    delivery: 'Entrega' | 'Retirada'
    address: Address
  }) => void
  total: number
}) {
  const [category, setCategory] = useState<string>('todos')

  const filtered = category === 'todos' ? products : products.filter((p) => p.category === category)

  return (
    <div className="stack gap-lg">
      <header className="page-header">
        <div>
          <p className="eyebrow">Loja</p>
          <h1>Abadás e rastreadores</h1>
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
          <ProductCard key={product.id} product={product} onAdd={(payload) => onAddToCart(product.id, payload)} />
        ))}
      </div>

      <div className="grid two">
        <div className="panel">
          <div className="section-header">
            <h3>🛒 Carrinho</h3>
            <span className="muted">{cart.length} itens</span>
          </div>
          {!cart.length && <p className="muted">Adicione produtos para finalizar.</p>}
          <div className="list">
            {cart.map((item, index) => (
              <div key={`${item.productId}-${index}`} className="cart-row">
                <div>
                  <strong>{item.product?.name}</strong>
                  <p className="muted">
                    {item.size && `Tam ${item.size} · `}
                    {item.color && `${item.color} · `}
                    {formatCurrency(item.product?.price || 0)}
                  </p>
                </div>
                <div className="row">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => onUpdateQty(index, Number(e.target.value))}
                  />
                  <button className="ghost" onClick={() => onRemoveItem(index)}>
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="section-footer">
            <strong>Total: {formatCurrency(total)}</strong>
          </div>
        </div>
        <CheckoutForm disabled={!cart.length} total={total} onSubmit={onCheckout} />
      </div>
    </div>
  )
}

function InscriptionPage({ onSubmit }: { onSubmit: (payload: {
  responsible: string
  email: string
  phone: string
  delivery: 'Entrega' | 'Retirada'
  address: Address
  pets: Pet[]
}) => void }) {
  const [responsible, setResponsible] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [delivery, setDelivery] = useState<'Entrega' | 'Retirada'>('Entrega')
  const [address, setAddress] = useState<Address>({})
  const [pets, setPets] = useState<Pet[]>([{ name: '', species: 'cão', size: 'M', notes: '' }])

  const handlePetChange = (index: number, field: keyof Pet, value: string) => {
    setPets((prev) => prev.map((pet, i) => (i === index ? { ...pet, [field]: value } : pet)))
  }

  const addPet = () => setPets((prev) => [...prev, { name: '', species: 'cão', size: 'M', notes: '' }])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ responsible, email, phone, delivery, address, pets })
    setResponsible('')
    setEmail('')
    setPhone('')
    setAddress({})
    setPets([{ name: '', species: 'cão', size: 'M', notes: '' }])
  }

  return (
    <div className="stack gap-lg">
      <header className="page-header">
        <div>
          <p className="eyebrow">Inscrição</p>
          <h1>Cadastre o responsável e os pets</h1>
          <p className="muted">Receba o protocolo por email/WhatsApp e escolha entrega ou retirada.</p>
        </div>
      </header>
      <form className="panel form" onSubmit={submit}>
        <div className="grid two">
          <label>
            Nome do responsável
            <input value={responsible} onChange={(e) => setResponsible(e.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Telefone / WhatsApp
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
        </div>

        <div className="row">
          <label className="radio">
            <input type="radio" checked={delivery === 'Entrega'} onChange={() => setDelivery('Entrega')} /> Entrega
          </label>
          <label className="radio">
            <input type="radio" checked={delivery === 'Retirada'} onChange={() => setDelivery('Retirada')} /> Retirada
          </label>
        </div>
        {delivery === 'Entrega' && (
          <div className="grid three">
            <label>
              CEP
              <input value={address.cep || ''} onChange={(e) => setAddress((a) => ({ ...a, cep: e.target.value }))} />
            </label>
            <label>
              Rua
              <input value={address.street || ''} onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))} />
            </label>
            <label>
              Número
              <input value={address.number || ''} onChange={(e) => setAddress((a) => ({ ...a, number: e.target.value }))} />
            </label>
            <label>
              Bairro
              <input value={address.district || ''} onChange={(e) => setAddress((a) => ({ ...a, district: e.target.value }))} />
            </label>
            <label>
              Cidade
              <input value={address.city || ''} onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))} />
            </label>
            <label>
              UF
              <input value={address.state || ''} onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value }))} />
            </label>
          </div>
        )}

        <div className="stack gap">
          <div className="section-header">
            <h3>Pets</h3>
            <button type="button" className="ghost" onClick={addPet}>
              + Adicionar pet
            </button>
          </div>
          {pets.map((pet, index) => (
            <div key={index} className="grid three pet-card">
              <label>
                Nome
                <input value={pet.name} onChange={(e) => handlePetChange(index, 'name', e.target.value)} required />
              </label>
              <label>
                Espécie
                <select value={pet.species} onChange={(e) => handlePetChange(index, 'species', e.target.value)}>
                  <option value="cão">Cão</option>
                  <option value="gato">Gato</option>
                  <option value="outro">Outro</option>
                </select>
              </label>
              <label>
                Tamanho do abadá
                <select value={pet.size} onChange={(e) => handlePetChange(index, 'size', e.target.value)}>
                  <option value="PP">PP</option>
                  <option value="P">P</option>
                  <option value="M">M</option>
                  <option value="G">G</option>
                </select>
              </label>
              <label className="full">
                Observações
                <input value={pet.notes} onChange={(e) => handlePetChange(index, 'notes', e.target.value)} />
              </label>
            </div>
          ))}
        </div>
        <button className="primary" type="submit">
          Gerar protocolo
        </button>
      </form>
    </div>
  )
}

function ProfessionalsPage({
  approved,
  onSubmit,
}: {
  approved: Professional[]
  onSubmit: (professional: Professional) => void
}) {
  const [form, setForm] = useState({ name: '', category: 'Veterinário', whatsapp: '', city: '', district: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const professional: Professional = {
      id: `pro-${Date.now()}`,
      name: form.name,
      category: form.category,
      whatsapp: form.whatsapp,
      city: form.city,
      district: form.district,
      approved: false,
    }
    onSubmit(professional)
    setForm({ name: '', category: 'Veterinário', whatsapp: '', city: '', district: '' })
    alert('Cadastro enviado para aprovação do admin')
  }

  return (
    <div className="stack gap-lg">
      <header className="page-header">
        <div>
          <p className="eyebrow">Profissionais</p>
          <h1>Diretório da comunidade pet</h1>
          <p className="muted">Busque veterinários, lojas e parceiros com benefícios para foliões.</p>
        </div>
      </header>
      <div className="grid two">
        <div className="panel">
          <h3>Aprovados</h3>
          <div className="list">
            {approved.map((pro) => (
              <div key={pro.id} className="row between">
                <div>
                  <strong>{pro.name}</strong>
                  <p className="muted">{pro.category}</p>
                  <p className="muted">{pro.city}</p>
                </div>
                <a className="pill" href={`https://wa.me/${pro.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
                  Falar no WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <h3>Quero me cadastrar</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Nome / Estabelecimento
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
            </label>
            <label>
              Categoria
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                <option>Veterinário</option>
                <option>Banho e Tosa</option>
                <option>Pet Shop</option>
                <option>Acessórios</option>
              </select>
            </label>
            <label>
              WhatsApp
              <input value={form.whatsapp} onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))} required />
            </label>
            <div className="grid two">
              <label>
                Bairro
                <input value={form.district} onChange={(e) => setForm((f) => ({ ...f, district: e.target.value }))} />
              </label>
              <label>
                Cidade
                <input value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
              </label>
            </div>
            <button className="primary" type="submit">
              Enviar para aprovação
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function AdminPage({
  banners,
  eventInfo,
  albums,
  orders,
  inscriptions,
  professionals,
  onUpdateEvent,
  onAddBanner,
  onAddAlbum,
  onApproveProfessional,
  onExportOrders,
  onExportInscriptions,
}: {
  banners: Banner[]
  eventInfo: EventInfo
  albums: Album[]
  orders: Order[]
  inscriptions: Inscription[]
  professionals: Professional[]
  onUpdateEvent: (event: EventInfo) => void
  onAddBanner: (banner: Banner) => void
  onAddAlbum: (album: Album) => void
  onApproveProfessional: (id: string, approved: boolean) => void
  onExportOrders: () => void
  onExportInscriptions: () => void
}) {
  const [eventForm, setEventForm] = useState(eventInfo)
  const [albumForm, setAlbumForm] = useState({ year: new Date().getFullYear(), title: '', cover: '', photos: '' })

  const submitEvent = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateEvent(eventForm)
  }

  const submitAlbum = (e: React.FormEvent) => {
    e.preventDefault()
    const album: Album = {
      id: `alb-${Date.now()}`,
      year: Number(albumForm.year),
      title: albumForm.title,
      cover: albumForm.cover,
      photos: albumForm.photos.split('\n').map((p) => p.trim()).filter(Boolean),
    }
    onAddAlbum(album)
    setAlbumForm({ year: new Date().getFullYear(), title: '', cover: '', photos: '' })
  }

  const pendingProfessionals = professionals.filter((p) => !p.approved)

  return (
    <div className="stack gap-lg">
      <header className="page-header">
        <div>
          <p className="eyebrow">Painel</p>
          <h1>Administração do MVP</h1>
          <p className="muted">Gerencie banners, galeria, inscrições, pedidos e profissionais.</p>
        </div>
      </header>

      <section className="grid two">
        <div className="panel">
          <h3>Evento e hero</h3>
          <p className="muted">Banners publicados: {banners.length}</p>
          <form className="form" onSubmit={submitEvent}>
            <label>
              Data
              <input value={eventForm.date} onChange={(e) => setEventForm((f) => ({ ...f, date: e.target.value }))} />
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
              <input value={eventForm.status} onChange={(e) => setEventForm((f) => ({ ...f, status: e.target.value }))} />
            </label>
            <button className="primary" type="submit">
              Salvar
            </button>
          </form>
        </div>
        <div className="panel">
          <h3>Adicionar banner</h3>
          <BannerForm onAdd={onAddBanner} />
        </div>
      </section>

      <section className="grid two">
        <div className="panel">
          <h3>Gerir galeria</h3>
          <p className="muted">Total de álbuns: {albums.length}</p>
          <form className="form" onSubmit={submitAlbum}>
            <label>
              Ano
              <input
                type="number"
                value={albumForm.year}
                onChange={(e) => setAlbumForm((f) => ({ ...f, year: Number(e.target.value) }))}
              />
            </label>
            <label>
              Título
              <input value={albumForm.title} onChange={(e) => setAlbumForm((f) => ({ ...f, title: e.target.value }))} />
            </label>
            <label>
              Capa (URL)
              <input value={albumForm.cover} onChange={(e) => setAlbumForm((f) => ({ ...f, cover: e.target.value }))} />
            </label>
            <label>
              Fotos (URLs, uma por linha)
              <textarea
                value={albumForm.photos}
                onChange={(e) => setAlbumForm((f) => ({ ...f, photos: e.target.value }))}
                rows={4}
              />
            </label>
            <button className="primary" type="submit">
              Criar álbum
            </button>
          </form>
        </div>
        <div className="panel">
          <div className="section-header">
            <h3>Operação</h3>
            <div className="row gap-sm">
              <button className="ghost" onClick={onExportInscriptions}>
                Exportar inscrições CSV
              </button>
              <button className="ghost" onClick={onExportOrders}>
                Exportar pedidos CSV
              </button>
            </div>
          </div>
          <p className="muted">Inscrições: {inscriptions.length} · Pedidos: {orders.length}</p>
          <div className="list">
            {inscriptions.slice(0, 3).map((i) => (
              <div key={i.id} className="row between">
                <div>
                  <strong>{i.responsible}</strong>
                  <p className="muted">{i.pets.length} pet(s)</p>
                </div>
                <span className="pill">{i.id}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="section-header">
          <h3>Profissionais pendentes</h3>
          <span className="muted">{pendingProfessionals.length} aguardando aprovação</span>
        </div>
        {!pendingProfessionals.length && <p className="muted">Nenhum cadastro pendente.</p>}
        <div className="list">
          {pendingProfessionals.map((pro) => (
            <div key={pro.id} className="row between">
              <div>
                <strong>{pro.name}</strong>
                <p className="muted">{pro.category}</p>
              </div>
              <div className="row gap-sm">
                <button className="ghost" onClick={() => onApproveProfessional(pro.id, true)}>
                  Aprovar
                </button>
                <button className="ghost" onClick={() => onApproveProfessional(pro.id, false)}>
                  Reprovar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function BannerForm({ onAdd }: { onAdd: (banner: Banner) => void }) {
  const [form, setForm] = useState({ title: '', subtitle: '', ctaLabel: 'Saiba mais', ctaLink: '/', image: '' })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const banner: Banner = {
      id: `banner-${Date.now()}`,
      ...form,
      image:
        form.image ||
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    }
    onAdd(banner)
    setForm({ title: '', subtitle: '', ctaLabel: 'Saiba mais', ctaLink: '/', image: '' })
  }

  return (
    <form className="form" onSubmit={submit}>
      <label>
        Título
        <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
      </label>
      <label>
        Subtítulo
        <input value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} />
      </label>
      <label>
        CTA label
        <input value={form.ctaLabel} onChange={(e) => setForm((f) => ({ ...f, ctaLabel: e.target.value }))} />
      </label>
      <label>
        CTA link
        <input value={form.ctaLink} onChange={(e) => setForm((f) => ({ ...f, ctaLink: e.target.value }))} />
      </label>
      <label>
        Imagem (URL)
        <input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
      </label>
      <button className="primary" type="submit">
        Adicionar
      </button>
    </form>
  )
}

function HighlightCard({ title, description, badge }: { title: string; description: string; badge?: string }) {
  return (
    <div className="panel">
      <p className="eyebrow">{badge}</p>
      <h3>{title}</h3>
      <p className="muted">{description}</p>
    </div>
  )
}

function NotFound() {
  return (
    <div className="panel">
      <h2>Página não encontrada</h2>
      <p className="muted">O link que você tentou acessar não existe.</p>
      <Link className="primary" to="/">
        Voltar para a Home
      </Link>
    </div>
  )
}

export default App
