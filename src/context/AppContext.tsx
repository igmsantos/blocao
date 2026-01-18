import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { usePersistentState } from '../hooks'
import {
  initialAlbums,
  initialArticles,
  initialBanners,
  initialCoupons,
  initialEvent,
  initialPickupPoints,
  initialProfessionals,
  initialProducts,
  initialSettings,
  initialSponsors,
} from '../data'
import type {
  Album,
  Article,
  Banner,
  CartItem,
  Coupon,
  Donation,
  EventInfo,
  Inscription,
  Order,
  PickupPoint,
  Product,
  Professional,
  SiteSettings,
  Sponsor,
  Address,
  Pet,
} from '../types'

interface AppContextType {
  // Data
  banners: Banner[]
  eventInfo: EventInfo
  albums: Album[]
  products: Product[]
  professionals: Professional[]
  sponsors: Sponsor[]
  articles: Article[]
  coupons: Coupon[]
  pickupPoints: PickupPoint[]
  settings: SiteSettings
  
  // Cart
  cart: CartItem[]
  cartWithProduct: (CartItem & { product?: Product })[]
  cartTotal: number
  cartDiscount: number
  appliedCoupon: Coupon | null
  
  // Orders & Inscriptions
  orders: Order[]
  inscriptions: Inscription[]
  donations: Donation[]
  
  // Actions - Banners
  addBanner: (banner: Banner) => void
  updateBanner: (id: string, banner: Partial<Banner>) => void
  deleteBanner: (id: string) => void
  
  // Actions - Event
  updateEventInfo: (event: EventInfo) => void
  
  // Actions - Albums
  addAlbum: (album: Album) => void
  updateAlbum: (id: string, album: Partial<Album>) => void
  deleteAlbum: (id: string) => void
  
  // Actions - Products
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  
  // Actions - Cart
  addToCart: (productId: string, options: { size?: string; petSize?: string; color?: string }) => void
  updateCartQuantity: (index: number, qty: number) => void
  removeCartItem: (index: number) => void
  clearCart: () => void
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
  
  // Actions - Orders
  createOrder: (payload: {
    name: string
    email: string
    phone: string
    cpf?: string
    delivery: 'Entrega' | 'Retirada'
    address?: Address
    pickupPoint?: string
  }) => Order | null
  updateOrderStatus: (id: string, status: Order['status']) => void
  
  // Actions - Inscriptions
  createInscription: (payload: {
    responsible: string
    email: string
    phone: string
    cpf?: string
    delivery: 'Entrega' | 'Retirada'
    address?: Address
    pickupPoint?: string
    pets: Pet[]
  }) => Inscription
  updateInscriptionStatus: (id: string, status: Inscription['status']) => void
  
  // Actions - Professionals
  addProfessional: (professional: Professional) => void
  updateProfessional: (id: string, professional: Partial<Professional>) => void
  approveProfessional: (id: string, approved: boolean) => void
  
  // Actions - Sponsors
  addSponsor: (sponsor: Sponsor) => void
  updateSponsor: (id: string, sponsor: Partial<Sponsor>) => void
  deleteSponsor: (id: string) => void
  
  // Actions - Articles
  addArticle: (article: Article) => void
  updateArticle: (id: string, article: Partial<Article>) => void
  deleteArticle: (id: string) => void
  
  // Actions - Donations
  createDonation: (payload: {
    donorName: string
    email: string
    phone?: string
    amount: number
    frequency: 'unica' | 'mensal'
    message?: string
  }) => Donation
  
  // Actions - Coupons
  addCoupon: (coupon: Coupon) => void
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void
  deleteCoupon: (id: string) => void
  
