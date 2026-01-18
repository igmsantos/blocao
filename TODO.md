# Requisitos para o Site do BloCÃO

## Visão Geral
Este documento descreve as funcionalidades e áreas principais do site do BloCÃO, uma plataforma voltada para a venda de abadás e outros produtos para pets e seus donos, além de servir como ponto de referência para profissionais da área.

## Funcionalidades Principais

### 1. Galeria de Fotos
- Uma galeria para exibir fotos dos eventos de anos anteriores e do evento atual.
- As fotos podem ser organizadas por ano e facilmente atualizadas via painel de controle.

### 2. Espaços para Patrocinadores
- Área no site para exibição de banners rotativos de patrocinadores (carrossel no topo).
- Espaços fixos para patrocinadores em outras seções do site.

### 3. Responsividade
- O site deve ser totalmente responsivo, funcionando bem em dispositivos móveis, tablets e desktops.

### 4. Cadastro de Clientes e Pets
- Formulário de cadastro onde os usuários podem registrar seus dados e também os dados de seus pets.
- Permite vincular o pet ao perfil do dono, facilitando a gestão.

### 5. Loja Virtual
- Integração com e-commerce para venda de abadás e outros produtos, como rastreadores para pets.
- Opção de entrega ou retirada dos produtos.

### 6. Catálogo de Profissionais de Pets
- Diretório para que veterinários, lojas de ração e outros profissionais possam se cadastrar.
- Perfis com informações de contato, serviços oferecidos e localização.
- Possibilidade de oferecer cupons ou descontos para participantes do BloCÃO.

## Ideia de Layout (Mockup)
- **Cabeçalho**: Logo do BloCÃO, menu de navegação com links para a galeria, loja, cadastro e diretório de profissionais.
- **Banner Rotativo**: Carrossel de imagens destacando patrocinadores e eventos.
- **Seção de Destaque**: Links rápidos para compra de abadás, cadastro e galeria.
- **Galeria**: Página com fotos divididas por ano.
- **Loja Virtual**: Página de produtos com carrinho de compras.
- **Diretório de Profissionais**: Lista de perfis de veterinários e lojas com filtros de busca.

---

# Protótipo textual das telas (wireframes)

## Convenções rápidas

* **[ ]** = botão / ação
* **( )** = campo
* **{ }** = conteúdo dinâmico
* **—** = separador visual
* **📱 / 💻** = observação de responsividade

---

## 1) Home (Página inicial)

```
┌──────────────────────────────────────────────────────────────┐
│ TOPO (sticky)                                                 │
│ [Logo BloCÃO]  [Home] [Galeria] [Loja] [Inscrição] [Profissionais]
│                 [Patrocinadores] [Sobre] [Entrar/Cadastrar]   │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ HERO / CARROSSEL (rotativo)                                   │
│ [Banner 1: chamada do evento + CTA]  [Saiba mais] [Comprar]    │
│ [Banner 2: patrocinador master]                                │
│ [Banner 3: adoção/doação]                                      │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ CHAMADAS RÁPIDAS (cards)                                      │
│ [Comprar Abadá]   [Inscrever no Desfile]  [Ver Galeria]        │
│ [Doar]            [Catálogo Profissional] [Seja Patrocinador]  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ SEÇÃO: Próximo Evento / Status do Ano                         │
│ {Data do próximo desfile / Informações do próximo Carnaval}    │
│ {Contagem regressiva opcional}                                 │
│ [Ver detalhes do evento]                                       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ SEÇÃO: Destaques da ONG / Impacto                              │
│ {Resumo: animais ajudados, projetos, transparência}            │
│ [Ver prestação de contas] [Como ajudar]                        │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ SEÇÃO: Patrocinadores (preview)                               │
│ [Logo1] [Logo2] [Logo3] ... [Ver todos]                        │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ RODAPÉ                                                        │
│ Contato | Redes sociais | Política | Termos | WhatsApp         │
│ {Endereço / Cidade}  {CNPJ/ONG se tiver}                        │
└──────────────────────────────────────────────────────────────┘
```

📱 **Mobile:** menu vira “hambúrguer”; cards viram coluna; carrossel com swipe.

---

## 2) Sobre / ONG (Conteúdo perene pro ano inteiro)

