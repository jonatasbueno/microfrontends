# Regras de Negócios e Requisitos

Construir um sistema para gerenciamento de **produtores rurais** e suas **propriedades**, com base em duas principais áreas funcionais:

1. **CRUD de Produtores Rurais**
2. **Dashboard de Indicadores e Gráficos**

O sistema deve ser escalável, permitir fácil manutenção e documentar de forma clara suas funcionalidades sem dependência de uma tecnologia específica.

---

## 1. CRUD de Produtores

### Funcionalidades Principais

* **Listagem de produtores**

  * Exibir tabela com:

    * CPF ou CNPJ.
    * Nome do produtor.
    * Estado.
    * Cidade.
    * Status (ativo/inativo).
  * Ações por item da lista:

    * **Ver detalhes**.
    * **Editar produtor**.
    * **Ativar/Desativar produtor**.

* **Cadastro de novo produtor**

  * Inserir dados obrigatórios:

    * CPF ou CNPJ (com validação).
    * Nome do produtor.
    * Endereço (cidade e estado).
  * Permitir adicionar propriedades rurais.

* **Edição de produtor**

  * Alterar dados cadastrais.
  * Adicionar, editar ou remover propriedades rurais.

* **Ativar/Inativar produtor**

  * Alterar status do produtor sem remover seus dados.
  * Garantir histórico preservado.

---

### Tela de Detalhes do Produtor

* Ao clicar em "Ver detalhes", abrir:

  * **Modal** ou nova tela contendo:

    * Dados cadastrais completos.
    * Lista de propriedades:

      * Nome da fazenda.
      * Cidade.
      * Estado.
      * Área total (ha).
      * Área agricultável (ha).
      * Área de vegetação (ha).
      * Safras e respectivas culturas.
    * Ações:

      * Editar produtor.
      * Adicionar/editar/remover propriedades.
      * Adicionar culturas e safras.

---

### Regras de Negócio do CRUD

1. CPF ou CNPJ deve ser único e validado.
2. A soma da **área agricultável** + **área de vegetação** não pode ultrapassar a **área total da propriedade**.
3. Um produtor pode ter:

   * 0, 1 ou mais propriedades.
4. Uma propriedade pode ter:

   * 0, 1 ou mais culturas por safra.
5. Permitir ativar ou desativar produtores sem excluir dados.

---

## 2. Dashboard de Indicadores

### Funcionalidades

* **Indicadores principais:**

  * Total de produtores cadastrados.
  * Total de fazendas cadastradas.
  * Total de hectares registrados (soma das áreas totais).

* **Gráficos:**

  * **Pizza por estado:** distribuição de fazendas por estado.
  * **Pizza por cultura plantada:** proporção das culturas registradas.
  * **Pizza por uso do solo:** relação entre área agricultável e área de vegetação.

* **Filtros opcionais:**

  * Filtrar dados por safra.
  * Filtrar por estado.
  * Filtrar por cultura.

---

### Regras de Negócio do Dashboard

1. Os dados exibidos devem ser atualizados em tempo real com base no cadastro.
2. Os gráficos devem representar a soma consolidada de todas as propriedades dos produtores.
3. As métricas de hectares devem considerar apenas propriedades ativas.
4. Ao desativar um produtor, suas propriedades deixam de contar nos totais e gráficos.

---
# Especificações Técnicas

Arquitetura de microfrontends com Webpack Module Federation utilizando Vite e o plugin @originjs/vite-plugin-federation. O projeto deve estar estruturado em um repositório Git com pastas para cada microfrontend (remote) e o host, utilizando apenas os diretórios necessários da estrutura de referência fornecida. Inclui configurações para Docker e Docker Compose para orquestração dos containers.

### Tecnologias Utilizadas

- **React**: 19.1.1
  - Biblioteca principal para construção de interfaces.
- **TypeScript**: 5.9.2
  - Tipagem estática para garantir segurança e manutenção.