  // Actions - Settings
  updateSettings: (settings: Partial<SiteSettings>) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  // State
  const [banners, setBanners] = usePersistentState<Banner[]>('banners', initialBanners)
  const [eventInfo, setEventInfo] = usePersistentState<EventInfo>('event', initialEvent)
  const [albums, setAlbums] = usePersistentState<Album[]>('albums', initialAlbums)
  const [products, setProducts] = usePersistentState<Product[]>('products', initialProducts)
  const [professionals, setProfessionals] = usePersistentState<Professional[]>('professionals', initialProfessionals)
  const [sponsors, setSponsors] = usePersistentState<Sponsor[]>('sponsors', initialSponsors)
  const [articles, setArticles] = usePersistentState<Article[]>('articles', initialArticles)
  const [coupons, setCoupons] = usePersistentState<Coupon[]>('coupons', initialCoupons)
  const [pickupPoints] = usePersistentState<PickupPoint[]>('pickupPoints', initialPickupPoints)
  const [settings, setSettings] = usePersistentState<SiteSettings>('settings', initialSettings)
  
  const [cart, setCart] = usePersistentState<CartItem[]>('cart', [])
  const [appliedCouponCode, setAppliedCouponCode] = usePersistentState<string | null>('appliedCoupon', null)
  const [orders, setOrders] = usePersistentState<Order[]>('orders', [])
  const [inscriptions, setInscriptions] = usePersistentState<Inscription[]>('inscriptions', [])
  const [donations, setDonations] = usePersistentState<Donation[]>('donations', [])

