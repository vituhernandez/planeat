# Planejamento de Projeto: PlanEat

> **Global Solution 2026/2 — CitizenTech (FIAP)**  
> **Estratégia de Execução:** Desenvolvimento Paralelo Desacoplado (2 Times Independentes)  
> **Ciclo de Planejamento:** Fases por Sprints de Execução  

---

## 1. Visão Geral e Estrutura dos Times

Para garantir máxima agilidade e entrega sem gargalos, o desenvolvimento foi dividido em **duas frentes autônomas**. Nenhuma frente bloqueia a outra: o avanço ocorre de forma simultânea através da estratégia de **Design por Contrato (Contract-First)**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CONTRATO DE DADOS DEFINIDO (API REST)                │
│             (Rotas, métodos HTTP e formatos JSON pré-alinhados)        │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼                                ▼
       ┌─────────────────────────┐      ┌─────────────────────────┐
       │         TIME 1          │      │         TIME 2          │
       │   BANCO DE DADOS +      │      │    FRONT-END REACT +    │
       │     BACK-END JAVA       │      │       VÍDEO PITCH       │
       │                         │      │                         │
       │ • Modelagem Relacional  │      │ • Telas e Usabilidade   │
       │ • Script SQL (DDL/DML)  │      │ • Componentes React     │
       │ • CRUD JDBC Puro        │      │ • Checklist Mobile      │
       │ • Regras de Negócio     │      │ • Roteiro & Gravação    │
       │ • Consultas Analíticas  │      │ • Edição do Pitch (3m)  │
       └─────────────────────────┘      └─────────────────────────┘
                    │                                │
                    └────────────────┬───────────────┘
                                     ▼
                      INTEGRAÇÃO FINAL (SPRINT 4)
                       Validação & Entrega do MVP