- **styled-components**: 6.1.19
  - Estilização de componentes no design system.
- **TanStack Router**: 1.130.12
  - Gerenciamento de rotas no remote de roteamento.
- **TanStack Query**: 5.84.1
  - Gerenciamento de dados assíncronos no remote de providers.
- **Redux**: 5.0.1
  - Gerenciamento de estado global no remote de estado.
- **React Redux**: 9.2.0
  - Integração do Redux com React.
- **react-hook-form**: 7.53.0
  - Gerenciamento de formulários no remote CRUD.
- **@originjs/vite-plugin-federation**: 1.3.2
  - Plugin para habilitar Module Federation no Vite.
- **Vite**: 5.4.x
  - Ferramenta de build e desenvolvimento.
- **Docker**: 18.x (base image Node)
  - Containerização dos projetos.
- **Docker Compose**: 3.x
  - Orquestração dos containers.

---

## Arquitetura

A arquitetura é baseada em microfrontends com Webpack Module Federation via Vite. O host atua como um shell leve, orquestrando os remotes, que são responsáveis por funcionalidades específicas (providers, roteamento, estado global, design system, CRUD e dashboard). Cada remote é independente, permitindo deploys separados, e o Module Federation garante compartilhamento de dependências e módulos.

- **Host**: Shell que carrega os remotes e os integra.
- **Providers**: Fornece providers para Redux, TanStack Query, styled-components e react-hook-form.
- **Roteamento**: Gerencia as rotas da aplicação com TanStack Router.
- **Estado Global**: Gerencia o estado global com Redux.
- **Design System**: Fornece componentes estilizados com styled-components.
- **Formulário CRUD**: Implementa um formulário CRUD com rotas internas, consumindo o estado global.
- **Dashboard**: Exibe dados do estado global em formato visual.

---

## Estrutura de Pastas

O repositório segue uma estrutura adaptada da referência fornecida, usando apenas as pastas necessárias para cada projeto. A estrutura completa da referência é:

```
frontend/
├── public/                       # Arquivos estáticos (favicon, etc.)
├── src/                          # Código-fonte da aplicação
│   ├── constants/                # Constantes e enums
│   ├── components/               # Componentes de UI
│   │   ├── ui/                   # Componentes atômicos (apenas renderização)
│   │   ├── container/            # Componentes que contêm outros componentes
│   │   └── business/             # Componentes com lógica de negócio
│   ├── hooks/                    # Hooks globais
│   ├── icons/                    # Componentes de ícones
│   ├── lib/                      # Funções utilitárias e wrappers
│   ├── pages/                    # Componentes de página (endpoints de roteamento)
│   ├── providers/                # Contextos e providers
│   ├── router/                   # Configuração de rotas
│   ├── services/                 # Chamadas de API
│   ├── store/                    # Estado global
│   ├── styles/                   # Configurações de estilo
│   ├── utils/                    # Funções utilitárias
│   │   ├── functions/            # Funções específicas (formatadores, etc.)
│   ├── types/                    # Tipos TypeScript compartilhados
│   ├── App.tsx                   # Componente raiz
│   └── main.tsx                  # Ponto de entrada Vite + ReactDOM
├── .env                          # Variáveis de ambiente
├── tsconfig.json                 # Configuração TypeScript
├── vite.config.ts                # Configuração Vite
└── package.json                  # Metadados e dependências
```

**Uso Adaptado**: Cada projeto (host e remotes) utiliza apenas as pastas necessárias, conforme detalhado abaixo.

---

## Projetos no Repositório

### 1. Host (Shell)

- **Função**: Atua como a espinha dorsal, carregando e orquestrando os remotes.
- **URL e Porta**: `http://localhost:3000`
- **Estrutura de Pastas**:
  ```
  host/
  ├── public/
  │   └── favicon.ico
  ├── src/
  │   ├── components/
  │   │   └── container/
  │   │       └── Shell.tsx
  │   ├── types/
  │   │   └── index.ts
  │   ├── App.tsx
  │   └── main.tsx
  ├── Dockerfile
  ├── vite.config.ts
  ├── tsconfig.json
  └── package.json
  ```
