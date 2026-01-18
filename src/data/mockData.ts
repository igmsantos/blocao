import type { 
  Album, 
  Article, 
  Banner, 
  Coupon, 
  EventInfo, 
  PickupPoint, 
  Product, 
  Professional, 
  SiteSettings, 
  Sponsor 
} from '../types'

export const initialBanners: Banner[] = [
  {
    id: 'banner-1',
    title: 'Blocão 2026 vem aí!',
    subtitle: 'O bloco mais fofinho do Carnaval de Caraguatatuba. Traga seu pet e venha desfilar com a gente!',
    ctaLabel: 'Quero participar',
    ctaLink: '/inscricao',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80',
    type: 'carousel',
    priority: 10,
    active: true,
  },
  {
    id: 'banner-2',
    title: 'Alegria que se passeia na coleira',
    subtitle: 'Tutores e pets celebrando juntos a amizade que transforma qualquer caminhada em festa.',
    ctaLabel: 'Saiba mais',
    ctaLink: '/sobre',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1600&q=80',
    type: 'carousel',
    priority: 5,
    active: true,
  },
  {
    id: 'banner-3',
    title: 'Carnaval bom é aquele que inclui e abraça',
    subtitle: 'Um momento seguro e acolhedor para famílias e amantes de animais curtirem juntos.',
    ctaLabel: 'Conheça o Blocão',
    ctaLink: '/sobre',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1600&q=80',
    type: 'carousel',
    priority: 3,
    active: true,
  },
]

export const initialEvent: EventInfo = {
  name: 'Blocão 2026',
  date: '15 de fevereiro de 2026',
  targetDate: '2026-02-15T15:00:00',
  location: 'Praça Dr. Cândido Mota, Centro - Caraguatatuba/SP',
  status: 'inscricoes-abertas',
  statusLabel: 'Inscrições abertas',
  description: 'O bloco mais fofinho do Carnaval de Caraguatatuba! Um encontro feito para quem acredita que alegria também se passeia na coleira.',
}

