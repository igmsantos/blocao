# BloCÃO MVP

MVP single-page app em React + TypeScript + Vite com dados mockados em localStorage para Home, Galeria, Loja simples, Inscrição, Profissionais e Painel Admin. Inclui Dockerfile e docker-compose para servir o build.

## Rodar em desenvolvimento

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Docker

```bash
docker compose up --build
```

O app ficará disponível em http://localhost:4173.

## Funcionalidades do MVP
- Home com hero/banners, destaques, galeria recente, loja e profissionais.
- Galeria: listar álbuns e criar álbum manual (URLs das fotos).
- Loja: catálogo mock (abadá e rastreador), carrinho local, checkout com entrega/retirada, geração de pedido e export CSV no admin.
- Inscrição: formulário responsável + pets, entrega/retirada, gera protocolo.
- Profissionais: lista aprovados e cadastro pendente para aprovação.
- Admin: editar evento, adicionar banners, criar álbuns, exportar inscrições/pedidos CSV, aprovar profissionais.

Dados são persistidos em `localStorage`, ideal para demo rápida do fluxo.
# blocao