- **Arquivos Principais**:
  - `src/App.tsx`: Componente raiz que renderiza o `Shell`.
  - `src/components/container/Shell.tsx`: Carrega os remotes `Providers` e `Router`.
  - `vite.config.ts`: Configura o Module Federation para consumir remotes.
- **Dependências**:
  - `react`, `react-dom`, `@originjs/vite-plugin-federation`, `typescript`, `vite`.

### 2. Providers

- **Função**: Fornece providers para Redux, TanStack Query, styled-components e react-hook-form.
- **URL e Porta**: `http://localhost:3001`
- **Estrutura de Pastas**:
  ```
  providers/
  ├── src/
  │   ├── providers/
  │   │   └── Providers.tsx
  │   ├── types/
  │   │   └── index.ts
  │   ├── App.tsx
  │   └── main.tsx
  ├── Dockerfile
  ├── vite.config.ts
  ├── tsconfig.json
  └── package.json
  ```
- **Arquivos Principais**:
  - `src/providers/Providers.tsx`: Componente que encapsula os providers.
  - `vite.config.ts`: Expose o componente `Providers`.
- **Dependências**:
  - `react`, `react-dom`, `redux`, `react-redux`, `@reduxjs/toolkit`, `@tanstack/react-query`, `styled-components`, `react-hook-form`.

### 3. Roteamento

- **Função**: Gerencia as rotas da aplicação com TanStack Router.
- **URL e Porta**: `http://localhost:3002`
- **Estrutura de Pastas**:
  ```
  routing/
  ├── src/
  │   ├── router/
  │   │   └── Router.tsx
  │   ├── types/
  │   │   └── index.ts
  │   ├── App.tsx
  │   └── main.tsx
  ├── Dockerfile
  ├── vite.config.ts
  ├── tsconfig.json
  └── package.json
  ```
- **Arquivos Principais**:
  - `src/router/Router.tsx`: Configura as rotas com TanStack Router.
  - `vite.config.ts`: Expose o componente `Router`.
- **Dependências**:
  - `react`, `react-dom`, `tanstack-router`.

### 4. Estado Global

- **Função**: Gerencia o estado global com Redux.
- **URL e Porta**: `http://localhost:3003`
- **Estrutura de Pastas**:
  ```
  state/
  ├── src/
  │   ├── store/
  │   │   └── store.ts
  │   ├── types/
  │   │   └── index.ts
  │   ├── App.tsx
  │   └── main.tsx
  ├── Dockerfile
  ├── vite.config.ts
  ├── tsconfig.json
  └── package.json
  ```
- **Arquivos Principais**:
  - `src/store/store.ts`: Configura o store Redux e ações.
  - `vite.config.ts`: Expose o `store`.
- **Dependências**:
  - `react`, `react-dom`, `redux`, `react-redux`, `@reduxjs/toolkit`.

### 5. Design System

- **Função**: Fornece componentes estilizados com styled-components.
- **URL e Porta**: `http://localhost:3004`
- **Estrutura de Pastas**:
  ```
  design-system/
  ├── src/
  │   ├── components/
  │   │   └── ui/
  │   │       └── Button.tsx
  │   ├── styles/
  │   │   └── theme.ts
  │   ├── types/
  │   │   └── index.ts
  │   ├── App.tsx
  │   └── main.tsx
  ├── Dockerfile
  ├── vite.config.ts
  ├── tsconfig.json
  └── package.json
  ```
- **Arquivos Principais**:
  - `src/components/ui/Button.tsx`: Componente estilizado.
  - `src/styles/theme.ts`: Tema para styled-components.
  - `vite.config.ts`: Expose o `Button` e `theme`.
- **Dependências**:
  - `react`, `react-dom`, `styled-components`.

### 6. Formulário CRUD