```
┌───────────────┐
│ [Título] Sobre o BloCÃO e a ONG                                │
│ {Texto + fotos}                                                │
│ - Missão                                                    │
│ - Como funciona o evento                                     │
│ - Para onde vai o dinheiro (transparência)                   │
│ [Ver prestação de contas] [Doar agora] [Falar no WhatsApp]      │
└───────────────┘
```

---

## 3) Galeria (por ano + álbum)

### 3.1 Lista de anos/álbuns

```
┌──────────────────────────────────────────────────────────────┐
│ [Título] Galeria                                              │
│ (Buscar por ano/tema) [Pesquisar]                              │
│ Filtros: [Ano ▼] [Categoria ▼] (Ex: desfile, bastidores, pets) │
│                                                              │
│ [Card 2026]  {capa}  {qtd fotos}  [Ver álbum]                  │
│ [Card 2025]  {capa}  {qtd fotos}  [Ver álbum]                  │
│ [Card 2024]  {capa}  {qtd fotos}  [Ver álbum]                  │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Álbum (grid + lightbox)

```
┌──────────────────────────────────────────────────────────────┐
│ [← Voltar]  [Título] BloCÃO 2026                               │
│ {Descrição curta do álbum}                                     │
│ [Grid de fotos: 3-4 colunas desktop / 2 tablet / 1-2 mobile]    │
│ [Foto] [Foto] [Foto] [Foto] ...                                │
│ Ao clicar: abre visualização (lightbox) com [←] [→] [Fechar]    │
└──────────────────────────────────────────────────────────────┘
```

---

## 4) Loja (E-commerce)

### 4.1 Vitrine / Lista de produtos

```
┌──────────────────────────────────────────────────────────────┐
│ [Título] Loja                                                 │
│ Categorias: [Abadás] [Rastreadores] [Acessórios]               │
│ (Buscar produto) [Pesquisar]                                   │
│ Filtros: [Preço ▼] [Tamanho ▼] [Disponibilidade ▼]             │
│                                                              │
│ [Card Produto]  Foto  Nome  Preço                              │
│   {Badges: "novo", "promo"}                                    │
│   [Ver detalhes] [Adicionar ao carrinho]                       │
│ ...                                                           │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ Mini-carrinho (ícone no topo)                                 │
│ [🛒 Carrinho (3)]                                              │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 Produto (abadá)

```
┌──────────────────────────────────────────────────────────────┐
│ [← Voltar]  {Nome do produto}                                  │
│ [Foto grande] [Miniaturas]                                     │
│ Preço: {R$ ...}                                                │
│ Opções:                                                        │
│  - Tamanho pessoa: [PP/P/M/G/GG]                               │
│  - Tamanho pet:    [PP/P/M/G]                                  │
│  - Cor/Estampa:    [▼]                                         │
│ Quantidade: [-] (1) [+]                                        │
│ [Adicionar ao carrinho] [Comprar agora]                        │
│                                                              │
│ Descrição / Material / Cuidados                                │
│ Tabela de medidas (expandível)                                 │
│ FAQ (troca, prazos)                                            │
└──────────────────────────────────────────────────────────────┘
```

### 4.3 Produto (rastreador)

```
┌──────────────────────────────────────────────────────────────┐
│ {Nome rastreador}                                              │
│ [Foto]  Preço                                                  │
│ Opções: [Plano?] [Cor?] (se existir)                           │
│ [Adicionar ao carrinho]                                        │
│                                                              │
│ Especificações (bateria, cobertura, etc.)                      │
│ O que vem na caixa                                             │
│ Suporte / Garantia                                             │
└──────────────────────────────────────────────────────────────┘
```

### 4.4 Carrinho

```
┌──────────────────────────────────────────────────────────────┐
│ [Título] Carrinho                                              │
│ Item 1: {Produto}  {Variação}  Quantidade [+]  {Subtotal} │
│ [Remover]                                                      │
│ Item 2: ...                                                    │
│                                                              │
│ Cupom: (CÓDIGO) [Aplicar]                                      │
│ Frete/Retirada: [Calcular]                                     │
│ Total: {R$ ...}                                                │
│ [Finalizar compra]                                             │
└──────────────────────────────────────────────────────────────┘
```

### 4.5 Checkout (entrega ou retirada)