  // Computed
  const cartWithProduct = useMemo(() => {
    return cart
      .map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }))
      .filter((c) => c.product)
  }, [cart, products])

  const appliedCoupon = useMemo(() => {
    if (!appliedCouponCode) return null
    return coupons.find((c) => c.code === appliedCouponCode && c.active) || null
  }, [appliedCouponCode, coupons])

  const cartSubtotal = useMemo(
    () => cartWithProduct.reduce((sum, item) => {
      const price = item.product?.promoPrice || item.product?.price || 0
      return sum + price * item.quantity
    }, 0),
    [cartWithProduct]
  )

  const cartDiscount = useMemo(() => {
    if (!appliedCoupon) return 0
    if (appliedCoupon.minPurchase && cartSubtotal < appliedCoupon.minPurchase) return 0
    
    if (appliedCoupon.type === 'percentual') {
      return cartSubtotal * (appliedCoupon.value / 100)
    }
    return Math.min(appliedCoupon.value, cartSubtotal)
  }, [appliedCoupon, cartSubtotal])

  const cartTotal = cartSubtotal - cartDiscount

  // Actions - Banners
  const addBanner = (banner: Banner) => {
    setBanners((prev) => [...prev, banner])
  }

  const updateBanner = (id: string, updates: Partial<Banner>) => {
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)))
  }

  const deleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id))
  }

  // Actions - Event
  const updateEventInfo = (event: EventInfo) => {
    setEventInfo(event)
  }

  // Actions - Albums
  const addAlbum = (album: Album) => {
    setAlbums((prev) => [album, ...prev])
  }

  const updateAlbum = (id: string, updates: Partial<Album>) => {
    setAlbums((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)))
  }

  const deleteAlbum = (id: string) => {
    setAlbums((prev) => prev.filter((a) => a.id !== id))
  }

  // Actions - Products
  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product])
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  // Actions - Cart
  const addToCart = (productId: string, options: { size?: string; petSize?: string; color?: string }) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.productId === productId &&
          item.size === options.size &&
          item.petSize === options.petSize &&
          item.color === options.color
      )
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { productId, quantity: 1, ...options }]
    })
  }

  const updateCartQuantity = (index: number, qty: number) => {
    setCart((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: Math.max(1, qty) } : item))
    )
  }

  const removeCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setCart([])
    setAppliedCouponCode(null)
  }

  const applyCoupon = (code: string): boolean => {
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase() && c.active
    )
    if (!coupon) return false
    if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) return false
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) return false
    
    setAppliedCouponCode(coupon.code)
    return true
  }

  const removeCoupon = () => {
    setAppliedCouponCode(null)
  }

  // Actions - Orders
  const createOrder = (payload: {
    name: string
    email: string
    phone: string
    cpf?: string
    delivery: 'Entrega' | 'Retirada'
    address?: Address
    pickupPoint?: string
  }): Order | null => {
    if (!cartWithProduct.length) return null

    const order: Order = {
      id: `PED-${Date.now()}`,
      items: cart,
      customerName: payload.name,
      email: payload.email,
      phone: payload.phone,
      cpf: payload.cpf,
      deliveryMethod: payload.delivery,
      address: payload.address,
      pickupPoint: payload.pickupPoint,
      total: cartTotal,
      discount: cartDiscount,
      couponCode: appliedCoupon?.code,
      status: 'pendente',
      createdAt: new Date().toISOString(),
    }

    // Update coupon usage
    if (appliedCoupon) {
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === appliedCoupon.id ? { ...c, usedCount: c.usedCount + 1 } : c
        )
      )
    }

    setOrders((prev) => [order, ...prev])
    clearCart()
    return order
  }

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o))
    )
  }

  // Actions - Inscriptions
  const createInscription = (payload: {
    responsible: string
    email: string
    phone: string
    cpf?: string
    delivery: 'Entrega' | 'Retirada'
    address?: Address
    pickupPoint?: string
    pets: Pet[]
  }): Inscription => {
    const inscription: Inscription = {
      id: `BLO-${Date.now()}`,
      responsible: payload.responsible,
      email: payload.email,
      phone: payload.phone,
      cpf: payload.cpf,
      deliveryMethod: payload.delivery,
      address: payload.address,
      pickupPoint: payload.pickupPoint,
      pets: payload.pets,
      status: 'nova',
      createdAt: new Date().toISOString(),
    }

    setInscriptions((prev) => [inscription, ...prev])
    return inscription
  }

  const updateInscriptionStatus = (id: string, status: Inscription['status']) => {
    setInscriptions((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i
      )
    )
  }

  // Actions - Professionals
  const addProfessional = (professional: Professional) => {
    setProfessionals((prev) => [...prev, professional])
  }

  const updateProfessional = (id: string, updates: Partial<Professional>) => {
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const approveProfessional = (id: string, approved: boolean) => {
    setProfessionals((prev) => prev.map((p) => (p.id === id ? { ...p, approved } : p)))
  }

  // Actions - Sponsors
  const addSponsor = (sponsor: Sponsor) => {
    setSponsors((prev) => [...prev, sponsor])
  }

  const updateSponsor = (id: string, updates: Partial<Sponsor>) => {
    setSponsors((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  const deleteSponsor = (id: string) => {
    setSponsors((prev) => prev.filter((s) => s.id !== id))
  }

  // Actions - Articles
  const addArticle = (article: Article) => {
    setArticles((prev) => [article, ...prev])
  }

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)))
  }

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id))
  }

  // Actions - Donations
  const createDonation = (payload: {
    donorName: string
    email: string
    phone?: string
    amount: number
    frequency: 'unica' | 'mensal'
    message?: string
  }): Donation => {
    const donation: Donation = {
      id: `DOA-${Date.now()}`,
      donorName: payload.donorName,
      email: payload.email,
      phone: payload.phone,
      amount: payload.amount,
      frequency: payload.frequency,
      message: payload.message,
      status: 'pendente',
      createdAt: new Date().toISOString(),
    }

    setDonations((prev) => [donation, ...prev])
    return donation
  }

  // Actions - Coupons
  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon])
  }

  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id))
  }

  // Actions - Settings
  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }

  const value: AppContextType = {
    // Data
    banners,
    eventInfo,
    albums,
    products,
    professionals,
    sponsors,
    articles,
    coupons,
    pickupPoints,
    settings,
    
    // Cart
    cart,
    cartWithProduct,
    cartTotal,
    cartDiscount,
    appliedCoupon,
    
    // Orders & Inscriptions
    orders,
    inscriptions,
    donations,
    
    // Actions
    addBanner,
    updateBanner,
    deleteBanner,
    updateEventInfo,
    addAlbum,
    updateAlbum,
    deleteAlbum,
    addProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    updateCartQuantity,
    removeCartItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    createOrder,
    updateOrderStatus,
    createInscription,
    updateInscriptionStatus,
    addProfessional,
    updateProfessional,
    approveProfessional,
    addSponsor,
    updateSponsor,
    deleteSponsor,
    addArticle,
    updateArticle,
    deleteArticle,
    createDonation,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    updateSettings,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