- **Função**: Implementa um formulário CRUD com rotas internas, consumindo o estado global.
- **URL e Porta**: `http://localhost:3005`
- **Estrutura de Pastas**:
  ```
  crud/
  ├── src/
  │   ├── components/
  │   │   └── business/
  │   │       └── CrudForm.tsx
  │   ├── pages/
  │   │   └── CrudPage.tsx
  │   ├── types/
  │   │   └── index.ts
  │   ├── App.tsx
  │   └── main.tsx
  ├── Dockerfile
  ├── vite.config.ts
  ├── tsconfig.json
  └── package.json
  ```
- **Arquivos Principais**:
  - `src/components/business/CrudForm.tsx`: Formulário usando react-hook-form.
  - `src/pages/CrudPage.tsx`: Página que integra o formulário.
  - `vite.config.ts`: Expose o `CrudApp`.
- **Dependências**:
  - `react`, `react-dom`, `react-redux`, `react-hook-form`, `styled-components`.

### 7. Dashboard

- **Função**: Exibe dados do estado global em formato visual.
- **URL e Porta**: `http://localhost:3006`
- **Estrutura de Pastas**:
  ```
  dashboard/
  ├── src/
  │   ├── components/
  │   │   └── business/
  │   │       └── Dashboard.tsx
  │   ├── types/
  │   │   └── index.ts
  │   ├── App.tsx
  │   └── main.tsx
  ├── Dockerfile
  ├── vite.config.ts
  ├── tsconfig.json
  └── package.json
  ```
- **Arquivos Principais**:
  - `src/components/business/Dashboard.tsx`: Exibe dados do Redux.
  - `vite.config.ts`: Expose o `Dashboard`.
- **Dependências**:
  - `react`, `react-dom`, `react-redux`, `styled-components`.

---

## Configuração do Docker Compose

**Arquivo**: `docker-compose.yml` (na raiz do repositório)

```yaml
version: '3'
services:
  host:
    build: ./host
    ports:
      - "3000:3000"
  providers:
    build: ./providers
    ports:
      - "3001:3001"
  routing:
    build: ./routing
    ports:
      - "3002:3002"
  state:
    build: ./state
    ports:
      - "3003:3003"
  design-system:
    build: ./design-system
    ports:
      - "3004:3004"
  crud:
    build: ./crud
    ports:
      - "3005:3005"
  dashboard:
    build: ./dashboard
    ports:
      - "3006:3006"
```

**Dockerfile** (igual para todos os projetos):
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

**Nota**: Cada projeto mapeia sua porta interna para a porta correspondente no `docker-compose.yml` (ex.: `3000:3000` para o host, `3001:3001` para providers, etc.).

---

## Principais Comandos Docker

1. **Construir e Subir Todos os Containers**:
   ```bash
   docker-compose build
   docker-compose up
   ```
   - **Descrição**: Constrói as imagens Docker e inicia os containers, disponibilizando a aplicação em `http://localhost:3000` (host) e as portas dos remotes (`3001` a `3006`).

2. **Parar os Containers**:
   ```bash
   docker-compose down
   ```
   - **Descrição**: Para e remove os containers, mantendo as imagens.

3. **Derrubar, Deletar Containers, Imagens e Node Modules**:
   ```bash
   docker-compose down --rmi all
   rm -rf host/node_modules providers/node_modules routing/node_modules state/node_modules design-system/node_modules crud/node_modules dashboard/node_modules
   ```
   - **Descrição**: Remove containers, imagens e pastas `node_modules` de todos os projetos.

4. **Comando Completo (Parar, Limpar, Construir e Subir)**:
   ```bash
   docker-compose down --rmi all && rm -rf host/node_modules providers/node_modules routing/node_modules state/node_modules design-system/node_modules crud/node_modules dashboard/node_modules && docker-compose build && docker-compose up
   ```
   - **Descrição**: Executa a limpeza completa, constrói as imagens e inicia os containers.