```
┌──────────────────────────────────────────────────────────────┐
│ [Título] Finalizar compra                                      │
│ 1) Identificação: [Entrar] ou [Continuar como visitante]       │
│                                                              │
│ 2) Entrega/Retirada                                            │
│ (Nome completo)                                                │
│ (CPF) (Telefone/WhatsApp)                                      │
│ Opção: ( ) Entrega  ( ) Retirada                               │
│ Se Entrega:                                                    │
│   (CEP) [Buscar]                                               │
│   (Rua) (Número) (Complemento)                                 │
│   (Bairro) (Cidade) (UF)                                       │
│ Se Retirada:                                                   │
│   Escolha ponto: [▼]  {endereço/horários}                      │
│                                                              │
│ 3) Pagamento                                                   │
│ {Métodos disponíveis}                                          │
│ [Pagar]                                                        │
└──────────────────────────────────────────────────────────────┘
```

---

## 5) Inscrição no Desfile (cadastro + pets + entrega)

### 5.1 Página de inscrição (pública)

```
┌──────────────────────────────────────────────────────────────┐
│ [Título] Inscrição BloCÃO                                      │
│ {Texto: regras, data, local, o que levar}                      │
│ [Botão] Começar inscrição                                      │
└──────────────────────────────────────────────────────────────┘
```

### 5.2 Wizard (passo a passo)

**Passo 1 — Dados do responsável**

```
(Nome) (Email) (Telefone/WhatsApp)
(Documento opcional) 
[Próximo]
```

**Passo 2 — Endereço / Retirada**

```
( ) Quero entrega   ( ) Vou retirar
Se entrega: (CEP) (Rua) (Número) (Compl) (Bairro) (Cidade) (UF)
Se retirada: [Selecionar ponto ▼]
[Voltar] [Próximo]
```

**Passo 3 — Pets**

```
[+ Adicionar pet]
Pet 1:
 (Nome do pet)
 (Espécie: cão/gato/outro)
 (Porte: pequeno/médio/grande)
 (Tamanho do abadá: PP/P/M/G)
 (Observações: alergias etc - opcional)

[+ Adicionar outro pet]
[Voltar] [Próximo]
```

**Passo 4 — Confirmação**

```
Resumo:
- Responsável: {dados}
- Entrega/Retirada: {dados}
- Pets: {lista}

[Confirmar inscrição]  [Editar]
```

**Tela final**

```
✅ Inscrição confirmada!
{Número/Protocolo}
[Ver detalhes] [Ir para loja] [Compartilhar]
```

---

## 6) Área do Cliente (Conta)

### 6.1 Login / Cadastro

```
┌──────────────────────────────────────────────────────────────┐
│ [Título] Entrar                                                │
│ (Email) (Senha) [Entrar]                                       │
│ [Esqueci minha senha]                                          │
│ — ou —                                                         │
│ [Criar conta] (Nome) (Email) (WhatsApp) (Senha) [Cadastrar]    │
└──────────────────────────────────────────────────────────────┘
```

### 6.2 Painel do usuário

```
┌──────────────────────────────────────────────────────────────┐
│ [Olá, {Nome}]                                                  │
│ Abas: [Meus pedidos] [Minhas inscrições] [Meus pets] [Endereços]
│                                                              │
│ Cards resumo:                                                  │
│ - Próximo evento: {data} [Ver inscrição]                       │
│ - Último pedido: {status} [Ver pedido]                         │
└──────────────────────────────────────────────────────────────┘
```

### 6.3 Meus pets (vinculado ao usuário)

```
┌──────────────────────────────────────────────────────────────┐
│ [Título] Meus pets                                             │
│ [Card Pet] {Nome} {porte} {tamanho} [Editar] [Remover]         │
│ [Adicionar pet]                                                │
└──────────────────────────────────────────────────────────────┘
```

---

## 7) Catálogo de Profissionais (veterinário / casa de ração / etc.)

### 7.1 Listagem + filtros

```
┌──────────────────────────────────────────────────────────────┐
│ [Título] Profissionais e Parceiros da Comunidade Pet           │
│ (Buscar por nome/serviço/bairro) [Pesquisar]                   │
│ Filtros: [Categoria ▼] [Bairro/Cidade ▼] [Atende emergência?]   │
│                                                              │
│ [Card Profissional]                                            │
│  Nome / Categoria (Vet, Banho e Tosa, Ração...)                │
│  ★★★★☆ (opcional)  Distância (opcional)                        │
│  Endereço curto | WhatsApp | Horário                           │
│  [Ver perfil] [Falar no WhatsApp]                              │
│ ...                                                           │
└──────────────────────────────────────────────────────────────┘
```

### 7.2 Perfil do profissional

