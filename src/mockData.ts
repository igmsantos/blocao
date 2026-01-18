import type { Album, Banner, EventInfo, Product, Professional } from './types'

export const initialBanners: Banner[] = [
  {
    id: 'banner-1',
    title: 'BloCÃO 2026 já tem data marcada!',
    subtitle: 'Garanta seu abadá, inscreva seu pet e venha apoiar a ONG.',
    ctaLabel: 'Comprar abadá',
    ctaLink: '/loja',
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'banner-2',
    title: 'Profissionais parceiros da comunidade pet',
    subtitle: 'Encontre veterinários, lojas e parceiros com benefícios para foliões.',
    ctaLabel: 'Ver catálogo',
    ctaLink: '/profissionais',
    image:
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1600&q=80',
  },
]

export const initialEvent: EventInfo = {
  date: '15 de fevereiro de 2026',
  location: 'Praça Central, Salvador - BA',
  status: 'Inscrições e vendas abertas',
}

export const initialAlbums: Album[] = [
  {
    id: 'alb-2026',
    year: 2026,
    title: 'BloCÃO 2026',
    cover:
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80',
    photos: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'alb-2025',
    year: 2025,
    title: 'BloCÃO 2025',
    cover:
      'https://images.unsplash.com/photo-1552058751-34cb5cf055b6?auto=format&fit=crop&w=1200&q=80',
    photos: [
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    ],
  },
]

export const initialProducts: Product[] = [
  {
    id: 'prod-abadá',
    name: 'Abadá BloCÃO 2026',
    price: 89.9,
    category: 'Abadás',
    badge: 'novo',
    description: 'Abadá oficial para humanos e pets. Estampa exclusiva 2026.',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: ['Azul', 'Rosa', 'Amarelo'],
    image:
      'https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'prod-rastreador',
    name: 'Rastreador Pet GPS',
    price: 249.0,
    category: 'Rastreadores',
    badge: 'promo',
    description: 'Rastreador leve com app móvel, bateria de longa duração.',
    colors: ['Preto', 'Vermelho'],
    image:
      'https://images.unsplash.com/photo-1611003228941-98852ba62229?auto=format&fit=crop&w=1200&q=80',
  },
]

export const initialProfessionals: Professional[] = [
  {
    id: 'prof-1',
    name: 'Clínica Vet Central',
    category: 'Veterinário',
    whatsapp: '+55 71 99999-9999',
    district: 'Centro',
    city: 'Salvador',
    approved: true,
    services: 'Consultas, vacinas, emergência 24h',
    benefits: '10% off para inscritos no BloCÃO',
  },
  {
    id: 'prof-2',
    name: 'Pet Shop Alegria',
    category: 'Banho e Tosa',
    whatsapp: '+55 71 98888-8888',
    district: 'Barra',
    city: 'Salvador',
    approved: true,
    services: 'Banho, tosa, acessórios',
    benefits: 'Cupom BLOCAO5',
  },
]
