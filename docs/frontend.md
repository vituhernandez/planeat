# Especificação do Front-end: PlanEat

> **Global Solution 2026/2 — CitizenTech (FIAP)**  
> **Sistema:** PlanEat — Interface Web SPA do Cidadão  
> **Tecnologia:** React 18+ com Vite e React Router  
> **Abordagem de Design:** Mobile-First, Alta Usabilidade Tátil e Acessibilidade  

---

## 1. Visão Geral e Experiência do Usuário (UX)

O front-end do **PlanEat** foi desenvolvido em **React** com foco direto no cidadão, priorizando a usabilidade móvel. A proposta central é acompanhar o usuário em dois momentos distintos:
1. **Em casa (Planejamento):** Interface intuitiva para catalogar receitas e estruturar o cardápio semanal sem fricção;
2. **No supermercado (Execução):** Interface ágil, com botões amplos, fontes legíveis e **checkboxes interativos** operáveis com uma mão só enquanto o usuário caminha pelos corredores.

### Requisitos Atendidos da Avaliação:
* **Mínimo de 3 visões interligadas:** Roteamento via React Router unificando Dashboard, Receitas e Planejamento/Lista de Compras;
* **Navegação Uniforme:** Cabeçalho com menu fixo e responsivo persistente em todas as telas;
* **Validação de Formulários:** Validações de entradas em tempo real com alertas visuais;
* **Diferencial Global Solution (Web Conectada):** Integração real com o back-end Java via chamadas HTTP REST (`fetch`/`axios`), lendo e gravando no banco relacional.

---

## 2. Estrutura de Pastas do Projeto React

```
planeat-frontend/
├── public/                     # Favicon e assets públicos
├── src/
│   ├── assets/                 # Imagens, ícones SVG e ilustrações ODS
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Navbar.jsx          # Barra de navegação unificada
│   │   ├── Footer.jsx          # Rodapé com menção CitizenTech e ODS
│   │   ├── CardImpacto.jsx     # Card métrico (desperdício, economia)
│   │   ├── CardReceita.jsx     # Card de apresentação de receita
│   │   ├── DosadorIngrediente.jsx # Seletor dinâmico de insumos na receita
│   │   └── ItemChecklist.jsx   # Item de lista com checkbox tátil
│   ├── pages/                  # As 3 visões principais (Telas)
│   │   ├── Dashboard.jsx       # Home / Visão Geral e Métricas
│   │   ├── Receitas.jsx        # Catálogo e CRUD de Receitas
│   │   └── Planejamento.jsx    # Cardápio Semanal e Lista de Compras Inteligente
│   ├── services/               # Comunicação com a API REST Java
│   │   ├── api.js              # Instância base do Axios ou Fetch Wrapper
│   │   ├── receitaService.js   # Funções de busca, criação e exclusão
│   │   └── planoService.js     # Geração de lista e status de compras
│   ├── styles/                 # Estilização global e componentes
│   │   ├── index.css           # Reset e variáveis de cor
│   │   └── responsive.css      # Regras de media query mobile-first
│   ├── App.jsx                 # Configuração de rotas (React Router)
│   └── main.jsx                # Ponto de entrada React (DOM Mount)
├── package.json
└── vite.config.js
```

---

## 3. Especificação Detalhada das Telas