```
┌──────────────────────────────────────────────────────────────┐
│ {Nome do local}  {Categoria}                                   │
│ [Logo/Foto]                                                    │
│ Contato: {WhatsApp} {Telefone} {Instagram}                     │
│ Endereço + (mapa embutido opcional)                            │
│ Horários                                                      │
│ Serviços: {lista}                                              │
│ Diferenciais (ex: "emergência 24h")                             │
│                                                              │
│ Benefícios BloCÃO: {cupom/desconto, se houver}                 │
│ [Pegar cupom] [Falar no WhatsApp]                              │
└──────────────────────────────────────────────────────────────┘
```

### 7.3 Cadastro do profissional (não é “do desfile”)

```
┌──────────────────────────────────────────────────────────────┐
│ [Título] Cadastro de Profissional/Estabelecimento              │
│ Objetivo: aparecer no catálogo e/ou apoiar a causa             │
│                                                              │
│ (Nome do estabelecimento)                                      │
│ (Nome responsável)                                             │
│ (Email) (WhatsApp)                                             │
│ Categoria: [▼]                                                 │
│ (Endereço) (Cidade/UF)                                         │
│ (Horários)                                                     │
│ Serviços (multi-seleção)                                       │
│ Links (Instagram/Site)                                         │
│                                                              │
│ Apoio / Doação:                                                │
│ ( ) Quero doar mensalmente                                     │
│ ( ) Quero doar pontualmente                                    │
│ ( ) Quero oferecer cupom/benefício                             │
│ Detalhes: (texto)                                              │
│                                                              │
│ [Enviar cadastro]                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 8) Patrocinadores

### 8.1 Página de patrocinadores (institucional)

```
┌──────────────────────────────────────────────────────────────┐
│ [Título] Patrocinadores                                        │
│ {Texto: por que patrocinar, mídia, alcance, contrapartidas}    │
│                                                              │
│ Cotas (exemplo):                                               │
│ [Master] {benefícios} [Quero patrocinar]                       │
│ [Ouro]   {benefícios} [Quero patrocinar]                       │
│ [Prata]  {benefícios} [Quero patrocinar]                       │
│                                                              │
│ Logos atuais: [Logo1][Logo2]...                                │
└──────────────────────────────────────────────────────────────┘
```

### 8.2 “Reserva de espaços” (conceito para dev)

*(mesmo que a administração seja simples via CMS/painel depois)*

```
┌──────────────────────────────────────────────────────────────┐
│ Zonas de banner (inventário)                                   │
│ - Topo: Carrossel (3 a 6 slots)                                │
│ - Home: faixa intermediária (1 slot)                           │
│ - Sidebar/rodapé (até 6 logos)                                 │
│                                                              │
│ Cada slot: {Imagem} {Link} {Data início/fim} {Prioridade}      │
└──────────────────────────────────────────────────────────────┘
```

---

## 9) Notícias / Artigos (para manter o site vivo o ano todo)

### 9.1 Listagem

```
┌──────────────────────────────────────────────────────────────┐
│ [Título] Notícias e Dicas                                      │
│ Categorias: [BloCÃO] [ONG] [Cuidados com pets] [Adoção]         │
│ (Buscar) [Pesquisar]                                           │
│                                                              │
│ [Card Artigo]  Título  Data  Resumo  [Ler]                     │
│ ...                                                           │
└──────────────────────────────────────────────────────────────┘
```

### 9.2 Artigo

```
┌──────────────────────────────────────────────────────────────┐
│ {Título}                                                       │
│ {Capa}                                                         │
│ {Texto}                                                        │
│ [Compartilhar] [Ver mais artigos]                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 10) Doações (opcional, mas recomendado)

```
┌──────────────────────────────────────────────────────────────┐
│ [Título] Apoie a causa                                         │
│ {Texto: o que a doação ajuda}                                  │
│ Valores: [R$xx] [R$yy] [Outro: (  )]                            │
│ Frequência: ( ) única  ( ) mensal                               │
│ [Doar]                                                         │
└──────────────────────────────────────────────────────────────┘
```

---

# Navegação sugerida (mapa do site)

* **Home**
* **Sobre**
* **Galeria**
* **Loja**
* **Inscrição**
* **Profissionais**
* **Patrocinadores**
* **Notícias/Artigos**
* **Doações** (opcional)
* **Conta** (Login/Cadastro + Painel)

---

# Pontos importantes de UX (sem entrar em técnica)