export const initialAlbums: Album[] = [
  {
    id: 'alb-2025',
    year: 2025,
    title: 'Blocão 2025',
    cover: 'https://images.unsplash.com/photo-1552058751-34cb5cf055b6?auto=format&fit=crop&w=1200&q=80',
    category: 'desfile',
    published: true,
    photos: [
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'alb-2024',
    year: 2024,
    title: 'Blocão 2024',
    cover: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80',
    category: 'desfile',
    published: true,
    photos: [
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'alb-2023',
    year: 2023,
    title: 'Blocão 2023',
    cover: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80',
    category: 'desfile',
    published: true,
    photos: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80',
    ],
  },
]

export const initialProducts: Product[] = [
  {
    id: 'prod-camiseta-humano',
    name: 'Camiseta Blocão 2026 - Humano',
    price: 59.9,
    category: 'Camisetas',
    badge: 'novo',
    description: 'Camiseta oficial do Blocão 2026. Estampa exclusiva, tecido leve e confortável para curtir a folia.',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG'],
    colors: ['Branca', 'Amarela', 'Rosa'],
    stock: 300,
    image: 'https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=1200&q=80',
    published: true,
  },
  {
    id: 'prod-bandana-pet',
    name: 'Bandana Blocão 2026 - Pet',
    price: 29.9,
    category: 'Acessórios Pet',
    badge: 'novo',
    description: 'Bandana oficial para pets. Tecido macio e ajuste confortável para seu amigo desfilar com estilo.',
    petSizes: ['PP', 'P', 'M', 'G'],
    colors: ['Estampa Carnaval', 'Amarela', 'Rosa'],
    stock: 200,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80',
    published: true,
  },
  {
    id: 'prod-kit-combo',
    name: 'Kit Tutor + Pet',
    price: 79.9,
    promoPrice: 69.9,
    category: 'Kits',
    badge: 'promo',
    description: 'Combo especial: 1 camiseta para você + 1 bandana para seu pet. Desfilem combinando!',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    petSizes: ['PP', 'P', 'M', 'G'],
    colors: ['Branca + Estampa', 'Amarela + Amarela'],
    stock: 150,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80',
    published: true,
  },
  {
    id: 'prod-coleira-carnaval',
    name: 'Coleira Carnaval Blocão',
    price: 34.9,
    category: 'Acessórios Pet',
    description: 'Coleira temática com cores vibrantes e pingente exclusivo do Blocão.',
    petSizes: ['P', 'M', 'G'],
    colors: ['Colorida', 'Dourada'],
    stock: 100,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80',
    published: true,
  },
  {
    id: 'prod-fantasia-pet',
    name: 'Mini Fantasia Pet Carnaval',
    price: 44.9,
    category: 'Fantasias',
    badge: 'novo',
    description: 'Fantasia leve e confortável para seu pet brilhar no desfile. Fácil de vestir e tirar.',
    petSizes: ['PP', 'P', 'M', 'G'],
    colors: ['Palhaço', 'Rei/Rainha', 'Havaiano'],
    stock: 80,
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
    published: true,
  },
  {
    id: 'prod-ecobag',
    name: 'Ecobag Blocão',
    price: 24.9,
    category: 'Acessórios',
    description: 'Ecobag estampada do Blocão. Prática para levar os itens do seu pet no desfile.',
    colors: ['Natural', 'Colorida'],
    stock: 200,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    published: true,
  },
]

export const initialProfessionals: Professional[] = [
  {
    id: 'prof-1',
    name: 'Clínica Veterinária Litoral',
    responsibleName: 'Dra. Marina Costa',
    category: 'Veterinário',
    email: 'contato@vetlitoral.com',
    whatsapp: '+55 12 99999-9999',
    district: 'Centro',
    city: 'Caraguatatuba',
    state: 'SP',
    services: 'Consultas, vacinas, cirurgias, emergência',
    schedule: 'Seg-Sex 8h-19h, Sáb 8h-13h',
    benefits: '10% off para participantes do Blocão',
    couponCode: 'BLOCAO10',
    emergency24h: true,
    approved: true,
    featured: true,
  },
  {
    id: 'prof-2',
    name: 'Pet Shop Praia Grande',
    category: 'Banho e Tosa',
    whatsapp: '+55 12 98888-8888',
    district: 'Praia Grande',
    city: 'Caraguatatuba',
    state: 'SP',
    services: 'Banho, tosa, acessórios, alimentação',
    schedule: 'Seg-Sáb 9h-18h',
    benefits: 'Cupom BLOCAO5 - 5% de desconto',
    couponCode: 'BLOCAO5',
    approved: true,
  },
  {
    id: 'prof-3',
    name: 'Casa dos Pets',
    category: 'Pet Shop',
    whatsapp: '+55 12 97777-7777',
    district: 'Martim de Sá',
    city: 'Caraguatatuba',
    state: 'SP',
    services: 'Ração, medicamentos, acessórios, brinquedos',
    schedule: 'Seg-Sáb 8h-19h, Dom 9h-13h',
    approved: true,
  },
  {
    id: 'prof-4',
    name: 'Adestra Caraguá',
    category: 'Adestramento',
    whatsapp: '+55 12 96666-6666',
    district: 'Indaiá',
    city: 'Caraguatatuba',
    state: 'SP',
    services: 'Adestramento básico e avançado, comportamento',
    schedule: 'Horários flexíveis',
    benefits: 'Primeira aula grátis para inscritos no Blocão',
    approved: true,
  },
  {
    id: 'prof-5',
    name: 'Hotel Pet Litoral Norte',
    category: 'Hotel',
    whatsapp: '+55 12 95555-5555',
    district: 'Massaguaçu',
    city: 'Caraguatatuba',
    state: 'SP',
    services: 'Hospedagem, day care, passeios',
    schedule: 'Todos os dias 7h-20h',
    benefits: '15% off na primeira hospedagem',
    approved: true,
  },
]

export const initialSponsors: Sponsor[] = [
  {
    id: 'sponsor-1',
    name: 'Pet Shop Praia Grande',
    tier: 'master',
    logo: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=400&q=80',
    description: 'O melhor para seu pet no Litoral Norte',
    benefits: ['Logo na camiseta', 'Banner principal', 'Estande no evento'],
    active: true,
  },
  {
    id: 'sponsor-2',
    name: 'Clínica Veterinária Litoral',
    tier: 'ouro',
    logo: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=400&q=80',
    website: 'https://vetlitoral.com',
    description: 'Cuidando do seu pet com carinho',
    benefits: ['Logo no site', 'Banner rotativo', 'Divulgação redes'],
    active: true,
  },
  {
    id: 'sponsor-3',
    name: 'Casa dos Pets',
    tier: 'prata',
    logo: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=400&q=80',
    description: 'Tudo para seu amigo de quatro patas',
    benefits: ['Logo no site', 'Menção nas redes'],
    active: true,
  },
  {
    id: 'sponsor-4',
    name: 'Prefeitura de Caraguatatuba',
    tier: 'apoiador',
    logo: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80',
    description: 'Apoio institucional ao evento',
    benefits: ['Logo no site', 'Agradecimento no evento'],
    active: true,
  },
]

export const initialArticles: Article[] = [
  {
    id: 'art-1',
    title: 'Como preparar seu pet para o Blocão',
    slug: 'como-preparar-pet-blocao',
    excerpt: 'Dicas essenciais para curtir o desfile mais fofinho de Caraguatatuba com segurança e diversão.',
    content: `
O Blocão é uma festa de alegria, mas requer cuidados especiais com nossos amigos de quatro patas.

## Antes do evento
- Certifique-se de que seu pet está com as vacinas em dia
- Verifique se a coleira e identificação estão seguras
- Leve água fresca e potinhos portáteis

## Durante o desfile
- Observe sinais de estresse ou cansaço
- Mantenha seu pet hidratado
- Respeite o ritmo do seu amigo

## Fantasias e acessórios
- Experimente a fantasia antes do evento
- Certifique-se de que não está apertada
- Deixe seu pet se acostumar com a roupa

Seguindo essas dicas, vocês vão aproveitar muito o Blocão de Caraguatatuba!
    `.trim(),
    cover: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80',
    category: 'cuidados',
    author: 'Equipe Blocão',
    published: true,
    publishedAt: '2026-01-10T10:00:00',
    createdAt: '2026-01-10T10:00:00',
  },
  {
    id: 'art-2',
    title: 'Blocão 2025 foi um sucesso!',
    slug: 'blocao-2025-sucesso',
    excerpt: 'Mais de 200 pets e suas famílias desfilaram juntos no Centro de Caraguatatuba.',
    content: `
O Blocão 2025 superou todas as expectativas e reuniu a comunidade pet de Caraguatatuba em um evento inesquecível.

## Números do evento
- **200+** pets participantes
- **500+** pessoas presentes
- **3 horas** de pura alegria

## Destaques
- Desfile de fantasias criativas
- Concurso de fantasia mais criativa
- Distribuição de brindes e água para os pets
- Apoio de profissionais veterinários

## Agradecimentos
Obrigado a todos os tutores, patrocinadores e voluntários que fizeram o Blocão 2025 acontecer. Nos vemos em 2026!

O Blocão prova que Carnaval bom é aquele que inclui, abraça e faz memória.
    `.trim(),
    cover: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80',
    category: 'evento',
    author: 'Equipe Blocão',
    published: true,
    publishedAt: '2025-02-20T10:00:00',
    createdAt: '2025-02-20T10:00:00',
  },
  {
    id: 'art-3',
    title: 'Guarda responsável: o que você precisa saber',
    slug: 'guarda-responsavel',
    excerpt: 'Dicas para ser um tutor consciente e proporcionar bem-estar ao seu pet.',
    content: `
Ter um pet é uma responsabilidade que traz muita alegria. Confira nosso guia para uma guarda responsável.

## Cuidados básicos
- Alimentação adequada para idade e porte
- Visitas regulares ao veterinário
- Vacinação e vermifugação em dia
- Exercícios e passeios diários

## Identificação
- Coleira com plaquinha e telefone
- Considere a microchipagem
- Fotos atualizadas do seu pet

## Socialização
- Apresente seu pet a outros animais gradualmente
- Eventos como o Blocão são ótimos para socialização
- Respeite o temperamento do seu amigo

Ser um tutor responsável é garantir que seu pet tenha uma vida feliz e saudável!
    `.trim(),
    cover: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80',
    category: 'cuidados',
    author: 'Equipe Blocão',
    published: true,
    publishedAt: '2025-09-20T10:00:00',
    createdAt: '2025-09-20T10:00:00',
  },
]

export const initialCoupons: Coupon[] = [
  {
    id: 'coupon-1',
    code: 'BLOCAO10',
    type: 'percentual',
    value: 10,
    minPurchase: 80,
    maxUses: 100,
    usedCount: 15,
    validUntil: '2026-02-28',
    active: true,
  },
  {
    id: 'coupon-2',
    code: 'PRIMEIRACOMPRA',
    type: 'fixo',
    value: 10,
    minPurchase: 50,
    maxUses: 200,
    usedCount: 42,
    validUntil: '2026-12-31',
    active: true,
  },
]

export const initialPickupPoints: PickupPoint[] = [
  {
    id: 'pickup-1',
    name: 'Praça Dr. Cândido Mota',
    address: 'Praça Dr. Cândido Mota, Centro - Caraguatatuba/SP',
    schedule: 'Dia do evento: 14h às 15h',
    active: true,
  },
  {
    id: 'pickup-2',
    name: 'Pet Shop Praia Grande',
    address: 'Av. Dr. Arthur Costa Filho, 500 - Praia Grande, Caraguatatuba/SP',
    schedule: 'Seg-Sáb 9h-18h',
    active: true,
  },
  {
    id: 'pickup-3',
    name: 'Casa dos Pets',
    address: 'Rua Sebastião Mariano Nepomuceno, 200 - Martim de Sá, Caraguatatuba/SP',
    schedule: 'Seg-Sáb 8h-19h, Dom 9h-13h',
    active: true,
  },
]

export const initialSettings: SiteSettings = {
  siteName: 'Blocão Caraguatatuba',
  email: 'contato@blocaocaraguatatuba.com.br',
  whatsapp: '+55 12 99999-9999',
  instagram: '@blocaocaraguatatuba',
  facebook: '/blocaocaraguatatuba',
  city: 'Caraguatatuba',
  state: 'SP',
}
