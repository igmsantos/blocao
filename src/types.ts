export type Banner = {
  id: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaLink: string
  image: string
}

export type EventInfo = {
  date: string
  location: string
  status: string
}

export type Album = {
  id: string
  year: number
  title: string
  cover: string
  photos: string[]
}

export type ProductCategory = 'Abadás' | 'Rastreadores' | 'Acessórios'

export type Product = {
  id: string
  name: string
  price: number
  category: ProductCategory
  badge?: string
  description: string
  sizes?: string[]
  colors?: string[]
  image: string
}

export type CartItem = {
  productId: string
  quantity: number
  size?: string
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

export type Order = {
  id: string
  items: CartItem[]
  customerName: string
  email: string
  phone: string
  deliveryMethod: 'Entrega' | 'Retirada'
  address?: Address
  total: number
  status: 'pendente' | 'pago' | 'concluído'
  createdAt: string
}

export type Pet = {
  name: string
  species: string
  size: string
  notes?: string
}

export type Inscription = {
  id: string
  responsible: string
  email: string
  phone: string
  deliveryMethod: 'Entrega' | 'Retirada'
  address?: Address
  pets: Pet[]
  createdAt: string
}

export type Professional = {
  id: string
  name: string
  category: string
  whatsapp: string
  district?: string
  city?: string
  approved: boolean
  services?: string
  benefits?: string
}
