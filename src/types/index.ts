export type Banner = {
  id: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaLink: string
  image: string
  type?: 'carousel' | 'strip' | 'footer'
  priority?: number
  startDate?: string
  endDate?: string
  active?: boolean
}

export type EventInfo = {
  name: string
  date: string
  targetDate: string
  location: string
  status: 'preparacao' | 'inscricoes-abertas' | 'encerrado'
  statusLabel: string
  description?: string
}

export type Album = {
  id: string
  year: number
  title: string
  cover: string
  photos: string[]
  category?: string
  published?: boolean
}

export type ProductCategory = 'Abadás' | 'Camisetas' | 'Acessórios' | 'Acessórios Pet' | 'Fantasias' | 'Kits' | 'Rastreadores'

export type Product = {
  id: string
  name: string
  price: number
  promoPrice?: number
  category: ProductCategory
  badge?: string
  description: string
  sizes?: string[]
  petSizes?: string[]
  colors?: string[]
  stock?: number
  image: string
  images?: string[]
  published?: boolean
}

export type CartItem = {
  productId: string
  quantity: number
  size?: string
  petSize?: string
  color?: string
}

export type Address = {
  cep?: string
  street?: string
  number?: string
  complement?: string
  district?: string
  city?: string
  state?: string
}

export type OrderStatus = 'pendente' | 'pago' | 'separando' | 'enviado' | 'concluido' | 'cancelado'

export type Order = {
  id: string
  items: CartItem[]
  customerName: string
  email: string
  phone: string
  cpf?: string
  deliveryMethod: 'Entrega' | 'Retirada'
  address?: Address
  pickupPoint?: string
  total: number
  discount?: number
  couponCode?: string
  status: OrderStatus
  notes?: string
  createdAt: string
  updatedAt?: string
}

export type Pet = {
  id?: string
  name: string
  species: 'cão' | 'gato' | 'outro'
  size: 'PP' | 'P' | 'M' | 'G' | 'GG'
  breed?: string
  notes?: string
}

export type InscriptionStatus = 'nova' | 'aprovada' | 'pendente-info' | 'cancelada'

export type Inscription = {
  id: string
  responsible: string
  email: string
  phone: string
  cpf?: string
  deliveryMethod: 'Entrega' | 'Retirada'
  address?: Address
  pickupPoint?: string
  pets: Pet[]
  status: InscriptionStatus
  notes?: string
  createdAt: string
  updatedAt?: string
}

export type ProfessionalCategory = 
  | 'Veterinário'
  | 'Banho e Tosa'
  | 'Pet Shop'
  | 'Adestramento'
  | 'Hotel'
  | 'Transporte'
  | 'Outro'

export type Professional = {
  id: string
  name: string
  responsibleName?: string
  category: ProfessionalCategory | string
  email?: string
  whatsapp: string
  phone?: string
  instagram?: string
  website?: string
  address?: Address
  district?: string
  city?: string
  state?: string
  services?: string
  schedule?: string
  benefits?: string
  couponCode?: string
  emergency24h?: boolean
  approved: boolean
  featured?: boolean
  createdAt?: string
}

export type SponsorTier = 'master' | 'ouro' | 'prata' | 'bronze' | 'apoiador'

export type Sponsor = {
  id: string
  name: string
  tier: SponsorTier
  logo: string
  website?: string
  description?: string
  benefits?: string[]
  startDate?: string
  endDate?: string
  active: boolean
}

export type ArticleCategory = 'blocao' | 'ong' | 'cuidados' | 'adocao' | 'noticias' | 'evento'

export type Article = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover: string
  category: ArticleCategory
  author?: string
  published: boolean
  publishedAt?: string
  createdAt: string
}

export type DonationFrequency = 'unica' | 'mensal'

export type Donation = {
  id: string
  donorName: string
  email: string
  phone?: string
  amount: number
  frequency: DonationFrequency
  message?: string
  status: 'pendente' | 'confirmada' | 'cancelada'
  createdAt: string
}

export type Coupon = {
  id: string
  code: string
  type: 'percentual' | 'fixo'
  value: number
  minPurchase?: number
  maxUses?: number
  usedCount: number
  validFrom?: string
  validUntil?: string
  active: boolean
}

export type User = {
  id: string
  name: string
  email: string
  phone?: string
  role: 'admin' | 'conteudo' | 'loja' | 'inscricoes' | 'parceiros' | 'cliente'
  pets?: Pet[]
  addresses?: Address[]
  createdAt: string
}

export type PickupPoint = {
  id: string
  name: string
  address: string
  schedule: string
  active: boolean
}

export type SiteSettings = {
  siteName: string
  email: string
  whatsapp: string
  instagram?: string
  facebook?: string
  tiktok?: string
  youtube?: string
  address?: string
  city: string
  state: string
  cnpj?: string
}