* **Ano inteiro:** Home destaca “próximo evento” + “ações da ONG” + “profissionais” + “artigos”.
* **Carnaval:** Inscrição e Loja ganham destaque (primeiro CTA).
* **Profissionais:** devem ter **um caminho próprio** (cadastro e visibilidade), sem parecer “participante do desfile”.
* **Checkout simples:** entrega vs retirada bem claro.
* **Mobile-first:** carrossel com swipe; cards em coluna; botões grandes (WhatsApp/Comprar/Inscrever).

---

# Protótipo textual — Painel de Controle (Admin)

## 0) Estrutura geral (layout base)

```
┌─────────────────────────────────────────────────────────────────────┐
│ TOPO (sticky)                                                        │
│ [Logo BloCÃO Admin]   (Buscar no painel...)  [🔔] [Ajuda] [Perfil ▼] │
└─────────────────────────────────────────────────────────────────────┘

┌───────────────┬─────────────────────────────────────────────────────┐
│ MENU LATERAL   │ CONTEÚDO PRINCIPAL                                  │
│               │                                                     │
│ Dashboard      │ {tela atual}                                        │
│ Conteúdo       │                                                     │
│ - Páginas      │                                                     │
│ - Home         │                                                     │
│ - Banners      │                                                     │
│ Galeria        │                                                     │
│ Loja           │                                                     │
│ Inscrições     │                                                     │
│ Clientes/Pets  │                                                     │
│ Profissionais  │                                                     │
│ Patrocinadores │                                                     │
│ Artigos        │                                                     │
│ Doações        │                                                     │
│ Mensagens      │                                                     │
│ Relatórios     │                                                     │
│ Configurações  │                                                     │
│ Usuários/Admin │                                                     │
└───────────────┴─────────────────────────────────────────────────────┘
```

📱 **Mobile:** menu vira drawer, conteúdo em uma coluna.

---

# 1) Login do Admin

```
┌──────────────────────────────────────────┐
│ [Título] Entrar no Painel BloCÃO          │
│ (Email)                                   │
│ (Senha)                                   │
│ [Entrar]                                  │
│ [Esqueci minha senha]                     │
└──────────────────────────────────────────┘
```

---

# 2) Dashboard (visão geral)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Dashboard                                                   │
│ Período: [Últimos 7 dias ▼]  [Este mês] [Personalizado]              │
│                                                                     │
│ Cards rápidos:                                                       │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ Vendas (R$)   │ │ Pedidos      │ │ Inscrições   │ │ Doações (R$)  │ │
│ │ {total}       │ │ {qtd}        │ │ {qtd}        │ │ {total}       │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ │
│                                                                     │
│ Pendências (lista):                                                  │
│ - {X} inscrições aguardando aprovação                                │
│ - {Y} profissionais pendentes                                        │
│ - {Z} pedidos com problema (pagamento/frete)                          │
│ - banners vencendo em {N} dias                                        │
│ [Ver tudo]                                                           │
│                                                                     │
│ Ações rápidas:                                                       │
│ [Criar banner] [Adicionar fotos] [Publicar artigo] [Criar cupom]     │
│ [Abrir inscrições] [Fechar inscrições] [Exportar lista]              │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 3) Conteúdo (Páginas e Home)

## 3.1 Páginas (sobre, contato, termos etc.)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Páginas                                                     │
│ [Nova página]                                                       │
│                                                                     │
│ Lista:                                                              │
│ | Nome            | Status   | Última edição | Ações               | │
│ | Sobre           | Publicada| {data}        | [Editar] [Ver]      | │
│ | Contato         | Publicada| {data}        | [Editar] [Ver]      | │
│ | Termos          | Rascunho | {data}        | [Editar] [Publicar] | │
└─────────────────────────────────────────────────────────────────────┘
```

## 3.2 Home (blocos configuráveis)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Home                                                        │
│ Blocos:                                                              │
│ [↕] Carrossel do topo           [Configurar] [Ativo ✅]               │
│ [↕] Cards de chamada rápida     [Editar]     [Ativo ✅]               │
│ [↕] Próximo evento / status     [Editar]     [Ativo ✅]               │
│ [↕] Impacto / Transparência     [Editar]     [Ativo ✅]               │
│ [↕] Patrocinadores (preview)    [Configurar] [Ativo ✅]               │
│                                                                     │
│ [Salvar alterações]                                                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 4) Banners (carrossel + slots)

## 4.1 Lista de banners

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Banners                                                     │
│ [Novo banner]                                                        │
│ Filtros: [Tipo ▼] (Carrossel, Faixa, Rodapé)  [Status ▼]             │
│                                                                     │
│ | Nome         | Tipo     | Período        | Prioridade | Status |Ações|
│ | Master 1     | Carrossel| 01/Jan–01/Mar  | 10         | Ativo  |[✎][⏸]|
│ | Patro 2      | Rodapé   | 01/Jan–31/Dez  | 2          | Ativo  |[✎][⏸]|
│ | Campanha X   | Faixa    | 10/Fev–20/Fev  | 5          | Vence  |[✎]   |
└─────────────────────────────────────────────────────────────────────┘
```

