# 🌿 PlanEat — CitizenTech (Boilerplate)

> **FIAP — Global Solution 2026/2**  
> **Curso:** Engenharia de Software — 2º Ano  
> **Tema:** CitizenTech — Tecnologia com o cidadão no centro da inovação  
> **Objetivos de Desenvolvimento Sustentável:** ODS 2 e ODS 11  

---

## 🎯 Sobre o Boilerplate

Este repositório contém a **estrutura inicial (esqueleto) do projeto**, sem regras de negócio ou telas pré-implementadas. A arquitetura, padrões e separação de camadas estão configuradas para que o time desenvolva as funcionalidades manualmente, seguindo as documentações técnicas da pasta `docs/`.

---

## 📁 Estrutura do Projeto

```
planeat/
├── 🗄️ database/
│   └── script.sql                  # Esqueleto para DDL (tabelas, constraints) e DML (inserts)
│
├── ☕ backend/
│   ├── pom.xml                     # Maven com Java 17, drivers JDBC (Oracle, Postgres, H2) e Gson
│   └── src/main/java/br/com/fiap/planeat/
│       ├── Main.java               # Ponto de entrada da aplicação
│       ├── factory/
│       │   └── ConnectionFactory.java       # Template para conexão JDBC nativa
│       ├── model/                  # Entidades de domínio com herança de EntidadeBase
│       │   ├── EntidadeBase.java
│       │   ├── Usuario.java
│       │   ├── CategoriaAlimento.java
│       │   ├── Ingrediente.java
│       │   ├── ItemReceita.java
│       │   ├── Receita.java
│       │   ├── PlanejamentoSemanal.java
│       │   ├── ItemPlanejamento.java
│       │   └── ItemListaCompras.java
│       ├── dao/                    # Assinaturas dos métodos CRUD (a implementar pelo time)
│       │   ├── UsuarioDAO.java
│       │   ├── IngredienteDAO.java
│       │   ├── ReceitaDAO.java
│       │   └── PlanejamentoDAO.java
│       ├── service/                # Assinaturas dos serviços de negócio (a implementar pelo time)
│       │   ├── ReceitaService.java
│       │   └── ListaComprasService.java
│       └── exception/              # Hierarquia de exceções customizadas
│           ├── DatabasePersistenceException.java
│           ├── RegraNegocioException.java
│           └── EntidadeNaoEncontradaException.java
│
├── ⚛️ frontend/
│   ├── package.json                # Configuração React 18 + Vite
│   ├── vite.config.js              # Configuração do Vite e proxy
│   ├── index.html                  # Template base HTML5
│   └── src/
│       ├── main.jsx                # Ponto de montagem da SPA
│       ├── App.jsx                 # Estrutura base de navegação entre as 3 telas
│       ├── index.css               # Estilos base
│       ├── components/
│       │   ├── Navbar.jsx          # Componente de navegação
│       │   └── Footer.jsx          # Componente de rodapé
│       ├── pages/                  # Telas vazias com placeholders para desenvolvimento
│       │   ├── Dashboard.jsx
│       │   ├── Receitas.jsx
│       │   └── Planejamento.jsx
│       └── services/
│           └── api.js              # Funções base de integração HTTP (a implementar pelo time)
│
└── 📚 docs/                        # Guias e especificações de referência
    ├── spec.md                     # Visão geral, arquitetura e critérios da GS
    ├── banco.md                    # DER detalhado, tipos de dados e queries analíticas
    ├── backend.md                  # Diagrama de Classes UML e contratos REST
    └── frontend.md                 # Arquitetura e guia de interface React
```

---

## 🛠️ Como Iniciar o Desenvolvimento

### 1. Banco de Dados
* Consulte as tabelas e tipos especificados em [`docs/banco.md`](/docs/banco.md);
* Implemente os comandos DDL e DML em [`database/script.sql`](/database/script.sql).

### 2. Back-end Java
* Configure as credenciais no arquivo `backend/src/main/java/br/com/fiap/planeat/factory/ConnectionFactory.java`;
* Implemente as operações SQL nos DAOs em `backend/src/main/java/br/com/fiap/planeat/dao/`;
* Implemente as validações e a lógica de consolidação nos Services em `backend/src/main/java/br/com/fiap/planeat/service/`;
* Para compilar:
  ```bash
  cd backend
  mvn clean compile
  ```

### 3. Front-end React
* Desenvolva os componentes e formulários nas páginas em `frontend/src/pages/`;
* Integre com a API através das funções em `frontend/src/services/api.js`;
* Para rodar o ambiente de desenvolvimento:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