```

### 1.1. Divisão das Equipes

| Equipe | Responsabilidade Principal | Entregáveis Chave |
| :--- | :--- | :--- |
| **Time 1: Banco + Back-end** | Modelagem relacional, persistência JDBC nativa, lógica de cálculo da lista de compras e API REST. | Script `script.sql`, DER, classes Java POO, DAOs, Services e testes de endpoints. |
| **Time 2: Front-end + Pitch** | Interface do usuário em React (mobile-first), experiência de uso no supermercado e vídeo de apresentação de 3 minutos. | Telas React, componentes interativos, checklist de compras, roteiro e gravação final do Pitch. |

---

## 2. Estratégia de Desacoplamento (Zero Dependência)

Para que o **Time 2 (Front-end)** não fique parado esperando o **Time 1 (Back-end)** terminar as tabelas e endpoints, são adotadas as seguintes práticas:

1. **Contratos JSON Congelados:** Os formatos de entrada e saída das requisições já estão totalmente especificados em [`docs/backend.md`](/docs/backend.md) e [`docs/spec.md`](/docs/spec.md);
2. **Dados Simulados no Front-end (Mock Fallback):** O arquivo `frontend/src/services/api.js` possui dados locais de exemplo estruturados exatamente como o banco responderá. O Time 2 desenvolve 100% da interface e interatividade sem precisar que o servidor Java esteja rodando;
3. **Testes Isolados no Back-end:** O Time 1 valida suas consultas SQL diretamente no banco e testa seus DAOs e Services utilizando testes unitários (JUnit) e chamadas via terminal/Postman, sem precisar da interface web pronta;
4. **Chaveamento Simples:** Na última sprint, a integração se resume a alterar a URL base no front-end para consumir os dados reais do banco.

---

## 3. Cronograma por Sprints em Paralelo

### 🗓️ Sprint 1: Fundações, Setup e Estrutura Base

| Período / Foco | Time 1 (Banco + Back-end) | Time 2 (Front-end + Pitch) |
| :--- | :--- | :--- |
| **Fase Inicial** | • Revisão do modelo relacional em [`docs/banco.md`](/docs/banco.md)<br>• Criação do script `script.sql` (criação de tabelas e constraints)<br>• Configuração da `ConnectionFactory` com o banco | • Inicialização do projeto React com Vite<br>• Configuração de estilos base e layout responsivo<br>• Construção do cabeçalho de navegação (`Navbar`) e rodapé |
| **Fase Intermediária** | • Criação das classes de domínio (`model`) com encapsulamento e herança<br>• Criação da hierarquia de exceções customizadas | • Desenvolvimento da página de **Dashboard** (apresentação e contexto CitizenTech)<br>• Estruturação inicial do roteiro do Pitch (problema e ODS 2 e 11) |
| **Marco da Sprint** | Banco de dados criado e classes Java estruturadas. | Dashboard navegável e roteiro do Pitch rascunhado. |

---

### 🗓️ Sprint 2: Cadastros, CRUDs e Storyboard do Pitch

| Período / Foco | Time 1 (Banco + Back-end) | Time 2 (Front-end + Pitch) |
| :--- | :--- | :--- |
| **Fase Inicial** | • Implementação de `UsuarioDAO` e `IngredienteDAO` via JDBC nativo<br>• Carga de dados inicial no banco (ingredientes básicos e categorias)<br>• Testes de inserção e busca no banco | • Desenvolvimento da página de **Receitas** (listagem de pratos)<br>• Criação do formulário com **dosador dinâmico de ingredientes** (adicionar/remover linhas)<br>• Validações visuais de formulário no cliente |
| **Fase Intermediária** | • Implementação de `ReceitaDAO` (inserção de receitas e ingredientes associados N:N em transação segura)<br>• Criação de `ReceitaService` com validações de negócio | • Criação dos cards visuais de receitas com filtros por tipo de refeição<br>• Storyboard do Pitch: definição exata das telas a serem filmadas nos 3 minutos |
| **Marco da Sprint** | CRUD de receitas persistindo no banco via Java. | Tela de Receitas 100% funcional com dados simulados; estrutura do Pitch fechada. |

---

### 🗓️ Sprint 3: Inteligência de Negócio, Agregação e Checklist de Mercado

| Período / Foco | Time 1 (Banco + Back-end) | Time 2 (Front-end + Pitch) |
| :--- | :--- | :--- |
| **Fase Inicial** | • Implementação de `PlanejamentoDAO` (alocação de pratos no planejamento)<br>• Desenvolvimento da **Query Analítica SQL** com `JOIN`, `SUM` e `GROUP BY` para consolidar compras | • Desenvolvimento da página de **Planejamento** (matriz semanal)<br>• Interface para escolha das receitas por dia |
| **Fase Intermediária** | • Implementação de `ListaComprasService` (cálculo de soma exata de ingredientes repetidos e porções)<br>• Exposição dos endpoints REST no servidor HTTP Java (`Main.java`) | • Criação do **Checklist Cirúrgico Mobile-First** para uso no supermercado (itens riscados em tempo real)<br>• Gravação das tomadas de rosto (apresentação do problema e impacto social) para o Pitch |
| **Marco da Sprint** | Lógica de consolidação e API REST prontas e testadas isoladamente. | Checklist mobile de compras interativo finalizado; gravações iniciais do Pitch prontas. |

---

### 🗓️ Sprint 4: Integração, Validação Ponta a Ponta, Gravação Final e Envio

| Período / Foco | Time 1 (Banco + Back-end) | Time 2 (Front-end + Pitch) | Atividade Conjunta |
| :--- | :--- | :--- | :--- |
| **Fase Inicial** | • Suporte à conexão e testes de CORS<br>• Ajustes de consultas e integridade | • Conexão do front-end com os endpoints reais da API Java<br>• Teste do fluxo completo de compras na tela | **Integração Real:** Cadastro de receita na web ➔ Gravação no banco ➔ Geração da lista real. |
| **Fase Intermediária** | • Revisão de logs e tratamento de erros de banco<br>• Exportação final do DER e conferência do `script.sql` | • Gravação do screencast da aplicação funcionando para o vídeo Pitch<br>• Edição do vídeo garantindo tempo rigoroso de **até 3 minutos** | **Gravação do Pitch:** Filmagem da tela com dados reais gravados no banco. |
| **Encerramento** | • Validação de compilação limpa do Java | • Upload do vídeo (YouTube/Drive público) e teste em aba anônima | **Revisão do Checklist:** Preenchimento do `.txt` com nomes, RMs e link do vídeo; conferência final do `README.md`. |

---

## 4. Matriz de Atividades por Time (Quadro de Responsabilidades)

```
┌─────────────────────────────────────────────────────────────┬───────────────────────────┐
│ TIME 1: BANCO DE DADOS & BACK-END JAVA                      │ TIME 2: FRONT-END & PITCH │
├─────────────────────────────────────────────────────────────┼───────────────────────────┤
│ [ ] Modelar DER com 9 tabelas relacionais                   │ [ ] Criar layout React    │
│ [ ] Escrever script.sql com PK, FK, CHECK e UNIQUE          │ [ ] Montar Dashboard      │
│ [ ] Criar inserts de carga inicial demonstrativa            │ [ ] Criar CRUD Receitas   │
│ [ ] Implementar POO (EntidadeBase e modelos encapsulados)   │ [ ] Dosador de insumos    │
│ [ ] Implementar ConnectionFactory e DAOs via JDBC           │ [ ] Cardápio de refeições │
│ [ ] Programar regras de negócio e validações nos Services   │ [ ] Checklist mercado     │
│ [ ] Criar Query Analítica SQL (JOIN + SUM + GROUP BY)       │ [ ] Compartilhar WhatsApp │
│ [ ] Configurar servidor HTTP nativo e endpoints REST        │ [ ] Roteiro do Pitch      │
│ [ ] Testar persistência e respostas JSON                    │ [ ] Gravação e edição (3m)│
└─────────────────────────────────────────────────────────────┴───────────────────────────┘
```

---

## 5. Pontos de Contato e Alinhamentos Rápidos (Check-ins)

Embora o desenvolvimento ocorra em paralelo e sem bloqueios, os dois times realizam **3 breves alinhamentos** durante as sprints:

1. **Alinhamento Inicial (Fim da Sprint 1):** Validação formal de que ambos os times entenderam os campos e contratos JSON dos endpoints;
2. **Alinhamento Intermediário (Fim da Sprint 2):** Demonstração mútua dos avanços (Time 1 mostra o banco recebendo dados; Time 2 mostra a tela de receitas operando com dados mockados);
3. **Ensaio Geral (Início da Sprint 4):** Sessão de integração para conectar o front-end ao back-end e ensaiar a demonstração prática do vídeo Pitch.

---

## 6. Critérios de Sucesso e Checklist de Envio da Global Solution

Ao término da Sprint 4, o projeto deve cumprir 100% dos itens avaliados pela banca:

- [ ] **Banco de Dados:** O script `script.sql` roda do início ao fim sem erros e popula os dados de teste;
- [ ] **Back-end Java:** Compila e roda seguindo apenas as instruções do `README.md`, realizando operações de inserção, consulta e exclusão no banco via JDBC;
- [ ] **Web Conectada (Diferencial):** O front-end React grava e lê dados reais diretamente do back-end Java;
- [ ] **Consulta com Agregação (Diferencial):** A lista de compras é consolidada através da query com `JOIN` e `SUM`;
- [ ] **Vídeo Pitch:** Duração máxima de **3 minutos**, com link público testado em aba anônima, sem slides na demonstração técnica;
- [ ] **Arquivo de Entrega:** Arquivo `.txt` contendo o nome do projeto, identificação dos integrantes (nome e RM) e link público do vídeo pitch.