## 4.2 Editor de banner

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Novo banner / Editar banner                                 │
│ Tipo: [Carrossel ▼]   Slot: [Topo ▼]                                 │
│ (Nome interno)                                                       │
│ Imagem: [Upload]  Prévia: {thumbnail}                                │
│ Link ao clicar: (https://...)                                        │
│ Texto opcional (para acessibilidade): ( ... )                         │
│ Prioridade: (10)                                                     │
│ Data início: (  )  Data fim: (  )                                    │
│ Status: ( ) Ativo  ( ) Pausado                                       │
│ [Salvar] [Salvar e publicar]                                         │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 5) Galeria (anos/álbuns/fotos)

## 5.1 Lista de álbuns

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Galeria                                                     │
│ [Criar álbum] [Upload em lote]                                      │
│ Filtros: [Ano ▼] [Categoria ▼]                                      │
│                                                                     │
│ | Álbum          | Ano | Fotos | Status | Capa | Ações              | │
│ | BloCÃO 2026    | 26  | 120   | Pub    | ✅   | [Editar] [Fotos]   | │
│ | Bastidores 25  | 25  | 40    | Ras    | —    | [Editar] [Fotos]   | │
└─────────────────────────────────────────────────────────────────────┘
```

## 5.2 Gerenciar fotos do álbum

```
┌─────────────────────────────────────────────────────────────────────┐
│ [← Voltar] Álbum: BloCÃO 2026                                        │
│ [Adicionar fotos] [Definir capa] [Publicar álbum]                   │
│                                                                     │
│ Grid: [Foto][Foto][Foto]...                                         │
│ Seleção múltipla: [Excluir] [Mover p/ outro álbum] [Definir tags]   │
│ Tags: desfile, pets, bastidores                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 6) Loja (produtos, pedidos, cupons)

## 6.1 Produtos

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Produtos                                                    │
│ [Novo produto]                                                       │
│ Filtros: [Categoria ▼] [Status ▼] [Estoque baixo ✅]                 │
│                                                                     │
│ | Produto     | Categoria   | Preço | Estoque | Status | Ações      | │
│ | Abadá 2026  | Abadá       | R$..  | 120     | Pub    | [✎][⏸]     | │
│ | Rastreador  | Rastreador  | R$..  | 20      | Pub    | [✎]        | │
└─────────────────────────────────────────────────────────────────────┘
```

## 6.2 Editor de produto (ex.: abadá)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Novo/Editar produto                                         │
│ (Nome)                                                               │
│ Categoria: [Abadá ▼]                                                 │
│ Descrição: {editor de texto}                                         │
│ Fotos: [Upload]  {galeria}                                           │
│ Preço: (   )   Promoção: (   )                                       │
│ Variantes:                                                           │
│ - Tamanho pessoa: [PP,P,M,G,GG]                                      │
│ - Tamanho pet:    [PP,P,M,G]                                         │
│ Estoque por variante: {tabela}                                       │
│ Entrega/Retirada: [Habilitar ✅]                                     │
│ Status: ( ) Rascunho ( ) Publicado                                   │
│ [Salvar]                                                             │
└─────────────────────────────────────────────────────────────────────┘
```