```
┌────────────────────────────────────────────────────────────────────────┐
│  🌿 PlanEat          [ Dashboard ]   [ Receitas ]   [ Planejamento ]   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  CONTEÚDO DINÂMICO ESPECÍFICO DA TELA (REACT ROUTER OUTLET)           │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│  PlanEat © 2026 — CitizenTech FIAP — ODS 2 e 11                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1. Tela 1: `Dashboard.jsx` (Home & Métricas de Impacto)
* **Rota:** `/` ou `/dashboard`
* **Objetivo:** Engajar o cidadão com os conceitos do CitizenTech e evidenciar a economia financeira e sustentável gerada pelo planejamento.
* **Componentes e Seções:**
  1. **Hero Banner:** Chamada de impacto (*"O futuro sustentável começa na sua despensa"*), botão de ação rápida *"Montar Cardápio da Semana"*;
  2. **Métricas de Impacto Social (ODS 2 e 11):**
     * Indicador de perdas alimentares no Brasil (27M toneladas/ano);
     * Indicador do domicílio: estimativa de refeições planejadas e economia de alimentos;
  3. **Acesso Rápido:** Cards para acessar a última lista de compras ativa ou adicionar uma nova receita em segundos.

### 3.2. Tela 2: `Receitas.jsx` (Catálogo e CRUD de Receitas)
* **Rota:** `/receitas`
* **Objetivo:** Permitir ao cidadão gerenciar seu repertório de receitas caseiras.
* **Componentes e Funcionalidades:**
  1. **Formulário de Cadastro/Edição (`FormReceita`):**
     * Campos de texto: Nome da receita, modo de preparo detalhado;
     * Controles numéricos: Rendimento de porções (validação $> 0$), tempo em minutos;
     * Seletor de tipo de refeição: Café, Almoço, Jantar, Lanche;
     * **Seletor Dinâmico de Ingredientes:** Permite adicionar múltiplas linhas de ingredientes, escolhendo o item do catálogo, digitando a quantidade e a unidade de medida;
  2. **Grid de Receitas Cadastradas:**
     * Cards exibindo imagem/ícone, tempo de preparo, rendimento e resumo dos ingredientes;
     * Botão para visualizar modo de preparo completo (modal);
     * Botão de exclusão com diálogo de confirmação.

### 3.3. Tela 3: `Planejamento.jsx` (Cardápio Semanal & Lista Cirúrgica)
* **Rota:** `/planejamento`
* **Objetivo:** Estruturar o planejamento alimentar da semana e exibir a lista de compras gerada pelo motor do back-end.
* **Componentes e Funcionalidades:**
  1. **Quadro Semanal Interativo:**
     * Grade com os 7 dias da semana (Segunda a Domingo) e divisões de refeição (Almoço / Jantar);
     * Menus dropdown para escolher rapidamente qual receita será preparada em cada dia;
  2. **Gatilho de Inteligência:**
     * Botão de destaque: **"⚡ Gerar Lista de Compras Inteligente"**;
     * Dispara chamada assíncrona ao back-end, consolidando todos os insumos;
  3. **Lista de Compras no Supermercado (Checklist Mobile):**
     * Itens organizados por setor do supermercado (Hortifrúti, Açougue, Mercearia, Laticínios);
     * Exibição clara da soma exata: ex: `Cebola Roxa — 230g` (unificada de duas receitas);
     * **Checkbox tátil em tempo real:** Ao clicar, o item recebe estilo tachado e atualiza a flag `FL_COMPRADO` no banco de dados;
     * **Botão "Compartilhar no WhatsApp":** Copia a lista em texto legível para o clipboard para envio familiar.

---

## 4. Integração com a API REST Java

A comunicação com o back-end Java é centralizada no módulo de serviços utilizando `fetch` ou `axios`:

```javascript
// src/services/api.js
const API_BASE_URL = 'http://localhost:8080/api';

export async function fetchJson(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.mensagem || `Erro na requisição: ${response.status}`);
  }

  return response.json();
}
```

### Exemplo de Consumo no Componente de Lista:
```javascript
// Chamada para gerar lista de compras consolidada
export async function obterListaCompras(planejamentoId) {
  return await fetchJson(`/planejamentos/${planejamentoId}/lista-compras`);
}

// Atualização tátil do status de compra (Item no carrinho)
export async function alternarStatusItem(itemId, comprado) {
  return await fetchJson(`/itens-lista/${itemId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ comprado: comprado ? 'S' : 'N' }),
  });
}
```

---

## 5. Diretrizes de Design e Usabilidade Mobile-First

* **Paleta de Cores Consciente:**
  * Verde Principal (Ação e Sustentabilidade): `#10B981` (Emerald 500)
  * Verde Escuro (Contraste e Textos): `#064E3B` (Emerald 900)
  * Fundo Neutro: `#F9FAFB` (Gray 50)
  * Superfície de Cards: `#FFFFFF`
  * Destaques de Alerta/Atenção: `#F59E0B` (Amber 500)
* **Tipografia e Contraste:** Fontes sem serifa (Inter ou Roboto) com tamanho mínimo de `16px` para textos de leitura e `18px` para itens da lista de compras.
* **Área de Toque (Touch Targets):** Mínimo de `48px x 48px` para botões e caixas de checagem, evitando toques acidentais durante a locomoção no mercado.

---

## 6. Guia de Execução Local

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento local
npm run dev

# A aplicação estará disponível em http://localhost:5173
```

### Implementação neste repositório

As telas estão disponíveis nas rotas `/`, `/receitas` e `/planejamento`. A navegação usa React Router; o menu permanece no cabeçalho em todas as telas. O script `npm run build` gera a versão de produção.

O serviço HTTP fica centralizado em `src/services/api.js`. Em desenvolvimento, as chamadas usam `/api` e o Vite as encaminha para `http://localhost:8080`. Para outra instalação, configure `VITE_API_BASE_URL` no ambiente do Vite. Se o back-end exigir o vínculo com um usuário, configure o identificador fornecido pelo próprio sistema em `VITE_USUARIO_ID`; não use um ID fictício.

O front-end consome o contrato REST descrito em `docs/backend.md`. O boilerplate Java atual ainda não inicializa um servidor HTTP e os DAOs de planejamento permanecem como TODO; nesse estado, a interface apresenta a falha de conexão/servidor e não substitui a resposta por dados de demonstração. O contrato não descreve rotas de autenticação ou cadastro de ingredientes, portanto esses fluxos dependem de endpoints implementados no back-end.