## 6.3 Pedidos

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Pedidos                                                     │
│ Filtros: [Status ▼] [Período ▼] (Buscar por nome/CPF/pedido)         │
│                                                                     │
│ | Nº  | Cliente    | Total | Entrega/Retirada | Status   | Ações    | │
│ |1234 | Maria      | R$..  | Entrega          | Pago     | [Ver]    | │
│ |1235 | João       | R$..  | Retirada         | Pendente | [Ver]    | │
└─────────────────────────────────────────────────────────────────────┘
```

## 6.4 Detalhe do pedido

```
┌─────────────────────────────────────────────────────────────────────┐
│ Pedido #1234                                                         │
│ Cliente: {nome} {contato}                                            │
│ Itens: {lista}                                                       │
│ Entrega/Retirada: {dados}                                            │
│ Pagamento: {status}                                                  │
│ Status do pedido: [▼] (Pendente, Pago, Separando, Enviado, Concluído)│
│ Notas internas: ( ... )                                              │
│ [Salvar] [Reenviar confirmação] [Imprimir etiqueta] (opcional)       │
└─────────────────────────────────────────────────────────────────────┘
```

## 6.5 Cupons

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Cupons                                                      │
│ [Novo cupom]                                                         │
│ | Código | Tipo      | Valor | Validade | Uso | Status | Ações       | │
│ | BLOCAO | % desconto| 10%   | ...      | 12  | Ativo  | [✎][⏸]      | │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 7) Inscrições do Desfile (gestão)

## 7.1 Lista

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Inscrições                                                  │
│ Status geral: [Inscrições ABERTAS ✅] [Fechar inscrições]             │
│ Filtros: [Status ▼] [Ano ▼] (Buscar por responsável/pet)             │
│                                                                     │
│ | Protocolo | Responsável | Pets | Entrega/Retirada | Status |Ações  | │
│ | A-2026-01 | Ana         | 2    | Entrega          | Nova   |[Ver]  | │
│ | A-2026-02 | Bruno       | 1    | Retirada         | Aprov. |[Ver]  | │
└─────────────────────────────────────────────────────────────────────┘
```

## 7.2 Detalhe da inscrição

```
┌─────────────────────────────────────────────────────────────────────┐
│ Inscrição A-2026-01                                                  │
│ Responsável: {dados}                                                 │
│ Endereço/Retirada: {dados}                                           │
│ Pets:                                                                │
│ - {Nome} {porte} {tamanho abadá} {obs}                               │
│ - {Nome} {porte} {tamanho abadá} {obs}                               │
│ Status: [▼] (Nova, Aprovada, Pendente info, Cancelada)               │
│ Observação interna: ( ... )                                          │
│ [Salvar] [Enviar mensagem ao responsável] [Exportar]                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 8) Clientes & Pets (CRM simples)

## 8.1 Clientes

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Clientes                                                    │
│ (Buscar por nome/email/telefone) [Pesquisar]                         │
│                                                                     │
│ | Cliente | Contato | Nº pedidos | Nº inscrições | Ações            | │
│ | Ana     | ...     | 2          | 1             | [Ver] [Pets]     | │
└─────────────────────────────────────────────────────────────────────┘
```

## 8.2 Pets (global)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Pets                                                        │
│ Filtros: [Porte ▼] [Tamanho ▼] [Ano inscrição ▼]                     │
│ | Pet  | Dono | Porte | Tamanho | Última inscrição | Ações          | │
│ | Kira | Ana  | M     | M       | 2026            | [Ver]          | │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 9) Profissionais (cadastro, aprovação, catálogo, cupons)

## 9.1 Lista / moderação

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Profissionais                                               │
│ [Novo manual]                                                       │
│ Filtros: [Status ▼] [Categoria ▼] (Buscar)                           │
│                                                                     │
│ | Nome      | Categoria | Cidade | Benefício | Status   | Ações     | │
│ | Vet X     | Vet       | ...    | Cupom     | Pendente | [Ver][✅] | │
│ | Ração Y   | Loja      | ...    | —         | Aprovado | [Ver][✎]  | │
└─────────────────────────────────────────────────────────────────────┘
```

## 9.2 Detalhe do profissional

```
┌─────────────────────────────────────────────────────────────────────┐
│ {Nome do estabelecimento}                                            │
│ Dados: {contato, endereço, horários}                                 │
│ Serviços: {lista}                                                    │
│ Benefícios BloCÃO: {cupom / desconto / nenhum}                       │
│ Status: [▼] (Pendente, Aprovado, Reprovado)                          │
│ Motivo (se reprovar): ( ... )                                        │
│ [Salvar] [Enviar resposta]                                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 10) Patrocinadores (cadastro + cotas + logos)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Patrocinadores                                              │
│ [Novo patrocinador] [Gerenciar cotas]                                │
│                                                                     │
│ | Nome       | Cota   | Período       | Logo | Link | Ações         | │
│ | Marca A    | Master | Jan–Mar       | ✅   | ✅   | [✎] [Banners]  | │
│ | Marca B    | Prata  | Jan–Dez       | ✅   | ✅   | [✎]           | │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 11) Artigos (ano inteiro)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Artigos                                                     │
│ [Novo artigo]                                                        │
│ Filtros: [Categoria ▼] [Status ▼]                                    │
│                                                                     │
│ | Título           | Categoria | Data | Status  | Ações             | │
│ | Dicas de verão   | Cuidados  | ...  | Pub     | [✎] [Ver]         | │
│ | Prestação 2026   | ONG       | ...  | Ras     | [✎] [Publicar]    | │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 12) Doações (opcional, mas recomendado)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Doações                                                     │
│ | Doador | Valor | Frequência | Data | Status | Ações               | │
│ | ...    | R$..  | Mensal     | ...  | OK     | [Ver]               | │
│ [Exportar CSV]                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 13) Mensagens (contato / WhatsApp / formulários)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Mensagens                                                   │
│ Fontes: [Contato do site] [Patrocínio] [Profissionais]               │
│                                                                     │
│ | Assunto        | De      | Data | Status | Ações                  | │
│ | Quero ajudar   | Ana     | ...  | Novo   | [Ler] [Marcar como lido]│
└─────────────────────────────────────────────────────────────────────┘
```

---

# 14) Relatórios (para operação)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Relatórios                                                  │
│ [Vendas] [Inscrições] [Produtos] [Profissionais] [Patrocinadores]    │
│ Período: [▼]  [Exportar CSV] [Exportar PDF] (opcional)               │
│                                                                     │
│ - Top produtos (lista)                                               │
│ - Inscrições por porte/tamanho                                       │
│ - Entrega vs retirada                                                │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 15) Configurações (site e regras)

## 15.1 Geral

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Configurações                                               │
│ Aba: [Geral] [Evento] [Entrega/Retirada] [Pagamentos] [SEO]          │
│                                                                     │
│ Geral:                                                              │
│ (Nome do site)                                                      │
│ (Email de contato)                                                  │
│ (WhatsApp oficial)                                                  │
│ (Cidade/UF padrão)                                                  │
│ Redes sociais: (Instagram) (TikTok) (YouTube)                        │
│ [Salvar]                                                            │
└─────────────────────────────────────────────────────────────────────┘
```

## 15.2 Evento (Carnaval)

```
┌─────────────────────────────────────────────────────────────────────┐
│ Evento:                                                              │
│ (Nome do evento: BloCÃO 2026)                                        │
│ (Data) (Local)                                                       │
│ Status: ( ) Em preparação ( ) Inscrições abertas ( ) Encerrado       │
│ Mensagem destaque na Home: ( ... )                                   │
│ [Salvar]                                                             │
└─────────────────────────────────────────────────────────────────────┘
```

## 15.3 Entrega/Retirada

```
┌─────────────────────────────────────────────────────────────────────┐
│ Retirada: [Habilitar ✅]                                             │
│ Pontos de retirada (lista):                                          │
│ - {Nome} {Endereço} {Horários} [Editar] [Remover]                    │
│ [Adicionar ponto]                                                    │
│                                                                     │
│ Entrega: [Habilitar ✅]                                              │
│ Regras de frete: {simples}                                           │
│ [Salvar]                                                             │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 16) Usuários/Admin (perfis e permissões)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Título] Usuários do Painel                                          │
│ [Novo usuário]                                                       │
│ | Nome | Email | Perfil         | Status | Ações                    | │
│ | Ana  | ...   | Admin          | Ativo  | [Editar] [Desativar]      | │
│ | Bia  | ...   | Conteúdo       | Ativo  | [Editar]                 | │
│ | Caio | ...   | Loja/Inscrição | Ativo  | [Editar]                 | │
└─────────────────────────────────────────────────────────────────────┘
```

Perfis sugeridos:

* **Admin:** tudo
* **Conteúdo:** páginas/home/galeria/artigos
* **Loja:** produtos/pedidos/cupons
* **Inscrições:** inscrições/clientes/pets
* **Parceiros:** profissionais/patrocinadores/banners

---

# Fluxos críticos (resumo)

* **Publicar campanha:** criar banner + ajustar Home + publicar artigo.
* **Operação pré-Carnaval:** abrir inscrições + revisar pendências + ajustar estoque.
* **Ano inteiro:** catálogo de profissionais + artigos + doações + patrocinadores.

---